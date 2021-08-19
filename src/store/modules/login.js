import { Login } from '@/api/login'

const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
}

const getters = {
  isCollapse: states => state.isCollapse
}

const mutations = { 
  SET_COLLAPSE(state){
    console.log('login');
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
  }
}

const actions = {  
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
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};