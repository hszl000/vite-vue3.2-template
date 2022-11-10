<template>
  <div class="module-login">
    <div class="login">
      <div class="login-title">通用管理系统</div>
      <el-form
        ref="loginFrom"
        :model="fromData"
        :rules="rules"
        label-width="auto"
        label-suffix=":"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="fromData.userName"
            :placeholder="`${$t('login.placeholder')}${$t('login.userName')}`"
          >
            <template #prefix>
              <icon-font icon="user" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="fromData.passWord"
            :placeholder="`${$t('login.placeholder')}${$t('login.passWord')}`"
            :type="inputType ? 'text' : 'password'"
          >
            <template #prefix>
              <icon-font icon="pass" />
            </template>
            <template #suffix>
              <div @click="passOpen">
                <icon-font icon="eye" v-show="!inputType" />
                <icon-font icon="eye-open" v-show="inputType" />
              </div>
            </template>
          </el-input>
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
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";
import {
  userValidator,
  passValidator,
} from "@/modules/UserAccount/hooks/rule.js";
import { useRouter } from "vue-router";

// 获取 this
const { proxy } = getCurrentInstance();
// router
const router = useRouter();

// 表单实例对象
const loginFrom = ref(null);

// 账号密码收集
const fromData = ref([
  {
    userName: "",
    passWord: "",
  },
]);

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
const loginSubmit = () => {
  loginFrom.value.validate((isValid, invalidFields) => {
    if (isValid) {
      /**
       * 1.请求接口
       * 2.是否登陆成功
       *    - 成功 进入系统
       *    -不成功 login页
       */
      router.replace({ name: "Book" });
    }
  });
};
// 重置
const loginResert = () => {
  loginFrom.value.resetFields();
};

// 输入框类型
const inputType = ref(false);

const passOpen = () => {
  inputType.value = !inputType.value;
};
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