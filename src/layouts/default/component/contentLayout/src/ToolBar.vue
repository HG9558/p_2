<template>
  <el-scrollbar class="scrollbar-main-center" :noresize="false" :vertical="false">
    <el-tag
      class="toolItem"
      type="info"
      size="small"
      :disable-transitions="false"
      :closable="getToolData.length > 1"
      effect="plain"
      v-for="(item, index) in getToolData"
      :key="index"
      :class="{ active: $route.path == item.detail }"
      @click="redirect(item)"
      @close="closeToolItem(item)"
    >
      <span class="dot" v-if="$route.path == item.detail"></span>
      {{ t(item.name) }}
    </el-tag>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch, watchEffect, nextTick } from 'vue';
import { useStore } from '@/store/index';
import { createNamespacedHelpers } from 'vuex';
import { ToolData } from '@/store/modules/app/types';
import { useRouter, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { mapGetters } = createNamespacedHelpers('app');
function scrollToView() {
  document.querySelector('.scrollbar-main-center')?.querySelector('.active')?.scrollIntoView({ behavior: 'smooth' });
}

export default defineComponent({
  name: 'ToolBar',
  components: {},
  watch: {
    $route() {
      this.routeWatch();
    }
  },
  setup() {
    const { t } = useI18n();
    const NoTagList = ['/login'];
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const closeToolItem = (data: ToolData) => {
      store.dispatch('app/clearToolBar', data);
      store.dispatch('app/clearCache', data.componentName);
    };
    const redirect = (data: ToolData) => {
      router.push({ path: data.detail });
    };
    const routeWatch = () => {
      /* tslint:disable:no-string-literal */
      const componentName = route.matched[route.matched.length - 1]['components']['default']['name'];
      const detail = route.path;
      const name = route.meta['name'];
      /* tslint:enable:no-string-literal */
      if (!NoTagList.includes(detail)) {
        store.dispatch('app/commitToolBar', { name, detail, componentName });
      }
      nextTick(() => {
        scrollToView();
      });
    };

    onMounted(() => {
      routeWatch();
    });
    const path = computed(() => {
      return route.path;
    });
    return {
      getToolData: computed(() => store.getters['app/getToolData']),
      getCacheView: computed(() => store.getters['app/getCacheView']),
      closeToolItem,
      redirect,
      routeWatch,
      t
    };
  }
});
</script>
<style lang="scss" scope>
.toolItem {
  cursor: pointer;
  margin-right: 3px;
}
.toolItem.active {
  background-color: #0960bd;
  color: #fff;
  border-color: #0960bd;
}
</style>
<style lang="scss">
.toolItem.active .el-tag__close {
  color: #ffffff;
}
.scrollbar-main-center .el-scrollbar__view {
  position: relative;
  top: 3px;
  white-space: nowrap;
}
</style>
