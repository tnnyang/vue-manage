<template>
	<div class="col-sm-9 main">
    <div class="col-sm-5 col-md-offset-2">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">用户名：</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="请输入用户名" v-model="userName">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">姓名：</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" placeholder="请输入姓名" v-model="name">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">手机号：</label>
          <div class="col-sm-10">
            <input type="tel" class="form-control" placeholder="请输入手机号" v-model="mobile">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">邮箱：</label>
          <div class="col-sm-10">
            <input type="email" class="form-control" placeholder="请输入邮箱" v-model="email">
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-offset-2 col-sm-10">
            <button type="button" class="btn btn-primary btn-block" @click="updateAccount">确定</button>
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
      name:"",
      mobile: "",
      email: ""
    }
  },
  mounted(){
    this.$nextTick(function(){
      util.apiPost(api + "/user/info?userId=" + this.$route.params.userId).then(res => {
        this.userName = res.data.user.username;
        this.name = res.data.user.name;
        this.mobile =res.data.user.mobile;
        this.email =res.data.user.email;
      });
    });
  },
  methods: {
    updateAccount(){
      if(!this.userName){
        util.alertMsg("请输入用户名");
        return false;
      }else if(!this.name){
        util.alertMsg('请输入姓名');
        return false;
      }else if(!this.mobile){
        util.alertMsg("请输入手机号");
        return false;
      }else if(validateFun.isMObile(this.mobile)){
        util.alertMsg("手机号格式不正确");
        return false;
      }else if(!this.email){
        util.alertMsg("请输入邮箱");
        return false;
      }else if(validateFun.isEmail(this.email)){
        util.alertMsg("邮箱格式不正确");
        return false;
      }else{
        let params = {userId:this.$route.params.userId, username: this.userName, name: this.name, mobile: this.mobile, email: this.email};

        util.apiPost(api + "/user/sub/update", params).then(res => {
          if(res.code == 0){
            util.msgFoo("修改成功", () => {
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