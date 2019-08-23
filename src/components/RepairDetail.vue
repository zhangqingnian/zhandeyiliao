<template>
  <div class="wrapper">
    <Title :title="title"/>
    <div class="content flex-column">
      <div class="device-info">
        <div class="samll-title fs-26-color-999">设备信息</div>
        <div class="device-info-content flex-row">
          <div class="left flex-column">
            <div class="device-name">北京佳士康科技有限公司</div>
            <div class="device-type fs-26-color-999">联系方式：010-67891829</div>
          </div>
          <img class="state-img" src="../assets/img/state1.png">
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
            <div class="name">故障描述:</div>
            <div class="val w450">设备进水，电子屏幕无法成像，外壳完好无损</div>
          </div>
          <div class="item-group">
            <div class="name">故障图片:</div>
            <div class="flex-row imgwarp">
              <img class="img" src="../assets/img/test.png">
              <img class="img">
              <img class="img">
              <img class="img">
              <img class="img">
            </div>
          </div>
        </div>
      </div>

      <div class="deliver-info">
        <div class="samll-title fs-26-color-999">维修信息</div>
        <div class="fault-info-content flex-column">
          <div class="item-group flex-row">
            <div class="name">维修人员:</div>
            <div class="val fs34">张某某</div>
          </div>
          <div class="item-group flex-row">
            <div class="name">联系方式:</div>
            <div class="fs34">13689021843</div>
          </div>
          <div class="flex-row money">
            <div class="money-name">维修费用:</div>
            <div class="money-val">1,238.00元</div>
          </div>
        </div>
      </div>

      <div class="deliver-record">
        <div class="samll-title fs-26-color-999">维修记录</div>
        <ul class="deliver-record-content">
          <li>1、电子屏幕拆机维修。 更换电路板，配件型号JN3734-93；更换液晶屏幕，配件型号632832-WE。</li>
          <li>2、拆机清洁保养，耗材清机油30克。</li>
        </ul>
      </div>

      <div class="deliver-rating">
        <div class="samll-title fs-26-color-999">评分及评论</div>
        <div class="deliver-record-content flex-column">
            <van-rate v-model="star" readonly color="#FC6E31" void-color="#999999" void-icon="star"/>
            <div class="rating-content">
                设备运行正常，外观复原！
            </div>
        </div>
      </div>

      <div class="submit">关闭订单</div>
      <div>
        <div class="submit">接受报价</div>
        <div class="submit refuse">拒绝</div>
      </div>
      <div class="submit">设备验收通过</div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import Vue from 'vue';
import { Rate } from 'vant';
Vue.use(Rate);
export default {
  name: "repairDetail",
  components: {
    Title
  },
  props: {},
  data() {
    return {
      title: "维修详情",
      star: 3
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style  lang="scss" scoped>
.w450 {
  width: 450px;
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