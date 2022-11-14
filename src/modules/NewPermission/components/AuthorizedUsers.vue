<template>
  <div class="btns">
    <el-button @click="deleteFn"> 删除 </el-button>
    <el-button type="primary" @click="addFn"> 新增 </el-button>
  </div>
  <el-table
    ref="tableRef"
    border
    :header-cell-style="tableHeaderCellStyle"
    :data="authorizeUserList"
    style="width: 100%"
    height="297px"
    :row-style="{ height: '48px' }"
    @selection-change="handleSelectionChange"
  >
    <el-table-column :resizable="false" type="selection" width="50" />
    <el-table-column
      :resizable="false"
      label="工号"
      property="userCode"
      width="220"
    />
    <el-table-column
      :resizable="false"
      property="userName"
      label="姓名"
      width="220"
    />
    <el-table-column
      :resizable="false"
      property="levelName"
      label="职级"
      width="220"
    />
    <el-table-column
      :resizable="false"
      property="deptName"
      label="部门"
      :show-overflow-tooltip="true"
      width="220"
    />
    <el-table-column
      :resizable="false"
      property="address"
      label="操作状态"
      width="220"
    >
      <template #default="{ row }">
        <span class="status-dot">
          <i
            :style="{
              backgroundColor: statusDataMap[row.id !== null ? 0 : 1].color,
            }"
          ></i>
          {{ statusDataMap[row.id !== null ? 0 : 1].text }}
        </span>
      </template>
    </el-table-column>
    <template #empty>
      <p class="empty">
        暂无数据，请 <span class="add" @click="addFn">新增</span>
      </p>
    </template>
  </el-table>
  <div class="rightDrawer">
    <el-drawer
      v-model="addDrawer"
      direction="rtl"
      :size="722"
      destroy-on-close
      title="新增用户"
      custom-class="wrap-manuscript-search"
    >
      <hr class="hr_class" />
      <el-scrollbar>
        <div class="main">
          <el-form>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="姓名/工号"
                  style="position: relative; margin-left: -4px"
                >
                  <el-input
                    v-model.trim="name"
                    size="small"
                    placeholder="请输入"
                    suffix-icon="el-icon-search"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8" class="draw_btn">
                <el-button @click="resetFn"> 重置 </el-button>
                <el-button type="primary" @click="serchFn"> 查询 </el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-table
            border
            :header-cell-style="tableHeaderCellStyle"
            :data="addUserPageList"
            style="width: 96%"
            class="draw_table"
            height="540px"
            :row-style="{ height: '48px' }"
            @selection-change="selectionChangeFn"
          >
            <el-table-column
              :resizable="false"
              type="selection"
              width="50"
              :selectable="selectableFn"
            />
            <el-table-column
              :resizable="false"
              label="工号"
              width="116"
              property="userCode"
            />
            <el-table-column
              :resizable="false"
              property="userName"
              label="姓名"
              width="116"
            />
            <el-table-column
              :resizable="false"
              property="levelName"
              label="职级"
              width="145"
            />
            <el-table-column
              :resizable="false"
              property="deptName"
              label="部门"
              width="232"
              :show-overflow-tooltip="true"
            />
            <template #empty>
              <p class="empty">暂无数据</p>
            </template>
          </el-table>
          <span class="select">已选{{ selectNum }}人</span>
          <el-pagination
            v-model:currentPage="paginationData.pageNum"
            v-model:page-size="paginationData.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total,sizes, prev, pager, next"
            :total="total"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-scrollbar>
      <div class="drawer_footer_btn">
        <el-button @click="cancelFn"> 取消 </el-button>
        <el-button type="primary" @click="addToFn"> 添加 </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  ref,
  watch,
  computed,
  getCurrentInstance,
  defineExpose,
  nextTick,
} from "vue";
import { useNewPermissionStore } from "modules/NewPermission/store";
import { useRoute } from "vue-router";
import { setScrollTop } from "utils/setScrolltop";
import { ElMessage } from "element-plus";

const { proxy } = getCurrentInstance();

const newPermissionStore = useNewPermissionStore();
const route = useRoute();

// 右侧抽屉 新增用户列表
// const addUserPageList = ref([])
const addUserPageList = computed(
  () => newPermissionStore.addUserPageList.records
);
const total = computed(() => newPermissionStore.addUserPageList.total);

const tableRef = ref(null);

// 获取列表
const getAddUserPageAPI = async (params) => {
  await newPermissionStore.askAddUserPage(params);
};
getAddUserPageAPI({ pageSize: 10, pageNum: 1 });

const name = ref("");

