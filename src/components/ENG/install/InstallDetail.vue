<template>
  <div class="content">
      <div class="hospital module">
        <div class="title">医院安装信息</div>
        <div class="flex-row">
          <div class="name">医院名称：</div>
          <div class="val">{{item.baName}}</div>
        </div>
        <!-- <div class="flex-row">
          <div class="name">医院地址：</div>
          <div class="val">上海市同济医院</div>
        </div> -->
        <div class="flex-row">
          <div class="name">安装日期：</div>
          <div class="val">{{item.reservationTime | dateFormat}}</div>
        </div>
      </div>

      <div class="device module">
        <div class="title flex-row">
            <div>设备信息</div>
            <div v-if="item.installStatus === 0">
                <van-button type="danger" size="small" @click="onfail">安装失败</van-button>
                <van-button type="warning" size="small" @click="onsuccess">安装成功</van-button>
            </div>

        </div>
        <div class="flex-row">
          <div class="name">设备名称：</div>
          <div class="val">{{item.equipmentName}}</div>
        </div>
        <div class="flex-row">
          <div class="name">设备编号：</div>
          <div class="val">{{item.commodityNumber}}</div>
        </div>
        <div class="flex-row">
          <div class="name">设备型号：</div>
          <div class="val">{{item.brandModel}}</div>
        </div>
        <div class="flex-row">
          <div class="name">保修期：</div>
          <div class="val">{{item.warrantyDesc}}</div>
        </div>
        <div class="flex-row">
          <div class="name">安装状态：</div>
          <div class="val">{{item.installStatus | installStatusFilters}}</div>
        </div>
        <div class="flex-row" v-if="item.installRemark">
          <div class="name">安装描述：</div>
          <div class="val text">{{item.installRemark}}</div>
        </div>
        <div class="flex-row" v-else>
          <div class="name">安装描述：</div>
          <textarea placeholder="请输入安装描述" cols="30" rows="10"  v-model.trim="installRemark"></textarea>
        </div>

      </div>
  </div>
</template>

<script>
import { Button, Toast,Dialog  } from "vant";
export default {
  components:{
    [Button.name]:Button,
    [Dialog.Component.name]: Dialog.Component
  },
  data(){
    return {
      installRemark:'',
      id:this.$route.query.id,
      item:{}
    }
  },
  filters:{
    installStatusFilters(num){
      switch (num) {
        case 0:
          return '待处理'
        case 1:
          return '成功'
        case 2:
          return '失败'  
      }
    }
  },
  created(){
    let id = this.$route.query.id;
    this.getDetail(id)
  },
  methods:{
    onfail(){
      Dialog.confirm({
        title: '提示',
        message: '确定安装失败?'
      }).then(() => {
        this.submit(2)
      }).catch(() => {
        // on cancel
      });
    },
    onsuccess(){
      Dialog.confirm({
         title: '提示',
        message: '确定安装成功?'
      }).then(() => {
        this.submit(1)
      }).catch(() => {
        // on cancel
      });
    },
    getDetail(id){
      this.$http.post('/wx/engineer/api/installById',{
        id
      }).then(res => {
        let {code, msg, info} = res.data;
        console.log(res.data)
        if(code == '0'){
          this.item = info
        }else{
          Toast(msg)
        }
      })
    },
    submit(installStatus){
      let installRemark = this.installRemark;
      if(!installRemark){
        Toast('请输入安装描述')
        return
      }
      this.$http.post('/wx/engineer/api/updateInstall',{
        installStatus,
        installRemark,
        id:this.id
      }).then(res => {
        let {code, msg, info} = res.data;
        Toast(msg)
        console.log(res.data)
        if(code == '0'){
          this.getDetail(this.id)
        }
      })
    }
  }
}
</script>
<style scoped>
textarea{
  box-sizing: border-box;
  height: 200px;
  resize: none;
}
.module{
  background: #fff;
  padding: 20px 26px;
  margin-bottom: 20px;
}
.content{
  font-size: 30px;
  color: #333;
}

.title{
  font-size: 34px;
  font-weight: 500;
  margin-bottom: 10px;
}

.hospital .flex-row{
  justify-content: space-between;
  align-items: center;
  line-height: 70px;
  color: #666;
  border-bottom: 1px solid #999;
}

.device .flex-row{
  justify-content: space-between;
  align-items: center;
  line-height: 70px;
  color: #666;
  border-bottom: 1px solid #999;
}
.device .title{
    color: #333;
}
.name{
  flex-basis: 150px;
}

.text{
  line-height: 46px;
  flex: 1;
  text-align: right;
}
</style>