<template>
    <div>
      <div>
        <header class="site-header jumbotron">
          <div class="container">
            <div class="row">
              <div class="col-xs-12">
                <h1>请发表对Vue的评论</h1>
              </div>
            </div>
          </div>
        </header>
        <div class="container">
          <Add :addComment="addComment"></Add>
          <!--组件间通信-->
          <List :comments="comments" :deleteComment="deleteComment"></List>
        </div>
      </div>
    </div>
</template>

<script>
  import Add from './components/Add.vue'
  import List from './components/List.vue'
  export default {
    data(){
      return{
        comments: [
          //数据在哪个组件,更新数据的行为(方法)就应该定义在哪个组件
          {
            name: 'Bob',
            content: 'Vue还不错'
          },
          {
            name: 'alice',
            content: '找不到实习了'
          },
          {
            name: 'lili',
            content: 'Vue soso easy'
          }
        ]
      }
    },
    methods: {
      //添加评论
      addComment(comment){
        this.comments.unshift(comment)
      },
      //删除指定下标评论
      deleteComment(index){
        this.comments.splice(index, 1)
      }
    },
    components: {
      Add,
      List
    }
  }
</script>

<style>

</style>
