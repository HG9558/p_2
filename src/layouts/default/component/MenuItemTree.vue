<template>
  <template v-for="(item, i) in menuList" :key="i">
    <el-submenu
      v-if="item.children && !item?.meta?.noChild"
      :index="resolvePath(item.path)"
    >
      <template #title>
        <i :class="item?.meta?.icon ? item?.meta?.icon : ''"></i>
        <span>{{ t(item?.meta?.name) }}</span>
      </template>
      <menu-item-tree
        :menu-list="item.children"
        :base-path="resolvePath(item.path)"
      ></menu-item-tree>
    </el-submenu>
    <el-menu-item v-else :index="resolvePath(item.path)">
      <i :class="item?.meta?.icon ? item.meta?.icon : ''"></i>
      <template #title>
        <span>{{ t(item?.meta?.name) }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue';
import { ImenuListType } from './types';
import { isExternal } from '@/utils/validate';
import { _resolve } from '@/utils/path';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'MenuItemTree',
  props: {
    menuList: {
      type: Object as PropType<ImenuListType>
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup({ basePath }) {
    const { t } = useI18n();
    const resolvePath = (rotePath: string): string => {
      if (isExternal(rotePath)) {
        return rotePath;
      }
      if (isExternal(basePath)) {
        return basePath;
      }
      return _resolve(basePath, rotePath);
    };
    return {
      resolvePath,
      t
    };
  }
});
</script>

<style lang="scss" scoped></style>
