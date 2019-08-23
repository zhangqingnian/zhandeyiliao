<template>
  <div class="wrapper">
    <Title :title="title"/>
    <div class="content">
      <div class="input mt230 mb80">
        <input type="text" placeholder="请输入手机号码">
        <img class="mobile" src="../assets/img/mobile.png">
      </div>
      <div class="codewarp mb80">
          <div class="input  ">
            <input class="code" type="text" placeholder="请输入验证码">
            <img class="mobile" src="../assets/img/check.png">
        </div>
        <div class="getcode">获取验证码</div>
      </div>
      
      <div class="input mb80">
        <input type="text" placeholder="请设置新密码">
        <img class="mobile" src="../assets/img/password.png">
      </div>
      <div class="input">
        <input type="text" placeholder="请确定新密码" >
        <img class="mobile" src="../assets/img/password.png">
      </div>
      <div class="loginBtn">确定</div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
export default {
  name: "bindMobile",
  components: {
    Title
  },
  props: {},
  data() {
    return {
      title: "绑定手机号码"
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style scoped>
.mb80{
    margin-bottom: 80px;
}
.mt230{
    margin-top: 230px;
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