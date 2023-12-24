<template>
  <div>
    <BMenu :name-list="nameList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BMenu from '@/components/b-menu/index.vue';
import rep_deposit from '../rep_deposit/index.vue';

export default defineComponent({
  name: 'TripartiteDeposit',
  components: {
    BMenu,
    rep_deposit,
  },
  setup() {
    const localpre = 'routes.finance_manage_page.';
    const nameList = [
      {
        name: 'repDeposit',
        text: `${localpre}repDeposit`,
        components: rep_deposit
      },
    ];
    return {
      nameList
    };
  }
});
</script>
<style lang="scss"></style>
