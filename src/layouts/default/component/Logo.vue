<template>
  <div class="logo">{{ !isCollapse ? t('global.logo_title') : (getPlatformName() || '').split('')[0] }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n';
import { getPlatformName } from '@/utils';

export default defineComponent({
  name: 'Logo',
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const { state } = useStore();
    return {
      isCollapse: computed(() => state.app.leftFoldStatus),
      getPlatformName,
      t
    };
  }
});
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
}
</style>
