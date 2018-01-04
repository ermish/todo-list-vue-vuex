<<template lang="pug">
  div#todo-page
    todo-list#todo-list
</template>

<<script>
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
    #todo-page {
        display: grid;
        grid-template-columns: 50px auto 50px;

        #todo-list{
            grid-column: 2 / 2;
        }
    }
</style>
