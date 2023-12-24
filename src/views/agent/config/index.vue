<template>
  <div>
    <BMenu :name-list="nameList" :keepalive="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import invitations from './components/invitations.vue';
import BMenu from '@/components/b-menu/index.vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'VipConfigTables',
  components: {
    BMenu,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const nameList = [
      {
        name: 'nationalagent',
        text: t('routes.agent.nationalAgent'),
        components: invitations
      },
      {
        name: 'channelagent',
        text: t('routes.agent.channelAgent'),
        components: invitations
      },
    ];
    return {
      nameList,
      t
    };
  }
});
</script>
<style lang="scss"></style>
