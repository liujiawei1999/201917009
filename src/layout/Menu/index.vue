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
    <template v-for="(item, index) in menusList">
      <template v-if="item.children">
        <el-sub-menu :index="item.menuId" :key="item.menuId">
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
            <span>{{ it.menuName }}</span>
          </el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item
          :index="item.menuUrl"
          :key="item.menuId"
          @click="savaPath(item.menuUrl)"
        >
          <el-icon>
            <component :is="icon"></component>
          </el-icon>
          <span>{{ item.menuName }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script setup>
import { menuList } from '@/api/menu'
import { ref } from 'vue'
import variables from '@/styles/variables.scss'

const iconList = ref([
  'user',
  'setting',
  'tools',
  'menu',
  'menu',
  'menu',
  'menu'
])

const icon = ref('menu')
const defaultActive = ref(sessionStorage.getItem('path') || '/users')

const menusList = ref([])

const initMenuList = async () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  console.log(userInfo)
  console.log(userInfo.value)
  // 可以根据用户信息来查询页面
  const res = await menuList(userInfo)
  menusList.value = res.data.object
  console.log(res)
}
initMenuList()

const savaPath = (path) => {
  sessionStorage.setItem('path', `${path}`)
}
</script>
<style lang="scss"></style>
