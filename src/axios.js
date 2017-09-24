import axios from 'axios'
import store from './store'
import router from './router'
import Qs from 'qs'

//设置全局axios默认值
axios.defaults.timeout = 5000; //5000的超时验证
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//request拦截器
axios.interceptors.request.use(
    config => {
        //每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
        if(store.state.token){
            config.headers.token = `${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
//respone拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        if(error.response){
            switch(error.response.status){
                case 401:
                    store.dispatch('UserLogout'); //可能是token过期，清除它
                    router.replace({ //跳转到登录页面
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    });
            }
        }
        return Promise.reject(error.response);
    }
);

function http(type,url,params,contentType){
    let contentTypeUse = contentType=='json' ? 'application/json':'application/x-www-form-urlencoded';
    let paramsUse = contentType == 'json' ? params : Qs.stringify(params);

    if(type == 'get'){
        return new Promise((resolve, reject) => {
            axios({
                method:'get',
                url:url,
                params:params
            })
            .then((res) => {
                resolve(res.data)
            })
        })
    }else{
        return new Promise((resolve, reject) => {
            axios({
                method:'post',
                url:url,
                headers: {'Content-Type': contentTypeUse},
                data:paramsUse
            })
            .then((res) => {
                resolve(res.data)
            })
        })
    }
}

export default http
