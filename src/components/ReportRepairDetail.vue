<template>
  <div class="wrapper">
    <!-- <Title :title="title"/> -->
    <div class="content">
      <div class="detail">
        <div class="top flex-row">
          <div class="left flex-column">
            <div class="device-name">{{workOrder.equipmentName}}</div>
            <div class="device-type fs-26-color-999">设备型号：{{workOrder.brandModel}}</div>
            <div class="device-number fs-26-color-999">设备编号：{{workOrder.commodityNumber}}</div>
            <div class="device-number fs-26-color-999">工期：{{workOrder.duration}}</div>
          </div>
          <img class="right" @click="goDetail" src="../assets/img/see_details.png">
        </div>
      </div>
      <van-steps :active="active" active-color="#57AAF0" direction="vertical">
        <van-step>
          <!-- 维修申请 -->
          <div class="bottom flex-row" @click="goApplyDetail">
            <div class="b-left flex-column">
              <div class="device-name">维修申请</div>
              <div class="fs-26-color-999">{{workOrder.commodityNumber}}</div>
            </div>
            <div class="b-right flex-row">
              <div class="b-right-left flex-column">
                <div v-if="workOrder.maintenanceType == 1">
                      <div class="device-name end" v-if="workOrder.status == '3' && workOrder.orderReceivingStatus == 3" >维修结束(不修)</div>
                      <div class="device-name end" v-else-if="workOrder.status == '3'" >维修已完成</div>
                      <div class="device-name end" v-else >{{ workOrder.orderReceivingStatus | orderReceivingStatusFilter }}</div>
                  </div>
                  <div v-if="workOrder.maintenanceType == 2">
                      <div class="device-name end" v-if="workOrder.status == '3' && workOrder.quoteAccept == 2" >维修结束(拒绝维修)</div>
                      <div class="device-name end" v-else-if="workOrder.status == '3'">维修已完成</div>
                      <div class="device-name end" v-else-if="workOrder.quoteAccept == 1">待验收</div>
                      <div class="device-name end" v-else-if="workOrder.quoteAccept == 2">拒绝维修</div>
                      <div class="device-name end" v-else-if="workOrder.applicationCourier == 1">维修中(快递已发)</div>
                      <div class="device-name end" v-else>维修中</div>
                  </div>
                <div class="fs-26-color-999">{{workOrder.createTime | dateFormat}}</div>
              </div>
              <img src="../assets/img/arrow.png" class="b-right-right">
            </div>
          </div>
        </van-step>
        <van-step>
          <!--上门/ 维修成功 -->
          <div class="bottom flex-row" @click="onSuccess" >
            <div class="b-left flex-column">
              <div class="device-name">{{workOrder.maintenanceType == 1 ? '上门维修':'快递维修'}}</div>
              <div class="fs-26-color-999">010-51021234</div>
            </div>
            <div class="b-right flex-row">
              <div class="b-right-left flex-column">
                <div class="device-name state" v-if="workOrder.maintenanceType == 1 && workOrder.status == '3' ">维修已完成</div>
                <div class="device-name state" v-if="workOrder.maintenanceType == 1 && workOrder.status != '3' ">
                  {{workOrder.orderReceivingStatus | orderReceivingStatusFilter }}</div>
                <div class="device-name state" v-if="workOrder.maintenanceType == 2">
                  {{workOrder.applicationCourier | applicationCourierFilter }}</div>
                
                <!-- <div class="fs-26-color-999">北京佳士康科技有限公司</div> -->
              </div>
              <img src="../assets/img/arrow.png" class="b-right-right">
            </div>
          </div>
        </van-step>
        <van-step v-if="workOrder.maintenanceType == 2 && workOrder.applicationCourier != 0">
          <div class="bottom flex-row" @click="onExpress">
            <div class="b-left flex-column">
              <div class="device-name">物流信息</div>
              <!-- <div class="fs-26-color-999">{{workOrder.courierMailno}}</div> -->
            </div>
            <div class="b-right flex-row">
              <div class="b-right-left flex-column">
                <!-- <div class="device-name state">更多</div> -->
                <div class="fs-26-color-999">顺丰快递</div>
              </div>
              <img src="../assets/img/arrow.png" class="b-right-right">
            </div>
          </div>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Step, Steps } from "vant";

