<template>
  <div class="wrapper">
      <my-title title="咨询详情" :right="true"></my-title>
      <div class="content flex-column">
        <div class="item">
            <div class="title">问题概要：</div>
            <div class="warp">
              <input class="input" disabled type="text" value="华山医院公开课如何报名？">
            </div>        
        </div>
        <div class="item">
            <div class="title">问题描述：</div>
            <div class="warp">
              <textarea class="textarea" placeholder="填写问题描述"></textarea>
            </div>        
        </div>
        <div class="item">
            <div class="title">客服回答：</div>
            <div class="warp">
              <div class="textarea">
                  申请书最核心的是表述愿望、提出请求（不要太长，说清楚自己请求就好，太长反而适得其反）申请书的写作格式一般来讲都是固定的，它的内容主要包括五个部分：标题、称呼、正文、结尾、落款。 (一)标题申请书一般由申请内容和文种名共同构成。题目要在申请书第一行的正中书写，而且字体要稍大。
              </div>
            </div>        
        </div>
        <div class="item">
            <div class="title">我要留言：</div>
            <div class="warp">
              <textarea class="textarea" placeholder="请尽量清晰描述您要咨询的问题，客服人员将尽快回复您！"></textarea>
            </div>        
        </div>
        <div class="loginBtn">提交</div>
    </div>
  </div>
</template>

<script>
import myTitle from "@/components/common/MyTitle";
export default {
  components:{
      myTitle
  },
  props:{},
  data(){
    return {
    }
  },
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>
<style lang='scss' scoped>
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
    min-height: 120px;
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