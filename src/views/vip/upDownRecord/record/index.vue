<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto">

      <el-form-item :label="t('routes.activity.username')" prop="username">
        <el-input v-model="queryParams.username" :placeholder="t('routes.activity.username_placeholder')" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('routes.activity.userId')" prop="uid">
        <el-input v-model="queryParams.uid" :placeholder="t('routes.activity.userId_placeholder')" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('global.replay_person')" prop="apply_name">
        <el-input v-model="queryParams.apply_name" :placeholder="t('routes.tips.please_applicant')" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('routes.vip_list_page.up_down')" prop="adjust_mode">
        <el-select v-model="queryParams.adjust_mode">
          <el-option v-for="(selectItem, selectIndex) in adjustOptions" :key="selectIndex" :label="selectItem.label"
            :value="selectItem.value"> </el-option>
          </el-select>
      </el-form-item>
      <el-form-item :label="t('global.state')" prop="state">
        <el-select v-model="queryParams.state" placeholder>
          <template v-for="(selectItem, selectIndex) in AuditStateType" :key="selectIndex">
            <el-option  :label="selectItem.label" v-if="selectItem.value!=='1'"
            :value="selectItem.value"> </el-option>
          </template>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('global.account_type')" prop="tester">
        <el-select v-model="queryParams.tester" placeholder>
          <el-option v-for="(selectItem, selectIndex) in AccountType" :key="selectIndex" :label="selectItem.label"
            :value="selectItem.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('global.replay_time1')" prop="day">
        <el-date-picker v-model="timer" type="datetimerange" @change="timerChange" unlink-panels
          value-format="YYYY-MM-DD HH:mm:ss" :range-separator="t('global.zhi')"
          :start-placeholder="t('global.start_date')" :end-placeholder="t('global.end_date')" :shortcuts="shortcuts">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" class="ml10" size="mini" @click="handleQuery">{{
          t('global.search')
        }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ t('global.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="listData">
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column :label="t('routes.activity.userId')" align="center" prop="uid" />
      <el-table-column :label="t('routes.activity.username')" align="center" prop="username" />
      <el-table-column :label="t('global.replay_person')" align="center" prop="apply_name" />
      <el-table-column :label="t('routes.operation_manage_page.application_amount')+'(BRL)'" align="center"
        prop="amount" />
      <el-table-column :label="t('routes.vip_list_page.up_down')" align="center" prop="adjust_mode" :formatter="(row:any)=>formatterFn(row.adjust_mode,adjustOptions)" />
      <el-table-column :label="t('global.state')" align="center" prop="state" :formatter="(row:any)=>formatterFn(row.state,AuditStateType)" />
      <el-table-column :label="t('global.account_type')" align="center" prop="tester" :formatter="(row:any)=>formatterFn(row.tester,AccountType)" />
      <el-table-column prop="apply_at" :label="t('global.replay_time1')" align="left">
        <template #default="{ row }">
          {{ $filters.format(row.apply_at,false) }}
        </template>
      </el-table-column>
      <el-table-column prop="apply_remark" :label="t('global.replay_remark1')" align="center" >
          <template #default="{ row }">
            <span>{{ decodeURI(row.apply_remark) }}</span>
          </template>
      </el-table-column>
      <el-table-column prop="review_remark" :label="t('global.review_remark')" align="center">
        <template #default="{ row }">
          <span>{{ decodeURI(row.review_remark) }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="t('global.review_name')" align="center" prop="review_name" />
      <el-table-column prop="review_at" :label="t('global.review_time')" align="left">
        <template #default="{ row }">
          {{ $filters.format(row.review_at,false) }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryParams.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size" @current-change="getList" @size-change="getList" /> 
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import  { ElForm,ElMessage } from 'element-plus'
import { getUpOrDownList, auditUpOrDown } from '@/http/modules/viplist'
import useShortcuts from '@/components/serch-form/useShortcuts';
import { AuditStateType } from '@/utils/selectOptions'
import dayjs from 'dayjs';
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'signRewardList',
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const { shortcuts } = useShortcuts();
    const defaultTime = [
      dayjs(shortcuts.value[0].value[0]).format('YYYY-MM-DD HH:mm:ss'),
      dayjs(shortcuts.value[0].value[1]).format('YYYY-MM-DD HH:mm:ss'),
    ];
    const timer = ref<any[]>(defaultTime);
    const title = ref('');
    const queryFormEl = ref<FormInstance | null>(null);
    const total = ref();
    const vipPointsform = ref({
      id: '',
      state: '', //2=审核通过,3=审核未通过
      review_remark: '',
    })
    const queryParams = reactive({
      page: 1,
      page_size: 10,
      // vip: '',
      username: '',
      apply_name:'',
      start_time: computed(() => timer.value[0] ?? ''),
      end_time: computed(() => timer.value[1] ?? ''),
      tester: '',
      state: '',
      adjust_mode:'',
      uid:'',
    })
    const AccountType = [
      {
        label: t('global.checkall'),
        value: ''
      },
      {
        label: t('global.official_account'),
        value: '1'
      },
      {
        label: t('global.test_account'),
        value: '2'
      },
      {
        label: t('routes.tips.proxy_account'),
        value: '3'
      }
    ];
   const adjustOptions = [
      {
        label: t('global.checkall'),
        value: ''
      },
      {
        label:t('routes.vip_list_page.up'),
        value: 1
      },
      {
        label: t('routes.vip_list_page.down'),
        value: 2
      }
    ];
    const formatterFn = (val:any,options:any[])=>{
      const res = options.find((item)=>String(item.value)=== String(val));
      return res?.label??'-'
    }
    const listData = ref([]);
    const getList = () => {
      getUpOrDownList( queryParams ).then((res: any) => {
        if (res.status) {
          if (queryParams.page === 1) {
            total.value = res.data.t;
          }
          listData.value = res.data.d
        }
      })
    }
    const resetQuery = () => {
      if (queryFormEl.value) {
        queryFormEl.value.resetFields();
        queryParams.page = 1;
        timer.value = [...defaultTime]
      }
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

    getList();
    // 
    return {
      queryParams,
      total,
      listData,
      title,
      queryFormEl,
      t, getList, timer, shortcuts, timerChange, AccountType, formatterFn,
      resetQuery, handleQuery,AuditStateType,adjustOptions
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep(.el-descriptions__body) {
  >table>tbody>tr {
    display: flex;
    width: 718px;
    gap: 10px;

    >td {
      width: 33.33%;
      font-size: 14px;

      .el-descriptions__label {
        font-weight: bolder;
        color: #000;
      }
    }
  }

  tr+tr {
    border-top: 1px dashed #efefef;
    padding-top: 10px;
  }
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.nbInput {
  width: 230px;
}</style>
