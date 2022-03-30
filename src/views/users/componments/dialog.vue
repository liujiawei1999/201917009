<template>
  <el-dialog
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="40%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="70px" :rules="relus">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item label="手机号" prop="userPhone">
        <el-input v-model="form.userPhone" />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="userPassword"
        v-if="dialogTitle == '添加用户'"
      >
        <el-input v-model="form.userPassword" type="password" />
      </el-form-item>
      <el-form-item label="邮箱" prop="userEmail">
        <el-input v-model="form.userEmail" />
      </el-form-item>
      <el-form-item label="状态" prop="userStatus">
        <el-input v-model="form.userStatus" />
      </el-form-item>
    </el-form>
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
import { addUser, editUser } from '@/api/users'
import { ElMessage } from 'element-plus'
const formRef = ref(null)
const form = ref({
  userName: '',
  userPhone: '',
  userPassword: '',
  userEmail: '',
  userStatus: ''
})

const relus = ref({
  userName: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { min: 3, message: '不小于3个字符', trigger: 'blur' }
  ],
  userPhone: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }
  ],
  userPassword: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur'
    }
  ],
  userEmail: [
    {
      required: true,
      message: '不能为空',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '请输入正确的邮箱',
      trigger: ['blur', 'change']
    }
  ]
})

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
  emits('update:modelValue', false)
}
const handleConfirm = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      prpos.dialogTitle === '添加用户'
        ? await addUser(form.value)
        : await editUser(form.value)
      ElMessage({
        message: '添加用户成功',
        type: 'success'
      })
      emits('initUserList')
      handleClose()
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style scoped lang="scss"></style>
