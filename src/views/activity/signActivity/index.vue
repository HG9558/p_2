<template>
  <div class="">
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BMenu from '@/components/b-menu/index.vue';
import Record from './record/index.vue'
import List from './list/index.vue';
import Reward from './record-reward/index.vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'treasure',
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
        name: 'signActivity',
        text: t('routes.activity.tab1'),
        components: List,
        nocatch: true
      },
      {
        name: 'signActivityRecord',
        text: t('routes.activity.tab2'),
        components: Record
      },
      {
        name: 'signRewardRecord',
        text: t('routes.activity.tab3'),
        components: Reward
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
