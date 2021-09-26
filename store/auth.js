export const state = () => ({
  data: {},
  token: null,
  isLoggedIn: false,
  authError: false,
})

export const mutations = {
  setState(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn
  },
  logout(state) {
    state.data = {}
    state.isLoggedIn = false
  },
  setToken(state, token) {
    state.token = token
  },
  setAuthError(state, hasError) {
    state.authError = hasError
  },
}

export const actions = {
  login({ commit }, { username, password }) {
    const token = btoa(`${username}:${password}`)
    
    commit('setToken', token)
    this.$axios.setToken(token, 'Basic')
  },
  logout({ commit }) {
    commit('logout')
    commit('logout')
    commit('setToken', null)
    commit('links/markAsLoaded', false, { root: true })
    commit('links/set', [], { root: true })
  }
}