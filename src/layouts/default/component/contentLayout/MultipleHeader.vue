<template>
  <div class="muheader">
    <Trigger />
    <Notice />
    <User />
  </div>
  <div class="toolbar">
    <ToolBar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Notice from './src/Notice.vue';
import Trigger from './src/Trigger.vue';
import User from './src/User.vue';
import ToolBar from './src/ToolBar.vue';

export default defineComponent({
  name: 'MultipleHeader',
  components: {
    Notice,
    Trigger,
    User,
    ToolBar
  },
  setup() {
    return {};
  }
});
</script>
<style lang="scss" scope>
.muheader {
  height: 50px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 14%);
  display: flex;
  align-items: center;
  background-color: #fff;
  position: relative;
  z-index: 100;
}
.toolbar {
  height: 34px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: #fff;
}
</style>
