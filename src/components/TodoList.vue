<template>
<div class='todo-list'>
    <div class='todo-item' 
        v-for="todo in todos" 
        :key="todo.id">
        <todo
            :title='todo.text'
            :notes='todo.notes'
            v-on:completed="onTodoCompleted(todo.id)"
            >
        </todo>
    </div>
</div>
</template>


<script>
import { mapActions } from 'vuex'
import Todo from './Todo'

export default {
  name: 'todo-list',
  computed: {
    todos: function () {
      return this.$store.state.todos
    }
  },
  components: {
    'todo': Todo
  },
  methods: {
    ...mapActions([
      'addTodo',
      'removeTodo'
    ]),
    onTodoCompleted: function (id) {
      var self = this
      setTimeout(() => {
        self.removeTodo(id)
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
    .todo-list{
        display: grid;
        grid-template-columns: 0px 1fr 0px;
        grid-auto-rows: auto;
        grid-row-gap: 10px;
        
        border-radius: 8px;
        background-color: #ffffff;
        padding: 40px 30px 60px 30px;
        min-height: 400px;

        & .todo-item{
             grid-column: 2 / 2;
        }
    }
</style>