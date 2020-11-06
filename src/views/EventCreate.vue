<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        :class="{error: this.$v.event.category.$error}"
        @blur="this.$v.event.category.$touch()"/>
      <template v-if="this.$v.event.category.$error">
        <p v-if="!this.$v.event.category.required" class="errorMessage">Category is required.</p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"/>
      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Description"
        class="field"/>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Location"
        class="field"/>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date"/>
      </div>
      <BaseSelect
        label="Select a Time"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{error: this.$v.event.time.$error}"
        @blur="this.$v.event.time.$touch()"/>
      <template v-if="this.$v.event.time.$error">
        <p v-if="!this.$v.event.time.required" class="errorMessage">Time is required.</p>
      </template>

      <BaseButton type="submit" buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import NProgress from 'nprogress';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseButton from '@/components/BaseButton.vue';
import { required } from 'vuelidate/lib/validators';

export default {
  components: {
    BaseSelect,
    BaseInput,
    BaseButton,
    Datepicker,
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i += 1) {
      times.push(`${i}:00`);
    }
    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject(),
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  methods: {
    createEvent() {
      NProgress.start();
      this.$store.dispatch('createEvent', this.event).then(() => {
        this.$router.push({ name: 'event-show', params: { id: this.event.id } });
        this.event = this.createFreshEventObject();
      }).catch(() => {
        NProgress.done();
      });
    },
    createFreshEventObject() {
      const { user } = this.$store.state.user;
      const id = Math.floor(Math.random() * 10000000);
      return {
        id,
        category: '',
        organizer: user.name,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      };
    },
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
