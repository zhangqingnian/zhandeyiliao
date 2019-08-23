<template>
  <div class="login">
    <Title :title="title" :back="false"/>
    <div class="content">
      <img class="logo" src="../assets/img/logo.png"/>
      
      <div class="input">
          <input type="text" placeholder="请输入账号" />
          <img class="mobile" src="../assets/img/mobile.png">
      </div>
      <div class="input">
          <input type="text" placeholder="请输入密码" />
          <img class="mobile" src="../assets/img/password.png">
      </div>

      <div class="loginBtn">登录</div>
    </div>
  </div>
</template>

<script>

import Title from "@/components/common/MyTitle";
export default {
  components:{
    Title
  },
  name: 'login',
  data () {
    return {
      title:'设备报修系统',
    }
  },
  
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
  margin: 108px 0 130px 0;
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
  width:670px;
  height:90px;
  background:rgba(26,173,25,1);
  border-radius:10px;
  border:2px solid rgba(5,5,5,0.08);
  font-size: 36px;
  color: #fff;
  text-align: center;
  line-height: 90px;
  margin-top: 200px;
}
</style>
