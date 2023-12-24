<template>
  <el-dialog :title="t('routes.risk.review_detail')" v-model="dialogDetailVisible" :width="600">
    <p class="tline t_first">{{ t('routes.risk.base_data') }}</p>
    <div class="row_container">
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('global.order_number') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ datas.id }}
            <el-link type="primary" v-clipboard="datas.id" href="javascript:void(0)">{{ t('global.ctrlv') }}</el-link>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('global.username') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ datas.username }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.finance_manage_page.wid_amount') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ toFixedN(datas.amount) }}
            <el-link type="primary" v-clipboard="toFixedN(datas.amount)" href="javascript:void(0)">{{ t('global.ctrlv') }}</el-link>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple bank_title">{{ t('routes.risk.tk_message') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light whites">
              <p>{{ t('routes.finance_manage_page.pix_account') }}：{{ datas.pix_account }}</p>
              <div>
                pixID：{{ datas.pix_id }}
              </div>
              <div>
                {{ t('routes.finance_manage_page.bank_person_name') }}：{{ datas.real_name }}
              </div>
              <div>
                {{ t('global.account_type') }}：{{ getFlagType( datas.flag) }}
              </div>
              <!-- <p>{{ t('routes.finance_manage_page.bank_addr') }}：{{ reviewData.member_bank_address }}</p> -->
            </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.risk.last_deposit_amount') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ toFixedN(datas.last_deposit_amount) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.finance_manage_page.order_status') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <span :style="{ color: datas.state == 374 ? '#67C23A' : '#F56C6C' }">{{ WithdrawalToText(datas.state) }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('global.replay_time1') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            {{ $filters.format(datas.created_at, false) }}
          </div>
        </el-col>
      </el-row>
    </div>
    <p class="tline">{{ t('routes.risk.risk_reviewmsg') }}</p>
    <div class="row_container">
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.risk.review_system') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.risk.review_person') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ datas.confirm_name }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('global.review_remark') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ datas.review_remark }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.risk.recipients_time') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ $filters.format(datas.receive_at, false) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.risk.risk_time') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ $filters.format(datas.confirm_at, false) }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.risk.cl_time') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
    </div>
    <p class="tline">{{ t('routes.risk.fin_reviewmsg') }}</p>
    <div class="row_container">
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.risk.fin_opration') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ datas.withdraw_name }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.risk.fin_people') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.risk.out_type') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            {{ vipWidthTypeTotext(datas.finance_type) }}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.risk.review_fin') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ datas.withdraw_remark }}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" class="border_right">
          <div class="grid-content bg-purple">{{ t('routes.risk.out_time') }}</div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">{{ $filters.format(datas.withdraw_at, false) }}</div>
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">{{ t('routes.finance_manage_page.close') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { vipWidthTypeTotext } from '@/utils/selectOptions';
import { useWithdrawalStatus } from '@/utils/getJson';
import { toFixedN } from '@/utils/int';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ActiveRecords',
  components: {},
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const dialogDetailVisible = ref<boolean>(false);
    const { WithdrawalToText } = useWithdrawalStatus();
    const datas = ref<Record<string,any>>({});
    const showForm = (data: any) => {
      datas.value = data;
      console.log(datas.value);
      dialogDetailVisible.value = true;
    };
    const bankcardFun = (item) => {
      if (Number.isFinite(+item)) {
        return 'bankcard' + item
      }
      return 'bankcard' + item.bid
    };
    const getFlagType = (type:'1'|'2'|'3')=>{
        return type==='1'?'cpf':type==='2'?'phone':type==='3'?'email':''
    }
    const cancel = () => {
      dialogDetailVisible.value = false;
    };
    return { dialogDetailVisible, cancel, showForm, bankcardFun, datas, WithdrawalToText, vipWidthTypeTotext, toFixedN,getFlagType, t };
  }
});
</script>
<style lang="scss" scoped>
.t_first {
  margin-top: -10px !important;
}
.tline {
  margin-top: 20px;
  margin-bottom: 10px;
  position: relative;
  padding-left: 5px;
  position: relative;
  padding-left: 13px;
  font-size: 18px;
  line-height: 1;
  color: black;
  &::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #409eff;
  }
}
.dialog-detail {
  ::v-deep(.el-table__header-wrapper) {
    display: none;
  }
}
.row_container {
  border: 1px solid #f0f0f0;
  > div {
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #f0f0f0;
  }
  > div:last-of-type {
    border: none;
  }
  .border_right {
    border-right: 1px solid #f0f0f0;
  }
  .bank_msg {
    padding: 5px 20px;
    text-align: left;
    line-height: 26px;
  }
  .bank_title {
    line-height: 114px;
  }
}
</style>
