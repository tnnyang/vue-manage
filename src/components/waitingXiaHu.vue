<template>
	<div class="col-sm-9 main">
    <h3 class="main-title">待下户</h3>
    <form class="form-inline">
      <div class="form-group">
        <input type="datetime-local" class="form-control" v-model="beginTime">
      </div>
      <div class="form-group">
        <label>至</label>
        <input type="datetime-local" class="form-control" v-model="endTime">
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
      <div class="form-group" style="width:15%;">
        <input type="text" class="form-control" placeholder="请输入订单号" v-model="orderNumber" style="width:100%;">
      </div>
      <button type="button" class="btn btn-default yellow-bg" @click="search">查询</button>
    </form>
    <div class="table-responsive" style="margin-top:30px;" ref="record">
      <table class="table" v-show="recordShow">
        <thead>
          <tr>
            <th>订单号</th>
            <th>小区名</th>
            <th>下单时间</th>
            <th>下户预约时间</th>
            <th>类型</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-show="recordShow">
          <tr v-for="item in orderRecord">
            <td>{{item.orderNo}}</td>
            <td>{{item.orderCustCompoundName}}</td>
            <td>{{item.createTime}}</td>
            <td>{{item.orderCustTime}}</td>
            <td>{{item.modelName}}</td>
            <td><router-link :to="'/waitingXiaHuDetail/' + item.id">查看</router-link></td>
          </tr>            
        </tbody>
        <p style="text-align:center;margin-top:100px;" v-show="noDataShow">暂无数据</p>
      </table>      
    </div>
    <pagination :total="total" :current-page='pageIndex' :page-size="pageSize" @pageChange="getOrderRecord" v-if="pageShow"></pagination>
  </div>
</template>

<script>
import top from '@/components/header'
import sliderBar from '@/components/slidebar'
import pagination from '@/components/pagination'

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
      this.$store.dispatch('curPage');   //改变curPage的状态，若当前不是处于分页的第一页时在点击搜索按钮时能使分页及时回到第一页
    }
  },
  components: {
    top,
    sliderBar,
    pagination
  }
}
</script>