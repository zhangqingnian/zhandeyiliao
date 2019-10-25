<template>
  <div class="wrapper">
    <!-- <Title :title="title" /> -->
    <div class="content flex-column">
        <div class="device-info">
            <div class="samll-title fs-26-color-999">设备信息</div>
            <div class="device-info-content flex-row" style="margin-bottom:15px;" @click="selectDevice">
                <div class="fz34">选择设备:</div>
                <img class="right-r" src="../assets/img/arrow.png">
            </div>
            <div v-if="repairDevice.id" class="device-info-content flex-row">
                <div class="left flex-column">
                    <div class="device-name">{{repairDevice.name}}</div>
                    <div class="device-type fs-26-color-999">设备型号：{{repairDevice.brandModel}}</div>
                    <div class="device-number fs-26-color-999">设备编号：{{repairDevice.commodityNumber}}</div>
                </div>
                <img class="right" @click="onDeviceDetail" src="../assets/img/see_details.png" >
            </div>
            
        </div>

        <div class="fault-info">
            <div class="samll-title fs-26-color-999">故障信息</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">故障类型:</div>
                    <select v-model="faultType" @change="selectFaultType($event)">
                        <option v-for="item in faultTypeList" :value ="item.value"
                            :key="item.id">{{item.name}}</option>
                    </select>
                </div>
                <div class="item-group flex-row">
                    <div class="name">故障描述:</div>
                    <select  v-model='faultDesc' @change="selectFaultDesc($event)">
                        <option v-for="item in faultDescList" :value ="item.value"
                             :key="item.id">{{item.name}}</option>
                    </select>
                </div>
                <div v-if="showReason" class="item-group">
                    <div class="name">故障描述:</div>
                    <textarea v-model="reason" class="textarea"></textarea>
                </div>
                
                <div class="item-group flex-row">
                    <div class="name">维修类型:</div>
                    <select v-model="maintenanceType">
                        <option v-for="item in maintenanceTypeList" :value ="item.value"
                            :key="item.id">{{item.name}}</option>
                    </select>
                </div>
                <div class="item-group">
                    <div class="name">故障图片:</div>
                    <div class="upload flex-row">
                        <div v-for="(imgName,index) in faultImg" :key="index" class="uploadimgwarp">
                            <img v-preview="imgUrl+imgName" :src="imgUrl+imgName" class="uploadimg">
                            <van-icon name="delete" @click="delImg(imgName,index)" class="delte"/>
                        </div>
                        <van-uploader 
                            :after-read="uploader"
                              />
                    </div>
                    
                    
                </div>
            </div>
        </div>

        <div class="deliver-info">
            <div class="samll-title fs-26-color-999">交付信息</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">联系方式:</div>
                    <input type="text" v-model="linkMobile" placeholder="请输入手机号码" maxlength="11">
                </div>
                <div class="item-group flex-row">
                    <div class="name">期望上门日期:</div>
                    <input type="text" readonly v-model="selectDate" @focus="show = true" placeholder="请选择期望上门日期">
                </div>
                
            </div>
        </div>
        <van-popup
            v-model="show"
            position="bottom">
                <van-datetime-picker
                    v-model="dateOfDeliveryStr"
                    :min-date="minDate"
                    type="date"
                    title='选择期望上门时间'
                    @cancel="show = false"
                    @confirm="show = false"
                    />
            </van-popup>
        
        <div class="submit" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import Vue from 'vue';
