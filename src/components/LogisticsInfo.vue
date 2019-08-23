<template>
  <div class="wrapper">
    <Title :title="title"/>
    <div class="content">
      <div class="header flex-row">
        <div class="left flex-column">
          <div class="device-name">顺丰快递</div>
          <div class="device-type fs-26-color-999">快递单号：310987367219</div>
        </div>
        <img class="right" src="../assets/img/state4.png">
      </div>
      <div class="mian">
        <div class="top">
          <div class="address">
            <div class="r">
              <div class="device-name">上海市第二人民医院设备科</div>
              <div class="fs-26-color-999">上海市黄浦区多稼路1号</div>
            </div>
            <img class="address-img" src="../assets/img/address_send.png" alt>
            <div class="address-line"></div>
          </div>
          <div class="address">
            <div class="r">
              <div class="device-name">北京佳士康科技有限公司</div>
              <div class="fs-26-color-999">北京市丰台区黄土岗555号京北工业园区3-2</div>
            </div>
            <img class="address-img" src="../assets/img/address_accept.png" alt>
          </div>
        </div>
      </div>
      <div class="logistics">
          <van-steps direction="vertical" active-color="#57AAF0" :active="0">
            <van-step>
              <h3 class="device-name color-666">已签收 签收人：门卫 业务员：18701927821</h3>
              <p class="fs-26-color-999">2016-07-12 12:40</p>
            </van-step>
            <van-step>
              <h3 class="device-name color-666">派件中 业务员：18701927821</h3>
              <p class="fs-26-color-999">2016-07-12 12:40</p>
            </van-step>
            <van-step>
              <h3 class="device-name color-666">快件到达-北京丰台第四营业点</h3>
              <p class="fs-26-color-999">2016-07-12 12:40</p>
            </van-step>
            <van-step>
              <h3 class="device-name color-666">快件到达-北京丰台集散中心</h3>
              <p class="fs-26-color-999">2016-07-12 12:40</p>
            </van-step>
            <van-step>
              <h3 class="device-name color-666">快件到达-北京集散地</h3>
              <p class="fs-26-color-999">2016-07-12 12:40</p>
            </van-step>
          </van-steps>
        </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import Vue from "vue";
import { Step, Steps } from "vant";
Vue.use(Step).use(Steps);
export default {
  name: "logisticsInfo",
  components: {
    Title
  },
  props: {},
  data() {
    return {
      title: "物流详情"
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
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