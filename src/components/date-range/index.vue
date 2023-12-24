<template>
  <div class="date-range">
    <span class="fs14">{{ dateType === 'month' ? t('routes.report_center_page.start_month') + ': ' : t('global.start_date') + ': ' }}</span>
    <el-date-picker
      style="width: 150px"
      :type="dateType"
      v-model="dateRange.start_date"
      size="mini"
      :format="dateType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD'"
      :default-value="default_start_date"
      placeholder="开始日期"
    />
    <span class="mgl-20 fs14">{{ dateType === 'month' ? t('routes.report_center_page.end_month') + ': ' : t('global.end_date') + ': ' }}</span>
    <el-date-picker
      class="mgr-20"
      :type="dateType"
      style="width: 150px"
      v-model="dateRange.end_date"
      size="mini"
      :format="dateType === 'month' ? 'YYYY-MM' : 'YYYY-MM-DD'"
      :default-value="default_end_date"
      placeholder="结束日期"
    />

    <span v-if="dateType !== 'month'">
      <el-button size="mini" v-for="item of date_default_ranges" :key="item.txt" @click="handleChangeDateRange(item)">
        {{ item.txt }}
      </el-button>
    </span>
    <span v-else>
      <el-button size="mini" v-for="item of month_default_ranges" :key="item.txt" @click="handleChangeDateRange(item)">
        {{ item.txt }}
      </el-button>
    </span>

    <!-- month_default_ranges -->
  </div>
</template>
<script>
import { reactive, defineComponent, watch } from 'vue';
import i18n from '@/locales';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  props: {
    dateType: {
      type: String,
      default: 'date' // 'date' 'month'
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props, ctx) {
    const date_default_ranges = useInitialDateOptions();
    const month_default_ranges = useInitialMonthOptions();
    const { t } = useI18n({ useScope: 'global' });

    const dateRange = reactive({
      start_date: date_default_ranges[0].start_date,
      end_date: date_default_ranges[0].end_date
    });

    function handleChangeDateRange(item) {
      console.log();
      dateRange.start_date = item.start_date;
      dateRange.end_date = item.end_date;
      ctx.emit('change', dateRange);
    }

    function getDateRangeValue() {
      const { start_date = new Date(), end_date = new Date() } = dateRange;

      return { start_date, end_date };
    }

    function resetTime() {
      dateRange.start_date = date_default_ranges[0].start_date;
      dateRange.end_date = date_default_ranges[0].end_date;
    }

    watch(
      () => props.dateType,
      () => {
        handleChangeDateRange(date_default_ranges[0]);
      }
    );

    return {
      dateRange,
      date_default_ranges,
      default_start_date: date_default_ranges[0].start_date,
      default_end_date: date_default_ranges[0].end_date,
      handleChangeDateRange,
      getDateRangeValue,
      resetTime,
      t,
      month_default_ranges
    };
  }
});

// 初始化时间快捷选项
function useInitialDateOptions() {
  const now = new Date();
  const one_day = 3600 * 1000 * 24;
  //获得本月的开始日期
  const now_year = now.getFullYear();
  const now_month = now.getMonth() + 1;

  // 如果当前月是1月 则往前-1年
  const lastMonthStartDate = now_month == 1 ? new Date(`${now_year - 1}-12-01 00:00:00`) : new Date(now_year, now_month - 2, 1);

  // 上个月最后一天 = 当前月的1号 - 1天
  const lastMonthEndDate = new Date(new Date(now_year, now_month - 1, 1).getTime() - one_day);

  return [
    { txt: i18n.global.t('routes.report_center_page.today'), start_date: now, end_date: now },
    {
      txt: i18n.global.t('routes.report_center_page.ago'),
      start_date: new Date(now.getTime() - one_day),
      end_date: new Date(now.getTime() - one_day)
    },
    {
      txt: i18n.global.t('routes.report_center_page.weeks'),
      start_date: new Date(now.getTime() - one_day * 6),
      end_date: now
    },
    {
      txt: i18n.global.t('routes.report_center_page.half_month'),
      start_date: new Date(now.getTime() - one_day * 13),
      end_date: now
    },
    {
      txt: i18n.global.t('routes.report_center_page.month'),
      start_date: new Date(now.getTime() - one_day * 29),
      end_date: now
    },
    {
      txt: i18n.global.t('routes.report_center_page.ago_month'),
      start_date: lastMonthStartDate,
      end_date: lastMonthEndDate
    },
    {
      txt: i18n.global.t('routes.report_center_page.today_month'),
      start_date: new Date(now_year, now_month - 1, 1),
      end_date: new Date()
    }
  ];
}

// 月份生成
function monthCalc(month) {
  const date = new Date();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  if (m - month < 0) {
    // 上一年
    return `${y - 1}-${12 + (m - month)}`;
  } else {
    return `${y}-${m - month}`;
  }
}

// 初始化月份快捷选项
useInitialMonthOptions();
function useInitialMonthOptions() {
  // console.log(monthCalc(1));
  // console.log(monthCalc(3));
  // console.log(monthCalc(6));
  // console.log(monthCalc(9));
  // console.log(monthCalc(12));
  // console.log(monthCalc(0));
  return [
    {
      txt: '上个月',
      start_date: monthCalc(1),
      end_date: monthCalc(1)
    },
    {
      txt: '近3个月',
      start_date: monthCalc(2),
      end_date: monthCalc(0)
    },
    {
      txt: '近6个月',
      start_date: monthCalc(5),
      end_date: monthCalc(0)
    },
    {
      txt: '近12个月',
      start_date: monthCalc(11),
      end_date: monthCalc(0)
    },
    {
      txt: '本月',
      start_date: monthCalc(0),
      end_date: monthCalc(0)
    }
  ];
}
</script>
<style type="text/css" lang="scss">
.date-range {
  > .el-button,
  .el-button + .el-button {
    margin-left: -1px;
    border-radius: 0 !important;
  }
}
</style>
