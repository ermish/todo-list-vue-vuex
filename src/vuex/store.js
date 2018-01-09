import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  todos: [
    { id: 0, text: 'lol', notes: 'this is a note' },
    { id: 1, text: 'lawl', notes: 'this is a description' },
    { id: 3, text: 'teehee', notes: 'this is some detailed stuff' }
  ]
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  addTodo (state) {
    state.todos.push({ id: 4, text: '', notes: 'new todo notes' })
  },
  removeTodo (state, todoId) {
    state.todos = state.todos.filter((obj) => {
      return obj.id !== todoId
    })
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  addTodo: ({ commit }) => commit('addTodo'),
  removeTodo: ({ commit }, todoId) => commit('removeTodo', todoId),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('addTodo')
    }
  },
  incrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('addTodo')
        resolve()
      }, 1000)
    })
  }
}

// getters are functions
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
