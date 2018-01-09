<template>
  <div class='todo' 
       @click='onTodoClick'
       v-bind:class="{ iscollapsed: isCollapsed }">
    <div class='todo-header'>
      <input type="checkbox" :id="boxId" :checked="isCompleted" />
      <label :for="boxId" class='todo-checkbox' @click='onTodoCompleted'></label> 
      <div class='todo-title'
           @click='onTitleClick'>
        <h1 class='title-fixed'
            v-if='isCollapsed'>{{ title_ }}</h1>
        <input class='title-editable'
               placeholder='drink some water...' 
               v-else 
               v-model='title_' />
      </div>
    </div>
    <div class='todo-details'> 
      <div class='todo-notes'>{{ notes_ }}</div>
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
  props: {
    title: String,
    notes: String,
    id: String
  },
  data: function () {
    return {
      title_: this.title,
      notes_: this.notes,
      boxId: 'box' + Math.ceil(Math.random() * 10000),
      isCollapsed: true,
      isCompleted: false,
      inTitleEditMode: false,
      subtasks: [{id: 1, text: 'lol'}, {id: 2, text: 'lawl'}, {id: 3, text: 'teehee'}],
      doubleClick: {
        delay: 300,
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
    expand: function () {
      this.isCollapsed = false
    },
    collapse: function () {
      this.isCollapsed = true
    },
    onTodoCompleted: function () {
      this.isCompleted = !this.isCompleted

      if (this.isCompleted) {
        this.$emit('completed')
      }
    },
    onTitleClick: function (event) {
      this.expand()
      event.stopPropagation()
    },
    onTodoClick: function (event) {
      var self = this

      if (self.isCompleted) {
        return
      }

      if (!self.isCollapsed) {
        event.stopPropagation()
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
        event.stopPropagation()
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
  flex: 1 1 auto; 
  align-items: stretch;
  
  padding: 10px 15px;
  background-color: #ffffff;
  box-shadow: 0 0 3px #dfdfdf;
  border-radius: 4px;

  &.iscollapsed{
    .todo-details{
      padding: 0 18px;
      max-height: 0;
      margin: 0;
      transform: translate3d(0,0,0); /* trigger HW acceleration */
      transition: max-height 0.3s ease-in-out, padding .3s ease-in-out .2s, margin .3s ease-in-out .2s;
    }
  }


  .todo-header{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    line-height: 40px;
    height: 40px;

    .todo-checkbox{
        @extend .check-box;
        margin: 0 15px 0 0;
        line-height: 40px;
    }

    .todo-title{
        min-width: 25px;

        .title-fixed{
          font-weight: 400;
          font-size: 25px;
          line-height: 40px;
          margin: 0;
        }

        .title-editable{
          font-weight: 400;
          font-size: 25px;
          line-height: 40px;
          margin: 0;

          border: none;
          border-color: transparent;
          font-family: 'Avenir', Helvetica, Arial, sans-serif;

          &:focus{
            outline: none;
          }

          &::placeholder { /* Most modern browsers support this now. */
            color: rgb(236, 236, 236);
          }
        }
    }
  }


  .todo-details{
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-self: stretch;

    max-height: 1000px;
    transform: translate3d(0,0,0); /* trigger HW acceleration */    
    transition:max-height 0.3s ease-in-out;

    overflow: hidden;
    padding: 18px 18px;
    background-color: #fafafa;
    border-radius: 8px;
    margin: 12px 0 2px 0;    

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
