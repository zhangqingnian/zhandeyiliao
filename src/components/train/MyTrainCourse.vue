<template>
  <div class="wrapper">
    <!-- <Title title="我的培训"></Title> -->
    <div class="content">
      <!-- <div class="item flex-row">
        <div class="left flex-column">
          <div class="device-name">安全生产基础知识讲座</div>
          <div class="device-type">2019-09-03  12:30～14:30</div>
        </div>
        <div class="right flex-row">
          <div class="right-l flex-column">
            <div class="device-state">可报名</div>
            <div class="section">王安石</div>
          </div>
          <img class="right-r" src="../../assets/img/arrow.png">
        </div>
      </div>
      <div class="item flex-row">
        <div class="left flex-column">
          <div class="device-name">安全生产基础知识讲座</div>
          <div class="device-type">2019-09-03  12:30～14:30</div>
        </div>
        <div class="right flex-row">
          <div class="right-l flex-column">
            <div class="device-state img">可报名</div>
            <div class="section">王安石</div>
          </div>
          <img class="right-r" src="../../assets/img/arrow.png">
        </div>
      </div>
      <div class="item flex-row">
        <div class="left flex-column">
          <div class="device-name">安全生产基础知识讲座</div>
          <div class="device-type">2019-09-03  12:30～14:30</div>
        </div>
        <div class="right flex-row">
          <div class="right-l flex-column">
            <div class="device-state ed">可报名</div>
            <div class="section">王安石</div>
          </div>
          <img class="right-r" src="../../assets/img/arrow.png">
        </div>
      </div> -->
      <!--  @load="onLoad" -->
      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        finished-text="没有更多了"
       >
          <div class="item flex-row" v-for="item in list" :key="item.id" @click="courseDetail(item)">
            <div class="left flex-column">
              <div class="device-name">{{item.courseTitle}}</div>
              <div class="device-type">{{item.courseStartTime | dateFormat('YYYY-MM-DD HH:mm')}} ~ {{item.courseEndTime | dateFormat('HH:mm')}}</div>
            </div>
            <div class="right flex-row">
              <div class="right-l flex-column">
                <div class="device-state ed">{{item.courseStatus | courseStatusFilter}}</div>
                <div class="section">{{item.speaker}}</div>
              </div>
              <img class="right-r" src="../../assets/img/arrow.png">
            </div>
          </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
export default {
  components: {
    Title,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      num:1
    };
  },
  filters: {
    courseStatusFilter(num){
      switch (num) {
        case 0:
          return '未开始'
        case 1:
          return '进行中'
        case 2:
          return '已结束'
      }
    }
  },
  methods: {
    courseDetail(item){
      this.$router.push({
        path:'/trainDetail',
        query:{
          item:JSON.stringify(item)
        }
      })
    },
    onLoad(){
      this.$http.post('wx/hospital/api/myCourseList',{
          page:this.num,
          limit:15,
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

.device-state {
  color: #57aaf0;
}
.img{
   color: #FF8551;
}
.ed{
    color: #E44F47;
}
.section {
  color: #999;
  font-size: 26px;
}
.right-r {
  width: 16px;
  height: 26px;
  margin-left: 16px;
}
.right-l {
  font-size: 34px;
}
</style>