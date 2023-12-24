<template>
  <!-- App闪屏页 设备取值 全部:fullsite,sport;全站:fullsite;体育:sport
轮播图 设备取值 全部:fullsite,sport,agent;全站APP/H5:fullsite;体育App:sport;代理App:agent
站点广告位 设备取值 全部:sport,apph5;体育:sport;全站APP/H5:apph5 -->
  <div>
    <div class="betting-cont">
      <AddCarousel v-model="dialogFlashVisible" ref="AddCarouseleRef" :datas="datas" @change="getList" :title="title" />
      <div class="betting-table">
        <formSerch :FormDataList="FormDataList" @onSubmit="onSubmit">
          <template #add>
            <el-button type="primary" @click="addFlash">{{ t('global.increment') }}</el-button>
          </template>
        </formSerch>
        <p class="empty"></p>
        <el-table :data="tableData" border style="width: 100%" :max-height="globalTableHeight">
          <el-table-column prop="id" label="ID" align="center"></el-table-column>
          <el-table-column prop="title" :label="t('routes.tips.title')" align="center" width="200"></el-table-column>
          <el-table-column prop="redirect_url" :label="t('routes.operation_manage_page.detail_link')" align="center"
            width="200">
            <template #default="scope">
                <!-- {{ t(`global.PLATFORM_PLATS_HEYING.p${scope.row.redirect_url}`) }} -->
                {{  decodeURIComponent(scope.row.redirect_url) }}
            </template>
          </el-table-column>
          <el-table-column prop="images" :label="t('routes.tips.carousel_opration') + 'h5'" align="center">
            <template #default="scope">
              <div class="imgs">
                <img :src="formatImgUrl(scope.row.images, 'h5')" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="images" :label="t('routes.tips.carousel_opration') + 'pc'" align="center">
            <template #default="scope">
              <div class="imgs">
                <img :src="formatImgUrl(scope.row.images, 'pc')" />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="state" :label="t('global.select_tip')" align="center" width="120">
            <template #default="scope">
              <span v-html="CarState(scope.row.state)"></span>
              <!-- <span class="green" v-if="scope.row.state == 1">{{ t('routes.operation_manage_page.start') }}</span>
              <span class="red" v-if="scope.row.state == 0">{{ t('routes.operation_manage_page.stop') }}</span> -->
            </template>
          </el-table-column>
          <el-table-column prop="seq" :label="t('global.sortabled')" sortable align="center" width="80"></el-table-column>
          <el-table-column prop="updated_at" :label="t('global.operating_time')" align="center" width="180">
            <template #default="scope">
              {{ $filters.format(scope.row.updated_at, false) }}
            </template>
          </el-table-column>
          <el-table-column prop="updated_name" :label="t('routes.operation_manage_page.last_personr')"
            align="center"></el-table-column>
          <el-table-column prop="col14" :label="t('routes.operation_manage_page.operating')" align="center" width="145">
            <template #default="scope">
              <!-- <span v-if="scope.row.state == 1">
                <el-button type="text" :disabled="true">{{ t('global.edit') }}</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" :disabled="true">{{ t('global.delete') }}</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="startUse(scope.row.id, scope.row.state)">{{ t('routes.operation_manage_page.stop') }}</el-button>
              </span>
              <span v-if="scope.row.state == 0"> -->
              <el-button type="text" @click="editSplash(scope.row)">{{ t('global.edit') }}</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button :disabled="scope.row.state == 2" type="text" @click="deleteSplash(scope.row.id)">{{
                t('global.delete') }}</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button v-if="scope.row.state == 3 || scope.row.state == 1" type="text"
                @click="startUse(scope.row.id, 2)">{{
                  $t('routes.operation_manage_page.start')
                }}</el-button>
              <el-button v-if="scope.row.state == 2" type="text" @click="startUse(scope.row.id, 3)">{{
                $t('routes.operation_manage_page.stop') }}</el-button>
              <!-- </span> -->
            </template>
          </el-table-column>
        </el-table>
        <Pagination v-show="total > 0" :total="total" v-model:page="pageQuery.page" @pagination="pagination"
          v-model:limit="pageQuery.page_size" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, unref, provide } from 'vue';
import formSerch from '@/components/serch-form/index.vue';
import useSearchPlaceholder from './serch';
import { ElMessageBox, ElMessage } from 'element-plus';
import { APIs } from '@/http';
import usePaginationHanlder from '@/components/pagination/pagination';
import { RefObjectKeyRulesType } from '@/components/serch-form/types';
import Pagination from '@/components/pagination/index.vue';
import { store, useStore } from '@/store';
import AddCarousel from '@/views/operation/advertising/components/carousel/AddCarousel.vue';
import _ from 'lodash';
import { useI18n } from 'vue-i18n';
import { get_img_base_url } from '@/utils/imageBaseUrl';
import i18n from '@/locales/index';

