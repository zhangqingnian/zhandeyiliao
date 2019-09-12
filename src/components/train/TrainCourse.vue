<template>
  <div class="wrapper">
    <Title title="首页" :right="true" @right="onRight">
      <title-icon slot="right" class="right" name="apply_off"/>
    </Title>
    <div class="content">
      <div class="item flex-row">
        <div class="left flex-column">
          <div class="device-name">安全生产基础知识讲座</div>
          <div class="device-type">2019-09-03  12:30～14:30</div>
        </div>
        <div class="right flex-row">
          <div class="right-l flex-column">
            <div class="device-state">可报名</div>
            <div class="section">王安石</div>
          </div>
          <img class="right-r" src="../../assets/img/arrow.png">
        </div>
      </div>
      <div class="item flex-row">
        <div class="left flex-column">
          <div class="device-name">安全生产基础知识讲座</div>
          <div class="device-type">2019-09-03  12:30～14:30</div>
        </div>
        <div class="right flex-row">
          <div class="right-l flex-column">
            <div class="device-state img">可报名</div>
            <div class="section">王安石</div>
          </div>
          <img class="right-r" src="../../assets/img/arrow.png">
        </div>
      </div>
      <div class="item flex-row">
        <div class="left flex-column">
          <div class="device-name">安全生产基础知识讲座</div>
          <div class="device-type">2019-09-03  12:30～14:30</div>
        </div>
        <div class="right flex-row">
          <div class="right-l flex-column">
            <div class="device-state ed">可报名</div>
            <div class="section">王安石</div>
          </div>
          <img class="right-r" src="../../assets/img/arrow.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import titleIcon from "@/components/common/TitleIcon";
export default {
  components: {
    Title,
    titleIcon
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    onRight() {}
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
.item {
  background: #fff;
  justify-content: space-between;
  padding: 24px;
  box-sizing: border-box;
  margin-bottom: 40px;
}

.left {
  justify-content: space-between;
}

.right {
  align-items: center;
}

.device-name {
  font-size: 34px;
  color: #000;
  line-height: 48px;
}
.device-type {
  font-size: 26px;
  color: #999;
  line-height: 36px;
}

.device-state {
  color: #57aaf0;
}
.img{
   color: #FF8551;
}
.ed{
    color: #E44F47;
}
.section {
  color: #999;
  font-size: 26px;
}
.right-r {
  width: 16px;
  height: 26px;
  margin-left: 16px;
}
.right-l {
  font-size: 34px;
}
</style>