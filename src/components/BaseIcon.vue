<template>
  <div>
    <div class="icon icon-wrapper" v-html="svg"></div>
    <slot></slot>
  </div>
</template>

<script>
import feather from 'feather-icons';

export default {
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: 'users',
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
  computed: {
    svg() {
      return feather.icons[this.name].toSvg({
        class: 'icon',
        width: 24,
        height: 24,
      });
    },
  },
};
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 6px;
}
</style>
