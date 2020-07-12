import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import createI18n from 'framework/i18n/admin';
import request from 'framework/network/request'

Vue.use(VueI18n);
Vue.use(ElementUI, {
  size: 'small'
});

export default class App {
  constructor(config) {
    this.config = config;
  }

  bootstrap() {
    if (EASY_ENV_IS_NODE) {
      return this.server();
    }
    return this.client();
  }

  create(initState) {
    const { index, options, createStore, createRouter } = this.config;
    const store = createStore(initState);
    const router = createRouter(store);
    sync(store, router);
    return {
      ...index,
      ...options,
      router,
      store
    };
  }

  client() {
    Vue.prototype.$request = request
    const options = this.create(window.__INITIAL_STATE__);
    const i18n = createI18n(window.__INITIAL_STATE__.locale);
    options.i18n = i18n;
    const app = new Vue(options);
    app.$mount('#app');
    return app;
  }

  server() {
    return context => {
      const options = this.create(context.state);
      const { store, router } = options;
      router.push(context.state.url);
      return new Promise((resolve, reject) => {
        router.onReady(() => {
          const matchedComponents = router.getMatchedComponents();
          if (!matchedComponents) {
            return reject({ code: '404' });
          }
          return Promise.all(
            matchedComponents.map(component => {
              if (component.methods && component.methods.fetchApi) {
                return component.methods.fetchApi(store, router.history.current);
              }
              return null;
            })
          ).then(() => {
            context.state = {
              ...store.state,
              ...context.state,
              ssr: true
            };
            const i18n = createI18n(context.state.locale);
            options.i18n = i18n;
            return resolve(new Vue(options));
          });
        });
      });
    };
  }
}