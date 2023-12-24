<template>
  <div style="width: 100%" ref="editor"></div>
</template>
<script>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import WangEditor from 'wangeditor';
import { unescape } from 'xe-utils';
import Session from '@/utils/storage';
import { parseUrl } from 'xe-utils';
import { devImgBaseUrl } from '@/utils/imageBaseUrl';
import { envBase } from '@/utils/imageBaseUrl';

export default {
  name: 'app',
  props: {
    // 图片上传服务器地址
    uploadUrl: {
      type: String,
      default: process.env.NODE_ENV === 'development' ? 'http://34.92.245.49:3131/bucket' : '/merchant/banner/upload'
    },

    // 默认内容
    defaultTxt: {
      type: String,
      default: ''
    },

    // 链接效验
    linkReg: {
      type: RegExp,
      default: /.*/g
    },

    // 图片链接效验
    imgLinkReg: {
      type: RegExp,
      default: /.*/g
    }
  },

  setup(props, ctx) {
    const editor = ref();
    let flag = true;
    let instance;

    onMounted(() => {
      instance = new WangEditor(editor.value);

      watch(
        () => props.defaultTxt,
        v => {
          // 编辑器设置默认内容
          if (flag) {
            instance.txt.html(unescape(v));
          }
        }
      );
      let env = envBase;
      Object.assign(instance.config, {
        onchange() {
          // 事件派发
          flag = false;
          ctx.emit('change', instance.txt.html(), instance.txt.text());
        },

        zIndex: 1,

        // 图片上传url
        uploadImgServer: props.uploadUrl,

        // 图片大小限制为 5M
        uploadImgMaxSize: 5 * 1024 * 1024,

        // 限制一次最多上传 10 张图片
        uploadImgMaxLength: 10,

        // 图片上传超时 10S
        uploadImgTimeout: 10000,

        // 文件字段名，
        uploadFileName: 'file',

        // 请求头带token
        uploadImgHeaders: {
          t: Session.get('token')
        },

        uploadImgHooks: {
          customInsert(insertImg, result) {
            if (result.status) {
              ctx.emit('upload-success', result);
              insertImg(`${env}${result.data}`);
            } else {
              ctx.emit('upload-fail', result);
            }
          }
        },

        // 效验插入链接有效性 返回 true 表示校验成功
        linkCheck(text, link) {
          // console.log(text) // 插入的文字
          // console.log(link) // 插入的链接
          return props.linkReg.test(link);
        },

        // 效验插入图片有效性 返回 true 表示校验成功
        linkImgCheck(src) {
          console.log('图片链接===》', src);
          return props.imgLinkReg.test(src);
        }
      });
      instance.create();
    });

    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });

    const clearFunc = () => {
      instance.txt.html('');
      instance.txt.text('');
    }

    return {
      clearFunc,
      editor
    };
  }
};
</script>
