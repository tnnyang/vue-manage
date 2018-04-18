<template>
  <div class="col-sm-9 main">
    <h3 class="main-title">新建订单</h3>
    <div class="row placeholders customer-inline">
        <div class="col-sm-4" style="width:35%;">
          <label>下户预约时间</label>
          <input type="text" class="form-control datetime" id="orderDate" v-model="reserveDate" @click="orderDate">
        </div>
        <div class="col-sm-4" style="padding:0;width:32%;">
          <label>小区名称</label>
          <input type="text" class="form-control" v-model="community" placeholder="小区名称" style="width:58%;">
        </div>        
        <div class="col-sm-4" style="padding:0;width:32%;">
          <label>下户类型</label>
              <select class="form-control" v-model="modelType">
                <option value="">请选择类型</option>
                <option v-for="item in typeOptions" :value="item.id">{{item.modelName}}</option>
              </select>
        </div>
        <div class="col-sm-8">
          <label>下户地址</label>
          <input type="text" id="suggestId" class="form-control" placeholder="下户地址" v-model="address" style="width:80.5%;">
        </div>
        <div class="col-sm-4">
          <button type="button" class="btn btn-default yellow-bg" style="width:83%;margin-left:40px;" @click="createOrder">确定</button>
        </div>
    </div>
    <div id="BMap"></div>
  </div>
</template>

<script>
import top from '@/components/header'
import sliderBar from '@/components/slidebar'
import * as validateFun from '../assets/js/validate'
import '../assets/js/laydate'
import '../assets/css/laydate/css/laydate.css'
import '../assets/css/laydate/css/skin.laydate.css'
import {MP} from '../assets/js/map'

export default {
  data () {
    return {
      reserveDate: "",
      community: "",
      cityInfo: {province: "", city: "", district: ""},
      address: "",
      modelType: "",
      typeOptions:[],
      userlocation: {lng: "", lat: ""},
    }
  },
  mounted() {
    this.$nextTick(function(){
      //下户类型
      util.apiPost(api + "/customer/getModelList").then(res => {
        this.typeOptions = res.data;
      });

      //百度地图
      MP("sXYKoWGxQfuzrTcpITiYnBHO").then(BMap => {
        var self = this;
        var map = new BMap.Map("BMap");            // 创建Map实例
        var point = new BMap.Point(121.47,31.23); // 创建点坐标
        map.centerAndZoom(point,15);
        map.enableScrollWheelZoom();
        var geoc = new BMap.Geocoder();
        var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
          {
            "input": "suggestId",
            "location": map
        });
        var myValue;
        ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
          var _value = e.item.value;
          myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
          this.suggestId = myValue;
          self.address = myValue;     
          setPlace();
        });

        function setPlace(){
          map.clearOverlays();    //清除地图上所有覆盖物
          function myFun(){
            self.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(self.userlocation, 15);
            map.addOverlay(new BMap.Marker(self.userlocation));    //添加标注

            geoc.getLocation(self.userlocation, function(rs){
              //addressComponents对象可以获取到详细的地址信息
              var addComp = rs.addressComponents;
              var site = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
              self.cityInfo.province = addComp.province;
              self.cityInfo.city = addComp.city;
              self.cityInfo.district = addComp.district;
              // console.log(site);
            });
          }
          var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
          });
          local.search(myValue);
        }

        //单击地图监听事件
        // map.addEventListener("click", function(e){
        //   console.log(e.point);   //获取到点击处的经纬度
        //   //通过点击百度地图，可以获取到对应的point, 由point的lng、lat属性就可以获取对应的经度纬度     
        //   var pt = e.point;
        //   geoc.getLocation(pt, function(rs){
        //     //addressComponents对象可以获取到详细的地址信息
        //     var addComp = rs.addressComponents;
        //     var site = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
        //     console.log(site);
        //   });
        // }); 
      });
    });
  },
  methods: {
    createOrder(){
      if(!this.reserveDate){
        util.alertMsg("请输入下户预约时间");
        return false;
      }else if(!this.community){
        util.alertMsg("请输入小区名称");
        return false;
      }else if(!this.address){
        util.alertMsg("请输入下户地址");
        return false;
      }else if(!this.modelType){
        util.alertMsg("请输入下户类型");
        return false;
      }else if(!this.userlocation.lng || !this.userlocation.lat){
        util.alertMsg("请选择地址坐标");
        return false;
      }else{
        let params = {reserveDate: this.reserveDate, community: this.community, province: this.cityInfo.province, city: this.cityInfo.city, county: this.cityInfo.district, address: this.address, longitude: this.userlocation.lng, latitude: this.userlocation.lat, modelType: this.modelType};

        util.apiPost(api + "/customer/createOrder", params).then(res => {
          if(res.code == 0){
            this.reserveDate = "";
            this.community = "";
            this.address = "";
            this.modelType = 0;
            
            util.msgFoo(res.msg, () => {
              this.$router.push("/orderRecord");
            });
          }
        });
      }      
    },
    orderDate(){
      laydate({
        elem: '#orderDate',
        istime: true,
        format: 'YYYY-MM-DD hh:mm:ss', 
        choose: (dateTime) => {
          this.reserveDate = dateTime;
        }
      });
    }
  },
  components: {
    top,
    sliderBar
   },
}
</script>
<style scoped>
#BMap{width:100%;height:580px;}
.customer-inline{margin-left:0;}
.col-sm-4, .col-sm-8{padding:0;}
</style>