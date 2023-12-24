<template>
  <div class="game-list">
    <formSearch :FormDataList="FormDataList" @onSubmit="onSubmit"></formSearch>
    <el-row :gutter="10" class="mb10">
      <el-col :span="1.5">
        <el-button type="info" plain icon="el-icon-plus" size="mini" :disabled="checkData.length <= 0"
          @click="handleBatch('tag', true)">{{
            t('routes.site_page.tag_add')
          }}</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="checkData.length <= 0"
          @click="handleBatch('tag', false)">{{
            t('routes.site_page.tag_del')
          }}</el-button>
      </el-col> -->
      <el-col :span="1.5" class="ml10">
        <el-button type="warning" plain icon="el-icon-plus" size="mini" :disabled="checkData.length <= 0"
          @click="handleBatch('is_hot', true)">{{
            t('routes.site_page.hot_add')
          }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="checkData.length <= 0"
          @click="handleBatch('is_hot', false)">{{
            t('routes.site_page.hot_del')
          }}</el-button>
      </el-col>
      <!-- 设置最新 -->
      <!-- <el-col :span="1.5" class="ml10">
        <el-button type="success" plain icon="el-icon-plus" size="mini" :disabled="checkData.length <= 0"
          @click="handleBatch('is_new', true)">{{
            t('routes.site_page.new_add')
          }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="checkData.length <= 0"
          @click="handleBatch('is_new', false)">{{
            t('routes.site_page.new_del')
          }}</el-button>
      </el-col> -->
      <el-col :span="1.5" class="ml10">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" :disabled="checkData.length <= 0"
          @click="handleBatch('is_fav', true)">{{
            t('routes.site_page.fav_add')
          }}</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="checkData.length <= 0"
          @click="handleBatch('is_fav', false)">{{
            t('routes.site_page.fav_del')
          }}</el-button>
      </el-col>
    </el-row>
    <vxe-grid v-bind="gridOptions" v-on="gridEvents" :max-height="globalTableHeight" ref="tableRef"
      @checkbox-all="toggleAllCheckboxEvent" @checkbox-change="toggleAllCheckboxEvent">
      <template #en_name="{ row }">{{ row.en_name || '&#45;&#45;' }}</template>
      <template #br_alias="{ row }">{{ row.br_alias || '&#45;&#45;' }}</template>
      <template #game_type="{ row }">{{ GameTypeListToText(row.game_type) }}</template>
      <template #platform_id="{ row }">
        <div class="ai-c flex jc-c" style="">
          <span class="mgr-10">{{ toPlatformText(row.platform_id) }}</span>
          <img style="width: 50px; height: 50px" :src="`${domain}${row.img}`" />
        </div>
      </template>
      <template #is_hot="{ row }">
        <vxe-switch :model-value="row.is_hot" @click="selectChangeRow({ ...row }, 'is_hot')" :open-label="t('global.hot')"
          :open-value="1" :close-label="t('global.normal')" :close-value="2"></vxe-switch>
      </template>
      <!-- 是否是最新 -->
      <!-- <template #is_new="{ row }">
        <vxe-switch :model-value="row.is_new" @click="selectChangeRow({ ...row }, 'is_new')"
          :open-label="t('global.T008_LIST.72')" :open-value="1" :close-label="t('global.normal')"
          :close-value="2"></vxe-switch>
      </template> -->
      <template #is_fav="{ row }">
        <vxe-switch :model-value="row.is_fav" @click="selectChangeRow({ ...row }, 'is_fav')"
          :open-label="t('routes.site_page.fav')" :open-value="1" :close-label="t('global.normal')"
          :close-value="2"></vxe-switch>
      </template>
      <template #online="{ row }">
        <vxe-switch :model-value="row.online" @click="selectChangeRow({ ...row }, 'online')"
          :open-label="t('routes.site_page.online')" :open-value="1"
          :close-label="t('routes.site_page.offline')" :close-value="2"></vxe-switch>
      </template>
      <template #updated_at="{ row }">{{ $filters.format(row.updated_at, false) }}</template>
      <template #tag_id="{ row }">
        <el-tag class="ml-2" 
           v-for="(item,index) in row.tag_id"
            closable
            :disable-transitions="false"
            @close="removeTag({game_id:row.id,tag_id:item.id})"
          :type="['', 'success', 'info', 'warning', 'danger'][index % 5]">
          {{ item.name}}
         </el-tag>
      </template>
      <template #dropdowns="{ row }">
        <el-button @click="selectEditRow({ ...row })">{{ t('global.edit') }}</el-button>
        <el-button @click="handleOpenTag(row)">{{
            t('routes.site_page.tag_add')
          }}</el-button>
      </template>
    </vxe-grid>
    <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination"
      v-model:limit="pageQuery.page_size" />

    <el-dialog v-model="dialogTableVisible" width="600px" :close-on-click-modal="false" @close="onClose">
      <template #title>
        <div class="flex ai-c jc-s">
          <span class="fs20">{{ t('routes.site_page.edit_game') }}</span>
        </div>
      </template>
      <el-form ref="elForms" label-position="right" label-width="auto" :model="formData" :rules="{
        platform_id: [
          {
            required: true,
            message: t('routes.site_page.gameplat_null'),
            trigger: 'blur'
          }
        ],
        game_type: [
          {
            required: true,
            message: t('routes.site_page.plat_type_tips'),
            trigger: 'blur'
          }
        ],
        en_name: [
          {
            required: true,
            message: t('routes.site_page.english_name'),
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: t('routes.site_page.chinese_name'),
            trigger: 'blur'
          }
        ],
        br_name: [
          {
            required: true,
            message: t('routes.site_page.br_name'),
            trigger: 'blur'
          }
        ],
        // client_type_arr: [
        //   {
        //     type: 'array',
        //     required: true,
        //     message: t('routes.site_page.zcplat'),
        //     trigger: 'blur'
        //   }
        // ],
        sorting: [
          {
            required: true,
            message: t('routes.site_page.sort_null'),
            trigger: 'blur'
          }
        ],
        img: [
          {
            required: true,
            message: t('routes.site_page.game_pic'),
            trigger: ['blur', 'change']
          }
        ]
      }">
        <el-form-item :label="t('routes.site_page.g_name')" prop="name">
          <el-input :modelValue="formData.platform_id" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.vip_list_page.game_type')" prop="game_type">
          <el-input :modelValue="formData.game_type" disabled size="small"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.site_page.plat_english_name')" prop="en_name">
          <el-input v-model="formData.en_name" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.site_page.plat_china_name')" prop="name">
          <el-input v-model="formData.name" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.site_page.game_br_name')" prop="br_alias">
          <el-input v-model="formData.br_alias" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.site_page.gameimg')" prop="img">
          <k-upload v-model="formData.img" @urlStr="urlStrFun" :EUrl="formData.img" uploadUrl="tenant/game/upload"
            ref="sonRef"></k-upload>
        </el-form-item>
        <el-form-item :label="t('routes.site_page.hot')">
          <el-radio-group v-model="formData.is_hot">
            <el-radio :label="1">{{ t('global.yes') }}</el-radio>
            <el-radio :label="2">{{ t('global.no') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item :label="t('routes.site_page.new')">
          <el-radio-group v-model="formData.is_new">
            <el-radio :label="1">{{ t('global.yes') }}</el-radio>
            <el-radio :label="2">{{ t('global.no') }}</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item :label="t('routes.site_page.fav')">
          <el-radio-group v-model="formData.is_fav">
            <el-radio :label="1">{{ t('global.yes') }}</el-radio>
            <el-radio :label="2">{{ t('global.no') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="t('global.sort')" prop="sorting">
          <el-input v-model.number="formData.sorting" type="number" size="small"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="onClose">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="handleUpdateGame(formData)">{{ t('global.sure') }}</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog :title="title" v-model="openTagForm" width="700px" center append-to-body @close="cancel">
      <el-form ref="tagForm" :rules="rules" label-width="auto">
        <el-form-item prop="tagId" class="mt10">
          <el-card>
            <el-checkbox-group v-model="tagId">
              <el-checkbox :label="item.tid" v-for="(item, index) of tagsList" :key="item.tid" class="mt10">
                <el-tag :type="['', 'success', 'info', 'warning', 'danger'][index % 5]">{{ item.name
                }}</el-tag>
              </el-checkbox>
            </el-checkbox-group>
          </el-card>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleGamesTag(formData.id)">{{ t('global.submit') }}</el-button>
        <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { getGameList,searchGameList, updateGameState, updateGame, getTagList, bindingTag, cancelTag, updateGameIsHot, updateGameIsNew,updateGameIsFav } from '@/http/modules/site';
import { ElForm, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { store } from '@/store';
import dayjs from 'dayjs';
import formSearch from '@/components/serch-form/index.vue';
import { VxeGridListeners, VxeGridProps, VxeTableInstance } from 'vxe-table';
import useSearchPlaceholder from './GameListSearch';
import usePaginationHanlder from '@/components/pagination/pagination';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import { useConfigRules } from '@/views/risk/whitelist/backendSystem/rules';
import Pagination from '@/components/pagination/index.vue';
import Local from '@/utils/storage';
import { tagsList } from '@/http/modules/label';
import { empty } from '@/components/serch-form/empty';
export default defineComponent({
  name: 'gameList',
  components: {  formSearch, Pagination },
  setup() {
    const { FormDataList, GameTypeListToText, toPlatformText } = useSearchPlaceholder();
    const listQuery = ref<RefObjectKeyRulesType>({});
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const elForms = ref<typeof ElForm | null>(null);
    const { rules } = useConfigRules();
    const { t } = useI18n({ useScope: 'global' });
    const tableRef = ref<VxeTableInstance>()
    const formData = ref<any>({
      dialogFormVisible: false,
      seq: 0
    });
    const currentData = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const maintainedForm = reactive({
      dialogMaintainedVisible: false,
      name: '',
      id: '',
      seq: '',
      code: '',
      maintained: 1,
      maintainedTime: [currentData, currentData]
    });
    const dialogTableVisible = ref<boolean>(false);
    const gameInfo = ref<any>([]);
    const openTagForm = ref(false);
    const title = ref('');
    const tagId = ref([]);
    const tagsList = ref<any[]>([]);
    store.state.app.tableHeight = 1000;
    getTagList({
      page: 1,
      page_size: 1000,
      state: '1',
    }).then((res: any) => {
      total.value = res.data?.t || 0;
      tagsList.value = res.data
    })
    // 搜索
    const onSubmit = (data: any) => {
      pageQuery.value.page = 1;
      listQuery.value = data;
      let is_zh = /[\u4e00-\u9fa5]+/g.test(data.name);
      if (is_zh) {
        listQuery.value.name = data.name;
      } else {
        listQuery.value.en_name = data.name;
        delete listQuery.value.name;
      }
      getList();
    };
    // 查询列表
    function getList() {
      const params: any = {
        ...listQuery.value,
        ...pageQuery.value
      };
      console.log(params);
      // getGameList  searchGameList
      searchGameList({...empty.preProcessData(params)}).then(res => {
        if (res.status) {
          const data = res.data?.d?.map((item:any)=>{
            const tag_id =item.tag_id&&item.tag_id!=='[]'? JSON.parse(item.tag_id):[];
            return {...item,tag_id}
          })
          gameInfo.value = gridOptions.data = data || [];
          if (params.page > 1) {
            return;
          }
          total.value = res?.data?.t || 0;
        }
      });
    }
    const resetQuery = ()=>{  
      getList();
    }
    // 分页
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });

    // 编辑
    const handleUpdateGame = (params: any) => {
      if (elForms.value) {
        elForms.value?.validate(async (valid: boolean) => {
          if (valid) {
            console.log(params);
            const p: any = {
              ...params,
              tag_id:JSON.stringify(params.tag_id),
              tag_ids:params?.tag_ids||[]
            };
            updateGame(p).then((res: any) => {
              if (res.status) {
                ElMessage.success(t('global.editsuc'));
                dialogTableVisible.value = false;
                getList();
              }
            });
          }
        });
      }
    };

    const oldOnline = ref<number>(0);
    const selectChangeRow = (item: any, updateKey: 'is_new' | 'is_hot' | 'online'|'is_fav') => {
      oldOnline.value = +item.online;
      // 如果是开启状态 弹框
      let params = {
        id: item.id,
        [updateKey === 'online' ? 'online' : 'val']: item[updateKey] === 1 ? 2 : 1,
      };
      let updateFn;
      switch (updateKey) {
        case 'is_hot':
          updateFn = updateGameIsHot;
          break;
        case 'is_new':
          updateFn = updateGameIsNew;
          break;
        case 'is_fav':
          updateFn = updateGameIsFav;
          break;
        case 'online':
          updateFn = updateGameState;
          break;
      }
      updateFn(params)
        .then(res => {
          if (res.status) {
            getList();
          }
        })
        .catch(err => console.log(err));
    };
    const selectEditRow = (item: any) => {
      dialogTableVisible.value = true;
      formData.value = {
        platform_id: toPlatformText(item.platform_id),
        game_type: GameTypeListToText(item.game_type),
        ...item
      }
      let arr: any[] = [];
      if (item.is_hot === 0) {
        arr.push(1);
      } else if (item.is_hot === 1) {
        arr.push(2);
      } else if (item.is_hot === 2) {
        arr.push(1, 2);
      }
      // 是热门
      if (item.is_new === 1) {
        arr.push(3);
      }
    };

    // 重置
    function resetFields() {
      if (elForms.value) {
        (elForms.value as typeof ElForm).resetFields();
      }
    }
    // 关闭
    const sonRef = ref(null);
    const onClose = () => {
      dialogTableVisible.value = false;
      sonRef.value?.clearFunc();
      resetFields();
    };

    const isHot = (hotNum: string) => {
      const h = hotNum ?? '';
      const s = h.toString();
      if (s) {
        if (s == '0') {
          return t('global.normal');
        } else if (s == '1') {
          return t('global.hot');
        } else if (s == '2') {
          return t('global.hot_nor');
        }
      }
    };

    // 配置表格
    const gridOptions = reactive<VxeGridProps>({
      border: true,
      showOverflow: true,
      align: 'center',
      exportConfig: {},
      columnConfig: {
        resizable: true
      },
      rowConfig: {
        keyField: 'id',
        isHover: true
      },
      columns: [
        { type: 'checkbox', width: 60 },
        { field: 'en_name', title: t('routes.site_page.game_english_name'), minWidth: 180, slots: { default: 'en_name' } },
        { field: 'name', title: t('routes.site_page.game_china_name'), minWidth: 180 },
        { field: 'br_alias', title: t('routes.site_page.game_br_name'), minWidth: 180, slots: { default: 'br_alias' } },
        { field: 'platform_id', title: t('routes.site_page.game_plat'), minWidth: 180, slots: { default: 'platform_id' } },
        { field: 'game_type', title: t('routes.site_page.plat_type'), minWidth: 100, slots: { default: 'game_type' } },
        // { field: 'client_type', title: t('routes.site_page.support_platform'), minWidth: 180, slots: { default: 'client_type' } },
        { field: 'sorting', title: t('global.sortabled'), width: 80, sortable: true },
        { field: 'is_hot', title: t('routes.site_page.is_hot'), minWidth: 100, slots: { default: 'is_hot' } },
        // { field: 'is_new', title: t('routes.site_page.is_new'), minWidth: 100, slots: { default: 'is_new' } },
        { field: 'is_fav', title: t('routes.site_page.is_fav'), minWidth: 100, slots: { default: 'is_fav' } },
        { field: 'online', title: t('global.select_tip'), minWidth: 100, slots: { default: 'online' } },
        { field: 'tag_id', title: t('routes.site_page.tag_list'),showOverflow:false, minWidth: 250, slots: { default: 'tag_id' } },
        { field: 'title', title: t('global.operating'), width: 180, slots: { default: 'dropdowns' } },
      ],
      data: []
    });
    const gridEvents: VxeGridListeners = {
      formSubmit() {
        getList();
      }
    };

    const domain = ref<string>('');
    domain.value = Local.get('domain');
    const urlStrFun = (val: string) => {
      formData.value.img = val;
    };
    // 批量处理
    const handleBatch = (type: 'tag' | 'is_hot' | 'is_new'|'is_fav', isAdd: boolean) => {
      //val: 1 添加  2取消
      let params = {
        id: checkData.value.toString(),
        val: isAdd ? 1 : 2
      };
      let handleFn = null;
      switch (type) {
        case 'tag':
          title.value = t(`routes.site_page.${isAdd ? 'tag_add' : 'tag_del'}`);
          if(isAdd){
            openTagForm.value = true;
          }else{
            handleGamesTag();
          }
          break;
        case 'is_hot':
          handleFn = updateGameIsHot;
          break;
        case 'is_fav':
          handleFn = updateGameIsFav;
          break;
        case 'is_new':
          handleFn = updateGameIsNew
          break;
        default:
          break;
      }
      if (handleFn) {
        handleFn(params).then(res => {
          if (res.status) {
            getList();
            ElMessage.success(t(`global.${isAdd ? "set" : 'cancel'}_suc`));
          }
        })
      }
    }
    const cancel = () => {
      tagId.value = [];
      formData.value = {};
      openTagForm.value = false;
      title.value = '';
    }
    const checkData = ref([]);
    const singleData = ref<any>([]);
    const handleOpenTag = (row:any)=>{
      tagId.value = row.tag_id.map((item:any)=>item.id)
      formData.value = row;
      console.log(tagId.value)
      openTagForm.value = true;
    }
    const handleGamesTag = (gameId?:string) => {
      title.value = t('routes.site_page.tag_add');
      const params = {
        gameid: gameId??checkData.value.toString(),
        tagid: tagId.value.toString()
      }
      if (title.value === t('routes.site_page.tag_add')) {
        bindingTag(params).then((res) => {
          if (res.status) {
            ElMessage.success(t('global.add_suc'));
            getList();
            openTagForm.value = false;
          }
        })
      } 
     // else {
      //   removeTag({game_id:params.gameid,tag_id:params.tagid});
      // }
    };
    const removeTag = (params:{game_id:string,tag_id:string})=>{
      cancelTag(params).then((res) => {
          if (res.status) {
            ElMessage.success(t('global.delete_suc'));
            getList();
            openTagForm.value = false;
          }
        })
    }
    const toggleAllCheckboxEvent = ({ records }: any) => {
      console.log(records,records.length);

      if (records) {
        checkData.value = records.map((el: any) => {
          return el.id;
        });
        if(records.length===1){
          singleData.value = records[0];
        }else{
          singleData.value = null;
        }
      }
      console.log(singleData.value);
    };
    // getList();
    return {
      onSubmit,
      handleUpdateGame,
      pagination,
      isHot,
      onClose,
      selectEditRow,
      selectChangeRow,
      urlStrFun,
      sonRef,
      domain,
      GameTypeListToText,
      toPlatformText,
      maintainedForm,
      rules,
      FormDataList,
      listQuery,
      pageQuery,
      formData,
      total,
      elForms,
      gridOptions,
      gridEvents,
      dialogTableVisible,
      toggleAllCheckboxEvent,
      tableRef,
      handleBatch,
      cancel,
      removeTag,
      title,
      openTagForm,
      tagId,
      tagsList,
      checkData,
      handleGamesTag,
      resetQuery,
      handleOpenTag,
      singleData,
      t
    };
  }
});
</script>

<style scoped lang="scss">
.game-list {
  padding: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

.custom-checkbox {
  font-size: 18px;
  cursor: pointer;
}
.ml-2+.ml-2{
  margin-left: 2px;
  margin-top: 2px;
}


::v-deep(.vxe-table--render-default.size--medium .vxe-body--column.col--ellipsis > .vxe-cell,
  .vxe-table--render-default.size--medium .vxe-footer--column.col--ellipsis > .vxe-cell,
  .vxe-table--render-default.size--medium .vxe-header--column.col--ellipsis > .vxe-cell) {
  max-height: 200px !important;
  padding: 10px 0;
}
</style>
