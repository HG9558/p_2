<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto" :rules="rules">
      <el-form-item :label="t('global.plat_name')" prop="ids" :placeholder="t('global.please_choose')">
        <el-select v-model="ids" multiple collapse-tags-tooltip :placeholder="t('global.please_choose')"
          style="width: 400px">
          <el-option v-for="item in PlatOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
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

    <el-table :data="listData">
      <el-table-column :label="t('global.plat_name')" align="center" prop="api_type"
        :formatter="(row, col, val) => toPlatformText(val)" />
      <el-table-column :label="t('routes.report_center_page.mem_count')" align="center" prop="mem_count" />
      <el-table-column :label="t('routes.report_center_page.bet_count')" align="center" prop="bet_count" />
      <el-table-column :label="t('routes.report_center_page.bet_amount') + '(R$)'" align="center" prop="bet_amount" />
      <el-table-column :label="t('routes.report_center_page.valid_bet_amount') + '(R$)'" align="center"
        prop="valid_bet_amount" />
      <el-table-column :label="t('routes.report_center_page.company_net_amount') + '(R$)'" align="center"
        prop="company_net_amount" />
      <el-table-column :label="t('routes.report_center_page.avg_bet_amount') + '(R$)'" align="center"
        prop="avg_bet_amount" />
      <el-table-column :label="t('routes.report_center_page.avg_valid_bet_amount') + '(R$)'" align="center"
        prop="avg_valid_bet_amount" />
      <el-table-column :label="t('routes.report_center_page.avg_company_net_amount') + '(R$)'" align="center"
        prop="avg_company_net_amount" />
      <el-table-column :label="t('routes.report_center_page.presettle') + '(R$)'" align="center" prop="presettle" />
      <el-table-column :label="t('routes.report_center_page.profit_rate') + '(%)'" align="center" prop="profit_rate" />
      <el-table-column prop="report_time" :label="t('routes.report_center_page.report_time')"
        align="center"></el-table-column>
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
import { getGameReport } from '@/http/modules/report'
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
    const loading = ref(false);
    const ids = ref([]);
    const open = ref(false)
    const title = ref('');
    // 表单校验
    const rules = reactive({
      ids: [
        { required: true, message: t('routes.tips.pleace_select_plat'), trigger: "blur" },
      ],
    })
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
      ids: computed(() => ids.value + '')
    })
    const listData = ref([]);
    const getList = () => {
      loading.value = true;
      getGameReport({ ...empty.preProcessData(queryParams),}).then((res: any) => {
        if (queryParams.page === 1) {
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
        ids.value = [];
      }
      // getList();
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
    // getList();
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
      t, getList, rules,
      resetQuery, handleQuery, PlatOptions, toPlatformText
    };
  }
});
</script>

<style lang="scss" scoped></style>
