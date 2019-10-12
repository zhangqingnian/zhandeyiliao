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
          <img class="state-img" :src="img()">
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
            <div class="name">故障描述:</div>
            <div class="val w450">{{info.faultDescStr}}</div>
          </div>
          <div class="item-group">
            <div class="name">故障图片:</div>
            <div class="flex-row imgwarp">
              <img class="img" v-for="imgName in faultImg" :key="imgName" :src="imgUrl+imgName" />
            </div>
          </div>
        </div>
      </div>

      <div class="deliver-info" v-if="info.quote == 'true'">
        <div class="samll-title fs-26-color-999">维修凭证</div>
        <div class="fault-info-content ">
            <van-button  :icon="imgUrl+ 'down.png'"  style="border:none;"
            @click="download(item)"
             v-for="item in downFileArr" :key="item.fileName">
                {{item.fileName}}</van-button>
        </div>
      </div>

      

      <div class="deliver-rating" v-if="info.evaluation == 'true'">
        <div class="samll-title fs-26-color-999">评分及评论</div>
        <div class="deliver-record-content flex-column">
            <van-rate v-model="star" readonly color="#FC6E31" void-color="#999999" void-icon="star"/>
            <div class="rating-content">
                {{info.scoreDesc}}
            </div>
        </div>
      </div>
      <div v-if="info.quote == 'true' && info.quoteAccept == 0">
        <div class="submit" @click="onConfrim(1)">接受维修</div>
        <div class="submit refuse" @click="onConfrim(2)">拒绝维修</div>
      </div>

      <div class="submit" v-if="info.status != '3' && info.quote == 'true' && info.quoteAccept != 0"   @click="onCheck">设备验收通过</div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import Vue from 'vue';
import $ from 'jquery';
import { baseURL } from "@/baseUrl";
import { Rate, Toast, Button, Icon  } from 'vant';
Vue.use(Rate).use(Button).use(Icon );
export default {
  data() {
    return {
      imgUrl:baseURL+'file/display/',
      star: 0,
      info:{},
      descList:[],
      faultImg:[],
    };
  },
  computed:{
      downFileArr(){
        let fileName =  this.info.certImg.split(','),
            filePath = this.info.certImgAddr.split(',');
        let arr = [];
        for(var i=0; i<fileName.length; i++){
            arr.push({
                fileName:fileName[i],
                path:filePath[i]
            })
        } 
        return arr  
      }
  },
  mounted() {
      let busId = this.$route.query.id;
      this.getOrderInfo(busId);
      this.getDescList(busId)
    
  },
  methods: {
    onConfrim(quoteAccept){
          let {id, defid, instanceId, taskId} = this.info;
          this.$http.post('wx/hospital/api/confirmMaintenance',{
              id,
              quoteAccept,
              defId:defid,
              instanceId,
              taskId,
              busId:id
          }).then(res => {
              let {code, msg} = res.data;
              Toast(msg)
              if(code == '0'){
                  this.getOrderInfo(id);
              }
          })
      },
    downFile(options){
        var config = $.extend(true, { method: 'post' }, options);
        var $iframe = $('<iframe id="down-file-iframe" />');
        var $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
        $form.attr('action', config.url);
        for (var key in config.data) {
            $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
        }
        $iframe.append($form);
        $(document.body).append($iframe);
        $form[0].submit();
        $iframe.remove();
        
    }, 
    download(item){
        let url = baseURL + 'file/downloadFile';
        this.downFile({
            url,
            data:item
        })
    },


    img(){
      if(this.info.status != 3 && this.info.quote == 'true' ){
        if(this.info.quoteAccept == 0){  //已报价
            return require('@/assets/img/state1.png')
        }
        if(this.info.quoteAccept == 1){  //待验收
            return require('@/assets/img/state2.png')
        }
        if(this.info.quoteAccept == 2){  //已拒绝
            return require('@/assets/img/state3.png')
        }
        
      }
      if(this.info.status == 3){
            return require('@/assets/img/state4.png')
      }
    },
    onCheck(){
      let {id, defid, instanceId, taskId} = this.info;
      this.$http.post('wx/hospital/api/endWorkOrder',{
        id,
        defId:defid,
        instanceId,
        taskId,
        busId:id
      }).then(res => {
        console.log(res.data)
        let {code, msg} = res.data;
        Toast(msg)
        if(code == '0'){
          this.$router.push({
            path:'/deviceCheck',
            query:{
              id
            }
          })
        }
      })

      
    },
    getOrderInfo(busId){
      this.$http.post('/wx/engineer/api/maintenanceRequestInfo',{
          busId
      }).then(res => {
          let {code, msg, equipmentInfo, workOrderApplyInfo} = res.data;
          if(code == '0'){
              this.info = workOrderApplyInfo;
              this.star = Number(workOrderApplyInfo.score) || 0
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
    
  },
  
};
</script>
<style  lang="scss" scoped>
.w450 {
  width: 450px;
  text-align: right;
}
.state-img {
  width: 150px;
  height: 70px;
}
.fs-26-color-999 {
  color: #999;
  font-size: 26px;
  line-height: 37px;
}
.samll-title {
  margin: 40px 0 16px 24px;
}
.device-info-content {
  background: #fff;
  box-sizing: border-box;
  padding: 24px 0 24px 24px;
  justify-content: space-between;
  align-items: center;
  .device-name {
    color: #000;
    font-size: 34px;
    line-height: 48px;
  }

  .right {
    width: 56px;
    height: 56px;
  }
}

.fault-info-content {
  background-color: #fff;
  padding: 0 24px;
  .item-group {
    justify-content: space-between;
    margin: 16px 0;
    color: #999;
    font-size: 28px;
    line-height: 37px;
    .imgwarp {
      flex-wrap: wrap;
    }
    .img {
      width: 210px;
      height: 210px;
      background: rebeccapurple;
      border-radius: 8px;
      margin: 18px 36px 18px 0;
      margin-right: 36px;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .money {
    padding: 16px 0;
    justify-content: space-between;
    border-top: 1px solid #d8d8d8;
    font-size: 34px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    line-height: 48px;
    .money-name {
      color: rgba(0, 0, 0, 1);
    }
    .money-val {
      color: rgba(228, 79, 71, 1);
    }
  }
}
.deliver-record-content {
  background: #fff;
  box-sizing: border-box;
  padding: 24px;
  font-size: 28px;
  line-height: 40px;
  color: #999999;
}

.rating-content{
  font-size: 28px;
  line-height: 40px;
  color: #999999;
}


.submit {
  width: 670px;
  height: 90px;
  background: rgba(26, 173, 25, 1);
  border-radius: 10px;
  border: 2px solid rgba(5, 5, 5, 0.08);
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
</style>