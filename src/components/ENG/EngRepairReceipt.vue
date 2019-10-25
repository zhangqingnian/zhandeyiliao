<template>
  <div class="wrapper">
    <!-- <Title :title="title" /> -->
    <div class="content flex-column">
      <div class="device-info">
        <div class="samll-title fs-26-color-999">设备信息</div>
        <div class="device-info-content flex-row">
          <div class="left flex-column">
            <div class="device-name">{{device.equipmentName}}</div>
            <div class="device-type fs-26-color-999">设备型号：{{device.brandModel}}</div>
            <div class="device-number fs-26-color-999">设备编号：{{device.commodityNumber}}</div>
          </div>
          <!-- <img class="right"  src="../../assets/img/state2.png" > -->
        </div>
      </div>

      <div class="fault-info">
        <div class="samll-title fs-26-color-999">维修信息填写</div>
        <div class="fault-info-content flex-column">
          <!-- <div class="item-group flex-row">
                    <div class="name">维修人员:</div>
                    <input type="text" placeholder="维修人姓名">
                </div>
                <div class="item-group flex-row">
                    <div class="name">联系方式:</div>
                    <input type="text" placeholder="请输入手机号码" maxlength="11">
          </div>-->
          <div class="item-group flex-row">
            <div class="name">故障类型:</div>
            <select v-model="faultType">
              <option v-for="item in faultTypeList" :value="item.value" :key="item.id">{{item.name}}</option>
            </select>
          </div>
          <div class="item-group flex-row">
            <div class="name">故障判断:</div>
            <input type="text" v-model.trim="faultJudge">
          </div>
          <div class="item-group flex-row">
            <div class="name">维修记录:</div>
            <input type="text" v-model.trim="maintenanceRecord">
          </div>
        </div>
      </div>

      <div class="deliver-info" v-if="recordList.length">
        <div class="samll-title fs-26-color-999">维修记录</div>
        <div class="fault-info-content flex-column">
          <div class="item-group fs-26-color-999 fz28">
            <div
              v-for="(item, index) in recordList"
              :key="item.id"
            >{{index+1+'.'}} {{item.maintenanceRecord}}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="submit" @click="show = true">维修完毕</div>
        <div class="submit refuse" @click="onKeep">保存</div>
      </div>
      <!-- <van-dialog
            v-model="show"
            title="提示"
            message="维修是否成功?"
            confirm-button-text	= "维修成功"
            cancel-button-text = "维修失败"
            close-on-click-overlay
            @confirm="onsuccess"
            @cancel="onerr"
      show-cancel-button />-->
      <van-overlay :show="show" @click="show = false"></van-overlay>
      <div
        v-if="show"
        data-v-28c4380e
        role="dialog"
        aria-labelledby="提示"
        class="van-dialog"
        style="z-index: 2000;"
      >
        <div class="van-dialog__header">提示</div>
        <div class="van-dialog__content">
          <div class="van-dialog__message van-dialog__message--has-title">维修是否成功?</div>
        </div>
        <div class="van-hairline--top van-dialog__footer van-dialog__footer--buttons">
          <button class="van-button van-button--default van-button--large van-dialog__cancel" @click="noRepair">
            <span class="van-button__text">不修</span>
          </button>
          <button
            @click="onerr"
           class="van-button van-button--default van-button--large van-dialog__cancel van-hairline--left">
            <span class="van-button__text">维修失败</span>
          </button>
         
          <button
            @click="onsuccess"
            class="van-button van-button--default van-button--large van-dialog__confirm van-hairline--left"
          >
            <span class="van-button__text">维修成功</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Title from "@/components/common/MyTitle";
import Vue from "vue";
import { Uploader, Dialog, Toast, Overlay } from "vant";

Vue.use(Uploader)
  .use(Dialog)
  .use(Overlay);
