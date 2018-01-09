<template lang="pug">
  div#todo-page
    todo-list#todo-list
</template>

<script>
import TodoList from '@/components/TodoList'

export default {
  name: 'todo-page',
  data: () => {
    return {}
  },
  components: {
    'todo-list': TodoList
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

#todo-page {
    display: grid;
    grid-template-columns: 5px auto 5px;

    @media screen and (min-width: $width-desktop) {
        grid-template-columns: 25px auto 25px;
    }

    #todo-list{
        grid-column: 2 / 2;
        margin: 25px 0;
        padding: 11px 5px;
    }
}
</style>
