<template>
      <div class="content flex-column">
        <van-list
          class="list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad">
          <div class="item flex-row" v-for="item in list" :key="item.id" @click="select(item)">
            <div class="left flex-column">
              <div class="device-name">{{item.organName}}</div>
              <div class="device-type">{{item.createTime}}</div>
            </div>
            <div class="right flex-row">
              <div class="flex-column">
                  <div class="devName">{{item.devName | devName}}</div>  
                  <div class="status">{{item.status | status}}</div>  
              </div>  
              <img class="right-r" src="../../assets/img/arrow.png">
            </div>
          </div>
        </van-list>
      </div>
</template>

<script>
import Vue from "vue";
import { Button, List, Toast } from "vant";
Vue.use(Button).use(List);
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      num:1,
    };
  },
  filters:{
      devName(str){
        return    str.length > 10 ? str.slice(0,10)+'...' : str   
      },
      status(num){
          switch (num) {
              case 1:
                return '计划回访'
              case 2:
                return '完成回访'  
          }
      }
  },
  methods: {
    select(item){
        this.$router.push({
            path:'/visitDetail',
            query:{
                item:JSON.stringify(item)
            }
        })
    },
    onLoad() {
      
      this.$http.post('/wx/engineer/api/revisitList',{
        page:this.num  ,
        ordered:0,
        limit:20
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
  align-items: center;
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
  color: #57aaf0;
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