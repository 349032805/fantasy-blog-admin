import Vue from 'vue'
import App from './App'

// 路由可以全部一次记载,在PC浏览器上影响不大,在移动端采用异步路由较好,提升首页的加载速度
import router from './router'
//异步路由
// import routes from './router/router2'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'

import Layout from './components/Layout'
// import Editor from './components/Editor'

//引入store
import store from './store'

//在应用启动时，可以通过设置 Vue.config.productionTip = false 来关闭生产模式下给出的提示
Vue.config.productionTip = true

Vue.component(Layout.name, Layout)
// Vue.component(Editor.name, Editor)

Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
