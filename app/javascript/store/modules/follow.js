import axios from 'axios';
import Api from '../../api/api';
import { mapState, mapGetters, mapActions } from 'vuex'
import Rails from "@rails/ujs"


const follow = {
  namespaced: true,


  state: {
     followees: [],
     following: false,


  },

  mutations: {
    FOLLLOW(state,data){
      state.following = data
    },
    LOAD_FOLLOWEES(state,data){
      state.followees = data
    },
    UNFOLLOW(state,data) {
      let id = data
      var foundValue = state.followees.find(obj => obj.id === id);
      let i = state.followees.indexOf(foundValue)
      state.followees.splice(i, 1);

    }
  },

  getters:{
    followees(state){
      return state.followees;
    },
    following(state){
      return state.following;
    },
  },

  actions: {
    async loadFollowees({commit}) {
      let response = await Api().get(`/api/v1/library/following`);
      commit('LOAD_FOLLOWEES', response.data)
    },


    async addFollow({commit}, payload) {

      Rails.ajax({
        url: `/users/${payload}/follow`,
        type: 'post',
        success: (result) => { commit('FOLLOW', payload);
             }
       })
    },
    async unFollow({commit}, payload) {

      Rails.ajax({
        url: `/users/${payload}/follow`,
        type: 'post',
        success: (result) => { commit('UNFOLLOW', payload);
             }
       })


    }

  }

}


export default follow