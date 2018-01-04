<template>
<div class='todo-list'>
    <div v-for="todo in todos" 
        :key="todo.id">
        <todo class='todo'
                :title='todo.text'
                :notes='todo.notes'>
        </todo>
    </div>
</div>
</template>


<script>
import Todo from './Todo'

export default {
  name: 'todo-list',
  data: () => {
    return {
      todos: [
        {id: 1, text: 'lol', notes: 'this is a note'},
        {id: 2, text: 'lawl', notes: 'this is a description'},
        {id: 3, text: 'teehee', notes: 'this is some detailed stuff'}]
    }
  },
  components: {
    'todo': Todo
  }
}
</script>

<style lang="scss" scoped>
    .todo-list{
        background-color: #ffffff;
        border-radius: 25px;

        display: grid;
        grid-template-columns: 10px 1fr 10px;
        grid-auto-rows: 500px;
        grid-row-gap: 10px;
        grid-column-gap: 10px;

        .todo{
             grid-column: 2 / 2;
             grid-row: auto;
            // grid-row: 2 / 2;
        }
    }
</style>