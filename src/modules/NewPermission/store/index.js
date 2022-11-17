import { defineStore } from "pinia";
import {
  getTree,
  getAddUserPage,
  getUserLevelDict,
  getPageUserDictList, // 分页人员字典列表
  getUserListByLevel,
  getDeptRolesDict,
  getUserListByRole,
  add,
  detail,
  updateById,
  getUserDictList,
} from "modules/NewPermission/api";
import mixin from "store/utils/mixin";

export const useNewPermissionStore = defineStore("NewPermissionStore", {
  state() {
    return {
      tree: [],
      addUserPageList: [],
      userLevelDict: [],
      userListByLevel: [],
      deptRolesDict: [],
      UserListByRole: [],
      // userDictList: [],
      // pageUserDictList: [], // 分页人员字典列表
    };
  },
  getters: {
    getUserLevelDict: (state) => state.userLevelDict,
    getTree: (state) => state.tree,
  },
  actions: {
    // 获取树形数据
    async askTree(data) {
      const res = await getTree(data);
      return this.filterResponse(res, ({ result }) => {
        this.tree = result;
      });
    },
    // 获取新增 用户列表
    async askAddUserPage(data) {
      const res = await getAddUserPage(data);
      return this.filterResponse(res, ({ result }) => {
        this.addUserPageList = result;
      });
    },
    // 用户职级字典
    async askUserLevelDict(data) {
      const res = await getUserLevelDict(data);
      return this.filterResponse(res, ({ result }) => {
        this.userLevelDict = result;
      });
    },
    // 根据职级查询用户列表
    async askUserListByLevel(data) {
      const res = await getUserListByLevel(data);
      return this.filterResponse(res, ({ result }) => {
        this.userListByLevel = result;
      });
    },
    // 部门角色字典
    async askDeptRolesDict(data) {
      const res = await getDeptRolesDict(data);
      return this.filterResponse(res, ({ result }) => {
        this.deptRolesDict = result;
      });
    },
    // 根据角色查询用户列表
    async askUserListByRole(data) {
      const res = await getUserListByRole(data);
      return this.filterResponse(res, ({ result }) => {
        this.UserListByRole = result;
      });
    },
    // 新增
    async add(data) {
      const res = await add(data);
      return this.filterResponse(res);
    },
    // 详情
    async detail(data) {
      const res = await detail(data);
      return this.filterResponse(res);
    },
    // 根据id修改
    async updateById(data) {
      const res = await updateById(data);
      return this.filterResponse(res);
    },
    // // 根据角色查询用户列表
    // async askUserDictList (data) {
    //   const res = await getUserDictList(data)
    //   return this.filterResponse(res, ({ result }) => {
    //     this.userDictList = result
    //   })
    // },

    // 根据角色查询用户-分页列表
    // async askPageUserDictList (data) {
    //   const res = await getPageUserDictList(data)
    //   return this.filterResponse(res, ({ result }) => {
    //     this.pageUserDictList = result
    //   })
    // }
  },
  ...mixin,
});
