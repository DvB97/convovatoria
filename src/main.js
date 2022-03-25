/* import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app') */


import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import locale from 'element-ui/lib/locale/lang/es' // lang i18n

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
