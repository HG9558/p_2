<template>
  <div class="container">
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import BMenu from '@/components/b-menu/index.vue';
import backendSystem from './backendSystem/index.vue';
import client from './client/index.vue';

export default defineComponent({
  name: 'risk-blackList',
  components: {
    BMenu,
    backendSystem,
    client,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const nameList = [
      {
        name: 'backendSystem',
        text: t('routes.agent.htxt'),
        components: backendSystem
      },
      // {
      //   name: 'client',
      //   text: '用户端',
      //   components: client
      // }
    ];
    return {
      nameList,
      t
    };
  }
});
</script>
<style lang="scss" scoped>
.container {
}
</style>
