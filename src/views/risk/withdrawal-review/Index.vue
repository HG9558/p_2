<template>
  <div class="container">
    <BMenu :name-list="nameList" :keepalive="false"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BMenu from '@/components/b-menu/index.vue';
import auditPending from './audit-pending/index.vue';
import pendingReview from './pending-review/index.vue';
import historyRecord from './history-record/index.vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'withdrawal-review',
  components: {
    BMenu,
    auditPending,
    pendingReview,
    historyRecord
  },
  props: {
    modelValue: Boolean,
    title: String
  },
  emits: ['update:modelValue', 'change'],
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const nameList = [
      {
        name: 'auditPending',
        text: t('routes.risk.review_list'),
        components: auditPending
      },
      {
        name: 'pendingReview',
        text: t('routes.risk.review_list_up'),
        components: pendingReview
      },
      {
        name: 'historyRecord',
        text: t('routes.risk.review_list_history'),
        components: historyRecord
      }
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
