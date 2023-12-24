<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto">

      <el-form-item :label="t('routes.tips.zd_id')" prop="bill_no">
        <el-input v-model="queryParams.bill_no" :placeholder="t('routes.activity.username_placeholder')" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('routes.activity.username')" prop="username">
        <el-input v-model="queryParams.username" :placeholder="t('routes.activity.username_placeholder')" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('routes.activity.userId')" prop="uid">
        <el-input v-model="queryParams.uid" :placeholder="t('routes.activity.userId')" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('global.game_name')" prop="game_name">
        <el-input v-model="queryParams.game_name" :placeholder="t('routes.tips.enter_ganmename')" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('global.yx_sy')" prop="win_lose" :placeholder="t('global.please_choose')">
        <el-select v-model="queryParams.win_lose">
          <el-option v-for="item in winOrlose" :key="item.value" :label="item.label"
            :value="item.value+''"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('global.plat_type')" prop="plat_type" :placeholder="t('global.please_choose')">
        <el-select v-model="queryParams.plat_type">
          <el-option v-for="item in gameTypeOptions" :key="item.value" :label="item.label"
            :value="item.value+''"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('routes.site_page.game_plat')" prop="pid" :placeholder="t('global.please_choose')">
            <el-select v-model="queryParams.pid">
              <el-option v-for="item in PlatOptions" :key="item.value" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
      </el-form-item>
      <el-form-item :label="t('global.settlement_state')" prop="v" :placeholder="t('global.please_choose')">
        <el-select v-model="queryParams.flag">
          <el-option v-for="item in WinningType" :key="item.value" :label="item.label"
            :value="item.value+''"></el-option>
        </el-select>
      </el-form-item>
      
      <div style="display: flex;">
        <el-form-item :label="t('global.time.time_type')" prop="time_flag" :placeholder="t('global.please_choose')">
        <el-select v-model="queryParams.time_flag">
          <el-option v-for="item in timeTypeOptions" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="day">
        <el-date-picker v-model="timer" type="datetimerange" @change="timerChange" unlink-panels
          :default-value="defaultTime"
          value-format="YYYY-MM-DD HH:mm:ss" :range-separator="t('global.zhi')"
          :start-placeholder="t('global.start_date')" :end-placeholder="t('global.end_date')" :shortcuts="shortcuts">
        </el-date-picker>
        <el-button class="ml10" type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ t('global.search')
        }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ t('global.reset') }}</el-button>
      </el-form-item>
      </div>
    </el-form>

    <el-table :data="listData" show-summary :summary-method="getSummaries">
      <el-table-column :label="t('routes.tips.zd_id')" align="center" prop="bill_no" />
      <el-table-column :label="t('routes.activity.userId')" align="center" prop="uid" />
      <el-table-column :label="t('routes.activity.username')" align="center" prop="name" />
      <el-table-column :label="t('global.down_amount')+'(R$)'" align="center" prop="bet_amount"/>
      <!-- <el-table-column :label="t('routes.vip_list_page.odds')" align="center" prop="odds" /> -->
      <el-table-column :label="t('global.yx_sy')+'(R$)'" align="center" prop="net_amount">
        <template #default="{row}">
            <span :style="{color:row.net_amount>=0?'#67C23A':'#F56C6C'}">{{row.net_amount}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('routes.operation_manage_page.valid_water')+'(R$)'" align="center" prop="valid_bet_amount"/>
      <el-table-column :label="t('global.settlement_state')" align="center" prop="flag" :formatter="(row:any)=>formatterFn(row.flag,WinningType)"/>
      <!-- <el-table-column :label="t('routes.vip_list_page.superior_agency')" align="left" prop="parent_name"/> -->
      <el-table-column :label="t('routes.site_page.game_plat')" align="left" prop="api_type">
        <template #default="{row}">
          {{ t(`global.PLATFORM_PLATS_HEYING.p${row.api_type}`) }}
        </template>
      </el-table-column>
      <el-table-column prop="created_at" :label="t('global.valid_detail')" align="left" width="300">
        <template #default="{ row }">
          <div>{{ t('global.plat_type') }}：{{ formatterFn(row.game_type,gameTypeOptions) }}</div>
          <div>{{ t('global.game_name') }}：{{ row.game_name }}</div>
          <div>{{ t('global.time.bet_time') }}：{{ $filters.format(row.bet_time) }}</div>
          <div>{{ t('global.time.settle_time') }}：{{ $filters.format(row.settle_time) }}</div>
        </template>
      </el-table-column>
      
      <el-table-column :label="t('global.operating')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button size="mini" type="text" icon="el-icon-document" @click="handleDetail(scope.row)">详情</el-button>
          <!-- <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>  -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryParams.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size" @current-change="getList" @size-change="getList" />
    <!-- 用户详情 -->
    <el-dialog :title="title" v-model="open" width="800px" append-to-body @close="cancel">
      <el-card>
        <template #header>
          <div class="card-header">
            <i class="el-icon-user mr10"></i>
            <span class="mx-1" style="color: #409EFF;">{{ gameInfo?.name }}</span>
          </div>
        </template>
        <el-descriptions class="margin-top"  :column="3" direction="vertical" border>
          <el-descriptions-item  :label="t('routes.tips.zd_id')"><div style="color:#E6A23C;">{{ gameInfo.bill_no }}</div></el-descriptions-item>
          <el-descriptions-item  :label="t('global.plat_type')"><div>{{ formatterFn(gameInfo.game_type,gameTypeOptions) }}</div></el-descriptions-item>
          <el-descriptions-item  :label="t('global.game_name')"><div>{{ gameInfo.game_name}}</div></el-descriptions-item>
          <el-descriptions-item  :label="t('global.settlement_state')"><div>{{ formatterFn(gameInfo.flag,WinningType) }}</div></el-descriptions-item>
          <el-descriptions-item  :label="t('global.down_amount')+'(R$)'"><div><span>{{ gameInfo.bet_amount}}</span></div></el-descriptions-item>
          <el-descriptions-item  :label="t('routes.operation_manage_page.valid_water')+'(R$)'"><div><span>{{ gameInfo.valid_bet_amount}}</span></div></el-descriptions-item>
          <el-descriptions-item  :label="t('routes.vip_list_page.odds')"><div><span>{{ gameInfo.odds}}</span></div></el-descriptions-item>
          <el-descriptions-item  :label="t('global.yx_sy')+'(R$)'"><div><span :style="{color: gameInfo.net_amount>=0?'#67C23A':'#F56C6C'}">{{ gameInfo.net_amount}}</span></div></el-descriptions-item>
          <el-descriptions-item  :label="t('global.time.bet_time')"><div>{{ $filters.format(gameInfo.settle_time) }}</div></el-descriptions-item>
          <el-descriptions-item  :label="t('global.time.settle_time')"><div>{{ $filters.format(gameInfo.settle_time)  }}</div></el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed,onMounted} from 'vue';
