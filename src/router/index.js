import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import BindMobile from '@/components/BindMobile'
import RevisePassword from '@/components/RevisePassword'
import Index from '@/components/Index'
import RepairApply from '@/components/RepairApply'
import DeviceDetail from '@/components/DeviceDetail'
import ReportRepairDetail from '@/components/ReportRepairDetail'
import RepairApplyDetail from '@/components/RepairApplyDetail'
import RepairDetail from '@/components/RepairDetail'
import LogisticsInfo from '@/components/LogisticsInfo'
import DeviceCheck from '@/components/DeviceCheck'
import RepairApplyRecord from "@/components/RepairApplyRecord";

import RepairOrder from "@/components/ENG/RepairOrder";
import EngRepairApplyDetail from "@/components/ENG/EngRepairApplyDetail";
import EngRepairReceipt from "@/components/ENG/EngRepairReceipt";
import EngMyRepairOrderDetail from "@/components/ENG/EngMyRepairOrderDetail";
import EngRepairDetail from "@/components/ENG/EngRepairDetail";


import Nav from '@/components/Nav'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Nav,
      meta:{
        title:'测试Nav Page'
      }
    },
    //登录
    {
      path: '/login',
      name: 'login',   
      component: Login,
      meta:{
        requiresAuth: false,
        title:'登录'
      }
    },
    //绑定手机
    {
      path: '/bindMobile',
      name: 'bindMobile',
      component: BindMobile,
      meta: {
        requiresAuth: false,
        title: '绑定手机号码'
      }
    },
    //修改密码
    {
      path: '/revisePassword',
      name: 'revisePassword',
      component: RevisePassword,
      meta: {
        requiresAuth: false,
        title: '修改密码'
      }
    },
    //首页 设备列表
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        requiresAuth: true,
        title: '设备列表'
      }
    },
    //选择设备列表
    {
      path: '/deviceList',
      name: 'deviceList',
      component: () => import('@/components/DeviceList'),
      meta: {
        requiresAuth: true,
        title: '选择设备'
      }
    },
    //维修申请
    {
      path: '/repairApply',
      name: 'repairApply',
      component: RepairApply,
      meta: {
        requiresAuth: true,
        title: '维修申请'
      }
    },
    //维修申请详情
    {
      path: '/repairApplyDetail',
      name: 'repairApplyDetail',
      component: RepairApplyDetail,
      meta: {
        requiresAuth: true,
        title: '维修申请详情'
      }
    },
    //维修申请记录
    {
      path: '/repairApplyRecord',
      name: 'repairApplyRecord',
      component: RepairApplyRecord,
      meta: {
        requiresAuth: true,
        title: '维修申请记录'
      }
    },

    
    //设备详情
    {
      path: '/deviceDetail',
      name: 'deviceDetail',
      component: DeviceDetail,
      meta: {
        requiresAuth: true,
        title: '设备详情'
      }
    },
    //报修详情
    {
      path: '/reportRepairDetail',
      name: 'reportRepairDetail',
      component: ReportRepairDetail,
      meta: {
        requiresAuth: true,
        title: '报修详情'
      }
    },
    //维修详情 已拒绝 已验收 已报价
    {
      path: '/repairDetail',
      name: 'repairDetail',
      component: RepairDetail,
      meta: {
        requiresAuth: true,
        title: '维修详情'
      }
    },
    //物流详情
    {
      path: '/logisticsInfo',
      name: 'logisticsInfo',
      component: LogisticsInfo,
      meta: {
        requiresAuth: true,
        title: '物流详情'
      }
    },
    //设备验收 评价
    {
      path: '/deviceCheck',
      name: 'deviceCheck',
      component: DeviceCheck,
      meta: {
        requiresAuth: true,
        title: '设备验收'
      }
    },
    //快递维修 凭证
    {
      path: '/r',
      name: 'r',
      component: () => import('@/components/r'), 
      meta: {
        requiresAuth: true,
        title: '维修详情'
      }
    },

    /* ENG  工程师*/
    //维修接单 (我的维修单)
    {
      path: '/repairOrder',
      name: 'repairOrder',
      component: RepairOrder,
      meta: {
        userRole: 2,  //只能工程师访问
        title: '维修工单'
      }
    },
    //维修申请详情 待接单 拒绝原因  回执
    {
      path: '/engRepairApplyDetail',
      name: 'engRepairApplyDetail',
      component: EngRepairApplyDetail,
      meta: {
        userRole: 2 ,//只能工程师访问
        title: '维修申请详情'
      }
    },
    //维修申请  回执填写 
    {
      path: '/engRepairReceipt',
      name: 'engRepairReceipt',
      component: EngRepairReceipt,
      meta: {
        userRole: 2, //只能工程师访问
        title: '维修申请'
      }
    },
    //维修申请详情  我的维修单详情 
    {
      path: '/engMyRepairOrderDetail',
      name: 'engMyRepairOrderDetail',
      component: EngMyRepairOrderDetail,
      meta: {
        userRole: 2 ,//只能工程师访问
        title: '维修申请详情'
      }
    },
    //维修详情   
    {
      path: '/engRepairDetail',
      name: 'engRepairDetail',
      component: EngRepairDetail,
      meta: {
        userRole: 2 ,//只能工程师访问
        title: '维修详情'
      }
    },

    /* 咨询 */ 
    //我的咨询
    {
      path: '/myConsult',
      name: 'myConsult',
      component: () => import('@/components/consult/MyConsult'),
      meta: {
        requiresAuth: true,
        title: '我的咨询'
      }
    },
    //我要咨询
    {
      path: '/consult',
      name: 'consult',
      component: () => import('@/components/consult/consult'),
      meta: {
        requiresAuth: true,
        title: '我要咨询'
      }
    },
    //咨询详情
    {
      path: '/consultDetail',
      name: 'consultDetail',
      component: () => import('@/components/consult/ConsultDetail'),
      meta: {
        requiresAuth: true,
        title: '咨询详情'
      }
    },
    /* 培训 */
    //培训课程
    {
      path: '/trainCourse',
      name: 'trainCourse',
      component: () => import('@/components/train/TrainCourse'),
      meta: {
        requiresAuth: true,
        title: '培训课程'
      }
    },
    //我的培训课程
    {
      path: '/myTrainCourse',
      name: 'myTrainCourse',
      component: () => import('@/components/train/MyTrainCourse'),
      meta: {
        requiresAuth: true,
        title: '我的培训课程'
      }
    },
    //培训课程详情
    {
      path: '/trainDetail',
      name: 'trainDetail',
      component: () => import('@/components/train/TrainDetail'),
      meta: {
        requiresAuth: true,
        title: '培训课程详情'
      }
    },
    //培训课程-报名
    {
      path: '/trainSignup',
      name: 'trainSignup',
      component: () => import('@/components/train/TrainSignup'),
      meta: {
        requiresAuth: true,
        title: '报名'
      }
    },
    
  ]
})



/*
  培训讲座： /trainCourse 
  我的培训: /myTrainCourse

  我要咨询: /consult
  我的咨询： /myConsult

  我是工程师: /repairOrder
  我要报修: /repairApply
  维修记录: http://lfsj.mynatapp.cc/wx_index.html#/repairApplyRecord
  设备列表: /index
*/ 