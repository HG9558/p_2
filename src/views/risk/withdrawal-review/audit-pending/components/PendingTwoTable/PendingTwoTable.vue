<template>
  <div>
    <div class="betting-cont">
      <div class="betting-table">
        <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit">
          <template #add>
            <span style="margin-left: 40px" v-if="autoButtonState">
              <span>{{ t('routes.risk.orders') }}</span>
              <el-switch :width="56" @click="StatusChange" class="bigswitch" :model-value="orderState.state">
              </el-switch>
            </span>
          </template>
        </formSerch>
        <el-table :data="tableData" border style="width: 100%" :summary-method="
          getSummaries(
            [
              'id',
              'first_withdraw',
              'username',
              'member_tags',
              'member_real_name',
              'last_deposit_amount',
              'agency_uid',
              'rebate_amount',
              'created_at',
              'real_name',
              'flag',
              'state',
              'parent_name'
            ],
            [],
            [{ prop: 'amount', val: aggAmount, toFixed: '0' }],
            ['amount']
          )
        " show-summary>
          <el-table-column prop="id" :label="t('global.order_number')" align="center" width="180"></el-table-column>
          <el-table-column prop="uid" :label="t('routes.activity.userId')" align="center" width="100"></el-table-column>
          <el-table-column prop="username" :label="t('global.username')" align="center" width="100">
            <template #default="{ row }">
              <span style="color: #409EFF;">{{ row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="real_name" :label="t('routes.vip_list_page.real_name')" align="center" />
          <el-table-column prop="parent_name" :label="t('routes.risk.agent_name')" align="center" width="100">
            <template #default="{ row }">
              <span :class="{ bg_color: row.is_risk == '1' }">{{ row.parent_name }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="first_withdraw" :label="t('routes.tips.sctk')" align="center" width="80">
            <template #default="{ row }">
              <span>{{ row.first_withdraw ? t('global.yes') : t('global.no') }}</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="amount" :label="appendBRL(t('routes.finance_manage_page.wid_amount'))" align="center"
            sortable width="130">
            <template #default="{ row }">
              {{ toFixedPro(row.amount) }}
            </template>
          </el-table-column>
          <el-table-column prop="created_at" :label="t('global.replay_time1')" align="center" width="180">
            <template #default="scope">
              {{ $filters.format(scope.row.created_at, false) }}
            </template>
          </el-table-column>
         
          <el-table-column prop="fname" :label="t('routes.finance_manage_page.channel_name')" align="center"></el-table-column>
          <el-table-column prop="" :label="t('routes.risk.review_system')" align="center" width="100">
            <template #default="{ row }">
               <!-- 371:审核中 372:审核拒绝 373:出款中 374:提款成功 375:出款失败 376:异常订单 377:代付失败 378：挂起 379：已派单 -->
              <span :style="{ color: row.state == 374 ? '#67C23A' : '#F56C6C' }">{{ WithdrawalToText(row.state) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" :label="t('global.operating')" align="center" width="120">
            <template #default="scope">
              <el-button type="text" @click="agreePass(scope.row)">{{ t('routes.risk.lq_person') }}</el-button>
            </template>
          </el-table-column>
         
        </el-table>
        <p class="empty"></p>
        <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination"
          v-model:limit="pageQuery.page_size" />
      </div>
    </div>
    <DynamicVerificationCode ref="dynamicVerificationCode">
      <template #vit>
        <el-button type="primary" @click="VitHanlder">{{ t('routes.finance_manage_page.yz') }}</el-button>
      </template>
    </DynamicVerificationCode>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, inject } from 'vue';
import { ElForm, ElMessage, ElMessageBox } from 'element-plus';
import formSerch from '@/components/serch-form/index.vue';
import { APIs } from '@/http';
import Pagination from '@/components/pagination/index.vue';
import usePaginationHanlder from '@/components/pagination/pagination';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import searchL from './search';
import useTableStyle, { getSummaries } from '@/utils/table';
import { useWithdrawalStatus} from '@/utils/getJson';
import { toFixedN } from '@/utils/int';
import { rules } from './rules';
import { auditType } from '@/utils/selectOptions';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStore } from '@/store';
import DynamicVerificationCode from '@/components/dynamic-verification-code/index.vue';

export default defineComponent({
  name: 'PendingTwoTable',
  components: {
    formSerch,
    Pagination,
    DynamicVerificationCode
  },
  props: [],
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const { FormDataList } = searchL();
    const router = useRouter();
    const aggAmount = ref();
    const { state } = useStore();
    const { WithdrawalToText } = useWithdrawalStatus();
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const listQuery = ref<RefObjectKeyRulesType>({});
    const newArr = ref<any>([]);
    const dialogRef = reactive<any>({
      reviewPassRef: null,
      formModify: null,
      reviewFalseRef: null
    });
  
    const checkData = ref<any[]>([]);
    const elForm = ref<typeof ElForm | null>(null);
    const dialog = reactive({
      modifyDialog: false,
      reviewPassDialog: false,
      reviewFalseDialog: false
    });
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });
    const tableData = ref([]);
    useTableStyle();
    const onSubmit = (data: any) => {
      pageQuery.value.page = 1;
      listQuery.value = data;
      listQuery.value.real_name = data.real_name || '';
      getList();
    };
    function getList() {
      APIs.risks
        .withdWaitreceive({
          ...pageQuery.value,
          ...listQuery.value
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
    const reviewGetList = inject<any>('reviewGetList');
    // 审核通过
    const agreePass = (row: any) => {
      ElMessageBox.confirm(t('routes.risk.sure_lq'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
        APIs.risks
          .withdReceive({
            id: row.id
          })
          .then((res: any) => {
            if (res.status) {
              ElMessage.success(t('routes.risk.lq_suc'));
              getList();
              reviewGetList();
            }
          });
      });
    };

    // 订单按钮
    const orderState = reactive({
      state: false
    });

    // 打开会员列表
    function openUserList(row: any) {
      router.push(`/vip/list?username=${row.username}`);
    }
    const autoButtonState = ref<boolean>(false);
    let rowData: any = {};
    function StatusChange(row: any) {
      rowData = row;
      const txt = orderState.state ? t('routes.finance_manage_page.close') : t('routes.finance_manage_page.open');
      ElMessageBox.confirm(t('routes.finance_manage_page.you_sure') + txt + t('routes.finance_manage_page.mm'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
      });
    }

    const bankcardFun = item => {
      if (Number.isFinite(+item)) {
        return 'bankcard' + item;
      }
      return 'bankcard' + item.bid;
    };

    return {
      bankcardFun,
      StatusChange,
      autoButtonState,
      openUserList,
      onSubmit,
      elForm,
      agreePass,
      listQuery,
      total,
      ...toRefs(dialog),
      pagination,
      toFixedN,
      newArr,
      pageQuery,
      auditType,
      checkData,
      aggAmount,
      FormDataList,
      getSummaries,
      ...toRefs(dialogRef),
      rules,
      tableData,
      orderState,
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
