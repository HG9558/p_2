<template>
  <div>
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import List from './components/list.vue';
import Types from './components/types.vue';
import BMenu from '@/components/b-menu/index.vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'VipConfigTables',
  components: {
    BMenu,
    List,
    Types
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const nameList = [
      {
        name: 'List',
        text: t('routes.vip_list_page.account_record'),
        components: List
      },
      {
        name: 'Types',
        text: t('routes.vip_list_page.account_c_type'),
        components: Types
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
