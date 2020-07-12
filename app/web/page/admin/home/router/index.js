import Vue from 'vue';

import VueRouter from 'vue-router';
import Dashboard from '../view/dashboard/index.vue';
import Role from '../view/role/index.vue'
import RoleEdit from '../view/role/edit.vue'
import Manager from '../view/manager/index.vue'
import Access from '../view/access/index.vue'

Vue.use(VueRouter);

export default function createRouter(store) {
  const router = new VueRouter({
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '/',
        component: Dashboard
      },
      {
        path: '/role',
        component: Role
      },
      {
        path: '/role/add',
        component: () => import('../view/role/add.vue')
      },
      {
        path: '/role/edit/:id',
        component: () => import('../view/role/edit.vue')
      },
      {
        path: '/manager',
        component: Manager//() => import('../view/role/index.vue')
      },
      {
        path: '/manager/add',
        component: () => import('../view/manager/add.vue')
      },
      {
        path: '/manager/edit/:id',
        component: () => import('../view/access/edit.vue')
      },
      {
        path: '/access',
        component: Access//() => import('../view/role/index.vue')
      },
      {
        path: '/access/add',
        component: () => import('../view/access/add.vue')
      },
      {
        path: '/access/edit/:id',
        component: () => import('../view/access/edit.vue')
      },
      {
        path: '*', component: () => import('../view/notfound.vue')
      }
    ]
  });

  router.beforeEach((route, redirec, next) => {
    next();
  });

  router.afterEach((route, from) => {
    if (!store.state.ssr && EASY_ENV_IS_BROWSER && route.matched && route.matched.length) {
      const matchComponent = route.matched[0].components.default;
      const asyncData = matchComponent.methods && matchComponent.methods.fetchApi;
      if (asyncData) {
        // ('router afterEach trigger asyncData', route);
        asyncData(router.app.$store, route);
      }
    }
    store.dispatch('SET_SSR', false)
  });

  return router;
}