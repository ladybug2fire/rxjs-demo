import Vue from 'vue'
import VueRx from 'vue-rx'
import Rx from 'rxjs/Rx'
import demo from './demo_09.vue'
/**
 * 测试Vue Rx
 */
Vue.use(VueRx, Rx)
new Vue({
  render: h => h(demo)
}).$mount('#app')
