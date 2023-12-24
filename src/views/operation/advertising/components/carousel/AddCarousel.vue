<template>
  <div class="add-flash">
    <el-dialog :title="title" v-model="dialogComputed" width="830px" @close="onClose" :close-on-click-modal="false">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="auto"
        :style="{
          paddingBottom: timeIsCheck ? '260px' : '0px'
        }"
      >
        <el-form-item :label="t('routes.tips.title')" prop="title" width="150">
          <el-input v-model="formData.title" :placeholder="t('routes.operation_manage_page.enter_t')" clearable :style="{ width: '100%' }"></el-input>
        </el-form-item>

        <el-form-item :label="t('routes.tips.link_type')" prop="url_type">
          <el-select v-model="formData.url_type" :placeholder="t('routes.operation_manage_page.s_link_type')" :style="{ width: '100%' }" @change="getPlayType">
            <el-option
              v-for="(item, index) in [
                // {
                //   label: t('routes.tips.no_linkage'),
                //   value: '5'
                // },
                {
                  label: t('routes.tips.instation'),
                  value: '1'
                },
                {
                  label: t('routes.tips.outside_station'),
                  value: '2'
                },
              ]"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="t('routes.operation_manage_page.detail_link')"
          v-if="formData.url_type != 3 && formData.url_type != 5"
          prop="redirect_url"
          :rules="[
            {
              required: true,
              message: t('routes.tips.link_detail'),
              trigger: 'change'
            },
            {
              pattern: formData.url_type == 2 ? https : https_o,
              message: formData.url_type == 2 ? https_prompt : https_o_prompt
            }
          ]"
        >
          <el-input
            v-model="formData.redirect_url"
            :disabled="formData.url_type == '0'"
            :placeholder="t('routes.operation_manage_page.s_link')"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.operation_manage_page.platform_rebate')" v-else-if="formData.url_type == 3" prop="redirect_url">
          <el-select v-model="formData.redirect_url" :placeholder="t('routes.operation_manage_page.s_link_type')" :style="{ width: '100%' }">
            <el-option v-for="(item, index) in platformList" :key="index" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="t('global.select_tip')" prop="state">
          <el-radio-group v-model="formData.state" size="medium">
            <el-radio v-for="(item, index) in bannerStateOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="t('global.sortabled')" prop="seq" width="150">
          <el-input v-model.trim="formData.seq" :placeholder="t('routes.operation_manage_page.enter_sort')" clearable :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <el-form-item :label="t('routes.operation_manage_page.pic_addr_h5')" prop="imagesH5">
          <k-upload v-model="formData.imagesH5" :accept="'.webp'" @urlStr="(val:string)=>{urlStrFun(val,'imagesH5')}" :EUrl="formData.imagesH5" uploadUrl="tenant/banner/upload" ref="sonRef"></k-upload>
        </el-form-item>
        <el-form-item :label="t('routes.operation_manage_page.pic_addr_pc')" prop="imagesPc">
          <k-upload v-model="formData.imagesPc" :accept="'.webp'" @urlStr="(val:string)=>{urlStrFun(val,'imagesPc')}" :EUrl="formData.imagesPc" uploadUrl="tenant/banner/upload" ref="sonRef2"></k-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="handelConfirm">{{ t('global.sure') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch, computed, inject } from 'vue';
import { ElMessage, ElForm } from 'element-plus';
import { rules } from './rules';
import { operationLinkType, operationTimeType, carouseAddType, carouselLinkType } from '@/utils/selectOptions';
import { APIs } from '@/http';
import { useStore } from '@/store';
import _ from 'lodash';
import { useI18n } from 'vue-i18n';
import { https, https_o, https_o_prompt, https_prompt } from '@/utils/expressions';
import { get_img_base_url } from '@/utils/imageBaseUrl';
import { getPlatformOptions } from '@/utils/requestOptions';
import { bannerStateOptions} from '@/views/site/venues-components/common';

export default defineComponent({
  name: 'AddCarousel',
  components: {},
  props: {
    modelValue: Boolean,
    datas: Object,
    title: String
  },
  emits: ['update:modelValue', 'change'],
  setup(props, context) {
    const AppSplashGetList = inject<any>('AppSplashGetList');
    const { t } = useI18n({ useScope: 'global' });
    const kupload = ref<any>();
    const platformList = ref<any>([]);
    const sonRef = ref<typeof elForm|null>(null);
    const sonRef2 = ref<typeof elForm|null>(null);
    const formData = ref<any>({
    });
    const dialogComputed = computed({
      get: () => props.modelValue,
      set: value => context.emit('update:modelValue', value)
    });
    getPlatformOptions().then(res => {
      platformList.value = res;
    });
    function resetFields() {
      if (elForm.value) {
        (elForm.value as typeof ElForm).resetFields();
      }
    }
    // 返回图片为 h5=11.webp&pc=22.webp 格式，需要格式化一下
    const formatImgs = (imgs:string|any[])=>{
      // 
      const imageServer = get_img_base_url();
     if(Array.isArray(imgs)){
          return `h5=${imgs[0].replace(imageServer,'')}&web=${imgs[1].replace(imageServer,'')}`
     }else{
       
        const imgArr = (imgs as string).split('&')
        return imgArr.map((item)=>{
          return imageServer+(item.split('=')[1] ||'')
        })
     }
    }
    // 回显
    const showForm = (data: any = {}) => {
      if (Object.keys(data).length) {
        // 编辑
      const newData = _.cloneDeep(data);
       const obj = { 
        imagesH5:(formatImgs(newData.images) as string[])[0],
        imagesPc:(formatImgs(newData.images) as string[])[1],
      }
        if (data.url_type === 0 || data.url_type) {
          newData.url_type = newData.url_type.toString();
        }
        formData.value = Object.assign({}, newData, obj);
      } else {
        // 新增
        resetFields();
        try {
          sonRef.value!.clearFunc();
          sonRef2.value!.clearFunc();
        } catch (e) {
          console.log(e);
        }
        formData.value = {
          url_type: '1'
        };
      }
    };
    const store = useStore();
    // store.dispatch('app/setDeviceTypes').then(res => {
    //   options.devices = res;
    //   options.devices.shift();
    // });
    const elForm = ref<typeof ElForm | null>(null);
    const cancel = () => {
      dialogComputed.value = false;
    };
    // 提交
    const handelConfirm = () => {
      const obj = {
        ..._.cloneDeep(formData.value),
        // 没有的参数需要传入空字符串
        id:formData.value?.id||'',
        updated_name:formData.value?.updated_name||'',
        updated_uid:formData.value?.updated_uid||'',
        created_at:formData.value?.created_at||0,
        updated_at:formData.value?.updated_at||0,
        url_type:+formData.value.url_type, //number类型
        seq:+formData.value.seq //number类型
      };
      if (elForm.value) {
        elForm.value.validate((valid: boolean) => {
          if (valid) {
            obj.images = formatImgs([formData.value.imagesH5,formData.value.imagesPc]);
            delete obj.imagesH5;
            delete obj.imagesPc;
            delete obj.redirect_url_o;
            if (props.title === t('routes.operation_manage_page.add_cursor')) {
              APIs.operation
                .insertAdvertising({
                  ...obj,
                })
                .then(res => {
                  if (res.status) {
                    AppSplashGetList();
                    ElMessage.success({
                      message: t('global.addsuc'),
                      type: 'success'
                    });
                    dialogComputed.value = false;
                    sonRef.value!.clearFunc();
                    sonRef2.value!.clearFunc();
                  }
                });
            }
            if (props.title === t('routes.operation_manage_page.edit_cursor')) {
              APIs.operation
                .operationUpdate({
                  ...obj,
                })
                .then(res => {
                  if (res.status) {
                    AppSplashGetList();
                    ElMessage.success({
                      message: t('global.editsuc'),
                      type: 'success'
                    });
                    dialogComputed.value = false;
                    sonRef.value!.clearFunc();
                    sonRef2.value!.clearFunc();
                  }
                });
            }
          } else {
            return false;
          }
        });
      }
    };
    const onClose = () => {
      if (elForm.value) {
        elForm.value.clearValidate();
      }
      (elForm.value as typeof ElForm).resetFields();
      dialogComputed.value = false;
    };

    const timeIsCheck = ref(false);

    const urlStrFun = (val: string,key:string) => {
      formData.value[key] = val;
    };

    const getPlayType = () => {
      formData.value.redirect_url = '';
    };

    return {
      t,
      timeIsCheck,
      formData,
      dialogComputed,
      elForm,
      kupload,
      sonRef,
      sonRef2,
      platformList,
      rules,
      https,
      https_prompt,
      https_o,
      https_o_prompt,
      operationTimeType,
      operationLinkType,
      carouseAddType,
      carouselLinkType,
      cancel,
      onClose,
      handelConfirm,
      getPlayType,
      showForm,
      urlStrFun,
      bannerStateOptions
    };
  }
});
</script>
<style lang="scss" scoped>
//.add-flash {
//  .footer-btn {
//    text-align: right;
//  }
//  ::v-deep(.el-upload-list__item) {
//    width: 100px;
//    height: 100px;
//  }
//  ::v-deep(.el-upload--picture-card) {
//    width: 100px;
//    height: 100px;
//
//    i {
//      transform: translate(0%, -60%);
//    }
//  }
//}
</style>
