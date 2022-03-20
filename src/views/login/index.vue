<template>
  <div class="login-container">
    <el-form ref="formRef" :model="loginForm" :rules="rules" class="login-form">
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>
      <el-form-item prop="userName">
        <svg-icon icon="user" class="svg-container"></svg-icon>
        <el-input
          v-model="loginForm.userName"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <svg-icon icon="password" class="svg-container"></svg-icon>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
        ></el-input>
        <svg-icon
          :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          @click="onChangePwdType"
        ></svg-icon>
      </el-form-item>
      <el-form>
        <el-row>
          <el-col :span="16">
            <el-form-item>
              <svg-icon icon="cpatchaPicture" class="svg-container"></svg-icon>
              <el-input
                v-model="loginForm.captcha"
                placeholder="请输入验证码"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" :push="2">
            <el-image
              style="width: 100px; height: 50px"
              :src="myurl"
              @click="getCaptcha1()"
            ></el-image>
          </el-col>
        </el-row>
      </el-form>

      <el-button type="primary" class="login-button" @click="handleLogin()"
        >登陆</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { loginRules } from './loginRule'
import { getUUID } from '@/api/login'
const store = useStore()

const loginForm = ref({
  userName: '',
  password: '',
  captcha: '',
  uuid: ''
})
const init = () => {
  getCaptcha1()
}
const myurl = ref()

init()
function getCaptcha1() {
  loginForm.value.uuid = getUUID()
  myurl.value = 'http://localhost:8080/api/captcha?uuid=' + loginForm.value.uuid
}

const rules = ref(loginRules)
const passwordType = ref('password')
const formRef = ref(null)
const onChangePwdType = () => {
  passwordType.value === 'password'
    ? (passwordType.value = 'text')
    : (passwordType.value = 'password')
}

const handleLogin = async () => {
  formRef.value.validate((valid) => {
    if (valid) {
      store.dispatch('app/login', loginForm.value)
      getCaptcha1()
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
    .login-button {
      width: 100%;
      box-sizing: border-box;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
