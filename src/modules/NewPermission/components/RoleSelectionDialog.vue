<template>
  <div class="main">
    <div>根据您选择的角色，我们将自动为您筛选出本版块内与该角色员工：</div>
    <!-- <el-scrollbar height="300px"> -->
    <el-form
      ref="formRef"
      v-infinite-scroll="load"
      label-position="top"
      :model="modelValue"
      :rules="rules"
      style="overflow: auto; height: 300px"
    >
      <el-form-item label="角色" prop="roleList">
        <el-checkbox-group v-model="modelValue.roleList">
          <el-checkbox
            v-for="item in roleList"
            :key="item.itemKey"
            :label="item.itemKey"
            :value="item.itemKey"
            name="roleList"
          >
            {{ item.itemValue }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script >
import { ref, defineComponent } from "vue";
import { useNewPermissionStore } from "modules/NewPermission/store";
export default defineComponent({
  name: "RankSelectionDialog",
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
    const newPermissionStore = useNewPermissionStore();
    // 校验规则
    const rules = ref({
      // roleList: [{ type: 'array', required: true, message: '请至少选择一个角色', trigger: 'change' }]
    });

    const count = ref(0);
    const load = () => {
      count.value += 2;
    };
    const roleList = ref([]);
    const getUserListByRoleAPI = async () => {
      const { error, result } = await newPermissionStore.askDeptRolesDict();
      if (!error) {
        roleList.value = result;
      }
    };
    getUserListByRoleAPI();
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
    return {
      rules,
      formRef,
      validationRules,
      roleList,
      getUserListByRoleAPI,
      load,
      count,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  padding: 16px;
}
:deep() {
  .el-checkbox.el-checkbox--small {
    padding: 0 8px;
    &:hover {
      background-color: #f2f3f5;
    }
  }
}
.el-form {
  margin-top: 16px;
}
.el-checkbox {
  color: #303133;
  font-weight: 400;
}
</style>
