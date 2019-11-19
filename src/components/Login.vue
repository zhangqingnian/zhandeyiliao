<template>
  <div class="login">
    <!-- <Title :title="title" :back="false"/> -->
    <div class="content">
      <img class="logo" src="../assets/img/logo.png"/>
      
      <div class="input">
          <input type="text" placeholder="请输入账号" v-model.trim="loginName" />
          <img class="mobile" src="../assets/img/mobile.png">
      </div>
      <div class="input">
          <input type="password" placeholder="请输入密码" v-model.trim="passWord"/>
          <img class="mobile" src="../assets/img/password.png">
      </div>
      <!-- <div class="revisePasswordWarp">
          <router-link class="revisePassword" :to="{name:'revisePassword'}">修改密码</router-link>
      </div> -->
      
      <div class="loginBtn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Title from "@/components/common/MyTitle";
import {
  Toast
} from 'vant';

function getUrlParam(name) { //封装方法
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);

  return null; //返回参数值
}

export default {
  components:{
    Title
  },
  name: 'login',
  data () {
    return {
      title:'设备报修系统',
      loginName:'',
      passWord:''
    }
  },
  created(){
        // var code = getUrlParam("code");
        // var STATE = this.$route.query.redirect
        // if (!code) {
        //   var addr ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9a2400c6e3f4ef5b&redirect_uri=http%3A%2F%2Fzhande.xisheninfo.com%2Fwx_index.html%23%2Flogin&response_type=code&scope=snsapi_userinfo&state='+STATE+'#wechat_redirect'
        //   //var addr ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9a2400c6e3f4ef5b&redirect_uri=http%3A%2F%2Flfsj.nat300.top%2Fwx_index.html%23%2Flogin&response_type=code&scope=snsapi_userinfo&state='+STATE+'#wechat_redirect'
        //   window.location.href = addr;
        // }
        // localStorage.setItem('code',code)
  },
  methods:{
    login(){
      let {loginName, passWord} = this;
      if(!loginName){
        Toast('请输入账号！');
        return;
      }
      if(!passWord){
        Toast('请输入密码！');
        return;
      }
      let code = localStorage.getItem('code') || '';
      this.$http.post('/wx/wxLogin_123',{ 
        loginName,
        passWord,
        code
      }).then(res => {
        
        let {code, session, isBinding, msg, currentUser} = res.data;
        Toast(msg);
        if(code == '0'){
            Cookies.set('JSESSIONID',session);
            let userRole = currentUser.userRole;
            localStorage.setItem('userRole',userRole)
            /*
              userRole 角色 判断 
              1：医院管理员  不能进我是工程师 /repairOrder 
              2：工程师   只能进/repairOrder
              3：销售员   all\
              4: 科室
            */ 
           
            if(isBinding){
              let redirect = getUrlParam("state");
              console.log(redirect)
              this.$router.replace({
                path:redirect || '/'
              })
            }else{
              this.$router.replace({
                path:'/bindMobile',
                query:{
                  redirect:this.$route.query.redirect
                }
              })
            }
        }
        
      })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  display: flex;
  flex-direction: column;
  align-items: center; 
}
.logo{
  width: 384px;
  height: 374px;
  margin: 100px 0 100px 0;
}

.input{
  position: relative;
}

.input:nth-child(2){
  margin-bottom: 80px;
}
.input input{
  width:700px;
  height:90px;
  border-radius:10px;
  border:1px solid rgba(151,151,151,1);
  box-sizing: border-box;
  padding-left: 100px;
  font-size: 34px;
  line-height: 90px;
}

.mobile{
  position: absolute;
  width: 48px;
  height: 48px;
  left: 20px;
  top:20px;
}

.loginBtn{
  margin-top: 100px;
}

.revisePasswordWarp{
  width: 700px;
  text-align: right;
  margin-top: 20px;
}
.revisePassword{
  
  color: #E60213;
  font-size: 24px;
  
}
</style>
