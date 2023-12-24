<template>
  <div class="Home">
    <AllAnnoucement />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AllAnnoucement from './components/index.vue';

export default defineComponent({
  name: 'Home',
  components: {
    AllAnnoucement
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped></style>
