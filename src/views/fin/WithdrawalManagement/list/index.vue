<template>
  <div class="manual-container">
    <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit">
      <template #csv>
        <el-button type="primary" @click="exportHanlder" :disabled="tableData.length <= 0">{{ t('global.export')
        }}</el-button>
      </template>
    </formSerch>
    <vxe-table class="template_table_load" border resizable :show-footer="tableData.length ? true : false"
      :footer-method="footerMethod" highlight-hover-row :sort-config="{ trigger: 'cell' }" :data="tableData"
      :scroll-y="{ enabled: false }" highlight-current-row :max-height="globalTableHeight">
      <vxe-table-column field="id" :title="t('global.order_number')" align="center" width="180">
        <template #default="{ row }">
          <span v-if="!changeTable">`</span>
          {{ row.id }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="uid" :title="t('routes.activity.userId')" align="center" width="100"></vxe-table-column>
      <vxe-table-column field="username" :title="t('global.username')" align="center" width="120"></vxe-table-column>
      <vxe-table-column field="level" :title="t('routes.finance_manage_page.vip_level')" align="center" width="70">
        <template #default="{ row }">
          {{ toVipText(row.level) }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="amount" :title="appendBRL(t('routes.finance_manage_page.embodied_amount'))" align="center"
        width="140">
        <template #default="{ row }">
          {{ toFixedPro(row.amount) }}
        </template>
      </vxe-table-column>
      <vxe-table-column prop="fee" :title="appendBRL(t('global.Withdrawalfee'))" align="center" width="130">
        <template #default="{ row }">
          {{ toFixedPro(row.fee) }}
        </template>
      </vxe-table-column>
      <!-- <vxe-table-column prop="fee" title="提款类型" align="center" width="130">
        <template #default="{ row }">
          <el-tag  v-if="row.automatic ==0">人工确认</el-tag>
          <el-tag type="success" v-if="row.automatic ==1">自动转账</el-tag>
          <el-tag type="warning" v-if="row.automatic ==2">博主打款</el-tag>
        </template>
      </vxe-table-column> -->
      <vxe-table-column field="fname" :title="t('routes.finance_manage_page.fname')" align="center" width="120" />
      <vxe-table-column field="pix_account" :title="t('routes.finance_manage_page.pix_account')" align="center"
        width="120" />
      <vxe-table-column field="balance" :title="t('routes.finance_manage_page.balance')" align="center"
        width="120"></vxe-table-column>
      <vxe-table-column field="parent_name" :title="t('routes.agent.belong_account')" align="center"
        width="120"></vxe-table-column>
      <vxe-table-column field="created_at" :title="t('global.replay_time1')" align="center" width="110">
        <template #default="{ row }">
          <span v-if="!changeTable && row.created_at">`</span>
          {{ $filters.format(row.created_at, false) }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="confirm_at" :title="t('routes.finance_manage_page.risk_pass_time')" align="center"
        width="110">
        <template #default="{ row }">
          <span v-if="!changeTable && row.confirm_at">`</span>
          {{ $filters.format(row.confirm_at, false) }}
        </template>
      </vxe-table-column>
      <vxe-table-column field="confirm_name" :title="t('routes.finance_manage_page.risk_reviewp')" align="center"
        width="120"></vxe-table-column>
      <vxe-table-column field="state" :title="t('routes.finance_manage_page.order_status')" align="center" width="120">
        <template #default="{ row }">
          <span v-if="row.state === 373">
            {{ t('routes.finance_manage_page.order_outer_name') }}
          </span>
          <span v-else-if="row.state === 378 || row.state === 379" style="color: #F56C6C">{{
            t('global.being_audit')
          }}</span>
          <span v-else :style="{ color: row.state === 374 ? '#67C23A' : '#F56C6C' }">{{ WithdrawalToText(row.state)
          }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column width="180" align="center" :title="t('routes.finance_manage_page.operating')">
        <template #default="{ row }">
          <el-button type="primary" @click="withdrawReview(row)">{{ t('routes.finance_manage_page.pass_btn')
          }}</el-button>
          <el-button type="danger" @click="withdrawReject(row)">{{ t('routes.finance_manage_page.resolve_wid')
          }}</el-button>
          <div class="mt-8" v-if="![374,375].includes(+row.state)">
            <el-button type="warning" @click="withdrawRefund(row.id)">{{ "强制出款"
          }}</el-button>
          </div>
        </template>
      </vxe-table-column>
    </vxe-table>
    <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination"
      v-model:limit="pageQuery.page_size" />
    <review ref="reviewDialogRef" v-model="reviewDialog" />
    <reject ref="rejectDialogRef" v-model="rejectDialog" />
  </div>
</template>

<script lang="ts">
import { defineComponent, unref, ref, provide, onUnmounted } from 'vue';
import formSerch from '@/components/serch-form/index.vue';
import Pagination from '@/components/pagination/index.vue';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import usePaginationHanlder from '@/components/pagination/pagination';
import useSearchPlaceholder from './search';
import { APIs } from '@/http';
import { useVipLevel, useWithdrawalStatus } from '@/utils/getJson';
import { appendBRL, toFixedN, toFixedNReport } from '@/utils/int';
import { useI18n } from 'vue-i18n';
import { downLoadExcel } from '@/utils/file';
import { store } from '@/store';
import { ElMessage, ElMessageBox } from 'element-plus'

import review from './components/review.vue';
import reject from './components/reject.vue';

export default defineComponent({
  name: 'WithdrawalList',
  components: {
    formSerch,
    Pagination,
    review,
    reject
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const listQuery = ref<RefObjectKeyRulesType>({});
    const { WithdrawalToText } = useWithdrawalStatus();
    const { toVipText } = useVipLevel();
    const changeTable = ref(true);
    provide('reviewGetList', getList);
    const reviewDialogRef = ref<any>(null);
    const reviewDialog = ref<boolean>(false);
    const rejectDialogRef = ref<any>(null);
    const rejectDialog = ref<boolean>(false);
    const numBer = ref<number>();
    const tableData = ref([]);
    // 表格高度兼容
    if (window.screen.width * window.devicePixelRatio === 2560 || window.screen.height * window.devicePixelRatio === 1440) {
      store.state.app.tableHeight = 950;
    } else {
      store.state.app.tableHeight = 500;
    }
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
    const withdrawReview = (row: any) => {
      reviewDialog.value = true;
      reviewDialogRef.value.showForm(Object.assign({}, row));
    };
    const withdrawReject = (row: any) => {
      rejectDialog.value = true;
      rejectDialogRef.value.showForm(Object.assign({}, row));
    };
    const amountAll = ref();
    function getList() {
      APIs.withdrawal
        .financeList({
          ...unref(pageQuery.value),
          ...unref(listQuery.value)
        })
        .then(res => {
          tableData.value = [];
          if (res.status) {
            if (pageQuery.value.page.toString() === '1') {
              total.value = res.data.t;
            }
            if (res.data.agg) {
              amountAll.value = res.data.agg.amount;
            }
            if (res.data.d) {
              tableData.value = res.data.d.map((p: any) => {
                const obj: any = {};
                if (res.data.agg) {
                  obj[`agg_amount`] = toFixedNReport(res.data.agg.amount);
                }
                return {
                  ...p,
                  ...obj
                };
              });
            }
          }
        });
    }
    // 导出
    const exportHanlder = () => {
      const PromiseList: any[] = [];
      const total_page = Math.ceil(total.value / 100);
      for (let page = 1; page <= total_page; page++) {
        PromiseList.push(getListItem(page));
      }
      // 并发请求
      changeTable.value = false;
      Promise.all(PromiseList).then(res => {
        const result: any = [].concat.apply([], res);
        let arr: any = tableData.value;
        tableData.value = result;
        setTimeout(() => {
          const dom: any = document.querySelector('.template_table_load');
          let filename = `${t('routes.finance_manage_page.WithdrawalManagement')}${listQuery.value.start_time}-${listQuery.value.end_time}`;
          downLoadExcel(dom, filename);
          tableData.value = arr;
          changeTable.value = true;
        }, 1000)
      });
    };
    // 查询
    const getListItem = (page: number) => {
      return new Promise((resolve, reject) => {
        APIs.withdrawal.financeList({ ...unref(listQuery.value), page, page_size: 100 }).then((res: any) => {
          if (res.status) {
            resolve(res.data.d ?? []);
          } else {
            resolve([]);
          }
        });
      });
    };
    const sumNum = (list: any[], field: string) => {
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
      if (changeTable.value) return [sums, means];
      if (!changeTable.value) return [means];
    };

    const timer = setInterval(() => {
      getList();
    }, 30 * 1000);
    const withdrawRefund = (id:string)=> {
      ElMessageBox.confirm("确认强制退款？", t('global.warning'), {
              confirmButtonText: t('global.sure'),
              cancelButtonText: t('global.cancel'),
              type: 'warning'
            }).then(async() => {
              let res = await APIs.withdrawal.withdrawRefund({id})
                    if(res.status){
                        ElMessage.success({
                        message: "强制退款成功",
                        type: 'success'
                      });
                    }
                });
      
    }
    onUnmounted(() => {
      clearInterval(timer);
    });

    const bankcardFun = item => {
      if (Number.isFinite(+item)) {
        return 'bankcard' + item;
      }
      return 'bankcard' + item.bid;
    };

    return {
      tableData,
      FormDataList,
      withdrawReject,
      listQuery,
      numBer,
      total,
      changeTable,
      reviewDialogRef,
      reviewDialog,
      toVipText,
      pageQuery,
      WithdrawalToText,
      footerMethod,
      t,
      pagination,
      bankcardFun,
      onSubmit,
      toFixedN,
      exportHanlder,
      rejectDialogRef,
      rejectDialog,
      withdrawReview,
      withdrawRefund
    };
  }
});
</script>
<style lang="scss" scoped>
.manual-container {
  padding: 20px;

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

  .left {
    width: 100%;
    text-align: left;
  }

  .btn {
    margin-right: 10px;
  }
  .mt-8{
    margin-top: 8px;
  }
}
</style>
