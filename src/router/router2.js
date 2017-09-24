// 异步路由

const login = r => require.ensure([], () => r(require('../views/login')), 'login')
const index = r => require.ensure([], () => r(require('../views/index')), 'index')
export default [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index
    }
];