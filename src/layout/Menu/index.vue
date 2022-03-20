<!--  -->
<template>
  <el-menu
    active-text-color="#ffd04b"
    :background-color="variables.subMenuBg"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    text-color="#fff"
    router
    unique-opened
    :collapse="!$store.getters.siderType"
  >
    <el-sub-menu
      :index="item.menuId"
      v-for="(item, index) in menusList"
      :key="item.menuId"
    >
      <template #title>
        <el-icon>
          <component :is="iconList[index]"></component>
        </el-icon>
        <span>{{ item.menuName }}</span>
      </template>

      <el-menu-item
        :index="it.menuUrl"
        v-for="it in item.children"
        :key="it.menuId"
        @click="savaPath(it.menuUrl)"
      >
        <el-icon>
          <component :is="icon"></component>
        </el-icon>
        <span>{{ it.menuName }}</span></el-menu-item
      >
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
import variables from '@/styles/variables.scss'

const iconList = ref(['user', 'setting'])

const icon = ref('menu')
const defaultActive = ref(sessionStorage.getItem('path') || '/users')

const menusList = ref([])

const initMenuList = async () => {
  const res = await menuList()
  menusList.value = res.data.object
  console.log(res)
}
initMenuList()

const savaPath = (path) => {
  sessionStorage.setItem('path', `${path}`)
}
</script>
<style lang="scss"></style>
