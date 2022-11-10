<template>
  <el-dropdown class="avatar-containe">
    <!-- 头像 -->
    <div class="avatar-wrapper">
      <!-- <el-avatar
        shape="square"
        :size="40"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      /> -->
      <div class="userName">张三</div>
    </div>
    <template #dropdown>
      <el-dropdown-menu class="user-drop-down">
        <el-dropdown-item @click="routerHome">{{
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
const router = useRouter();
// 主动退出
const logout = () => {};
// 跳转首页
const routerHome = () => {
  router.push("/");
};
</script>

<style lang='scss' scoped>
.userName {
  font-size: 16px;
  font-weight: 600;
  margin: 0 5px;
}
</style>