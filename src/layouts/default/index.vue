<template>
  <div class="ym-layout-default">
    <div class="left" :class="{ collapse: isCollapseClass ? true : false }">
      <div class="logo">
        <Logo />
      </div>
      <div class="menu">
        <el-scrollbar>
          <Sidebar />
        </el-scrollbar>
      </div>
    </div>
    <div class="right">
      <div class="contentlayout">
        <div class="multipleheader">
          <MultipleHeader />
        </div>
        <!-- {{cachedViews}} -->
        <div class="router-view">
          <div class="routerscroll">
            <el-scrollbar>
              <div class="pad">
                <div class="centermain">
                     <router-view v-slot:default="{ Component, route }">
                        <transition name="fade">
                          <keep-alive :include="cachedViews">
                            <component :is="Component" :key="route.fullPath" />
                          </keep-alive>
                        </transition>
                      </router-view>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Logo from './component/Logo.vue';
import Sidebar from './component/Sidebar.vue';
import MultipleHeader from './component/contentLayout/MultipleHeader.vue';
import { useStore } from '@/store';

export default defineComponent({
  name: 'YmLayoutDefault',
  components: {
    Logo,
    Sidebar,
    MultipleHeader
  },
  setup() {
    const { state } = useStore();
    return {
      isCollapseClass: computed(() => state.app.leftFoldStatus),
      cachedViews: computed(() => state.app.cacheView),
    };
  }
});
</script>

<style lang="scss" scoped>
$logoHeight: 48px; // logo的高度
$menuWidth: 240px; // Layout左侧Menu的宽度

.ym-layout-default {
  display: flex;
  height: 100%;
  > .left,
  .right {
    height: 100%;
  }
  > .left {
    width: $menuWidth;
    background-color: var(--theme-bg-color);
    transition: all 0.2s;
    &.collapse {
      width: 64px !important;
    }
    > .logo {
      height: $logoHeight;
    }
    > .menu {
      height: calc(100% - #{$logoHeight});
    }
  }
  > .right {
    width: 0;
    flex: 1;
    > .contentlayout {
      display: flex;
      flex-direction: column;
      height: 100%;
      > .multipleheader {
        height: 84px;
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
      }
      > .router-view {
        flex: 1 1 auto;
        height: 0;
        .routerscroll {
          width: 100%;
          height: 100%;
          .pad {
            padding: 10px;
            .centermain {
              background-color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
