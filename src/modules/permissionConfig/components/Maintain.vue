<template>
  <el-scrollbar>
    <el-card class="card_two">
      <div class="secondment">
        <span>借调协调人维护</span>
        <div>
          <!-- v-permission="'4-4-1'" -->
          <el-button
            v-if="permissionList.includes('4-3')"
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
        :data="tableData"
        border
        style="width: 100%"
        :fit="true"
        :header-cell-style="tableHeaderCellStyle"
        height="539px"
        :row-style="{ height: '48px' }"
      >
        <el-table-column
          :resizable="false"
          prop="userCode"
          label="工号"
          width="110"
        />
        <el-table-column
          :resizable="false"
          prop="userName"
          label="姓名"
          width="110"
        />
        <el-table-column :resizable="false" prop="sex" label="性别" width="90">
          <template #default="{ row }">
            {{ row.sex === "0" ? "女" : "男" }}
          </template>
        </el-table-column>
        <el-table-column :resizable="false" prop="tel" label="手机" />
        <el-table-column
          :resizable="false"
          prop="levelName"
          label="职级"
          width="200"
        />
        <el-table-column
          :resizable="false"
          prop="deptName"
          label="部门"
          width="240"
        />
        <el-table-column
          :resizable="false"
          prop="plageName"
          label="负责板块"
          width="100"
        />
        <el-table-column
          :resizable="false"
          prop="areaName"
          label="负责区域"
          width="130"
        />
        <el-table-column
          :resizable="false"
          label="操作"
          fixed="right"
          width="120"
        >
          <template #default="{ row }">
            <!-- v-permission="'4-4-2'" -->
            <el-button
              v-if="permissionList.includes('4-4-2')"
              link
              style="font-size: 14px"
              class="underline"
              @click="editFn(row)"
            >
              编辑
            </el-button>
            <!-- v-permission="'4-4-3'" -->
            <span
              v-if="permissionList.includes('4-4-3')"
              style="color: #dcdee0; margin: 0 6px"
            >
              |
            </span>
            <!-- v-permission="'4-4-3'" -->
            <el-button
              v-if="permissionList.includes('4-4-3')"
              link
              style="font-size: 14px"
              class="underline"
              @click="deleteFn(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:currentPage="paginationData.pageNum"
        v-model:page-size="paginationData.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total,sizes, prev, pager, next, jumper"
        :total="total"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </el-scrollbar>
</template>

<script setup>
import { ref, getCurrentInstance, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserAccountStore } from "modules/UserAccount/store";
import { usePermissionConfigStore } from "modules/permissionConfig/store";
import { useSecondmentApplicationStore } from "modules/SecondmentApplication/store";
import MaintainCreateModelDialog from "@/modules/permissionConfig/components/MaintainCreateModelDialog.vue";
import TipsDialogVue from "@/components/Tips/TipsDialog.vue";
import { setScrollTop } from "utils/setScrolltop";

const route = useRoute();
const router = useRouter();
const userAccountStore = useUserAccountStore();
const permissionConfigStore = usePermissionConfigStore();
const secondmentApplicationStore = useSecondmentApplicationStore();
const { proxy } = getCurrentInstance();

const tableData = computed(() => permissionConfigStore.getPageList.records);
const total = computed(() => permissionConfigStore.getPageList.total);
const loading = ref(true);
const permissionList = computed(() => userAccountStore.getPermissionList);

// 分页数据
const paginationData = ref({
  pageNum: 1, // 页码
  pageSize: 10, // 每页数据
});

const getSecondmentPageListAPI = async (params) => {
  loading.value = true;
  const { error } = await permissionConfigStore.askSecondmentPageList({
    areaCode: "",
    pageNum: params.pageNum,
    pageSize: params.pageSize,
    plageCode: "",
    userName: "",
  });
  if (!error) {
    loading.value = false;
  }
};
getSecondmentPageListAPI(paginationData.value);

// 每页显示的条数发生改变时触发
const handleSizeChange = (newSize) => {
  paginationData.value.pageSize = newSize;
  getSecondmentPageListAPI({
    pageSize: newSize,
    pageNum: paginationData.value.pageNum,
  });
};
// 当前页面发生改变时触发
const handleCurrentChange = (newPage) => {
  paginationData.value.pageNum = newPage;
  setScrollTop();
  getSecondmentPageListAPI({
    pageNum: newPage,
    pageSize: paginationData.value.pageSize,
  });
};
// 设置el-table头部样式
const tableHeaderCellStyle = () => {
  return {
    background: "#FAFAFA",
    color: "#303133",
    fontWeight: 500,
    fontSize: "14px",
    height: "48px",
  };
};

