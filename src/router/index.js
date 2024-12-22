import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../page/HomePage.vue'

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
          component: () => import('../page/AddArticlePage.vue')
        }
      ]
    }

  ]
})

export default router
