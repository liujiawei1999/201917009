<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-tree
      :data="allTree"
      default-expand-all
      show-checkbox
      node-key="menuId"
      :default-checked-keys="selectTree"
      :props="defaultProps"
    />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineEmits, ref, defineProps, watch } from 'vue'
import { getAllList, getListByUser } from '@/api/menu'
const selectTree = ref([])
const allTree = ref([])
const form = ref({
  id: '',
  userName: '',
  userPhone: '',
  userPassword: '',
  userEmail: '',
  userStatus: ''
})
const defaultProps = {
  children: 'children',
  label: 'menuName'
}
const initTree = async () => {
  console.log(form.value)
  const resAll = await getAllList()
  allTree.value = resAll.data.object
  const resSelect = await getListByUser(form.value)
  console.log(resSelect)
  selectTree.value = resSelect.data.object
}
initTree()
const prpos = defineProps({
  dialogTitle: {
    type: String,
    default: '',
    required: true
  },
  dialogTitleValue: {
    type: Object,
    default: () => {}
  }
})
watch(
  () => prpos.dialogTitleValue,
  () => {
    form.value = prpos.dialogTitleValue
  },
  { deep: true, immediate: true }
)
const emits = defineEmits(['update:modelValue', 'initUserList'])

const handleClose = () => {
  form.value = ''
  emits('update:modelValue', false)
}
const handleConfirm = () => {}
</script>

<style scoped lang="scss"></style>
