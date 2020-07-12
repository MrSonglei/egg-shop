
'use strict';
import App from 'framework/app/app.js';
import index from './home.vue';
import createStore from './store/app';
import createRouter from './router';

const options = { base: '/' };

export default new App({
  index,
  options,
  createStore,
  createRouter,
}).bootstrap();