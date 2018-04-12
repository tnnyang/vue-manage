<template>
	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    <div class="row placeholders">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="inputPassword1" class="col-sm-2 control-label">旧密码</label>
            <div class="col-sm-4">
              <input type="password" class="form-control" placeholder="请输入旧密码" v-model="oldPwd">
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword2" class="col-sm-2 control-label">新密码</label>
            <div class="col-sm-4">
              <input type="password" class="form-control" placeholder="请输入新密码" v-model="newPwd">
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword2" class="col-sm-2 control-label">确认新密码</label>
            <div class="col-sm-4">
              <input type="password" class="form-control" placeholder="请再一次输入新密码" v-model="repeatPwd">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-4">
              <button type="button" class="btn btn-primary btn-default" style="margin-top:40px;" @click="editPwd">确定修改</button>
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
      oldPwd: "",
      newPwd: "",
      repeatPwd: ""
    }
  },
  methods: {
    editPwd() {
      if(!this.oldPwd){
        util.alertMsg("请输入旧密码");
        return false;
      }else if(validateFun.checkPwd(this.newPwd)){
        util.alertMsg('新密码由6-16位数字、字母组成');
        return false;
      }else if(validateFun.isEqual(this.newPwd, this.repeatPwd)){
        util.alertMsg('两次密码输入不一样');
        return false;
      }else{
        util.apiPost(api + "/user/update/passwd?oldPassword=" + this.oldPwd + "&newPassword=" + this.newPwd).then(res => {
          if(res.code != 0){
            util.alertMsg(res.msg);
          }else{
            util.delCookie("token");
            
            util.msgFoo(res.msg, () => {              
              this.$router.push("/login");
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