import axios from 'axios';
import { Message } from 'element-ui';

// 创建axios,赋给变量service
// 手把手撸码前端API,地址：http://www.web-jshtml.cn/productapi

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

const service = axios.create({
  baseURL: BASEURL, // http://192.168.0.110:8080/devApi/ == http://www.web-jshtml.cn/productapi/
  timeout: 1000
});

// 添加请求拦截器
/**
 * 请求接口前，做一些数据处理（请求拦截）
 */
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 后台需要前端这边传相关参数（在请求头添加参数）
  //Tokey、userId、uid等等
 
  // 业务需求

  //最终目的就是在请求头添加参数
  config.headers['Tokey'] = '11111';
  config.headers['userId'] = '22222';
  config.headers['uid'] = '33333';
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

/**
 * 请求接口，返回数据进行拦截（响应拦截器）
 */
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response.data;
  //业务需求

  // Promise的两个方法： reject/resolve
  if(data.resCode !== 0) {  //resCode不为0时，说明有问题
    Message.error(data.message);
    return Promise.reject(data); //跑index.vue 的.catch那段
  }else {
    return response;
    // return Promise.resolve;//跑index.vue的.then那段
  }

},function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 测试是可以调用成功的
// service.request({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });

// 使用 export default 时（不能同时存在多个default），
//文件import 不需要花括号 
export default service;