<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" alt="vue图标"></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
      >
      <!-- router:是否使用vue-router的模式，启用该模式会在激活导航时以 index 作为path进行路由跳转-->
      <template v-for="(item, index) in routers">  
        <!-- v-for转出的是number类型，所以将index转为string类型 index + '' 变为 字符串类型 -->
        <!-- key不能加在该位置,因为template不是一个标签可以进行渲染的，放在需要渲染的标签上 -->
        <el-submenu :key="item.id" :index="index + ''" v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" class="font50"/>
            <span slot="title">{{ item.meta.name }}</span>
          </template> 
          <!-- 子级菜单 -->
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted, computed } from '@vue/composition-api';
export default {
  name: 'navMenu',
  setup(props,{ root }){
    /**
     * data数据
     */
    // const isCollapse = ref(false)
    // console.log(root.$router.options.routes); //获取到这三个路由
    const routers = reactive(root.$router.options.routes);
    // console.log(routers);
    
    /**
     * computed监听
     */
    const isCollapse = computed(() => root.$store.state.app.isCollapse)  //一行可不写花括号和return
    // const isCollapse = computed(() => {
    //   return root.$store.state.isCollapse;
    // })

    /**
     * 函数
     */
    
    //打印store   
    // console.log(root.$store);
    // console.log(root.$store.state.app.isCollapse);
    // console.log(root.$store.getters.count);
 

    // root.$store.commit('SET_COUNT', 100)
    // console.log(root.$store.state.app.count);

    return {
      isCollapse,
      routers
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/config.scss';
.logo {
  img {
    margin: 28px auto 25px;
    width: 92px;
    @include webkit(transition, all .3s ease-in 0s);
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all .3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}

.open {
  #nav-wrap { width: $navMenu; }
  .el-menu { width: $navMenu; }
}
.close {
  #nav-wrap { width: $navMenuMin; }
  .el-menu { width: $navMenuMin; }
  .logo img {
    width: 70%;
  }
}
</style>