<template>
  <div class="manual-container">
    <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit"></formSerch>
    <p class="empty"></p>
    <el-table :data="tableData" border style="width: 100%" :max-height="globalTableHeight">
      <el-table-column prop="username" :label="t('global.username')" align="center"></el-table-column>
      <el-table-column prop="level" :label="t('routes.finance_manage_page.vip_level')" align="center">
        <template #default="{ row }">
          {{ toVipText(row.level) }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="center_money" label="中心钱包余额（元 ）" align="center"></el-table-column> -->
      <!-- <el-table-column prop="center_money" label="调整前总金额（元）" align="center"></el-table-column> -->
      <el-table-column prop="amount" :label="t('routes.finance_manage_page.tz_money') + t('global.units')" align="center">
        <template #default="{ row }">
          <span>{{ toFixedPro(row.amount) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="" label="调整后总金额（元）" align="center">
        <template #default="{row}">
          <span>{{toFixedN(row.center_money-row.amount)}}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="review_remark" :label="t('routes.finance_manage_page.remark')" align="center">
        <template #default="{ row }">
          <span>{{ decodeURI(row.review_remark) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" :label="t('global.select_tip')" align="center">
        <template #default="{ row }">
          <span class="green" v-if="row.state == '362'">{{ t('global.review_pass') }}</span>
          <span class="red" v-if="row.state == '363'">{{ t('global.review_resolve') }}</span>
          <span class="red" v-if="row.state == '361'">{{ t('global.dcl') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" :label="t('global.creat_time')" align="center">
        <template #default="{ row }">
          <span>{{ $filters.format(row.created_at, false) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" :label="t('global.operating')" align="center" width="180">
        <template #default="{ row, $index }">
          <div v-if="row.state == '361'">
            <button class="btn-review" :key="$index" @click="reviewList(row)">{{ t('global.review') }}</button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <p class="empty"></p>
    <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination" v-model:limit="pageQuery.page_size" />
    <review v-model="manualDialog" ref="manualDialogRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, provide } from 'vue';
import formSerch from '@/components/serch-form/index.vue';
import Pagination from '@/components/pagination/index.vue';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import usePaginationHanlder from '@/components/pagination/pagination';
import useSearchPlaceholder from './search';
import review from './components/review.vue';
import { APIs } from '@/http';
import { useVipLevel } from '@/utils/getJson';
import { toFixedN } from '@/utils/int';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'review_list',
  components: {
    formSerch,
    Pagination,
    review
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const listQuery = ref<RefObjectKeyRulesType>({});
    const manualDialogRef = ref<any>(null);
    const manualDialog = ref<boolean>(false);
    provide('reviewGetList', getList);
    const { toVipText } = useVipLevel();
    const tableData = ref([]);
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });
    const { FormDataList } = useSearchPlaceholder();
    const onSubmit = (data: any) => {
      pageQuery.value.page = 1;
      listQuery.value = data;
      getList();
    };
    function getList() {
      APIs.fin
        .getDepositList({
          flag: '1',
          state: '361',
          ...unref(pageQuery.value),
          ...unref(listQuery.value)
        })
        .then(res => {
          tableData.value = [];
          if (res.status) {
            if (pageQuery.value.page.toString() === '1') {
              total.value = res.data.t;
            }
            if (res.data.d) {
              tableData.value = res.data.d;
              // tableData.value.forEach((item: any) => {
              //   APIs.viplist
              //     .getMemberBalance({
              //       username: item.username
              //     })
              //     .then((ab: any) => {
              //       if (ab.status) {
              //         item.center_money = ab?.data?.balance;
              //       }
              //     });
              // });
            }
          }
        });
    }
    // 审核
    const reviewList = (row: any) => {
      manualDialog.value = true;
      manualDialogRef.value.showForm(Object.assign({}, row));
    };
    return {
      tableData,
      onSubmit,
      FormDataList,
      listQuery,
      total,
      reviewList,
      pagination,
      toVipText,
      manualDialogRef,
      manualDialog,
      toFixedN,
      t,
      pageQuery
    };
  }
});
</script>
<style lang="scss" scoped>
.manual-container {
  padding: 0 20px;
  .cont {
    line-height: 1;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: bold;
    color: black;
  }
  .empty {
    height: 20px;
  }
  .red {
    color: #F56C6C;
  }
  .green {
    color: #67C23A;
  }
  .btn-review {
    display: inline-block;
    line-height: 1;
    min-height: 40px;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    color: #606266;
    -webkit-appearance: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    min-height: 32px;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
}
</style>
