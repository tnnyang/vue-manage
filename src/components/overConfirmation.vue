<template>
	<div class="col-sm-9 main">
    <h3 class="main-title">完成待确认</h3>
    <form class="form-inline">
      <div class="form-group" style="width:22.5%;">
        <input type="text" class="form-control datetime" style="width:100%;" v-model="beginTime" @click="chooseBeginDate">
      </div>
      <div class="form-group" style="margin-left:5px;width:25%;">
        <label>至</label>
        <input type="text" class="form-control datetime" style="margin-left:5px;width:90%;" v-model="endTime" @click="chooseEndDate">
      </div>
      <div class="form-group" style="width:15%;">
        <input type="text" class="form-control" placeholder="请输入小区名" v-model="community" style="width:100%;">
      </div>
      <div class="form-group">
        <select class="form-control" v-model="selectedType">
          <option value="">请选择类型</option>
          <option v-for="item in typeOptions" :value="item.id">{{item.modelName}}</option>
        </select>
      </div>
      <div class="form-group" style="width:14%;">
        <input type="text" class="form-control" placeholder="请输入订单号" v-model="orderNumber" style="width:100%;">
      </div>
      <button type="button" class="btn btn-default yellow-bg" @click="search">查询</button>
    </form>
    <div class="table-responsive" style="margin-top:30px;">
      <table class="table" :class="{'noborder':!recordShow}">
        <thead>
          <tr>
            <th>订单号</th>
            <th>小区名</th>
            <th>下单时间</th>
            <th>下户时间</th>
            <th>类型</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderRecord" v-show="recordShow">
            <td>{{item.orderNo}}</td>
            <td>{{item.orderCustCompoundName}}</td>
            <td>{{item.createTime}}</td>
            <td>{{item.svingTime}}</td>
            <td>{{item.modelName}}</td>
            <td><router-link :to="'/overDetail/' + item.id">查看</router-link></td>
          </tr>
          <tr v-show="noDataShow"><td colspan="6" style="padding:50px 0 50px;">暂无数据</td></tr>  
        </tbody>
      </table>      
    </div>
    <pagination :total="total" :current-page='pageIndex' :page-size="pageSize" @pageChange="getOrderRecord" v-if="pageShow"></pagination>
  </div>
</template>

<script>
import top from '@/components/header'
import sliderBar from '@/components/slidebar'
import pagination from '@/components/pagination'
import '../assets/js/laydate'
import '../assets/css/laydate/css/laydate.css'
import '../assets/css/laydate/css/skin.laydate.css'

export default {
  data () {
    return {
      beginTime:"",
      endTime:"",
      community: "",
      selectedType: "",
      typeOptions:[],
      orderNumber: "",
      orderRecord: [],
      pageSize: 13,
      pageIndex: 1,
      total: 0,
      pageShow: true,
      recordShow: true,
      noDataShow: false
    }
  },
  watch: {
    '$route' () {
      this.getOrderRecord();
    }
  },
  mounted () {
    this.$nextTick(function(){
      this.getOrderRecord();
      this.getType();
    });
  },
  methods: {
    getOrderRecord(currentPage){
      let params = {commuity: this.community, modelId: this.selectedType == 0 ? "" : this.selectedType, orderNo: this.orderNumber, beginTime: this.beginTime, endTime: this.endTime, orderStatus: this.$route.params.model, pageSize: this.pageSize, pageIndex: currentPage ? currentPage : this.pageIndex};

      util.apiPost(api + "/customer/getOrderRecord", params).then(res => {
        if(res.code == 0){
          let response = res.data;
          this.orderRecord = response.dataList;
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
    getType(){
      util.apiPost(api + "/customer/getModelList").then(res => {
        this.typeOptions= res.data;
      });
    },
    search(){
      this.getOrderRecord();
      this.$store.dispatch('curPage');
    },
    chooseBeginDate(){
      laydate({
        istime: true,
        format: 'YYYY-MM-DD hh:mm:ss', 
        choose: (dateTime) => {
          this.beginTime = dateTime;
        }
      });
    },
    chooseEndDate(){
      laydate({
        istime: true,
        format: 'YYYY-MM-DD hh:mm:ss', 
        choose: (dateTime) => {
          this.endTime = dateTime;
        }
      });
    }
  },
  components: {
    top,
    sliderBar,
    pagination
  }
}
</script>