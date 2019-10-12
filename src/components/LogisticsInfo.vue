<template>
  <div class="wrapper">
    <!-- <Title :title="title"/> -->
    <div class="content">
      <div class="header flex-row">
        <div class="left flex-column">
          <div class="device-name">顺丰快递</div>
          <div class="device-type fs-26-color-999">快递单号：{{workOrderExpress.mailno}}</div>
        </div>
        <!-- <img class="right" src="../assets/img/state4.png"> -->
      </div>
      <div class="mian">
        <div class="top">
          <div class="address">
            <div class="r">
              <div class="device-name">{{workOrderExpress.jCompany }}</div>
              <div class="fs-26-color-999">{{workOrderExpress.jProvince + workOrderExpress.jCity + workOrderExpress.jCounty + workOrderExpress.jAddress }}</div>
            </div>
            <img class="address-img" src="../assets/img/address_send.png" alt>
            <div class="address-line"></div>
          </div>
          <div class="address">
            <div class="r">
              <div class="device-name">{{workOrderExpress.dCompany }}</div>
              <div class="fs-26-color-999">{{workOrderExpress.dProvince + workOrderExpress.dCity + workOrderExpress.dCounty + workOrderExpress.dAddress }}</div>
            </div>
            <img class="address-img" src="../assets/img/address_accept.png" alt>
          </div>
        </div>
      </div>
      <div class="logistics">
          <van-steps direction="vertical" active-color="#57AAF0" :active="expressInfo.length - 1">
            <van-step v-for="(item, index) in expressInfo" :key="index">
              <h3 class="device-name color-666">{{item.context}}</h3>
              <p class="fs-26-color-999">{{item.time}}</p>
            </van-step>
          </van-steps>  
        </div>
    </div>
  </div>
</template>

<script>
//import Title from "@/components/common/MyTitle";
import Vue from "vue";
import { Step, Steps } from "vant";
Vue.use(Step).use(Steps);
export default {
  data() {
    return {
      expressInfo:[],
      workOrderExpress:JSON.parse(this.$route.query.workOrderExpress)
    };
  },
  mounted() {
    this.getExpressInfo()
  },
  methods: {
    getExpressInfo(){
      this.$http.post('wx/hospital/api/myWorkOrderExpressStatus',{
        page:1,
        limit:20,
        workOrderId:this.$route.query.id,
        sidx:'',
        order:''
      }).then(res => {
        let {code, msg, result} = res.data;
        if(code == '0'){
          this.expressInfo = result.data;
        }
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.fs-26-color-999 {
  color: #999;
  font-size: 26px;
  line-height: 37px;
}
.content {
  display: flex;
  flex-direction: column;
}

.device-name {
  color: #000;
  font-size: 34px;
  line-height: 48px;
  font-weight: 400;
}

.color-666 {
  color: #666;
}

.header {
  margin: 24px 0;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 24px 0 24px 24px;

  .right {
    width: 150px;
    height: 70px;
  }
}
.mian {
  background: #fff;
  box-sizing: border-box;
  width: 100%;
  padding: 0 24px;
  .top {
    width: 100%;
    box-sizing: border-box;
    padding: 24px 0;
    border-bottom: 1px solid #d8d8d8;
    .address {
      position: relative;
      padding-left: 50px;
      .r {
        padding-bottom: 40px;
      }
      &:last-child {
        .r {
          padding-bottom: 0;
        }
      }
    }
    .address-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 38px;
      height: 48px;
    }
    .address-line {
      position: absolute;
      left: 19px;
      top: 0;
      width: 1px;
      height: 100%;
      border-left: 1px dashed #57aaf0;
    }
  }
}
</style>