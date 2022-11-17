<template>
  <el-form
    ref="formRef"
    label-position="right"
    :model="modelValue"
    :rules="rules"
    style="padding-bottom: 0px"
  >
    <el-form-item label="选择员工" prop="staff" class="staff">
      <template #label>
        <span style="color: #d40000">*</span>
        选择员工
      </template>
      <div class="project">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-input
              v-model.trim="modelValue.staff"
              placeholder="请输入工号 / 姓名"
              suffix-icon="el-icon-search"
            />
          </el-col>
          <el-col :span="12">
            <el-button type="primary" @click="queryFn"> 查询 </el-button>
            <el-button style="margin-left: 10px" class="reset" @click="resetFn">
              重置
            </el-button>
          </el-col>
        </el-row>
        <el-table
          ref="singleTable"
          border
          :header-cell-style="tableHeaderCellStyle"
          :data="data"
          style="width: 100%; margin-top: 10px"
          height="290px"
          :highlight-current-row="true"
          :row-style="{ height: '48px' }"
          @row-click="handleShowComment"
        >
          <el-table-column
            :resizable="false"
            label="工号"
            width="82"
            property="userCode"
          />
          <el-table-column
            :resizable="false"
            property="userName"
            label="姓名"
            width="88"
          />
          <el-table-column
            :resizable="false"
            property="levelName"
            label="职级"
            width="182"
          />
          <el-table-column
            :resizable="false"
            property="deptName"
            label="部门"
            width="188"
            :show-overflow-tooltip="true"
          />
          <template #empty>
            <p class="empty">暂无数据</p>
          </template>
        </el-table>
        <div style="display: flex; justify-content: flex-end">
          <el-pagination
            v-model:current-page="paginationData.pageNum"
            v-model:page-size="paginationData.pageSize"
            :page-sizes="[5, 10]"
            layout="total, prev, pager, next"
            :total="total"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="负责板块" prop="plate">
          <el-select
            v-model="modelValue.plate"
            style="width: 100%"
            placeholder="请选择"
            clearable
            @change="changeFn"
          >
            <el-option
              v-for="item in plageList"
              :key="item.itemKey"
              :label="item.itemValue"
              :value="item.itemKey"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="负责区域" prop="region">
          <el-select
            v-model="modelValue.region"
            style="width: 100%"
            placeholder="请选择"
            clearable
            @change="regionhangeFn"
          >
            <el-option
              v-for="item in regionList"
              :key="item.itemKey"
              :label="item.itemValue"
              :value="item.itemKey"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script >
import { ref, defineComponent, computed, watch, nextTick } from "vue";
import { useSecondmentApplicationStore } from "modules/SecondmentApplication/store";
import { usePermissionConfigStore } from "modules/permissionConfig/store";
import { setScrollTop } from "utils/setScrolltop";

export default defineComponent({
  name: "MaintainCreateModelDialog",
  components: {},
  props: {
    modelValue: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const secondmentApplicationStore = useSecondmentApplicationStore();
    const permissionConfigStore = usePermissionConfigStore();
    // 校验规则
    const rules = ref({
      plate: [{ required: true, message: "请选择负责板块", trigger: "change" }],
      region: [
        { required: true, message: "请选择负责区域", trigger: "change" },
      ],
    });
    const singleTable = ref(null);
    //  ---------板块------------
    const plageList = ref([]);
    const getPlageNameList = async () => {
      const { error, result } = await secondmentApplicationStore.plageDict();
      if (!error) {
        plageList.value = result;
      }
    };
    getPlageNameList();
    // ----------区域------------
    const regionList = ref([]);
    const getRegionList = async () => {
      const { error, result } = await secondmentApplicationStore.areaDict();
      if (!error) {
        regionList.value = result;
      }
    };
    getRegionList();

    const formRef = ref(null);
    // 表单校验
    const validationRules = async () => {
      return new Promise((resolve) => {
        formRef.value.validate(async (valid) => {
          if (valid) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
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
    const data = computed(() => permissionConfigStore.getUserList.records);
    const total = computed(() => permissionConfigStore.getUserList.total);

    // 分页数据------
    const paginationData = ref({
      pageNum: 1, // 页码
      pageSize: 5, // 每页数据
      query: props.modelValue.staff,
    });

    const getUserListByCodeOrNameAPI = async (params) => {
      paginationData.value.pageNum = params.pageNum;
      paginationData.value.pageSize = params.pageSize;
      await permissionConfigStore.askUserListByCodeOrName({
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        query: params.query,
      });

      if (props.modelValue.employee !== "") {
        const list = data.value.find((item) => {
          return item.userCode === props.modelValue.employee.userCode;
        });
        singleTable.value.setCurrentRow(list);
      }
    };
    getUserListByCodeOrNameAPI(paginationData.value);

    // 查询
    const queryFn = async () => {
      getUserListByCodeOrNameAPI(paginationData.value);
    };

    // 重置
    const resetFn = () => {
      props.modelValue.staff = "";
      paginationData.value.query = "";
      // props.modelValue.employee = ''
      getUserListByCodeOrNameAPI({
        pageNum: 1,
        pageSize: 5,
        query: props.modelValue.staff,
      });
    };

    // 每页显示的条数发生改变时触发
    const handleSizeChange = (newSize) => {
      paginationData.value.pageSize = newSize;
      getUserListByCodeOrNameAPI({
        pageSize: newSize,
        pageNum: paginationData.value.pageNum,
        query: paginationData.value.query,
      });
    };
    // 当前页面发生改变时触发
    const handleCurrentChange = (newPage) => {
      paginationData.value.pageNum = newPage;
      setScrollTop();
      getUserListByCodeOrNameAPI({
        pageNum: newPage,
        pageSize: paginationData.value.pageSize,
        query: paginationData.value.query,
      });
    };
    const handleShowComment = (row) => {
      console.log(row);
      props.modelValue.employee = row;
    };
    // 负责板块
    const NewPlage = ref(props.modelValue.plate);
    const changeFn = (row) => {
      NewPlage.value = row;
    };
    // 负责区域
    const NewRegion = ref(props.modelValue.region);
    const regionhangeFn = (row) => {
      NewRegion.value = row;
    };

    watch(
      () => props.modelValue.staff,
      (newVal) => {
        if (newVal) {
          paginationData.value.query = newVal;
        }
      },
      {
        immediate: true,
      }
    );
    return {
      rules,
      formRef,
      validationRules,
      plageList,
      getPlageNameList,
      regionList,
      getRegionList,
      data,
      handleShowComment,
      tableHeaderCellStyle,
      getUserListByCodeOrNameAPI,
      queryFn,
      resetFn,
      singleTable,
      total,
      paginationData,
      handleSizeChange,
      handleCurrentChange,
      changeFn,
      regionhangeFn,
      NewPlage,
      NewRegion,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep() {
  .el-form-item--small .el-form-item__label {
    line-height: 32px;
  }
  .staff {
    display: block;
    margin-top: -8px;
    .el-form-item__label {
      margin-top: 5px;
    }
    .el-form-item__content {
      margin-top: 8px;
    }
  }
}
.reset {
  border: 1px solid #005dea;
  color: #005dea;
}
:deep() {
  .el-pagination {
    margin: 16px 0 16px 0;
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
:deep() {
  tbody tr:hover > td {
    cursor: pointer;
  }
}
.project {
  border: 1px solid #dcdee0;
  padding: 5px;
}
</style>
