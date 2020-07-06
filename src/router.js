import Vue from 'Vue'
import Router from 'vue-router'
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Room from './components/Room.vue';
import Admin from './components/Admin.vue';
import Search from './components/Search.vue';
import HomeInfo from './components/HouseInfo/HomeInfo.vue';
import Manage from './components/HouseInfo/Manage.vue';
import Publish from './components/HouseInfo/Publish.vue';
import Admin1 from './components/AdminInfo/Admin1.vue';
import Admin2 from './components/AdminInfo/Admin2.vue';
import Admin3 from './components/AdminInfo/Admin3.vue';
import Admin4 from './components/AdminInfo/Admin4.vue';
import Admin5 from './components/AdminInfo/Admin5.vue';
import ModifyPwd from './components/HouseInfo/ModifyPwd.vue';
import Sale from './components/Sale.vue';
import SaleHome from './components/SaleInfo/SaleHome.vue';
import MySale from './components/SaleInfo/MySale.vue';
import EditPwd from './components/SaleInfo/EditPwd.vue';
import MyOrder from './components/HouseInfo/MyOrder.vue'

Vue.use(Router)
const VueRouterPush = Router.prototype.push 
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
export default new Router({
    routes: [{
        path: '/',
        name: 'login',
        component: Login
    },{
        path: '/home',
        name: 'home',
        component: Home,
        children: [{
            path: '/homeInfo',
            name: 'homeInfo',
            component: HomeInfo,
        },{
            path: '/publish',
            name: 'publish',
            component: Publish,
        },{
            path: '/manage',
            name: 'manage',
            component: Manage,
        },{
            path: '/modifyPwd',
            name: 'modifyPwd',
            component: ModifyPwd,
        },{
            path: '/myOrder',
            name: 'myOrder',
            component: MyOrder,
        }]
    },{
        path: '/room',
        name: 'room',
        component: Room
    },{
        path: '/admin',
        name: 'admin',
        component: Admin,
        children: [{
            path: '/admin1',
            name: 'admin1',
            component: Admin1,
        },{
            path: '/admin2',
            name: 'admin2',
            component: Admin2,
        },{
            path: '/admin3',
            name: 'admin3',
            component: Admin3,
        },{
            path: '/admin4',
            name: 'admin4',
            component: Admin4,
        },{
            path: '/admin5',
            name: 'admin5',
            component: Admin5,
        }]
    },{
        path: '/search',
        name: 'search',
        component: Search
    },,{
        path: '/sale',
        name: 'sale',
        component: Sale,
        children: [{
            path: '/saleHome',
            name: 'saleHome',
            component: SaleHome,
        },{
            path: '/mySale',
            name: 'mySale',
            component: MySale,
        },{
            path: '/editPwd',
            name: 'editPwd',
            component: EditPwd,
        }]
    }]
})