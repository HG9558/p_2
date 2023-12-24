<template>
  <div class="app-container">
    <!-- 表单部分  -->
    <el-form :model="queryParams" ref="queryFormEl" size="small" :inline="true" label-width="auto">
      <el-form-item :label="t('routes.site_page.t_name')" prop="name">
        <el-input v-model="queryParams.name" :placeholder="t('routes.site_page.t_name_placeholder')" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item :label="t('global.plat_type')" prop="game_type" :placeholder="t('global.please_choose')">
        <el-select v-model="queryParams.game_type">
          <el-option v-for="item in gameTypeOptions" :key="item.value" :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('global.state')" prop="state" :placeholder="t('global.please_choose')">
        <el-select v-model="queryParams.state" :placeholder="t('routes.site_page.t_state_placeholder')"
          clearable>
          <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('routes.site_page.game_plat')" prop="platform_id" :placeholder="t('global.please_choose')" v-if="form.game_type">
            <el-select v-model="queryParams.platform_id">
              <el-option v-for="item in PlatOptions" :key="item.value" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">{{ t('global.query')
        }}</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">{{ t('global.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb10">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">{{ t('global.increment')
        }}</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col> -->
    </el-row>

    <el-table  :data="listData">
      <el-table-column label="ID" align="center" prop="tid" />
      <el-table-column :label="t('routes.site_page.t_name')" align="center" prop="name" />
      <el-table-column prop="state" :label="t('global.state')" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.state" :active-text="t('global.open')" :inactive-text="t('global.close')"
            :inline-prompt="true" active-value="1" inactive-value="0" @click=" changeSwitch(row.state, row)" />
        </template>
      </el-table-column>
      <el-table-column :label="t('global.plat_type')" align="center" prop="game_type" :formatter="(row,col,cellval:any)=>gameTypeFormat(cellval)"/>
      <el-table-column :label="t('routes.site_page.game_plat')" align="center" prop="platform_id">
        <template #default="{row}">
          {{toPlatformText(row.platform_id) }}
        </template>
      </el-table-column>
      <!--  <el-table-column label="邀请人数" align="center" prop="vip" /> -->
      <el-table-column prop="created_at" :label="t('global.creat_time')" align="center">
        <template #default="{ row }">
          {{ $filters.format(row.created_at, false) }}
        </template>
      </el-table-column>
      <el-table-column :label="t('global.operating')" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">{{ t('global.edit')
          }}</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-show="total > 0" :total="total" v-model:current-page="queryParams.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="queryParams.page_size" @current-change="getList" @size-change="getList" />

    <!-- 添加或修改菜单权限对话框 -->
    <el-dialog :title="title" v-model="open" width="650px" append-to-body @close="cancel">
      <el-form ref="formEl" :model="form" :rules="rules" label-width="auto">
        <el-form-item label="ID" prop="tid" v-if="title === t('global.edit')">
          {{ form.tid }}
        </el-form-item>
        <div style="display: flex;justify-content: space-between;">
            <el-form-item :label="t('global.plat_type')" prop="game_type" :placeholder="t('global.please_choose')">
            <el-select v-model="form.game_type">
              <el-option v-for="item in gameTypeOptions2" :key="item.value" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="t('routes.site_page.game_plat')" prop="platform_id" :placeholder="t('global.please_choose')" v-if="form.game_type">
            <el-select v-model="form.platform_id">
              <el-option v-for="item in PlatOptions" :key="item.value" :label="item.label"
                :value="+item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item :label="t('routes.site_page.t_name')" prop="name">
          <el-input v-model="form.name" :placeholder="t('routes.site_page.t_name_placeholder')" />
        </el-form-item>
        <el-form-item :label="t('global.state')" prop="state" class="mt10">
          <el-radio-group v-model="form.state">
            <el-radio :label="item.value" v-for="item of stateOptions" :key="item.value" v-show="item.value!=='2'">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{ t('global.submit') }}</el-button>
        <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { ElForm, ElMessageBox, ElMessage } from 'element-plus'
