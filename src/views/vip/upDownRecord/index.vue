<template>
  <div class="">
    <BMenu :name-list="nameList" :keepalive="false"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BMenu from '@/components/b-menu/index.vue';
import Record from './record/index.vue'
import List from './list/index.vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'signActivity',
  components: {
    BMenu,
    Record,
    List
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const route = useRoute();
    const nameList = [
    {
        name: 'upDownList',
        text: t('routes.operation_manage_page.review_list'),
        components: List,
        nocatch: true
      },
      {
        name: 'upDownRecord',
        text: t('routes.operation_manage_page.bonus_history'),
        components: Record
      }
    ];
    return {
      nameList,
      t
    };
  }
});
</script>
<style lang="scss" scoped></style>
