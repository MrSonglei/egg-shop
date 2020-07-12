let url = require('url')

module.exports = (options) => {
  return async function adminAuth(ctx, next) {
    let pathname = url.parse(ctx.request.url).pathname;
    if (ctx.session.userinfo) {
      ctx.state.userinfo = ctx.session.userinfo
      //已经登录
      await next();
    } else {
      if (pathname == '/login' || pathname == '/admin/api/verify') {
        await next();
      } else {
        ctx.redirect('/login')
      }
    }
  }
}