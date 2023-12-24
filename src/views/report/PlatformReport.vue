<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto">
      <el-form-item :label="t('routes.report_center_page.report_time')" prop="start_time">
        <el-date-picker v-model="timer" type="datetimerange" unlink-panels value-format="YYYY-MM-DD HH:mm:ss"
          :range-separator="t('global.zhi')" :start-placeholder="t('global.start_date')"
          :end-placeholder="t('global.end_date')" :shortcuts="shortcuts">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ t('global.search')
        }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ t('global.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="listData">
      <el-table-column :label="t('routes.report_center_page.reg_personal') " align="center" prop="regist_count" />
      <el-table-column :label="t('routes.report_center_page.active_count')" align="center" prop="active_count" />
      <!-- <el-table-column :label="t('routes.report_center_page.efficient_active_count')" align="center" prop="efficient_active_count" /> -->

      <!-- 存款人数 -->
      <el-table-column :label="t('routes.report_center_page.deposit_mem_count') + '(R$)'" align="center" prop="deposit_mem_count" min-width="150px">
          <template #default="{row}">
            <div class="cell-row"><span>{{ t('routes.report_center_page.first_deposit_count')}}</span> : <span>{{row.first_deposit_count }}</span></div>
            <div class="cell-row"><span>{{ t('routes.report_center_page.s_deposit')}}</span> : <span>{{row.second_deposit_count }}</span></div>
            <div class="cell-row"><span>{{ t('routes.report_center_page.t_deposit')}}</span> : <span>{{row.third_deposit_count }}</span></div>
          </template>
      </el-table-column>
      <!-- end -->


      <el-table-column :label="t('routes.report_center_page.conversion_rate') + '(%)'" align="center" prop="conversion_rate" />
      <!-- <el-table-column :label="t('routes.report_center_page.first_deposit_amount') + '(R$)'" align="center" prop="first_deposit_amount" />
      <el-table-column :label="t('routes.report_center_page.second_deposit_amount') + '(R$)'" align="center" prop="second_deposit_amount" />
      <el-table-column :label="t('routes.report_center_page.third_deposit_amount') + '(R$)'" align="center" prop="third_deposit_amount" /> -->
      <el-table-column :label="t('routes.report_center_page.avg_first_deposit_amount') + '(R$)'" align="center" prop="avg_first_deposit_amount" />
      <el-table-column :label="t('routes.report_center_page.withdrawal_mem_count') + '(R$)'" align="center" prop="withdrawal_mem_count" />
      <el-table-column :label="t('routes.report_center_page.deposit_amount') + '(R$)'" align="center" prop="deposit_amount" />
      <el-table-column :label="t('routes.report_center_page.withdrawal_amount') + '(R$)'" align="center" prop="withdrawal_amount" />
      <el-table-column :label="t('routes.report_center_page.deposit_withdrawal_sub') + '(R$)'" align="center" prop="deposit_withdrawal_sub" />
      <el-table-column :label="t('routes.report_center_page.deposit_withdrawal_rate') + '(R$)'" align="center" prop="deposit_withdrawal_rate" />
      <el-table-column :label="t('routes.report_center_page.bet_mem_count')" align="center" prop="bet_mem_count" />
      <el-table-column :label="t('routes.report_center_page.bet_num_count') + '(R$)'" align="center" prop="bet_num_count" />
      <el-table-column :label="t('routes.report_center_page.bet_amount') + '(R$)'" align="center" prop="bet_amount" />
      <el-table-column :label="t('routes.report_center_page.valid_bet_amount') + '(R$)'" align="center"
        prop="valid_bet_amount" />
      <el-table-column :label="t('routes.report_center_page.company_net_amount') + '(R$)'" align="center"
        prop="company_net_amount" />
      <el-table-column :label="t('routes.report_center_page.avg_company_net_amount') + '(R$)'" align="center"
        prop="avg_company_net_amount" />
      <el-table-column :label="t('routes.report_center_page.presettle') + '(R$)'" align="center" prop="presettle" />
      <el-table-column :label="t('routes.report_center_page.profit_amount') + '(R$)'" align="center" prop="profit_amount" />
      <el-table-column :label="t('routes.report_center_page.company_revenue')+ '(R$)'" align="center" prop="company_revenue" />
      <el-table-column prop="report_time" :label="t('routes.report_center_page.report_time')"
        align="center">
        <template #default="{ row }">
          {{ dayjs.unix(row.report_time).format('YYYY-MM-DD') }}
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
import { useRoute } from 'vue-router';
import type { ElForm } from 'element-plus'
import { getReportPlatform } from '@/http/modules/report'
import { empty } from '@/components/serch-form/empty';
import useShortcuts from '@/components/serch-form/useShortcuts';
import dayjs from 'dayjs';
import { usePlatform } from '@/utils/requestOptions';
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'signRewardList',
  components: {
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const { list: PlatOptions, toPlatformText } = usePlatform();
    const { shortcuts } = useShortcuts();
    const route = useRoute();
    const title = ref('');
    const defaultTime = [
      dayjs(shortcuts.value[0].value[0]).format('YYYY-MM-DD HH:mm:ss'),
      dayjs(shortcuts.value[0].value[1]).format('YYYY-MM-DD HH:mm:ss'),
    ];
    const timer = ref(defaultTime);
    const queryFormEl = ref<FormInstance | null>(null);
    const total = ref();
    const queryParams = reactive({
      page: 1,
      page_size: 10,
      start_time: computed(() => timer.value[0] ?? ''),
      end_time: computed(() => timer.value[1] ?? ''),
    })
    const listData = ref([]);
    const getList = () => {
      getReportPlatform({ ...empty.preProcessData(queryParams)}).then((res: any) => {
        if (queryParams.page === 1) {
          total.value = res.data.t;
        }
        listData.value = res.data.d
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
      if (queryFormEl.value) {
        queryFormEl.value.validate((valid: boolean, fields: any) => {
          if (valid) {
            getList();
          }
        })
      }
    }
    getList();
    return {
      route,
      queryParams,
      total,
      listData,
      title,
      queryFormEl,
      timer,
      shortcuts,
      t, getList,
      resetQuery, handleQuery, PlatOptions, toPlatformText,dayjs
    };
  }
});
</script>

<style lang="scss" scoped></style>
