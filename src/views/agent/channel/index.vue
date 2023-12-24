<template>
  <div class="app-container">
    <el-form label-width="auto" :model="channelForm" ref="elForms" size="small" :inline="true">

      <el-form-item :label="t('routes.domain.state')">
        <el-select v-model="channelForm.state">
          <el-option v-for="(selectItem, selectIndex) in selectStatus" :key="selectIndex" :label="selectItem.key"
            :value="selectItem.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="getChannelList">{{ t('global.search') }}</el-button>
        <el-button icon="el-icon-plus" type="success" @click="add">{{ t('global.increment') }}</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column fixed prop="sort" :label="t('global.sortabled')" width="150" /> -->
      <el-table-column prop="id" label="渠道id" width="200" />
      <el-table-column prop="name" label="渠道名称" width="160" />
      <el-table-column prop="agent_num" label="代理人数" width="160" />
      <el-table-column prop="state" :label="t('routes.domain.state')" width="100">
        <template #default="{ row }">
          <el-tag class="ml-2" v-if="row.state === '1'" type="success">{{ t('routes.domain.enable') }}</el-tag>
          <el-tag class="ml-2" v-else type="danger">{{ t('routes.domain.notEnable') }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="t('routes.domain.created_name')" width="120">
        <template #default="{ row }">
          {{ row.created_name || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="create_at" :label="t('routes.domain.created_time')" width="180">
        <template #default="{ row }">
          <div>{{ $filters.format(row.create_at, false) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="updated_name" :label="t('routes.domain.updated_name')" width="120">
        <template #default="{ row }">
          {{ row.updated_name || '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="updated_t" :label="t('routes.domain.updated_time')" width="180">
        <template #default="{ row }">
          <div>{{ $filters.format(row.updated_at, false) }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :label="t('global.operating')">
        <template #default="{ row }">
          <el-button link type="primary" icon="el-icon-edit" size="small" @click="edit(row)">{{ t('global.edit')
          }}</el-button>
          <!-- <el-button link type="danger" icon="el-icon-delete" size="small" @click="deleteDomain(row.id)">{{
              t('global.delete') }}</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="total" v-model:current-page="channelForm.page" hide-on-single-page layout="total, sizes, prev, pager, next, jumper"
      v-model:page-size="channelForm.page_size" @current-change="getChannelList" @size-change="getChannelList" />
  </div>
  <el-dialog :title="popType === 1 ? '添加' : t('global.edit')" v-model="popState" width="500px" append-to-body
    @close="cancel">
    <el-form ref="dialogFormEl" :rules="rules" :model="fromData" label-width="auto">
      <el-form-item label="渠道名称" prop="name" class="mt10">
        <el-input v-model="fromData.name" type :placeholder="t('routes.domain.w_domain_url')" />
      </el-form-item>
      <el-form-item label="渠道状态" prop="state" class="mt10">
        <el-select v-model="fromData.state">
          <el-option v-for="(selectItem, selectIndex) in addselect" :key="selectIndex" :label="selectItem.key"
            :value="selectItem.value"> </el-option>
        </el-select>
      </el-form-item>
     
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">{{ t('global.submit') }}</el-button>
      <el-button @click="cancel">{{ t('global.cancel') }}</el-button>
    </div>
  </el-dialog>
</template>
  
<script setup lang="ts">
import { ref, onMounted,reactive } from 'vue';
import { channelList, channelInsert, channelUpdate } from '@/http/modules/agent';
import { useI18n } from 'vue-i18n';
import { Channel, ChannelItem } from '@/types/channel'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ElForm } from 'element-plus'
const { t } = useI18n({ useScope: 'global' });
const Allselect = [
  { key: t('global.checkall'), value: '' },
  { key: '启用', value: '1' },
  { key: '暂停', value: '2' }
]
const selectStatus = ref([...Allselect])
const addselect = ref([... Allselect.filter(item=>item.value !== '0')])
const channelForm = ref({
  page: 1,
  page_size: 10,
  state: ""
})
const initFrom = { name: "", state: "1", }
const fromData = ref<ChannelItem>({
  ...initFrom
})
const tableData = ref<Channel[]>([])
const total = ref(0)
const popState = ref(false)
const popType = ref<1 | 2>(1)
const getChannelList = async () => {
  let res = await channelList(channelForm.value)
  if (res.status) {
    total.value = res.data?.t
    tableData.value = res.data?.d || []
  }
}
const add = () => {
  popState.value = true
  popType.value = 1
}
const edit = (row: Channel) => {
  popState.value = true
  popType.value = 2
  fromData.value = {
    id: row.id,
    name: row.name,
    state: row.state
  }
}
const submit = async () => {
  let api = popType.value === 1 ? channelInsert : channelUpdate
  let message = popType.value === 1 ? t('global.savesuc') : t('global.editsuc')
  let res = await api(fromData.value)
  if (res.status) {
    ElMessage.success({
      message,
      type: 'success'
    });
    cancel()
    getChannelList()
  }
}
const cancel = () => {
  fromData.value = { ...initFrom }
  popState.value = false
}
const rules =  reactive<typeof ElForm['rules']>({
      state: [
        { required: true, message: t('global.please_choose'), trigger: "blur" },
      ],
      name: [
        { required: true, message: t('global.enter'), trigger: "blur" }
      ],
    })
onMounted(() => {
  getChannelList()
})
</script>
  
<style lang="scss" scoped></style>
  