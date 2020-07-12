'use strict';

import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import request from 'framework/network/request';

Vue.use(Vuex);

const actions = {
  SET_SSR: (store, data) => {
    store.commit(Type.SET_SSR, data);
  },
  SET_ROLE_LIST: (store, json) => {
    return request.post('/api/admin/role/list', json, store).then(response => {
      store.commit(Type.SET_ROLE_LIST, {
        list: response.data.list
      });
    });
  },
  SET_ROLE_DETAL: (store, json) => {
    return request.post('/api/admin/role/detail', json, store).then(response => {
      store.commit(Type.SET_ROLE_DETAL, response.data);
    });
  },
  SET_MANAGER_LIST: (store, json) => {
    return request.post('/api/admin/manager/list', json, store).then(response => {
      store.commit(Type.SET_MANAGER_LIST, {
        list: response.data.list
      });
    });
  },
  SET_MANAGER_DETAL: (store, json) => {
    return request.post('/api/admin/manager/detail', json, store).then(response => {
      store.commit(Type.SET_MANAGER_DETAL, response.data);
    });
  },
  SET_ACCESS_LIST: (store, json) => {
    return request.post('/api/admin/access/list', json, store).then(response => {
      store.commit(Type.SET_ACCESS_LIST, {
        list: response.data.list
      });
    });
  },
  SET_ACCESS_DETAIL: (store, json) => {
    return request.post('/api/admin/access/detail', json, store).then(response => {
      store.commit(Type.SET_ACCESS_DETAIL, response.data);
    });
  },
};

export default actions;