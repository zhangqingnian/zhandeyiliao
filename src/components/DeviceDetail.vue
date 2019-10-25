<template>
  <div class="wrapper">
    <!-- <Title :title="title"/> -->
    <div class="content">
      <div class="detail">
        <div class="top flex-row">
          <div class="left flex-column">
            <div class="device-name">{{item.name}}</div>
            <div class="device-type fs-26-color-999">{{item.brandModel}}</div>
          </div>
          <!-- <img class="right" src="../assets/img/apply_on.png"> -->
        </div>
        <div class="bottom">
            <div class="item flex-row">
                <div class="name">所属科室:</div>
                <div class="val">{{item.hospitalName}}</div>
            </div>
            <div class="item flex-row">
                <div class="name">品牌型号:</div>
                <div class="val">{{item.brandModel}}</div>
            </div>
            <div class="item flex-row">
                <div class="name">商品编号:</div>
                <div class="val">{{item.commodityNumber}}</div>
            </div>
            <!-- <div class="item flex-row">
                <div class="name">购置日期:</div>
                <div class="val">{{this.$route.query.commodityNumber}}</div>
            </div> -->
            <div class="item flex-row">
                <div class="name">保修期限:</div>
                <div class="val">{{item.warrantyDesc}}</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import { Toast } from 'vant';
export default {
  components: {
    Title
  },
  mounted(){
    let id = this.$route.query.id;
    this.getDetail(id);
  },
  data() {
    return {
      title: "设备详情",
      item:{}
    };
  },
  methods:{
    getDetail(depId){
      this.$http.post('wx/hospital/api/equipmentOne',{
        depId
      }).then(res => {
         let {code, msg ,equipmentEntity} = res.data;
         if(code == '0'){
           this.item = equipmentEntity;
         }else{
           Toast(msg)
         }
      })
    }
  }
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

  .bottom{
      padding: 24px 0;
      font-size: 28px;
      color: #999;
      .item{
          justify-content: space-between;
          align-items: center;
          line-height: 40px;
          margin-bottom: 24px;
          &:last-child{
              margin-bottom: 0;
          }
      }
  }
}
</style>