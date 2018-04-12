<template>
	<div class="col-sm-9 main">
    <h3 class="main-title">添加子账户</h3>
    <div class="col-sm-5 col-md-offset-2">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-3 control-label">用户名：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" placeholder="请输入用户名" v-model="userName">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">密码：</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" placeholder="请输入密码" v-model="pwd">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">姓名：</label>
          <div class="col-sm-9">
            <input type="text" class="form-control" placeholder="请输入姓名" v-model="name">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">手机号：</label>
          <div class="col-sm-9">
            <input type="tel" class="form-control" placeholder="请输入手机号" v-model="tel">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">邮箱：</label>
          <div class="col-sm-9">
            <input type="email" class="form-control" placeholder="请输入邮箱" v-model="email">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-3 col-sm-9">
            <button type="button" class="btn btn-block yellow-bg" @click="addAccount">确定</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import top from '@/components/header'
import sliderBar from '@/components/slidebar'
import * as validateFun from '../util/validate'

export default {
  data () {
    return {
      userName: "",
      pwd: "",
      name:"",
      tel: "",
      email: ""
    }
  },
  mounted(){
    this.$nextTick(function(){
      util.apiPost(api + "/user/info").then(res => {
        this.parentId = res.data.user.userId;
      });
    });
  },
  methods: {
    addAccount(){
      if(!this.userName){
        util.alertMsg("请输入用户名");
        return false;
      }else if(validateFun.checkPwd(this.pwd)){
        util.alertMsg('密码由6-16位数字、字母组成');
        return false;
      }else if(!this.name){
        util.alertMsg('请输入姓名');
        return false;
      }else if(!this.tel){
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
        let params = {parentId: this.parentId, username: this.userName, password: this.pwd, name: this.name, mobile: this.tel, email: this.email};

        util.apiPost(api + "/user/sub/add", params).then(res => {
          if(res.code == 0){
            util.msgFoo("添加成功", () => {
              this.$router.push("/childAccountDetail");
            });
          }
        });
      }
      
    }
  },
  components: {
    top,
    sliderBar
  }
}
</script>