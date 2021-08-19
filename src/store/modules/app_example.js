// import Vue from "vue";
// import Vuex from "vuex";
// import Cookie from "cookie_js";
import { Login } from '@/api/login'

// Vue.use(Vuex);

// export default new Vuex.Store({
const app = {
  state: {  //初始值
    // isCollapse: false,
    //优先获取浏览器的存储值，若没有则取后面的值
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    // isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false,
    // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false,
    count: 10
  },
  getters: {  //computed  属性计算
    count: state => state.count + 10,  //ES6
    // count: function(state) { return state.count + 1 }  //ES5
    isCollapse: states => state.isCollapse
  },
  mutations: {  //外部更改state里的值  同步 没有回调处理事件
    SET_COLLAPSE(state){
      state.isCollapse = !state.isCollapse;
      console.log(state.isCollapse);
      //html5本地存储 
      //sessionStorage(关闭浏览器则清除)/localStorage(手动清除浏览器缓存才会清除)
      sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
      // localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
      // cookies
      // Cookie.set('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_COUNT(state, value) {
      state.count = value;
      console.log(state.count);
    }
  },
  actions: {  //与mutations类似，但mutations只能同步，actions既能同步也能异步
    login(content,requestData){
      return new Promise((resolve, reject) => {
        //接口
        Login(requestData).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
// });
export default app;