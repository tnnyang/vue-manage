<template>
  <div id="app">
    <router-view></router-view>
    <alert-msg></alert-msg>
    <edit-pwd></edit-pwd>	
  </div>
</template>

<script>
import alertMsg from '@/components/alert'
import editPwd from '@/components/editPwd'

export default {
  components: {
    alertMsg,
    editPwd
  }
}
</script>