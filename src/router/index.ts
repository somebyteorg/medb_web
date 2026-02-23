import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import view_index from '@/views/index.vue'
import view_sign from '@/views/sign.vue'

export const ROUTE_NAME_INDEX = 'Index',
  ROUTE_NAME_SIGN = 'Sign'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: ROUTE_NAME_INDEX,
    component: view_index,
  },
  {
    path: '/sign',
    name: ROUTE_NAME_SIGN,
    component: view_sign,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: {
      name: ROUTE_NAME_INDEX,
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  document.title = `${to.meta.title || ''} | medb`
})

export default router

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}
