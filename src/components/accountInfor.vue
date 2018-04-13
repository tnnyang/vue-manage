<template>
  	<div class="col-sm-9 main">
      <h3 class="main-title">账户信息</h3>
      <div class="row placeholders">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">账户：</label>
              <div class="col-sm-1" style="padding-left:0;">
                <p class="form-control-static">{{userName}}</p>
              </div>
              <div class="col-sm-3 infor_hand">
                  <!-- <router-link to="/bindWechat">绑定微信</router-link> -->
                  <a href="javascript:;" @click="editPwd" class="forgetPass">修改密码</a>
              </div>
            </div>
            <div class="form-group">
              <label for="inputPassword" class="col-sm-2 control-label">手机号:</label>
              <div class="col-sm-4">
                <input type="tel" class="form-control" id="inputPhone" placeholder="手机号" v-model="tel">
              </div>
            </div>
            <div class="form-group">
              <label for="inputPassword" class="col-sm-2 control-label">邮箱:</label>
              <div class="col-sm-4">
                <input type="email" class="form-control" id="inputEmail3" placeholder="邮箱" v-model="email">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label"></label>
              <div class="col-sm-4">
                <button type="button" class="btn btn-default yellow-bg" style="width:120px;margin-top:40px;" @click="update">确定</button>
              </div>
            </div>
          </form>
      </div>
    </div>
</template>

<script>
import top from '@/components/header'
import sliderBar from '@/components/slidebar'
import * as validateFun from '../assets/js/validate'

export default {
  data () {
    return {
      userName: "",
      tel: "",
      email: "",
      userId: ""
    }
  },
  mounted () {
    this.$nextTick(function(){
      this.getUserInfo();
    })    
  },
  methods: {
    getUserInfo() {
      util.apiPost(api + "/user/info").then(res => {
        if(res.code == 0){
          let response = res.data.user;
          this.userName = response.username;
          this.tel = response.mobile;
          this.email = response.email;
          this.userId = response.userId;
        }
      });
    },
    update(){
      if(!this.tel){
        util.alertMsg("请输入手机号");
        return false;
      }else if(validateFun.isMObile(this.tel)){
        util.alertMsg("手机号格式不正确");
        return false;
      }else if(!this.email){
        util.alertMsg("请输入邮箱");
        return false;
      }else if(validateFun.isEmail(this.email)){
        util.alertMsg("邮箱格式不正确");
        return false;
      }else{
        let params = {mobile: this.tel, email: this.email, userId: this.userId};
        
        util.apiPost(api + "/user/update", params).then(res => {
          if(res.code == 0){
            util.msgFoo(res.msg, () => {
              this.$router.push("/index");
            });
          }
        });
      }      
    }, 
    editPwd(){
      this.$store.dispatch('editPwdShow', true);
    }
  },
  components: {
    top,
    sliderBar
  }
}
</script>
<style scoped>
.infor_hand{padding:7px 0;}
.infor_hand a{padding:0 12px;color:#333;float:right;}
/*.infor_hand .forgetPass{border-right:1px solid #333;}*/
.forgetPass:hover{text-decoration:none;}  
</style>