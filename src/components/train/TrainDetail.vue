<template>
  <div class="wrapper">
    <Title title="培训详情"/>
    <div class="content flex-column">
      <div class="device-info">
        <div class="samll-title fs-26-color-999">培训信息</div>
        <div class="device-info-content flex-row">
          <div class="left flex-column">
            <div class="device-name">医疗器械系列：过程确认工程师</div>
            <div class="device-type fs-26-color-999">主讲人：王安石</div>
            <div class="device-type fs-26-color-999">时间：2019-09-04  13:00～15:00</div>
            <div class="device-type fs-26-color-999">地点：复旦大学附属华山医院徐汇分院D座805室</div>
          </div>
          <img class="state-img" src="../../assets/img/state1.png">
        </div>
      </div>

      <div class="fault-info">
        <div class="samll-title fs-26-color-999">课程目标</div>
        <div class="fault-info-content flex-column mubiao">
            完成该培训时，学员将能够了解过程确认体系基本原理、过程因子识别、过程因子筛选、过程因子优化、过程确认样本量配置方法、过程确认统计原理与数据应用、过程确认分析基础
        </div>
      </div>

      <div class="deliver-info">
        <div class="samll-title fs-26-color-999">课程大纲</div>
        <div class="fault-info-content flex-column mubiao">
            1、过程确认的概念与意义 <br>
            2、过程确认的法规要求<br>
            3、过程确认的分类以及范围<br>
            4、确认的方案策划（包括再确认）<br>
            5、过程确认A.安装确认、B、运行确认<br>
            6、过程确认的报告和支持性文件<br>
            7、变更控制和确认状态的维护
        </div>
      </div>

      

        <div class="submit">立即报名</div>
        <div class="submit refuse">已报名</div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import Vue from 'vue';
import { Rate } from 'vant';
Vue.use(Rate);
export default {
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
  line-height: 45px;
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
  
}
.mubiao{
    font-size: 26px;
    color: #999;
    padding: 24px;
    line-height: 38px;
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
  margin: 120px auto 0;
}

.refuse {
  color: #000;
  background: rgba(248, 248, 248, 1);
  border: 2px solid rgba(5, 5, 5, 0.1);
}
</style>