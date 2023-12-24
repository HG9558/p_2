<template>
  <figure>
    <img src="" :data-src="src" />
  </figure>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'lazy-img',
  props: {
    src: String,
    class: {
      type: String,
      default: ''
    },
    style: Object as PropType<StyleSheet>
  },
  setup(props) {
    return {};
  }
});
</script>
