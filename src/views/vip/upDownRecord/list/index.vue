<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto">

      <el-form-item>
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
      </el-form-item>
      <el-form-item :label="t('routes.vip_list_page.up_down')" prop="adjust_mode">
        <el-select v-model="queryParams.adjust_mode">
          <el-option v-for="(selectItem, selectIndex) in adjustOptions" :key="selectIndex" :label="selectItem.label"
            :value="selectItem.value"> </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item :label="t('global.state')" prop="state">
        <el-select v-model="queryParams.state" placeholder>
          <el-option v-for="(selectItem, selectIndex) in AuditStateType" :key="selectIndex" :label="selectItem.label"
            :value="selectItem.value"> </el-option>
        </el-select>
      </el-form-item> -->
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
      <el-table-column :label="t('routes.operation_manage_page.application_amount') + '(BRL)'" align="center"
        prop="amount" />
      <el-table-column :label="t('routes.vip_list_page.up_down')" align="center" prop="adjust_mode"
        :formatter="(row: any) => formatterFn(row.adjust_mode, adjustOptions)" />
      <el-table-column :label="t('global.state')" align="center" prop="state"
        :formatter="(row: any) => formatterFn(row.state, AuditStateType)" />
      <el-table-column :label="t('global.account_type')" align="center" prop="tester"
        :formatter="(row: any) => formatterFn(row.tester, AccountType)" />
      <el-table-column prop="apply_at" :label="t('global.replay_time1')" align="left">
        <template #default="{ row }">
          {{ $filters.format(row.apply_at, false) }}
        </template>
      </el-table-column>
      <el-table-column prop="apply_remark" :label="t('global.replay_remark1')" align="center" >
          <template #default="{ row }">
            <span>{{ decodeURI(row.apply_remark) }}</span>
          </template>
      </el-table-column>
      <el-table-column :label="t('global.operating')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button size="mini" type="text" icon="el-icon-question" @click="handlePoints(scope.row)">{{
            t('global.review') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryParams.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size" @current-change="getList" @size-change="getList" />


    <!-- 会员上下分审核 -->
    <el-dialog :title="title" v-model="openPoints" width="500px" append-to-body @close="cancelPoints" center>
      <el-form ref="vipPointsFormEl" :model="vipPointsform" :rules="rules" label-width="auto">
        <el-form-item :label="t('routes.finance_manage_page.review_order')" prop="id" class="mt10">
          {{ vipPointsform.id }}
        </el-form-item>
        <el-form-item :label="t('routes.activity.username')" class="mt10">
          {{ vipPointsform.username }}
        </el-form-item>
        <el-form-item :label="t('routes.operation_manage_page.application_amount') + '(BRL)'" prop="amount" class="mt10">
            {{ vipPointsform.amount }}
        </el-form-item>
        <el-form-item :label="t('global.replay_person')"  class="mt10">
          {{ vipPointsform.apply_name }}
        </el-form-item>
        <el-form-item :label="t('global.replay_remark1')"  class="mt10">
          {{ decodeURI(vipPointsform.apply_remark) }}
        </el-form-item>
        <el-form-item :label="t('global.remark_txt')" prop="review_remark" class="mt10">
          <el-input v-model="vipPointsform.review_remark" :placeholder="t('global.remark')"
            class="nbInput" type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" maxlength="150" show-word-limit />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="commitPoints('2')">{{ t('global.pass') }}</el-button>
        <el-button type="danger" @click="commitPoints('3')">{{ t('global.no_pass') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElForm, ElMessage } from 'element-plus'
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
    const vipPointsFormEl = ref<FormInstance | null>(null);
    const total = ref();
    const openPoints = ref(false);  //上下分弹窗
    const vipPointsform = ref<Record<string,any>>({
      id: '',
      state: '', //2=审核通过,3=审核未通过
      review_remark: '',
    })
    const queryParams = reactive({
      page: 1,
      page_size: 10,
      // vip: '',
      username: '',
      start_time: computed(() => timer.value[0] ?? ''),
      end_time: computed(() => timer.value[1] ?? ''),
      tester: '',
      state: '1',
      adjust_mode: '',
      apply_name: '',
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
        label: t('routes.vip_list_page.up'),
        value: 1
      },
      {
        label: t('routes.vip_list_page.down'),
        value: 2
      }
    ];
    const formatterFn = (val: any, options: any[]) => {
      const res = options.find((item) => String(item.value) === String(val));
      return res?.label ?? '-'
    }
    const listData = ref([]);
    const getList = () => {
      getUpOrDownList(queryParams).then((res: any) => {
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
    const handlePoints = (row: any) => {
      title.value = t('global.vipPoints');
      const {id,remark,apply_remark,username,amount,apply_name} = row;
      vipPointsform.value={
        id,remark,apply_remark,username,amount,apply_name,
        review_remark : ''
      }
      openPoints.value = true;
    }

    // 表单校验
    const rules = reactive<FormInstance['rules']>({
      review_remark: [
        { required: true, message: t('global.remark'), trigger: "blur" }
      ],
    })

    // 上分审核
    const commitPoints = (state: '2' | '3') => {
      if (vipPointsFormEl.value) {
        vipPointsFormEl.value.validate((valid, fields) => {
          if (valid) {
            auditUpOrDown({
              id:vipPointsform.value.id,
              review_remark:vipPointsform.value.review_remark,
              state,
            }).then((res) => {
              openPoints.value = false;
              if (res.status) {
                ElMessage.success({
                  message: t('global.submit_suc'),
                  type: 'success'
                });
                getList();
              }
            })
          }
        })
      }
    }
    const cancelPoints = () => {
      openPoints.value = false;
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
      resetQuery, handleQuery, rules,
      handlePoints, openPoints, vipPointsform, vipPointsFormEl, commitPoints, cancelPoints, AuditStateType, adjustOptions
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
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.nbInput {
  width: 230px;
}
</style>
