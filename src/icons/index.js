import Vue from "vue";
import SvgIcon from './SvgIcon'

Vue.component('svg-icon', SvgIcon)

// 后面的那部分内容写入SvgIcon.vue的文件中
// Vue.component('svg-icon', {
//   template: "<div>{{ msg }}</div>",
//   data(){
//     return {
//       msg: "你好呀！！！"
//     }
//   }
// })

/**  svg图片解析
 * require.context:读取指定目录的所有文件
 * 第一个:目录
 * 第二个:是否遍历子级目录
 * 第三个:定义遍历文件规则
*/

// ES6
const req = require.context('./svg', false, /\.svg$/) // 正则里面表示结尾，读取结尾为.svg的文件
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)

// ES5
// const requireAll = function(requireContext ){
//   return requireContext.keys().map(requireContext)
// }


