<template>
  <div>
    <el-dialog :title="t('routes.tips.select_icon')" width="540px" v-model="dialogComputed" :close-on-click-modal="false">
      <div class="main-cont">
        <ul class="ststem_icon_list">
          <li v-for="(item, i) in imgList" :key="item.url" @click="selectImg(item.url, i)">
            <el-image class="elimg" :src="item.url" fit="cover"></el-image>
            <p style="line-height: 14px">{{ t('routes.tips.systemicon') }}{{ i + 1 }}</p>
            <span class="ischeck" v-show="isActive === i">
              <i class="el-icon-circle-check"></i>
            </span>
          </li>
        </ul>
        <!-- <customize-upload ref="webfile" :isReadLoad="true" v-model:filePathStr="formInline.images" :key="reloadNow" :limit="5">
          <template #tip>
            <div></div>
          </template>
        </customize-upload> -->
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog(false)">{{ t('global.cancel') }}</el-button>
          <el-button type="primary" @click="selectStation">{{ t('global.sure') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'SelectIcon',
  props: {
    changeSystemNat: Function,
    objKey: String
  },
  setup(props, context) {
    const dialogComputed = ref<boolean>(false);
    const { t } = useI18n({ useScope: 'global' });
    const reloadNow = ref<number>(1);
    const showDialog = (bool: boolean) => {
      dialogComputed.value = bool;
    };
    const selectStation = () => {
      if (props.changeSystemNat) {
        props.changeSystemNat(props.objKey, isActiveImgUrl.value);
      }
      dialogComputed.value = false;
    };
    const formInline = ref<any>({});

    // 图片数组
    const imgList = ref<any>([
      {
        url: 'http://dl.yostata.xyz/images/52340863494094242.png'
      },
      {
        url: 'http://dl.yostata.xyz/images/52340868130734728.png'
      },
      {
        url: 'http://dl.yostata.xyz/images/52340873052889361.png'
      },
      {
        url: 'http://dl.yostata.xyz/images/52340877703736648.png'
      },
      {
        url: 'http://dl.yostata.xyz/images/52340883884582566.png'
      }
    ]);
    watch(
      () => formInline.value.images,
      n => {
        if (n) {
          imgList.value.push(n);
          formInline.value.images = '';
          reloadNow.value += 1;
        }
      }
    );

    const isActive = ref<number>();
    const isActiveImgUrl = ref<string>('');
    // 选择图片
    const selectImg = (imgUrl: string, i: number) => {
      isActive.value = i;
      isActiveImgUrl.value = imgUrl;
    };

    return {
      dialogComputed,
      showDialog,
      selectStation,
      formInline,
      reloadNow,
      imgList,
      isActive,
      t,
      selectImg
    };
  }
});
</script>
<style lang="scss" scoped>
.main-cont {
  display: flex;
}
.ststem_icon_list {
  display: flex;
  width: 500px;
  // margin-right: 36px;
  flex-wrap: wrap;
  > li {
    width: 100px;
    height: 100px;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    &:hover p {
      color: black;
    }
    .elimg {
      width: 50px;
      height: 50px;
      margin-bottom: 6px;
      margin-top: 10px;
      border-radius: 50%;
    }
    > .ischeck {
      position: absolute;
      right: 11px;
      top: 43%;
      color: #84ff0b;
    }
  }
}
</style>
