<template>
    <el-col :span="4"  class="static-card">
        <el-card shadow="hover">
            <template #header>
                <div class="card-title">
                   <i :class="icon&&`el-icon-${icon}`" style="color:#409EFF;font-size:14px"></i> {{ title }}
                    <!-- <el-tooltip effect="dark" content="Number of users who logged into the product in one day" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip> -->
                </div>
            </template>
            <div class="card-value" :style="{ color }">{{ value }}</div>
            <div class="card-bottom" style="text-align: end;">{{ suffix }}</div>
        </el-card>
    </el-col>
</template>
  
<script lang="ts">
import { defineComponent, ref, PropType, watch, onMounted } from 'vue';
export default defineComponent({
    name: 'Upload',
    props: {
        suffix: {
            type: String,
            default: '1'
        },
        value: {
            type: [String,Number],
            default: '1'
        },
        color: {
            type: String,
            default: '1'
        },
        title: {
            type: String,
            default: '1'
        },
        icon:{
            type: String,
            default: ''
        }
    },
    emits: ['update:fileSucList'],
    setup(props, ctx) {
        return {
        };
    }
});
</script>
  
<style scoped>
.static-card {
    margin-bottom: 16px;

    ::v-deep(.el-card__header) {
        padding: 10px 20px;
    }

    ::v-deep(.el-card__body) {
        padding: 10px 20px;
    }

    .card-title {
        font-size: 14px;
    }

    .card-value {
        text-align: center;
        color: var(--el-text-color-regular);
        font-size: 28px;
    }

    .card-bottom {
        font-size: 12px;
        color: var(--el-text-color-primary);
    }
}
</style>
  