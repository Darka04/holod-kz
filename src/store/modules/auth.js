// src/store/modules/auth.js

const state = {
  user: JSON.parse(localStorage.getItem('holod_user')) || null
}

const getters = {
  isLoggedIn: (state) => !!state.user,
  currentUser: (state) => state.user
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
    localStorage.setItem('holod_user', JSON.stringify(user))
  },
  CLEAR_USER(state) {
    state.user = null
    localStorage.removeItem('holod_user')
  }
}

const actions = {
  register({ commit }, { name, email, password }) {
    const users = JSON.parse(localStorage.getItem('holod_users')) || []

    const exists = users.find((u) => u.email === email)
    if (exists) {
      throw new Error('Пользователь с таким email уже существует')
    }

    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem('holod_users', JSON.stringify(users))

    commit('SET_USER', { name, email })
  },

  login({ commit }, { email, password }) {
    const users = JSON.parse(localStorage.getItem('holod_users')) || []
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      throw new Error('Неверный email или пароль')
    }

    commit('SET_USER', { name: user.name, email: user.email })
  },

  logout({ commit }) {
    commit('CLEAR_USER')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}