<template>
	<div class="col-sm-9 main">
    <h3 class="main-title">订单详情</h3>
    <ul class="detail">
      <li>下户预约时间：{{orderCustTime}}（允许往后延长30分钟）</li>
      <li>小区名字：{{community}}</li>
      <li>下户地址：{{province + city + area + adress}}</li>
      <li>下户类型：{{modelName}}</li>
      <li>下户时间：{{createTime}}</li>
    </ul>
    <p><button type="button" class="btn btn-default yellow-bg" style="width:120px;display:block;margin:30px auto 0;" @click="back">返回</button></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      createTime: "",
      orderCustTime: "",
      community: "",
      province: "",
      city: "",
      area: "",
      adress: "",
      modelName: ""
    }
  },
  // watch: {
  //   '$route' () {
  //     this.getOrderDetail();
  //   }
  // },
  mounted () {
    this.$nextTick(function(){
      this.getOrderDetail();
    })    
  },
  methods: {
    getOrderDetail () {
      if(this.$route.params.id){
        util.apiPost(api + "/customer/getOrderDetail?orderId=" + this.$route.params.id).then(res => {        
          if(res.code == 0){
            let orderInfo = res.data.orderInfo;

            this.createTime = orderInfo.createTime;
            this.orderCustTime = orderInfo.orderCustTime;
            this.community = orderInfo.orderCustCompoundName;
            this.province = orderInfo.orderCustProvince;
            this.city = orderInfo.orderCustCity;
            this.area = orderInfo.orderCustArea;
            this.adress = orderInfo.orderCustAddr;
            this.modelName = orderInfo.modelName;
          }
        });
      }
    },
    back(){
      this.$router.go(-1);
    }
  }
}
</script>
<style scoped>
  .detail li{list-style-type:none;line-height:40px;margin-left:80px;}
</style>