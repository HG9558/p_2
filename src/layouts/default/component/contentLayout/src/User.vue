<template>
  <div class="dropdown">
    <el-dropdown>
      <span class="el-dropdown-link mgr-20" style="cursor: pointer">
        <span>{{ $t('choose_lang') }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="l of languages" :key="l.value" @click="selectLanguage(l.value)">{{ l.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <span class="el-dropdown-link"> {{ username }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click.native="logout">{{ t('global.logout') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, computed, ref, getCurrentInstance, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';
import { getPermission, } from './ts/iNotify';
import Local from '@/utils/storage';
import { TokenKey, NameKey } from '@/utils/auth';
import { events, mqttConnect } from '@/http/mqtt';
import event from '@/utils/bus';

export default defineComponent({
  name: 'HeaderUser',
  setup(props, context) {
    // getPermission('1');
    const router = useRouter();
    const store = useStore();
    const { t, locale, availableLocales } = useI18n({ useScope: 'global' });
    const logout = (arg: any) => {
      store.dispatch('user/logout', 2);
    };

    event.$on(events.NOTICE_REPLY, getPermission);
    event.$on(events.NOTICE_CLICK_EVENT, (text: string) => {
      console.log(text);
      router.push(text);
    });

    if (Local.get('socketUser')) {
      const url = Local.get('socketUrl')[0];
      const user = Local.get('socketUser');
      const pass = Local.get('socketPass');
      // mqttConnect(url, user, pass);
    }

    const languages = computed(() => {
      const locales = availableLocales.map(l => {
        switch (l) {
          case 'zh-CN':
            return {
              label: '中文',
              value: 'zh-CN'
            };
          case 'en-US':
            return {
              label: 'English',
              value: 'en-US'
            };
        }
      });
      return locales;
    });
    function selectLanguage(lang: any) {
      const token = Local.get(TokenKey);
      const name = Local.get(NameKey);
      const socketUrl = Local.get('socketUrl');
      const socketUser = Local.get('socketUser');
      const domain = Local.get('domain');
      const socketPass = Local.get('socketPass');
      const prefix = Local.get('prefix');
      localStorage.clear();
      localStorage.setItem('language', lang);
      Local.set(TokenKey, token);
      Local.set(NameKey, name);
      Local.set('socketUrl', socketUrl);
      Local.set('socketUser', socketUser);
      Local.set('domain', domain);
      Local.set('socketPass', socketPass);
      Local.set('prefix', prefix);
      if (locale.value !== lang) {
        window.location.reload();
      }
      // locale.value = lang;
    }
    return {
      logout,
      username: computed(() => store.state.user.name),
      selectLanguage,
      languages,
      t
    };
  }
});
</script>
<style lang="scss" scoped>
.dropdown {
  padding: 1px 10px 0 10px;
}
.msg {
  margin-right: 25px;
}
.renwu {
  line-height: 30px;
}
</style>
