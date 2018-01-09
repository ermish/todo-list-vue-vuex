<template>
<div class='todo-list' @click='onTodoListClicked'>
    <div class='todo-item' 
        v-for="todo in todos" 
        :key="todo.id">
        <todo
            :title='todo.text'
            :notes='todo.notes'
            v-on:completed="onTodoCompleted(todo.id)"
            ref='todos'
            >
        </todo>
    </div>
    <div class='add-todo-container'>
        <a class='add-todo-button' href='javascript:void(0)' @click='onAddTodo'>
            <span class='add-todo-icon'>+</span> Add todo
        </a>
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
    },
    onTodoListClicked: function () {
      this.closeTodos()
    },
    onAddTodo: function () {
      var self = this
      self.addTodo()
      setTimeout(() => { self.$refs.todos.last().expand() }, 300)
    },
    closeTodos: function () {
      this.$refs.todos.every(todo => { todo.collapse() })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import "../sass/_variables.scss";

    .todo-list{
        display: grid;
        grid-template-columns: 0px 1fr 0px;
        grid-auto-rows: min-content;
        grid-row-gap: 10px;
        
        border-radius: 8px;
        background-color: #ffffff;
        min-height: 400px;
        padding: 5px;

        @media screen and (min-width: $width-desktop) {
            & {
                padding: 40px 30px 60px 30px !important;
            }
        }

        & .todo-item{
            grid-column: 2 / 2;
        }

        .add-todo-container{
            grid-column: 2 / 2;

            display: flex;
            align-self: flex-start;

            font-size: 28px;
            margin: 25px 15px;

            .add-todo-button{
                color: #c7c7c7;
                text-decoration: none;

                .add-todo-icon{
                    content:"+";
                }

                &:hover{
                    color: #808080;
                }
            }
        }
    }
</style>