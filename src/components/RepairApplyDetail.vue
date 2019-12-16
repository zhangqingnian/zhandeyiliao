
<template>
  <div class="wrapper">
      <!-- <Title :title="title"/> -->
      <div class="content flex-column">
        <div class="device-info">
            <div class="samll-title fs-26-color-999">设备信息</div>
            <div class="device-info-content flex-row">
                <div class="left flex-column">
                    <div class="device-name">{{wordOrder.equipmentName}}</div>
                    <div class="device-type fs-26-color-999">设备型号：{{wordOrder.brandModel}}</div>
                    <div class="device-number fs-26-color-999">设备编号：{{wordOrder.commodityNumber}}</div>
                    <div class="device-number fs-26-color-999">工期：{{wordOrder.duration}}</div>
                </div>
            </div>
        </div>

        <div class="fault-info">
            <div class="samll-title fs-26-color-999">故障信息</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">故障类型:</div>
                    <div class="val">{{wordOrder.faultTypeStr}}</div>
                </div>
                
                <div class="item-group flex-row">
                    <div class="name">故障描述:</div>
                    <div class="val w450">{{wordOrder.faultDescStr}}</div>
                </div>
                <div class="item-group flex-row">
                    <div class="name">维修类型:</div>
                    <div class="val">{{wordOrder.maintenanceTypeStr}}</div>
                </div>
                <div class="item-group" v-if="faultImg.length">
                    <div class="name">故障图片:</div>
                    <!-- wordOrder.faultImg -->
                    <div class="flex-row imgwarp">
                        <img v-for="imgName in faultImg" :key="imgName" :src="imgUrl+imgName" class="img" />
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="deliver-info" v-if="wordOrder.maintenanceType == 1">
            <div class="samll-title fs-26-color-999">交付信息</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">联系方式:</div>
                    <div class="val fs34">{{wordOrder.link}}</div>
                </div>
                <div class="item-group flex-row">
                    <div class="name">上门日期:</div>
                    <div class="fs34">{{wordOrder.dateOfDelivery | dateFormat}}</div>
                </div>
            </div>
        </div>

        <div class="deliver-info" v-if="huizhi.length">
            <div class="samll-title fs-26-color-999">维修回执</div>
            <div class="fault-info-content flex-column">
               <img v-for="(item,index) in huizhi" :key='index' :src="item" alt="">
            </div>
        </div>

        <div class="bg-000">
            <div class="add fs-26-color-999">补充说明</div>
            <div class="fault-info-content flex-column" @click="showPopup">
                <div class="desc" v-for="(item,index) in descList" :key="item.id">{{index+1+'.' +' '+ item.orderDesc}}</div>
                <textarea class="textarea"  disabled='true' placeholder="待审批的报修申请可以添加补充说明"></textarea>
            </div>
            
        </div>

        <div class="submit" v-if="wordOrder.status == 3" @click="againApply">我要再次报修此设备</div>

        <van-popup v-model="show" position="bottom" 
            :style="{ height: '54%' }">
            <div class="popup-title-warp">
                <div class="popup-title">补充说明</div>
                <img class="close" @click="show = false" src="../assets/img/close.png" >
            </div>
            <div class="popup-content-warp">
                <textarea v-model="orderDesc" class="popup-content" placeholder="待审批的报修申请可以添加补充说明"></textarea>
            </div>
            <div class="submit" @click="addRemark">确认</div>
        </van-popup>
      </div>
  </div>
</template>

<script >
import Vue from 'vue';
import Title from "@/components/common/MyTitle";
import { Toast, Popup } from 'vant';
import { baseURL } from "@/baseUrl";
Vue.use(Toast);
Vue.use(Popup);

export default {
  name:'repairApplyDetail',
  components:{
      Title
  },
  mounted(){
      
      let id = this.$route.query.id;
      console.log(id)
      this.getData(id)
      this.getDescList(id)
  },
  data(){
    return {
        imgUrl:baseURL+'file/display/',
        title:'维修申请详情',
        show: false,
        orderDesc:'',
        equipmentInfo:{},
        wordOrder:{},
        faultImg:[],
        descList:[],
        huizhi:[] //回执img
    }
  },
  methods:{
      showPopup(){
          if(this.wordOrder.actResult == '3'){
              this.show = true;
          }
          
      },
      addRemark(){
          if(!this.orderDesc){
              Toast('请输入您要的补充说明!')
              return;
          }
          this.$http.post('wx/hospital/api/workOrderDescSave',{
              workOrderId:this.wordOrder.id,
              orderDesc:this.orderDesc
          }).then(res => {
              let {code, msg} = res.data;
              if(code != '0'){
                  Toast(msg)
                  return
              };
              this.show = false;
              this.orderDesc = '';
              this.getDescList(this.wordOrder.id)
          })
      },
      getData(busId){
          this.$http.post('/wx/engineer/api/maintenanceRequestInfo',{
              busId
          }).then(res => {
              let {code, msg, equipmentInfo, workOrderApplyInfo} = res.data;
              if(code != '0'){
                  Toast(msg)
                  return
              }
              this.equipmentInfo = equipmentInfo;
              this.wordOrder = workOrderApplyInfo;
              if(workOrderApplyInfo.faultImg){
                  this.faultImg = workOrderApplyInfo.faultImg.split(',');
              } 
              if(workOrderApplyInfo.certImg){
                  this.getHuiZhiImg(workOrderApplyInfo.certImg,workOrderApplyInfo.certImgAddr)
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
      againApply(){
          this.$store.commit('selectDevice',this.equipmentInfo);
          this.$router.push({
              name:'repairApply'
          })
      },
      getHuiZhiImg(certImg, certImgAddr){
        let certImgArr = certImg.split(','),
            certImgAddrArr = certImgAddr.split(','),
            imgUrl = baseURL+'file/displayMaintenance?'; 
            certImgArr.forEach((name,i) => {
                this.huizhi.push(imgUrl+'img='+ name+'&path='+certImgAddrArr[i])
            });
        console.log(this.huizhi)        
      }
  }
}
</script>
<style lang="scss" scoped>
.desc{
     color: #999;
    font-size: 28px;
    line-height: 37px;
    margin-bottom: 20px;
}
.textarea{
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    font-size: 28px;
    padding: 20px 0 0 20px;
    background: #f5f5f5;
    resize: none;
}
.add{
    margin: 20px 0 16px 24px;
}
.bg-000{
    background: #fff;
    margin-top: 40px;
    padding-bottom: 20px;
}
.fs34{
    font-size: 34px;
}
.w450{
    max-width: 450px;
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