<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
      </ul>
      <!-- 表单开始 -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  prop="pass" class="item-form">
          <label>密码</label>
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item  prop="pass2" class="item-form" v-show=" model === 'register'">
          <label>重复密码</label>
          <el-input type="password" v-model="ruleForm.pass2" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="item-form">
          <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { reactive, ref, isRef, toRefs, onMounted } from '@vue/composition-api'
  import { validateEmail, stripscript, validatePassword, validateVcode } from '@/utils/validate.js';
  export default {
    name: 'login',
    setup(props, { refs}){

      //验证邮箱
      let validateUsername = (rule, value, callback) => {
        // let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)) { 
          callback(new Error('用户名格式有误'));
        } else {
          callback(); //返回true
        }
      };
      //验证密码
      let validatePass = (rule, value, callback) => { 
        //过滤后的数据
        ruleForm.pass = stripscript(value)
        value = ruleForm.pass
        if (value === '') {
          callback(new Error('请输入密码')); 
        } else if(validatePassword(value)){
          callback(new Error('密码应为6-20位数字+字母'));
        } else {
          callback();
        }
      };
      //验证重复密码
      let validatePass2 = (rule, value, callback) => {
        //如果模块值为login,直接通过,或者不使用v-show，使用v-if,可省去这一步
        if(model.value === 'login') { 
          callback(); 
        } 
        //过滤后的数据
        ruleForm.pass2 = stripscript(value)
        value = ruleForm.pass2
        if (value === '') {
          callback(new Error('请再次输入密码')); 
        } else if(value != ruleForm.pass){
          callback(new Error('重复密码不正确'));
        } else {
          callback();
        }
      };
      //验证验证码
      let validateCode = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入验证码'));
        }else if(validateVcode(value)) {
          return callback(new Error('验证码格式有误'));
        }else {
          callback();
        }
      };

      /**
       * 声明数据
       */
      // 这里放置data数据、生命周期、自定义的函数
      //声明对象使用reactive
      const menuTab = reactive( [
        { txt: '登录', current: true, type: 'login'},
        { txt: '注册', current: false, type: 'register'}
      ])
      // console.log(menuTab);

      //声明基础类型,模块值
      const model = ref('login')
      // console.log(model.value)
      // 验证是否是基础数据类型
      // console.log(isRef(model) ? '是基础数据' : '是对象类型')

      // toRefs将reactive对象转换为普通对象，取值时要加.value
      // 解构
      // function useMousePositon() {
      //   const pos = reactive({
      //     x:0,
      //     y:1
      //   })
      //   return pos
      // }
      // const { x, y } = useMousePositon()
      // console.log(x.value, y.value);

      // 表单绑定数据
      const ruleForm = reactive({
        username: '',
        pass: '',
        pass2: '',
        code: ''
      })

      // 表单验证
      const rules = reactive({
        username: [
          { 
            validator: validateUsername, 
            trigger: 'blur' //失去焦点触发
          }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        pass2: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      })

      /**
       * 声明函数
       */
      //vue 数据驱动视频渲染
      const toggleMenu = (data => {
        menuTab.forEach(elem => {
          elem.current = false
        });
        //高光
        data.current = true
        // 修改模块值
        model.value = data.type
      });

      const submitForm =(formName =>{
        refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      })
      /**
       * 生命周期
       */
      // 挂载完成后
      onMounted(() => {
      })

      return {
        menuTab,model,toggleMenu,submitForm,ruleForm,rules
      }
    },
  }
</script>
<style lang="scss" scoped>
  #login {
    height: 100vh; //可视窗口区域
    background-color: #344a5f;
  }
  .login-wrap {
    width: 300px;
    margin: auto;
  }
  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: #2f4255;
    }
  }
  .login-form {
    margin-top: 29px;
    label {
      display: block;
      margin-bottom: 3px;
      font-size: 14px;
      color: #fff;
    }
    .item-form { margin-bottom: 13px;}
    .block {
      display: block;
      width: 100%;
    }
    .login-btn {
      margin-top: 19px;
    }
  }
</style>
