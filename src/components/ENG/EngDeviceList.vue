<template>
  <div class="wrapper">
    <div class="content flex-column">
      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <div class="item flex-row" v-for="item in list" :key="item.id" @click="onBack(item)">
          <div class="left flex-column">
            <div class="device-name">{{item.name}}</div>
          </div>
          <div class="right flex-row">
            <van-checkbox v-model="item.isNo" checked-color="#07c160"></van-checkbox>
          </div>
        </div>
      </van-list>
      <div>
        <van-button type="info">全选</van-button>
        <van-button type="warning">重置</van-button>
        <van-button type="danger" @click="onsure">确认</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, List, Toast ,Checkbox} from "vant";
Vue.use(Button).use(List).use(Checkbox);
export default {
  data() {
    return {
      list: [{id:1,name:'设备',isNo:false},{id:2,name:'设备',isNo:false},{id:3,name:'设备',isNo:false},
             {id:4,name:'设备',isNo:false},{id:5,name:'设备',isNo:false},{id:6,name:'设备',isNo:false},
             {id:7,name:'设备',isNo:false},{id:8,name:'设备',isNo:false},{id:9,name:'设备',isNo:false},   ],
      loading: false,
      finished: false,
      num:1
    };
  },
  methods: {
    onsure(){
      console.log(this.list)
    },
    onBack(item){
      
    },
    onLoad() {
      
    //   this.$http.post('/wx/engineer/api/equipmentList',{
    //     page:this.num  ,
    //     ordered:0,
    //     limit:15
    //   }).then(res => {
    //     let {code, msg, page} = res.data;
    //     if(code == '0'){
    //         this.num++;
    //         let {totalPage, currPage, list} = page;
    //         this.list = this.list.concat(list);
    //         this.loading = false;
    //         if (currPage >= totalPage) {
    //           this.finished = true;
    //         }
    //     }
    //   })
      
    }
  }
};
</script>
<style scoped >

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
  font-size: 34px;
}
</style>