<template>
  <div>
    <div v-if="showAlert">
      <!-- <div class="mask mask-white"></div> -->
      <div class="validatePopTips vetically">
        <div class="tips-context">
          <!-- <p>提示</p> -->
          <span>{{alertMsg}}</span></div>
        </div>
    </div>
    <div v-if="alertCallBack">
      <div class="mask mask-white"></div>
      <div class="validatePopTips vetically">
        <div class="tips-context">
          <!-- <p>提示</p> -->
          <span>{{alertMsg}}</span></div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'showAlert',
      'alertMsg',
      'alertCallBack'
    ])
  },
  watch: {
    'showAlert'() {
      if(this.showAlert){      
        setTimeout(() => {
          this.$store.dispatch('showAlert', false);
        },2000);
      }
    },
    'alertCallBack'() {  //带回调的弹窗
      if(this.alertCallBack){     
        setTimeout(() => {
          this.$store.dispatch('alertCallBack', false);
        },2000);        
      }
    }
  }
}
</script>