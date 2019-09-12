<template>
  <div class="wrapper">
    <Title :title="title" />
    <div class="content flex-column">
        <div class="device-info">
            <div class="samll-title fs-26-color-999">设备信息</div>
            <div class="device-info-content flex-row">
                <div class="left flex-column">
                    <div class="device-name">眼底照相造影机（成人用）</div>
                    <div class="device-type fs-26-color-999">设备型号：JN103450-2S</div>
                    <div class="device-number fs-26-color-999">设备编号：HUUHSBWGXY-7667</div>
                </div>
                <img class="right" @click="onDeviceDetail" src="../assets/img/see_details.png" >
            </div>
        </div>

        <div class="fault-info">
            <div class="samll-title fs-26-color-999">故障信息</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">故障类型:</div>
                    <select>
                        <option value ="volvo">Volvo</option>
                        <option value ="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div class="item-group flex-row">
                    <div class="name">维修类型:</div>
                    <select>
                        <option value ="volvo">Volvo</option>
                        <option value ="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div class="item-group flex-row">
                    <div class="name">故障描述:</div>
                    <select>
                        <option value ="volvo">Volvo</option>
                        <option value ="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div class="item-group flex-row">
                    <div class="name">保修期情况:</div>
                    <select>
                        <option value ="volvo">Volvo</option>
                        <option value ="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div class="item-group">
                    <div class="name">故障图片:</div>
                    <van-uploader 
                        v-model="fileList"
                        multiple  />
                    
                </div>
            </div>
        </div>

        <div class="deliver-info">
            <div class="samll-title fs-26-color-999">交付信息</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">联系方式:</div>
                    <input type="text" placeholder="请输入手机号码">
                </div>
                <div class="item-group flex-row">
                    <div class="name">期望上门日期:</div>
                    <select>
                        <option value ="volvo">Volvo</option>
                        <option value ="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="submit">提交</div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import Vue from 'vue';
import { Uploader } from 'vant';

Vue.use(Uploader);
export default {
  name:'repairApply',  
  components:{
    Title
  },
  props:{
    
  },
  data(){
    return {
        title:'维修申请',
        fileList: [], //图片上传
    }
  },
  methods:{
      onDeviceDetail(){
        this.$router.push({name:'deviceDetail'})
        console.log('查看设备详情')
      }
  }
}
</script>
<style lang="scss" scoped>


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