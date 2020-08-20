let nextID = 1;

export default {
  state: {
    notifications: [],
  },
  mutations: {
    PUSH(state, notification) {
      state.notifications.push({ ...notification, id: nextID += 1 });
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== notificationToRemove.id,
      );
    },
  },
  actions: {
    addNotification({ commit }, notification) {
      console.log('Notification to add is =', notification);
      commit('PUSH', notification);
    },
    removeNotification({ commit }, notificationToRemove) {
      commit('DELETE', notificationToRemove);
    },
  },
};
