<template>
  <el-form>
    <el-row>
      <el-form-item>
        <el-upload
          class="upload-demo"
          multiple
          drag
          :auto-upload="false"
          ref="proUpload"
          :on-change="handleChange"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">点击此处选择文件</div>
        </el-upload>
      </el-form-item>
    </el-row>
  </el-form>
  <div>
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="submitForm">提交</el-button>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import axios from 'axios'

const fd = new FormData()
const submitForm = () => {
  axios.post('api/file/uploadFile', fd)
}

const handleChange = (file, fileList) => {
  fd.append('path', '1')
  fd.append('files', fileList)
  fd.append('addFolder', 0)
  fd.append('keepName', 0)
}
</script>

<style lang="scss" scoped></style>
