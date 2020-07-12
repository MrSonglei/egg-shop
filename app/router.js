'use strict';
module.exports = app => {
  const { router, controller } = app;
  //页面
  router.get('/', controller.index.index.ssr);
  router.get('/csr', controller.index.index.csr);
  router.get('/list', controller.index.index.list);
  router.get('/login', controller.admin.page.login);
  router.get('/register', controller.admin.page.register);
  router.get('/error', controller.admin.page.error);
  router.get('/admin(/.+)?', controller.admin.page.home);
  //接口
  router.post('/api/admin/login', controller.admin.login.login);
  router.post('/api/admin/register', controller.admin.login.register);
  router.get('/api/admin/verify', controller.base.code)
  router.get('/api/admin/loginOut', controller.admin.login.loginOut)
  router.post('/api/admin/role/list', controller.admin.role.list)
  router.post('/api/admin/role/add', controller.admin.role.add)
  router.post('/api/admin/role/edit', controller.admin.role.edit)
  router.post('/api/admin/role/detail', controller.admin.role.detail)
  router.get('/api/admin/role/del/:id', controller.admin.role.del)
  router.post('/api/admin/manager/list', controller.admin.manager.list)
  router.post('/api/admin/manager/add', controller.admin.manager.add)
  router.post('/api/admin/manager/edit', controller.admin.manager.edit)
  router.post('/api/admin/manager/detail', controller.admin.manager.detail)
  router.get('/api/admin/manager/del/:id', controller.admin.manager.del)
  router.post('/api/admin/access/list', controller.admin.access.list)
  router.post('/api/admin/access/add', controller.admin.access.add)
  router.post('/api/admin/access/edit', controller.admin.access.edit)
  router.post('/api/admin/access/detail', controller.admin.access.detail)
  router.get('/api/admin/access/del/:id', controller.admin.access.del)
};