<template>
  <div id="weater" class="weather">
    <div id="weather-view-he" ref="weather"></div>
    <remote-script src="https://apip.weatherdt.com/view/static/js/r.js?v=1111"></remote-script>
  </div>
</template>
<script>
  window.WIDGET = {ID: 'FQZXHXp2V6'};   // 将WIDGET前边加上window 否则读取不到此变量
  import Vue from 'vue'
  Vue.component('remote-script', {   // vue动态生成script (在html中当成组件来用)
    render: function (createElement) {
      var self = this;
      return createElement('script', {
        attrs: {
          type: 'text/javascript',
          src: this.src
        },
        on: {
          load: function (event) {
            self.$emit('load', event);
          },
          error: function (event) {
            self.$emit('error', event);
          },
          readystatechange: function (event) {
            if (this.readyState == 'complete') {
              self.$emit('load', event);
            }
          }
        }
      });
    },
    props: {
      src: {
        type: String,
        required: true
      }
    }
  })
  export default {
    name:"Weather",
    data(){
      return {

      }
    },
  }
</script>
<style>
  .weather{
    shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
  }
</style>
