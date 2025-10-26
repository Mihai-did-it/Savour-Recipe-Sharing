import { createRouter, createWebHistory } from 'vue-router'
import Feed from '../views/Feed.vue'
import UploadPage from '../views/UploadPage.vue'
import RecipePage from '../views/RecipePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'feed',
      component: Feed,
    },
    
    //UPLOAD PAGE
    {
      path: '/upload',
      name: 'upload',
      component: UploadPage,
    },
    // RECIPE PAGE
    {
      path: '/recipe/:id',
      name: 'recipe',
      component: RecipePage,
    }
  ]
})


export default router