<template>
  <div class="uplaod">
    <ul class="el-upload-list el-upload-list--picture-card">
      <draggable class="wrapper" v-model="rulesList" @start="drag = true" @end="endFunc" item-key="id">
        <template #item="{ element }">
          <li class="el-upload-list__item is-success animated">
            <img :src="domain + element" alt="" class="el-upload-list__item-thumbnail ">
            <i class="el-icon-close"></i>
            <span class="el-upload-list__item-actions">
              <!-- 预览 -->
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(domain + element)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <!-- 删除 -->
              <span class="el-upload-list__item-delete" @click="handleRemove(element)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </li>
        </template>
      </draggable>
    </ul>
    <el-upload v-model="rulesList" v-if="rulesList.length < limit" :action="baseURL" list-type="picture-card"
      :on-remove="handleRemove" :on-success="success" :on-change="change" :on-preview="handlePictureCardPreview"
      :before-upload="beforeUpload" :file-list="file_list" :show-file-list="false" accept=".png" :limit="limit">
      <el-icon class="el-icon-plus"></el-icon>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <slot name="tip">
      <div class="global_tip" v-if="!sizeText">{{ t('routes.operation_manage_page.pic_tip1') }}</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import type { UploadProps, UploadUserFile } from 'element-plus';
import { ElLoading, ElMessage } from 'element-plus';
import Local from '@/utils/storage';
import { useI18n } from 'vue-i18n';
import draggable from 'vuedraggable';

export default defineComponent({
  name: 'uploads',
  props: {
    // 图片类型
    typeVal: {
      type: String as PropType<string>,
      default: ''
    },
    // 图片尺寸 imgSize="1242*2700"
    imgSize: {
      type: String as PropType<string>,
      default: ''
    },
    // 图片数量 默认为1
    limit: {
      type: Number,
      default: 15
    },
    // 图片类型
    accept: {
      type: String,
      default: '.png'
    },
    // 图片说明
    sizeText: {
      type: String,
      default: ''
    },
    // 图片地址
    EUrl: {
      type: Array,
      default: []
    }
  },
  emits: ['update:fileSucList'],
  components: {
    draggable,
  },
  setup(props, ctx) {
    const { t } = useI18n();
    const file_list = ref<UploadUserFile[]>([]);
    const rulesList: any = ref([]);
    const dialogImageUrl = ref<string>('')
    const baseURL = ref<string>('')
    const domain = Local.get('domain');
    const dialogVisible = ref<boolean>(false)
    const fullscreenLoading = ref();

    onMounted(() => {
      baseURL.value = ENVI === 'prod' ? 'https://upload.td22t5f.com/' : 'http://34.92.245.49:3131/bucket';
    });

    // 上传之前
    const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
      // loading
      fullscreenLoading.value = ElLoading.service({
        lock: true,
        text: t('routes.system.loading'),
        background: 'rgba(0, 0, 0, 0.7)',
      })
      if (rawFile.size / 1024 / 1024 > 1.5) {
        ElMessage.error('Avatar picture size can not exceed 1.5M!');
        fullscreenLoading.value.close();
        return false
      }
      return true
    }

    const change = (file, fileList) => {
      file_list.value = fileList;
    }

    // 移除
    const handleRemove = (url: string) => {
      let arr = [];
      arr = props.EUrl.filter((item: string) => item !== url);

      file_list.value = file_list.value.filter((item: any) => item.response.data !== url.replace('/', ''));

      ctx.emit('urlRem', arr, props.typeVal);
    }

    // 查看图片
    const handlePictureCardPreview = (url: string) => {
      dialogVisible.value = true;
      dialogImageUrl.value = url;
    }

    // 成功回调
    const success = (res) => {
      fullscreenLoading.value.close();
      if (res.status) {
        ctx.emit('urlStr', `/${res.data}`, props.typeVal)
      } else {
        ElMessage.error(res.data);
      }
    }

    const clearFunc = () => {
      file_list.value = [];
      rulesList.value = [];
    }

    const endFunc = () => {
      ctx.emit('urlRem', rulesList.value, props.typeVal);
    }

    const getImg = (ep: any, imgSize: string) => {
      if (!imgSize) return;
      let img = new Image();
      img.src = ep.url;
      if (img.complete) {
        if (imgSize !== `${img.width}*${img.height}`) {
          handleRemove(ep)
          fullscreenLoading.value.close();
          return ElMessage.error(`宽高不是${imgSize}`);
        }
      } else {
        // 加载完成执行
        img.onload = function () {
          if (imgSize !== `${img.width}*${img.height}`) {
            handleRemove(ep)
            fullscreenLoading.value.close();
            return ElMessage.error(`宽高不是${imgSize}`);
          }
        }
      }
    }

    // TODO 监听数组
    watch(
      () => [...props.EUrl],
      (n) => {
        rulesList.value = n;
      },
      {
        immediate: true
      }
    );

    watch(
      () => file_list.value.length,
      () => {
        // 判断有无webp、http
        file_list.value.forEach((ep: any) => {
          getImg(ep, props.imgSize);
        });
      },
      {
        immediate: true
      }
    );

    return {
      success,
      change,
      rulesList,
      clearFunc,
      endFunc,
      handleRemove,
      beforeUpload,
      handlePictureCardPreview,
      t,
      fullscreenLoading,
      dialogVisible,
      dialogImageUrl,
      file_list,
      baseURL,
      domain,
    };
  }
});
</script>

<style lang="scss" scoped>
.uplaod {
  display: flex;
  position: relative;
  padding-bottom: 30px;

  .global_tip {
    width: 180px;
    position: absolute;
    bottom: 0px;
  }
}
</style>
