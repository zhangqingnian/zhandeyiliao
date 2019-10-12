<template>
  <div class="wrapper">
    <!-- <my-title title="我要咨询" :right="true"></my-title> -->
    <div class="content flex-column">
        <div class="item">
            <div class="title">单位名称：</div>
            <div class="warp">
              <input class="input" type="text" v-model.trim="unitName">
            </div>        
        </div>
        <div class="item">
            <div class="title">联系人：</div>
            <div class="warp">
              <input class="input" type="text" v-model.trim="linkPerson">
            </div>        
        </div>
        <div class="item">
            <div class="title">联系电话：</div>
            <div class="warp">
              <input class="input" type="text" v-model.trim="linkPhone" maxlength="11">
            </div>        
        </div>
        <div class="item">
            <div class="title">问题描述：</div>
            <div class="warp">
              <textarea class="textarea" 
              placeholder="请尽量清晰描述您要咨询的问题，客服人员将尽快回复您！" v-model="content"></textarea>
            </div>        
        </div>
        <div class="loginBtn" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import myTitle from "@/components/common/MyTitle";
import { Toast} from "vant";
export default {
  components: {
    myTitle,
  },
  data() {
    return {
      unitName:'',
      linkPerson:'',
      linkPhone:'',
      content:''
    };
  },
  methods: {
    submit(){
      let {unitName, linkPerson, linkPhone, content} = this;
      if(!unitName){
        Toast('请输入单位名称!');
        return
      }
      if(!linkPerson){
        Toast('请输入联系人!');
        return
      }
      if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(linkPhone))){
        Toast('请输入合法的联系方式!');
        return
      }
      if(!content){
        Toast('请输入问题内容!');
        return
      }
      this.$http.post('/wx/engineer/api/consultSave',{
        unitName,
        linkPerson,
        linkPhone,
        content
      }).then(res => {
        let {code, msg} = res.data;
        Toast(msg);
        if(code == '0'){
          this.$router.push({
            name:'myConsult'
          })
        }
      })
    }
  },
};
</script>
<style lang="scss"  scoped>
.item{
  
  .input{
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    border: 1px solid #979797;
    font-size: 28px;
    color: #323232;
    padding-left: 15px;
    background-color: #F5F5F5;
  }
  .textarea{
    resize: none;
    width: 100%;
    min-height: 200px;
    box-sizing: border-box;
    border: 1px solid #979797;
    font-size: 28px;
    color: #323232;
    padding: 20px;
    background-color: #F5F5F5;
  }
  .warp{
    width: 100%;
    box-sizing: border-box;
    background: #fff;
    padding: 16px 24px;
  }
  .title{
    padding: 0 24px;
    margin-bottom: 16px;
    margin-top: 24px;
    color: #999999;
  }
}

.loginBtn{
  position: fixed;
  bottom: 40px;
  left: 0;right: 0;
  margin: 0 auto;
}
</style>