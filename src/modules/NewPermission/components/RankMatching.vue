<template>
  <div class="btns">
    <el-alert
      title="该列表是当前岗位自动通过职级获得权限的用户，不可编辑！"
      show-icon
      :closable="false"
      class="alert_info"
    />
    <el-button type="primary" @click="rankSelectionFn"> 职级选择 </el-button>
  </div>
  <el-table
    v-loading="loading"
    element-loading-text="Loading..."
    border
    :header-cell-style="tableHeaderCellStyle"
    :data="tableData"
    style="width: 100%"
    height="297px"
    :row-style="{ height: '48px' }"
  >
    <el-table-column
      :resizable="false"
      label="工号"
      width="230"
      property="userCode"
    />
    <el-table-column
      :resizable="false"
      property="userName"
      label="姓名"
      width="230"
    />
    <el-table-column
      :resizable="false"
      property="levelName"
      label="职级"
      width="230"
    />
    <el-table-column
      :resizable="false"
      property="deptName"
      label="部门"
      :show-overflow-tooltip="true"
      width="230"
    />
    <el-table-column
      :resizable="false"
      property="address"
      label="操作状态"
      width="230"
    >
      <template #default="{ row }">
        <span class="status-dot">
          <i
            :style="{
              backgroundColor: statusDataMap[row.types ? 0 : 1].color,
            }"
          ></i>
          {{ statusDataMap[row.types ? 0 : 1].text }}
        </span>
      </template>
    </el-table-column>
    <template #empty>
      <p class="empty">
        暂无数据，请 <span class="add" @click="rankSelectionFn">选择职级</span>
      </p>
    </template>
  </el-table>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { useNewPermissionStore } from "modules/NewPermission/store";
import RankSelectionDialog from "@/modules/NewPermission/components/RankSelectionDialog.vue";
const { proxy } = getCurrentInstance();
const newPermissionStore = useNewPermissionStore();
const tableData = ref([]);
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
const loading = ref(false);

const submitFn = () => {};
const rankSelectionFn = () => {
  const newData = ref([]);
  if (tableData.value.length) {
    tableData.value.forEach((item) => {
      newData.value.push(item.levelCode);
    });
  }
  const setData = ref([]);
  if (newData.value.length) {
    newData.value.forEach((item) => {
      if (setData.value.indexOf(item) === -1) {
        setData.value.push(item);
      }
    });
  }
  const data = ref({
    rankList: setData.value,
  });
  proxy.$ModalDialog({
    title: "职级选择",
    confirmText: "提交",
    dialogWidth: "408px",
    renderComponent: {
      data,
      component: RankSelectionDialog,
    },
    onConfirm: async (instance) => {
      const isValid = await instance.validationRules();
      if (isValid) {
        if (data.value.rankList.length) {
          loading.value = true;
          console.log(data.value.rankList, "data.value.rankList");
          const { error, result } = await newPermissionStore.askUserListByLevel(
            {
              code: data.value.rankList,
            }
          );
          if (!error) {
            tableData.value = result;
            loading.value = false;
          }
        } else {
          tableData.value = [];
        }
      } else {
        return Promise.reject(new Error("error"));
      }
    },
  });
};
// 暴露组件数据
defineExpose({
  tableData,
});
</script>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: space-between;
  height: 32px;
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
.alert_info {
  background-color: #edf4ff;
  border: 1px solid #4a91ff;
  border-radius: 3px;
  width: 440px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #303133;
}
.el-button {
  height: 32px;
}
:deep() {
  .el-alert__icon {
    color: #005dea;
  }
}

.status-dot i {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #c0c4cc;
  display: inline-block;
  margin-right: 3px;
}
</style>
