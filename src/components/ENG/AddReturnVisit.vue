<template>
  <div class="content">
      <div>
          <div class="item flex-row"  @click="showHospital = true">
              <div class="left">医院名称:</div>
              <div class="flex-row right">
                  
                  <img class="right-r" src="../../assets/img/arrow.png">
                  <div>{{hospitalName}}</div>
              </div>
          </div>
          <div class="item flex-row"  @click="showTime = true">
              <div class="left">回访日期:</div>
              <div class="flex-row right">
                  <img class="right-r" src="../../assets/img/arrow.png">
                  <div>{{selectDate}}</div>
                  
              </div>
          </div>
          <div class="item flex-row"  @click="selectDevice">
              <div class="left">所属设备:</div>
              <div class="flex-row right">
                  <img class="right-r" src="../../assets/img/arrow.png">
                  <div>{{deviceArrName}}</div>
                  
              </div>
          </div>
          <div class="loginBtn" @click="submit">确认提交</div>
      </div>
      
      <van-popup
        v-model="showTime"
        position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            title="请选择回访时间"
            type="datetime"
            @confirm="showTime = false"
            @cancel='showTime = false'
            :min-date="new Date()"/>
      </van-popup>
      <van-popup v-model="showHospital" 
      position="bottom">
          <HospitalList  
          @select = "onSelectHispital"
          @closehostpital="showHospital = false" />
      </van-popup>
      <van-popup v-model="showDevice" 
      position="bottom">
          <EngDeviceList
          :organId="hospitalId"  
          :testList="testList"
          
          @device = "onSelectDevice"
          @colsedevice="showDevice = false" />
      </van-popup>
  </div>
</template>

<script>
import Moment from "moment";
import {Popup, DatetimePicker, Toast } from 'vant';
import HospitalList from './HospitalList'
import EngDeviceList from './EngDeviceList'
export default {
  components:{
    [DatetimePicker.name]:DatetimePicker,
    [Popup.name]:Popup,
    HospitalList,
    EngDeviceList
  },
  data(){
    return {

      hospitalName:'',
      hospitalId:'',
      flag:1,  //回放textarea的显示  当直接提交时不显示  当从记录进入时 显示0 1
      showDevice:false,
      showHospital:false,
      showTime:false,
      deviceArrName:'',
      deviceArrId:'',
      currentDate: new Date(),
      visitContent:'', //回访内容
      testList:[] //
    }
  },
  watch:{
    'hospitalName':function () {
      this.deviceArrName = '';  
      this.deviceArrId ='';
    },
    
  },
  computed:{
    selectDate(){
        return Moment(this.currentDate).format("YYYY-MM-DD HH:mm")
    },
  },
  methods:{
    selectDevice(){
      if(!this.hospitalId){
        Toast('请先选择医院!')
        return;
      }
      this.showDevice = true
    },
    submit(){
      let {currentDate, deviceArrId, hospitalId} = this;
      let reTimes = Moment(currentDate).format("YYYY-MM-DD HH:mm:ss")
      if(!hospitalId){
        Toast('请选择医院!')
        return
      }
      if(!deviceArrId){
        Toast('请选择设备!')
        return
      }

      this.$http.post('/wx/engineer/api/revisitSave',{
        organId:hospitalId,
        reTimes,
        depIds:deviceArrId,
        visitContent:this.visitContent,
        flag:this.flag
      }).then(res => {
        let {msg, code} = res.data;
        Toast(msg)
        if(code == '0'){
          this.$router.push({
            path:'/visitList'
          })
        }
      })
    },
    //选择医院
    onSelectHispital(obj){
      console.log(obj)
      let {id, name,} = obj;
      this.hospitalId = id;
      this.hospitalName = name;
      this.showHospital = false;
    },
    //选择设备
    onSelectDevice(arr){
      let nameArr = [], idArr = [];
      arr.forEach(item => {
         nameArr.push(item.name);
         idArr.push(item.id)
      });
      this.deviceArrName = nameArr.join(',');
      this.deviceArrId = idArr.join('_');
      this.showDevice = false;
      console.log(this.deviceArrName)
      console.log(this.deviceArrId)
    },
  },
}
</script>
<style lang="scss" scoped>

.item{
    background: #fff;
    box-sizing: border-box;
    padding: 24px;
    justify-content: space-between;
    align-items: center;
    margin-bottom:30px;
}
.left{
    font-size: 32px;
    flex-basis: 160px;
}
.right-r {
  width: 16px;
  height: 26px;
  margin-left: 30px;
}
.right{
  align-items: center;
  font-size: 28px;
  flex: 1;
  flex-direction: row-reverse;
}

.tex{
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  padding: 15px;
  resize: none;
  border: 1px solid #999;
}
.loginBtn{
 margin: 120px auto 0;
}
</style>