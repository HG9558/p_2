import { ref } from 'vue';
import dayjs from 'dayjs';
import i18n from '@/locales';
export function timerChange(e: number, isRecent: boolean = false) {
  const d = new Date();
  const startDate = dayjs(d)
    .startOf('day')
    .add(-(e - 1), 'days')
    .valueOf();
  const endDate = dayjs(d).endOf('day').add(0, 'days').valueOf();
  if (isRecent) {
    const end = dayjs(d).endOf('day').add(-1, 'days').valueOf();
    return [startDate, end];
  }
  return [startDate, endDate];
}

export default function useShortcuts() {
  const now = new Date();
  const one_day = 3600 * 1000 * 24;
  const now_year = now.getFullYear();
  const now_month = now.getMonth() + 1;

  // 如果当前月是1月 则往前-1年
  const lastMonthStartDate = now_month == 1 ? new Date(`${now_year - 1}-12-01 00:00:00`) : new Date(now_year, now_month - 2, 1);

  // 上个月最后一天 = 当前月的1号 - 1天
  const lastMonthEndDate = new Date(new Date(now_year, now_month - 1, 1).getTime() - one_day);
  const shortcuts = ref([
    {
      text: i18n.global.t('routes.system.today'),
      value: (() => {
        return timerChange(1);
      })()
    },
    {
      text: i18n.global.t('routes.system.yestoday'),
      value: (() => {
        return timerChange(2, true);
      })()
    },
    {
      text: i18n.global.t('routes.report_center_page.weeks'),
      value: (() => {
        return timerChange(7);
      })()
    },
    {
      text: i18n.global.t('routes.report_center_page.half_month'),
      value: (() => {
        return timerChange(14);
      })()
    },
    {
      text: i18n.global.t('routes.report_center_page.month'),
      value: (() => {
        return timerChange(30);
      })()
    },
    {
      text: i18n.global.t('routes.report_center_page.ago_month'),
      value: (() => {
        return [lastMonthStartDate, lastMonthEndDate]
      })()
    },
    {
      text: i18n.global.t('routes.report_center_page.today_month'),
      value: (() => {
        return [new Date(now_year, now_month - 1, 1), new Date()]
      })()
    },
    // {
    //   text:i18n.global.t('routes.system.close_three_month_days'),
    //   value: (() => {
    //     return timerChange(90);
    //   })()
    // },
    // {
    //   text: i18n.global.t('routes.system.close_one_year'),
    //   value: (() => {
    //     return timerChange(365);
    //   })()
    // }
  ]);
  return { shortcuts };
}
