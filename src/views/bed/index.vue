<template>
  <el-card>
    <el-row :gutter="20" class="header">
      <el-select v-model="select.building" placeholder="请选择楼">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="select.floor"
        placeholder="请选择楼层"
        style="margin-left: 5px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-col :span="7">
        <el-input
          placeholder="请输入客户信息"
          v-model="select.searched"
          style="display: inline"
          maxlength="20"
          type="text"
        >
        </el-input>
      </el-col>
      <el-button type="primary" :icon="Search" @click="getAllBed">{{
        $t('table.search')
      }}</el-button>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column
        :key="index"
        :width="item.width"
        :prop="item.prop"
        :label="$t(`table.${item.label}`)"
        v-for="(item, index) in options"
      >
        <template v-slot="{ row }" v-if="item.prop === 'startTime'">
          {{ $filters.filterTimesLess(row.startTime) }}
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'endTime'">
          {{ $filters.filterTimesLess(row.endTime) }}
        </template>
        <template v-slot="{ row }" v-else-if="item.prop === 'bedStatus'">
          <el-switch
            v-model="row.bedStatus"
            @change="changeBed(row)"
            :active-value="1"
            :inactive-value="0"
            active-text="未分配"
            inactive-text="已分配"
            inactive-color="#ff4949"
            disabled
          />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { options } from './options'
import { getAll } from '@/api/bed.js'

const select = ref({
  building: '',
  floor: '',
  searched: '',
  page: 1,
  limit: 2
})
const tableData = ref([])

const getAllBed = async () => {
  const res = await getAll(select.value)
  console.log(res)
  tableData.value = res.data.object
}

const changeBed = () => {}
</script>
<style lang="scss" scoped>
.header {
  padding-bottom: 16px;
  box-sizing: border-box;
}

::v-deep .el-pagination {
  padding-top: 16px;
  box-sizing: border-box;
  text-align: right;
}
</style>