import { getTagList, addTag, deleteTag, updateTag, bindingTag } from '@/http/modules/site';
import { empty } from '@/components/serch-form/empty';
import { useGameTypeList } from '@/utils/getJson';
import { usePlatform } from '@/utils/requestOptions';
type FormInstance = typeof ElForm
export default defineComponent({
  name: 'tagList',
  components: {
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const {list:PlatOptions, toPlatformText} = usePlatform();
    const { GameTypeListData:gameTypeOptions} = useGameTypeList(true); //有全部
    const { GameTypeListData:gameTypeOptions2} = useGameTypeList();  //无全部
    const route = useRoute();
    const loading = ref(false);
    const open = ref(false)
    const title = ref('');
    const formEl = ref<FormInstance | null>(null)
    const queryFormEl = ref<FormInstance | null>(null)
    // 表单校验
    const rules = reactive<FormInstance['rules']>({
      name: [
        { required: true, message: t('routes.site_page.t_name_placeholder'), trigger: "blur" },
      ],
      state: [
        { required: true, message: t('routes.site_page.t_state_placeholder'), trigger: "blur" },
      ],
      game_type: [
        { required: true, message: t('routes.tips.pleace_select_plat'), trigger: "blur" },
      ],
      platform_id: [
        { required: true, message: t('routes.site_page.gameplat_null'), trigger: "blur" },
      ],
    })
    const stateOptions = ref([
      {
        label: t('global.close'),
        value: '0'
      },
      {
        label: t('global.open'),
        value: '1'
      },
      {
        label: t('global.checkall'),
        value: '2'
      }
    ])
    const form = ref<Record<string, any>>({
      tid: null,
      state: '',
      name: '',
      game_type: null,
      created_at: 0,
      platform_id:null,
    })
    const total = ref();
    const queryParams = ref({
      page: 1,
      page_size: 10,
      state: '2',
      name: '',
      game_type: null,
      platform_id:null,
    })
    const listData = ref([]);
    const getList = () => {
      // loading.value = true;
      getTagList({ ...empty.preProcessData({ ...queryParams.value }) }).then((res: any) => {
        queryParams.value.page===1 && (total.value = res.data?.t);
        listData.value = res.data
      })
    }
    const reset = () => {
      if (formEl.value) {
        form.value = {};
        formEl.value.resetFields();
      }
    }
    const successMsg = (state:unknown, msg:string) => {
      if (state === true) {
        ElMessage({
          type: 'success',
          message: msg,
        })
      }
    }
    const handleDelete = (row: any) => {
      ElMessageBox.confirm(t('routes.tips.sure_delete'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
        deleteTag({ id: row.tid }).then((res) => {
          getList();
          successMsg(res.status, t('global.delete_suc'))
        })
      })
    }
    const submitForm = async () => {
      if (formEl.value) {
        await formEl.value.validate((valid, fields) => {
          if (valid) {
            if (title.value === t('global.increment')) {
              addTag(form.value).then((res) => {
                reset();
                open.value = false;
                getList();
                successMsg(res.status, t('global.add_suc'))
              })
            } else {
              updateTag(form.value).then((res) => {
                open.value = false;
                getList();
                successMsg(res.status, t('global.update_suc'))
              })
            }

          } else {
            console.log('error submit!', fields)
            return false;
          }
        }
        )
      }
    }
    const changeSwitch = (val: string, row: any) => {
      console.log(val);
      if (row.tid === undefined) {
        return;
      }
      form.value = {
        ...row,
        state: val
      }
      updateTag(form.value).then((res) => {
        open.value = false;
        getList();
        reset();
      })
    }
    const resetQuery = () => {
      if (queryFormEl.value) {
        queryParams.value.state = '';
        queryFormEl.value.resetFields();
        queryParams.value.page = 1;
        getList();
      }
    }
    const handleUpdate = (row: any) => {
      title.value = t('global.edit');
      form.value = _.cloneDeep(row);
      open.value = true;
    }
    const handleAdd = () => {
      form.value = {}
      open.value = true;
      title.value = t('global.increment');
    }
    const handleQuery = () => {
      queryParams.value.page = 1;
      getList();
    }
    const cancel = () => {
      reset();
      open.value = false;
      title.value = '';
    }
    const  gameTypeFormat = (cellvalue:string)=>{
       const res = gameTypeOptions.value.find((item)=>{
          return item.value === cellvalue
        })
        return res?.label??'-'
    }
    getList();
    return {
      route,
      loading,
      form,
      open,
      rules,
      queryParams,
      total,
      listData,
      title,
      formEl,
      stateOptions,
      queryFormEl,
      t, getList,
      changeSwitch,
      gameTypeOptions,PlatOptions,gameTypeOptions2,
      gameTypeFormat,
      handleDelete, submitForm, resetQuery, handleUpdate, handleAdd, handleQuery,
      cancel,toPlatformText
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
