<template>
  <div class="edit-pwd" v-show="editPwdShow">
   <div class="mask"></div>
   <div class="edit-bg">
     <form class="form-horizontal edit">
        <p class="dialog"><img src="../assets/images/close.png" alt="" class="dialog-close" @click="cancel"/></p>
        <div class="form-group">
          <label class="col-sm-3 control-label">旧密码</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" placeholder="请输入旧密码" v-model="oldPwd">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">新密码</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" placeholder="请输入新密码" v-model="newPwd">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-3 control-label">确认新密码</label>
          <div class="col-sm-9">
            <input type="password" class="form-control" placeholder="请再一次输入新密码" v-model="repeatPwd">
          </div>
        </div>
        <p class="error" ref="error"></p>
        <div class="form-group">
          <div class="col-sm-offset-1 col-sm-10">
            <button type="button" class="btn btn-default yellow-bg" style="margin:40px 50px 0 0;width:130px;" @click="editPwd">确定</button>
            <button type="button" class="btn btn-default" style="margin-top:40px;width:130px;" @click="cancel">取消</button>
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
import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      oldPwd: "",
      newPwd: "",
      repeatPwd: ""
    }
  },
  computed: {
    ...mapGetters([
      'editPwdShow'
    ])
  },
  methods: {
    editPwd() {
      var error = this.$refs.error;
      if(!this.oldPwd){
        error.innerHTML = '请输入旧密码';
        return false;
      }else if(validateFun.checkPwd(this.newPwd)){
        error.innerHTML = '新密码由6-16位数字、字母组成';
        return false;
      }else if(validateFun.isEqual(this.newPwd, this.repeatPwd)){
        error.innerHTML = '两次密码输入不一样';
        return false;
      }else{
        error.innerHTML = '';
        util.apiPost(api + "/user/update/passwd?oldPassword=" + this.oldPwd + "&newPassword=" + this.newPwd).then(res => {
          if(res.code != 0){
            util.alertMsg(res.msg);
          }else{
            util.delCookie("token");
            
            util.msgFoo(res.msg, () => {
              this.$store.dispatch('editPwdShow', false);          
              this.$router.push("/login");
            });
          }
        });
      }     
    },
    cancel(){
      this.$refs.error.innerHTML = '';
      this.$store.dispatch('editPwdShow', false);
    }
  },
  components: {
    top,
    sliderBar
  }
}
</script>
<style scoped>
.edit-bg{background:#eabba7;width:520px;height:420px;position:fixed;left:50%;top:50%;z-index:10000;margin:-210px 0 0 -260px;padding:10px 0 0 10px;border-radius:10px;}
.edit{width:500px;height:400px;background:#fff;border-radius:10px;}
.dialog{background:url(../assets/images/dialog.png) no-repeat left top / 100% 100%;height:60px;border-radius:10px 10px 0 0;margin-bottom:50px;overflow:hidden;}
.dialog-close{float:right;margin:20px 15px 0 0;cursor:pointer;}
.form-horizontal .form-group{margin:0 45px 15px 40px;}
.error{margin-left:158px;color:#ef3232;height:20px;line-height:20px;}
</style>