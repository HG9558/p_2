<template>
  <div class="turnover-container">
    <p class="empty"></p>
    <el-table :data="tableData" style="width: 500px" border>
      <el-table-column prop="id" label="ID" align="center">
      </el-table-column>
      <el-table-column prop="name" :label="t('routes.site_page.set_name')"  align="center" min-width="140">
      </el-table-column>
      <el-table-column prop="en_name" :label="t('routes.site_page.set_en_name')"  align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent,  ref,} from 'vue';
import { getAccountChangeTypes } from '@/http/modules/viplist';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'acctypes',
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const tableData = ref<any>([]);
    // 获取turnover列表
    function getList() {
      getAccountChangeTypes().then(res => {
          if (res.data) {
            tableData.value = res.data
          }
      });
    }
    getList();
    return {
      tableData,
      t,
    };
  }
});
</script>
<style lang="scss" scope>
.turnover-container {
  padding: 1px 20px;
  padding-bottom: 50px;
  background: white;

  .empty {
    height: 20px;
  }

  a {
    text-decoration: none;
  }
}
</style>
