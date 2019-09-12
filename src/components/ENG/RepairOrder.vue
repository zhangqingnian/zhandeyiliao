<template>
  <div class="wrapper">
    <my-title :title="title" :back="false" @right="onRight">
        <title-icon slot="right" class="right" name='apply_off'/>
    </my-title>
    <div class="content">
      <div class="nav flex-row">
        <div class="item" v-for="item in nav" :key="item.id" @click="onNav(item)">
          <span :class=" {active:item.isActive }">{{item.name}}</span>
        </div>
      </div>
      <div class="list flex-column">
        <div class="bottom flex-row" >
          <div class="b-left flex-column">
            <div class="device-name">物流运输</div>
            <div class="fs-26-color-999">310987372927</div>
          </div>
          <div class="b-right flex-row">
            <div class="b-right-left flex-column">
              <div class="device-name" :class="{state:isActive}">已签收</div>
              <div class="fs-26-color-999">顺丰快递</div>
            </div>
            <img src="../../assets/img/arrow.png" class="b-right-right">
          </div>
        </div>
        <div class="bottom flex-row" >
          <div class="b-left flex-column">
            <div class="device-name">物流运输</div>
            <div class="fs-26-color-999">310987372927</div>
          </div>
          <div class="b-right flex-row">
            <div class="b-right-left flex-column">
              <div class="device-name" :class="{state:isActive}">已签收</div>
              <div class="fs-26-color-999">顺丰快递</div>
            </div>
            <img src="../../assets/img/arrow.png" class="b-right-right">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myTitle from "@/components/common/MyTitle";
import titleIcon from "@/components/common/TitleIcon";
import { Toast } from 'vant';
export default {
  name: "repairOrder",
  components: {
    myTitle,titleIcon
  },
  props: {},
  data() {
    return {
      title: "维修接单",
      nav: [
        { name: "待接单", isActive: true, id: 0 },
        { name: "我的维修单", isActive: false, id: 1 }
      ],
      isActive:true
    };
  },
  methods: {
    onRight() {
      Toast(1111)
    },
    onNav(item) {
      this.nav.forEach(e => {
        item.name == e.name ? e.isActive = true : e.isActive = false;
        item.name == '待接单' ? this.isActive = true : this.isActive = false;
      });
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>

.nav {
  height: 88px;
  color: #999;
  box-shadow: 0px -1px 0px 0px rgba(229, 229, 229, 1),
    0px 1px 0px 0px rgba(229, 229, 229, 1);
  .item {
    flex: 1;
    text-align: center;
    font-size: 34px;
    height: 100%;
    line-height: 88px;
    span {
      display: inline-block;
      box-sizing: border-box;
      height: 100%;
      padding: 0 25px;
      &.active {
        color: #57aaf0;
        border-bottom: 3px solid;
      }
    }
  }
}

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
    padding: 24px ;
     background: #fff;
    font-size: 28px;
    color: #999;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
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
.state{
  color: #57aaf0;
}
</style>