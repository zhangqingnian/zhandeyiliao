<template>
  <div class="wrapper">
      <!-- <Title :title="title"/> -->
      <div class="content flex-column" >
          <!-- <div class="bottom flex-row" >
            <div class="b-left flex-column">
              <div class="device-name">血液细胞分析仪</div>
              <div class="fs-26-color-999">SH3280-210032</div>
            </div>
            <div class="b-right flex-row">
              <div class="b-right-left flex-column">
                <div class="device-name state">待审批</div>
                <div class="fs-26-color-999">2019-07-12</div>
              </div>
              <img src="../assets/img/arrow.png" class="b-right-right">
            </div>
          </div> -->
          
          <van-list
            class="list"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getRecord"
           >
            <div class="bottom flex-row" v-for="item in list" :key="item.id" @click="onDetail(item)">
              <div class="b-left flex-column">
                <div class="device-name">{{item.equipmentName}}</div>
                <div class="fs-26-color-999">{{item.commodityNumber}}</div>
              </div>
              <div class="b-right flex-row">
                <div class="b-right-left flex-column">
                  <!-- <div class="device-name end" v-if="item.status == '3' ">维修已完成</div> -->
                  <div v-if="item.maintenanceType == 1">
                      <div class="device-name end" v-if="item.status == '3' && item.orderReceivingStatus == 3" >维修结束(不修)</div>
                      <div class="device-name end" v-else-if="item.status == '3'" >维修已完成</div>
                      <div class="device-name end" v-else >{{ item.orderReceivingStatus | orderReceivingStatusFilter }}</div>
                  </div>
                  <div v-if="item.maintenanceType == 2">
                     <div class="device-name end" v-if="item.status == '3' && item.quoteAccept == 2" >维修结束(拒绝维修)</div>
                      <div class="device-name end" v-else-if="item.status == '3'">维修已完成</div>
                      <div class="device-name end" v-else-if="item.quoteAccept == 1">待验收</div>
                      <div class="device-name end" v-else-if="item.quoteAccept == 2">拒绝维修</div>
                      <div class="device-name end" v-else-if="item.applicationCourier == 1">维修中(快递已发)</div>
                      <div class="device-name end" v-else>维修中</div>
                  </div>
                  <div class="fs-26-color-999">{{item.startTime | dateFormat}}</div>
                </div>
                <img src="../assets/img/arrow.png" class="b-right-right">
              </div>
            </div>
            
          </van-list>
      </div>
  </div>
</template>

<script>
import Vue from "vue";
import Title from "@/components/common/MyTitle";
import { List } from "vant";
Vue.use(List)
export default {
  name:'repairApplyRecord',
  components:{
      Title
  },
  data(){
    return {
        title: "维修申请记录",
        list: [],
        loading: false,
        finished: false,
        num:1
    }
  },
  filters:{
    orderReceivingStatusFilter(num){
      switch (num) {
        case 0:
          return '维修中';
        case 1:
          return '维修成功(待验收)';
        case 2:
          return '维修失败(待处理)';
        case 3:
          return '维修退回';
      }
    },
    statusFilter(num){
      switch (num) {
        case '1':
          return '草稿';
        case '2':
          return '审批中';
        case '3':
          return '结束';    
      }
    },
    actResultFilter(num){
      switch (num) {
        case '0':
          return '维修失败';
        case '1':
          return '维修成功';
        case '2':
          return '维修中';    
      }
    }  
  },
  methods:{
    onDetail(item){
      this.$router.push({
          path:'/ReportRepairDetail',
          query:{
              workOrder:JSON.stringify(item)
          }
      })
    },
    getRecord(){
      this.$http.post('wx/hospital/api/listWorkOrder',{
          page:this.num,
          limit:15,
          sidx:'',
          order:''
      }).then(res => {
        let {code, msg, page} = res.data;
        if(code == '0'){
            this.num++;
            let {totalPage, currPage, list} = page;
            this.list = this.list.concat(list);
            this.loading = false;
            if (currPage >= totalPage) {
              this.finished = true;
            }
        }
      })
    }
  },
  
}
</script>
<style lang="scss" scoped>
.fs-26-color-999 {
  color: #999;
  font-size: 26px;
  line-height: 37px;
}


.device-name {
  color: #000;
  font-size: 34px;
  line-height: 48px;
}
.bottom {
    margin-top: 24px;
    padding: 24px ;
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

    .end{
        color: #57AAF0;
    }

    .state{
        color: #FF8551;
    }
  }
</style>