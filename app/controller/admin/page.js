'use strict';
const egg = require('egg');
module.exports = class AdminController extends egg.Controller {
  async login(ctx) {
    await ctx.render('admin/login/login.js', {
      title: '登录'
    });
  }
  async error(ctx) {
    await ctx.render('error/error.js', {
      title: '错误'
    });
  }
  async register(ctx) {
    await ctx.render('admin/register/register.js', {
      title: '注册'
    });
  }
  async home(ctx) {
    const url = ctx.url.replace(/\/admin/, '');
    const { mode } = ctx.query;
    if (mode === 'csr') {
      await ctx.renderClient('admin/home/home.js', { ctx, url, title: '商城后台' });
    } else {
      await ctx.render('admin/home/home.js', { ctx, url, title: '商城后台' });
    }
  }
};