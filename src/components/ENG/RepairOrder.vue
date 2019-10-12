<template>
  <div class="wrapper">
    <!-- <my-title :title="title" :back="false" @right="onRight">
        <title-icon slot="right" class="right" name='apply_off'/>
    </my-title> -->
    <div class="content">
      <!-- <div class="nav flex-row">
        <div class="item" v-for="item in nav" :key="item.id" @click="onNav(item)">
          <span :class=" {active:item.isActive }">{{item.name}}</span>
        </div>
      </div> -->
      <!-- <div class="list flex-column">
        <div class="bottom flex-row" v-for="item in list" :key="item.taskId">
          <div class="b-left flex-column">
            <div class="device-name">{{item.taskName}}</div>
            <div class="fs-26-color-999">{{item.code}}</div>
          </div>
          <div class="b-right flex-row">
            <div class="b-right-left flex-column">
              <div class="device-name co" :class="{state:isActive}">{{item.status | state}}</div>
              <div class="fs-26-color-999">{{item.createTime | dateFormat}}</div>
            </div>
            <img src="../../assets/img/arrow.png" class="b-right-right">
          </div>
        </div>
      </div> -->
      <van-list
        class="list flex-column"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getOrderList">
        <div class="bottom flex-row" v-for="item in list" :key="item.taskId" @click="onDetail(item)">
          <div class="b-left flex-column">
            <div class="device-name">{{item.taskName}}</div>
            <div class="fs-26-color-999">{{item.code}}</div>
          </div>
          <div class="b-right flex-row">
            <div class="b-right-left flex-column">
              <div class="device-name co state" >{{item.orderReceivingStatus | state}}</div>
              <div class="fs-26-color-999">{{item.createTime | dateFormat}}</div>
            </div>
            <img src="../../assets/img/arrow.png" class="b-right-right">
          </div>
        </div>
        
      </van-list>
    </div>
  </div>
</template>

<script>
// import myTitle from "@/components/common/MyTitle";
// import titleIcon from "@/components/common/TitleIcon";
import { Toast,List } from 'vant';

export default {
  name: "repairOrder",
  components: {
    List
  },
  mounted(){

  },
  data() {
    return {
      list:[],
      num:1,
      loading: false,
      finished: false,

    };
  },
  filters:{
    state:function(state){
      switch (state) {
        case 0:
          return '维修中';
        case 1:
          return '维修成功';
        case 2:
          return '维修失败';
        case 3:
          return '维修退回';
      }
    }
  },
  methods: {
    onDetail(item){
      this.$router.push({
        path:'/engRepairApplyDetail',
        query:{
          busId:item.busId,
          taskId:item.taskId
        }
      })
    },
    getOrderList(){
      this.$http.post('/wx/engineer/api/waitingList',{
        page:this.num  ,
        limit:10
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
      }).catch(err => {
        this.loading = false;
        this.finished = true;
      })
    }
  },
  
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
.co{
  color: #999;
}
.bottom {
    padding: 24px ;
     background: #fff;
    font-size: 28px;
    color: #999;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;
    &:first-child{
      margin-top: 0;
    }
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