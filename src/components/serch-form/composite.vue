<template>
  <!-- -->
  <div class="composite">
    <slot name="prepend"></slot>
    <el-input
      v-if="$attrs.type === 'input'"
      clearable
      @keyup.enter="$attrs.onEnterhanlder"
      :placeholder="getPlacehloder($attrs.selectvalue, $attrs.options)"
      v-model.trim="vals"
    ></el-input>
    <el-date-picker
      v-if="['datetimerange', 'daterange'].includes($attrs.type)"
      v-model="vals"
      :type="$attrs.type"
      @change="datechange($event, $attrs.model)"
      unlink-panels
      :range-separator="t('global.zhi')"
      :start-placeholder="t('global.start_date')"
      :end-placeholder="t('global.end_date')"
      :shortcuts="myShortcuts.length ? myShortcuts : shortcuts"
    >
    </el-date-picker>
  </div>
  <!-- <abc type='input' v-model="formInline[item.model]"/> -->
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import useShortcuts from './useShortcuts';
import dayjs from 'dayjs';
import { timerChange } from './useShortcuts';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'Composite',
  props: {
    modelValue: [String, Number, Array],
    compostiteType: {
      type: String as PropType<string>,
      default: ''
    },
    myShortcuts: {
      type: Array,
      default: []
    }
  },
  emits: {
    'update:modelValue': null,
    'update:enterhanlder': null,
    'update:compostiteType': null,
    change: null
  },
  components: {},
  setup(prop, ctx) {
    const { t } = useI18n({ useScope: 'global' });
    const datechange = (e: any, m: any) => {
      ctx.emit('change', e, m);
    };
    // const vals = ref(prop.modelValue);
    const datearr = ref<string[]>(['datetimerange', 'daterange']);
    const vals = computed({
      get: () => prop.modelValue,
      set: value => ctx.emit('update:modelValue', value)
    });
    const compostiteType = computed({
      get: () => prop.compostiteType,
      set: value => ctx.emit('update:compostiteType', value)
    });

    if (compostiteType.value) {
      if (compostiteType.value && datearr.value.includes(compostiteType.value)) {
        if (compostiteType.value === 'daterange') {
          vals.value = [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')];
        } else {
          vals.value = [dayjs().format('YYYY-MM-DD 00:00:00'), dayjs().format('YYYY-MM-DD 23:59:59')];
        }
      }
    }

    function disabledDate(current: any) {
      // return current.getTime() < Date.now();
      const time = timerChange(30);
      return current.getTime() < time[0] || current.getTime() > time[1];
    }

    const getPlacehloder = (selectVal: string, options: any[]) => {
      const val = options.find(item => item.value === selectVal);
      if (val) {
        return val.placeholder;
      } else {
        return '请输入内容';
      }
    };

    const { shortcuts } = useShortcuts();
    return {
      vals,
      getPlacehloder,
      shortcuts,
      datechange,
      disabledDate,
      t
    };
  }
});
</script>

<style scoped lang="scss">
.composite {
  display: flex;
}
</style>
