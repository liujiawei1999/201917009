<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-col :span="7">
        <el-input
          :placeholder="$t('table.placeholder')"
          clearable
          v-model="queryForm.query"
        >
        </el-input>
      </el-col>
      <el-button type="primary" :icon="Search">{{
        $t('table.search')
      }}</el-button>
      <el-button type="primary">{{ $t('table.adduser') }}</el-button>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :width="item.width"
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        v-for="(item, index) in options"
        :key="index"
      >
        <template v-slot="{ row }" v-if="item.prop === 'userStatus'">
          <el-switch v-model="row.userStatus" />
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'createTime'">
          <!-- <el-switch v-model="row.userStatus" /> -->
          {{ $filters.filterTimesLess(row.createTime) }}
        </template>
        <template #default v-else-if="item.prop === 'action'">
          <el-button size="small" type="success" icon="">查看</el-button>
          <el-button size="small" type="warning">修改</el-button>
          <el-button size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getUser } from '@/api/users.js'
import { options } from './options'
const queryForm = ref({
  query: '',
  page: '1',
  limit: '3'
})

const tableData = ref([])

const initGetUsersList = async () => {
  const res = await getUser(queryForm.value)
  console.log(res)
  tableData.value = res.data.object.list
}
initGetUsersList()
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
</style>
