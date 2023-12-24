<template>
  <div class="doubleinput" :class="{ noSubmit: mc ? false : true }">
    <el-input :placeholder="t('global.start_txt')" v-model="min" @blur="change(0)" clearable> </el-input>
    {{t('global.zhi')}}
    <el-input :placeholder="t('global.end')" v-model="max" @blur="change(1)" clearable> </el-input>
  </div>
  <p class="notError" v-if="!mc">{{t('global.all_have')}}</p>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'DecimalData',
  props: {
    min: {
      type: [Number, String]
    },
    max: {
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
      if ((!min.value && !max.value) || ((min.value || min.value===0) && (max.value || max.value===0))) {
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
          max.value = val;
        }
      } else {
        const val = Number.parseFloat(min.value);
        if (Number.isNaN(val)) {
          min.value = '';
        } else {
          min.value = val;
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
  width: 100px;
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
