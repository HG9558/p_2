<template>
  <!-- <button @click="appKey++">重新加载RouterView</button> -->
  <router-view class="router-view-cls" :lang="lang"></router-view>
</template>

<script>
import { defineComponent } from 'vue';
import i18n from './locales';
export default defineComponent({
  name: 'App',
  setup() {
    /* This is to send a fake notification */
    window.addEventListener('message', function (evt) { });
    // document.title = getPlatformName() + '后台管理系统';


    return { lang: i18n.global.locale };
  }
});
</script>
<style lang="scss">
//@import url("//unpkg.com/element-ui@2.15.6/lib/theme-chalk/index.css");
@import '@/scss/reset.scss';
@import '@/scss/global.scss';

#clipboard-ym {
  position: fixed;
  left: -1000px;
  top: -1000px;
}
</style>
