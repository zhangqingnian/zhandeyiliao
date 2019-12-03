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
              <div class="device-name">{{item.name}}</div>
              <div class="device-type">{{item.brandModel}}</div>
            </div>
            <div class="right flex-row">
              <img class="icon" :src="item.isNo ? imgon : imgoff" alt="">
            </div>
          </div>
        </van-list>
        <div class="bottom">
          <van-button class="btn1" type="info" @click="oncolse">取消</van-button>
          <van-button class="btn2" type="primary" @click="onsure">确认</van-button>
        </div>
      </div>
</template>

<script>
import Vue from "vue";
import { Button, List, Toast ,Checkbox} from "vant";
let imgon = require('@/assets/img/icon-on.png')
let imgoff = require('@/assets/img/icon-off.png')
Vue.use(Button).use(List).use(Checkbox);
export default {
  data() {
    return {
      imgon,
      imgoff,
      list: [],
      loading: false,
      finished: false,
      num:1,
      selectList:[]
    };
  },
  props:['organId'],
  watch:{
    'organId':function () {
      this.num = 1;
      this.list = [];
      this.loading = true;
      this.finished =  false;
      if(this.loading){
        this.onLoad()
      }
    }
  },
  methods: {
    oncolse(){
      this.$emit('colsedevice')
    },
    onsure(){
      this.$emit('device',this.selectList)
    },
    select(item){
      item.isNo = !item.isNo
      if(item.isNo){
        this.selectList.push({
          id:item.id,
          name:item.name
        })
      }else {
        this.selectList = this.selectList.filter(e => {
            return e.id != item.id
        })
      }
    },
    onLoad() {
      
      this.$http.post('/wx/hospital/api/listEquipment',{
        page:this.num  ,
        organId:this.organId,
        limit:20
      }).then(res => {
        let {code, msg, page} = res.data;
        if(code == '0'){
            this.num++;
            let {totalPage, currPage, list} = page;
            list.forEach(element => {
              element.isNo = false
            });
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
.icon{
  width: 40px;
  height: 40px;
}
.bottom{
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  background: #f5f5f5;
  box-shadow:0px -1px 0px 0px rgba(229,229,229,1),0px 1px 0px 0px rgba(229,229,229,1);
  display: flex;
  height: 80px;
}
.bottom .btn1{
  height: 80px;
  flex-basis: 30%;
}
.bottom .btn2{
  height: 80px;
  flex: 1;
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
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 80px
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