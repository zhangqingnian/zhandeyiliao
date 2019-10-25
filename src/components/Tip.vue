<template>
  <div class="wrapper">
      请点击右上角打开浏览器下载
      <!-- <button @click="download">点击</button> -->
  </div>
</template>

<script>
import { baseURL } from "@/baseUrl";
import $ from 'jquery';
export default {
  created(){
      let _href = window.location.href
        if (_href.indexOf('&replace=1') <= -1) {
            window.location.replace(_href+'&replace=1')
        }
  }, 
  mounted(){
      if(!this.getIsWxClient()){
          this.download()
      }
      
  } , 
  methods:{
    download(){
        let url = baseURL + 'file/downloadFile';
        this.downFile({
            url,
            data:this.$route.query
        })
    },
       downFile(options){
        var config = $.extend(true, { method: 'post' }, options);
        var $iframe = $('<iframe id="down-file-iframe" />');
        var $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
        $form.attr('action', config.url);
        for (var key in config.data) {
            $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
        }
        $iframe.append($form);
        $(document.body).append($iframe);
        $form[0].submit();
        $iframe.remove();
        
    }, 
    getIsWxClient() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        }
        return false;
    }
  },
}
</script>
<style scoped>
</style>