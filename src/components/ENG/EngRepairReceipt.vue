<template>
  <div class="wrapper">
    <Title :title="title" />
    <div class="content flex-column">
        <div class="device-info">
            <div class="samll-title fs-26-color-999">维修商</div>
            <div class="device-info-content flex-row">
                <div class="left flex-column">
                    <div class="device-name">北京佳士康科技有限公司</div>
                    <div class="device-type fs-26-color-999">联系方式：010-98720138</div>
                </div>
                <img class="right" @click="onDeviceDetail" src="../../assets/img/state2.png" >
            </div>
        </div>

        <div class="fault-info">
            <div class="samll-title fs-26-color-999">维修信息填写</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">维修人员:</div>
                    <input type="text" placeholder="维修人姓名">
                </div>
                <div class="item-group flex-row">
                    <div class="name">联系方式:</div>
                    <input type="text" placeholder="请输入手机号码">
                </div>
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
                    <div class="name">故障判断:</div>
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
                <div class="item-group flex-row">
                    <div class="name">维修费用:</div>
                    <div class="warp">
                        <input type="text" placeholder="请输入维修费用">
                        <div class="unit">元</div>
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="deliver-info">
            <div class="samll-title fs-26-color-999">维修记录</div>
            <div class="fault-info-content flex-column">
                <div class="item-group fs-26-color-999 fz28"> 
                    <div>1、电子屏幕拆机维修。 更换电路板，配件型号JN3734-93；更换液晶屏幕，配件型号632832-WE。</div>
                    <div>2、拆机清洁保养，耗材清机油30克。</div>
                </div>
            </div>
        </div>
        <div>
            <div class="submit">提交</div>
            <div class="submit refuse">保存</div>
        </div>
        
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import Vue from 'vue';
import { Uploader } from 'vant';

Vue.use(Uploader);
export default {
  name:'engRepairReceipt',  
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
.fz28{
    font-size: 28px;
}
.samll-title{
    margin: 40px 0 16px 24px;
}

.device-info-content{
    background: #fff;
    box-sizing: border-box;
    padding: 24px 0 24px 24px;
    justify-content: space-between;
    align-items: center;
    .device-name{
        color: #000;
        font-size: 34px;
        line-height: 48px;
    }

    .right{
        width: 150px;
        height: 70px;
    }
}

    


.fault-info-content{
    background-color: #fff;
    padding: 0 24px;
    .item-group{
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        .warp{
            position: relative;
            color: #E44F47;
            font-size: 34px;
            font-weight:500;
            line-height: 48px;
            input{
                padding-right: 80px;
            }
        }
        .unit{
            position: absolute;
            top: 20px;
            right: 30px;
        }
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

.refuse {
  color: #000;
  background: rgba(248, 248, 248, 1);
  border: 2px solid rgba(5, 5, 5, 0.1);
}
.van-uploader__preview-image{
    width: 210px;
    height: 210px;
}
.van-uploader__upload{
    margin: 18px 36px 18px 0;
    width: 210px;
    height: 210px;
}
.van-uploader__preview{
    margin: 18px 36px 18px 0;
}
.van-uploader__preview-delete{
    font-size: 30px;
}
.van-uploader__wrapper > div:nth-child(3n){
    margin-right: 0;
}
</style>