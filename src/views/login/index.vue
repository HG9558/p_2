<!--suppress ALL -->
<template>
  <div class="login-cont">
    <h2>{{ t('routes.vip_list_page.title') }}</h2>
    <p>{{ t('routes.vip_list_page.please_login') }}</p>
    <el-form :label-position="labelPosition" ref="refForm" label-width="auto" :model="ruleForm" :rules="rules">
      <el-form-item :label="t('routes.vip_list_page.acount')" prop="username">
        <el-input v-model.trim="ruleForm.username" @keyup.enter="submitForm(refForm)" :placeholder="t('routes.vip_list_page.acount_tips')"></el-input>
      </el-form-item>
      <el-form-item :label="t('routes.vip_list_page.psw')" prop="pwd" class="e-over-row">
        <el-input
          v-model.trim="ruleForm.pwd"
          @keyup.enter="submitForm(refForm)"
          :placeholder="t('routes.vip_list_page.psw_tip')"
          type="password"
          maxlength="24"
        ></el-input>
      </el-form-item>
      <el-form-item :label="t('routes.vip_list_page.password')" prop="seamo">
        <el-input v-model.trim="ruleForm.seamo" @keyup.enter="submitForm(refForm)" :placeholder="t('routes.vip_list_page.psw_tip')" maxlength="6"></el-input>
      </el-form-item>
      <el-form-item class="login-btn">
        <el-button type="primary" @click="submitForm(refForm)">{{ t('routes.vip_list_page.login') }}</el-button>
      </el-form-item>
    </el-form>
    <div class="forget-passward">
      <el-row>
        <el-col :span="18">
          <el-link href="javascript:void(0)">{{ t('routes.vip_list_page.forget_psw') }}</el-link>
        </el-col>
        <el-col :span="6" class="txt-r">
          <el-dropdown>
            <span class="el-dropdown-link" style="cursor: pointer">
              <span>{{ $t('choose_lang') }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="l of languages" :key="l.value" @click="selectLanguage(l.value)">{{ l.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs, computed, watch } from 'vue';
import { useStore } from '@/store/index';
import { useRouter, useRoute } from 'vue-router';
import { password } from '@/utils/expressions';
import { useI18n } from 'vue-i18n';
import { TokenKey, NameKey } from '@/utils/auth';
import Local from '@/utils/storage';

export default defineComponent({
  name: 'Login',
  data() {
    return {
      labelPosition: 'left',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    };
  },
  setup() {
    const { t, locale, availableLocales } = useI18n({ useScope: 'global' });
    const store = useStore();
    const router = useRouter();
    const { query } = useRoute();
    const formeDatas = reactive({
      ruleForm: {
        seamo: '111111'
      }
    });
    const ruleFomes = reactive({
      rules: {
        username: [
          {
            required: true,
            message: t('routes.vip_list_page.acount_tips'),
            trigger: 'blur'
          }
          // {
          //   pattern: email,
          //   message: '请输入正确的邮箱账号！',
          //   trigger: ['blur', 'change']
          // }
        ],
        pwd: [
          {
            required: true,
            message: t('routes.vip_list_page.please_ap'),
            trigger: 'blur'
          },
          {
            pattern: password,
            message: t('routes.vip_list_page.login_tips'),
            trigger: ['blur', 'change']
          }
        ],
        seamo: [
          {
            required: true,
            message: t('routes.vip_list_page.password_psw'),
            trigger: ['blur', 'change']
          }
        ]
      }
    });
    const refForm = ref(null);
    function submitForm(formName) {
      formName.validate(valid => {
        // localStorage.setItem('aaa', formeDatas.ruleForm.name.trim());
        console.log(valid);
        if (valid) {
          store
            .dispatch('user/login', formeDatas.ruleForm)
            .then(res => {
              if (res.status) {
                router.replace(`${query.redirect ? query.redirect : '/vip/list'}`);
              }
            })
            .catch(() => {});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

    const languages = computed(() => {
      const locales = availableLocales.map(l => {
        switch (l) {
          case 'zh-CN':
            return {
              label: '中文',
              value: 'zh-CN'
            };
          case 'vi':
            return {
              label: 'Việt Nam',
              value: 'vi'
            };
          case 'en-US':
            return {
              label: 'English',
              value: 'en-US'
            };
        }
      });
      console.log('locales', locales);
      return locales;
    });

    function selectLanguage(lang) {
      const token = Local.get(TokenKey);
      const name = Local.get(NameKey);
      localStorage.clear();
      localStorage.setItem('language', lang);
      Local.set(TokenKey, token);
      Local.set(NameKey, name);
      // if (locale.value !== lang) {
      //   window.location.reload();
      // }
      // locale.value = lang;
      window.location.href = window.location.origin;
    }

    watch(
      () => formeDatas.ruleForm.seamo,
      n => {
        if (n) {
          formeDatas.ruleForm.seamo = String(n).replace(/[^\d]/g,'')
        }
      }
    );
    
    return {
      ...toRefs(formeDatas),
      ...toRefs(ruleFomes),
      submitForm,
      refForm,
      t,
      languages,
      selectLanguage
    };
  }
});
</script>

<style scoped lang="scss">
.login-cont {
  min-width: 570px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px 70px;
  background: white;
  border-radius: 10px;
}
.login-cont > h2 {
  text-align: center;
}
.login-cont > p:nth-of-type(1) {
  margin-top: 10px;
  margin-bottom: 25px;
  font-size: 14px;
  text-align: center;
  color: rgb(170, 167, 167);
}

.login-btn {
  margin-top: 30px;
}
.login-btn button {
  width: 100%;
}
.forget-passward {
  margin-top: 20px;
}
</style>
<style>
.inputwid .el-form-item__content {
  margin-left: 0 !important;
  margin-top: 10px;
}
</style>
