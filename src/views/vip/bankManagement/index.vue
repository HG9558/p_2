<template>
  <div>
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import bankType from './components/bankType.vue';
import List from './components/bankList.vue';
import BMenu from '@/components/b-menu/index.vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'VipConfigTables',
  components: {
    BMenu,
    List,
    bankType
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const nameList = [
      {
        name: 'bankList',
        text: t('routes.vip_list_page.bank.list'),
        components: List
      },
      {
        name: 'bankType',
        text: t('routes.vip_list_page.bank.type'),
        components:bankType
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