export default {
  data() {
    return {
      show: false,
      device: JSON.parse(this.$route.query.device),
      faultTypeList: [],
      faultType: "", //故障类型
      faultJudge: "", //故障判断
      maintenanceRecord: "", //维修记录
      recordList: []
    };
  },
  mounted() {
    this.getType();
    this.record();
  },
  methods: {
    onsuccess() {
      this.repairEnd(1);
    },
    onerr() {
      this.repairEnd(2);
    },
    noRepair(){
        this.repairEnd(3);
    },
    onKeep() {
      let { faultType, faultJudge, maintenanceRecord } = this;
      if (!faultJudge) {
        Toast("请填写故障判断!");
        return;
      }
      if (!maintenanceRecord) {
        Toast("请填写维修记录!");
        return;
      }
      let { instanceId } = this.device;
      this.$http
        .post("/wx/engineer/api/maintenanceReturnReceiptSave", {
          instanceId,
          faultType,
          faultJudge,
          maintenanceRecord
        })
        .then(res => {
          let { code, msg } = res.data;
          Toast(msg);
          if (code == "0") {
            //this.$router.go(-1)
            this.record();
          }
        });
    },
    record() {
      this.$http
        .post("/wx/engineer/api/checkMaintenanceList", {
          workOrderId: this.device.id
        })
        .then(res => {
          console.log(res.data);
          let { code, msg, mrList } = res.data;
          if (code == "0") {
            this.recordList = mrList;
          }
        });
    },
    //维修完毕
    repairEnd(varValue) {
      let { faultType, faultJudge, maintenanceRecord } = this;
      if (!faultJudge) {
        Toast("请填写故障判断!");
        return;
      }
      if (!maintenanceRecord) {
        Toast("请填写维修记录!");
        return;
      }
      if(varValue == 2){
        varValue = varValue+",2"
      }else{
        varValue = varValue+",1"
      }
      

      let varName = "orderReceivingStatus,maintenanceType"
     
      let { id, instanceId, defid } = this.device;
      let taskId = this.$route.query.taskId;
      this.$http
        .post("/wx/engineer/api/maintenanceReturnReceipt", {
          busId: id,
          taskId,
          instanceId,
          defId: defid,
          faultType,
          faultJudge,
          maintenanceRecord,
          varName,
          varValue
        })
        .then(res => {
          let { code, msg } = res.data;
          Toast(msg);
          if (code == "0") {
            this.$router.go(-1);
          }
        });
    },
    //维修类型
    getType() {
      this.$http
        .post("/wx/engineer/api/getNextCodesForApp", {
          mark: "equipment_failur"
        })
        .then(res => {
          let { code, msg, codeEntities } = res.data;
          console.log(res.data);
          if (code != "0") {
            Toast(msg);
            return;
          }

          this.faultTypeList = codeEntities;
          this.faultType = this.faultTypeList[0].value;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.fs-26-color-999 {
  color: #999;
  font-size: 26px;
  line-height: 37px;
}
.fz28 {
  font-size: 28px;
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
    width: 150px;
    height: 70px;
  }
}

.fault-info-content {
  background-color: #fff;
  padding: 0 24px;
  .item-group {
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    .warp {
      position: relative;
      color: #e44f47;
      font-size: 34px;
      font-weight: 500;
      line-height: 48px;
      input {
        padding-right: 80px;
      }
    }
    .unit {
      position: absolute;
      top: 20px;
      right: 30px;
    }
  }
  .name {
    color: #000;
    font-size: 34px;
  }
  select,
  input {
    font-size: 34px;
    width: 500px;
    height: 88px;
    background: rgba(245, 245, 245, 1);
    border-radius: 8px;
    border: 1px solid rgba(151, 151, 151, 1);
    box-sizing: border-box;
    padding-left: 20px;
  }
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
.van-uploader__preview-image {
  width: 210px;
  height: 210px;
}
.van-uploader__upload {
  margin: 18px 36px 18px 0;
  width: 210px;
  height: 210px;
}
.van-uploader__preview {
  margin: 18px 36px 18px 0;
}
.van-uploader__preview-delete {
  font-size: 30px;
}
.van-uploader__wrapper > div:nth-child(3n) {
  margin-right: 0;
}
</style>