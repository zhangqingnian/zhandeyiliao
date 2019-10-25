<template>
  <div class="wrapper">
    <!-- <Title :title="title"/> -->
    <div class="content">
      <div class="input mt230 mb80">
        <input type="text" placeholder="请输入手机号码" v-model.trim="phone">
        <img class="mobile" src="../assets/img/mobile.png">
      </div>
      <div class="codewarp mb80">
          <div class="input  ">
            <input class="code" type="text" placeholder="请输入验证码" v-model.trim="code">
            <img class="mobile" src="../assets/img/check.png">
        </div>
        <div class="getcode" @click="getCode">{{sending ? time+'s后重新发送' :'获取验证码'}}</div>
      </div>
      
      <div class="input mb80">
        <input type="password" placeholder="请设置新密码" v-model.trim="password">
        <img class="mobile" src="../assets/img/password.png">
      </div>
      <div class="input">
        <input type="password" placeholder="请确定新密码" v-model.trim="confirmPassword">
        <img class="mobile" src="../assets/img/password.png">
      </div>
      <div class="loginBtn" @click="confirm">确定</div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant';
import Title from "@/components/common/MyTitle";
export default {
  name: "bindMobile",
  components: {
    Title
  },
  data() {
    return {
      title: "绑定手机号码",
      phone:'',
      code:'',
      password:'',
      confirmPassword:'',
      sending:false,
      time:60
    };
  },
  created(){
     console.log(this.$route)
  },
  methods: {
    //获取验证码
    getCode(){
      if(!this.phone){
        Toast('请输入手机号码!');
        return;
      }

      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){
        Toast('您输入手机号不合法!');
        return
      }
      if(this.sending)return
      this.sending = true;
      this.sendCode();
      let timer = setInterval(() => {
        this.time--
        if(this.time == 0){
          clearInterval(timer)
          this.time = 60;
          this.sending = false;
        }
      }, 1000);
    },
    //确定提交
    confirm(){
      if(!this.phone){
        Toast('请输入手机号码!')
        return;
      }
      if(!this.code){
        Toast('请输入验证码!')
        return;
      }
      if(!this.password || this.password.length < 6){
        Toast('请输入至少6位数密码!')
        return;
      }
      if(!this.confirmPassword){
        Toast('请再次输入密码!')
        return;
      }
      if(this.password != this.confirmPassword){
        Toast('两次输入的密码不相同!')
        return;
      }
      this.$http.post('/wx/bindingPhone',{
        phone:this.phone,
        code:this.code,
        password:this.password,
        confirmPassword:this.confirmPassword
      }).then(res => {
        console.log(res)
         let {code, msg} = res.data;
         Toast(msg)
         if(code == '0'){
            this.$router.go({path:this.$route.query.redirect})
         }
         
         
      })
    },
    sendCode(){
      this.$http.post('/wx/sendSms',{
        phone:this.phone,
        channelId:'ali_sms_channel',
        templateCode:'SMS_175200029'
      }).then(res => {
        let {code, msg} = res.data;
        Toast(msg)
      })
    }
  },
};
</script>
<style scoped>
.mb80{
    margin-bottom: 80px;
}
.mt230{
    margin-top: 200px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input {
  position: relative;
}

.input input {
  width: 700px;
  height: 90px;
  border-radius: 10px;
  border: 1px solid rgba(151, 151, 151, 1);
  box-sizing: border-box;
  padding-left: 100px;
  font-size: 34px;
  line-height: 90px;
}

.codewarp{
    width: 700px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.input .code{
    width: 460px;
}

.getcode{
    width: 200px;
    height: 90px;
    background-color: #4DA1E8;
    text-align: center;
    line-height: 90px;
    border-radius:10px;
    font-size: 34px;
    color: #fff;
}
.mobile {
  position: absolute;
  width: 48px;
  height: 48px;
  left: 20px;
  top: 20px;
}

.loginBtn{
  margin-top: 100px;
}
</style>