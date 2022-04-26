import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login')
  },
  {
    path: '/',
    name: '/',
    component: () => import(/* webpackChunkName: "about" */ '../layout'),
    redirect: '/users',
    children: [
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/people/users/index.vue')
      },
      {
        path: 'rights',
        name: 'rights',
        component: () => import('@/views/rights/index.vue')
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/roles/index.vue')
      },
      {
        path: 'pdf',
        name: 'pdf',
        component: () => import('@/views/pdf/index.vue')
      },
      {
        path: 'bed',
        name: 'bed',
        component: () => import('@/views/bed/index.vue')
      },
      {
        path: 'nurse',
        name: 'nurse',
        component: () => import('@/views/people/nurse/index.vue')
      },
      {
        path: 'service',
        name: 'service',
        component: () => import('@/views/service/service/index.vue')
      },
      {
        path: 'addService',
        name: 'addService',
        component: () => import('@/views/service/addService/index.vue')
      },
      {
        path: 'checkIn',
        name: 'checkIn',
        component: () => import('@/views/register/checkIn/index.vue')
      },
      {
        path: 'checkOut',
        name: 'checkOut',
        component: () => import('@/views/register/checkOut/index.vue')
      },
      {
        path: 'goOut',
        name: 'goOut',
        component: () => import('@/views/register/goOut/index.vue')
      },
      {
        path: 'food',
        name: 'food',
        component: () => import('@/views/foodManager/food/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
