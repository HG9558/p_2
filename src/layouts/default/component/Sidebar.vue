<template>
  <div class="sidebar">
    <el-menu class="el-menu-vertical-demo" mode="vertical" :collapse="isCollapse" router background-color="#001529" text-color="#ffffffb3" :default-active="activeMenu" :collapse-transition="false" :unique-opened="true">
      <MenuItemTree :menu-list="menuList" />
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onMounted } from 'vue';
import { RouteRecordRaw, useRoute } from 'vue-router';
import MenuItemTree from './MenuItemTree.vue';
import { ImenuListType } from './types';
import { getPermissionsLoggedRoutes } from '@/utils/route';
import { useStore } from '@/store/index';

export default defineComponent({
  name: 'Sidebar',
  components: { MenuItemTree },
  setup() {
    const menuList = reactive<RouteRecordRaw[]>(getPermissionsLoggedRoutes());
    const { state } = useStore();
    const store = useStore();
    const route = useRoute();
    const activeMenu = computed(() => {
      const { path, matched } = useRoute();
      if (Array.isArray(matched) && matched.length >= 2) {
        /* tslint:disable:no-string-literal */
        if (matched[0]['meta']['noChild']) {
          return matched[0]['path'];
        }
        /* tslint:enable:no-string-literal */
      }
      return path;
    });
    return {
      menuList,
      isCollapse: computed(() => state.app.leftFoldStatus),
      activeMenu
    };
  }
});
</script>

<style lang="scss" scoped>
.sidebar {
  .el-menu-vertical-demo {
    border-right: solid 0px #e6e6e6;
  }
  ::v-deep(.el-submenu__title) {
    padding-left: 10px;
  }
}
.sidebar {
  ::v-deep(.el-menu-item) {
    padding-right: 5px;
    line-height: 50px;
    > span {
      word-break: break-all;
      white-space: break-spaces;
      display: inline-block;
      line-height: 20px;
      flex: 1;
    }
  }
}
</style>
