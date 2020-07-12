'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default function createStore(initState) {  
  const state = {
    ssr: true,
    roleList: [],
    roleDetail: {},
    managerList: [],
    managerDetail: {},
    accessList: [],
    accessDetail: {},
    moduleList: [],
    ...initState
  };
  return new Vuex.Store({
    state,
    actions,
    getters,
    mutations
  });
}