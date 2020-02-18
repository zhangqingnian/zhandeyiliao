<template>
  <div class="wrapper">
    <!-- <Title title="首页" :right="true" :back="false" @right="onRight">
      <title-icon slot="right" class="right" name='apply_off'/>
    </Title> -->
    <div class="content flex-column">
      <!-- <div class="search-warp">
        <div class="search">
          <input class="search-input" type="text" placeholder="请输入设备编号和名称">
          <img class="search-img" src="../assets/img/search.png">
        </div>
      </div> -->
      <van-list
        
        class="list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <div
          class="item flex-row"
          v-for="item in list"
          :key="item.id"
          @click="onDetail(item)"
        >
          <div class="left flex-row">
            <div class="flex-column left-l">
              <div class="device-name">{{ item.name.slice(0, 6) }}</div>
              <div class="device-type">{{ item.brandModel }}</div>
            </div>
            <van-button
              v-if="item.ordered"
              type="warning"
              size="small"
              @click.stop
              >已报修</van-button
            >
            <van-button
              v-else
              plain
              type="info"
              size="small"
              @click.stop="onQuick(item.id)"
              >一键维修</van-button
            >
          </div>
          <div class="right flex-row">
            <div class="right-l flex-column">
              <div class="device-state">正常</div>
              <div class="section">{{ item.hospitalName.slice(0, 8) }}</div>
            </div>
            <img class="right-r" src="../assets/img/arrow.png" />
          </div>
        </div>
      </van-list>
      <!-- <div v-if="!list.length">暂无设备,请联系客服</div> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, List, Toast, Dialog } from "vant";
import Title from "@/components/common/MyTitle";
import titleIcon from "@/components/common/TitleIcon";
Vue.use(Button)
  .use(List)
  .use(Dialog);

export default {
  name: "index",
  components: {
    Title,
    titleIcon
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      num: 1
    };
  },
  methods: {
    onQuick(depId) {
      Dialog.confirm({
        title: "提示",
        message: "是否一键报修该设备?"
      })
        .then(() => {
          this.$http
            .post("wx/hospital/api/saveWorkOrderForOneRepair", {
              depId
            })
            .then(res => {
              let { code, msg, workOrder } = res.data;
              Toast(msg);
              if (code == "0") {
                this.list = [];
                this.num = 1;
                this.loading = false;
                this.finished = false;
                this.onLoad();
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    onRight() {
      console.log(888);
    },
    onDetail(item) {
      this.$router.push({
        path: "/deviceDetail",
        query: {
          id: item.id
        }
      });
    },
    onLoad() {
      this.$http
        .post("/wx/engineer/api/equipmentList", {
          page: this.num,
          limit: 15
        })
        .then(res => {
          let { code, msg, page } = res.data;
          if (code == "0") {
            this.num++;
            let { totalPage, currPage, list } = page;
            this.list = this.list.concat(list);
            this.loading = false;
            if (currPage >= totalPage) {
              this.finished = true;
            }
          }
        });

        
    }
  }
};
</script>
<style scoped>
.mr {
  margin-right: 20px;
}
.logowarp {
  display: flex;
  align-items: center;
}
.logo {
  width: 48px;
  height: 48px;
  background-color: #fff;
  margin-right: 10px;
}
.apply {
  position: absolute;
  width: 55px;
  height: 56px;
  top: 16px;
  right: 25px;
}
.content {
  background: #f5f5f5;
  align-items: center;
  /* padding-top: 92px; */
  box-sizing: border-box;
}
.search-warp {
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  position: fixed;
  top: 0;
  z-index: 999;
  box-shadow: 0px -1px 0px 0px rgba(229, 229, 229, 1),
    0px 1px 0px 0px rgba(229, 229, 229, 1);
}
.search {
  width: 700px;
  height: 60px;
  position: relative;
  margin: 16px 0;
}
.search-input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid rgba(230, 230, 234, 1);
  font-size: 26px;
  padding-left: 70px;
}
.search-img {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 10px;
  left: 15px;
}

.list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.item {
  background: #fff;
  justify-content: space-between;
  padding: 24px;
  box-sizing: border-box;
  margin-top: 40px;
}
.item:first-child {
  margin-top: 0;
}

.left {
  justify-content: space-between;
  align-items: center;
}
.left-l {
  width: 230px;
  overflow: hidden;
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
  text-align: right;
}

.section {
  color: #888888;
}
.right-r {
  width: 16px;
  height: 26px;
  margin-left: 30px;
}
.right-l {
  font-size: 30px;
}
</style>
