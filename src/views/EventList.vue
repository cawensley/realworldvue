<template>
  <div>
    <h1 v-if="user">Events for {{user.user.name}}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page!=1">
      <router-link :to="{name: 'event-list',query: {page: page-1}}" rel="prev">
        Prev Page
      </router-link>
    </template>
    <template v-if="page!=1 && page<totalEvents/3">&nbsp;|&nbsp;
    </template>
    <template v-if="page < event.totalEvents / 3">
      <router-link :to="{name: 'event-list',query: {page: page+1}}" rel="next">
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';
import store from '@/store/store';

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page, 0) || 1;
  store.dispatch('fetchEvents', {
    page: currentPage,
  }).then(() => {
    // eslint-disable-next-line no-param-reassign
    routeTo.params.page = currentPage;
    next();
  });
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard,
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  computed: {
    ...mapState(['event', 'totalEvents', 'user']),
  },
};
</script>
