
import Vue from 'vue'
import store from '../store/index.js'
import Router from 'vue-router'

import NavArr from '../nav-config'

import login from '../views/login'
import test from '../views/test'
import index from '../views/index'
import articleList from '../views/articleList'
import addArticle from '../views/addArticle'
import viewArticle from '../views/viewArticle'
import belong from '../views/belong'
import fileUpload from '../views/fileUpload'
import message from '../views/message'
import friendLink from '../views/friendLink'
import webConfig from '../views/webConfig'


Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/article',
      name: 'article',
      component: articleList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addArticle',
      name: 'addArticle',
      component: addArticle,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/viewArticle',
      name: 'viewArticle',
      component: viewArticle,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/belong',
      name: 'belong',
      component: belong,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/fileUpload',
      name: 'fileUpload',
      component: fileUpload,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/message',
      name: 'message',
      component: message,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/friendLink',
      name: 'friendLink',
      component: friendLink,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/webConfig',
      name: 'webConfig',
      component: webConfig,
      meta: {
        requiresAuth: true
      }
    }
  ]
});


//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {

  console.log(from)
  console.log(to)

  //将解析的导航数组挂在Vue上给页面调用
  //vuex应该也可以,待以后尝试!!!
  //通过地址栏的路由来解析
  let goto = to.fullPath;
  Vue.prototype.$menuArr = [];
  NavArr.forEach(nav=>{
    if(nav.path == goto){
      Vue.prototype.$menuArr.push(nav.title);
      return;
    }
    if(nav.subs){
       nav.subs.forEach(childObj=>{
        if(childObj.path == goto){
          Vue.prototype.$menuArr.push(nav.title);
          Vue.prototype.$menuArr.push(childObj.title);
            return;
        }
      })
    }
  
  })

  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){

    if(token){
      next();
    }else{
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }

  }else{
    next();//如果无需token,那么随它去吧
  }
});

export default router;
