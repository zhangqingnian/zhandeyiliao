<template>
  <div class="wrapper">
      <Title :title="title"/>
      <div class="content flex-column" >
          <div class="bottom flex-row" >
            <div class="b-left flex-column">
              <div class="device-name">血液细胞分析仪</div>
              <div class="fs-26-color-999">SH3280-210032</div>
            </div>
            <div class="b-right flex-row">
              <div class="b-right-left flex-column">
                <div class="device-name state">待审批</div>
                <div class="fs-26-color-999">2019-07-12</div>
              </div>
              <img src="../assets/img/arrow.png" class="b-right-right">
            </div>
          </div>
          <div class="bottom flex-row" >
            <div class="b-left flex-column">
              <div class="device-name">血液细胞分析仪</div>
              <div class="fs-26-color-999">SH3280-210032</div>
            </div>
            <div class="b-right flex-row">
              <div class="b-right-left flex-column">
                <div class="device-name end">已完成</div>
                <div class="fs-26-color-999">2019-07-12</div>
              </div>
              <img src="../assets/img/arrow.png" class="b-right-right">
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
export default {
  name:'repairApplyRecord',
  components:{
      Title
  },
  props:{},
  data(){
    return {
        title: "维修申请记录",
    }
  },
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang="scss" scoped>
.fs-26-color-999 {
  color: #999;
  font-size: 26px;
  line-height: 37px;
}


.device-name {
  color: #000;
  font-size: 34px;
  line-height: 48px;
}
.bottom {
    margin-top: 24px;
    padding: 24px ;
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

    .end{
        color: #57AAF0;
    }

    .state{
        color: #FF8551;
    }
  }
</style>