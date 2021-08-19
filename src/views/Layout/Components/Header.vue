<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState()"><svg-icon iconClass="menu" className="menu" /></div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="../../../assets/logo.png" alt="">
        {{ username}}
      </div>
      <div class="header-icon pull-left" @click="exit()">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from '@vue/composition-api'
export default {
  name: 'layoutHeader',
  setup(props,{ root }){
    const username = computed(() => root.$store.state.app.username);
    const navMenuState = () => {
      root.$store.commit('app/SET_COLLAPSE');
    }
    // 退出
    const exit = () => {
      root.$store.dispatch('app/exit').then(() => {
        // 页面跳转
        root.$router.push({
          name: 'Login'  //路由名称
        })
      })
    }

    return {
      navMenuState,
      username,
      exit
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../styles/config.scss';
#header-wrap {
  position: fixed;  
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));
  line-height: 75px;
}
.open {
  #header-wrap { left: $navMenu; }
}
.close {
  #header-wrap { left: $navMenuMin; }
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    width: 20px;
    margin-bottom: -5px;
  }
}

</style>