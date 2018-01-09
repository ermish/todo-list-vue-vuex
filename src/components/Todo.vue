<template>
  <div class='todo' 
       @click='doubleClickHandler'
       v-bind:class="{ iscollapsed: isCollapsed }">
    <div class='todo-header'>
      <input type="checkbox" :id="boxId" :checked="isCompleted" />
      <label :for="boxId" class='todo-checkbox' @click='onTodoCompleted'></label> 
      <h1 class='todo-title'>{{ title }}</h1>
    </div>
    <div class='todo-details'>
      <div class='todo-notes'>{{ notes }}</div>
      <div class='todo-subtasks'>
        <ol>
          <li v-for="subtask in subtasks" :key="subtask.id">
            {{ subtask.text }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo',
  props: [
    'title',
    'notes',
    'id'
  ],
  data: () => {
    return {
      boxId: 'box' + Math.ceil(Math.random() * 10000),
      isCollapsed: true,
      isCompleted: false,
      subtasks: [{id: 1, text: 'lol'}, {id: 2, text: 'lawl'}, {id: 3, text: 'teehee'}],
      doubleClick: {
        delay: 200,
        clicks: 0,
        timer: null,
        singleClickFunctionName: 'toggleTodoCollapsed',
        doubleClickFunctionName: 'toggleTodoCollapsed'
      }
    }
  },
  methods: {
    toggleTodoCollapsed: function () {
      this.isCollapsed = !this.isCollapsed
    },
    onTodoCompleted: function () {
      this.isCompleted = !this.isCompleted

      if (this.isCompleted) {
        this.$emit('completed')
      }
    },
    doubleClickHandler: function (event) {
      var self = this

      if (self.isCompleted) {
        return
      }

      this.doubleClick.clicks++

      if (self.doubleClick.clicks === 1) {
        self.doubleClick.timer = setTimeout(function () {
          self.doubleClick.clicks = 0
        }, self.doubleClick.delay)
      } else {
        clearTimeout(self.doubleClick.timer)
        self.doubleClick.clicks = 0
        self.toggleTodoCollapsed()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../sass/_checkbox.scss";

h1, h2 {
  font-weight: normal;
}

.todo{
  display: flex;
  flex-direction: column;
  flex: 1 0 auto; 
  align-items: stretch;
  
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 3px #dfdfdf;
  border-radius: 4px;

  &.iscollapsed{
    .todo-details{
      padding: 0 18px;
      max-height: 0;
      transition: max-height 0.3s ease-out, padding .3s ease-out .2s;
    }
  }


  .todo-header{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    padding: 10px 18px 15px 18px;
    
    .todo-checkbox{
        margin: 0 15px 0 0;
        @extend .check-box;
    }

    .todo-title{
        font-weight: 400;
        font-size: 25px;
        margin: 0;
    }
  }


  .todo-details{
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-self: stretch;

    max-height: 1000px;
    transition:max-height 0.3s ease-in;

    overflow: hidden;
    margin: 0 5px 0 5px;
    padding: 18px 18px;
    background-color: #fafafa;
    border-radius: 15px;    

    .todo-notes{
      flex: 1 1 auto;
      align-self: flex-start;    
    }

    .todo-subtasks{
      flex: 1 1 auto;
      align-self: flex-start;  

      ol {
        padding-left: 18px;
      }
    }
  }
}
</style>
