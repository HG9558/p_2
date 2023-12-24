<template>
  <div class="text-container">
    <transition class="" name="slide" mode="out-in">
      <p class="text" :key="text.id">{{ text.details }}</p>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, computed, reactive, onUnmounted } from 'vue';
export default defineComponent({
  name: 'TextScroll',
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(props) {
    const count = ref(0); // 当前索引
    const intervalId = ref(null); // 定时器ID
    const playTime = ref(2000); // 定时器执行间隔
    const text = computed({
      get: () => props.dataList,
      set: value => {
        id: props.dataList.count;
        details: props.dataList[count.value];
      }
    });
    intervalId.value = setInterval(() => {
      // 定义定时器
      getText();
    }, props.playTime);
    function getText() {
      const len = props.dataList.length; // 获取数组长度
      if (len === 0) {
        return; // 当数组为空时，直接返回
      }
      if (count.value === len - 1) {
        // 当前为最后一个时
        count.value = 0; // 从第一个开始
      } else {
        count.value++; // 自增
      }
    }
    function destroyed() {
      clearInterval(intervalId.value); // 清除定时器
    }
    return {
      count,
      intervalId,
      playTime,
      getText,
      computed,
      destroyed,
      text
    };
  }
});
</script>

<style scoped>
.text-container {
  font-size: 14px;
  color: #f56b6b;
  margin-right: 20px;
  height: 60px;
}

.text {
  text-align: right;
  margin: auto 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}

.slide-enter {
  transform: translateY(40px);
}

.slide-leave-to {
  transform: translateY(-40px);
}
</style>