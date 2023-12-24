import { reactive, getCurrentInstance } from 'vue';
import { syspsw, syspswMsg, adminPassword, syspswUserNameMsg } from '@/utils/expressions';
import i18n from '@/locales';
export default function useValidate() {
  const app = getCurrentInstance();
  const $message = app?.appContext.config.globalProperties.$message;

  const validateGroupUser = (rule: any, value: any, callback: any) => {
    callback();
  };

  const formRules = reactive({
    name: [
      { required: true, message: i18n.global.t('routes.system.acount_tips'), trigger: 'blur' },
      { pattern: syspsw, message: syspswUserNameMsg, trigger: 'blur' }
      // { max: 24, message: '长度在 2 到 24个字符', trigger: 'blur' }
    ],
    group_id: [
      {
        required: true,
        message: i18n.global.t('routes.system.character_tips'),
        trigger: 'blur',
        validator: validateGroupUser
      }
    ],
    password: [
      { required: true, message: i18n.global.t('routes.system.login_psw_tips'), trigger: 'blur' },
      { pattern: adminPassword, message: syspswMsg, trigger: 'blur' }
    ],
    passwordRepeat: [
      { required: true, message: i18n.global.t('routes.system.login_psw_confirm_tips'), trigger: 'blur' },
      { pattern: adminPassword, message: syspswMsg, trigger: 'blur' }
    ],
    seamo: [{ required: true, message: i18n.global.t('routes.system.dynamic_psw_tips'), trigger: 'blur' }],
    state: [{ required: true, message: i18n.global.t('routes.system.role_state_tips'), trigger: 'blur' }]
  });

  const validateForm = (formInfo: any) => {
    if (formInfo.group_id === -1) {
      $message.warning(i18n.global.t('routes.system.character_tips'));
      return false;
    }
    if (formInfo.state === -1) {
      $message.warning(i18n.global.t('routes.system.role_state_tips'));
      return false;
    }
    if (formInfo.password !== formInfo.passwordRepeat) {
      $message.warning(i18n.global.t('routes.system.psw_fail'));
      return false;
    }
    return true;
  };

  return {
    formRules,
    validateForm
  };
}