const plageDictList = computed(
  () => secondmentApplicationStore.getPlageDictList
);

const areaDictList = computed(() => secondmentApplicationStore.getAreaDictList);

// 新建弹框
const createFn = () => {
  const data = ref({
    staff: "", // 员工
    employee: {}, // 员工数据
    plate: "", // 板块
    region: "", // 区域
  });
  proxy.$ModalDialog({
    title: "新增",
    confirmText: "提交",
    dialogWidth: "728px",
    renderComponent: {
      data,
      component: MaintainCreateModelDialog,
    },
    onConfirm: async (instance) => {
      const isValid = await instance.validationRules();
      if (isValid && JSON.stringify(data.value.employee) !== "{}") {
        const currentPlage = plageDictList.value.find(
          (item) => item.itemKey === data.value.plate
        );
        const currentRegion = areaDictList.value.find(
          (item) => item.itemKey === data.value.region
        );
        const { error } = await permissionConfigStore.secondmentAdd({
          areaCode: data.value.region,
          areaName: currentRegion.itemValue,
          plageCode: data.value.plate,
          plageName: currentPlage.itemValue,
          ...data.value.employee,
        });
        if (!error) {
          ElMessage({
            type: "success",
            message: "新增成功",
          });
          getSecondmentPageListAPI(paginationData.value);
        }
      } else {
        ElMessage({
          type: "warning",
          message: "请选择员工",
        });
        return Promise.reject(new Error("error"));
      }
    },
  });
};

// 删除
const deleteFn = (row) => {
  proxy.$ModalDialog({
    title: "删除提示",
    confirmText: "删除",
    footerBorder: true,
    renderComponent: {
      data: { content: "确认删除吗，删除后不可恢复" },
      component: TipsDialogVue,
    },
    onConfirm: async (instance) => {
      const { error } = await permissionConfigStore.secondmentDel({
        id: row.id,
      });
      if (!error) {
        ElMessage({
          type: "success",
          message: "删除成功!",
        });
        getSecondmentPageListAPI(paginationData.value);
      }
    },
  });
};
// 表格编辑
const editFn = (row) => {
  const data = ref({
    staff: row.userName, // 员工
    employee: row, // 员工数据
    plate: row.plageCode, // 板块
    region: row.areaCode, // 区域
  });
  proxy.$ModalDialog({
    title: "编辑",
    confirmText: "提交",
    dialogWidth: "728px",
    renderComponent: {
      data,
      component: MaintainCreateModelDialog,
    },
    onConfirm: async (instance) => {
      const isValid = await instance.validationRules();
      if (isValid) {
        const currentPlage = plageDictList.value.find(
          (item) => item.itemKey === instance.NewPlage
        );
        const currentRegion = areaDictList.value.find(
          (item) => item.itemKey === instance.NewRegion
        );
        const { error } = await permissionConfigStore.secondmentUpdate({
          ...data.value.employee,
          areaCode: instance.NewRegion,
          areaName: currentRegion.itemValue,
          id: row.id,
          plageCode: instance.NewPlage,
          plageName: currentPlage.itemValue,
        });
        if (!error) {
          ElMessage({
            type: "success",
            message: "修改成功",
          });
          getSecondmentPageListAPI(paginationData.value);
        }
      } else {
        return Promise.reject(new Error("error"));
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.el-card {
  // width: calc(100vw - 40px);
  margin: 0px 20px;
}
.el-scrollbar {
  height: calc(100vh - 75px);
}
.el-form-item--small.el-form-item {
  display: flex;
  align-items: center;
}
.btns {
  position: relative;
}
.reset {
  position: absolute;
  right: 65px;
}
.refer {
  position: absolute;
  right: 0;
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
.card_two {
  // height: calc(100vh - 50px);
}
:deep() {
  .el-card__body {
    padding-top: 17px;
  }
}

.underline {
  &:hover {
    text-decoration-line: underline;
  }
}

.el-pagination {
  float: right;
  margin: 16px 0;
}
</style>