Vue.use(Step).use(Steps);
export default {
  mounted(){
    let {maintenanceType, applicationCourier, courierNumber} = this.workOrder;
    if(maintenanceType == 2 && applicationCourier != 0){
      this.expressInfo(courierNumber)
    }
  },
  data() {
    return {
      title: "报修详情",
      active: 0,
      workOrder:JSON.parse(this.$route.query.workOrder),//this.$route.query.workOrder
      workOrderExpress:{}
    };
  },
  filters:{
    expressStatusFilter(num){
      switch (num) {
        case '1':
          return "已下单"
        case '2':
          return "运输中"
        case '3':
          return "待签收"
        case '4':
          return "已签收"    
      }
    },
    actResultFilter(num){
      switch (num) {
        case '1':
          return "维修成功"
        case '2':
          return "维修失败"
        case '3':
          return "维修中" 
      }
    },
    //快递维修
    applicationCourierFilter(num){
      switch (num) {
        case 0:
          return "待处理" 
        case 1:
          return "申请成功"
        case 2:
          return "申请失败"
      }
    },
    //上门维修
    orderReceivingStatusFilter(num){
      switch (num) {
        case 0:
          return "待处理" 
        case 1:
          return "维修成功(待验收)"
        case 2:
          return "维修失败"
        case 3:
          return "维修退回"  
      }
    },
    quoteAcceptFilter(num){
      switch (num) {
        case 0:
          return "待处理" 
        case 1:
          return "接受"
        case 2:
          return "拒绝"
      }
    },
    statusFilter(num){
      switch (num) {
        case 1:
          return "草稿"
        case 2:
          return "审批中"
        case 3:
          return "结束"  
      }
    }
  },
  methods:{
    goDetail(){
      this.$router.push({
        path:'/deviceDetail',
        query:{
          id:this.workOrder.depId
        }
      })
    },
    //查看快递信息
    onExpress(){
      this.$router.push({
        path:'/logisticsInfo',
        query:{
          id:this.workOrder.id,
          workOrderExpress:JSON.stringify(this.workOrderExpress)
        }
      })
    },
    expressInfo(orderNo){
      this.$http.post('wx/hospital/api/myWorkOrderExpress',{
        orderNo
      }).then(res => {
        let {code, msg, workOrderExpress} = res.data;
        if(code == '0'){
          this.workOrderExpress = workOrderExpress;
        }
      })
    },
    onSuccess(){
      //上门维修 && 成功或失败
      if( this.workOrder.maintenanceType == 1 && this.workOrder.orderReceivingStatus != 0 ){
        this.$router.push({
          path:'/repairDetail',
          query:{
            id:this.workOrder.id,
          }
        })
      }

      //快递维修 && 成功
      if( this.workOrder.maintenanceType == 2  ){
        this.$router.push({
          path:'/r',
          query:{
            id:this.workOrder.id,
          }
          
        })
      }
      

      
    },
    goApplyDetail(){
      this.$router.push({
        path:'/RepairApplyDetail',
        query:{
          id:this.workOrder.id,
        }
      })
    }
  }
};
</script>
<style lang='scss' scoped>
.fs-26-color-999 {
  color: #999;
  font-size: 26px;
  line-height: 37px;
}
.content {
  display: flex;
  flex-direction: column;
}

.device-name {
  color: #000;
  font-size: 34px;
  line-height: 48px;
}

.detail {
  margin-top: 24px;
  background: #fff;
  box-sizing: border-box;
  padding: 0 24px;

  .top {
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 24px 0;
    border-bottom: 1px solid rgba(151, 151, 151, 1);

    .right {
      width: 56px;
      height: 56px;
    }
  }

  
}
.bottom {
    // padding: 24px 0;
     background: #fff;
    font-size: 28px;
    color: #999;
    justify-content: space-between;
    align-items: center;
    .b-right {
      align-items: center;
    }
    .b-right-left {
      align-items: flex-end;
    }
    .b-right-right {
      width: 16px;
      height: 26px;
      margin-left: 16px;
    }
  }
.examine{
  color: #ff8551;
}
.state {
  
  color: #57AAF0;
}
</style>