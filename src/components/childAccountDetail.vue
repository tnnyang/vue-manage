<template>
	<div class="col-sm-9 main">
    <h3 class="main-title">子账户信息<small class="pull-right" style="margin:10px 15px 0 0;font-size:14px;"><router-link to="/addAccountChild">新增子账户</router-link></small></h3>
    <form class="form-inline">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="请输入用户名" v-model="userName">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="请输入姓名" v-model="name">
      </div>
      <div class="form-group">
        <select class="form-control" v-model="InfoType">
          <option value="">请选择状态</option>
          <option v-for="item in subInfoStatus" :value="item.value">{{item.text}}</option>
        </select>
      </div>
      <button type="button" class="btn btn-default yellow-bg" @click="search">查询</button>
    </form>
    <div class="table-responsive" style="margin-top:30px;">
      <table class="table" :class="{'noborder':!recordShow}">
        <thead>
          <tr>
            <th>用户名</th>
            <th>姓名</th>
            <th>手机号码</th>
            <th>邮箱</th>
            <th>状态</th>
            <th>最后一次登录时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody ref="subUserlist">
          <tr v-for="(item, index) in subUserInfo" v-show="recordShow">
            <td>{{item.username}}</td>
            <td>{{item.name}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.email}}</td>
            <td>{{item.status == 1 ? "正常" : "锁定"}}</td>
            <td>{{item.lastLogin}}</td>
            <td><span class="status-ctrl" @click="doStatus($event, item.userId)">{{item.status == 1 ? "锁定" : "正常"}} | </span><router-link :to="'/editAccountChild/'+ item.userId">修改</router-link></td>
          </tr>
          <tr v-show="noDataShow"><td colspan="7" style="padding:50px 0 50px;">暂无数据</td></tr>
        </tbody>
      </table>      
    </div>
    <pagination :total="total" :current-page='pageIndex' :page-size="pageSize" @pageChange="getChildDetail" v-if="pageShow"></pagination>
  </div>
</template>

<script>
import top from '@/components/header'
import sliderBar from '@/components/slidebar'
import pagination from '@/components/pagination'

export default {
  data () {
    return {
      userName: "",
      name: "",
      InfoType: "",
      subInfoStatus:[
        {text:"正常", value: 1},
        {text:"锁定", value: 0}
      ],
      subUserInfo:[],
      status: 0,
      parentId: "",
      pageSize: 13,
      pageIndex: 1,
      total: 0,
      pageShow: true,
      recordShow: true,
      noDataShow: false
    }
  },
  mounted(){
    this.$nextTick(function(){
      util.apiPost(api + "/user/info").then(res => {
        let response = res.data;
        this.parentId = response.user.parentId;
        this.getChildDetail();        
      });
    });
  },
  methods: {
    getChildDetail(currentPage){
      let pageIndex = currentPage ? currentPage : this.pageIndex;

      util.apiPost(api + "/user/sub/list?parentId=" + this.parentId + "&userName=" + this.userName + "&name=" + this.name + "&status=" + this.InfoType + "&pageNum=" + pageIndex + "&pageSize=" + this.pageSize).then(res => {
        if(res.code == 0){
          let response = res.data.list;
          this.subUserInfo = response.dataList;
          this.total = response.total;

          if(response.dataList.length == 0){
            this.recordShow = false;
            this.noDataShow = true;
          }else{
            this.recordShow = true;
            this.noDataShow = false;
          }

          if(response.pages <= 1){
            this.pageShow = false;
          }else{
             this.pageShow = true;
          }
        }
      });
    },
    search(){
      this.getChildDetail();
      this.$store.dispatch('curPage');
    },
    doStatus(event, userId){
      if(event.srcElement.innerHTML == "锁定"){       
        //锁定
        util.apiPost(api + "/user/sub/lock?userId=" + userId).then(res => {
          this.getChildDetail();
        });
      }else{
         //正常
        util.apiPost(api + "/user/sub/unlock?userId=" + userId).then(res => {
          this.getChildDetail();
        });
      }
    }
  },
  components: {
    top,
    sliderBar,
    pagination
  }
}
</script>
<style scoped>
.status-ctrl{cursor:pointer;color:#337ab7;}
</style>