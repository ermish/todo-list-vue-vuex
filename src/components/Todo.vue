<template>
  <div class='todo'>
    <h1 class='todo-title'>{{ title }}</h1>
    <h2 class='todo-notes'>{{ notes }}</h2>
    <div class='todo-checklist-label'>Subtasks</div>
    <ol>
      <li v-for="subtask in subtasks" :key="subtask.id">
        {{ subtask.text }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'todo',
  props: [
    'title',
    'notes'
  ],
  data: () => {
    return {
      subtasks: [{id: 1, text: 'lol'}, {id: 2, text: 'lawl'}, {id: 3, text: 'teehee'}]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1, h2 {
  font-weight: normal;
}

.todo{
  display: flex;
  flex-direction: column;
  flex: 1 0 auto; 
  padding-left: 10px;
  background-color: #ffffff;

  .todo-title{
    align-self: flex-start;
  }

  .todo-notes{
    align-self: flex-start;    
    background-color: #f7f7f7;
  }

  .todo-checklist-label{
    align-self: flex-start;    
  }
}
</style>
