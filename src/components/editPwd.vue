<template>
  <div class="edit-pwd" v-show="editPwdShow">
   <div class="mask"></div>
   <form class="form-horizontal edit">
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
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="button" class="btn btn-default yellow-bg" style="margin:60px 50px 0 0;width:130px;" @click="editPwd">确定</button>
          <button type="button" class="btn btn-default" style="margin-top:60px;width:130px;" @click="cancel">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import top from '@/components/header'
import sliderBar from '@/components/slidebar'
import * as validateFun from '../util/validate'
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
              this.$store.dispatch('editPwdShow', false);          
              this.$router.push("/login");
            });
          }
        });
      }     
    },
    cancel(){
      this.$store.dispatch('editPwdShow', false);
    }
  },
  components: {
    top,
    sliderBar
  }
}
</script>