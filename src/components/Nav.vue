<template>
  <div class="wrapper">
      <div>
        <van-button type="info" to="/index">设备列表</van-button><br>
        <van-button type="danger" to="/repairApply">维修申请(我要报修)</van-button><br>
        <van-button type="info" to="/repairApplyRecord">维修申请记录</van-button><br>
        <div>
          <van-button type="info" to="/login">用户登录</van-button>
          <van-button type="primary" to="/bindMobile">绑定手机</van-button>
          <van-button type="warning" to="/revisePassword">修改密码</van-button>
        </div>
        <van-button type="primary" to="/reportRepairDetail">报修详情 维修中</van-button>
        <van-button type="info" to="/repairApplyDetail">报修详情</van-button>
        <van-button type="primary" to="/logisticsInfo">物流详情</van-button>
        <van-button type="warning" to="/repairDetail">维修详情</van-button>
        <van-button type="danger" to="/deviceCheck">设备验收</van-button>
        
      </div>
      <div>
        <h1>ENG</h1>
        <van-button type="info" to="/repairOrder">维修接单(我是工程师)</van-button>
        <van-button type="primary" to="/engRepairApplyDetail">维修申请详情</van-button>
        <van-button type="warning" to="/engRepairReceipt">维修申请回执</van-button>
        <van-button type="danger" to="/engMyRepairOrderDetail">我的维修单</van-button>
        <van-button type="info" to="/engRepairDetail">维修详情</van-button>
        <van-button type="danger" to="/addReturnVisit">添加回访</van-button>
        <van-button type="info" to="/hospitalList">医院列表</van-button>
        <van-button type="info" to="/engDeviceList">设备列表</van-button>
        <van-button type="info" to="/visitList">回访记录</van-button>
        
        
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
        <van-button type="info" to="/myTrainCourse">我的培训课程</van-button>
      </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button} from "vant";
Vue.use(Button)
export default {
  name:'',
  components:{},
  props:{},
  data(){
    return {
    }
  },
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style scoped>
.wrapper{}
</style>