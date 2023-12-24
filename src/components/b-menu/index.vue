<template>
  <div class="b_menu" :class="{ 'border-card': isCard }">
    <div class="tab_compnent_style">
      <el-tabs :key="elTabsVeridom" v-model="activeName" @tab-click="handleSelect" :type="borderCard" ref="tabs">
        <el-tab-pane v-for="(item, i) in nameList" :label="item.text" :name="item.name" :key="i">
          <template #label>
            <span>{{ t(item.text) }}</span>
            <span v-if="item.notice" style="color: rgba(0, 0, 0, 0.75)">{{ ` ${item.notice}` }}</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- v-if="$attrs.keepalive" -->
    <keep-alive  v-if="$props.keepalive">
      <component :is="activeComponent"></component>
    </keep-alive>
    <component :is="activeComponent" :key="activeName" v-else></component>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted, provide } from 'vue';
import { useRoute } from 'vue-router';
import { ElTabs } from 'element-plus';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'b-menu',
  props: {
    nameList: {
      type: Array,
      default: []
    },
    borderCard: {
      type: String,
      default: ''
    },
    isCard: {
      type: Boolean,
      default: false
    },
    isOne: {
      type: Boolean,
      default: true
    },
    keepalive:{
      type:Boolean,
      default:true
    }
  },
  setup(props) {
    const activeName = ref<number | string>('');
    const { t, locale } = useI18n();
    const elTabsVeridom = ref<number>(1);
    const tabs = ref<any>();
    const nameList = props.nameList;
    // 根据query 的 name获取当前显示哪个menu
    const { query, path } = useRoute();
    provide('activeName',activeName)
    watch(
      () => locale.value,
      () => {
        if (locale.value) {
          // elTabsVeridom.value++;
          if (tabs.value) {
            resetTabActivePosition(tabs.value.$el);
          }
        }
      }
    );

    function resetTabActivePosition($el: any) {
      setTimeout(() => {
        try {
          let activeEl = $el.querySelector('.el-tabs__item.is-active');
          let lineEl = $el.querySelector('.el-tabs__active-bar');
          let style: any = getComputedStyle(activeEl);
          let pl = style.paddingLeft.match(/\d+/)[0] * 1;
          let pr = style.paddingRight.match(/\d+/)[0] * 1;
          let w = style.width.match(/\d+/)[0] * 1;
          lineEl.style.transform = 'translateX(' + (activeEl.offsetLeft + pl) + 'px)';
          lineEl.style.width = w - pl - pr + 'px';
        } catch (error) {
          console.log(error);
        }
      }, 100);
    }

    onMounted(() => {
      if (Array.isArray(nameList)) {
        /* tslint:disable:no-string-literal */
        const firstName = nameList[0]['name'];
        if (query.name) {
          if (nameList.find(item => item.name === query.name)) {
            activeName.value = query.name.toString();
          } else {
            activeName.value = firstName;
          }
        } else {
          activeName.value = firstName;
        }
        /* tslint:enable:no-string-literal */
      }
    })

    const activeComponent = computed(() => {
      const tc: any = nameList.find((item: any) => item.name === activeName.value);
      if (tc && tc.components) {
        return tc.components;
      } else {
        return tc?.component ? tc.component : '';
      }
    });

    const handleSelect = (tab: typeof ElTabs, event: any) => {
      // history.pushState({ page: 1 }, '', `?name=${tab.props.name}`);
      if (!props.isOne) return;
      changeStateName(tab.props.name);
    };
    function changeStateName(name: string) {
      history.pushState({ page: 1 }, '', `?name=${name}`);
    }
    function changeTabs(name: string) {
      changeStateName(name);
      activeName.value = name;
    }
    return {
      activeName,
      handleSelect,
      activeComponent,
      changeStateName,
      changeTabs,
      t,
      elTabsVeridom,
      tabs
    };
  }
});
</script>
<style lang="scss" scoped>
.b_menu {
  width: 100%;
}
.border-card {
  ::v-deep(.el-tabs__item:not(.is-active)) {
    color: #999999;
    background-color: #fafafa;
    border-bottom-color: #e4e7ed;
  }
}
.tab_compnent_style {
  padding-top: 11px;
}
</style>
