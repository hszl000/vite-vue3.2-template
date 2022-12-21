<template>
  <div class="box">
    <el-scrollbar>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/config/permissionconfig' }">
          权限管理
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.query.id"> 编辑 </el-breadcrumb-item>
        <el-breadcrumb-item v-else> 新建 </el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <div v-if="route.query.id" class="create">编辑</div>
        <div v-else class="create">新建</div>
        <el-form ref="rormRef" :rules="rules" :model="permissionList">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="岗位编码" prop="postCode">
                <el-input
                  v-model.trim="permissionList.postCode"
                  placeholder="请输入"
                  disabled
                  class="post_code"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="岗位名称" prop="postName">
                <el-input
                  v-model.trim="permissionList.postName"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="授权用户">
            <el-tabs
              v-model="activeName"
              type="border-card"
              class="demo-tabs"
              @tab-click="handleClick"
            >
              <el-tab-pane label="授权用户" name="first">
                <AuthorizedUsers ref="authorizedUsersRef" />
              </el-tab-pane>
              <el-tab-pane label="职级自动匹配" name="second">
                <RankMatching ref="rankMatchingRef" />
              </el-tab-pane>
              <el-tab-pane label="角色自动匹配" name="third">
                <RoleMatching ref="roleMatchingRef" />
              </el-tab-pane>
            </el-tabs>
          </el-form-item>
          <el-form-item label="权限分配">
            <el-tree
              ref="treeRef"
              :data="treeData"
              show-checkbox
              node-key="menuCode"
              :props="defaultProps"
              default-expand-all
              :expand-on-click-node="false"
              :default-checked-keys="checkedId"
              :check-on-click-node="true"
              :check-strictly="true"
              @node-click="nodeClick"
              @check="checkboxChange"
              @check-change="checkedChangeFn"
            >
              <template #default="{ data }" class="custom-tree-node">
                <span>{{ data.menuName }}</span>

                <span v-show="data.menuType === 1">
                  <el-select
                    v-model="data.dataRole"
                    placeholder="请选择"
                    size="small"
                  >
                    <el-option
                      v-for="item in dataRoleMap"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </span>
              </template>
            </el-tree>
          </el-form-item>
          <div class="submitBtn">
            <el-button type="primary" @click="submitFn"> 提交 </el-button>
          </div>
        </el-form>
      </el-card>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  getCurrentInstance,
  watch,
  onBeforeMount,
  nextTick,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNewPermissionStore } from "modules/NewPermission/store";
import {useUserAccountStore} from 'modules/UserAccount/store'
import AuthorizedUsers from "@/modules/NewPermission/components/AuthorizedUsers.vue";
import RankMatching from "@/modules/NewPermission/components/RankMatching.vue";
import RoleMatching from "@/modules/NewPermission/components/RoleMatching.vue";
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const newPermissionStore = useNewPermissionStore();
	const userAccountStore = useUserAccountStore()
// 获取当前登陆人权限
const permissionMenu = computed(()=>userAccountStore.getPermissionList)

const authorizedUsersRef = ref(null);
const rankMatchingRef = ref(null);
const roleMatchingRef = ref(null);

const permissionList = ref({
  postCode: "", // 岗位编码
  postName: "", // 岗位名称
});
// 校验规则
const rules = ref({
  postName: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
});

const activeName = ref("first");

const handleClick = (tab, event) => {
  console.log(tab, event);
};

// 获取树形数据
const treeData = computed(() => newPermissionStore.getTree);
const getTreeAPI = async () => {
  await newPermissionStore.askTree({ code: "" });
  console.log("getTreeAPI");
};
getTreeAPI();

const defaultProps = {
  children: "children",
  label: "label",
};

const treeRef = ref(null);

