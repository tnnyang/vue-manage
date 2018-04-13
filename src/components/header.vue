<template>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <router-link to="/index" class="navbar-brand"><img src="../assets/images/logo.png" alt="" /></router-link>
        </div>
        <div id="navbar" class="navbar-collapse collapse pull-right">
          <ul class="nav navbar-nav navbar-right">
            <li><router-link to="/childAccountDetail" v-if="childAccount">子账户信息</router-link></li>
            <li><router-link to="/accountInfor" v-if="childAccount">账户信息</router-link></li>
            <!-- <li><router-link to="/bindWechat">绑定微信</router-link></li> -->
            <li><a href="javascript:;" @click="editPwd">修改密码</a></li>
            <li><a href="javascript:;" @click="logout">退出</a></li>
          </ul>
          <div class="navbar-right" style="padding:15px 0;color:#666;margin-right:150px;">账户余额：{{account}}<router-link to="/orderRecord" style="margin-left:10px;color:#666;text-decoration:underline;">使用明细</router-link></div>
        </div>
      </div>
    </nav>
</template>
<script>
  export default {
    data(){
      return {
        account: 0,
        childAccount: false
      }
    },
    mounted(){
      //获取用户账户余额
      util.apiPost(api + "/user/info").then(res => {
        if(res.code == 0){
          let userInfo = res.data.user;
          this.account = userInfo.account;
          if(userInfo.parentId == 0){
            this.childAccount = true;
          }
        }
      });
    },
    methods:{
      logout(){
        util.apiPost(api + "/user/logout?token=" + util.getCookie("token")).then(res => {
          if(res.code == 0){
            util.delCookie("token");
            this.$router.push("/login")
          }          
        });
      },      
      editPwd(){
        this.$store.dispatch('editPwdShow', true);
      }
    }
  }
</script>
<style scoped>
.navbar-inverse{background:#fff;border:none;box-shadow: 0 3px 10px #eee;}
.navbar{min-height:80px;}
.navbar-brand{margin-top:5px;}
.navbar-fixed-bottom .navbar-collapse, .navbar-fixed-top .navbar-collapse{max-height:80px;}
.navbar-right~.navbar-right, .navbar-nav>li>a{line-height:50px;}
.navbar-inverse .navbar-nav>li>a:focus, .navbar-inverse .navbar-nav>li>a:hover, .navbar-inverse .navbar-brand:focus, .navbar-inverse .navbar-brand:hover{color:#0a4d92;}
.navbar-inverse .navbar-nav>li>a{color:#666;}
.navbar-inverse .navbar-brand{font-size:16px;color:#0a4d92;}
.brand{font-size:20px;}
.nav>li{background:url(../assets/images/navLIBg.gif) no-repeat right center / 1px 14px;}
.nav>li:last-child{background:none;}
.nav>li a{padding:15px 10px;}
</style>