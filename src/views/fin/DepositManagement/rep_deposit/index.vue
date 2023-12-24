<template>
  <div class="manual-container">
    <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit">
     <!-- <template #csv>
       <el-button type="primary" @click="exportHanlder">{{ t('global.export') }}</el-button>
     </template> -->
    </formSerch>
    <vxe-table
      class="template_table_load"
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
    >
      <vxe-table-column field="id" :title="t('global.order_number')" align="center" width="100">
        <template #default="{ row }">
          <span v-if="!changeTable">`</span>
          {{ row.id }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="uid" :title="t('routes.activity.userId')" align="center" width="100"></vxe-table-column>
      <vxe-table-column field="username" :title="t('global.username')" align="center" width="100"></vxe-table-column>
      <vxe-table-column field="level" :title="t('routes.finance_manage_page.vip_level')" align="center" width="60">
        <template #default="{ row }">
          {{ toVipText(row.level) }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="fname" :title="t('routes.finance_manage_page.channel_name')" align="center" width="100"></vxe-table-column>
      <vxe-table-column field="oid" :title="t('routes.finance_manage_page.channel_number')" align="center" width="150">
        <template #default="{ row }">
          <span v-if="!changeTable">`</span>
          {{ row.oid }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="amount" :title="appendBRL(t('routes.finance_manage_page.recharge_amount'))" align="center" min-width="120">
        <template #default="{ row }">
          {{ toFixedPro(row.amount) }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="amount1" :title="appendBRL(t('routes.finance_manage_page.amount_account')) + 999" align="center" min-width="120">
        <template #default="{ row }">
          <span>
            {{ toFixedPro(row.amount1) }}
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="discount" :title="appendBRL(t('routes.finance_manage_page.disposit'))" align="center" min-width="120"></vxe-table-column>
      <vxe-table-column field="usdt_rate" :title="t('routes.finance_manage_page.usdt_rate_text')" align="center" width="100"></vxe-table-column>
      <vxe-table-column field="usdt_count" :title="t('routes.finance_manage_page.usdt_num')" align="center" width="100"></vxe-table-column>
      <vxe-table-column field="created_at" :title="t('routes.finance_manage_page.order_time')" align="center" width="160">
        <template #default="scope">
          <span v-if="!changeTable">`</span>
          {{ $filters.format(scope.row.created_at, false) }}
        </template>
      </vxe-table-column>
      <!-- <el-table-column prop="ReviewRemark" label="审核备注" align="center">
      </el-table-column> -->
      <vxe-table-column field="state" :title="t('global.select_tip')" align="center" width="100">
        <template #default="{ row }">
          <span class="green" v-if="row.state == 362">{{ t('routes.finance_manage_page.desipot_suc') }}</span>
          <span class="red" v-if="row.state == 363">{{ t('routes.finance_manage_page.desipot_error') }}</span>
          <span class="red" v-if="row.state == 361">{{ t('routes.finance_manage_page.desipot_ing') }}</span>
        </template>
      </vxe-table-column>
      <!-- <el-table-column prop="b" label="锁定状态" align="center" width="150"></el-table-column> -->
      <vxe-table-column field="confirm_at" :title="t('routes.finance_manage_page.over_time')" align="center" width="160">
        <template #default="scope">
          <span v-if="!changeTable && scope.row.confirm_at">`</span>
          {{ $filters.format(scope.row.confirm_at, false) }}
        </template>
      </vxe-table-column>
      <!-- <vxe-table-column field="col8" :title="t('global.operating')" align="center" width="200px">
        <template #default="scope" v-if="changeTable">
          
          <el-button type="primary" @click="lockingUser(scope.row)" >{{ t('routes.finance_manage_page.lock') }}</el-button>
          <el-button type="primary" @click="replenishmentOrder(scope.row)">
            {{ t('routes.finance_manage_page.replenishment') }}
          </el-button>
        </template>
      </vxe-table-column> -->
    </vxe-table>
    <p class="empty"></p>
    <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination" v-model:limit="pageQuery.page_size" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, unref, provide } from 'vue';
import formSerch from '@/components/serch-form/index.vue';
import Pagination from '@/components/pagination/index.vue';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import usePaginationHanlder from '@/components/pagination/pagination';
import useSearchPlaceholder from './search';
import { replayTypeTotext } from '@/utils/selectOptions';
import { useVipLevel } from '@/utils/getJson';
import list from '@/views/fin/ManualUpAndDown/history_list/components/list.vue';
import { APIs } from '@/http';
import { toFixedN, toFixedNReport } from '@/utils/int';
import { useCate, useChannel, } from '@/views/fin/ChannelManagement/ts/cateAndChannel';
import { range } from '../ts/vaild';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { downLoadExcel } from '@/utils/file';
import { store } from '@/store';

export default defineComponent({
  name: 'repDeposit',
  components: {
    formSerch,
    Pagination,
    list,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const { ChannelToText } = useChannel();
    const { CateToText } = useCate();
    const listQuery = ref<RefObjectKeyRulesType>({});
    const manualDialogRef = ref<any>(null);
    const manualDialog = ref<boolean>(false);
    const amountAll = ref();
    const aggData = ref<any>({});
    // 表格高度兼容
    if (window.screen.width * window.devicePixelRatio === 2560 || window.screen.height * window.devicePixelRatio === 1440) {
      store.state.app.tableHeight = 950;
    } else {
      store.state.app.tableHeight = 600;
    }
    // 所有锁定用户
    const changeTable = ref(true);
    const mapLockUser = ref({});
    const { toVipText } = useVipLevel();
    provide('openOrderGetList', getList);
    const numBer = ref<number>();
    const refAll = reactive<any>({
      lockingUserRef: null, // 锁定
      queryTripartiteRef: null, // 查询三方
      replenishmentOrderRef: null, // 补单
      queryLogRef: null // 日志
    });
    const dialogAll = reactive<any>({
      lockingUserDialog: false, // 锁定
      queryTripartiteDialog: false, // 查询三方
      replenishmentOrderDialog: false, // 补单
      queryLogDialog: false // 日志
    });
    const tableData = ref([]);
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });
    const current_row = reactive({});
    const { FormDataList } = useSearchPlaceholder();
    const onSubmit = (data: any) => {
      if (!range(data.min_amount, data.max_amount)) {
        ElMessage.error(t('routes.tips.order_amount_tips'));
        return;
      }
      pageQuery.value.page = 1;
      pageQuery.value.page_size = pageQuery.value.page_size
      listQuery.value = data;
      getList();
    };

    function getList() {
      APIs.fin
        .getDepositList({
          // flag: '2',
          // automatic: '1',
          // state: '361',
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
              tableData.value = res.data.d.map((p: any) => {
                const obj: any = {};
                if (res.data.agg) {
                  obj[`agg_amount`] = toFixedNReport(res.data.agg.amount);
                }
                p.amount1 = p.state == '362' ? p.amount : 0;
                return {
                  ...p,
                  ...obj
                };
              });
            }
            if (res.data.agg) {
              aggData.value = res.data.agg;
            }
            mapLockUser.value = res.data.lock;
          }
        });
    }

    // 锁定
    const lockingUser = (row: any) => {
      dialogAll.lockingUserDialog = true;
      current_row.username = row.username;

      refAll.lockingUserRef.showForm(Object.assign({}, row));
    };

    const confirmLockUser = mask => {
      console.log('confirmLockUser', current_row.value);
      const params = {
        username: current_row.username,
        comment: mask.value
      };
      APIs.fin.memberLock(params).then(res => {
        if (res.status) {
          ElMessage.success(t('global.set_suc'));
          getList();
        }
      });
    };

    const sumNum = (list: any[], field: string, state = true) => {
      let count = 0;
      list.forEach(item => {
        count += Number(item[field]);
      });
      return count;
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
              meanCell = toFixedNReport(aggData.value.amount);
              sumCell = toFixedNReport(sumNum(data, column.property));
              break;
            case 'amount1':
              meanCell = toFixedNReport(aggData.value.realAmount);
              sumCell = toFixedNReport(sumNum(data, column.property));
              break;
            case 'discount':
              meanCell = toFixedNReport(aggData.value.discount);
              sumCell = toFixedNReport(sumNum(data, column.property));
              break;
            case 'usdt_count':
              meanCell = toFixedNReport(aggData.value.usdtCount);
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
      if (changeTable.value) return [sums, means];
      if (!changeTable.value) return [means];
    };

    // 查询三方
    const queryTripartite = (row: any) => {
      dialogAll.queryTripartiteDialog = true;
      refAll.queryTripartiteRef.showForm(Object.assign({}, row));
    };
    // 补单
    const replenishmentOrder = (row: any) => {
      dialogAll.replenishmentOrderDialog = true;
      refAll.replenishmentOrderRef.showForm(Object.assign({}, row));
    };
    // 日志
    const queryLog = (row: any) => {
      dialogAll.queryLogDialog = true;
      numBer.value = Math.random();
      refAll.queryLogRef.showForm(Object.assign({}, row));
    };

    // 导出
    const getListItem = (page: number) => {
      return new Promise((resolve, reject) => {
        let obj = {
          flag: '2',
          automatic: '1',
          state: '361',
          ...unref(listQuery.value),
          page,
          page_size: 100
        };
        APIs.fin.getDepositList(obj).then((res: any) => {
          if (res.status) {
            resolve(res.data.d ?? []);
          } else {
            resolve([]);
          }
        });
      });
    };

    // 导出excl
    const exportHanlder = () => {
      const PromiseList: any[] = [];
      const total_page = Math.ceil(total.value / 100);
      for (let page = 1; page <= total_page; page++) {
        PromiseList.push(getListItem(page));
      }
      // 并发请求
      changeTable.value = false;
      Promise.all(PromiseList).then(res => {
        const result: any = [].concat.apply([], res).sort();
        let arr:any = tableData.value;
        tableData.value = result;
        setTimeout(() => {
          const dom: any = document.querySelector('.template_table_load');
          let filename = t('routes.finance_manage_page.repDeposit');
          downLoadExcel(dom, filename);
          tableData.value = arr;
          changeTable.value = true;
        }, 1000)
      });
    };

    return {
      onSubmit,
      footerMethod,
      tableData,
      changeTable,
      FormDataList,
      listQuery,
      total,
      numBer,
      ...toRefs(refAll),
      ...toRefs(dialogAll),
      replenishmentOrder,
      queryLog,
      queryTripartite,
      lockingUser,
      confirmLockUser,
      amountAll,
      pagination,
      toVipText,
      manualDialogRef,
      manualDialog,
      pageQuery,
      replayTypeTotext,
      ChannelToText,
      CateToText,
      toFixedN,
      exportHanlder,
      t,
      current_row,
      mapLockUser
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
