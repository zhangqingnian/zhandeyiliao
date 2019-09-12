<template>
  <div class="wrapper">
      <Title :title="title"/>
      <div class="content flex-column">
        <div class="device-info">
            <div class="samll-title fs-26-color-999">设备信息</div>
            <div class="device-info-content flex-row">
                <div class="left flex-column">
                    <div class="device-name">眼底照相造影机（成人用）</div>
                    <div class="device-type fs-26-color-999">设备型号：JN103450-2S</div>
                    <div class="device-number fs-26-color-999">设备编号：HUUHSBWGXY-7667</div>
                </div>
            </div>
        </div>

        <div class="fault-info">
            <div class="samll-title fs-26-color-999">故障信息</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">故障类型:</div>
                    <div class="val">软件故障</div>
                </div>
                <div class="item-group flex-row">
                    <div class="name">维修类型:</div>
                    <div class="val">上门维修</div>
                </div>
                <div class="item-group flex-row">
                    <div class="name">故障描述:</div>
                    <div class="val w450">设备进水，电子屏幕无法成像，外壳完好无损</div>
                </div>
                <div class="item-group flex-row">
                    <div class="name">保修期情况:</div>
                    <div class="val">在保修期内</div>
                </div>
                
                <div class="item-group">
                    <div class="name">故障图片:</div>
                    <div class="flex-row imgwarp">
                        <img class="img" src="../../assets/img/test.png"/>
                        <img class="img" />
                        <img class="img" />
                        <img class="img" />
                        <img class="img" />
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="deliver-info">
            <div class="samll-title fs-26-color-999">交付信息</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">联系方式:</div>
                    <div class="val fs34">18888888888</div>
                </div>
                <div class="item-group flex-row">
                    <div class="name">交付日期:</div>
                    <div class="fs34">2019-08-10</div>
                </div>
            </div>
        </div>

        <div class="deliver-info">
            <div class="samll-title fs-26-color-999">补充说明</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    屏幕未有破损迹象
                </div>
            </div>
        </div>
        
        <div class="submit" >维修回执</div>
        <!-- <div>          
            <div class="submit" >接单</div>
            <div class="submit refuse" @click="showPopup">拒绝</div>
        </div> -->

        <van-popup v-model="show" position="bottom" 
            :style="{ height: '65%' }">
            <div class="popup-title-warp">
                <div class="popup-title">拒绝原因</div>
                <img class="close" @click="clsoePopup" src="../../assets/img/close.png" >
            </div>
            <div class="popup-content-warp">
                <textarea v-model="popupContent" class="popup-content" placeholder="说明拒绝原因"></textarea>
            </div>
            <div>
                <div class="submit" @click="addRemark">确认</div>
                <div class="submit refuse" >取消</div>
            </div>
            
        </van-popup>
      </div>
  </div>
</template>

<script >
import Vue from 'vue';
import Title from "@/components/common/MyTitle";
import { Toast, Popup } from 'vant';
Vue.use(Toast);
Vue.use(Popup);

export default {
  name:'engRepairApplyDetail',
  components:{
      Title
  },
  props:{},
  data(){
    return {
        title:'维修申请详情',
        show: false,
        popupContent:''
    }
  },
  methods:{
      showPopup(){
          this.show = true;
      },
      clsoePopup(){
          this.show = false;
      },
      addRemark(){
          if(!this.popupContent){
              Toast('请说明您要拒绝的原因!')
              return;
          }
          this.clsoePopup()
      }
  }
}
</script>
<style lang="scss" scoped>



.fs34{
    font-size: 34px;
}
.w450{
    width: 450px;
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