<template>
<router-link
  to="/"
  class='logo-title'
>
  <img src="@/assets/images/logo3x.png" alt="logo" class='logo' />
  <h4>{{ $t("layout.title") }}</h4>
</router-link>
</template>

<script setup>
</script>

<style lang='scss' scoped>
.logo-title{
  color:var(--el-color-primary-light-7);
  display: flex;
  align-items: center;

  .logo{
    width: 50px;
    height: 28px;
    margin-right: 10px;
  }
}
</style>