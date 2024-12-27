import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../page/HomePage.vue'
import { isLogin } from '@/api/request'
import { useTokenIsOkStore } from '@/store/PiniaStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/wish/',
      component: () => import('../components/HobbyPageFrameLayout.vue'),
      children: [
        {
          path: 'thoughtPage',
          alias: ['sportPage', 'aquariumPage', 'moviePage', 'viewPage', 'treePage', 'notebookPage', 'notebookPage', 'musicPage'],
          component: () => import('../page/ArticleListPage.vue'),
        },
        {
          path: 'addArticlePage',
          component: () => import('../page/AddArticlePage.vue'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    }

  ]
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    isLogin().then(res => {
      useTokenIsOkStore().tokenIsOk = res.data
      return res.data ? next() : next('/')
    })
  } else {
    next()
  }

})
export default router
