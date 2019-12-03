<template>
  <div class="wrapper">
    <!-- <Title title="报名" /> -->
    <div class="content flex-column">
        <div class="fault-info">
            <div class="samll-title fs-26-color-999">报名信息填写</div>
            <div class="fault-info-content flex-column">
                <div class="item-group flex-row">
                    <div class="name">单位名称:</div>
                    <input type="text" v-model.trim="unitName" placeholder="请输入单位名称">
                </div>
                <div class="item-group flex-row">
                    <div class="name">姓名:</div>
                    <input type="text" v-model.trim="linkPerson" placeholder="请输入姓名">
                </div>
                <div class="item-group flex-row">
                    <div class="name">手机号码:</div>
                    <input type="text" v-model.trim="linkPhone" placeholder="请输入手机号码" maxlength="11">
                </div>
            </div>
        </div>

        <div class="submit" @click="onSignUp">提交</div>
    </div>
  </div>
</template>

<script>

import {Toast} from  'vant';
export default {
  data(){
    return {
        unitName:'',
        linkPerson:'',
        linkPhone:''
    }
  },
  methods:{
    onSignUp(){
        let {unitName, linkPerson, linkPhone} = this;
      if(!this.unitName){
        Toast('请输入单位名称!');
        return;
      }

      if(!this.linkPerson){
        Toast('请输入姓名!');
        return;
      }  
      if(!this.linkPhone){
        Toast('请输入手机号码!');
        return;
      }

      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.linkPhone))){
        Toast('您输入手机号不合法!');
        return
      }

      
      this.$http.post('/wx/engineer/api/courseSignUp',{
        courseId:this.$route.query.courseId,
        unitName,
        linkPerson,
        linkPhone
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
}
</script>
<style lang="scss" scoped>

.bg-000{
    background: #fff;
    margin-top: 40px;
    padding-bottom: 20px;
}
.add{
    margin: 20px 0 16px 24px;
}
.fs-26-color-999{
    color: #999;
    font-size: 26px;
    line-height: 37px;
}

.samll-title{
    margin: 40px 0 16px 24px;
}

.textarea{
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    font-size: 28px;
    padding: 20px;
    background: #f5f5f5;
    resize: none;
}
.device-info-content{
    background: #fff;
    box-sizing: border-box;
    padding: 24px;
    justify-content: space-between;
    align-items: center;
    .device-name{
        color: #000;
        font-size: 34px;
        line-height: 48px;
    }

    .right{
        width: 56px;
        height: 56px;
    }
}

    


.fault-info-content{
    background-color: #fff;
    padding: 0 24px;
    .item-group{
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
    }
    .name{
        color: #000;
        font-size: 34px;

    }
    select, input{
        font-size: 34px;
        width: 500px;
        height: 88px;
        background:rgba(245,245,245,1);
        border-radius:8px;
        border:1px solid rgba(151,151,151,1);
        box-sizing: border-box;
        padding-left: 20px;
    }
}

.submit{
    width:670px;
  height:90px;
  background:rgba(26,173,25,1);
  border-radius:10px;
  border:2px solid rgba(5,5,5,0.08);
  font-size: 36px;
  color: #fff;
  text-align: center;
  line-height: 90px;
  margin:120px auto 0;
}



</style>