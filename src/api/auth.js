import http from '../axios'
export default {
    //用户登录
    userLogin(data){
        return http('post','/api/login',data,'json') 
    }
}
