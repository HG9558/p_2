<template>
  <div>
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BMenu from '@/components/b-menu/index.vue';
import history_list from './history_list/index.vue';
import manual_list from './manual_list/index.vue';
import review_list from './review_list/index.vue';

export default defineComponent({
  name: 'ManualUpAndDown',
  components: {
    BMenu,
    history_list,
    manual_list,
    review_list
  },
  setup() {
    const localpre = 'routes.finance_manage_page.';
    const nameList = [
      {
        name: 'manual_list',
        text: `${localpre}manual_list`,
        components: manual_list
      },
      {
        name: 'review_list',
        text: `${localpre}review_list`,
        components: review_list
      },
      {
        name: 'history_list',
        text: `${localpre}history_list`,
        components: history_list
      }
    ];
    return {
      nameList
    };
  }
});
</script>
<style lang="scss"></style>
