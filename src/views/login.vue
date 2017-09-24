<template>
    <div class="login">
        <div class="logo">
          <img src="../images/logo.png">
          <img src="../images/java.jpg">
        </div>

        <div class="login-block">
            <el-row>
                <el-col>
                    <div class="theme">范骏的博客管理系统-登录</div> 
                    <el-form :model="loginForm" :rules="rules" label-width="100px" ref="loginForm">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="loginForm.username"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="loginForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-row style="text-align:center">
                            <el-button type="primary" @click="submitForm('loginForm')" style="width:100px">登录</el-button>
                        </el-row>
                    </el-form>
                
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import api from '../api/auth.js';
export default {
    data(){
        return {
            loginForm: {
                username: '',
                password: ''
            },
            rules: { //验证规则
                username: [
                    { required: true, message: '输入用户名', trigger: 'blur'},
                    { min: 6, max: 16, message: '用户名在6到16位之间', trigger: 'blur'}
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if(valid){ //验证通过
                    //  this.$router.push({name:'index'});
                    let form = this.loginForm;
                    console.log(form)
                    // this.$http("post",'/api/login',form,'json').then((data) => {
                    api.userLogin(form).then((data) => {
                        console.log(data);
                        //账号存在
                        if(data.success){
                            this.$message({
                                type: 'success',
                                message: '登录成功'
                            })
                            let token = data.token;
                            let username = data.username;
                            this.$store.dispatch('UserLogin', token);
                            this.$store.dispatch('UserName', username);

                            //localStorage,sessionStorage保存token
                            // sessionStorage.setItem('token', token);
                            console.log("---------------------------------")
                            console.log(this.$router)

                            this.$router.push({name:'index'});
                        }else{
                            this.$message({
                                type: 'info',
                                message: data.errorMsg
                            });
                        }
                    });

                }else{ 
                    //验证不通过
                    this.$message({
                        type: 'info',
                        message: '错误'
                    });
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="less">
.login{
    padding-top: 100px;
    .logo {
      width: 100%;
      height: 100%;
      text-align: center;
      img {
          width: auto;
          height: 200px;
      }
  }

  .login-block {
      width: 600px;
      margin: 0 auto;
      z-index: 10;
  }

  .theme {
      text-align: center;
      line-height: 60px;
  }

}

</style>