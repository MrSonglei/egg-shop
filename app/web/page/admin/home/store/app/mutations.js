'use strict';

import {
  SET_ROLE_LIST,
  SET_ROLE_DETAL,
  SET_MANAGER_LIST,
  SET_MANAGER_DETAL,
  SET_SSR,
  SET_ACCESS_LIST,
  SET_ACCESS_DETAIL
} from './mutation-type';

function insertData(arr, list) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].children = []
    for (let j = 0; j < list.length; j++) {
      if (arr[i]._id == list[j].module_id) {
        arr[i].children.push(list[j])
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].children.length > 0) {
      insertData(arr[i].children, list)
    }
  }
  return arr
}

const mutations = {
  [SET_SSR](state, data) {
    state.ssr = data;
  },
  [SET_ROLE_LIST](state, { list }) {
    state.roleList = list;
  },
  [SET_ROLE_DETAL](state, data) {
    state.roleDetail = data;
  },
  [SET_MANAGER_LIST](state, { list }) {
    state.managerList = list;
  },
  [SET_MANAGER_DETAL](state, data) {
    state.managerDetail = data;
  },
  [SET_ACCESS_LIST](state, { list }) {
    state.moduleList = list;
    let arr = list.filter(item => item.module_id == 0)
    state.accessList = insertData(arr, list)
  },
  [SET_ACCESS_DETAIL](state, data) {
    state.accessDetail = data;
  },
};
export default mutations;