const dataRoleMap = ref([
  {
    label: "本人",
    value: 0,
  },
  {
    label: "本部门",
    value: 1,
  },
  {
    label: "本区域",
    value: 2,
  },
  {
    label: "本版块",
    value: 3,
  },
  {
    label: "全所",
    value: 4,
  },
  {
    label: "项目组",
    value: 5,
  },
  {
    label: "本区域本板块",
    value: 6,
  },
  {
    label: "本条线",
    value: 7,
  },
  {
    label: "负责机构",
    value: 8,
  },
]);

const checkedNodes = ref([]);
const checkedList = ref([]);
const resultData = ref([]);
const checkedChangeFn = () => {
  checkedList.value = treeRef.value.getCheckedNodes();
  // checkedId.value = checkedList.value.map((item) => {
  //   return item.id
  // })
  // console.log(checkedList.value, '////')
  checkedNodes.value = treeRef.value.getCheckedNodes();
  checkedNodes.value.forEach((item) => {
    resultData.value.forEach((im) => {
      if (item.menuCode === im.menuCode) {
        if (item.dataRole) {
          Object.assign(item, { id: im.id });
        } else {
          Object.assign(item, { dataRole: im.dataRole, id: im.id });
        }
      }
    });
  });
};
const rormRef = ref(null);
	const generateMenu = async()=>{
  const userCode = userAccountStore.getUserInfo.userCode
  return userAccountStore.askUserMenu({code:userCode})
}
// 提交
const submitFn = async () => {
  rormRef.value.validate(async (valid) => {
    const row = checkedList.value.filter((item) => item.menuType === 1);
    const currentRow = row.every(
      (item) => item.dataRole !== null && item.dataRole !== ""
    );
    if (valid) {
      if (
        (authorizedUsersRef.value.authorizeUserList.length > 0 ||
          rankMatchingRef.value.tableData.length > 0 ||
          roleMatchingRef.value.tableData.length > 0) &&
        checkedList.value.length > 0 &&
        currentRow
      ) {
         const asorgroleUuid = roleMatchingRef.value.tableData?.map((item) => {
          return { asorgroleUuid: item.asorgroleUuid };
        });
        const levelCode = rankMatchingRef.value.tableData?.map((item) => {
          return { levelCode: item.levelCode };
        });
        // 过滤数组中对象
        const myMap = (arr, key) => {
          const map = new Map();
          for (const item of arr) {
            if (!map.has(item[key])) {
              map.set(item[key], item);
            }
          }
          return [...map.values()];
        };
        if (route.query.id) {
          // 调修改
          const { error } = await newPermissionStore.updateById({
              roleName: permissionList.value.postName, // 岗位名称
              byLevelUserList:
                levelCode === undefined ? [] : myMap(levelCode, "levelCode"), // 职级自动匹配用户
              byRoleUserList:
                asorgroleUuid === undefined
                  ? []
                  : myMap(asorgroleUuid, "asorgroleUuid"), // 角色自动匹配用户
              menuTree: checkedList.value, // 权限树
              userList:
                authorizedUsersRef.value.authorizeUserList === null
                  ? []
                  : authorizedUsersRef.value.authorizeUserList, // 授权用户
              id: route.query.id,
          });
          if (!error) {
            ElMessage({
              type: "success",
              message: "编辑成功",
            });
            await generateMenu()
            if(permissionMenu.value.includes("4-2")){
              router.push("/config/permissionconfig");
            }else{
              router.push("/home");
            }
          }
        } else {
          // 调新增
          const { error } = await newPermissionStore.add({
            roleName: permissionList.value.postName, // 岗位名称
            byLevelUserList: rankMatchingRef.value.tableData, // 职级自动匹配用户
            byRoleUserList: roleMatchingRef.value.tableData, // 角色自动匹配用户
            menuTree: checkedList.value, // 权限树
            userList: authorizedUsersRef.value.authorizeUserList, // 授权用户
          });
          if (!error) {
            ElMessage({
              type: "success",
              message: "提交成功",
            });
            await generateMenu()
            if(permissionMenu.value.includes("4-2")){
              router.push("/config/permissionconfig");
            }else{
              router.push("/home");
            }
          }
        }
      } else {
        ElMessage({
          type: "warning",
          message: "请勾选用户/权限后再提交",
        });
      }
    } else {
      ElMessage({
        type: "warning",
        message: "请输入岗位名称后再提交",
      });
    }
  });
};

