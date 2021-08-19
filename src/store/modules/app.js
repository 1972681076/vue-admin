import { Login } from '@/api/login';
import { setToKen, removeToKen, setUserName, getUserName, removeUserName } from '@/utils/app';
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  to_ken: '',
  username: getUserName() || ''
}

const getters = {
  isCollapse: states => state.isCollapse
}

const mutations = { 
  SET_COLLAPSE(state) {
    // console.log('app');
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.to_ken = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  }
}

const actions = {  
  login({ commit },requestData){
    return new Promise((resolve, reject) => {
      //接口
      Login(requestData).then((response) => {
        let data = response.data.data;
        console.log(data);
        //普通的
        // content.commit('SET_TOKEN', data.token)
        // content.commit('SET_USERNAME', data.username)
        // 解构的
        commit('SET_TOKEN', data.token);
        commit('SET_USERNAME', data.username);
        setToKen(data.token);
        setUserName(data.username);
        //存储token、username
        resolve(response);
      }).catch(error => {
        reject(error);
      })
    })
  },
  // 退出
  exit( { commit } ) {
    return new Promise((resolve, reject) => {
      removeToKen();
      removeUserName();
      commit('SET_TOKEN', '')
      commit('SET_USERNAME', '');
      resolve();
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};