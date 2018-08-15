import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
import Resource from 'vue-resource';
import vipmroUi from 'vipmro-webui';
import 'vipmro-webui/lib/theme-chalk/index.css';
import Index from '@/components/index/index';
// import Select from '@/components/select/index';

import '@/common/css/style';
import '@/common/css/common';
// import '@/common/css/toast';

Vue.use(Router);
Vue.use(Resource);
Vue.use(vipmroUi);

const router = new Router({
  base: __dirname,
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
