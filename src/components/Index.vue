<template>
  <div class="wrapper">
    <Title title="首页" :right="true" @right="onRight">
      <title-icon slot="right" class="right" name='apply_off'/>
    </Title>
    <div class="content flex-column">
      <div class="search-warp">
        <div class="search">
          <input class="search-input" type="text" placeholder="请输入设备编号和名称">
          <img class="search-img" src="../assets/img/search.png">
        </div>
      </div>
      <div class="list">
        <div class="item flex-row">
          <div class="left flex-column">
            <div class="device-name">眼底照相造影机（成人用）</div>
            <div class="device-type">JN103450-2S</div>
          </div>
          <div class="right flex-row">
            <div class="right-l flex-column">
              <div class="device-state">正常</div>
              <div class="section">眼科</div>
            </div>
            <img class="right-r" src="../assets/img/arrow.png">
          </div>
        </div>
        <div class="item flex-row">
          <div class="left flex-column">
            <div class="device-name">眼底照相造影机（成人用）</div>
            <div class="device-type">JN103450-2S</div>
          </div>
          <div class="right flex-row">
            <div class="right-l flex-column">
              <div class="device-state">正常</div>
              <div class="section">眼科</div>
            </div>
            <img class="right-r" src="../assets/img/arrow.png">
          </div>
        </div>
        <div class="item flex-row">
          <div class="left flex-column">
            <div class="device-name">眼底照相造影机（成人用）</div>
            <div class="device-type">JN103450-2S</div>
          </div>
          <div class="right flex-row">
            <div class="right-l flex-column">
              <div class="device-state">正常</div>
              <div class="section">眼科</div>
            </div>
            <img class="right-r" src="../assets/img/arrow.png">
          </div>
        </div>
        <div class="item flex-row">
          <div class="left flex-column">
            <div class="device-name">眼底照相造影机（成人用）</div>
            <div class="device-type">JN103450-2S</div>
          </div>
          <div class="right flex-row">
            <div class="right-l flex-column">
              <div class="device-state">正常</div>
              <div class="section">眼科</div>
            </div>
            <img class="right-r" src="../assets/img/arrow.png">
          </div>
        </div>
      </div>
      <div>
        <van-button type="info" to="/login">用户登录</van-button>
        <van-button type="primary" to="/bindMobile">绑定手机</van-button>
        <van-button type="warning" to="/revisePassword">修改密码</van-button>
        <van-button type="danger" to="/repairApply">维修申请</van-button>
        <van-button type="info" to="/repairApplyDetail">报修详情</van-button>
        <van-button type="primary" to="/logisticsInfo">物流详情</van-button>
        <van-button type="warning" to="/repairDetail">维修详情</van-button>
        <van-button type="danger" to="/deviceCheck">设备验收</van-button>
        <van-button type="info" to="/repairApplyRecord">维修申请记录</van-button>
      </div>
      <div>
        <h1>ENG</h1>
        <van-button type="info" to="/repairOrder">维修接单</van-button>
        <van-button type="primary" to="/engRepairApplyDetail">维修申请详情</van-button>
        <van-button type="warning" to="/engRepairReceipt">维修申请回执</van-button>
        <van-button type="danger" to="/engMyRepairOrderDetail">我的维修单</van-button>
        <van-button type="info" to="/engRepairDetail">维修详情</van-button>
      </div>
      <div>
        <h1>咨询</h1>
        <van-button type="info" to="/myConsult">我的咨询</van-button>
        <van-button type="primary" to="/consult">我要咨询</van-button>
        <van-button type="warning" to="/consultDetail">咨询详情</van-button>
      </div>
      <div>
        <h1>培训</h1>
        <van-button type="info" to="/trainCourse">培训课程</van-button>
        <van-button type="primary" to="/trainDetail">培训详情</van-button>
        <van-button type="warning" to="/trainSignup">报名</van-button>
      </div>
      
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";
import Title from "@/components/common/MyTitle";
import titleIcon from "@/components/common/TitleIcon";
import RepairApplyVue from "./RepairApply.vue";
Vue.use(Button);
export default {
  name: "index",
  components: {
    Title,titleIcon
  },
  data() {
    return {
    };
  },
  created() {
    
  },
  methods: {
    onRight() {
      this.$router.push({
        name: "repairApply"
      });
    }
  }
};
</script>
<style scoped>
/* .title{
      justify-content: center;
      width: 100%;
      height: 88px;
      color: #fff;
      background:linear-gradient(135deg,rgba(240,95,87,1) 0%,rgba(227,79,71,1) 100%);
      font-size: 37px;
      position: relative;
    } */
.logowarp {
  display: flex;
  align-items: center;
}
.logo {
  width: 48px;
  height: 48px;
  background-color: #fff;
  margin-right: 10px;
}
.apply {
  position: absolute;
  width: 55px;
  height: 56px;
  top: 16px;
  right: 25px;
}
.content {
  width: 100%;
  min-height: calc(100vh - 88px);
  background: #f5f5f5;
  align-items: center;
  padding-top: 100px;
  box-sizing: border-box;
}
.search-warp{
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  position: fixed;
  top: 88px;
  z-index: 999;
  box-shadow:0px -1px 0px 0px rgba(229,229,229,1),0px 1px 0px 0px rgba(229,229,229,1);
}
.search {
  width: 700px;
  height: 60px;
  position: relative;
  margin: 16px 0;
}
.search-input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid rgba(230, 230, 234, 1);
  font-size: 26px;
  padding-left: 70px;
}
.search-img {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  left: 15px;
}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.item {
  background: #fff;
  justify-content: space-between;
  padding: 24px;
  box-sizing: border-box;
  margin-bottom: 40px;
}

.left {
  justify-content: space-between;
}

.right {
  align-items: center;
}

.device-name {
  font-size: 34px;
  color: #000;
  line-height: 48px;
}
.device-type {
  font-size: 26px;
  color: #999;
  line-height: 36px;
}

.device-state {
  color: #57aaf0;
}

.section {
  color: #888888;
}
.right-r {
  width: 16px;
  height: 26px;
  margin-left: 30px;
}
.right-l {
  font-size: 34px;
}
</style>