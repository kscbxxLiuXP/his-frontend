<template>
  <div class="back" :style="{backgroundImage:'url('+bg+')'}">
    <div class="tip">
      这是患者处置页<br/><br/>还没有开发完成哦！
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        bg: require('@/assets/images/sorry.gif')
      }
    }
  }
</script>
<style scoped>
  .tip {
    margin: 30px;
    width: 400px;
    margin-top: 200px;
    margin-left: 140px;
    font-size: 30px;
  }

  .back {
    background-size: 100% 100%;

    height: 100%;
    position: fixed;
    width: 100%

  }
</style>
