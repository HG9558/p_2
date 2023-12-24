<template>
  <div class="doubleinput" :class="{ noSubmit: mc ? false : true }">
    <el-input :placeholder="t('global.start_txt')" v-model.trim="min" @blur="change(0)" clearable :maxlength="length"> </el-input>
    {{t('global.zhi')}}
    <el-input :placeholder="t('global.end')" v-model.trim="max" @blur="change(1)" clearable :maxlength="length">
      <template #append v-if="showAppend">{{ t('global.units2') }}</template>
    </el-input>
  </div>
  <p class="notError" v-if="!mc">{{t('global.all_have')}}</p>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'DataAmount',
  props: {
    showAppend: {
      default: false,
      type: [Boolean]
    },
    min: {
      type: [Number, String]
    },
    max: {
      type: [Number, String]
    },
    length: {
      default: 8,
      type: [Number, String]
    }
  },
  emits: ['update:min', 'update:max'],
  setup(props, ctx) {
    const { t } = useI18n({ useScope: 'global' });
    const reg = /^\d+(\.\d{0,2})?$/;
    const min: any = computed({
      get: () => props.min,
      set: value => {
        ctx.emit('update:min', value);
      }
    });
    const mc = computed(() => {
      if ((!min.value && !max.value) || (min.value && max.value)) {
        return true;
      } else {
        return false;
      }
    });
    watch(
      () => min.value,
      n => {
        if (n == '') {
          max.value = '';
        }
      }
    );
    const max: any = computed({
      get: () => props.max,
      set: value => {
        ctx.emit('update:max', value);
      }
    });
    const change = (type: number) => {
      if (type) {
        const val: any = Number.parseFloat(max.value);
        if (Number.isNaN(val)) {
          max.value = '';
        } else {
          max.value = val.toFixed(0);
        }
      } else {
        const val = Number.parseFloat(min.value);
        if (Number.isNaN(val)) {
          min.value = '';
        } else {
          min.value = val.toFixed(0);
        }
      }
      // 判断max不能小于min
      if (Number(max.value) < Number(min.value)) {
        max.value = min.value;
      }
    };
    return {
      min,
      max,
      change,
      mc,
      t
    };
  }
});
</script>
<style lang="scss" scoped>
.doubleinput {
  display: flex;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
}
.doubleinput ::v-deep(.el-input__inner) {
  border: none;
  width: 120px;
  text-align: center;
}
.noSubmit {
  border: 1px solid #f5222d;
}
.notError {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
}
</style>
