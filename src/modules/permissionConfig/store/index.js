import { defineStore } from "pinia";
import {
  getPage,
  disableSwitch,
  // 人员派遣批量设置
  getList, // 列表
  add, // 新增
  udpate, // 修改
  del, // 删除
  deptTree, // 部门_树
  // 借调协调人维护
  getSecondmentList, // 列表
  getSecondmentPageList, // 分页列表
  secondmentAdd, // 新增
  getUserListByCodeOrName, // 借调协调人维护-根据工号、名称模糊查询用户列表
  secondmentUpdate, // 修改
  secondmentDel, // 删除
} from "modules/permissionConfig/api";
import mixin from "store/utils/mixin";

export const usePermissionConfigStore = defineStore("permissionConfig", {
  state() {
    return {
      permissionList: [],
      // list: [],
      // secondmentList: [],
      pageList: [],
      userList: [],
      // deptTree: [],
    };
  },
  getters: {
    getList: (state) => state.list,
    getPageList: (state) => state.pageList,
    getUserList: (state) => state.userList,
  },
  actions: {
    // 获取权限列表
    async askPage(data) {
      const res = await getPage(data);
      return this.filterResponse(res, ({ result }) => {
        this.permissionList = result;
      });
    },
    // 获取权限列表-停用
    async disableSwitch(data) {
      const res = await disableSwitch(data);
      return this.filterResponse(res);
    },
    // 人员派遣批量设置
    // 列表
    // async askList(data) {
    //   const res = await getList(data);
    //   return this.filterResponse(res, ({ result }) => {
    //     this.list = result;
    //   });
    // },
    // 新增
    // async add(data) {
    //   const res = await add(data);
    //   return this.filterResponse(res);
    // },
    // 修改
    // async udpate(data) {
    //   const res = await udpate(data);
    //   return this.filterResponse(res);
    // },
    // // 删除
    // async del(data) {
    //   const res = await del(data);
    //   return this.filterResponse(res);
    // },
    // 部门_树
    // async askDeptTree(data) {
    //   const res = await deptTree(data);
    //   return this.filterResponse(res, ({ result }) => {
    //     this.deptTree = result;
    //   });
    // },
    // 借调协调人维护
    // 列表
    // async askSecondmentList(data) {
    //   const res = await getSecondmentList(data);
    //   return this.filterResponse(res, ({ result }) => {
    //     this.secondmentList = result;
    //   });
    // },

    // 分页列表
    async askSecondmentPageList(data) {
      const res = await getSecondmentPageList(data);
      return this.filterResponse(res, ({ result }) => {
        this.pageList = result;
      });
    },
    // 新增
    async secondmentAdd(data) {
      const res = await secondmentAdd(data);
      return this.filterResponse(res);
    },
    // 借调协调人维护-根据工号、名称模糊查询用户列表
    async askUserListByCodeOrName(data) {
      const res = await getUserListByCodeOrName(data);
      return this.filterResponse(res, ({ result }) => {
        this.userList = result;
      });
    },
    // 修改
    async secondmentUpdate(data) {
      const res = await secondmentUpdate(data);
      return this.filterResponse(res);
    },
    // 删除
    async secondmentDel(data) {
      const res = await secondmentDel(data);
      return this.filterResponse(res);
    },
  },
  ...mixin,
});
