import { login as loginApi } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || '',
    siderType: true,
    lang: localStorage.getItem('lang') || 'zh',
    userInfo: ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setUserinfo(state, userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    changeSiderType(state) {
      state.siderType = !state.siderType
    },
    changeLang(state, lang) {
      state.lang = lang
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            console.log(res)
            if (res.data.status === 200) {
              commit('setToken', res.data.object.uuid)
              commit('setUserinfo', res.data.object.userInfo)
              setTokenTime()
              router.replace('/')
              resolve()
            } else {

            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    logout({ commit }) {
      commit('setToken', '')
      commit('setUserinfo', '')
      localStorage.clear()
      router.replace('/login')
    }
  }
}
