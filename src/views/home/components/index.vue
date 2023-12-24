<template>
  <div>
    <Announcement />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Announcement from './Announcement.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Announcement
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped></style>
