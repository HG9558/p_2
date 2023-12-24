<template>
  <div>
    <!-- 待审核列表 -->
    <div class="betting-cont">
      <div class="betting-table">
        <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit"></formSerch>
        <el-table :data="tableData" border style="width: 100%" :summary-method="
          getSummaries(
            [
              'id',
              'username',
              'member_tags',
              'last_deposit_amount',
              'agency_uid',
              'rebate_amount',
              'created_at',
              'last_deposit_at',
              'real_name',
              'flag',
              'state',
              'parent_name',
              'receive_at'
            ],
            [],
            [{ prop: 'amount', val: aggAmount, toFixed: '0' }],
            ['amount']
          )
        " show-summary>
          <el-table-column prop="id" :label="t('global.order_number')" align="center" width="70">
            <template #default="{ row }">
              <div>
                <el-popover v-if="row.hang_up_name" placement="top" width="auto" trigger="hover">
                  <section>
                    <p>{{ t('routes.risk.pending_people') }}：{{ row.hang_up_name || '-' }}</p>
                    <p>{{ t('routes.risk.up_time') }}：{{ $filters.format(row.hang_up_at, false) || '-' }}</p>
                    <p>{{ t('routes.risk.up_id') }}：{{ row.hang_up_remark || '-' }}</p>
                  </section>
                  <template #reference>
                    <i class="orderinfo el-icon-table-lamp"></i>
                  </template>
                </el-popover>
                <br v-if="row.hang_up_name" />
                {{ row.id }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="uid" :label="t('routes.activity.userId')" align="center" width="100"></el-table-column>
          <el-table-column prop="username" :label="t('global.username')" align="center">
            <template #default="{ row }">
              <span style="color: #409EFF;">{{ row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="real_name" :label="t('routes.vip_list_page.real_name')" align="center" />
          <el-table-column prop="parent_name" :label="t('routes.risk.agent_name')" align="center" width="90">
            <template #default="{ row }">
              <span :class="{ bg_color: row.is_risk == '1' }">{{ row.parent_name }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="first_withdraw" :label="t('routes.tips.sctk')" align="center" min-width="80">
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
          <el-table-column prop="fee" :label="appendBRL(t('global.Withdrawalfee'))" align="center"
            sortable width="130">
            <template #default="{ row }">
              {{ toFixedPro(row.fee) }}
            </template>
          </el-table-column>
          <el-table-column prop="created_at" :label="t('global.replay_time1')" align="center" width="90">
            <template #default="scope">
              {{ $filters.format(scope.row.created_at, false) }}
            </template>
          </el-table-column>
          <el-table-column prop="confirm_name" :label="t('routes.risk.recipients')" align="center"></el-table-column>
          <el-table-column prop="receive_at" :label="t('routes.risk.recipients_time')" align="center">
            <template #default="scope">
              {{ $filters.format(scope.row.receive_at, false) }}
            </template>
          </el-table-column>
          <el-table-column prop="" :label="t('routes.risk.review_system')" align="center" width="100">
            <template #default="{ row }">
               <!-- 371:审核中 372:审核拒绝 373:出款中 374:提款成功 375:出款失败 376:异常订单 377:代付失败 378：挂起 379：已派单 -->
              <span :style="{ color: row.state == 374 ? '#67C23A' : '#F56C6C' }">{{ WithdrawalToText(row.state) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" :label="t('global.operating')" align="center" width="230">
            <template #default="scope">
              <!-- <div v-if="state.user.name === scope.row.confirm_name"> -->
              <el-button type="text" @click="agreePass(scope.row)">{{ t('global.pass') }}</el-button>
              <el-divider direction="vertical"></el-divider>
              <!-- <el-button type="text" @click="reviewShow(scope.row.username, scope.row.id)">{{
                t('routes.risk_audits')
              }}</el-button> -->
              <!-- <el-button type="text" @click="resolvePass(scope.row)">{{ t('global.no_pass') }}</el-button> -->
              <el-button type="text" @click="$refs.HangUp.showForm(scope.row)">{{ t('routes.risk.audit') }}</el-button>
              <!-- </div> -->
              <!-- <el-button type="text" @click="modifyPerson(scope.row)">{{
                t('routes.risk.recipient_modify')
              }}</el-button> -->
              <!-- <el-button v-if="autoButtonState" type="text" @click="modifyPerson(scope.row)">{{ t('routes.risk.recipient_modify') }}</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination"
          v-model:limit="pageQuery.page_size" />
      </div>
      <!-- 修改领取人 -->
      <modifyVue ref="formModify" v-model="modifyDialog" :modifyData="modifyData" :num="num" />
      <!-- 审核通过 -->
      <reviewPass ref="reviewPassRef" v-model="reviewPassDialog" />
      <!-- 审核拒绝 -->
      <reviewFalse ref="reviewFalseRef" v-model="reviewFalseDialog" />
      <!--  -->
      <hang-up ref="HangUp" />
    </div>
    <el-divider />
    <!-- 待分配表格 -->
    <PendingTwoTable class="mgt-15" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, unref, provide } from 'vue';
import { ElForm } from 'element-plus';
import formSerch from '@/components/serch-form/index.vue';
import { APIs } from '@/http';
import Pagination from '@/components/pagination/index.vue';
import usePaginationHanlder from '@/components/pagination/pagination';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import searchL from './search';
import useTableStyle, { getSummaries } from '@/utils/table';
import { toFixedN } from '@/utils/int';
import { rules } from './rules';
import modifyVue from './components/modify.vue';
import reviewPass from './components/reviewPass.vue';
import reviewFalse from './components/reviewFalse.vue';
import PendingTwoTable from './components/PendingTwoTable/PendingTwoTable.vue';
import { useRouter } from 'vue-router';
import hangUp from './components/hangUp.vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import { Session } from '../../../../utils/storage';
import { useWithdrawalStatus, } from '@/utils/getJson';
export default defineComponent({
  name: 'withdrawal-review',
  components: {
    formSerch,
    Pagination,
    modifyVue,
    reviewPass,
    reviewFalse,
    PendingTwoTable,
    hangUp
  },
  props: [],
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const { FormDataList } = searchL();
    const { state } = useStore();
    const router = useRouter();
    const { WithdrawalToText } = useWithdrawalStatus();
    const loading = ref<boolean>(false);
    const dialogReviewShow = ref<boolean>(false);
    const unData = ref<string>('');
    const modifyData = ref<string>('');
    const num = ref<number>(0);
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const listQuery = ref<RefObjectKeyRulesType>({});
    const newArr = ref<any>([]);
    const dialogRef = reactive<any>({
      reviewPassRef: null,
      formModify: null,
      reviewFalseRef: null
    });
    const autoButtonState = ref<boolean>(false);
    const checkData = ref<any[]>([]);
    provide('reviewGetList', getList);
    const elForm = ref<typeof ElForm | null>(null);
    const dialog = reactive({
      modifyDialog: false,
      reviewPassDialog: false,
      reviewFalseDialog: false
    });
    const aggAmount = ref();
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });
    const tableData = ref([{}]);
    useTableStyle();
    const onSubmit = (data: any) => {
      pageQuery.value.page = 1;
      listQuery.value = data;
      listQuery.value.real_name = data.real_name|| '';
      getList();
    };
    function getList() {
      // {
      //   id: '', // 订单号
      //   confirm_name: '领取人', // 领取人
      //   real_name: '真实姓名' // 真实姓名
      // }
      APIs.risks
        .getWithdrawWaitreview({
          ab: 1,
          ...listQuery.value,
          ...pageQuery.value
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
    // 审核通过
    const agreePass = (row: any) => {
      dialog.reviewPassDialog = true;
      dialogRef.reviewPassRef.showForm(Object.assign({}, row));
    };
    // 审核拒绝
    const resolvePass = (row: any) => {
      dialog.reviewFalseDialog = true;
      dialogRef.reviewFalseRef.showForm(Object.assign({}, row));
    };
    // 修改领取人
    const modifyPerson = (row: any) => {
      dialog.modifyDialog = true;
      modifyData.value = row.confirm_name;
      num.value++;
      dialogRef.formModify.showForm(Object.assign({}, row));
    };
    const onClose = () => {
      console.log('1');
    };
    const submitmBtn = () => {
      console.log(11);
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

    const reviewShow = (username: string, id: string) => {
      dialogReviewShow.value = true;
      unData.value = username;
      Session.set('orderNumber', id);
      num.value++;
    }

    const closeFunc = () => {
      dialogReviewShow.value = false;
    }

    return {
      reviewShow,
      bankcardFun,
      openUserList,
      onSubmit,
      elForm,
      unData,
      modifyData,
      num,
      closeFunc,
      agreePass,
      resolvePass,
      modifyPerson,
      listQuery,
      onClose,
      total,
      ...toRefs(dialog),
      pagination,
      toFixedN,
      dialogReviewShow,
      newArr,
      aggAmount,
      pageQuery,
      submitmBtn,
      checkData,
      loading,
      autoButtonState,
      FormDataList,
      getSummaries,
      ...toRefs(dialogRef),
      rules,
      tableData,
      state,
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
    padding: 20px 20px 0 20px;
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

.orderinfo {
  color: #f98b16;
  transform: rotate(45deg);
}

.orderinfo2 {
  color: #f98b16;
  font-size: 20px;
}
</style>
