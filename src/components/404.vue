<template>
<div class='error-box'>
  <div class='icon-home'>
    <icon-font icon='404' class='address-error' />
    <p>
      <span>页面丢失，返回 <router-link to='/' class='home-link'>Home</router-link> 页</span>
    </p>
  </div>
</div>
</template>

<script setup></script>

<style lang='scss' scoped>
.error-box{
  display: flex;
  justify-content: center;

  .icon-home{
    display: flex;
    align-items: center;
    flex-direction: column;
    .address-error{
      width: 200px;
      height: 200px;
      color:var(--el-color-primary-light-5);
    }
    
    .home-link{
      font-weight: 800;
      color:var(--el-color-primary-light-5);
    }
  }
}
</style>