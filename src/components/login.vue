<template>
  <div class="login">
      <div class="form-signin">
        <h2 class="text-center">爱下户</h2>
        <input type="text" class="form-control user" placeholder="请输入用户名" v-model="userName">
        <input type="password" class="form-control pwd" placeholder="请输入密码" v-model="pwd" @keyup.enter="login">
        <button class="btn btn-lg btn-block yellow-bg" type="button" @click="login" ref="login">登录</button>
      </div>
    </div>
</template>

<script>
import * as validateFun from '../assets/js/validate'

export default {
  data() {
    return {
      userName: "",
      pwd: ""
    }
  },
  methods: {
    login(){
      if(!this.userName){
        util.alertMsg("请输入用户名");
        return false;
      }else if(!this.pwd){
        util.alertMsg("请输入密码");
        return false;
      }else{
        this.$refs.login.innerHTML = "登录中...";
        this.$refs.login.disabled = true;
        
        util.apiPost(api + "/user/login?username=" + this.userName + "&password=" + this.pwd, "", "login").then(res => {
          if(res.code == 0){
            util.setCookie("token", res.data.token);
            this.$router.push("/index");
            this.$refs.login.innerHTML = "登录";
            this.$refs.login.removeAttribute('disabled');            
          }else{
            util.alertMsg(res.msg);
            this.$refs.login.innerHTML = "登录";
            this.$refs.login.removeAttribute('disabled');
          }
        });      
      }      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{background:url(../assets/images/loginBg.jpg) no-repeat center top / 1920px 1080px;height:1080px;}
.login h2{font-size:35px;color:#062f41;margin:355px 0 32px;}
.user{background:#fff url(../assets/images/user.png) no-repeat 18px center / 15px 14px;}
.pwd{background:#fff url(../assets/images/pwd.png) no-repeat 18px center / 14px 18px;}
.login .btn{background:#0a4d92;font-size:18px;}
.form-signin{max-width:300px;padding:15px;margin:0 auto;}
.form-signin .form-control {
  position:relative;
  height:auto;
  -webkit-box-sizing:border-box;
     -moz-box-sizing:border-box;
          box-sizing:border-box;
  padding:10px 10px 10px 45px;
  font-size:16px;
  margin-bottom:25px;
}
</style>