const checkedId = ref([]);
watch(
  () => route.query.id,
  async (newVal) => {
    if (newVal) {
      await getTreeAPI();
      nextTick(async () => {
        const { error, result } = await newPermissionStore.detail({
          id: newVal,
        });
        if (!error) {
          console.log("detailAPI");
          resultData.value = result.menuTree;
          permissionList.value.postCode = result.roleCode;
          permissionList.value.postName = result.roleName;
          authorizedUsersRef.value.authorizeUserList = result.userList;
          authorizedUsersRef.value.authorizeUserList.forEach((item) => {
            authorizedUsersRef.value.tableRef.toggleRowSelection(item, true);
          });
          rankMatchingRef.value.tableData = result.byLevelUserList;
          roleMatchingRef.value.tableData = result.byRoleUserList;
          checkedId.value = result.menuTree.map((item) => {
            return item.menuCode;
          });
        }
      });
    }
  },
  { immediate: true }
);

// 点击节点
const nodeClick = (a, b) => {
  // 判断是否有父节点，父节点是否选中
  if (b.checked && !b.parent.checked && b.parent.level !== 0) {
    b.checked = false;
    ElMessage({
      type: "warning",
      message: "请勾选权限后再选择",
    });
  }
};
// 点击节点复选框
const checkboxChange = (a, b) => {
  const currentNode = treeRef.value.getNode(a);
  // 判断是否有父节点，父节点是否选中
  if (
    currentNode.checked &&
    !currentNode.parent.checked &&
    currentNode.parent.level !== 0
  ) {
    currentNode.checked = false;
    ElMessage({
      type: "warning",
      message: "请勾选权限后再选择",
    });
  }
  // 当父节点取消选中子节点也取消选中
  function change(Node) {
      const current = treeRef.value.getNode(Node);
      current.checked = false;
      if (Node.childNodes) {
        for (let i = 0; i < current.childNodes.length; i++) {
          change(current.childNodes[i]);
        }
      }
    }
  if (!currentNode.checked) {
    change(currentNode);
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 0 10px;
}
.el-card {
  margin-top: 10px;
  position: relative;
}
.create {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #303133;
}
.el-form {
  margin: 16px 10px 10px;
}
.el-form-item--small.el-form-item {
  display: flex;
  align-items: flex-start;
}
:deep() {
  .el-form-item--small .el-form-item__label {
    line-height: 30px;
  }
}
.el-scrollbar {
  height: calc(100vh - 75px);
}

.submitBtn {
  // width: 100%;
  // background-color: #fff;
  // position: fixed;
  // bottom: 0;
  display: flex;
  justify-content: center;
  // padding: 10px 0;
  // z-index: 9;
  margin-top: 32px;
  margin-bottom: 24px;
  .el-button {
    width: 96px;
    height: 40px;
    font-size: 16px;
  }
}
:deep() {
  .el-select .el-input {
    margin-left: 10px;
    width: 100px;
  }
  .el-form-item.is-error .el-input__inner {
    border-color: #c0c4cc;
  }
}
:deep() {
  .el-tree-node__content {
    height: 32px;
    color: #303133;
  }
}

:deep() {
  .el-breadcrumb__inner.is-link,
  .el-breadcrumb__inner a {
    font-weight: 400;
    color: #909399;
    font-family: PingFangSC-Regular, PingFang SC;
    &:hover {
      color: #005dea;
    }
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    font-family: PingFangSC-Regular, PingFang SC;
    color: #303133 !important;
  }
}

:deep() {
  .el-card__body {
    padding-top: 16px !important;
  }
}
:deep() {
  .el-tabs--border-card {
    box-shadow: none;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item {
    color: #303133;
  }
}
</style>
