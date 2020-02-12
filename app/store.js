import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
	  	user: null,
      token: null
	},

  	mutations: {
  		updateUser(state, payload){
  			state.user = payload
  		},

      	updateToken(state, payload){
        	state.token = payload
      	}
	},

  	actions: {

  	}
});
