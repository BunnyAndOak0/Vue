<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <!--自定义事件监听：
          方法一：-->
      <!--<TodoHeader @addTodo="addTodo"></TodoHeader>--><!--给TodoHeader标签绑定addTodo的事件监听-->
      <!--方法二：-->
      <TodoHeader ref="header"></TodoHeader>
      <!--todo-list也可以大写变成小写然后中间加“-”-->
      <todo-list :todos="todos"></todo-list>
<!--      <TodoFooter :todos="todos"-->
<!--                  :deleteCompleteTodos="deleteCompleteTodos"-->
<!--                  :selectAllTodos="selectAllTodos"></TodoFooter>-->
      <TodoFooter>
        <input type="checkbox" v-model="isAllCheck" slot="checkAll">
        <span slot="count">已完成{{completeSize}} / 全部{{todos.length}}</span>
        <button class="btn btn-danger" v-show="completeSize" @click="deleteCompleteTodos" slot="delete">清除已完成任务</button>
      </TodoFooter>
    </div>
  </div>
</template>

<!--绑定事件监听 ------订阅消息
    触发事件------发布消息
-->

<script>
  import PubSub from 'pubsub-js'
  import TodoHeader from './components/TodoHeader.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFooter from './components/TodoFooter.vue'
  import storageUtils from "./util/storageUtils";

  export default {
    data(){
      return{
        /*todos: [
          {title: '吃饭', complete: false},
          {title: '睡觉', complete: true},
          {title: 'coding', complete: false}
        ]*/
        //从localStorage中读取todos  必须是一个数组
        // todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
        todos: storageUtils.readTodos()
      }
    },

    computed: {
      completeSize(){
        return this.todos.reduce((preTotal, todo) => preTotal + (todo.complete?1:0), 0)
      },
      isAllCheck: {
        get(){
          return this.completeSize === this.todos.length && this.completeSize > 0
        },

        set(value){
          this.selectAllTodos(value)
        }
      }
    },

    mounted() { //执行异步代码
      //给<TodoHeader>绑定addTodo事件监听
      //this.$on('addTodo', this.addTodo)   //这样做是给App绑定的监听
      this.$refs.header.$on('addTodo', this.addTodo)

      //订阅消息 => 使用箭头函数
      PubSub.subscribe('deleteTodo', (msg, index) => {
        this.deleteTodo(index)
      })
    },
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    },
    methods: {
      addTodo(todo){
        this.todos.unshift(todo)
      },
      deleteTodo(index){
        this.todos.splice(index, 1)
      },
      //删除所有选中的todo
      deleteCompleteTodos(){
        //覆盖以前的
        this.todos = this.todos.filter(todo => !todo.complete)
      },
      //全选 / 全不选
      selectAllTodos(check){
         this.todos.forEach(todo => todo.complete = check)
      }
    },
    //深度监视
    watch: {
      //监视
      todos: {
        deep: true,    //深度监视
        // handler: function (value) {
        //   //将todos最新的值的json数据  保存到localStorage里面
        //   //window.localStorage.setItem('todos_key', JSON.stringify(value))
        //   storageUtils.saveTodos(value)
        // }

        /*
        * handler需要的值是一个回调函数相当于
        * handler: function (todos) {
          window.localStorage.getItem(TODOS_KEY, JSON.stringify(todos))
        }
        */
        handler: storageUtils.saveTodos
      }
    }
  }
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>

