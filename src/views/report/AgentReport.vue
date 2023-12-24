<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto">
      <el-form-item :label="t('routes.activity.userId')" prop="userId">
        <el-input v-model="queryParams.uid" :placeholder="t('routes.activity.userId_placeholder')" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('routes.activity.username')" prop="username">
        <el-input v-model="queryParams.username" :placeholder="t('routes.activity.username_placeholder')" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="$t('routes.vip_list_page.reg_time')" prop="day">
        <el-date-picker v-model="timer" type="datetimerange" unlink-panels
          value-format="YYYY-MM-DD HH:mm:ss" :range-separator="t('global.zhi')"
          :start-placeholder="t('global.start_date')" :end-placeholder="t('global.end_date')" :shortcuts="shortcuts">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{t('global.search')}}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ t('global.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb10">
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
    </el-row> -->

    <el-table  :data="listData">
      <el-table-column :label="t('routes.activity.userId')" align="center" prop="uid" />
      <el-table-column :label="t('routes.activity.username')" align="center" prop="username" />
      <el-table-column :label="t('routes.agent.total_commissions')" align="center" prop="total_commissions" />
      <el-table-column :label="t('routes.agent.wait_commissions')" align="center" prop="wait_commissions" />
      <el-table-column :label="t('routes.agent.total_team_num')" align="center" prop="total_team_num" />
      <el-table-column :label="t('routes.agent.deposit_withdraw_diff')" align="center" prop="deposit_withdraw_diff" />
      <!-- 直推详情 -->
      <el-table-column :label="t('routes.agent.direct_push')" align="center"  min-width="150">
        <template #default='{row}'>
          <el-popover effect="dark" trigger="hover" placement="top" width="auto">
              <template #default>
                <div><span class="row-label">{{t('routes.agent.direct_push_num')}}</span>：{{row.direct_push_num}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_deposit_num')}}</span>：{{row.direct_push_deposit_num}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_fd_bonus')}}</span>：{{row.direct_push_fd_bonus}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_deposit')}}</span>：{{row.direct_push_deposit}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_flow')}}</span>：{{row.direct_push_flow}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_flow_bonus')}}</span>：{{row.direct_push_flow_bonus}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_dw_diff')}}</span>：{{row.direct_push_dw_diff}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_wait_flow')}}</span>：{{row.direct_push_wait_flow}}</div>
                <div><span class="row-label">{{t('routes.agent.direct_push_wait_bonus')}}</span>：{{row.direct_push_wait_bonus}}</div>
              </template>
              <template #reference>
                <el-tag type="warning">{{t('routes.agent.direct_push_num') }}：{{row.direct_push_num}}</el-tag>
              </template>
          </el-popover>

        </template>
      </el-table-column>
      <!-- 二级代理详情 -->
      <el-table-column :label="t('routes.agent.lvl_second')" align="center"  min-width="150">
        <template #default='{row}'>
          <el-popover effect="dark" trigger="hover" placement="top" width="auto">
            <template #default>
              <div><span class="row-label">{{t('routes.agent.lvl_second_num')}}</span>：{{row.lvl_second_num}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_second_deposit_amount')}}</span>：{{row.lvl_second_deposit_amount}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_second_flow')}}</span>：{{row.lvl_second_flow}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_second_flow_bonus')}}</span>：{{row.lvl_second_flow_bonus}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_second_wait_flow')}}</span>：{{row.lvl_second_wait_flow}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_second_wait_bonus')}}</span>：{{row.lvl_second_wait_bonus}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_second_dw_diff')}}</span>：{{row.lvl_second_dw_diff}}</div>
            </template>
              <template #reference>
                <el-tag type="danger">{{t('routes.agent.lvl_second_num') }}：{{row.lvl_second_num}}</el-tag>
              </template>
            </el-popover>
        </template>
      </el-table-column> 
      <!-- 三级代理 -->
      <el-table-column :label="t('routes.agent.lvl_three')" align="center"  min-width="150">
        <template #default='{row}'>
          <el-popover effect="dark" trigger="hover" placement="top" width="auto">
            <template #default>
              <div><span class="row-label">{{t('routes.agent.lvl_three_num')}}</span>：{{row.lvl_three_num}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_three_deposit_amount')}}</span>：{{row.lvl_three_deposit_amount}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_three_flow')}}</span>：{{row.lvl_three_flow}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_three_flow_bonus')}}</span>：{{row.lvl_three_flow_bonus}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_three_wait_flow')}}</span>：{{row.lvl_three_wait_flow}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_three_wait_bonus')}}</span>：{{row.lvl_three_wait_bonus}}</div>
              <div><span class="row-label">{{t('routes.agent.lvl_three_dw_diff')}}</span>：{{row.lvl_three_dw_diff}}</div>
            </template>
              <template #reference>
                <el-tag>{{t('routes.agent.lvl_three_num') }}：{{row.lvl_three_num}}</el-tag>
              </template>
            </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="t('routes.agent.withdraw_amount')" align="center" prop="withdraw_amount" />
      <el-table-column :label="t('routes.agent.created_ip')" align="center" prop="created_ip" />
      <el-table-column prop="created_at" :label="t('global.creat_time')" align="center">
        <template #default="{ row }">
          {{ $filters.format(row.created_at, false) }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryParams.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size" @current-change="getList" @size-change="getList" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref,computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import type { ElForm } from 'element-plus'
import {  getInvitationList } from '@/http/modules/agent'
import { empty } from '@/components/serch-form/empty';
import useShortcuts from '@/components/serch-form/useShortcuts';
import dayjs from 'dayjs';
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'signRewardList',
  components: {
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const { shortcuts } = useShortcuts();
    const route = useRoute();
    const loading = ref(false);
    const ids = ref([]);
    const open = ref(false)
    const title = ref('');
    const defaultTime = [
      dayjs(shortcuts.value[0].value[0]).format('YYYY-MM-DD HH:mm:ss'),
      dayjs(shortcuts.value[0].value[1]).format('YYYY-MM-DD HH:mm:ss'),
    ];
    const timer = ref(defaultTime);
    const queryFormEl = ref<FormInstance|null>(null);
    const total = ref();
    const queryParams = reactive({
      page: 1,
      page_size: 10,
      start_time: computed(() => timer.value[0] ?? ''),
      end_time: computed(() => timer.value[1] ?? ''),
      // vip: '',
      username:'',
      day:'',
      uid:''
    })
    const listData = ref([]);
    const getList = () => {
      loading.value = true;
      getInvitationList({ ...empty.preProcessData(queryParams)}).then((res: any) => {
       if( queryParams.page===1){
        total.value = res.data.t;
       }
        listData.value = res.data.d
      }).finally(() => {
        loading.value = false;
      })
    }
      const resetQuery = () => {
        if (queryFormEl.value) {
          queryFormEl.value.resetFields();
          timer.value = defaultTime;
          queryParams.page = 1;
        }
        getList();
      }
      const handleQuery = () => {
        queryParams.page = 1;
        getList();
      }
      getList();
      return {
        route,
        loading,
        ids,
        open,
        queryParams,
        total,
        listData,
        title,
        queryFormEl,
        timer,
        shortcuts,
        t, getList,
         resetQuery, handleQuery
      };
    }
  });
</script>

<style lang="scss" scoped>
</style>
