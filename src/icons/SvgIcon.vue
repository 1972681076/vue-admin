<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { ref, computed, onMounted } from '@vue/composition-api';
export default {
  name: "svgIcon",
  //简单语法，不限制数据类型
  // props: ['iconClass', 'className'], 
  props: {
    iconClass: {
      // type: Array,
      // default: () => [], //ES6
      // default: function(){
      //   return []
      // },   //ES5
      type: String,  //定义接收值类型
      default: '',  //默认值
      // required: true  //true 为必填项，默认为false
    },
    className: {
      type: String,
      default: '',
    }
  },
  setup(props){
    // console.log(props.iconClass);
    // console.log(props.className);

    // 计算属性，得出最终结果，并返回
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => {
      if(props.className) {
        //返回到use里
        return  `svg-icon ${props.className}`
      }else {
        return  `svg-icon`
      }
    })

    return {
      iconName,
      svgClass
    }
  }
}
</script>
<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    // 修改图标颜色（svg需写上fill）
    fill: currentColor;
    // color: red;
    //统一定义
    // font-size: 20px;
    //单个定义
    // &.font50 {
    //   font-size: 50px;
    // }
  }
</style>