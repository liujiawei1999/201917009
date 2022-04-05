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
      <el-button type="primary" :icon="Search" @click="initGetUsersList">{{
        $t('table.search')
      }}</el-button>
      <el-button type="primary" @click="handleDialog()">{{
        $t('table.adduser')
      }}</el-button>
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
          <el-switch
            v-model="row.userStatus"
            @change="changeStatus(row)"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'createTime'">
          <!-- <el-switch v-model="row.userStatus" /> -->
          {{ $filters.filterTimesLess(row.createTime) }}
        </template>
        <template #default="{ row }" v-else-if="item.prop === 'action'">
          <el-button
            size="small"
            type="success"
            icon=""
            @click="handleDialog(row)"
            >查看</el-button
          >
          <el-button size="small" type="warning" @click="handleDialog(row)"
            >修改</el-button
          >
          <el-button size="small" type="danger" @click="delUserMethod(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:currentPage="queryForm.page"
      v-model:page-size="queryForm.limit"
      :page-sizes="[2, 5, 10, 15]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      page-size="5"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <Dialog
    v-model="dialogVisible"
    :dialogTitle="dialogTitle"
    :dialogTitleValue="dialogTitleValue"
    v-if="dialogVisible"
    @initUserList="initGetUsersList"
  />
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getUser, changeUserStatus, delUser } from '@/api/users.js'
import { options } from './options'
import { ElMessage } from 'element-plus'
import Dialog from './componments/dialog'
import { isNUll } from '@/utils/filters'

const dialogVisible = ref(false)
const dialogTitle = ref('')
const dialogTitleValue = ref({})
const queryForm = ref({
  query: '',
  page: 1,
  limit: 5
})
const handleDialog = (row) => {
  if (isNUll(row)) {
    dialogTitle.value = '添加用户'
    dialogTitleValue.value = {}
  } else {
    dialogTitle.value = '编辑用户'
    dialogTitleValue.value = JSON.parse(JSON.stringify(row))
  }
  dialogVisible.value = true
}

const total = ref(0)

const tableData = ref([])

const initGetUsersList = async () => {
  const res = await getUser(queryForm.value)
  tableData.value = res.data.object.list
  total.value = res.data.object.totalCount
}
initGetUsersList()

const handleSizeChange = (limit) => {
  queryForm.value.page = 1
  queryForm.value.limit = limit
  initGetUsersList()
}

const handleCurrentChange = (page) => {
  queryForm.value.page = page
  initGetUsersList()
}
const changeStatus = async (info) => {
  await changeUserStatus(info.id, info.userStatus)
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success'
  })
}

const delUserMethod = async (info) => {
  await delUser(info.id)
  initGetUsersList()
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}
::v-deep .el-input__suffix {
  align-items: center;
}

::v-deep .el-pagination {
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
