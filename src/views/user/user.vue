<template>
  <p>this is user common page</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserModule from '@/store/modules/user/UserModule';
import { getModule } from 'vuex-module-decorators';

export default defineComponent({
  name: 'App',
  setup() {
    const $user = getModule(UserModule);
  }
});
</script>
