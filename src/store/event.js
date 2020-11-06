import EventService from '@/EventService';

/*
export const namespaced = true;  not working for some reason
*/

export default {
  state: {
    events: [],
    totalEvents: 0,
    event: {},
    perPage: 3,
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_TOTAL(state, total) {
      state.totalEvents = total;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event);
          const notification = {
            type: 'success',
            message: 'Your event has been created!',
          };
          dispatch('addNotification', notification, { root: true });
        }).catch((error) => {
          const notification = {
            type: 'error',
            message: `There was a problem creating your event: ${error.message}`,
          };
          dispatch('addNotification', notification, { root: true });
          throw error;
        });
    },
    fetchEvents({ commit, dispatch, state }, { page }) {
      return EventService.getEvents(state.perPage, page)
        .then((response) => {
          commit('SET_TOTAL', response.headers['x-total-count']);
          commit('SET_EVENTS', response.data);
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message: `There was a problem fetching events: ${error.message}`,
          };
          dispatch('addNotification', notification, { root: true });
        });
    },
    // eslint-disable-next-line consistent-return
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id);

      if (event) {
        commit('SET_EVENT', event);
        return event;
      }
      return EventService.getEvent(id)
        .then((response) => {
          commit('SET_EVENT', response.data);
          return response.data;
        });
    },
  },
  getters: {
    getEventById: (state) => (id) => state.events.find((event) => event.id === id),
  },
};
