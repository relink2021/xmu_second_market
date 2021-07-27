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
import Establish from '../components/Establish.vue'
import EditEstablish from '../components/EditEstablish.vue'
import GoodPage from '../components/GoodPage.vue'
import MyEstablish from '../components/MyEstablish.vue'
import Goods from '../components/Goods.vue'
import Test from '../components/Test.vue'
import Orders_Blank from '../components/Orders_Blank.vue'
import Orders from '../components/Orders.vue'
import OrderDetail from '../components/OrderDetail.vue'
import orderinfo_sold from '../components/orderinfo_sold.vue'
import HasBought from '../components/HasBought.vue'
import HasSold from '../components/HasSold.vue'
import PersonalCenterDefault from '../components/PersonalCenterDefault'
import Order_Bought from '../components/Order_Bought.vue'
import Order_Sold from '../components/Order_Sold.vue'
import GoodPagePlus from '../components/GoodPagePlus.vue'
import LoginI from '../components/LoginI.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/LoginI"
  },
  {
    path:"/Login",
    component:Login
  },
  { 
    path:"/LoginI",
    component:LoginI
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
      { path:"/GoodPagePlus", component: GoodPagePlus,}
    ]
  },
  {
    path:"/PersonalCenter",
    component:PersonalCenter,
    redirect:"/PersonalCenterDefault",
    children:[
      {
        path:"/HasBought",
        component:HasBought,
      },
      {
        path:"/HasSold",
        component:HasSold,
      },
      {
        path:"/ShoppingCart",
        component:ShoppingCart,
      },
      {
        path:"/EditEstablish",
        component:EditEstablish,
      },
      {
        path:"/orderinfo_sold",
        component:orderinfo_sold
      },
      {
        path:"/Order_Bought",
        component:Order_Bought
      },
      {
        path:"/Order_Sold",
        component:Order_Sold
      },
    ],

  },
  {
    path:"/PersonalData",
    component:PersonalData
  },
  {
    path:"/PersonalCenterDefault",
    component:PersonalCenterDefault
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
    path:"/Users",
    component:Users
  },
  {
    path:"/Establish",
    component:Establish
  },
  {
    path:"/Test",
    component:Test,
  },
  {
    path:"/Orders_Blank",
    component:Orders_Blank,
    redirect:"/Orders",
    children:[
      {
        path:"/OrderDetail",
        component:OrderDetail,
      },
    ]
  },
  {
    path:"/Orders",
    component:Orders
  },
]

const router = new VueRouter({
  routes
})

export default router
