import router from "./index";
import store from "../store/index"
import { getToKen, removeToKen, removeUserName } from "@/utils/app";

const whiteRouter = ['/login']; //indexOf方法，判断数组中是否存在指定某个对象，不存在则返回-1
// 路由守护
router.beforeEach((to, from, next) => {
  if(getToKen()){
    console.log(to);
    if(to.path === '/login'){
      removeToKen(); //当浏览器输入login时，清除admin_token的记录，再次输入index时，已进入不了
      removeUserName();
      store.commit("app/SET_TOKEN", '');
      store.commit("app/SET_USERNAME", '');
      next();
    }else {
      //获取用户的色
      //动态分配路由权限
      next();
    }
    /**
     * 1、to = /console
     * 2、to = /index
    */
    // 路由动态添加，分配菜单，每个角色分配不同的菜单
    console.log('存在');
  }else {
    // next('/login'); // 路由指向  这样写会陷入无限循环
    console.log('不存在');
    if(whiteRouter.indexOf(to.path) !== -1) {
      next(); //to
    }else {
      next('/login');
    } 
    /**
     * 1、直接进入index的时候，参数to被改变成了“/index"，触发路由指向，就会跑beforeEach
     * 2、再一次next指向了login，再次发生路由指向，再跑beforeEach，参数的to被改变成了"/login"
     * 3、白名单判断存在，则直接执行next()，因为没有参数，所以不会再次beforeEach
     */ 
  }
  // console.log(to); //进入的页面（下一个页面）
  // console.log(from); //离开前的页面（上一个页面）
  // console.log(next);
  // next() //为空 调用to
})