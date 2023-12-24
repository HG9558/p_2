<template>
  <div>
    <div class="betting-cont">
      <div class="betting-table">
        <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit"> </formSerch>
        <el-table :data="tableData" border style="width: 100%" :summary-method="
          getSummaries(
            [
              'id',
              'username',
              'member_real_name',
              'last_deposit_amount',
              'agency_uid',
              'rebate_amount',
              'created_at',
              'real_name',
              'flag',
              'state',
              'hang_up_at',
              'review_remark',
              'parent_name'
            ],
            [],
            [{ prop: 'amount', val: aggAmount, toFixed: '0' }]
          )
        " show-summary :max-height="globalTableHeight">
          <el-table-column prop="id" :label="t('global.order_number')" align="center"></el-table-column>
          <el-table-column prop="uid" :label="t('routes.activity.userId')" align="center" width="100"></el-table-column>
          <el-table-column prop="username" :label="t('global.username')" align="center" width="100">
            <template #default="{ row }">
              <span style="color: #409EFF;">{{ row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="real_name" :label="t('routes.vip_list_page.real_name')" align="center"></el-table-column>
          <el-table-column prop="parent_name" :label="t('routes.risk.agent_name')" align="center" width="90">
            <template #default="{ row }">
              <span :class="{ bg_color: row.is_risk == '1' }">{{ row.parent_name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" :label="appendBRL(t('routes.finance_manage_page.wid_amount'))" align="center"
            sortable width="140">
            <template #default="{ row }">
              {{ toFixedPro(row.amount) }}
            </template>
          </el-table-column>
          <el-table-column prop="fee" :label="appendBRL(t('global.Withdrawalfee'))" align="center"
            sortable width="130">
            <template #default="{ row }">
              {{ toFixedPro(row.fee) }}
            </template>
          </el-table-column>
          <el-table-column prop="created_at" :label="t('global.replay_time1')" align="center">
            <template #default="scope">
              {{ $filters.format(scope.row.created_at, false) }}
            </template>
          </el-table-column>
          <!-- <el-table-column prop="last_deposit_amount" :label="appendBRL(t('routes.risk.last_deposit_amount'))"
            align="center" sortable min-width="150">
            <template #default="{ row }">
              {{ toFixedPro(row.last_deposit_amount) }}
            </template>
          </el-table-column> -->
          <el-table-column prop="" :label="t('routes.risk.review_system')" align="center" width="100">
            <template #default="{ row }">
               <!-- 371:审核中 372:审核拒绝 373:出款中 374:提款成功 375:出款失败 376:异常订单 377:代付失败 378：挂起 379：已派单 -->
              <span :style="{ color: row.state == 374 ? '#67C23A' : '#F56C6C' }">{{ WithdrawalToText(row.state) }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="hang_up_at" :label="t('routes.risk.up_time')" align="center">
            <template #default="scope">
              {{ $filters.format(scope.row.hang_up_at, false) }}
            </template>
          </el-table-column>
          <el-table-column prop="hang_up_name" :label="t('routes.risk.pending_people')"
            align="center"></el-table-column>
          <el-table-column prop="review_remark" :label="t('routes.risk.up_id')" align="center">
            <template #default="{ row }">
              <!-- {{ pendingTypeTotext(row.remark_id) }} -->
              {{ row.hang_up_remark }}
            </template>
          </el-table-column>
          <el-table-column prop="" :label="t('global.operating')" align="center">
            <template #default="scope">
              <el-button type="text" @click="receive(scope.row)">{{ t('routes.risk.lq_person') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <p class="empty"></p>
        <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination"
          v-model:limit="pageQuery.page_size" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import formSerch from '@/components/serch-form/index.vue';
import { APIs } from '@/http';
import Pagination from '@/components/pagination/index.vue';
import usePaginationHanlder from '@/components/pagination/pagination';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import searchL from './search';
import useTableStyle, { getSummaries } from '@/utils/table';
import { useWithdrawalStatus } from '@/utils/getJson';
import { toFixedN } from '@/utils/int';
import { useRouter } from 'vue-router';
import { rules } from './rules';
import { auditType } from '@/utils/selectOptions';
import { pendingTypeTotext } from '@/utils/selectOptions';
import { useI18n } from 'vue-i18n';
import { store } from '@/store';

export default defineComponent({
  name: 'PendingReview',
  components: {
    formSerch,
    Pagination
  },
  props: [],
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const router = useRouter();
    const { FormDataList } = searchL();
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const listQuery = ref<RefObjectKeyRulesType>({});
    const aggAmount = ref();
    const { WithdrawalToText } = useWithdrawalStatus();
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });
    // 表格高度兼容
    if (window.screen.width * window.devicePixelRatio === 2560 || window.screen.height * window.devicePixelRatio === 1440) {
      store.state.app.tableHeight = 900;
    } else {
      store.state.app.tableHeight = 600;
    }
    const tableData = ref([{}]);
    useTableStyle();
    const onSubmit = (data: any) => {
      pageQuery.value.page = 1;
      listQuery.value = data;
      listQuery.value.real_name = data.real_name || '';
      getList();
    };
    function getList() {
      APIs.risks
        .withdHanduplist({
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
            }
            if (res.data.agg) {
              aggAmount.value = res.data.agg.amount;
            }
          }
        });
    }
    // 领取
    const receive = (row: any) => {
      ElMessageBox.confirm(t('routes.risk.sure_lq'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
        APIs.risks
          .withdReceive({
            id: row.id
          })
          .then(res => {
            if (res.status) {
              getList();
              ElMessage.success({
                message: t('routes.risk.lq_suc'),
                type: 'success'
              });
            }
          });
      });
    };
    // 打开会员列表
    function openUserList(row: any) {
      router.push(`/vip/list?username=${row.username}`);
    }

    const bankcardFun = item => {
      if (Number.isFinite(+item)) {
        return 'bankcard' + item;
      }
      return 'bankcard' + item.bid;
    };

    return {
      openUserList,
      receive,
      onSubmit,
      listQuery,
      total,
      pagination,
      toFixedN,
      pageQuery,
      auditType,
      bankcardFun,
      FormDataList,
      getSummaries,
      pendingTypeTotext,
      aggAmount,
      rules,
      tableData,
      WithdrawalToText,
      t
    };
  }
});
</script>
<style lang="scss" scoped>
.betting-cont {
  background: white;

  .betting-table {
    padding: 20px;
    background: white;
  }

  .betting-tables {
    margin-top: 10px;
  }

  .empty {
    height: 20px;
  }

  .red {
    cursor: pointer;
    color: #F56C6C;
  }

  .green {
    color: #67C23A;
  }

  .blue {
    margin-right: 10px;
    color: #2787ea;
    cursor: pointer;
  }

  .red-title {
    color: #F56C6C;
    margin: -15px 0 10px 20px;
  }

  .left {
    width: 100%;
    text-align: left;
  }

  .tags {
    margin-right: 5px;
    margin-top: 5px;
  }
}

.bigswitch {
  position: relative;
  top: -2px;
  left: 3px;

  ::v-deep(.el-switch) {
    line-height: 36px;
    height: 36px;
  }

  ::v-deep(.el-switch) {
    line-height: 36px;
    height: 36px;
  }

  ::v-deep(.el-switch__core) {
    height: 36px;
    border-radius: 30px;
  }

  ::v-deep(.el-switch__core .el-switch__action) {
    width: 30px;
    height: 30px;
    top: 2px;
    left: 1px;
  }
}

::v-deep(.el-switch.is-checked .el-switch__core .el-switch__action) {
  margin-left: 20px;
}
</style>
