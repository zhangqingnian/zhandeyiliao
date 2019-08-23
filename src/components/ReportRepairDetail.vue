<template>
  <div class="wrapper">
    <Title :title="title"/>
    <div class="content">
      <div class="detail">
        <div class="top flex-row">
          <div class="left flex-column">
            <div class="device-name">眼底照相造影机（成人用）</div>
            <div class="device-type fs-26-color-999">设备型号：JN103450-2S</div>
            <div class="device-number fs-26-color-999">设备编号：HUUHSBWGXY-7667</div>
          </div>
          <img class="right" src="../assets/img/see_details.png">
        </div>
      </div>
      <van-steps :active="active" active-color="#57AAF0" direction="vertical">
        <van-step>
          <div class="bottom flex-row" @click="onDetail">
            <div class="b-left flex-column">
              <div class="device-name">维修申请</div>
              <div class="fs-26-color-999">SH3280-210032</div>
            </div>
            <div class="b-right flex-row">
              <div class="b-right-left flex-column">
                <div class="device-name examine">待审批</div>
                <div class="fs-26-color-999">2019-07-12</div>
              </div>
              <img src="../assets/img/arrow.png" class="b-right-right">
            </div>
          </div>
        </van-step>
        <van-step>
          <div class="bottom flex-row" @click="onDetail">
            <div class="b-left flex-column">
              <div class="device-name">寄送维修</div>
              <div class="fs-26-color-999">010-51021234</div>
            </div>
            <div class="b-right flex-row">
              <div class="b-right-left flex-column">
                <div class="device-name state">已报价</div>
                <div class="fs-26-color-999">北京佳士康科技有限公司</div>
              </div>
              <img src="../assets/img/arrow.png" class="b-right-right">
            </div>
          </div>
        </van-step>
        <van-step>
          <div class="bottom flex-row" @click="onDetail">
            <div class="b-left flex-column">
              <div class="device-name">物流运输</div>
              <div class="fs-26-color-999">310987372927</div>
            </div>
            <div class="b-right flex-row">
              <div class="b-right-left flex-column">
                <div class="device-name state">运输中</div>
                <div class="fs-26-color-999">顺丰快递</div>
              </div>
              <img src="../assets/img/arrow.png" class="b-right-right">
            </div>
          </div>
        </van-step>
        <van-step>
          <div class="bottom flex-row" @click="onDetail">
            <div class="b-left flex-column">
              <div class="device-name">物流运输</div>
              <div class="fs-26-color-999">310987372927</div>
            </div>
            <div class="b-right flex-row">
              <div class="b-right-left flex-column">
                <div class="device-name state">已签收</div>
                <div class="fs-26-color-999">顺丰快递</div>
              </div>
              <img src="../assets/img/arrow.png" class="b-right-right">
            </div>
          </div>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import Vue from "vue";
import { Step, Steps } from "vant";

Vue.use(Step).use(Steps);
export default {
  name: "repairDetail",
  components: {
    Title
  },
  props: {},
  data() {
    return {
      title: "报修详情",
      active: 0
    };
  },
  computed: {},
  methods: {
    onDetail() {
      this.$router.push({ name: "repairApplyDetail" });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang='scss' scoped>
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
}

.detail {
  margin-top: 24px;
  background: #fff;
  box-sizing: border-box;
  padding: 0 24px;

  .top {
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 24px 0;
    border-bottom: 1px solid rgba(151, 151, 151, 1);

    .right {
      width: 56px;
      height: 56px;
    }
  }

  
}
.bottom {
    // padding: 24px 0;
     background: #fff;
    font-size: 28px;
    color: #999;
    justify-content: space-between;
    align-items: center;
    .b-right {
      align-items: center;
    }
    .b-right-left {
      align-items: flex-end;
    }
    .b-right-right {
      width: 16px;
      height: 26px;
      margin-left: 16px;
    }
  }
.examine{
  color: #ff8551;
}
.state {
  
  color: #57AAF0;
}
</style>