import { useI18n } from 'vue-i18n';
import type { ElForm } from 'element-plus'
import { betRecordList } from '@/http/modules/bet'
import { empty } from '@/components/serch-form/empty';
import useShortcuts from '@/components/serch-form/useShortcuts';
import dayjs from 'dayjs';
import { useGameTypeList,useTimeType } from '@/utils/getJson';
import { usePlatform } from '@/utils/requestOptions';
import {  WinningType } from '@/utils/selectOptions';
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'signRewardList',
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const { GameTypeListData:gameTypeOptions} = useGameTypeList(true);
    const { timeTypeOptions,timeTypeToText } = useTimeType();

    const { shortcuts } = useShortcuts();
    
    const {list:PlatOptions, toPlatformText} = usePlatform();
    // 默认时间为今天
    const defaultTime = [
      dayjs(shortcuts.value[0].value[0]).format('YYYY-MM-DD HH:mm:ss'),
      dayjs(shortcuts.value[0].value[1]).format('YYYY-MM-DD HH:mm:ss'),
    ];
    const scopetatistical = ref({
      bet_amount:'',
      valid_bet_amount:'',
      net_amount:'',
    })
    const timer = ref<any[]>(defaultTime);
    console.log(timer.value);
    const open = ref(false)
    const title = ref('');
    const queryFormEl = ref<FormInstance | null>(null);
    const total = ref();
    const gameInfo = ref<any>({});
    const queryParams = reactive({
      page: 1,
      page_size: 10,
      game_name:'',
      username: '',
      bill_no:'',
      start_time: computed(() => timer.value[0] ? timer.value[0] : ''),
      // end_time: computed(() => timer.value[0] ? dayjs(timer.value[1]).format('YYYY-MM-DD HH:mm:ss') : ''),
      end_time: computed(() => timer.value[0] ? timer.value[1]: ''),
      tester: '',
      email: '',
      plat_type:null,
      pid:null,
      time_flag:'1',
      flag:'',
      win_lose:'',
      uid:""
    })
    const winOrlose =[
      {
        label:t('global.checkall'),
        value:''
      },
      {
        label:t('global.win'),
        value:'1'
      },
      {
        label:t('global.lose'),
        value:'2'
      }
    ];
    const formatterFn = (val:any,options:any[])=>{
      const res = options.find((item)=>String(item.value)=== String(val));
      return res?.label??'-'
    }
    const listData = ref([]);
    const getList = () => {
      betRecordList({ ...empty.preProcessData(queryParams) }).then((res: any) => {
      if(res.status){
        if (queryParams.page === 1) {
          total.value = res?.data?.t;
          const {bet_amount,valid_bet_amount,net_amount} = res?.data?.agg;
          scopetatistical.value = {
            bet_amount,
            valid_bet_amount,
            net_amount
          }
        }
      }
        listData.value = res.data.d
      })
    }
    const resetQuery = () => {
      if (queryFormEl.value) {
        queryFormEl.value.resetFields();
        timer.value = [...defaultTime]
      }
      queryParams.page = 1;
      getList();
    }
    const handleQuery = () => {
      queryParams.page = 1;
      getList();
    }
    const timerChange = () => {
      console.log(timer.value);
      console.log(queryParams)
    }
    const handleDetail = (row: any) => {
      title.value = t('routes.vip_list_page.bet_recourd');
      gameInfo.value = row;
      open.value = true;
    }
    // 
    const cancel = () => {
      open.value = false;
    }
    //表位合计行
    const getSummaries = (param: any) => {
      const { columns, data } = param
      console.log('3213',param);
      const sums: string[] = []
      columns.forEach((column:any, index:number) => {
        if (index === 0) {
          sums[index] = t('global.total');
          return
        }
      if(['bet_amount','net_amount','valid_bet_amount'].includes(column.property)){
          sums[index] = scopetatistical.value[column.property as keyof typeof scopetatistical.value]
      } else {
          sums[index] = ''
        }
  })

  return sums
}
    getList();
    // 
    return {
      open,
      queryParams,
      total,
      listData,
      title,
      queryFormEl,
      handleDetail,
      t, getList, timer, shortcuts, timerChange,formatterFn,
      resetQuery, handleQuery, gameInfo,cancel,winOrlose,
      gameTypeOptions,PlatOptions,timeTypeOptions,defaultTime,WinningType,getSummaries
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep(.el-descriptions__body){
  >table>tbody>tr{
    display: flex;
    width: 718px;
    // gap: 10px;
    >td{
      width: 33.33%;
      font-size: 14px;
      .el-descriptions__label{
        font-weight: bolder;
        color: #000;
        width: 100%;
      }
    }
    >th{
      width: 33.33%;
    }
  }
  tr + tr{
    // border-top:1px dashed #efefef ;
    // padding-top: 10px;
  }
}

</style>
