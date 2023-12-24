<template>
  <div class="top-management-page">
    <!-- <router-view /> -->
    <router-view v-slot:default="{ Component, route }">
      <keep-alive include="DepHistory,TripartiteDeposit,OfflineDeposit,DepUsdt">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
// import { useStore } from '@/store';
// import BMenu from '@/components/b-menu/index.vue';

export default defineComponent({
  name: 'DepositManagement',
  // components: {
  //   BMenu
  // },
  setup() {
    // const { state } = useStore();
    return {
      // isCollapseClass: computed(() => state.app.leftFoldStatus),
      // cachedViews: computed(() => state.app.cacheView)
    };
  }
});
</script>

<style lang="scss"></style>
