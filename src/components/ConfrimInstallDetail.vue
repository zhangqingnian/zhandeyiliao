<template>
  <div class="content">
      <div class="hospital module">
        <div class="title">医院安装信息</div>
        <div class="flex-row">
          <div class="name">医院名称：</div>
          <div class="val">{{item.baName}}</div>
        </div>
        <div class="flex-row">
          <div class="name">安装日期：</div>
          <div class="val">{{item.reservationTime | dateFormat}}</div>
        </div>
      </div>

      <div class="device module">
        <div class="title flex-row">
            <div>设备信息</div>
            <div v-if="item.status == 1">
                <van-button type="danger" size="small"  @click="noPass()">确认未通过</van-button>
                <van-button type="warning" size="small" @click="pass()">确认通过</van-button>
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
        <div class="flex-row" v-if="item.status != 1">
          <div class="name">验收状态：</div>
          <div class="val">{{item.status | statusFilters}}</div>
        </div>                                                
      </div>
  </div>
</template>

<script>
import { Button, Dialog,Toast  } from "vant";
export default {
  name:'',
  components:{
    [Button.name]:Button,
    [Dialog.Component.name]: Dialog.Component
  },
  props:{},
  data(){
    return {
      id:this.$route.query.id,
      item:{},
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
    },
    statusFilters(num){
      switch (num) {
        case 2:
          return '通过'
        case 3:
          return '未通过'  
      }
    }
  },
  created(){
    let id = this.$route.query.id;
    this.getDetail(id)
  },
  methods:{
      //通过
      pass(){
        Dialog.confirm({
            title: '提示',
            message: '是否确认该设备安装验收通过'
        }).then(() => {
            this.submit(2)
        }).catch(() => {
        });
      },
      //未通过
      noPass(){
        Dialog.confirm({
            title: '提示',
            message: '是否确认该设备安装验收未通过'
        }).then(() => {
            this.submit(3)
        }).catch(() => {
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
      submit(status){
        this.$http.post('/wx/hospital/api/updateOrganInstall',{
          status,
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
  },
  
}
</script>
<style scoped>
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
</style>