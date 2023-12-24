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
    <el-row :gutter="16">
      <staticCard v-for="item of data" :key="item.key" :icon="item.icon" :title="item.title" :suffix="item.suffix"
        :value="item.value" :color="item.color"></staticCard>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue';
import { getStatisticalData } from '@/http/modules/report'
import { useI18n } from 'vue-i18n';
import type { ElForm } from 'element-plus'
import useShortcuts from '@/components/serch-form/useShortcuts';
import dayjs from 'dayjs';
import staticCard from './components/staticCard.vue'
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'PlatformReportGame',
  components: {
    staticCard
  },
  setup() {

    const { t } = useI18n({ useScope: 'global' });
    const { shortcuts } = useShortcuts();
    const defaultTime = [
      dayjs(shortcuts.value[0].value[0]).format('YYYY-MM-DD HH:mm:ss'),
      dayjs(shortcuts.value[0].value[1]).format('YYYY-MM-DD HH:mm:ss'),
    ];
    const timer = ref(defaultTime);
    const data = ref<any[]>([
      //注册人数
      {
        key: 'regist_count',
        title: t('routes.report_center_page.reg_personal'),
        value: '',
        suffix: t('routes.report_center_page.people'),
        color: '#67C23A',
        icon: 'user',
      },
      //活跃人数
      {
        key: 'active_count',
        title: t('routes.report_center_page.active_count'),
        value: '',
        suffix: t('routes.report_center_page.people'),
        color: '#67C23A',
        icon: 'user-solid',
      },
      //总存款人数
      {
        key: 'deposit_mem_count',
        title: t('routes.report_center_page.deposit_mem_count'),
        value: '',
        suffix: t('routes.report_center_page.people'),
        color: '#67C23A',
        icon: 's-custom',
      },
      //提款人数
      {
        key: 'withdrawal_mem_count',
        title: t('routes.report_center_page.withdrawal_mem_count'),
        value: '',
        suffix: t('routes.report_center_page.people'),
        color: '#67C23A',
        icon: 's-custom',
      },
      //下注人数
      {
        key: 'bet_mem_count',
        title: t('routes.report_center_page.bet_mem_count'),
        value: '',
        suffix: t('routes.report_center_page.people'),
        color: '#67C23A',
        icon: 'thumb',
      },
      //转换率
      {
        key: 'conversion_rate',
        title: t('routes.report_center_page.conversion_rate'),
        value: '',
        suffix: '%',
        color: '#409EFF',
        icon: 'refresh-right',
      },
      //一存人数
      {
        key: 'first_deposit_count',
        title: t('routes.report_center_page.first_deposit_count'),
        value: '',
        suffix: 'R$',
        color: '#E6A23C',
        icon: 's-check',
      },
      //二存人数
      {
        key: 'second_deposit_count',
        title: t('routes.report_center_page.s_deposit'),
        value: '',
        suffix: 'R$',
        color: '#E6A23C',
        icon: 's-check',
      },
      //三存人数
      {
        key: 'third_deposit_count',
        title: t('routes.report_center_page.t_deposit'),
        value: '',
        suffix: 'R$',
        color: '#E6A23C',
        icon: 's-check',
      },
      //首存金额
      {
        key: 'first_deposit_amount',
        title: t('routes.report_center_page.first_deposit_amount'),
        value: '',
        suffix: 'R$',
        color: '#409EFF',
        icon: 'wallet',
      },
      //二存金额
      {
        key: 'second_deposit_amount',
        title: t('routes.report_center_page.second_deposit_amount'),
        value: '',
        suffix: 'R$',
        color: '#409EFF',
        icon: 'wallet',
      },
      //三存金额
      {
        key: 'third_deposit_amount',
        title: t('routes.report_center_page.third_deposit_amount'),
        value: '',
        suffix: 'R$',
        color: '#409EFF',
        icon: 'wallet',
      },

      // 存款金额
      {
        key: 'deposit_amount',
        title: t('routes.report_center_page.deposit_amount'),
        value: '',
        suffix: 'R$',
        color: 'red',
        icon: 'wallet',
      },
      //提款金额
      {
        key: 'withdrawal_amount',
        title: t('routes.report_center_page.withdrawal_amount'),
        value: '',
        suffix: 'R$',
        color: 'red',
        icon: 'bank-card',
      },
      //人均首存
      {
        key: 'avg_first_deposit_amount',
        title: t('routes.report_center_page.avg_first_deposit_amount'),
        value: '',
        suffix: 'R$',
        color: 'red',
        icon: 'wallet',
      },
      //存提差
      {
        key: 'deposit_withdrawal_sub',
        title: t('routes.report_center_page.deposit_withdrawal_sub'),
        value: '',
        suffix: 'R$',
        color: '#409EFF',
        icon: 'remove-outline',
      },
      //存提比例
      {
        key: 'deposit_withdrawal_rate',
        title: t('routes.report_center_page.deposit_withdrawal_rate'),
        value: '',
        suffix: '%',
        color: '#409EFF',
        icon: 'info',
      },
      //下注笔数
      {
        key: 'bet_num_count',
        title: t('routes.report_center_page.bet_num_count'),
        value: '',
        suffix: t('routes.report_center_page.limit_num'),
        color: '#409EFF',
        icon: 'user',
      },
      //投注金额
      {
        key: 'bet_amount',
        title: t('routes.report_center_page.bet_amount'),
        value: '',
        suffix: 'R$',
        color: '#F56C6C',
        icon: 'money',
      },
      //公司输赢
      {
        key: 'company_net_amount',
        title: t('routes.report_center_page.company_net_amount'),
        value: '',
        suffix: 'R$',
        color: '#F56C6C',
        icon: 'coordinate',
      },
      //人均公司输赢
      {
        key: 'avg_company_net_amount',
        title: t('routes.report_center_page.avg_company_net_amount'),
        value: '',
        suffix: 'R$',
        color: '#F56C6C',
        icon: 'coordinate',
      },
      //提前结算
      {
        key: 'presettle',
        title: t('routes.report_center_page.presettle'),
        value: '',
        suffix: 'R$',
        color: '#F56C6C',
        icon: 'position',
      },
      //盈利
      {
        key: 'profit_amount',
        title: t('routes.report_center_page.profit_amount'),
        value: '',
        suffix: 'R$',
        color: 'red',
        icon: 'coin',
      },
      //公司收入
      {
        key: 'company_revenue',
        title: t('routes.report_center_page.company_revenue'),
        value: '',
        suffix: 'R$',
        color: 'red',
        icon: 'news',
      },
    ]);
    const queryParams = reactive({
      page: 1,
      page_size: 10,
      start_time: computed(() => timer.value[0] ?? ''),
      end_time: computed(() => timer.value[1] ?? ''),
    })
    const queryFormEl = ref<FormInstance | null>(null);
    const getData = () => {
      getStatisticalData(queryParams).then((res: Record<string, any>) => {
        data.value = data.value.map((item) => {
          return { ...item, value: res.data?.[item.key] }
        });
        console.log(data.value);
      })
    }
    const resetQuery = () => {
      if (queryFormEl.value) {
        queryFormEl.value.resetFields();
        timer.value = defaultTime;
        queryParams.page = 1;
      }
      getData();
    }
    const handleQuery = () => {
      queryParams.page = 1;
      getData();
    }
    getData();
    return {
      t, timer, queryParams, shortcuts, resetQuery, handleQuery, data
    }
  },
});

</script>
<style scoped></style>
