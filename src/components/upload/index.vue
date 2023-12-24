<template>
  <div class="uplaod">
    <el-upload
      :action="baseURL"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="success"
      :on-change="change"
      :before-upload="beforeUpload"
      :file-list="file_list"
      :multiple="limit > 1 ? true : false"
      :accept="accept"
      :class="[file_list.length >= limit ? 'hideStyle': 'showStyle']"
      :limit="limit"
      :headers="{t:token}"
      :http-request="customUploadFn"
      name="uploadfile"
    >
      <el-icon class="el-icon-plus" v-if="!imgUrl"></el-icon> 
      <div slot="file" class="imgBox">
        <img class="el-upload-list__item-thumbnail" :src="imgUrl" alt="">
      </div>
    </el-upload>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <slot name="tip">
      <div class="global_tip" v-if="!sizeText">{{ t('routes.operation_manage_page.pic_tip1') }}</div>
      <div class="global_tip" v-if="sizeText === 's_size'">{{ t('routes.operation_manage_page.s_size') }}</div>
      <div class="global_tip" v-else-if="sizeText === 's_size2'">{{ t('routes.operation_manage_page.s_size2') }}</div>
      <div class="global_tip" v-if="sizeText === 's_size3'">{{ t('routes.operation_manage_page.s_size3') }}</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, onMounted } from 'vue';
import type { UploadProps, UploadUserFile } from 'element-plus'
import axios from 'axios';
import Local from '@/utils/storage';
import { useI18n } from 'vue-i18n';
import { ElMessage, ElLoading } from 'element-plus';
import { store } from '@/store';
import { cborDecrypt } from 'cg-utils';
export default defineComponent({
  name: 'Upload',
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
      default: 1
    },
    // 图片类型
    accept: {
      type: String,
      default: '.webp'
    },
    // 图片说明
    sizeText: {
      type: String,
      default: ''
    },
    // 图片地址
    EUrl: {
      type: String,
      default: ''
    },
    uploadUrl:{
      type: String,
      default: '',
      require:true
    }
  },
  emits: ['update:fileSucList'],
  setup(props, ctx) {
    const { t } = useI18n();
    const file_list = ref<UploadUserFile[]>([]);
    const dialogImageUrl = ref<string>('')
    const baseURL = ref<string>('')
    const domain = Local.get('domain');
    const dialogVisible = ref<boolean>(false)
    const fullscreenLoading = ref();
    const imgUrl = ref<string>('');
    const token = ref<any>(store.getters['user/getToken']);
    onMounted(() => {
      console.log('ENVI',ENVI);
      baseURL.value = ENVI === 'dev' ? `/dev/${props.uploadUrl}`:`/${props.uploadUrl}`;
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
      console.log(fileList,"change!!")
      file_list.value = fileList;
    }

    // 移除
    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      imgUrl.value = '';
      ctx.emit('urlStr', '', props.typeVal);
      file_list.value = [];
      console.log(uploadFile, uploadFiles);
    }

    // 查看图片
    const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
      dialogVisible.value = true;
      dialogImageUrl.value = uploadFile.url;
      console.log(dialogImageUrl.value, uploadFile.url);
    }

    // 成功回调
    const success = (res:any) => {
      console.log(res,'res')
      console.log('fileres  :', res );
      if (res.status) {
        // let imgUrl = url + res.data + '.webp';
        ctx.emit('urlStr', `/${res.data}`, props.typeVal)
      } else {
        ElMessage.error(res.data);
      }
    }

    const clearFunc = () => {
      file_list.value = [];
      imgUrl.value = '';
    }

    const getImg = (ep: any, imgSize: string) => {
      if (!imgSize) return;
      let img = new Image();
      img.src = ep.url;
      if(img.complete){
        if (imgSize !== `${img.width}*${img.height}`) {
          handleRemove(ep)
          fullscreenLoading.value.close();
          return ElMessage.error(`宽高不是${imgSize}`);
        }
      }else{
        // 加载完成执行
        img.onload = function(){
          if (imgSize !== `${img.width}*${img.height}`) {
            handleRemove(ep)
            fullscreenLoading.value.close();
            return ElMessage.error(`宽高不是${imgSize}`);
          }
        }
      }
    }

    watch(
      () => props.EUrl,
      (n) => {
        // 判断有无webp、http
        if (n) {
          if ( !n.includes('http')) {
            imgUrl.value = domain + props.EUrl;
          } else if (n.includes('http')) {
            imgUrl.value = props.EUrl;
          } 
          // else if (!n.includes('.webp') && n.includes('http')) {
          //   imgUrl.value = props.EUrl + '.webp';
          // } else if (!n.includes('.webp') && !n.includes('http')) {
          //   imgUrl.value = domain + props.EUrl + '.webp';
          // }
        }
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
    const customUploadFn = (options:any)=>{
      console.log(options);
      let form = new FormData();
      form.append(
        'uploadfile',options.file
      )
      const service = axios.create({
        headers:options.headers,
        responseType:'arraybuffer'
      })
      service.post(props.uploadUrl,form).then((res)=>{
        // 解密
        res.data =  res?.data && cborDecrypt(res.data)
        options.onSuccess(res.data)
      }).catch((error)=>{
        throw new Error(error);
      }).finally(()=>{
        fullscreenLoading.value.close();
      })
    }
    return {
      success,
      change,
      clearFunc,
      handleRemove,
      beforeUpload,
      handlePictureCardPreview,
      t,
      token,
      fullscreenLoading,
      dialogVisible,
      dialogImageUrl,
      file_list,
      baseURL,
      imgUrl,
      customUploadFn,
    };
  }
});
</script>

<style scoped>
.hideStyle ::v-deep(.el-upload--picture-card) {
  display: none;
}

::v-deep(.el-icon-close) {
  position: absolute;
  right: -10px;
  top: -10px;
}

::v-deep(.el-upload-list__item) {
  height: 148px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgBox {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
}

::v-deep(.el-upload-list__item-thumbnail) {
  width: auto !important;
  height: auto !important;
}
</style>
