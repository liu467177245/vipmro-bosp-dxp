import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
import Resource from 'vue-resource';
import vipmroUi from 'vipmro-webui';
import 'vipmro-webui/lib/theme-chalk/index.css';
import Index from '@/components/index/index';
import DataRule from '@/components/dataRule/index';
import Project from '@/components/project/index';
import LogRequest from '@/components/logRequest/index';
import Testing from '@/components/testing/index';

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
    },
    {
      path: '/dataRule',
      name: 'dataRule',
      component: DataRule
    },
    {
      path: '/project',
      name: 'project',
      component: Project
    },
    {
      path: '/logRequest',
      name: 'list',
      component: LogRequest
    },
    {
      path: '/Testing',
      name: 'testing',
      component: Testing
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
