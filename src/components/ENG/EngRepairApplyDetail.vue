<template>
  <div class="wrapper">
      <!-- <Title :title="title"/> -->
      <div class="content flex-column">
        <div class="device-info">
            <div class="samll-title fs-26-color-999">设备信息</div>
            <div class="device-info-content flex-row">
                <div class="left flex-column">
                    <div class="device-name">{{info.equipmentName}}</div>
                    <div class="device-type fs-26-color-999">设备型号：{{info.brandModel}}</div>
                    <div class="device-number fs-26-color-999">设备编号：{{info.commodityNumber}}</div>
                </div>
            </div>
        </div>

        <div class="fault-info">
            <div class="samll-title fs-26-color-999">故障信息</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">故障类型:</div>
                    <div class="val">{{info.faultTypeStr}}</div>
                </div>
                <div class="item-group flex-row">
                    <div class="name">维修类型:</div>
                    <div class="val">{{info.maintenanceTypeStr}}</div>
                </div>
                <div class="item-group flex-row">
                    <div class="name">故障描述:</div>
                    <div class="val w450">{{info.faultDescStr}}</div>
                </div>
                
                <div class="item-group">
                    <div class="name">故障图片:</div>
                    <div class="flex-row imgwarp">
                        <!-- <img class="img" src="../../assets/img/test.png"/> -->
                        <img class="img" v-for="imgName in faultImg" :key="imgName" :src="imgUrl+imgName" />
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="deliver-info">
            <div class="samll-title fs-26-color-999">交付信息</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">联系方式:</div>
                    <div class="val fs34">{{info.linkMobile}}</div>
                </div>
                <div class="item-group flex-row">
                    <div class="name">交付日期:</div>
                    <div class="fs34">{{info.dateOfDelivery | dateFormat}}</div>
                </div>
            </div>
        </div>

        <div class="deliver-info" v-if="descList.length"> 
            <div class="samll-title fs-26-color-999">补充说明</div>
            <div class="fault-info-content flex-column">
                <div class="desc" v-for="(item,index) in descList" :key="item.id">{{index+1+'.' +' '+ item.orderDesc}}</div>
            </div>
        </div>

        <div class="deliver-info" v-if="recordList.length"> 
            <div class="samll-title fs-26-color-999">维修记录</div>
            <div class="fault-info-content flex-column">
                <div class="desc" v-for="(item,index) in recordList" :key="item.id">{{index+1+'.' +' '+ item.maintenanceRecord}}</div>
            </div>
        </div>
        <!--orderReceivingStatus '工程师维修结果 0：待处理，1：维修成功，2：维修失败，3：维修退回', -->
        <div class="submit" v-if="info.orderReceivingStatus == 0" @click="onback">维修回执</div>

      </div>
  </div>
</template>

<script >
import Vue from 'vue';
import { baseURL } from "@/baseUrl";
//import Title from "@/components/common/MyTitle";
import { Toast } from 'vant';
Vue.use(Toast);

export default {
  data(){
    return {
        imgUrl:baseURL+'file/display/',
        title:'维修申请详情',
        show: false,
        popupContent:'',
        info:{},
        faultImg:[],
        descList:[],
        recordList:[]
    }
  },
  mounted(){
      let busId = this.$route.query.busId;
      this.getOrderInfo(busId);
      this.getDescList(busId)
      this.record(busId)
  },
  methods:{
      getOrderInfo(busId){
          
          this.$http.post('/wx/engineer/api/maintenanceRequestInfo',{
              busId
          }).then(res => {
              let {code, msg, equipmentInfo, workOrderApplyInfo} = res.data;
              if(code == '0'){
                  this.info = workOrderApplyInfo;
                  this.faultImg = workOrderApplyInfo.faultImg.split(',');
              }else{
                  Toast(msg)
              }
          })
      },
      getDescList(workOrderId){
          this.$http.post('wx/hospital/api/workOrderDescList',{
              workOrderId,
              page:1,
              limit:20,
              sidx:'',
              order:''
          }).then(res =>{
              let {code, msg, page} = res.data;
              if(code == '0'){
                  let {list} = page;
                  this.descList = list;
              }
          })
      },
      record(workOrderId){
          this.$http.post('/wx/engineer/api/checkMaintenanceList',{
              workOrderId
          }).then(res => {
              console.log(res.data)
              let {code, msg, mrList} = res.data;
              if(code == '0'){
                  this.recordList = mrList;
              }
          })
      },
      onback(){
          this.$router.push({
              path:'/engRepairReceipt',
              query:{
                  device:JSON.stringify(this.info),
                  taskId:this.$route.query.taskId
              }
          })
      },
      
  }
}
</script>
<style lang="scss" scoped>


.desc{
     color: #999;
    font-size: 28px;
    line-height: 60px;
}
.fs34{
    font-size: 34px;
}
.w450{
    width: 450px;
    text-align: right;
}
.fs-26-color-999{
    color: #999;
    font-size: 26px;
    line-height: 37px;
}

.samll-title{
    margin: 40px 0 16px 24px;
}

.device-info-content{
    background: #fff;
    box-sizing: border-box;
    padding: 24px;
    justify-content: space-between;
    align-items: center;
    .device-name{
        color: #000;
        font-size: 34px;
        line-height: 48px;
    }

    .right{
        width: 56px;
        height: 56px;
    }
}

    


.fault-info-content{
    background-color: #fff;
    padding: 0 24px;
    .item-group{
        justify-content: space-between;
        margin: 16px 0;
        color: #999;
        font-size: 28px;
        line-height: 37px;
        .imgwarp{
            flex-wrap: wrap;
           
        }
        .img{
            width: 210px;
            height: 210px;
            background: rebeccapurple;
            border-radius: 8px;
            margin: 18px 36px 18px 0;
             margin-right: 36px;
             &:nth-child(3n){
                  margin-right: 0;
             }
        }
    }
    
}

.submit{
    width:670px;
  height:90px;
  background:rgba(26,173,25,1);
  border-radius:10px;
  border:2px solid rgba(5,5,5,0.08);
  font-size: 36px;
  color: #fff;
  text-align: center;
  line-height: 90px;
  margin: 40px auto;
}

.refuse {
  color: #000;
  background: rgba(248, 248, 248, 1);
  border: 2px solid rgba(5, 5, 5, 0.1);
}
.popup-title-warp{
    position: relative;
    text-align: center;
    padding: 0 24px;
}
.popup-title{
    font-size: 34px;
    color: #000;
    line-height: 48px;
    padding: 40px 0;
}

.close{
    width: 60px;
    height: 60px;
    position: absolute;
    right: 10px;top: 30px;
}
.popup-content-warp{
    width: 100%;
    box-sizing: border-box;
    padding: 0 24px;
}
.popup-content{
    width: 100%;
    box-sizing: border-box;
    padding: 40px;
    height:400px;
    background:rgba(245,245,245,1);
    border-radius:8px;
    border:1px solid rgba(151,151,151,1);
    resize: none;
    font-size: 28px;
}
</style>