import { Uploader, Toast, DatetimePicker, Popup, Icon} from 'vant';
import { mapGetters } from 'vuex'
import Moment from "moment";
import { baseURL } from "@/baseUrl";
Vue.use(Uploader).use(DatetimePicker).use(Popup).use(Icon);
export default {
  name:'repairApply',  
  components:{
    Title
  },
//   beforeRouteEnter(to , from, next){
//     console.log(to,from)
//     next(vm => {

//     })
//   },
  mounted(){
    this.getType('equipment_failur')
    this.getType('maintenance_type');
  },
  data(){
    return {
        reason:'',   //其它描述
        showReason:false, //显示其它描述
        imgUrl:baseURL+'file/display/',
        device:{},
        title:'维修申请',
        faultTypeList:[],           //故障类型列表
        faultType:'',               //故障类型
        faultDesc:'',               //故障描述
        faultDescList:[],           //故障描述列表
        maintenanceTypeList:[],     //维修类型列表
        maintenanceType:'',         //维修类型
        linkMobile:'',              //联系方式
        dateOfDeliveryStr:new Date(),
        minDate:new Date(),
        show:false,                 //显示/隐藏日期组件
        faultImg:[],                //故障图片
        
    }
  },
  computed:{
      ...mapGetters(['repairDevice']),
      selectDate(){
          return Moment(this.dateOfDeliveryStr).format("YYYY-MM-DD")
      },
     
  },
  
  methods:{
      //选择报修的设备
      selectDevice(){
          this.$router.push({name:'deviceList'})
      },
      onDeviceDetail(){
        this.$router.push({
            path:'/deviceDetail',
            query:{
                id:this.repairDevice.id
            }
        })
        //console.log('查看设备详情')
      },
      //选择故障类型
      selectFaultType(e){
          let obj = this.faultTypeList[e.target.selectedIndex];
          this.getType(obj.mark)
          
      },
      selectFaultDesc(e){
          let obj = this.faultDescList[e.target.selectedIndex];
          console.log(obj)
          if( obj.mark == 'equipment_failur_1_4' || 
              obj.mark == 'equipment_failur_2_9' || 
              obj.mark == 'equipment_failur_3_4' || 
              obj.mark == 'equipment_failur_4_1' ){
              this.showReason = true
          }else{
              this.showReason = false
          }
      },
      uploader(file){
          let fd = new FormData()
          fd.append("files", file.file)
          this.$http.post('file/upload',fd,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
          }).then(res => {
              let {code, msg} = res.data;
              if(code!= '0'){
                  Toast(msg)
                  return
              }
              this.faultImg.push(msg);
          })
      },
      delImg(img,index){
        this.faultImg.splice(index,1)
          this.$http.post('file/deleteImage',{
              img
          }).then(res => {
              let {code, msg} = res.data;
              if(code== '0'){
                  Toast(msg);
              }
          })
      },
      submit(){
          if(!this.repairDevice.id){
              Toast('请选择报修设备!')
              return
          }

          if(!this.faultType){
              Toast('请选择故障类型!')
              return
          }
          if(this.showReason){
              if(!this.reason){
                    Toast('请输入故障类型!')
                    return
                }
           } 

          if(!this.maintenanceType){
              Toast('请选择维修类型!')
              return
          }

        //  if(!this.faultImg.length){
        //       Toast('请上传故障图片!')
        //       return
        //   }
          
          if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.linkMobile))){
                Toast('请输入合法的联系方式');
                return
          }
           this.$http.post('wx/hospital/api/saveWorkOrderForApp',{
               depId:this.repairDevice.id,
               linkMobile:this.linkMobile,
               dateOfDeliveryStr:this.dateOfDeliveryStr,
               maintenanceType:this.maintenanceType,
               faultType:this.faultType,
               faultImg:this.faultImg.join(),
               faultDesc:this.faultDesc,
               reason:this.reason
           }).then(res =>{
               let {code, msg, workOrder} = res.data;
               Toast(msg)
               if(code == '0'){
                   this.$router.push({
                       path:'/ReportRepairDetail',
                       query:{
                           workOrder:JSON.stringify(workOrder)
                        }
                   })
               }
           }) 
     

      },
      //查询 故障-维修-描述 类型
     getType(mark){
          //故障类型 ：equipment_failur
          //维修类型 ：maintenance_type
          //故障描述 ：取故障类型返回后的mark值
          this.$http.post('/wx/engineer/api/getNextCodesForApp',{
              mark
          }).then(res => {
              let {code, msg , codeEntities} = res.data;
              if(code != '0'){
                  Toast(msg)
                  return
              }
              if(mark == 'equipment_failur'){
                  this.faultTypeList = codeEntities;
                  this.faultType = this.faultTypeList[0].value
                  this.getType(this.faultTypeList[0].mark);
              }else if(mark == 'maintenance_type'){
                  this.maintenanceTypeList = codeEntities;
                  this.maintenanceType = this.maintenanceTypeList[0].value
              }else if(mark.indexOf('equipment_failur_') != -1){
                  this.faultDescList = codeEntities
                  this.faultDesc = this.faultDescList[0].value
              }
              
          })
      }
  }
}
</script>
<style lang="scss" scoped>
.textarea{
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #979797;
    box-sizing: border-box;
    resize: none;
}


.upload{
    flex-wrap: wrap;
    padding-top: 15px;
}
.uploadimgwarp{
    position: relative;
    width: 210px;
    height: 210px;
    margin: 0px 36px 10px 0;
    &:nth-child(3n) {
        margin-right: 0;
    }
}
.uploadimg{
    width: 210px;
    height: 210px;
}
.delte{
    position: absolute;
    right: 0;bottom: 0;
    padding: 1px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.45);
    font-size: 32px;
}
.fz34{
    font-size: 34px;
}
.right-r {
  width: 16px;
  height: 26px;
  margin-left: 30px;
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
        align-items: center;
        margin: 20px 0;
    }
    .name{
        color: #000;
        font-size: 34px;

    }
    select, input{
        font-size: 34px;
        width: 500px;
        height: 88px;
        background:rgba(245,245,245,1);
        border-radius:8px;
        border:1px solid rgba(151,151,151,1);
        box-sizing: border-box;
        padding-left: 20px;
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



</style>