<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodo="addTodo"></TodoHeader>
      <!--也可以大写变成小写然后中间加“-”-->
      <todo-list :todos="todos" :deleteTodo="deleteTodo"></todo-list>
      <TodoFooter :todos="todos"
                  :deleteCompleteTodos="deleteCompleteTodos"
                  :selectAllTodos="selectAllTodos"></TodoFooter>
    </div>
  </div>
</template>

<script>
  import TodoHeader from './components/TodoHeader.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFooter from './components/TodoFooter.vue'
  export default {
    data(){
      return{
        /*todos: [
          {title: '吃饭', complete: false},
          {title: '睡觉', complete: true},
          {title: 'coding', complete: false}
        ]*/
        //从localStorage中读取todos  必须是一个数组
        todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
      }
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
        handler: function (value) {
          //将todos最新的值的json数据  保存到localStorage里面
          window.localStorage.setItem('todos_key', JSON.stringify(value))
        }
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

