<template>
  <div class="content">
      <div>
          <div class="item flex-row"  >
              <div class="left">医院名称:</div>
              <div class="flex-row right">
                  <div>{{item.organName}}</div>
              </div>
          </div>
          <div class="item flex-row" >
              <div class="left">回访日期:</div>
              <div class="flex-row right">
                  <div>{{selectDate}}</div>
                  
              </div>
          </div>
          <div class="item flex-row"  >
              <div class="left">所属设备:</div>
              <div class="flex-row right">
                  <div>{{item.devName}}</div>
                  
              </div>
          </div>
          <div class="item" >
            <textarea class="tex" value='88888' v-model.trim="visitContent" placeholder="请输入回访内容"></textarea>
          </div>
          <div class="loginBtn" @click="submit">确认提交</div>
      </div>
      
      
  </div>
</template>

<script>
import Moment from "moment";
import { Toast } from 'vant';
export default {
  
  data(){
    return {
      flag:0,  //回放textarea的显示  当直接提交时不显示  当从记录进入时 显示0 1
      visitContent:'', //回访内容
      item:{}
    }
  },
  computed:{
    selectDate(){
        return Moment(this.item.revisitTime).format("YYYY-MM-DD HH:mm:ss")
    },
  },
  created(){
    let item = JSON.parse(this.$route.query.item);
    this.item = item;
    this.visitContent = item.visitContent;
    console.log(item)
  },
  methods:{
    submit(){
      if(!this.visitContent){
          Toast('请输入回访内容!')
          return
      }
      this.$http.post('/wx/engineer/api/revisitSave',{
        id:this.item.id,
        organId:this.item.organId,
        reTimes:this.selectDate,
        depIds:this.item.depIds,
        visitContent:this.visitContent,
        flag:this.flag
      }).then(res => {
        let {msg, code} = res.data;
        Toast(msg)
        if(code == '0'){
          this.$router.go(-1)
        }
      })
    },
    
  },
}
</script>
<style lang="scss" scoped>

.item{
    background: #fff;
    box-sizing: border-box;
    padding: 24px;
    justify-content: space-between;
    align-items: center;
    margin-bottom:30px;
}
.left{
    font-size: 32px;
    flex-basis: 160px;
}
.right-r {
  width: 16px;
  height: 26px;
  margin-left: 30px;
}
.right{
  align-items: center;
  font-size: 28px;
  flex: 1;
  flex-direction: row-reverse;
}

.tex{
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  padding: 15px;
  resize: none;
  border: 1px solid #999;
}
.loginBtn{
 margin: 120px auto 0;
}
</style>