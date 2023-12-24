<template>
  <div class="lock">
    <slot :content="content"></slot>
    <span style="margin-left: 3px"></span>
    <i @click="lockHanlder" class="hongredstyle antd-red el-icon-lock" v-if="stateComputed === 1"> </i>
    <i class="el-icon-unlock" style="color: #409eff" v-if="stateComputed === 3"></i>
    <svg v-if="stateComputed === 2" class="svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 24 30"
      style="enable-background: new 0 0 50 50" xml:space="preserve">
      <rect x="0" y="13" width="4" height="5" fill="#333">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s"
          repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s"
          repeatCount="indefinite" />
      </rect>
      <rect x="10" y="13" width="4" height="5" fill="#333">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s"
          repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s"
          repeatCount="indefinite" />
      </rect>
      <rect x="20" y="13" width="4" height="5" fill="#333">
        <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s"
          repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s"
          repeatCount="indefinite" />
      </rect>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { APIs } from '@/http';

export default defineComponent({
  name: 'LockIcon',
  components: {},
  props: {
    state: {
      // 设置锁的状态，开启(true)/关闭(false)
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    },
    field: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    paramskey: {
      type: String,
      default: ''
    },
    isAgency: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  setup(props, ctx) {
    // 是否点击,默认没点击, 只能查看一次
    const isClick = ref<boolean>(false);
    // 真实内容
    const content = ref<string>();
    // 加载状态
    const loading = ref<boolean>(false);
    // 获取真实数据，数据在Lock组件，所以需要返回给外部使用
    function getData() {
      loading.value = true;
      isClick.value = true;
      return new Promise(resolve => {
        APIs.viplist
          .memberFull({
            id: props.id,
            field: props.field
          })
          .then(res => {
            loading.value = false;
            if (res.status) {
              resolve(res.data);
              isClick.value = true;
              // 如果是查询代理相关数据，会把银行卡和名字一起查询出来，银行卡号,姓名
              if (props.isAgency) {
                let text = res.data;
                if (text) {
                  text = text.split(',');
                } else {
                  text = [];
                }
                if (props.type === 'realname') {
                  content.value = text[1];
                } else if (props.type === 'bankcard') {
                  content.value = text[0];
                } else {
                  content.value = '';
                }
              } else {
                content.value = res.data;
              }
              ctx.emit('change', res.data, props.paramskey);
            } else {
              isClick.value = false;
            }
          });
        // setTimeout(() => {
        //   resolve('Test');
        //   content.value = 'Test';
        //   loading.value = false;
        // }, 1000);
      });
    }
    const stateComputed = computed(() => {
      // 红锁 1
      // 加载效果 2
      // 蓝锁 3
      // 代表在请求中了,只显示loading效果
      if (loading.value) {
        return 2;
      } else if (isClick.value) {
        // 如果点击了，出现蓝锁
        return 3;
      } else {
        return 1;
      }
    });
    function lockHanlder() {
      getData();
    }
    return { content, lockHanlder, loading, stateComputed };
  }
});
</script>
<style lang="scss" scoped>
.lock {
  display: unset;

  i {
    font-size: 16px;
    position: relative;
  }
}

.hongredstyle {
  cursor: pointer;
}

.svg {
  position: relative;
  top: 4px;
}

.svg path,
.svg rect {
  fill: #f5222d;
}
</style>
