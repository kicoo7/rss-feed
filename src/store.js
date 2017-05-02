/**
 * Created by krsterajchevski on 5/2/17.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    feed: [],
  },
  getters,
  actions,
  mutations,
});

export default store;
