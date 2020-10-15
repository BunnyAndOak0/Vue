<template>
  <ul>
    <li v-for="(message, index) in message" :key="message.id">
      <a href="???">{{message.title}}</a>
    </li>
  </ul>
</template>

<script>
    export default {
        data() {
          return {
            messages: []
          }
        },
      mounted() {
          //模拟ajax请求从后台获取数据
        setTimeout(() => {
          const messages = [
            {
              id: 1,
              title: 'messages001'
            },
            {
              id: 2,
              title: 'messages002'
            },
            {
              id: 3,
              title: 'messages003'
            },
            {
              id: 4,
              title: 'messages004'
            }
          ]
        }, 1000)
      }
    }
</script>

<style scoped>

</style>
