import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggingIn: false,
    loginError: null,
    accessToken: null

  },
  mutations: {
    loginStop: (state, errorMessage) => {
      state.loggingIn = false,
        state.loginError = errorMessage
    },
    
    updateAccessToken: (state, token) => {
      state.accessToken = token
    },

    logout: (state) => {
      state.accessToken = null
    }

  },
  actions: {
    doLogin({
      commit
    }, loginData) {
      axios.post('https://reqres.in/api/login', {
          ...loginData
        })
        .then(response => {
          localStorage.setItem('accessToken', response.data.token);
          commit('loginStop', null);
          commit('updateAccessToken', response.data.token);
          router.push('/users');
        })
        .catch(error => {
          commit('loginStop', error.response.data.error);
          commit('updateAccessToken', null);
        })
    },
    fetchAccessToken({
      commit
    }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'))
    },

    logout({commit}) {
      localStorage.removeItem('accessToken');
      commit('logout');
      router.push('/login');
    }
  }
});