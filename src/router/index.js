import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../components/Register.vue'
import HomePage from '../components/HomePage.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import Home from '../components/Home.vue'
import ShopMall from '../components/ShopMall.vue'
import PersonalCenter from '../components/PersonalCenter.vue'
import PersonalData from '../components/PersonalData.vue'
import EditData from '../components/EditData.vue'
import Users from '../components/Users.vue'
import EditEstablish from '../components/EditEstablish.vue'
import GoodPage from '../components/GoodPage.vue'
import MyEstablish from '../components/MyEstablish.vue'
import Goods from '../components/Goods.vue'
import Orders_Blank from '../components/Orders_Blank.vue'
import Orders from '../components/Orders.vue'
import OrderDetail from '../components/OrderDetail.vue'
import HasBought from '../components/HasBought.vue'
import HasSold from '../components/HasSold.vue'
import Order_Bought from '../components/Order_Bought.vue'
import Order_Sold from '../components/Order_Sold.vue'
import GoodPagePlus from '../components/GoodPagePlus.vue'
import LoginI from '../components/LoginI.vue'
import Head from '../components/Head.vue'
import ChatRoom from '../components/ChatRoom.vue'
import FriendAccess from '../components/FriendAccess.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/LoginI"
  },
  {
    path: "/LoginI",
    component: LoginI
  },
  {
    path: "/HomePage",
    component: HomePage
  },
  {
    path: "/Register",
    component: Register
  },
  {
    path: "/Home",
    component: Home
  },
  {
    path: "/ShopMall",
    component: ShopMall,
    redirect: "/Goods",
    children: [
      { path: "/MyEstablish", component: MyEstablish, },
      { path: "/Goods", component: Goods, },
      { path: "/GoodPagePlus", component: GoodPagePlus, }
    ]
  },
  {
    path: "/PersonalCenter",
    component: PersonalCenter,
    redirect: "/ShoppingCart",
    children: [
      {
        path: "/HasBought",
        component: HasBought,
      },
      {
        path: "/HasSold",
        component: HasSold,
      },
      {
        path: "/ShoppingCart",
        component: ShoppingCart,
      },
      {
        path: "/EditEstablish",
        component: EditEstablish,
      },
      {
        path: "/Order_Bought",
        component: Order_Bought
      },
      {
        path: "/Order_Sold",
        component: Order_Sold
      },
      {
        path: "/EditData",
        component: EditData,
      },
      // {
      //   path:"/PersonalData",
      //   component:PersonalData,
      // },
      {
        path: "/GoodPage",
        component: GoodPage,
      }
    ],
  },
  {
    path: "/Users",
    component: Users
  },
  {
    path: "/Orders_Blank",
    component: Orders_Blank,
    redirect: "/Orders",
    children: [
      {
        path: "/OrderDetail",
        component: OrderDetail,
      },
    ]
  },
  {
    path: "/Orders",
    component: Orders
  },
  {
    path: "/Head",
    component: Head,
    redirect: "/ChatRoom",
    children: [
      {
        path: "/PersonalData",
        component: PersonalData,
      },
      {
        path: "/ChatRoom",
        component: ChatRoom,
      },
      {
        path: "/FriendAccess",
        component: FriendAccess,
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
