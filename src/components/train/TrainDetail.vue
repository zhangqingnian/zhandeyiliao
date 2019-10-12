<template>
  <div class="wrapper">
    <!-- <Title title="培训详情"/> -->
    <div class="content flex-column">
      <div class="device-info">
        <div class="samll-title fs-26-color-999">培训信息</div>
        <div class="device-info-content flex-row">
          <div class="left flex-column">
            <div class="device-name">医疗器械系列：{{item.courseTitle}}</div>
            <div class="device-type fs-26-color-999">主讲人：{{item.speaker}}</div>
            <div class="device-type fs-26-color-999">时间：{{item.courseStartTime | dateFormat('YYYY-MM-DD HH:mm')}} ~ {{item.courseEndTime | dateFormat('HH:mm')}}</div>
            <div class="device-type fs-26-color-999">地点：{{item.courseAddress}}</div>
          </div>
          <img class="state-img" :src="getImgUrl()" />
        </div>
      </div>

      <div class="fault-info">
        <div class="samll-title fs-26-color-999">课程目标</div>
        <div class="fault-info-content flex-column mubiao">
            {{item.courseTarget}}
        </div>
      </div>

      <div class="deliver-info">
        <div class="samll-title fs-26-color-999">课程大纲</div>
        <div class="fault-info-content flex-column mubiao">
            {{item.courseDesc}}
        </div>
      </div>

      

        
        <div class="submit refuse" v-if="item.signUpStatus">已报名</div>
        <div class="submit" v-if="!item.signUpStatus && item.courseStatus == 0" @click="onSignUp">立即报名</div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/common/MyTitle";
import Vue from 'vue';
import { Toast } from 'vant';

export default {
  components: {
    Title
  },
  props: {},
  data() {
    return {
      title: "维修详情",
      item: JSON.parse(this.$route.query.item),
      state:'state1'
    };
  },
  computed: {
    
  },
  methods: {
    getImgUrl(){
      //signUpStatus ： 课程报名状态 1-已报名，0-未报名
      //courseStatus ： 课程状态：0-未开始，1-进行中，2-已结束
      //courseStatus ： 课程状态：0-可报名，1-进行中，2-已结束
      let state = 'singup'
      if(this.item.signUpStatus == 1){
        state = 'singuped'
      }else{
        if(this.item.courseStatus == 0){

        }else if (this.item.courseStatus == 1){
          state = 'singuping'
        }else if(this.item.courseStatus == 2){
          state = 'singupend'
        }
      }
      return require("@/assets/img/"+state+".png");
    },
    onSignUp(){
      this.$http.post('/wx/engineer/api/courseSignUp',{
        courseId:this.item.id
      }).then(res => {
        let {code, msg, info} = res.data;
        if(code == '0'){
          this.$router.push({
            name:'myTrainCourse'
          })
        }else{
          Toast(info)
        }
      })
    }
  }
};
</script>
<style  lang="scss" scoped>
.w450 {
  width: 450px;
}
.state-img {
  width: 150px;
  height: 70px;
}
.fs-26-color-999 {
  color: #999;
  font-size: 26px;
  line-height: 45px;
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
    width: 56px;
    height: 56px;
  }
}

.fault-info-content {
  background-color: #fff;
  padding: 0 24px;
  
}
.mubiao{
    font-size: 26px;
    color: #999;
    padding: 24px;
    line-height: 38px;
}
.deliver-record-content {
  background: #fff;
  box-sizing: border-box;
  padding: 24px;
  font-size: 28px;
  line-height: 40px;
  color: #999999;
}

.rating-content{
  font-size: 28px;
  line-height: 40px;
  color: #999999;
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
  margin: 120px auto 0;
}

.refuse {
  color: #000;
  background: rgba(248, 248, 248, 1);
  border: 2px solid rgba(5, 5, 5, 0.1);
}
</style>