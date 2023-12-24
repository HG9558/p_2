<template>
  <div>
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Vip from './components/Vip.vue';
import Turnover from './components/turnover.vue';
import BMenu from '@/components/b-menu/index.vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'VipConfigTables',
  components: {
    BMenu,
    Vip,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const nameList = [
      {
        name: 'vipLevel',
        text: t('routes.vip_list_page.config.tab1'),
        components: Vip
      },
      {
        name: 'Turnover',
        text: t('routes.vip_list_page.config.tab2'),
        components: Turnover
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
