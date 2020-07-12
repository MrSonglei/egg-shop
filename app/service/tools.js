'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
var svgCaptcha = require('svg-captcha');

class ToolsService extends Service {
  code() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966'
    });
    this.ctx.session.code = captcha.text;//验证码文字
    return captcha;
  }
  md5(str) {
    return md5(str);
  }
}

module.exports = ToolsService;
