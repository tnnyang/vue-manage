<template>
	<div class="col-sm-9 main">
    <h3 class="main-title">绑定微信</h3>
    <div class="row placeholders text-center">
        <div class="wechatBox">
          <p>微信扫一扫手机电脑互动办公！</p>
          <p>第一步：扫二维码，关注公众号。</p>
          <img src="../assets/images/step1.jpg" alt="" />
          <p>第二部：扫二维码，完成绑定。</p>
          <img src="../assets/images/step2.jpg" alt="" />
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
    }
  },
  components: {
    top,
    sliderBar
  }
}
</script>