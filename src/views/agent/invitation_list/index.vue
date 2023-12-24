<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto">
      <el-form-item label="渠道id" prop="cid">
        <el-input v-model="queryParams.cid" :placeholder="t('global.enter') + '渠道id'" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('routes.activity.userId')" prop="uid">
        <el-input v-model="queryParams.uid" :placeholder="t('global.enter') + t('routes.activity.userId')" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('routes.activity.username')" prop="username">
        <el-input v-model="queryParams.username" :placeholder="t('routes.activity.username_placeholder')" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('routes.agent.agent_type')" prop="username">
      <el-select v-model="queryParams.agency_type" >
            <el-option v-for="cItem in channels" :key="cItem.value" :label="cItem.key" :value="cItem.value"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item :label="$t('routes.agent.statistics_time')" prop="day">
        <el-date-picker v-model="timer" type="daterange" unlink-panels
          value-format="YYYY-MM-DD" :range-separator="t('global.zhi')"
          :start-placeholder="t('global.start_date')" :end-placeholder="t('global.end_date')" :shortcuts="shortcuts">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{t('global.search')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ t('global.reset') }}</el-button>
        <el-button type="primary" @click="exportHanlder" :disabled="listData.length <= 0">{{ t('global.export')
        }}</el-button>
      </el-form-item>
    </el-form>
    <el-table class="invitationListTable" :data="listData" border @sort-change="sortChange">
      <el-table-column prop="report_time" max-width="120px" sortable="custom"  :label="t('routes.report_center_page.report_time')" align="center"
        >
        <template #default="{row}">
          {{ $filters.format(row.report_time, false,'YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column label="渠道id" align="center" prop="cid" />
      <el-table-column :label="t('routes.tips.qdmc')" align="center" prop="cname" />
      <el-table-column :label="t('routes.activity.userId')" align="center" prop="uid" />
      <el-table-column :label="t('routes.activity.username')" align="center" prop="username" />
      <el-table-column :label="t('routes.agent.total_commissions')" align="center" sortable="custom"  prop="total_commissions" />
      <el-table-column :label="t('routes.agent.total_team_num')" align="center" sortable="custom"  prop="total_team_num" />
      <el-table-column :label="t('routes.agent.deposit_withdraw_diff')" align="center" sortable="custom"  prop="deposit_withdraw_diff" />
      <el-table-column label="团队充值人数" align="center" sortable="custom"  prop="deposit_mem_count" />
      <el-table-column label="团队充值金额" align="center" sortable="custom"  min-width="95px" prop="deposit_amount" />
      <el-table-column label="团队提现金额 " align="center" sortable="custom"  min-width="95px" prop="withdraw_amount" />
      <!-- 直推详情 -->
      <el-table-column :label="t('routes.agent.direct_push')" align="center" min-width="180px" prop="vip">
        <template #default='{row}'>
                <el-tag type="warning">{{t('routes.agent.direct_push_num') }}：{{row.direct_push_num}}</el-tag>
                <div><span class="row-label">{{t('routes.agent.direct_push_deposit_num')}}</span>：{{row.direct_push_deposit_num}}</div>
                <div><span class="row-label">{{'直推首充金额'}}</span>：{{row.direct_push_fd_amount}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_fd_bonus')}}</span>：{{row.direct_push_fd_bonus}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_deposit')}}</span>：{{row.direct_push_deposit}}</div>
                <div><span class="row-label">{{'直推提款金额'}}</span>：{{row.direct_push_withdraw_amount || 0}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_flow')}}</span>：{{row.direct_push_flow}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_flow_bonus')}}</span>：{{row.direct_push_flow_bonus}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_dw_diff')}}</span>：{{row.direct_push_dw_diff}}</div>
        </template>
      </el-table-column>
      <!-- 二级代理详情 -->
      <el-table-column :label="t('routes.agent.lvl_second')" align="center" min-width="180px" prop="vip" >
        <template #default='{row}'>
              <el-tag type="danger">{{t('routes.agent.lvl_second_num') }}：{{row.lvl_second_num}}</el-tag>
              <div><span class="row-label">{{"二级充值人数"}}</span>：{{row.lvl_second_deposit_num}}</div>
              <div><span class="row-label">{{'二级首充金额'}}</span>：{{row.lvl_second_fd_amount}}</div>
              <div><span class="row-label">{{"二级充值奖励"}}</span>：{{row.lvl_second_fd_bonus}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_second_deposit_amount')}}</span>：{{row.lvl_second_deposit_amount}}</div>
              <div><span class="row-label">{{'二级提款金额'}}</span>：{{row.lvl_second_withdraw_amount || 0}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_second_flow')}}</span>：{{row.lvl_second_flow}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_second_flow_bonus')}}</span>：{{row.lvl_second_flow_bonus}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_second_dw_diff')}}</span>：{{row.lvl_second_dw_diff}}</div>
        </template>
      </el-table-column> 
      <!-- 三级代理 -->
      <el-table-column :label="t('routes.agent.lvl_three')" align="center" min-width="180px" prop="vip">
        <template #default='{row}'>
              <el-tag>{{t('routes.agent.lvl_three_num') }}：{{row.lvl_three_num}}</el-tag>
              <div><span class="row-label">{{"三级充值人数"}}</span>：{{row.lvl_three_deposit_num}}</div>
              <div><span class="row-label">{{'三级首充金额'}}</span>：{{row.lvl_three_fd_amount}}</div>
              <div><span class="row-label">{{"三级充值奖励"}}</span>：{{row.lvl_three_fd_bonus}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_three_deposit_amount')}}</span>：{{row.lvl_three_deposit_amount}}</div>
              <div><span class="row-label">{{'三级提款金额'}}</span>：{{row.lvl_second_withdraw_amount || 0}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_three_flow')}}</span>：{{row.lvl_three_flow}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_three_flow_bonus')}}</span>：{{row.lvl_three_flow_bonus}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_three_dw_diff')}}</span>：{{row.lvl_three_dw_diff}}</div>
        </template>
      </el-table-column>
      <el-table-column :label="t('routes.agent.created_ip')" align="center" prop="created_ip" />
      <el-table-column prop="cid" :label="t('routes.agent.agent_type')" align="center" width="120"> 
        <template #default="{row}">
          <el-tag class="ml-2" v-if="row.cid === '0'" type="danger">{{t('routes.agent.nationalAgent') }}</el-tag>
          <el-tag class="ml-2" v-else type="success">{{ t('routes.agent.channelAgent') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" :label="t('global.creat_time')" align="center">
        <template #default="{ row }">
          {{ $filters.format(row.created_at, false) }}
        </template>
      </el-table-column>
      <el-table-column :label="t('global.operating')" align="center" class-name="small-padding fixed-width">
        <template #default="{row}">
          <el-button size="mini" type="text" icon="el-icon-document" @click="handleDetail(row)">{{t('routes.agent.withdrawal_history') }}</el-button>
          <el-button size="mini" v-if="row.cid !=0" type="text" icon="el-icon-delete" @click="setMemberAgentCancel(row.uid)">{{ '取消代理' }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryParams.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10,20,50,100,200,300,500]"
      v-model:page-size="queryParams.page_size" @current-change="getList" @size-change="getList" />

    <!-- 提现记录详情 -->
    <el-dialog :title="title" v-model="open" width="1200px" @close="cancel" :close-on-click-modal="false">
      <h3 class="withdraw-head">
        <span><i class="el-icon-user"/>{{ t('global.username') }}:{{ VipDetaiPage.username}}</span>
        <span class="ml10">{{ t('global.total') }}:<span class="red">{{withdraw_amount}}</span>BRL</span>
      </h3>
      <el-table  :data="withdraw_data">
        <el-table-column prop="id" :label="t('global.order_number')" align="center" width="180"></el-table-column>
      <!-- <el-table-column prop="username" :label="t('global.username')" align="center" width="180"></el-table-column> -->
      <!-- <el-table-column prop="level" :label="t('routes.finance_manage_page.vip_level')" align="center" width="70">
        <template #default="{ row }">
          {{ row.level&&toVipText(row.level) }}
        </template>
      </el-table-column> -->
      <el-table-column prop="amount" :label="appendBRL(t('routes.finance_manage_page.embodied_amount'))" align="center"
        min-width="140" sortable>
        <template #default="{ row }">
          {{ toFixedPro(row.amount) }}
        </template>
      </el-table-column>
      <el-table-column prop="fname" :label="t('routes.finance_manage_page.fname')" align="center" width="120" />
      <el-table-column prop="pix_account" :label="t('routes.finance_manage_page.pix_account')" align="center"
        width="120" />
      <el-table-column prop="created_at" :label="t('global.replay_time1')" align="center" width="180">
        <template #default="scope">
          {{ $filters.format(scope.row.created_at, false) }}
        </template>
      </el-table-column>
      <el-table-column prop="balance" :label="t('routes.tips.ye')" align="center" min-width="200" />
      <!-- <el-table-column prop="parent_name" :label="t('routes.agent.belong_account')" align="center"
        min-width="200"></el-table-column> -->
      <!-- <el-table-column prop="confirm_at" :label="t('routes.finance_manage_page.risk_pass_time')" align="center"
        width="180">
        <template #default="scope">
          <span v-if="scope.row.confirm_at">`</span>
          {{ $filters.format(scope.row.confirm_at, false) }}
        </template>
      </el-table-column> -->
      <el-table-column prop="withdraw_remark" :label="t('routes.finance_manage_page.payment_note')" align="center"
        width="120"></el-table-column>
      <el-table-column prop="confirm_name" :label="t('routes.finance_manage_page.risk_reviewp')" align="center"
        width="80"></el-table-column>
      <el-table-column prop="withdraw_at" :label="t('routes.finance_manage_page.complete_time')" align="center"
        width="180">
        <template #default="scope">
          {{ $filters.format(scope.row.withdraw_at, false) }}
        </template>
      </el-table-column>
      <el-table-column prop="withdraw_name" :label="t('routes.finance_manage_page.payer')" align="center"
        width="120"></el-table-column>
      <el-table-column prop="state" :label="t('routes.finance_manage_page.order_status')" align="center" width="120">
        <template #default="scope">
          <span v-if="scope.row.state == 378 || scope.row.state == 379" style="color: #F56C6C">{{ t('global.being_audit')
          }}</span>
          <span v-else :style="{ color: scope.row.state == 374 ? '#67C23A' : '#F56C6C' }">{{ scope.row?.state&& WithdrawalToText(scope.row.state)
          }}</span>
        </template>
      </el-table-column>
      </el-table>
      <el-pagination v-show="total2 > 0" :total="total2" v-model:current-page="VipDetaiPage.page" 
      v-model:page-size="VipDetaiPage.page_size" @current-change="getVIPWithdrawList" @size-change="getVIPWithdrawList" />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref,computed,inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import type { ElForm } from 'element-plus'
import  { ElMessage,ElMessageBox } from 'element-plus'
import {  getInvitationList,memberAgentCancel } from '@/http/modules/agent'
import {  historyList } from '@/http/modules/withdrawal'
import { empty } from '@/components/serch-form/empty';
import { useVipLevel, useWithdrawalStatus, } from '@/utils/getJson';
const { toVipText } = useVipLevel();
import { appendBRL, toFixedN, toFixedNReport } from '@/utils/int';
import { downExcel } from '@/utils/file';
import useShortcuts from '@/components/serch-form/useShortcuts';
import dayjs from 'dayjs';
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'invitationList',
  components: {
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const { WithdrawalToText } = useWithdrawalStatus();
    const { shortcuts } = useShortcuts();
    const route = useRoute();
    const loading = ref(false);
    const ids = ref([]);
    const open = ref(false)
    const title = ref('');
    const defaultTime = [
      dayjs(shortcuts.value[0].value[0]).format('YYYY-MM-DD'),
      dayjs(shortcuts.value[0].value[1]).format('YYYY-MM-DD'),
    ];
    const channels = ref([
      { key: t('global.checkall'), value: '0' },
      { key: t('routes.agent.nationalAgent'), value: '1' },
      { key: t('routes.agent.channelAgent'), value: '2' }
    ])
    const timer = ref(defaultTime);
    const queryFormEl = ref<FormInstance|null>(null);
    const total = ref();
    const total2 = ref();
    const VipDetaiPage = reactive({
      page: 1,
      page_size: 10,
      username:'',
      start_time: computed(() => timer.value[0] ?? ''),
      end_time: computed(() => timer.value[1] ?? ''),
    })
    const queryParams = reactive({
      page: 1,
      page_size: 10,
      start_time: computed(() => timer.value[0] ?? ''),
      end_time: computed(() => timer.value[1] ?? ''),
      // vip: '',
      username:'',
      day:'',
      uid:'',
      agency_type:"0", //代理类型
      cid:''
    })
    const sort =ref("")
    const listData = ref([]);
    const withdraw_data = ref([]);
    const withdraw_amount = ref(0);
    const getList = () => {
      loading.value = true;
      getInvitationList({...empty.preProcessData(queryParams,true),sort:sort.value}).then((res: any) => {
       if( queryParams.page===1){
        total.value = res.data.t || 0;
       }
        listData.value = res.data.d || []
      }).finally(() => {
        loading.value = false;
      })
    }
    const sortChange = ({ column, prop, order }:{column:Object[],prop:string,order:string})=>{
      let c_sort = "";
      if(prop){
        c_sort = `${prop} ${order =='descending' ? 'des' : 'asc'}`
      }
      sort.value = c_sort;
      getList() 
    }
    // 获取会员提现详情
    const getVIPWithdrawList = ()=>{
      historyList(VipDetaiPage).then((res)=>{
        if(res.status){
          total2.value = res.data?.t;
          withdraw_data.value = res.data?.d||[];
          withdraw_amount.value = res.data?.agg?.amount||0;
        }
      })
    }
    const handleDetail = async (row:any)=>{
      console.log(row);
      title.value = t('routes.agent.withdrawal_history')
      VipDetaiPage.username = row.username;
      await getVIPWithdrawList();
      open.value = true;
    } 
    /**
     * @description 取消代理
     * @param uid 用户id
     */
    const  setMemberAgentCancel =  (uid:string)=>{
      ElMessageBox.confirm('确认取消吗？', t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      })
        .then(async () => {
          let res = await memberAgentCancel({uid})
          if (res.status) {
            ElMessage.success({
              message: '取消成功',
              type: 'success'
            });
            queryParams.page = 1;
            getList();
          }
        })
        .catch(() => {});
    }
      const resetQuery = () => {
        if (queryFormEl.value) {
          queryFormEl.value.resetFields();
          queryParams.page = 1;
          timer.value = defaultTime;
        }
        getList();
      }
      const handleQuery = () => {
        queryParams.page = 1;
        getList();
      }
      const  cancel = ()=>{
        open.value = false;
        VipDetaiPage.page = 1;
        VipDetaiPage.page_size = 10;
        VipDetaiPage.username = '';
        withdraw_data.value = [];
        withdraw_amount.value = 0;
      }
      const exportHanlder = ()=>{
        const filename = `${t('routes.agent.invitation_list')}-${queryParams.start_time}-${queryParams.end_time}`
        let {ExcelData,titles} = formatExcelData()
        downExcel(ExcelData,titles,filename)
      }
      const formatExcelData =()=>{
        let  ExcelData:Array<{[name:string]:string}> = []
        listData.value.map((row: any) => {
          ExcelData.push({
            report_time: dayjs(row.report_time*1000).format("YYYY-MM-DD"),
            cid: row.cid,
            cname: row.cname,
            uid: row.uid,
            username: row.username,
            total_commissions: row.total_commissions,
            total_team_num: row.total_team_num,
            deposit_withdraw_diff: row.deposit_withdraw_diff,
            deposit_mem_count: row.deposit_mem_count,
            deposit_amount: row.deposit_amount,
            withdraw_amount: row.withdraw_amount,
            direct_push_num: row.direct_push_num,
            direct_push_deposit_num: row.direct_push_deposit_num,
            direct_push_fd_amount: row.direct_push_fd_amount,
            direct_push_fd_bonus: row.direct_push_fd_bonus,
            direct_push_deposit: row.direct_push_deposit,
            direct_push_withdraw_amount: row.direct_push_withdraw_amount,
            direct_push_flow: row.direct_push_flow,
            direct_push_flow_bonus: row.direct_push_flow_bonus,
            direct_push_dw_diff: row.direct_push_dw_diff,
            lvl_second_num: row.lvl_second_num,
            lvl_second_deposit_num: row.lvl_second_deposit_num,
            lvl_second_fd_amount: row.lvl_second_fd_amount,
            lvl_second_fd_bonus: row.lvl_second_fd_bonus,
            lvl_second_deposit_amount: row.lvl_second_deposit_amount,
            lvl_second_withdraw_amount: row.lvl_second_withdraw_amount,
            lvl_second_flow: row.lvl_second_flow,
            lvl_second_flow_bonus: row.lvl_second_flow_bonus,
            lvl_second_dw_diff: row.lvl_second_dw_diff,
            lvl_three_num: row.lvl_three_num,
            lvl_three_deposit_num: row.lvl_three_deposit_num,
            lvl_three_fd_amount: row.lvl_three_fd_amount,
            lvl_three_fd_bonus: row.lvl_three_fd_bonus,
            lvl_three_deposit_amount: row.lvl_three_deposit_amount,
            lvl_three_withdraw_amount: row.lvl_three_withdraw_amount,
            lvl_three_flow: row.lvl_three_flow,
            lvl_three_flow_bonus: row.lvl_three_flow_bonus,
            lvl_three_dw_diff: row.lvl_three_dw_diff,
            created_ip: row.created_ip,
            typeName:
              row.cid === "0"
                ? t("routes.agent.nationalAgent")
                : t("routes.agent.channelAgent"),
            created_at: dayjs(row.created_at*1000).format("YYYY-MM-DD"),
          });
        });
        let titles = [
          t('routes.report_center_page.report_time') ,
            "渠道id",
            t('routes.tips.qdmc'),
            t('routes.activity.userId'),
            t('routes.activity.username'),
            t('routes.agent.total_commissions'),
            t('routes.agent.total_team_num') ,
            t('routes.agent.deposit_withdraw_diff'),
            "团队充值人数",
            "团队充值金额",
            "团队提现金额",
            t('routes.agent.direct_push_num'),
            t('routes.agent.direct_push_deposit_num'),
            "直推首充金额",
            t('routes.agent.direct_push_fd_bonus'),
            t('routes.agent.direct_push_deposit'),
            "直推提款金额",
            t('routes.agent.direct_push_flow'),
            t('routes.agent.direct_push_flow_bonus'),
            t("routes.agent.direct_push_dw_diff"),
            t("routes.agent.lvl_second_num"),
            "二级充值人数",
            "二级首充金额",
            "二级充值奖励",
            t("routes.agent.lvl_second_deposit_amount"),
            "二级提款金额",
            t("routes.agent.lvl_second_flow"),
            t("routes.agent.lvl_second_flow_bonus"),
            t("routes.agent.lvl_second_dw_diff"),
            t('routes.agent.lvl_three_num'),
            "三级充值人数",
            "三级首充金额",
            "三级充值奖励",
            t("routes.agent.lvl_three_deposit_amount"),
            "三级提款金额",
            t("routes.agent.lvl_three_flow"),
            t("routes.agent.lvl_three_flow_bonus"),
            t("routes.agent.lvl_three_dw_diff"),
            t("routes.agent.created_ip"),
            t('routes.agent.agent_type'),
            t("global.creat_time"),
          ]
          return {ExcelData,titles}
      }
      getList();
      return {
        route,
        loading,
        ids,
        open,
        queryParams,
        total,
        total2,
        listData,
        title,
        queryFormEl,
        timer,
        shortcuts,
        t, getList,
        handleDetail,
        cancel,
        VipDetaiPage,
        getVIPWithdrawList,
        WithdrawalToText,
        appendBRL,toVipText,
        resetQuery, handleQuery,withdraw_data,withdraw_amount,
        channels,
        setMemberAgentCancel,
        exportHanlder,
        sortChange
      };
    }
  });
</script>

<style lang="scss" scoped>
.withdraw-head{
  margin: 10px 0;
  >span:first-of-type{
    margin-right: 20px;
    i{
      color:#409EFF;
      margin-right: 5px;  
    }
   
  }
  .red{
      color: #F56C6C;
      margin: 0 10px;
    }
}
</style>
