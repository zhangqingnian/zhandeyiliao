<template>
  <div class="wrapper">
    <div class="content flex-column">

      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getRecord">
          <div class="item flex-row" v-for="item in list" :key="item.id" @click="goDetail(item)">
            <div class="left flex-column" >
              <div class="device-name">{{item.content}}</div>
              <div class="device-type">{{item.createTime | dateFormat('YYYY-MM-DD HH:mm:ss')}}</div>
            </div>
            <div class="right flex-row">
              <div class="section replying">{{item.status == 0 ? '待回复':'已回复'}}</div>
              <img class="right-r" src="../../assets/img/arrow.png">
            </div>
          </div>  
      </van-list>
    </div>
  </div>
</template>

<script>
import myTitle from "@/components/common/MyTitle";
import titleIcon from "@/components/common/TitleIcon";
import Vue from "vue";
import { List, Toast} from "vant";
Vue.use(List);
export default {
  name: "",
  components: {
    myTitle,
    titleIcon
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      num:1
    };
  },
  
  methods: {
    goDetail(item){
      this.$router.push({
        path:'/consultDetail',
        query:{
          item:item
        }
      })
    },
    getRecord(){
      this.$http.post('wx/hospital/api/myConsultList',{
          page:this.num,
          limit:15,
          sidx:'',
          order:''
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
  },
};
</script>
<style scoped>
.item {
  background: #fff;
  justify-content: space-between;
  padding: 24px;
  box-sizing: border-box;
  margin-top: 40px;
}
.item:first-child{
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



.section {
  color: #888888;
  font-size: 34px;
}

.replying {
  color: #57aaf0;
}
.right-r {
  width: 16px;
  height: 26px;
  margin-left: 16px;
}
</style>