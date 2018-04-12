<template>
	<div class="col-sm-9 main">
	  <div class="row">
	  	<div class="col-sm-6" style="height:360px;background:#fff;box-shadow:0 0 4px #e0dfdf;">
	  		<div class="fix-left">
				<div class="circle-box ab-center">
					<div class="circle fix-left">
						<div class="circle-left1"></div>
						<div class="circle-left2"></div>
					</div>
					<div class="circle fix-left">
						<div class="circle-right"></div>
					</div>
				</div>
				<div class="index-info"><h5>待派单</h5><label>{{pendingCount}}</label></div>
			</div>
			<div class="fix-left">
				<div class="circle-box ab-center">
					<div class="circle fix-left">
						<div class="circle-left1"></div>
						<div class="circle-left2"></div>
					</div>
					<div class="circle fix-left">
						<div class="circle-right"></div>
					</div>
				</div>
				<div class="index-info"><h5>待下户</h5><label>{{allotCount}}</label></div>
			</div>
	  		<div class="fix-left">
				<div class="circle-box ab-center">
					<div class="circle fix-left">
						<div class="circle-left1"></div>
						<div class="circle-left2"></div>
					</div>
					<div class="circle fix-left">
						<div class="circle-right"></div>
					</div>
				</div>
				<div class="index-info"><h5>下户中</h5><label>{{excuteCount}}</label></div>
			</div>
			<div class="fix-left">
				<div class="circle-box ab-center">
					<div class="circle fix-left">
						<div class="circle-left1"></div>
						<div class="circle-left2"></div>
					</div>
					<div class="circle fix-left">
						<div class="circle-right"></div>
					</div>
				</div>
				<div class="index-info"><h5>完成待确认</h5><label>{{confiremedCount}}</label></div>
			</div>
	  	</div>
	  	<div class="col-sm-6 pull-right index-announcement">
	      <h3>公告</h3>
	      <ul>
	      	<li v-for="item in announcement"><router-link to="/announcementDetail">{{item.title}}</router-link></li>
	      </ul>
      	</div>
	  </div>
	  <div class="index-record">
		  <h4 class="sub-header" style="margin:30px 20px 20px;">订单记录 <small class="pull-right"><router-link to="/orderRecord">查看更多</router-link></small></h4>
		  <div class="table-responsive">
		    <table class="table">
		      <thead>
		        <tr>
		          <th>订单号</th>
		          <th>小区名</th>
		          <th>下单时间</th>
		          <th>单价</th>
		          <th>类型</th>
		          <th>状态</th>
		          <th></th>
		        </tr>
		      </thead>
		      <tbody v-show="recordShow">
		        <tr v-for="item in orderRecord">
		          <td>{{item.orderNo}}</td>
		          <td>{{item.orderCustCompoundName}}</td>
		          <td>{{item.createTime}}</td>
		          <td>0</td>
		          <td>{{item.modelName}}</td>
		          <td>{{item.orderState}}</td>
		          <td><router-link :to="'/overDetail/' + item.id">查看</router-link></td>
		        </tr>
		      </tbody>
		      <p style="text-align:center;margin-top:100px;" v-show="noDataShow">暂无数据</p>
		    </table>
		  </div>
	  </div>
	</div>
</template>

<script>
import top from '@/components/header'
import sliderBar from '@/components/slidebar'

