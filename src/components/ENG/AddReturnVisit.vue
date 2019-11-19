<template>
  <div class="content">
      <div class="item flex-row"  @click="selectDevice">
          <div class="left">医院名称:</div>
          <div class="flex-row right">
              <div>中山医院</div>
              <img class="right-r" src="../../assets/img/arrow.png">
          </div>
      </div>
      <div class="item flex-row"  @click="showTime = true">
          <div class="left">回访日期:</div>
          <div class="flex-row right">
              <div>{{selectDate}}</div>
              <img class="right-r" src="../../assets/img/arrow.png">
          </div>
      </div>
      <div class="item flex-row"  @click="selectDevice">
          <div class="left">所属设备:</div>
          <div class="flex-row right">
              <div>中山医院</div>
              <img class="right-r" src="../../assets/img/arrow.png">
          </div>
      </div>
      <div class="item">
        <textarea class="tex" placeholder="请输入回访内容"></textarea>
      </div>
      <div class="loginBtn">确认提交</div>

      
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
  </div>
</template>

<script>
import Moment from "moment";
import {Popup, DatetimePicker } from 'vant';
import HospitalList from './HospitalList'
import EngDeviceList from './EngDeviceList'
export default {
  components:{
    [DatetimePicker.name]:DatetimePicker,
    [Popup.name]:Popup
  },
  data(){
    return {
      showTime:false,
      currentDate: new Date()
    }
  },
  computed:{
    selectDate(){
        return Moment(this.currentDate).format("YYYY-MM-DD HH:mm")
    },
  },
  methods:{
    selectDevice(){

    }
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
}
.right-r {
  width: 16px;
  height: 26px;
  margin-left: 30px;
}
.right{
  align-items: center;
  font-size: 28px;
}
.tex{
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  padding: 15px;
  resize: none;
}
.loginBtn{
 margin: 0 auto;
}
</style>