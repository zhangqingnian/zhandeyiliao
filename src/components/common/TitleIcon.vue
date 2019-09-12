<template>
  <img :src="icon" @click="handleClick" alt="">
</template>

<script>

export default {
  props:{
    name:{
      type:String,
      default:'apply_off'
    }  
  },
  computed:{
      icon(){
          return require("@/assets/img/"+this.name+".png")
      }
  },
  methods:{
    handleClick(){
      this.$parent.$emit('right')
    }
  }
}
</script>