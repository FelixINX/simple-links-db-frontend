export const state = () => ({
  data: [],
  isLoaded: false,
})

export const mutations = {
  update(state, link) {
    // TODO
  },
  add(state, link) {
    state.data.push(link)
  },
  set(state, links) {
    state.data = links
  },
  remove(state, slug) {
    const index = state.data.findIndex(link => link.slug === slug)
    state.data.splice(index, 1)
  },
  markAsLoaded(state, isLoaded = true) {
    state.isLoaded = isLoaded
  },
}

export const actions = {
  getAll({ commit }) {
    this.$axios.get('/links').then(({ data }) => {
      commit('set', data)
      commit('markAsLoaded')
    })
  },
}

export const getters = {
  getBySlug: (state) => (slug) => {
    return state.data.find(link => link.slug === slug)
  },
}
