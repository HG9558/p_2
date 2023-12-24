<template>
  <div class="accountChange">
    <div class="accountChange-table">
      <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit" :firstload="false" v-model="modelObjectv" :isCycle="true" />
      <el-table
        :data="tableData"
        align="center"
        border
        :summary-method="getSummaries(['bill_no', 'cash_type', 'operation_no', 'platform_id', 'created_at', 'before_amount', 'after_amount', 'remark'],
        [],
                [{ prop: 'amount', val: allAmount }]
          )"
        show-summary
        :max-height="globalTableHeight"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column align="center" prop="username" :label="t('global.username')" width="160px"> </el-table-column>
        <el-table-column align="center" prop="uid" :label="t('routes.activity.userId')" width="160px"> </el-table-column>
        <el-table-column align="center" prop="bill_no" :label="t('global.order_number')" width="180px"> </el-table-column>
        <el-table-column align="center" prop="cash_type" :label="t('routes.vip_list_page.account_c_type')" width="160px">
          <template v-slot="scope">
            <span :style="{ color: scope.row.amount >= 0 ? '#67C23A' : '#F56C6C' }"> {{ AccountChangeToText(scope.row.cash_type) }} </span>
          </template>
        </el-table-column>
        <el-table-column prop="amount" :label="t('routes.vip_list_page.account_amount') + t('global.units')" align="center" width="160px">
          <template #default="{ row }">
            <span :style="{ color: row.amount >= 0 ? '#67C23A' : '#F56C6C' }"> {{ toFixedPro(row.amount,2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="before_amount" :label="t('routes.vip_list_page.change_beforamount') + t('global.units')" align="center" width="320">
          <template #default="{ row }">
            {{ toFixedPro(row.before_amount,2) }}
          </template>
        </el-table-column>
        <el-table-column prop="after_amount" :label="t('routes.vip_list_page.change_afteramount') + t('global.units')" align="center" width="320">
          <template #default="{ row }">
            {{ toFixedPro(row.after_amount,2) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" :label="t('routes.vip_list_page.change_time')" width="180px">
          <template v-slot="scope">
            {{ $filters.format(scope.row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" :label="t('global.remark_txt')" min-width="200px"> </el-table-column>
      </el-table>
      <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" v-model:limit="pageQuery.limit" @pagination="pagination"></Pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, inject, watch,nextTick } from 'vue';
import formSerch from '@/components/serch-form/index.vue';
import useSearchPlaceholder from '../serch';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import Pagination from '@/components/pagination/index.vue';
import usePaginationHanlder from '@/components/pagination/pagination';
import useTableStyle, { getSummaries } from '@/utils/table';
import { APIs } from '@/http';
import { toFixedN } from '@/utils/int';
import { useAccountChangeList } from '@/utils/getJson';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { store } from '@/store';

export default defineComponent({
  name: 'vipAccountChange',
  components: { formSerch, Pagination },
  setup() {
    const route = useRoute();
    const { t } = useI18n({ useScope: 'global' });
    const { FormDataList } = useSearchPlaceholder();
    const { AccountChangeToText } = useAccountChangeList(true);
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const listQuery = ref<RefObjectKeyRulesType>({});
    const allAmount = ref();
    const ifTure = ref(true); // 是否进入页面就查询
    // 分页功能
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });
    const modelObjectv = ref<any>({});
    // 表格高度兼容
    if (window.screen.width * window.devicePixelRatio === 2560 || window.screen.height * window.devicePixelRatio === 1440) {
      store.state.app.tableHeight = 1050;
    } else {
      store.state.app.tableHeight = 600;
    }
    watch(
      () => modelObjectv.value.types,
      (n, o) => {
        // key 最后一个是最新点击的
        const key = Object.values(n);
        if (!o) return;
        let oKey = Object.values(o);
        if (!key.length) return;
        if (key.length === oKey.length) return;
        const all = key.find(it => it === '');
        if (key[key.length - 1] === '') {
          modelObjectv.value.types = [''];
        } else {
          modelObjectv.value.types = key.filter(it => it);
        }
      }
    );
    useTableStyle();
    const tableData = ref<any[]>([]);
    function getList() {
      APIs.viplist
        .getRecordTransaction({
          ...unref(pageQuery.value),
          ...unref(listQuery.value),
        })
        .then(res => {
          tableData.value = [];
          if (res.status) {
            if (pageQuery.value.page.toString() === '1') {
              total.value = res.data.t;
            }
            if (res.data.agg) {
              allAmount.value = res.data.agg;
            }
            if (res.data.d) {
              tableData.value = res.data.d.map((it: any) => {
                if (it.cash_type != 160) {
                  if (it.before_amount - it.after_amount > 0) {
                    it.amount = -Math.abs(it.amount);
                  }
                }
                return {
                  ...it,
                  amount: +it.amount,
                  before_amount: +it.before_amount,
                  after_amount: +it.after_amount
                };
              });
            }
          }
        });
    }

    const onSubmit = (data: any) => {
      if (!data.start_time && !data.end_time && !data.bill_no && !data.username && !data.types && !data.operation_no && !data.platform_id) {
        ElMessage.error({
          message: t('global.plese_search_tips'),
          type: 'error'
        });
      } else {
        pageQuery.value.page = 1;
        listQuery.value = data;
        getList();
      }
    };

    watch(
      () => modelObjectv.value.platform_id,
      (n, o) => {
        // key 最后一个是最新点击的
        const key = Object.values(n);
        if (!o) return;
        let oKey = Object.values(o);
        if (!key.length) return;
        if (key.length === oKey.length) return;
        const all = key.find(it => it === '');
        if (key[key.length - 1] === '') {
          modelObjectv.value.platform_id = [''];
        } else {
          modelObjectv.value.platform_id = key.filter(it => it);
        }
      }
    );

    watch(
      () => route.params.bill_no,
      n => {
        if (n && ifTure.value) {
          ifTure.value = false;
          setTimeout(() => {
            modelObjectv.value.bill_no = n;
            pageQuery.value.page = 1;
            listQuery.value.bill_no = n;
            getList();
          }, 0)
        }
      },
      {
        immediate: true
      }
    );
    return {
      FormDataList,
      pagination,
      onSubmit,
      total,
      pageQuery,
      tableData,
      allAmount,
      getSummaries,
      toFixedN,
      isOutType,
      ifTure,
      modelObjectv,
      t,
      AccountChangeToText
    };
  }
});

// 判断是入账还是出账
// 返回true，为出账，false入账
// 入账1
// 152:场馆转出 153:转入失败补回 155:存款 157:后台上分  159:后台下分回退 160 红利派发,161返水，162财务下分，163出款失败
// 出账
// 151:场馆转入 154:转出失败扣除  156:提现 158:后台下分
// 出账是负数 红
// 入账是正数 绿
function isOutType(row: any) {
  if (!row.cash_type && row.cash_type !== 0) return {};
  const cashout: number[] = [151, 154, 156, 158];
  const cashin: number[] = [152, 153, 155, 157, 159, 160, 161, 162, 163];
  if (cashin.includes(Number(row.cash_type))) {
    return {
      num: row.amount,
      color: '#67C23A'
    };
  } else if (cashout.includes(Number(row.cash_type))) {
    return {
      num: `-${row.amount}`,
      color: '#F56C6C'
    };
  } else {
    return {
      color: ''
    };
  }
}
</script>
<style lang="scss">
.accountChange {
  background: white;

  .accountChange-table {
    padding: 20px;
    background: white;
  }
}
</style>
