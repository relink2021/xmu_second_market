import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import HomePage from '../components/HomePage.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import Home from '../components/Home.vue'
import ShopMall from '../components/ShopMall.vue'
import PersonalCenter from '../components/PersonalCenter.vue'
import PersonalData from '../components/PersonalData.vue'
import EditData from '../components/EditData.vue'
import Users from '../components/Users.vue'
import Orders from '../components/Orders.vue'
import Establish from '../components/Establish.vue'
import EditEstablish from '../components/EditEstablish.vue'
import GoodPage from '../components/GoodPage.vue'
import MyEstablish from '../components/MyEstablish.vue'
import Goods from '../components/Goods.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/Login"
  },
  {
    path:"/Login",
    component:Login
  },
  {
    path:"/HomePage",
    component:HomePage
  },
  {
    path:"/Register",
    component:Register
  },
  {
    path:"/ShoppingCart",
    component:ShoppingCart
  },
  {
    path:"/Home",
    component:Home
  },
  {
    path:"/ShopMall",
    component: ShopMall,
    redirect: "/Goods",
    children:[
      { path:"/MyEstablish", component: MyEstablish,},
      { path:"/Goods", component: Goods,},
      { path:"/GoodPage", component: GoodPage,}
    ]
  },
  {
    path:"/PersonalData",
    component:PersonalData
  },
  {
    path:"/PersonalCenter",
    component:PersonalCenter
  },
  {
    path:"/EditData",
    component:EditData
  },
  {
    path:"/Orders",
    component:Orders
  },
  {
    path:"/Users",
    component:Users
  },
  {
    path:"/Establish",
    component:Establish
  },
  {
    path:"/EditEstablish",
    component:EditEstablish
  },
]

const router = new VueRouter({
  routes
})

export default router
