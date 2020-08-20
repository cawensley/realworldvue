import Vue from 'vue';
import Vuex from 'vuex';
import user from './user';
import event from './event';
import notifications from './notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
    notifications,
  },
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
});
