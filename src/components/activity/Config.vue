<template>
  <div>
    <Tab style="margin-left: 10px;" :msg="t('routes.operation_manage_page.pz_message')" />
    <div style="height:20px"></div>
    <el-form-item :label="t('routes.operation_manage_page.activity_title')" prop="title" :rules="[
      { required: true, message: t('routes.operation_manage_page.activity_title_tips'), trigger: 'change' },
    ]">
      <el-input v-model="title" :placeholder="t('routes.operation_manage_page.activity_title_tips')" clearable
        maxlength="255"></el-input>
    </el-form-item>
    <el-form-item :label="t('routes.operation_manage_page.activity')" prop="sort" :rules="[
      { required: true, message: t('routes.operation_manage_page.enter_active_sort'), trigger: 'change' },
    ]">
      <el-input v-model="sort" type="number" :placeholder="t('routes.operation_manage_page.enter_active_sort')"
        clearable maxlength="255"></el-input>
    </el-form-item>
    <br>
    <el-form-item :label="t('routes.operation_manage_page.activity_zq')" prop="period">
      <el-radio-group v-model="period" prop="period">
        <el-radio v-for="item in selectTimeType" :key="item.value" :label="item.value">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <br>
    <el-form-item :label="t('routes.operation_manage_page.show_time')" prop="time1" :rules="[
      { required: true, message: t('routes.operation_manage_page.s_showt'), trigger: 'change' },
    ]">
      <el-date-picker v-model="time1Str" type="datetime" :range-separator="t('global.zhi')"
        :placeholder="t('routes.operation_manage_page.s_showt')" clearable>
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="t('routes.operation_manage_page.activity_time')" v-show="period === 1" prop="time2" :rules="[
      { required: true, message: t('routes.operation_manage_page.select_time'), trigger: 'change' },
    ]">
      <el-date-picker v-model="time2" type="datetimerange" :range-separator="t('global.zhi')"
        :start-placeholder="t('global.start_date')" :end-placeholder="t('global.end_date')" clearable>
      </el-date-picker>
    </el-form-item>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import Tab from './Tab.vue'
import {
  selectTimeType
} from '@/utils/selectOptions';
import { ref, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
interface Config {
  title: string;
  sort: string;
  period: 1 | 2;
  time1: any[];
  time2: any[];
}

const props = withDefaults(defineProps<Config>(), {
  title: '',
  sort: '',
  period: 1,
})
const emit = defineEmits(['update:title', 'update:sort', 'update:period', 'update:time1', 'update:time2'])

const title = useVModel(props, 'title', emit)
const sort = useVModel(props, 'sort', emit)
const period = useVModel(props, 'period', emit)
const time1 = useVModel(props, 'time1', emit)
const time2 = useVModel(props, 'time2', emit)
const { t } = useI18n({ useScope: 'global' });
// 展示时间
const time1Str = ref(props.time1[0]);

watch(props, (val) => {
  if (props.time1) time1Str.value = typeof props.time1 === 'string' ? props.time1 : props.time1[0];
}, { immediate: true, deep: true })

// watchEffect(() => {
//   time1Str.value = props.time1[0];
// })

watch(time1Str, (val) => {
  if (val) {
    time1.value = [val]
  }
})

</script>

<style lang="scss" scoped>

</style>