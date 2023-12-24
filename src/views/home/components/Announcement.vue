<template>
  <div class="announ-cont" @click.stop="changeModel(false)" v-if="modelValue">
    <div class="announ" @click.stop>
      <!-- <a href="" download="export.csv" id="jjj" style="">download</a> -->
      <div class="announcont">
        <el-button plain @click.stop="changeModel(false)">{{t('routes.vip_list_page.backs')}}</el-button>
        <el-button plain>{{t('routes.vip_list_page.next')}}</el-button>
        <!-- <el-button plain @click="export_csvfn({ data: myCars })"
          >导出csv</el-button
        > -->
      </div>
      <div class="announ-msg">
        <h4>【雷火电竞注单取消通知】</h4>
        <p>
          公告内容详情公告内容详情公告内容详情公告内容详情 公告内容详情公告内容详情公告内容详情公告内容详情 公告内容详情公告内容详情公告内容详情公告内容详情
          公告内容详情公告内容详情公告内容详情公告内容详情 公告内容详情公告内容详情公告内容详情公告内容详情 公告内容详情公告内容详情公告内容详情公告内容详情
          公告内容详情公告内容详情公告内容详情公告内容详情 公告内容详情公告内容详情公告内容详情公告内容详情 公告内容详情公告内容详情公告内容详情公告内容详情
        </p>
        <div>2021-03-505 08：12：38</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, PropType, computed } from 'vue';
import { export_csvfn } from '@/utils/file';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Announcement',
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const { t } = useI18n({ useScope: 'global' });
    const isSee = reactive({
      dialogVisible: true,
      msgSee: true
    });
    const mvCompute = computed({
      get: () => props.modelValue,
      set: val => ctx.emit('update:modelValue', val)
    });
    const changeModel = (bool: boolean) => {
      mvCompute.value = bool;
    };
    const myCars = [
      {
        car: 'Audi',
        price: 40000,
        color: 'blue'
      },
      {
        car: 'BMW',
        price: 35000,
        color: 'black'
      },
      {
        car: 'Porsche',
        price: 60000,
        color: 'green'
      }
    ];
    return {
      ...toRefs(isSee),
      myCars,
      export_csvfn,
      mvCompute,
      changeModel,
      t
    };
  }
});
</script>
<style lang="scss" scoped>
.announ-cont {
  background: rgba(0, 0, 0, 0);
  height: 100%;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  .scroll-text {
    width: 400px;
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
    background: white;
    font-size: 16px;
    color: blue;
  }
  .announ {
    width: 600px;
    padding: 0 10px;
    background: white;
    border: 1px solid #e6dddd;
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    .announcont {
      height: 60px;
      line-height: 60px;
      text-align: right;
      border-bottom: 1px solid #e0e0e0;
    }
    .announ-msg {
      > h4 {
        margin-top: 15px;
      }
      > p {
        margin: 20px;
        font-size: 14px;
        color: #675a5a;
        text-indent: 28px;
        text-align: justify;
        line-height: 30px;
      }
      > div {
        padding: 0 20px 20px 0;
        text-align: right;
        font-size: 14px;
        color: #777070;
      }
    }
  }
}
</style>
