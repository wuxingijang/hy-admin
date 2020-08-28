import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/login/login.vue"
import home from '@/views/home/home'
import welcome from '@/views/home/children/welcome'
import staff from '@/views/home/staff/staff'

Vue.use(VueRouter)

const routes = [
  {
    path: "/", redirect: "/login"
  }
  ,
  {
    path: '/login', component: Login
  }
  , {
    path: '/home', component: home, 
    redirect:'/staff',
    children:[ {
      path: "/welcome",
      component: welcome
    },
    {
      path:'/staff',
      component:staff
    }
  ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//路由导航守卫
// to访问的路由
// from从哪一个页面跳转过来
//next放行
router.beforeEach((to, from, next) => {
  if (to.path === '/login') next()
  const token = window.sessionStorage.getItem('token')
  //判断是否有token 
  if (!token || token === '', token === 'null', token === null) {
    return next({ path: "login" })
  }
  next()
})
export default router
