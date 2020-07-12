'use strict';
// Webpack：https://www.yuque.com/easy-team/easywebpack
// Egg Vue: https://www.yuque.com/easy-team/egg-vue 
module.exports = {
  entry: {
    'index/index': 'app/web/page/index/index.vue',
    'admin/home/home': 'app/web/page/admin/home/index.js',
    'admin/login/login': 'app/web/page/admin/login/login.vue',
    'admin/register/register': 'app/web/page/admin/register/register.vue',
    'error/error': 'app/web/page/error/error.vue',
  },
  plugins: [
    { imagemini: false }
  ]
};