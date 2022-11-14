<template>
  <el-dropdown 
    trigger="click"
    class="avatar-containe"
  >
    <div class="avatar-wrapper">
      <h4 class="userName">
        {{userAccountStore.userInfo.userName}}
        ({{userAccountStore.userInfo.userCode}})
      </h4>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="user-drop-down">
        <el-dropdown-item>
          {{userAccountStore.userInfo.userName}}
          ({{userAccountStore.userInfo.userCode}})
        </el-dropdown-item>
        <el-dropdown-item divided @click="routerHome">{{
          $t("layout.home")
        }}</el-dropdown-item>
        <!-- <el-dropdown-item>{{ $t("msg.navBar.course") }}</el-dropdown-item> -->
        <el-dropdown-item divided @click="logout">{{
          $t("layout.logout")
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useRouter } from "vue-router";
import {useUserAccountStore} from 'modules/UserAccount/store'

const userAccountStore = useUserAccountStore()

const router = useRouter();
// 主动退出
const logout = () => {
  router.replace({
    name:'ProjectLogin'
  })
};
// 跳转首页
const routerHome = () => {
  router.push("/");
};
</script>

<style lang='scss' scoped>
.userName {
  margin: 0 5px;
  color:var(--el-color-primary-light-7)
}
</style>