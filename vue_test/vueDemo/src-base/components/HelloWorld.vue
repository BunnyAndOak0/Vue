<template>
    <div>
      <p class="msg">{{msg}}</p>
    </div>
</template>

<script>
  export default {  //配置对象（和vue一致）
    data(){   //组件中必须写函数
      return {
        msg: 'Hello Vue Component'
      }
    }
  }
</script>

<style>
  .msg{
    color: red;
    font-size: 30px;
  }
</style>
