<template>
      <div class="content flex-column">
        <div class="fixed">
            <van-tabs @click="onNav">
              <van-tab title="待确认" name='1'></van-tab>
              <van-tab title="已确认" name='2'></van-tab>
            </van-tabs>
        </div>
        <van-list
          class="list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad">
          <div class="item flex-row" v-for="item in list" :key="item.id" @click="select(item)">
            <div class="left flex-column">
              <div class="device-name">{{item.baName}} </div>
              <!-- <div class="device-type">{{item.address}}</div> -->
            </div>
            <div class="right flex-row">
              <div class="flex-column">
                  <div class="devName">{{item.equipmentName}}</div>  
                  <div class="status">{{item.reservationTime | dateFormat}}</div>  
              </div>  
              <img class="right-r" src="../assets/img/arrow.png">
            </div>
          </div>
        </van-list>
      </div>
</template>

<script>
import Vue from "vue";
import { List, Toast, Tag, Tab, Tabs  } from "vant";
Vue.use(Tag).use(List);
Vue.use(Tab).use(Tabs);
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      num:1,
      status:1,
    };
  },
  methods: {
    onNav(name, title){
      if(title == '待确认'){
        if(this.status == 1)return
        this.status = 1
        this.list = [];
        this.loading = true;
        this.finished = false;
        this.num = 1;
        if(this.loading){
          this.onLoad();
        }
      }else{
        if(this.status == 2)return
        this.status = 2
        this.list = [];
        this.loading = true;
        this.finished = false;
        this.num = 1;
        if(this.loading){
          this.onLoad();
        }
      }
    },
    select(item){
        this.$router.push({
            path:'/confrimInstallDetail',
            query:{
                id:item.id
            }
        })
    },
    onLoad() {
      this.$http.post('/wx/hospital/api/organInstallList',{
        page:this.num  ,
        limit:20,
        status:this.status
      }).then(res => {
        let {code, msg, page} = res.data;
        if(code == '0'){
            this.num++;
            let {totalPage, currPage, list} = page;
            this.list = this.list.concat(list);
            this.loading = false;
            if (currPage >= totalPage) {
              this.finished = true;
            }
        }
      })
      
    }
  }
};
</script>
<style scoped >

.content {
  box-sizing: border-box;
  padding-top: 90px;
}
.fixed{
  position: fixed;
  top: 0;
  width: 100%;
}
.search-warp{
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
  position: fixed;
  top: 0;
  z-index: 999;
  box-shadow:0px -1px 0px 0px rgba(229,229,229,1),0px 1px 0px 0px rgba(229,229,229,1);
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
  align-items: center;
}
.item:first-child { 
  margin-top: 0;
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
.devName{
  font-size: 28px;
  color: #333;
  line-height: 48px;
}
.status{
  font-size: 26px;
  /* color: #57aaf0; */
  color: #999;
  line-height: 36px;
  text-align: right;
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
  font-size: 34px;
}
</style>