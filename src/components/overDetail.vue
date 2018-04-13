<template>
	<div class="col-sm-9 main">
    <h3 class="main-title">订单详情</h3>
    <div class="row finish_line">
      <div class="col-sm-3">
        <label>订单号：</label>
        <span>{{orderNo}}</span>
      </div>
      <div class="col-sm-4">
        <label>下户时间：</label>
        <span>{{createTime}}</span>
      </div>
      <!-- <a class="col-sm-2" href="javascript:;" style="color:#333;text-decoration: underline;">导出pdf报告</a> -->
    </div>
    <div class="row finish_line">
        <div class="col-sm-12">
          <label>下户地址：</label>
          <span class="form-control-static">{{province + city + area + adress}}</span>
        </div>
    </div>
    <div class="panel panel-default" v-for="item in detailTxt">
        <h3 class="info-title panel-heading">{{item.titleName}}</h3>             
        <div class="info" v-for="content in item.child">
          <h4 style="margin:20px 0;">{{content.titleName}}</h4> 
          <div v-for="val in content.child">
            <ul v-for="v in val">
              <li v-if="v.type=='radio'">
                <label>{{v.filedName}}</label>
                <span v-for="ck in v.options" style="margin-right:10px;">
                  <input type="radio" :name='v.filedUsName' disabled :checked="v.value.key == ck.key" :value="ck.key">{{ck.value}}
                </span>
              </li>
              <li v-else-if="v.type=='select'">
                <label>{{v.filedName}}</label>
                <select :name='v.filedUsName' class="form-control selected" disabled>
                  <option v-for="ck in v.options" :selected="v.value.key == ck.key" :value="ck.key">{{ck.value}}</option>
                </select>
              </li>
              <li v-else-if="v.type=='checkbox'">
                <label style="margin-top:2px;">{{v.filedName}}</label>
                <span v-for="ck in v.options">
                  <input type="checkbox" disabled :name='v.filedUsName' v-model="v.value" :value="ck.key">{{ck.value}}
                </span>
              </li>
              <li v-else-if="v.type=='txt'">
                <label>{{v.filedName}}</label>
                <input type="text" :name='v.filedUsName' disabled :maxlength="v.length" :value="v.value" class="form-control selected" />
              </li>
              <li v-else-if="v.type=='longtxt'">
                <label>{{v.filedName}}</label>
                <textarea class="form-control beizhu" disabled :rows="v.row" :cols="v.col" :maxlength="v.length" v-html="v.value" style="resize:none;"></textarea>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <div class="panel panel-default" v-for="item in detailPic">
        <h3 class="info-title panel-heading">{{item.titleName}}</h3>            
        <div v-for="content in item.child" style="margin-left:15px;">
          <h4 style="margin:20px 0;">{{content.titleName}}</h4>         
          <div class="finishImgs" v-for="val in content.child">
            <span  v-for="v in val">
              <img v-for="ck in v.values" :src="'http://api.fyamc.cn:31101/file/download.ashx?GUID=' + ck.fileGUID" class="img-responsive img-thumbnail" :alt="ck.filedName">
            </span>
          </div>
        </div>
    </div>
    <div class="row finish_line" style="text-align:center;margin:30px 0 50px;">
      <div class="col-sm-12">
        <button type="button" class="btn btn-default yellow-bg" style="width:120px;" @click="overBtn">{{waitingSure}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderNo: "",
      createTime: "",
      province: "",
      city: "",
      area: "",
      adress: "",
      detailTxt: [],
      detailPic: [],
      checkOptions: [],
      waitingSure: "返回"
    }
  },
  watch: {
    '$route' () {
      this.getOrderDetail();
    }
  },
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
            this.orderNo = orderInfo.orderNo;
            this.createTime = orderInfo.createTime;
            this.province = orderInfo.orderCustProvince;
            this.city = orderInfo.orderCustCity;
            this.area = orderInfo.orderCustArea;
            this.adress = orderInfo.orderCustAddr;

            if(orderInfo.orderState == 5){    //如果是待确认的状态，将按钮改为确认完成，目前没有接口，暂时都改成返回
              this.waitingSure = "返回";
            }

            if(res.data.modelData != null && res.data.modelData != ""){
              let modelData = JSON.parse(res.data.modelData.modelData);
              this.detailTxt = modelData.txt;
              this.detailPic = modelData.pic;
            }
            
          }
        });
      }
    },
    overBtn(){
      this.$router.go(-1);
    }
  }
}
</script>
<style scoped>
.info{padding-left:15px;margin-top:15px;}
.info-title{font-size:16px;}
.info li{margin-bottom:20px;}
.info li label{margin:6px 15px 0 0;float:left;width:100px;text-align:right;font-weight:normal;}
.selected, .beizhu{width:50%;display:inline-block;}
.info li input[type="radio"]{position:relative;top:2px;margin-right:5px;}
.info li input[type="checkbox"]{position:relative;top:2px;margin:0 5px 0 15px;}
.info li span:nth-child(2) input[type="checkbox"]{margin-left:0;}
.finishImgs{padding:10px 0 0 15px;}
.finishImgs img{width:120px;height:120px;margin:0 40px 20px 0;padding:0;border:none;border-radius:5px;}
</style>