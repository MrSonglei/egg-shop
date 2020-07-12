<template>
  <layout
    description="vue server side render"
    keywords="egg, vue, webpack, server side render"
  >
    <div class="login">
      <div class="login-form">
        <div class="login-header">
          <p style="font-size: 18px">登录</p>
        </div>
        <div class="login-info">
          <el-input
            v-model="userName"
            placeholder="请输入用户名"
            suffix-icon="fa fa-user"
            clearable
            style="margin-bottom: 18px"
          />

          <el-input
            v-model="password"
            placeholder="请输入密码"
            suffix-icon="fa fa-keyboard-o"
            type="password"
            clearable
            style="margin-bottom: 18px"
          />
          <div
            class="flex"
            style="margin-bottom: 18px"
          >
            <img
              :src="imgSrc"
              alt=""
              @click="imgClick"
            >
            <el-input
              v-model="code"
              placeholder="请输入验证码"
              suffix-icon="fa fa-keyboard-o"
              clearable
              class="flex-1"
              style="margin-left: 5px"
            />
          </div>
        </div>

        <el-button
          type="primary"
          style="width: 100%;margin-bottom: 18px"
          @click.native="login"
        >登录</el-button>
        <div>
          <el-checkbox
            v-model="remenber"
            class="login-remember"
          >记住密码</el-checkbox>
          <a
            href="/register"
            style="float: right;color: #3C8DBC;font-size: 14px"
          >注册</a>
        </div>
      </div>
    </div>
  </layout>

</template>

<style>
@import 'login.css';
</style>

<script type="babel">
import Vue from 'vue'
import { Input, Button, Checkbox, Message } from 'element-ui'
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Checkbox.name, Checkbox)
Vue.prototype.$message = Message;
import Layout from 'component/layout/default'
import { log } from 'util'
export default {
  components: {
    Layout
  },
  data: function() {
    return {
      userName: '',
      password: '',
      code: '',
      remenber: true,
      imgSrc: '/api/admin/verify'
    }
  },
  methods: {
    login() {
      this.$request
        .post('/api/admin/login', {
          username: this.userName,
          password: this.password,
          code: this.code
        })
        .then(({ data }) => {
          if (data.code == 1) {            
            window.location.replace('/admin')
          } else {
            this.$message({
              message: data.msg,
              type: 'warning'
            })
          }
        })
    },
    imgClick() {
      this.imgSrc = '/api/admin/verify?mt' + Math.random()
    }
  }
}
</script>