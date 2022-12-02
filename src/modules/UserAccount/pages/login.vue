<template>
  <div class="module-login">
    <div class="login">
      <div class="login-title">通用管理系统</div>
      <el-form
        ref="loginFrom"
        :model="fromData"
        :rules="rules"
        label-suffix=":"
      >
        <el-form-item prop="userName">
          <el-input
            ref='userNameRef'
            v-model="fromData.userName"
            :placeholder="`${$t('login.placeholder')}${$t('login.userName')}`"
          >
            <template #prefix>
              <icon-font icon="user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-tooltip content='已开启大写' placement="right" manual :visible='toolVisible'>
            <el-input
            ref='passWordRef'
            v-model="fromData.passWord"
            :placeholder="`${$t('login.placeholder')}${$t('login.passWord')}`"
            :type="inputType ? 'text' : 'password'"
            @keyup="checkCapslock"
            @blur="()=>toolVisible = false"
          >
            <template #prefix>
              <icon-font icon="pass" />
            </template>
            <template #suffix>
              <div @click="openPwd">
                <icon-font icon="eye" v-show="!inputType" />
                <icon-font icon="eye-open" v-show="inputType" />
              </div>
            </template>
          </el-input>
          </el-tooltip>
        </el-form-item>
        <el-form-item class="login-btns">
          <el-button @click="loginResert">{{ $t("login.reset") }}</el-button>
          <el-button type="primary" @click="loginSubmit">{{
            $t("login.submit")
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { userValidator, passValidator } from "@/modules/UserAccount/hooks/rule.js";
import { useRouter } from "vue-router";
import {useUserAccountStore} from '@/modules/UserAccount/store'
import Cookie from 'js-cookie'

console.log('当前环境-MODE:' + import.meta.env.MODE);
console.log('静态资源路径-BASE_URL:' + import.meta.env.BASE_URL);
console.log('自定义路径-VITE_BASE_URL:' + import.meta.env.VITE_BASE_URL);
// 获取 this
const { proxy } = getCurrentInstance();
// router
const router = useRouter();
// userStore
const userAccountStore = useUserAccountStore()

// 表单实例对象
const loginFrom = ref(null);

// 账号密码收集
const fromData = ref({
    userName: "admin",
    passWord: "admin",
});

// 表单校验规则
const rules = ref({
  userName: [
    {
      required: true,
      message: `${proxy.$t("login.placeholder")}${proxy.$t("login.userName")}`,
      trigger: "blur",
    },
    { validator: userValidator, trigger: "blur" },
  ],
  passWord: [
    {
      required: true,
      message: `${proxy.$t("login.placeholder")}${proxy.$t("login.passWord")}`,
      trigger: "blur",
    },
    { validator: passValidator, trigger: "blur" },
  ],
});

// 登录
const loginSubmit =  () => {
  loginFrom.value.validate(async (isValid, invalidFields) => {
    if (isValid) {
      /**
       * 1.请求接口
       * 2.是否登陆成功
       *    - 成功 进入系统
       *    -不成功 login页
       */
      const {error,data} = await userAccountStore.login(fromData.value)
      if(!error){
        Cookie.set('token',data.token)
        router.replace({ name: "Home" });

      }
    }
  });
};
// 重置
const loginResert = () => {
  loginFrom.value.resetFields();
};

// 输入框类型
const inputType = ref(false);
// 显示隐藏密码
const openPwd = () => {
  inputType.value = !inputType.value;
  passWordRef.value.focus()
};


// 是否开启大小写切换
const toolVisible = ref(false)
const checkCapslock = ({shiftKey,key})=>{
  if(key && key.length === 1){
    if((shiftKey && key>='A' && key<='Z') || !shiftKey &&(key>='A' && key<='Z')){
      toolVisible.value = true
    }else{
      toolVisible.value = false
    }
  }else{
    toolVisible.value = false
  }
  if(key==='CapsLock' && toolVisible.value){
    toolVisible.value = false
  }
}

// 自动聚焦
const userNameRef = ref(null)
const passWordRef = ref(null)
const autoFocus = ()=>{
  if(!fromData.value.userName){
    userNameRef.value.focus()
  }else if(!fromData.value.passWord){
    passWordRef.value.focus()
  }
}

onMounted(()=>{
  autoFocus()
})
</script>

<style lang='scss' scoped>
.module-login {
  width: 100vw;
  height: 100vh;
  // background: #0d1117;
  background: url("@/assets/images/login.jpg") no-repeat;
  background-size: 100% 100%;
  position: relative;
  // overflow: hidden;

  .login {
    width: 300px;
    // height: 200px;
    padding: 24px;
    border-radius: 10px;
    background: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .login-title {
      font-size: 24px;
      font-weight: 800;
      text-align: center;
      margin-bottom: 40px;
    }

    .login-btns {
      :deep(.el-form-item__label-wrap) {
        margin-left: 0 !important;
      }
      :deep(.el-form-item__content) {
        justify-content: center;
      }
    }
  }
}
</style>