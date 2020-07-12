<template>
  <layout
    description="vue server side render"
    keywords="egg, vue, webpack, server side render"
  >
    <div class="login">
      <div class="login-form">
        <div class="login-header">
          <p style="font-size: 18px">注册</p>
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
        </div>

        <el-button
          type="primary"
          style="width: 100%;margin-bottom: 18px"
          @click.native="login"
        >注册</el-button>
      </div>
    </div>
  </layout>

</template>

<style>
@import 'register.css';
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
        .post('/api/admin/register', {
          username: this.userName,
          password: this.password
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