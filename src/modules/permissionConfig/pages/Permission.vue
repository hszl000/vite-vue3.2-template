<template>
  <div>
    <el-card class="card_one">
      <el-form :model="formData">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="岗位编码" prop="roleCode">
              <el-input v-model.trim="formData.roleCode" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="岗位名称" prop="roleName">
              <el-input v-model.trim="formData.roleName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否启用" prop="state">
              <el-select
                v-model="formData.state"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="item in isEnabledMap"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="btns">
            <el-button class="reset" @click="resetFn"> 重置 </el-button>
            <el-button type="primary" class="refer" @click="referFn">
              查询
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="card_two">
      <div class="secondment">
        <span>权限管理</span>
        <div>
          <!-- v-permission="'4-2-1'" -->
          <el-button
            v-if="permissionList.includes('4-2-1')"
            type="primary"
            @click="createFn"
          >
            新建
          </el-button>
        </div>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="Loading..."
        :data="permissionData"
        border
        :fit="true"
        style="width: 100%"
        :header-cell-style="tableHeaderCellStyle"
        height="536px"
        :row-style="{ height: '48px' }"
      >
        <el-table-column
          :resizable="false"
          prop="roleCode"
          label="岗位编码"
          width="200"
        />
        <el-table-column
          :resizable="false"
          show-overflow-tooltip
          prop="roleName"
          label="岗位名称"
        />
        <el-table-column
          :resizable="false"
          prop="createBy"
          label="创建人"
          width="200"
        />
        <el-table-column :resizable="false" prop="createTime" label="创建日期">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.createTime, "YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column :resizable="false" prop="state" label="状态">
          <template #default="{ row }">
            <span class="status-dot">
              <i
                :style="{
                  background: statusDataMap[row.state].color,
                }"
              ></i>
              {{ statusDataMap[row.state].text }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :resizable="false"
          prop="address"
          label="操作"
          fixed="right"
          width="140"
        >
          <template #default="{ row }">
            <!-- v-permission="'4-2-2'" -->
            <el-button
              v-if="row.state === 0 && permissionList.includes('4-2-2')"
              link
              style="font-size: 14px"
              class="underline"
              @click="editFn(row)"
            >
              编辑
            </el-button>
            <!-- v-permission="'4-2-3'" -->
            <span
              v-if="row.state === 0 && permissionList.includes('4-2-3')"
              v-showPermission="['4-2-3']"
              style="color: #dcdee0; margin: 0 6px"
            >
              |
            </span>
            <!-- v-permission="'4-2-3'" -->
            <!-- && permissionList.includes('4-2-3') -->
            <el-button
              v-if="row.state === 0"
              v-showPermission="['4-2-3']"
              link
              style="font-size: 14px"
              class="underline"
              @click="deactivatedFn(row)"
            >
              停用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="paginationData.pageNum"
        v-model:page-size="paginationData.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserAccountStore } from "modules/UserAccount/store";
import { usePermissionConfigStore } from "modules/permissionConfig/store";
import TipsDialog from "comps/Tips/TipsDialog.vue";
import { setScrollTop } from "utils/setScrolltop";

const route = useRoute();
const router = useRouter();
const userAccountStore = useUserAccountStore();
const permissionConfigStore = usePermissionConfigStore();
const { proxy } = getCurrentInstance();

const permissionList = computed(() => userAccountStore.getPermissionList);
const loading = ref(true);
const permissionData = computed(
  () => permissionConfigStore.permissionList.records
);

const total = computed(() => permissionConfigStore.permissionList.total);

// 搜索表单
const formData = reactive({
  roleCode: "", // 岗位编码
  roleName: "", // 岗位名称
  state: null, // 是否启用
});

const paginationData = ref({
  pageNum: 1, // 页码
  pageSize: 10, // 每页数据
});
// 获取权限管理列表
const getPageAPI = async (params) => {
  paginationData.value.pageNum = params.pageNum;
  paginationData.value.pageSize = params.pageSize;
  loading.value = true;
  const { error } = await permissionConfigStore.askPage({
    roleCode: formData.roleCode,
    roleName: formData.roleName,
    state: formData.state,
    pageNum: params.pageNum,
    pageSize: params.pageSize,
  });
  if (!error) {
    loading.value = false;
  }
};
getPageAPI(paginationData.value);

// 每页显示的条数发生改变时触发
const handleSizeChange = (newSize) => {
  paginationData.value.pageSize = newSize;
  getPageAPI({ pageSize: newSize, pageNum: paginationData.value.pageNum });
};
// 当前页面发生改变时触发
const handleCurrentChange = (newPage) => {
  paginationData.value.pageNum = newPage;
  setScrollTop();
  getPageAPI({ pageNum: newPage, pageSize: paginationData.value.pageSize });
};

// 查询按钮
const referFn = async () => {
  paginationData.value.pageNum = 1;
  await permissionConfigStore.askPage({
    roleCode: formData.roleCode,
    roleName: formData.roleName,
    state: formData.state,
    pageNum: 1,
    pageSize: paginationData.value.pageSize,
  });
};
// 重置按钮
const resetFn = () => {
  formData.roleCode = "";
  formData.roleName = "";
  formData.state = "";
  getPageAPI({ pageNum: 1, pageSize: 10 });
};
const isEnabledMap = ref([
  {
    label: "是",
    value: 0,
  },
  {
    label: "否",
    value: 1,
  },
  {
    label: "全部",
    value: "",
  },
]);

const statusDataMap = {
  1: {
    text: "已停用",
    color: "#D40000",
  },
  0: {
    text: "已启用",
    color: "#005DEA",
  },
};
// 设置el-table头部样式
const tableHeaderCellStyle = () => {
  return {
    background: "#FAFAFA",
    color: "#303133",
    fontWeight: 500,
    fontSize: "14px",
    height: "48px",
    // fontFamily: 'PingFangSC-Medium', 'PingFang SC'
  };
};
// 新建
const createFn = () => {
  router.push({
    name: "newPermission",
  });
};
// 表格停用
const deactivatedFn = (row) => {
  proxy.$ModalDialog({
    title: "提示",
    // headreIcon: 'icon-warning',
    confirmText: "停用",
    // backTemplate: true,
    footerBorder: true,
    renderComponent: {
      data: { content: "确认停用吗，停用后不可恢复" },
      component: TipsDialog,
    },
    onConfirm: async (instance) => {
      const { error } = await permissionConfigStore.disableSwitch({
        id: row.id,
        state: 1,
      });
      if (!error) {
        ElMessage({
          type: "success",
          message: "停用成功!",
        });
        getPageAPI(paginationData.value);
      }
    },
  });
};
// 表格编辑
const editFn = (row) => {
  router.push({
    name: "newPermission",
    query: {
      id: row.id,
    },
  });
};
</script>

<style lang="scss" scoped>
.el-card {
  // width: calc(100vw - 40px);
  margin: 0px 20px;
}
.el-form-item--small.el-form-item {
  display: flex;
  align-items: center;
}
.el-form-item {
  margin-bottom: 0;
}
.btns {
  position: relative;
}
.reset {
  position: absolute;
  right: 95px;
}
.refer {
  position: absolute;
  right: 10px;
}
.secondment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > span {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #303133;
  }
  .deactivate {
    border: 1px solid #005dea;
    color: #005dea;
  }
}
.el-table {
  margin-top: 16px;
}
.status-dot i {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #c0c4cc;
  display: inline-block;
  margin-right: 3px;
}
:deep() {
  .card_one {
    border-bottom: 1px solid #dcdee0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}

:deep() {
  .card_two {
    // height: calc(100vh - 50px);
  }
  .el-card__body {
    padding-top: 17px;
  }
}
.el-pagination {
  float: right;
}
.underline {
  &:hover {
    text-decoration-line: underline;
  }
}
:deep() {
  .el-pagination {
    margin: 16px 0;
    .btn-prev,
    .btn-next {
      background: #fff;
      border: 1px solid #dcdee0;
    }
    .el-pager {
      li {
        background: #fff;
        border: 1px solid #dcdee0;
        line-height: 24px;
      }
      li:not(.disabled).active {
        background: #005dea;
        color: #fff;
      }
      li:hover {
        color: #005dea;
      }
    }
  }
}
</style>
