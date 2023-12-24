<template>
  <div class="notice">
    <i class="el-icon-chat-dot-round" v-show="false"></i>
    <div class="ulcontent" v-show="false">
      <ul class="animate_ul">
        <li v-for="(item, i) in noticeList" :key="i" @click.stop="$refs.Announcemt.changeModel(true)">{{ item.title }} {{ item.details }}</li>
      </ul>
    </div>
  </div>
  <Announcement v-model="dialogVisible" ref="Announcemt"></Announcement>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, nextTick, ref } from 'vue';
import { useStore } from '@/store/index';
import { NoticeMessage } from './types';
import Announcement from '@/views/home/components/Announcement.vue';

export default defineComponent({
  name: 'Notice',
  components: { Announcement },
  setup() {
    const { state } = useStore();
    const dialogVisible = ref<boolean>(false);
    const noticeList = reactive<NoticeMessage<string, number>[]>([
      {
        title: '【通知】',
        details: '这是通知一',
        id: 1
      },
      {
        title: '【通知】',
        details: '这是通知二',
        id: 1
      },
      {
        title: '【通知】',
        details: '这是通知三',
        id: 1
      }
    ]);
    function setAnimate() {
      const dom: any = document.querySelector('.animate_ul') as Element;
      function handle() {
        dom.classList.remove('trans');
        // 得到第一个的copy
        const li = dom.children[0];
        // 删除第一个
        dom.removeChild(dom.children[0]);
        // 放在最后
        dom.appendChild(li);
        // 把top改成0
        dom.style.top = '0px';
        // 执行定时器
      }
      dom.addEventListener('transitionend', handle, false);
      setInterval(() => {
        dom.className += ' trans';
        dom.style.top = '-20px';
      }, 4000);
    }
    nextTick(() => {
      setAnimate();
    });
    return {
      noticeList,
      dialogVisible
    };
  }
});
</script>
<style lang="scss" scope>
.notice {
  flex: 1;
  font-size: 13px;
  height: 22px;
  overflow: hidden;
  display: flex;
  align-items: center;
  color: #1890ff;
  > .ulcontent {
    height: 22px;
    > .animate_ul {
      position: relative;
      top: 0;
      &.trans {
        transition: top 0.3s;
      }
    }
    > ul {
      > li {
        width: 400px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
      }
    }
  }
}
</style>