// 重置
const resetFn = () => {
  name.value = "";
  paginationData.value.pageNum = 1;
  getAddUserPageAPI({ pageSize: 10, pageNum: 1 });
};
// 查询
const serchFn = async () => {
  paginationData.value.pageNum = 1;
  await newPermissionStore.askAddUserPage({
    pageNum: 1,
    pageSize: paginationData.value.pageSize,
    name: name.value,
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

const statusDataMap = {
  1: {
    text: "待添加",
    color: "#C8C9CC",
  },
  0: {
    text: "已生效",
    color: "#005DEA",
  },
};

const addDrawer = ref(false);
const addFn = () => {
  addDrawer.value = true;
};

const selectNum = ref(0);
const selectRow = ref([]);
const selectionChangeFn = (row) => {
  selectNum.value = row.length;
  selectRow.value = row;
};

const selectableFn = (row) => {
  const alreadySelect = authorizeUserList.value.map((item) => item.userCode);
  if (alreadySelect.includes(row.userCode)) {
    return false;
  } else {
    return true;
  }
};
// 取消
const cancelFn = () => {
  addDrawer.value = false;
  name.value = "";
  getAddUserPageAPI({ pageSize: 10, pageNum: 1 });
};
// 授权用户列表
const authorizeUserList = ref([]);

// 添加
const addToFn = () => {
  addDrawer.value = false;
  name.value = "";
  getAddUserPageAPI({ pageSize: 10, pageNum: 1 });
  authorizeUserList.value.push(...selectRow.value);
};

// 删除
const deleteFn = () => {
  const idList = deleteRow.value.map((item) => item.userCode);
  if (idList.length < 1) {
    ElMessage({
      type: "warning",
      message: "请选择要删除的数据",
    });
  } else {
    authorizeUserList.value = authorizeUserList.value.filter(
      (item) => !idList.includes(item.userCode)
    );
  }
};
const deleteRow = ref([]);
const handleSelectionChange = (row) => {
  deleteRow.value = row;
};
// 分页数据------
const paginationData = ref({
  pageNum: 1, // 页码
  pageSize: 10, // 每页数据
});

// 每页显示的条数发生改变时触发
const handleSizeChange = (newSize) => {
  paginationData.value.pageSize = newSize;
  getAddUserPageAPI({
    pageSize: newSize,
    pageNum: paginationData.value.pageNum,
    name: name.value,
  });
};
// 当前页面发生改变时触发
const handleCurrentChange = (newPage) => {
  paginationData.value.pageNum = newPage;
  setScrollTop();
  getAddUserPageAPI({
    pageNum: newPage,
    pageSize: paginationData.value.pageSize,
    name: name.value,
  });
};
// 暴露组件数据
defineExpose({
  authorizeUserList,
  tableRef,
});
</script>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: flex-end;
}
.el-table {
  margin-top: 16px;
}
:deep() {
  .el-table__empty-block {
    width: 100% !important;
  }
}
.empty {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #606266;
}
.add {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #005dea;
  &:hover {
    cursor: pointer;
  }
}
.el-form {
  padding: 10px 10px 0 10px;
}
.rightDrawer {
  position: relative;
  :deep() {
    .wrap-manuscript-search {
      .el-drawer__header {
        // border-bottom: 1px solid #cdcdcd;
        margin-bottom: 16px;
        margin-top: -12px;
        color: #303133;
        font-weight: 500;
      }
    }
  }
}
.draw_btn {
  margin-left: 10px;
}
.draw_table {
  margin: 0 16px;
  margin-top: 0 !important;
}
.el-pagination {
  padding: 0 10px;
  --el-pagination-button-width: 26.5px;
}
:deep() {
  .el-pagination .el-select .el-input .el-input__inner {
    width: 90px;
  }
}
.select {
  display: inline-block;
  margin: 15px 0 16px 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #909399;
}
.el-pagination {
  float: right;
}
.drawer_footer_btn {
  padding: 18px 16px 18px 10px;
  width: 705px;
  background: #fff;
  position: fixed;
  bottom: 0px;
  right: 0px;
  display: flex;
  justify-content: flex-end;
  z-index: 33;
}
:deep() {
  .el-select .el-input {
    margin-left: 0px !important;
    width: 100% !important ;
  }
}
// .icon_search{
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   color: #cecfd2;
// }
.status-dot i {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #c0c4cc;
  display: inline-block;
  margin-right: 3px;
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
        margin: 0 2px;
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
  .el-pagination__jump {
    margin-left: 1px;
  }
  .el-pagination__total {
    margin-right: 1px;
  }
  .el-pagination__sizes {
    margin-right: 0;
  }
}
.el-scrollbar {
  height: calc(100vh - 110px);
}
.main {
  height: calc(100vh - 40px);
  .el-form {
    padding-top: 16px;
  }
}
.hr_class {
  border: none;
  border-top: 1px solid #dcdee0;
}
</style>
