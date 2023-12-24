<template>
  <div>
    <BMenu :name-list="nameList" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import BMenu from '@/components/b-menu/index.vue';
// import AppSplash from '@/views/operation/advertising/components/app/AppSplash.vue';
import CarouselAd from '@/views/operation/advertising/components/carousel/CarouselAd.vue';
// import WebSports from '@/views/operation/advertising/components/web/WebSports.vue';
// import SiteAd from './components/site/CarouselAd.vue';
// import HomePop from './components/homePop/index.vue';
// import LogInPop from './components/logInPop/index.vue';
// import RegisterPop from './components/registerPop/index.vue';
// import DowAppPop from './components/dowAppPop/index.vue';
// import PopularEvents from './components/PopularEvents/index.vue';
// import Service from './components/service/index.vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'operation-advertising',
  components: {
    BMenu,
    CarouselAd,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const nameList = [
      {
        name: 'CarouselAd',
        text: t('routes.tips.causor_title'),
        components: CarouselAd
      },
    ];
    return {
      nameList,
      t
    };
  }
});
</script>
<style lang="scss" scoped></style>
