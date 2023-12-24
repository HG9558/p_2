<template>
  <div class="app-container">
    <!-- 表单部分 -->
    <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto">
      <el-form-item :label="t('routes.activity.day')" prop="day">
        <el-select v-model="queryParams.day" class="m-2" placeholder="Select" size="large">
          <el-option
            v-for="item in dayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
      </el-select>
      </el-form-item>
      <el-form-item :label="t('routes.activity.username')" prop="username">
        <el-input v-model="queryParams.username" :placeholder="t('routes.activity.username_placeholder')" clearable @keyup.enter.native="handleQuery" />
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
      <el-table-column :label="t('routes.activity.vip')" align="center" prop="vip" />
      <el-table-column :label="t('routes.activity.activity_id')" align="center" prop="id" />
      <el-table-column :label="t('routes.activity.treasure_amount')" align="center" prop="amount" />
      <el-table-column :label="t('routes.activity.day')" align="center" prop="day" />
      <el-table-column prop="created_at" :label="t('global.creat_time')" align="center">
        <template #default="{ row }">
          {{ $filters.format(row.created_at, false) }}
        </template>
      </el-table-column>
      <!-- <el-table-column :label="t('global.operating')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
         <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button> 
        </template>
      </el-table-column> -->
    </el-table>

    <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryParams.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size" @current-change="getList" @size-change="getList" />

    <!-- 添加或修改菜单权限对话框 -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import type { ElForm } from 'element-plus'
import {  treasureRecordReward } from '@/http/modules/activity'
import { empty } from '@/components/serch-form/empty';
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'signRewardList',
  components: {
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const route = useRoute();
    const loading = ref(false);
    const ids = ref([]);
    const open = ref(false)
    const title = ref('');
    const queryFormEl = ref<FormInstance|null>(null);
    const total = ref();
    const queryParams = reactive({
      page: 1,
      page_size: 10,
      // vip: '',
      username:'',
      day:'',
    })
    const dayOptions = ref<{value:number|string,label:string}[]>([]);
    for(let i=0;i<=7;i++){
      dayOptions.value.push(
        {
          label:i?t(`routes.activity.day${i}`):t('global.checkall'),
          value:i?i:''
        }
      )
    }
    const listData = ref([]);
    const getList = () => {
      loading.value = true;
      treasureRecordReward({ ...empty.preProcessData(queryParams)}).then((res: any) => {
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
          queryParams.page = 1;
        }
        getList();
      }
      const handleQuery = () => {
        queryParams.page = 1;
        getList();
      }
      // 
      getList();
      // 
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
        dayOptions,
        t, getList,
         resetQuery, handleQuery
      };
    }
  });
</script>

<style lang="scss" scoped>
.dayCard {
  border: 1px solid #CDD0D6;
  margin-bottom: 20px;
  padding: 10px;
}
</style>