export default {
	data () {
		return {
			pendingCount: 0,
			allotCount: 0,
			excuteCount: 0,
			confiremedCount: 0,
			orderRecord: [],
			pageSize: 7,
			pageIndex: 1,
			announcement: [
				{title: "爱下户全体员工热烈欢迎您的到来爱下户全体员工热烈欢迎您的到来"},
				{title: "爱下户项目于今日即将上线 敬请期待"},
				{title: "公司放假通知"},
				{title: "关于五一节假日放假通知安排"},
				{title: "关于项目改版的通知"},
				{title: "爱下户全体员工热烈欢迎您的到来"},
				{title: "爱下户项目于今日即将上线 敬请期待"},
				{title: "公司放假通知"},
				{title: "关于五一节假日放假通知安排"}
			],
			recordShow: true,
			noDataShow: false
		}
	},
	mounted(){
		this.$nextTick(function(){
			util.apiPost(api + "/customer/getCustomerOrderCount").then(res => {
				if(res.code == 0){
					let response = res.data;
					this.pendingCount = response.pendingCount;
					this.allotCount = response.allotCount;
					this.excuteCount = response.excuteCount;
					this.confiremedCount = response.confiremedCount;
				}
			});

			util.apiPost(api + "/customer/getOrderRecord", {pageSize: this.pageSize, pageIndex: this.pageIndex}).then(res => {
				if(res.code == 0){
					let response = res.data;
					this.orderRecord = response.dataList;

					if(response.dataList.length == 0){
						this.recordShow = false;
						this.noDataShow = true;
					}else{
						this.recordShow = true;
						this.noDataShow = false;
					}
				}
			});

			setTimeout(() => {
				//动画延迟执行
				let circleRight = document.querySelectorAll(".circle-right");
				for(var i= 0; i< circleRight.length; i ++){
			        circleRight[i].className += " ani1";
				}
				
				setTimeout(() => {
					let circle = document.querySelectorAll(".circle");
					for(var i= 0; i< circle.length; i ++){
				        circle[i].style.overflow = "initial";
					}

				}, 500);

				let circleLeft1 = document.querySelectorAll(".circle-left1");
				for(var i= 0; i< circleLeft1.length; i ++){
			        circleLeft1[i].className += " ani3";
				}

				let circleLeft2 = document.querySelectorAll(".circle-left2");
				for(var i= 0; i< circleLeft2.length; i ++){
			        circleLeft2[i].className += " ani2";
				}
			}, 500);
		});
	},
	components: {
		top,
		sliderBar
	}
}
</script>
<style scoped>
.main{padding-top:0;background:#f5f5f5}
.fix-left{float:left;height:50%;width:50%;position:relative;}
.circle-box{width:140px;height:140px;transform:rotate(-15deg);}
.ab-center{position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;}
.circle-box .circle {width:50%;height:100%;overflow:hidden;}
.circle-box .circle-left1{width:calc(200%);height:calc(100%);border-radius:50%;border:10px solid transparent;border-top:10px solid transparent;border-right:10px solid transparent;transform:rotate(44deg);float:left;}
.circle-box .circle-left2 {width:calc(200%);height:calc(100%);border-radius:50%;border:10px solid transparent;border-top:10px solid transparent;border-right:10px solid transparent;transform:rotate(44deg);}
.circle-box .circle-right {width:calc(200%);height:calc(100%);border-radius:50%;border:10px solid transparent;border-top:10px solid transparent;border-right:10px solid transparent;-webkit-transform-origin:0;transform-origin:0;transform:rotate(225deg) translate(-50%, 0);}
.layui-laydate .layui-this{background-color:#fec246!important;}
.circle-box .ani1{animation:first 1s linear forwards;border-top-color:#ee5d40;border-right-color:#ee5d40;}
.circle-box .ani2{animation:second 1s linear forwards;border-top-color:#ee5d40;border-right-color:#ee5d40;}
.circle-box .ani3{animation:third 1.25s linear forwards;border-top-color:#ffb74c;border-right-color:#ffb74c;}
.index-info{text-align:center;margin-top:70px;animation:fourth 3.5s linear forwards;}
.index-info h5{font-size:14px;margin-bottom:5px;}
.index-info label{font-size:30px;color:#ff691b;}
.index-announcement{width:48%;height:360px;margin-left:15px;background:#fff;box-shadow:0 0 4px #e0dfdf;}
.index-announcement h3{font-size:18px;height:40px;line-height:40px;background:url(../assets/images/announcement.png) no-repeat 15px center / 32px 32px;margin:15px 0 10px;padding-left:58px;}
.index-announcement li{list-style:none;line-height:30px;margin:0 10px 0 20px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}
.index-announcement li a{color:#666;}
.index-record{background:#fff;margin:20px -15px 0;overflow:hidden;height:452px;}
.table-responsive{margin:0;}
@keyframes first {
  0% {
    transform: rotate(225deg) translate(-50%, 0);
  }
  50% {
    transform: rotate(405deg) translate(-50%, 0);
  }
  100% {
    transform: rotate(412deg) translate(-50%, 0);
  }
}
@keyframes second {
  0% {
    transform: rotate(44deg);
  }
  50% {
    transform: rotate(44deg);
  }
  100% {
    transform: rotate(160deg);
  }
}
@keyframes third {
  0% {
    transform: rotate(44deg);
  }
  50% {
    transform: rotate(44deg);
  }
  100% {
    transform: rotate(232deg);
  }
}
@keyframes fourth {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>