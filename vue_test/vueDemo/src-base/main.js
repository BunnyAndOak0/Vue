/*
* 入口js：创建vue实例
* 左边为的Vue为大写 右边的vue为小写
* */
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
