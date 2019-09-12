<template>
  <div class="wrapper">
    <my-title title="我的咨询" :right="true" :back="false" @right="onRight">
      <title-icon slot="right" class="right" name="apply_off"/>
    </my-title>
    <div class="content flex-column">
   
      <div class="item flex-row">
        <div class="left flex-column">
          <div class="device-name">华山医院公开课怎么报名？</div>
          <div class="device-type">2019-08-28  18:09:29</div>
        </div>
        <div class="right flex-row">
          <div class="section ">已回复</div>
          <img class="right-r" src="../../assets/img/arrow.png">
        </div>
      </div>
      <div class="item flex-row">
        <div class="left flex-column">
          <div class="device-name">报名费可否退？</div>
          <div class="device-type">2019-09-02  17:03:56</div>
        </div>
        <div class="right flex-row">
          <div class="section replying">待回复</div>
          <img class="right-r" src="../../assets/img/arrow.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myTitle from "@/components/common/MyTitle";
import titleIcon from "@/components/common/TitleIcon";
export default {
  name: "",
  components: {
    myTitle,
    titleIcon
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    onRight() {
      console.log(888);
    }
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



.section {
  color: #888888;
  font-size: 34px;
}

.replying {
  color: #57aaf0;
}
.right-r {
  width: 16px;
  height: 26px;
  margin-left: 16px;
}
</style>