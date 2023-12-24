<template>
  <div>
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BMenu from '@/components/b-menu/index.vue';
import list from './list/index.vue';
import wit_history from './wit_history/index.vue';
export default defineComponent({
  name: 'WithdrawalManagement',
  components: {
    BMenu,
    list,
    wit_history
  },
  setup() {
    const localpre = 'routes.finance_manage_page.';
    const nameList = [
      {
        name: 'WithdrawalList',
        text: `${localpre}list`,
        components: list
      },
      {
        name: 'WithdrawalManagementHistory',
        text: `${localpre}witHistory`,
        components: wit_history
      }
    ];
    return {
      nameList
    };
  }
});
</script>
<style lang="scss"></style>