function CarState(state: string) {
  if (state == '1') {
    return i18n.global.t('routes.tips.dpush');
  } else if (state == '2') {
    return `<span style="color: #67C23A">${i18n.global.t('routes.tips.start')}</span>`;
  } else if (state == '3') {
    return `<span class="antd-red">${i18n.global.t('routes.tips.stop')}</span>`;
  } else {
    return '-';
  }
}
export default defineComponent({
  name: 'operation-advertising',
  components: { formSerch, AddCarousel, Pagination },
  setup() {
    const { FormDataList } = useSearchPlaceholder();
    const { t } = useI18n({ useScope: 'global' });
    const pageQuery = ref<RefObjectKeyRulesType>({});
    const listQuery = ref<RefObjectKeyRulesType>({});
    const formData = ref({});
    const AddCarouseleRef = ref<any>(null);
    const datas = ref({});
    const store = useStore();
    // 表格高度兼容
    if (window.screen.width * window.devicePixelRatio === 2560 || window.screen.height * window.devicePixelRatio === 1440) {
      store.state.app.tableHeight = 950;
    } else {
      store.state.app.tableHeight = 650;
    }
    // 把所有内容都可以注入到内部，它的所有包含的组件
    provide('AppSplashGetList', getList);
    const options = reactive<any>({
      devices: []
    });
    const { total, pagination } = usePaginationHanlder({
      pageQuery: pageQuery.value,
      hander: getList
    });
    const platformTable = reactive({
      tableData: []
    });

    const isVisible = reactive<any>({
      dialogFlashVisible: false,
      title: '',
      imgUrl: []
    });
    // 返回图片为 h5=11.webp&pc=22.webp 格式，需要格式化一下
    const formatImgUrl = (imgs: string, type: 'h5' | 'pc') => {
      const imgArr = imgs.split('&')
      const imgserver = get_img_base_url();
      return imgserver + (imgArr?.[type === 'h5' ? 0 : 1]?.split('=')[1] || '')
    }
    const onSubmit = (data: any) => {
      pageQuery.value.page = 1;
      listQuery.value = data;
      getList();
    };
    const deleteSplash = (ids: string) => {
      ElMessageBox.confirm(t('global.deletemsg'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      })
        .then(() => {
          APIs.operation
            .operationDelete({
              id: ids
            })
            .then(res => {
              if (res.status) {
                pageQuery.value.page = 1;
                getList();
                ElMessage.success({
                  message: t('global.deletesuc'),
                  type: 'success'
                });
              }
            });
        })
        .catch(() => { });
    };
    const startUse = (ids: string, states: number) => {
      const isStart = ref();
      const requestId = ref();
      if (states == 3) {
        //  3:关闭2:开启
        isStart.value = t('routes.operation_manage_page.stop');
      } else if (states == 2) {
        isStart.value = t('routes.operation_manage_page.start');
      }
      ElMessageBox.confirm(t('routes.finance_manage_page.you_sure') + isStart.value + t('routes.finance_manage_page.mm'), t('global.warning'), {
        confirmButtonText: t('global.sure'),
        cancelButtonText: t('global.cancel'),
        type: 'warning'
      }).then(() => {
        APIs.operation
          .operationState({
            id: ids,
            state: states
          })
          .then(res => {
            if (res.status) {
              getList();
              ElMessage.success({
                message: t('global.set_suc'),
                type: 'success'
              });
            }
          });
      });
    };
    const editSplash = (row: any) => {
      isVisible.title = t('routes.operation_manage_page.edit_cursor');
      isVisible.dialogFlashVisible = true;
      AddCarouseleRef.value.showForm(_.cloneDeep(row));
    };

    const addFlash = () => {
      isVisible.title = t('routes.operation_manage_page.add_cursor');
      isVisible.dialogFlashVisible = true;
      AddCarouseleRef.value.showForm();
    };
    function deviceTotext(device: string) {
      const txt: any = [];
      if (device) {
        const arr = device.split(',');
        if (!options.devices.length) return;
        arr.forEach((p: any) => {
          txt.push(options.devices.find((i: any) => String(i.value) === String(p)).label);
        });
        return txt.join('/');
      }
    }
    function getList() {
      APIs.operation
        .advertisingList({
          ...unref(pageQuery.value),
          ...unref(listQuery.value)
        })
        .then(res => {
          platformTable.tableData = [];
          if (res.status) {
            if (pageQuery.value.page.toString() === '1') {
              total.value = res.data.t;
            }
            if (res.data.d) {
              platformTable.tableData = res?.data?.d;
            }
          }
        });
    }
    return {
      ...toRefs(platformTable),
      onSubmit,
      FormDataList,
      deleteSplash,
      ...toRefs(isVisible),
      editSplash,
      formData,
      addFlash,
      datas,
      getList,
      startUse,
      ...toRefs(options),
      total,
      pagination,
      deviceTotext,
      pageQuery,
      t,
      formatImgUrl,
      AddCarouseleRef,
      CarState
    };
  }
});
</script>
<style lang="scss" scoped>
.betting-cont {
  background: white;

  .betting-table {
    padding: 20px;
    background: white;
  }

  .betting-tables {
    margin-top: 10px;
  }

  .empty {
    height: 20px;
  }

  .no-code {
    color: #9d4d00;
    font-size: 18px;
    font-weight: bold;
  }

  .blue {
    color: #067af5;
  }

  .footer-btn {
    text-align: right;
  }

  .img-center {
    text-align: center;
  }

  .blue-cursor {
    display: inline-block;
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #067af5;
    cursor: pointer;
  }

  .green {
    color: #67C23A;
  }

  .red {
    color: #F56C6C;
  }

  .imgs {
    text-align: center;

    >img {
      width: 100px;
      height: 50px;
    }
  }

  .sarousel-cont {
    height: 100%;
    text-align: center;

    img {
      height: 100%;
    }
  }
}</style>
