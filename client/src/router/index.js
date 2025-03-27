import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {//首页,定向noteClass页面
      path: '/',
      redirect: '/login'
    },
    {//登录页面
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        title: '登录'
      }
    },
    {//注册页面
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        title: '注册'
      }
    },
    {//笔记分类页面
      path: '/noteClass',
      name: 'noteClass',
      component: () => import('@/views/noteClass.vue'),
      meta: {
        title: '实录分类'
      }
    },
    {//笔记列表页面
      path: '/noteList',
      name: 'noteList',
      component: () => import('@/views/noteList.vue'),
      meta: {
        title: '实录列表'
      }
    },
    {//笔记详情页面
      path: '/noteDetail',
      name: 'noteDetail',
      component: () => import('@/views/noteDetail.vue'),
      meta: {
        title: '实录详情'
      }
    },
    {//笔记发布页
      path: '/notePublish',
      name: 'notePublish',
      component: () => import('@/views/notePublish.vue'),
      meta: {
        title: '实录发布'
      }
    }
  ]
})
// 全局路由守卫
// 白名单
const whitePath = ['/login', '/register', '/noteClass'];
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  // console.log(to);
  if (!whitePath.includes(to.path)) {
    //判断用户是否已经登录
    if (!localStorage.getItem('userInfo')) {//没登录
      router.push('/login');
      return;
    }
  }
  next();
})
export default router
