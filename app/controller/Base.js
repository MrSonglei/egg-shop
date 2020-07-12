'use strict';
const Controller = require('egg').Controller;

class BaseController extends Controller {
  async code(ctx) {
    const captcha = this.service.tools.code()    
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }
}

module.exports = BaseController;
