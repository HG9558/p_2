<template>
  <div>
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BMenu from '@/components/b-menu/index.vue';
import history_record from '../history_record/index.vue';

export default defineComponent({
  name: 'DepHistory',
  components: {
    BMenu,
    history_record
  },
  setup() {
    const localpre = 'routes.finance_manage_page.';
    const nameList = [
      {
        name: 'historyRecord',
        text: `${localpre}historyRecord`,
        components: history_record
      }
    ];
    return {
      nameList
    };
  }
});
</script>
<style lang="scss"></style>
