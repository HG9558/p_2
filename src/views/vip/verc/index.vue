<template>
  <div>
    <BMenu :name-list="nameList" :keepalive="false"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BMenu from '@/components/b-menu/index.vue';
import { useI18n } from 'vue-i18n';
import EmailQuery from '@/views/vip/verc/components/EmailQuery.vue'
import CodeQuery from '@/views/vip/verc/components/CodeQuery.vue';
export default defineComponent({
  name: 'vipCodeQuerys',
  components: {
    BMenu,
    CodeQuery,
    EmailQuery
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const nameList = [
      {
        name: 'CodeQuery',
        text: t('routes.vip_list_page.phone_code'),
        components: CodeQuery
      },
      {
        name: 'EmailQuery',
        text: t('routes.tips.yx_yzm'),
        components: EmailQuery
      }
    ];
    return {nameList,
      t};
  }
});
</script>
<style lang="scss"></style>
