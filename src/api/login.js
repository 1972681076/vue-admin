// service 这个名字可以改动，不需要跟request.js里导出来的名字一样
import service from '@/utils/request.js'
/**
 * 获取验证码
 */
export function GetSms(data) {
  return service.request({
    method: "post",
    url: "/getSms/",
    data
    // data: data 左边data是变量名（key） 为后台接收的，右边dat是接收的参数
    //两者同名的话，可写成单一一个即可（ES6写法）
  })
}

/**
 * 获取用户角色
 */

/**
 * 登录
 */
 export function Login(data) {
  return service.request({
    method: "post",
    url: "/login/",
    data
  })
}

/**
 * 注册
 */
export function Register(data) {
  return service.request({
    method: "post",
    url: "/register/",
    data
  })
}