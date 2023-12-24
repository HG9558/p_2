
<template>
  <div class="">
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts" setup>
import BMenu from '@/components/b-menu/index.vue';
import { useI18n } from 'vue-i18n';
import app from './app/index.vue';
import pc from './pc/index.vue';
import h5 from './h5/index.vue';


const { t } = useI18n({ useScope: 'global' });
const nameList = [
  {name: 'app',text: 'app',components: app},
{name: 'pc',text: 'pc',components: pc},
{name: 'h5',text: 'h5',components: h5},

];
</script>
<style lang="scss" scoped></style>
  