<template>
  <div class="wrapper">
    <Title :title="title"/>
    <div class="content flex-column">
      <div class="rating-warp flex-column">
       <van-rate v-model="star"  color="#FC6E31" void-color="#999999" void-icon="star"/>
       <div class="text">觉得怎么样，打个分吧！</div>
      </div>
    <textarea class="rating-text" placeholder="说说这次维修的感受"></textarea>
    <div class="fault-info">
      <div class="fault-info-content flex-column">
        <div class="item-group flex-row">
          <div class="name">维修单位:</div>
          <div class="val">北京佳士康科技有限公司</div>
        </div>
        <div class="item-group flex-row">
          <div class="name">联系方式:</div>
          <div class="val w450">13763528123</div>
        </div>
        <div class="item-group flex-row">
          <div class="name">维修费用:</div>
          <div class="val color-E44F47">1,289.00元</div>
        </div>
        <div class="item-group mg0">
          <div class="flex-row imgwarp">
            <img class="img" src="../assets/img/test.png">
            <img class="img">
            <img class="img">
          </div>
        </div>
      </div>
    </div>
    <div class="submit">提交评价</div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import Vue from "vue";
import { Rate } from "vant";
Vue.use(Rate);
export default {
  name: "deliverCheck",
  components: { Title },
  props: {},
  data() {
    return {
      title: "设备验收",
      star:3
    };
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.color-E44F47 {
  color: #e44f47;
}
.rating-warp{
  align-items: center;
  padding: 24px;
  .text{
    color: #999;
    font-size: 28px;
    line-height: 40px;
    margin-top: 24px;
  }
}
.rating-text{
  width: 100%;
  height: 250px;
  box-sizing: border-box;
  padding: 25px;
  font-size: 28px;
  border: none;
  resize: none;
}
.fault-info-content {
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
}
.mg0 {
  margin: 0;
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
</style>