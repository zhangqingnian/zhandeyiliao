<template>
   <div class="title flex-row">
        <img @click="goBack" v-if="back" class="left" src='../../assets/img/back.png' >
        <div class="logowarp">
            <span>{{title}}</span>
        </div>
        
        <img v-if="right" @click="rigthFn"  class="right" src='../../assets/img/apply_off.png' />
    </div> 
</template>

<script>
import Vue from 'vue';

export default {
  name: 'myTitle',
  props:{
    title:{
      type:String
    },
    back:{
      type:Boolean,
      default:true
    },
    right:{
      type:Boolean,
      default:false
    },
    rigthFn:{
      type:Function
    }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    },
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .flex-row{
      display: flex;
      flex-direction: row;
    }
    

    .title{
      justify-content: center;
      width: 100%;
      height: 88px;
      color: #fff;
      background:linear-gradient(135deg,rgba(240,95,87,1) 0%,rgba(227,79,71,1) 100%);
      font-size: 37px;
      position: fixed;
      top:0;
      z-index: 9999;
    }
    .logowarp{
      display: flex;
      align-items: center;
    }
   
    .left{
      position: absolute;
      width: 20px;
      height: 34px;
      padding: 27px 24px;
      left: 0;
    }
    .right{
      position: absolute;
      width: 55px;
      height: 56px;
      top: 16px;
      right: 25px;
    }
</style>