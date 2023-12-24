<template>
  <div class="manual-container">
    <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit">
      <!-- <template #csv>
        <el-button type="primary" @click="exportData" :disabled="tableData.length <= 0">{{ t('global.export') }}</el-button>
      </template> -->
    </formSerch>
    <vxe-table
      border
      resizable
      :show-footer="tableData.length ? true : false"
      :footer-method="footerMethod"
      highlight-hover-row
      :sort-config="{ trigger: 'cell' }"
      :data="tableData"
      :scroll-y="{ enabled: false }"
      highlight-current-row
      :max-height="globalTableHeight"
      @sort-change="tableSortChange"
    >
      <vxe-table-column field="id" :title="t('global.order_number')" align="center" width="200"></vxe-table-column>
      <vxe-table-column field="uid" :title="t('routes.activity.userId')" align="center" width="100"></vxe-table-column>
      <vxe-table-column field="username" :title="t('global.username')" align="center" width="120"></vxe-table-column>
      <vxe-table-column field="level" :title="t('routes.finance_manage_page.vip_level')" align="center" width="120">
        <template #default="{ row }">
          {{ toVipText(row.level) }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="parent_name" :title="t('routes.agent.agent_name')" align="center" min-width="120">
        <template #default="{ row }">
          <span :class="{ bg_color: row.is_risk == '1' }">{{ row.parent_name }}</span>
        </template>
      </vxe-table-column>
     
      <vxe-table-column field="oid" :title="t('routes.finance_manage_page.channel_number')" align="center" width="200"></vxe-table-column>
      <vxe-table-column field="fname" :title="t('routes.finance_manage_page.tname')" align="center" width="200"></vxe-table-column>
      <!-- <vxe-table-column field="channel_id" :title="t('routes.finance_manage_page.tname')" align="center" width="120">
        <template #default="{ row }">
          <span :style="{ color: row.channel_id == '0' ? '#409EFF' : '' }">
            {{ row.channel_id == '0' ? 'manual' : ChannelToText(row.channel_id) }}
          </span>
        </template>
      </vxe-table-column> -->
      <vxe-table-column field="amount" :title="appendBRL(t('routes.finance_manage_page.recharge_amount'))" align="center" min-width="140" sortable>
        <template #default="{ row }">
          <span>{{ toFixedPro(row.amount) }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="lsSort" :title="appendBRL(t('routes.finance_manage_page.amount_account'))" align="center" min-width="120">
        <template #default="{ row }">{{ toFixedPro(row.lsSort) }}</template>
      </vxe-table-column>
      <vxe-table-column field="discount" :title="appendBRL(t('routes.finance_manage_page.discount'))" align="center" width="180" sortable></vxe-table-column>
      <!-- <vxe-table-column field="review_remark" :title="t('global.remark_txt')" align="center" width="120">
        <template #default="{ row }">
          {{ row.review_remark }}
        </template>
      </vxe-table-column> -->
      <vxe-table-column field="usdt_rate" :title="t('routes.finance_manage_page.usdt_rate_text')" align="center" width="100"></vxe-table-column>
      <vxe-table-column field="usdt_count" :title="t('routes.finance_manage_page.usdt_num')" align="center" width="100"></vxe-table-column>
      <vxe-table-column field="created_at" :title="t('routes.finance_manage_page.order_time')" align="center" width="180">
        <template #default="scope">
          {{ $filters.format(scope.row.created_at, false) }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="state" :title="t('routes.finance_manage_page.order_status')" align="center" width="120">
        <template #default="{ row }">
          <!-- 362 成功  363 失败 -->
          <span class="green" v-if="row.state == 362">{{ t('routes.finance_manage_page.desipot_suc') }}</span>
          <span class="red" v-if="row.state == 363">{{ t('routes.finance_manage_page.desipot_error') }}</span>
          <span class="red" v-if="row.state == 361">{{ t('routes.finance_manage_page.desipot_ing') }}</span>
        </template>
      </vxe-table-column>
      <!-- <vxe-table-column field="flag" :title="t('routes.finance_manage_page.deposit_type')" align="center" width="120">
        <template #default="{ row }">
          <span v-if="row.flag == '1'">{{ t('routes.finance_manage_page.third_desipot') }}</span>
          <span v-if="row.flag == '3'">{{ t('routes.finance_manage_page.offline.tips4') }}</span>
          <span v-if="row.flag == '4'">{{ t('routes.finance_manage_page.usdt_manage') }}</span>
        </template>
      </vxe-table-column> -->
      <vxe-table-column field="confirm_at" :title="t('routes.finance_manage_page.over_time')" align="center" width="180">
        <template #default="scope">
          {{ $filters.format(scope.row.confirm_at, false) }}
        </template>
      </vxe-table-column>
      <!-- <vxe-table-column field="col8" :title="t('global.detail')" align="center" width="280">
        <template #default="{ row }">
          1三方存款，2三方usdt,3是线下转卡，4线下usdt，
          <div style="text-align: left" v-if="row.flag == '2' || row.flag == '4'">
            <p>{{ t('routes.finance_manage_page.in_addr') }}：{{ row.address }}</p>
            <p>
              {{ t('routes.finance_manage_page.block_id') }}：<el-link
                :href="'https://tronscan.io/#/transaction/' + row.hash_id"
                target="_blank"
                type="primary"
                >{{ row.hash_id }}</el-link
              >
            </p>
            <p>{{ t('routes.finance_manage_page.recharge_amount') + '(USDT)' }}:{{ row.usdt_final_amount }}</p>
            <p>{{ t('routes.finance_manage_page.rate') }}：{{ row.rate }}</p>
            <p>{{ t('routes.finance_manage_page.recharge_agreement') }}：{{ row.protocol_type }}</p>
          </div>
          <div style="text-align: left" v-if="row.flag == '3' && row.manual_remark">
            <p>{{ t('routes.finance_manage_page.bankInfo.tip8') }}：{{ JSON.parse(row.manual_remark).name || '' }}</p>
            <p>{{ t('routes.finance_manage_page.bank_num') }}：{{ row.bank_no }}</p>
            <p>{{ t('routes.agent.actual_name') }}：{{ JSON.parse(row.manual_remark).real_name || '' }}</p>
            <p>{{ t('routes.finance_manage_page.offline.tips2') }}：{{ JSON.parse(row.manual_remark).manual_remark || '' }}</p>
          </div>
          <div v-else></div>
        </template>
      </vxe-table-column> -->
    </vxe-table>
    <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination" v-model:limit="pageQuery.page_size" />
    <list v-model="manualDialog" ref="manualDialogRef" :key="numBer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import formSerch from '@/components/serch-form/index.vue';
import Pagination from '@/components/pagination/index.vue';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import usePaginationHanlder from '@/components/pagination/pagination';
import useSearchPlaceholder from './search';
import list from '@/views/fin/ManualUpAndDown/history_list/components/list.vue';
import { useCate, useChannel, } from '@/views/fin/ChannelManagement/ts/cateAndChannel';
import { replayTypeTotext } from '@/utils/selectOptions';
import { APIs } from '@/http';
import useTableStyle, { getSummaries } from '@/utils/table';
import { useVipLevel} from '@/utils/getJson';
import { appendBRL, toFixedN, toFixedNReport } from '@/utils/int';
import { format } from '@/filter/format';
import { range } from '../ts/vaild';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { export_csvfn } from '@/utils/file';
import { store } from '@/store';

export default defineComponent({
  name: 'historyRecord',
  components: {
    formSerch,
    Pagination,
    list
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const listQuery = ref<RefObjectKeyRulesType>({});
    const manualDialogRef = ref<any>(null);
    const manualDialog = ref<boolean>(false);
    const { toVipText } = useVipLevel();
    const { ChannelToText } = useChannel();
    const { CateToText } = useCate();
    const amountAll = ref();
    const numBer = ref<number>();
    useTableStyle();
    const tableData = ref([]);
    // 表格高度兼容
    if (window.screen.width * window.devicePixelRatio === 2560 || window.screen.height * window.devicePixelRatio === 1440) {
      store.state.app.tableHeight = 850;
    } else {
      store.state.app.tableHeight = 500;
    }
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });
    const { FormDataList } = useSearchPlaceholder();
    const onSubmit = (data: any) => {
      if (!range(data.min_amount, data.max_amount)) {
        ElMessage.error(t('routes.tips.order_amount_tips'));
        return;
      }
      pageQuery.value.page = 1;
      listQuery.value = data;
      getList();
    };
    function getList() {
      APIs.fin
        .depositHistory({
          flag: 1,
          ...unref(pageQuery.value),
          ...unref(listQuery.value),
        })
        .then(res => {
          tableData.value = [];
          if (res.status) {
            if (pageQuery.value.page.toString() === '1') {
              total.value = res.data.t;
            }
            if (res.data.d) {
              tableData.value = res.data.d.map((p: any) => {
                const obj: any = {};
                if (res.data.agg) {
                  obj['agg_amount'] = toFixedNReport(res.data.agg.amount);
                }
                const newObj = {
                  ...p,
                  ...obj
                };
                let lsSort = p.state === 362 ? p.amount : '0.0'
                return Object.assign(newObj, { lsSort: lsSort });
              });
            }
            if (res.data.agg) {
              amountAll.value = res.data.agg.amount;
            }
          }
        });
    }

    const sumNum = (list: any[], field: string) => {
      let count = 0;
      list.forEach(item => {
        count += Number(item[field]);
      });
      return count;
    };

    const tableSortChange = (column: any) => {
      console.log(column);
      listQuery.value.sort_field = column.property;
      listQuery.value.is_asc = column.order === 'desc' ? 0 : 1;
      pageQuery.value.page = 1;
      getList();
    };

    const footerMethod = ({ columns, data }: any) => {
      const means: any[] = [];
      const sums: any[] = [];
      columns.forEach((column: any, columnIndex: any) => {
        if (columnIndex === 0) {
          means.push(t('global.total'));
          sums.push(t('global.count'));
        } else {
          let meanCell = null;
          let sumCell = null;

          switch (column.property) {
            case 'amount':
              meanCell = toFixedNReport(amountAll.value);
              sumCell = toFixedNReport(sumNum(data, column.property));
              break;
            case 'sex':
              break;
          }
          means.push(meanCell);
          sums.push(sumCell);
        }
      });
      // 返回一个二维数组的表尾合计
      return [sums, means];
    };
    // 查看日志
    const queryLog = (row: any) => {
      numBer.value = Math.random();
      row.queryType = t('routes.finance_manage_page.historyRecord');
      manualDialog.value = true;
      manualDialogRef.value.showForm(Object.assign({}, row));
    };

    // 导出
    const exportData = () => {
      const PromiseList: any[] = [];
      const total_page = Math.ceil(total.value / 100);
      for (let page = 1; page <= total_page; page++) {
        PromiseList.push(getListItem(page));
      }
      // 并发请求
      Promise.all(PromiseList).then(res => {
        const result: any = [].concat.apply([], res).sort();
        const data = result.map((item: any) => {
          return {
            id: '\t' + item.id,
            username: item.username,
            level: item.level,
            parent_name: item.parent_name,
            bank_code: item.bank_code,
            oid: '\t' + item.oid,
            channel_id: item.channel_id === '0' ? 'manual' : ChannelToText(item.channel_id),
            amount: toFixedNReport(item.amount),
            real_amount: item.state === 362 ? toFixedNReport(item.amount) : '0.0',
            discount: item.discount,
            review_remark: item.review_remark,
            created_at: '\t' + format(item.created_at, false),
            state: t(`routes.finance_manage_page.desipot${item.state}`),
            flag: t(`routes.finance_manage_page.flag${item.flag}`),
            confirm_at: '\t' + format(item.confirm_at, false),
            name: item.manual_remark ? JSON.parse(item.manual_remark).name : '',
            bank_no: '\t' + item.bank_no,
            bank_addr: item.manual_remark ? JSON.parse(item.manual_remark).bank_addr : '',
            real_name: item.manual_remark ? JSON.parse(item.manual_remark).real_name: '',
            manual_remark: item.manual_remark ? JSON.parse(item.manual_remark).manual_remark: ''
          };
        });
        const fields: any = [
          { label: t('global.order_number'), value: 'id' },
          { label: t('global.username'), value: 'username' },
          { label: t('routes.finance_manage_page.vip_level'), value: 'level' },
          { label: t('routes.agent.agent_name'), value: 'parent_name' },
          { label: t('routes.finance_manage_page.tname'), value: 'cid' },
          { label: t('routes.finance_manage_page.ckyh'), value: 'bank_code' },
          { label: t('routes.finance_manage_page.channel_number'), value: 'oid' },
          { label: t('routes.finance_manage_page.tname'), value: 'channel_id' },
          { label: appendBRL(t('routes.finance_manage_page.recharge_amount')), value: 'amount' },
          { label: appendBRL(t('routes.finance_manage_page.amount_account')), value: 'real_amount' },
          { label: appendBRL(t('routes.finance_manage_page.discount')), value: 'discount' },
          { label: t('global.remark_txt'), value: 'review_remark' },
          { label: t('routes.finance_manage_page.order_time'), value: 'created_at' },
          { label: t('routes.finance_manage_page.order_status'), value: 'state' },
          { label: t('routes.finance_manage_page.deposit_type'), value: 'flag' },
          { label: t('routes.finance_manage_page.over_time'), value: 'confirm_at' },
          { label: t('routes.finance_manage_page.bankInfo.tip8'), value: 'name' },
          { label: t('routes.finance_manage_page.bank_num'), value: 'bank_no' },
          { label: t('routes.agent.open_name'), value: 'bank_addr' },
          { label: t('routes.agent.actual_name'), value: 'real_name' },
          { label: t('routes.finance_manage_page.offline.tips2'), value: 'manual_remark' },
        ];
        export_csvfn({ data, fields, name: `${t('routes.vip_list_page.all_withd')}${listQuery.value.start_time}-${listQuery.value.end_time}` });
      });
    };
    // 查询
    const getListItem = (page: number) => {
      return new Promise((resolve, reject) => {
        APIs.fin.depositHistory({ flag: '2', ...unref(listQuery.value), page, page_size: 100 }).then((res: any) => {
          if (res.status) {
            resolve(res.data.d ?? []);
          } else {
            resolve([]);
          }
        });
      });
    };

    const formatDetail = (row: any) => {
      if (row.flag === '3') {
        return `
        ${t('routes.finance_manage_page.bankInfo.tip8')}:${JSON.parse(row.manual_remark).name || ''},
        ${t('routes.finance_manage_page.bank_num')}:${row.bank_no},
        ${t('routes.agent.open_name')}:${JSON.parse(row.manual_remark).bank_addr || ''},
        ${t('routes.agent.actual_name')}:${JSON.parse(row.manual_remark).real_name || ''},
        ${t('routes.finance_manage_page.offline.tips2')}:${JSON.parse(row.manual_remark).manual_remark || ''},
        `;
      }
      return '';
    };
    return {
      tableData,
      onSubmit,
      FormDataList,
      listQuery,
      numBer,
      total,
      queryLog,
      amountAll,
      pagination,
      manualDialogRef,
      manualDialog,
      toVipText,
      pageQuery,
      toFixedN,
      ChannelToText,
      footerMethod,
      getSummaries,
      replayTypeTotext,
      tableSortChange,
      CateToText,
      t,
      exportData
    };
  }
});
</script>
<style lang="scss" scoped>
.manual-container {
  padding: 20px;
  .empty {
    height: 20px;
  }
  .red {
    color: #F56C6C;
  }
  .green {
    color: #67C23A;
  }
}
</style>
