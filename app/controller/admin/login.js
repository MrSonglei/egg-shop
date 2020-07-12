'use strict';

const Base = require('../Base');

class UserController extends Base {
  async login() {
    let username = this.ctx.request.body.username;
    let password = this.service.tools.md5(this.ctx.request.body.password);
    let code = this.ctx.request.body.code.toUpperCase();
    if (code === this.ctx.session.code.toUpperCase()) {
      let result = await this.ctx.model.Admin.find({ username, password })
      if (result.length > 0) {
        this.ctx.session.userinfo = result[0]
        this.ctx.body = {
          code: 1,
          msg: '操作成功'
        }
      } else {
        this.ctx.body = {
          code: 0,
          msg: '用户名或者密码错误'
        }
      }
    } else {
      this.ctx.body = {
        msg: '验证码错误',
        code: '0'
      }
    }
  }
  async loginOut() {
    this.ctx.session.userinfo = null;
    this.ctx.redirect('/login')
  }
  async register() {
    let username = this.ctx.request.body.username;
    let password = this.service.tools.md5(this.ctx.request.body.password);
    let result = await this.ctx.model.Admin.find({ username })    
    if(result.length > 0) {
      this.ctx.body = {
        code: 0,
        msg: '该用户已经注册'
      }
      return
    }
    try {      
      await this.ctx.model.Admin.create({
        username,
        password
      })
      this.ctx.body = {
        code: 1,
        msg: '注册成功'
      }
    } catch (e) {
      ('失败', e);
      
      this.ctx.body = {
        code: 0,
        msg: '数据创建失败'
      }
    }
  }
}

module.exports = UserController;
