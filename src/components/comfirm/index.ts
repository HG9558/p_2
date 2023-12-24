import { ElMessageBox } from 'element-plus';
import DynamicVerificationCodeComponent from '@/components/dynamic-verification-code/index.vue';

// 验证码接口
function QezApi(value: string) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}

/**
 * @动态验证码功能
 * @returns Promise
 */
export function CFCustomCode() {
  return new Promise((resolve, reject) => {
    resolve(resolve);
    // ElMessageBox.prompt(
    //   '<span style="color: #F56C6C">*</span> 请输入动态验证码',
    //   '动态验证码验证',
    //   {
    //     confirmButtonText: '确认',
    //     cancelButtonText: '取消',
    //     inputPattern: /\S/,
    //     inputErrorMessage: '动态验证码不能为空',
    //     dangerouslyUseHTMLString: true,
    //     async beforeClose(action: any, instance: any, done: any) {
    //       if (action === 'confirm') {
    //         instance.confirmButtonLoading = true;
    //         instance.confirmButtonText = '验证中...';
    //         const code = await QezApi(instance.inputValue);
    //         setTimeout(() => {
    //           resolve(code);
    //           instance.confirmButtonLoading = false;
    //           done();
    //         }, 300);
    //       } else {
    //         done();
    //       }
    //     }
    //   }
    // )
    //   .then(({ value }) => {
    //     // 请求接口，成功才回调
    //     // setTimeout(() => {
    //     //   resolve(value);
    //     // }, 2000);
    //   })
    //   .catch(() => {});
  });
}
