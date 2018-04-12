<template>
  <div class="col-sm-3 sidebar">
    <ul class="nav nav-sidebar">
      <router-link tag="li" to="/index" class="my-account">首页</router-link>
      <router-link tag="li" to="/newOrder" class="new-order">新建订单</router-link>      
      <router-link tag="li" :to="'/waitingXiaHu/'+ 3" class="waiting">待下户</router-link>
      <router-link tag="li" :to="'/overConfirmation/'+ 5" class="over">完成待确认</router-link>
      <router-link tag="li" to="/orderRecord" class="order">订单总表</router-link>
      <!-- <router-link tag="li" to="/addAccountChild">添加子账户</router-link> -->
    </ul>
  </div>
</template>
<style scoped>
.sidebar{background:#fff;width:200px;min-height:933px;padding:120px 0 0 0;box-shadow:0px 0 4px #adacacd4;}
.my-account{background-image:url(../assets/images/account.png);}
.new-order{background-image:url(../assets/images/newOrder.png);}
.order{background-image:url(../assets/images/order.png);}
.waiting{background-image:url(../assets/images/waiting.png);}
.over{background-image:url(../assets/images/over.png);}
.nav-sidebar > li{padding:15px 20px 15px 80px;cursor:pointer;font-size:16px;background-repeat:no-repeat;background-position:40px center;background-size:26px 26px;}
.nav-sidebar > li:hover,
.nav-sidebar > .router-link-active,
.nav-sidebar > .router-link-active:hover,
.nav-sidebar > .router-link-active:focus {color:#0a4d92;}
</style>