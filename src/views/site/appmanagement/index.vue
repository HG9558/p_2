<template>
  <div class="">
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BMenu from '@/components/b-menu/index.vue';
import ios from './components/ios.vue';
import android from './components/android.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'appmanagement',
  components: {
    BMenu,
    ios,
    android
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const nameList = [
      {
        name: 'ios',
        text: t('routes.site_page.ios_all'),
        component: ios
      },
      {
        name: 'android',
        text: t('routes.site_page.android_all'),
        component: android
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
