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



Vue.use(Router)

export default new Router({
  routes: [
    //登录
    {
      path: '/login',
      name: 'login',   
      component: Login,
      meta:{
        requiresAuth: false
      }
    },
    //绑定手机
    {
      path: '/bindMobile',
      name: 'bindMobile',
      component: BindMobile,
      meta: {
        requiresAuth: false
      }
    },
    //修改密码
    {
      path: '/revisePassword',
      name: 'revisePassword',
      component: RevisePassword,
      meta: {
        requiresAuth: false
      }
    },
    //首页
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        requiresAuth: true
      }
    },
    //维修申请
    {
      path: '/repairApply',
      name: 'repairApply',
      component: RepairApply,
      meta: {
        requiresAuth: true
      }
    },
    //维修申请详情
    {
      path: '/repairApplyDetail',
      name: 'repairApplyDetail',
      component: RepairApplyDetail,
      meta: {
        requiresAuth: true
      }
    },
    //维修申请记录
    {
      path: '/repairApplyRecord',
      name: 'repairApplyRecord',
      component: RepairApplyRecord,
      meta: {
        requiresAuth: true
      }
    },

    
    //设备详情
    {
      path: '/deviceDetail',
      name: 'deviceDetail',
      component: DeviceDetail,
      meta: {
        requiresAuth: true
      }
    },
    //报修详情
    {
      path: '/reportRepairDetail',
      name: 'reportRepairDetail',
      component: ReportRepairDetail,
      meta: {
        requiresAuth: true
      }
    },
    //维修详情 已拒绝 已验收 已报价
    {
      path: '/repairDetail',
      name: 'repairDetail',
      component: RepairDetail,
      meta: {
        requiresAuth: true
      }
    },
    //物流详情
    {
      path: '/logisticsInfo',
      name: 'logisticsInfo',
      component: LogisticsInfo,
      meta: {
        requiresAuth: true
      }
    },
    //设备验收 评价
    {
      path: '/deviceCheck',
      name: 'deviceCheck',
      component: DeviceCheck,
      meta: {
        requiresAuth: true
      }
    },

    /* ENG */
    //维修接单 (我的维修单)
    {
      path: '/repairOrder',
      name: 'repairOrder',
      component: RepairOrder,
      meta: {
        requiresAuth: true
      }
    },
    //维修申请详情 待接单 拒绝原因  回执
    {
      path: '/engRepairApplyDetail',
      name: 'engRepairApplyDetail',
      component: EngRepairApplyDetail,
      meta: {
        requiresAuth: true
      }
    },
    //维修申请  回执填写 
    {
      path: '/engRepairReceipt',
      name: 'engRepairReceipt',
      component: EngRepairReceipt,
      meta: {
        requiresAuth: true
      }
    },
    //维修申请详情  我的维修单详情 
    {
      path: '/engMyRepairOrderDetail',
      name: 'engMyRepairOrderDetail',
      component: EngMyRepairOrderDetail,
      meta: {
        requiresAuth: true
      }
    },
    //维修详情   
    {
      path: '/engRepairDetail',
      name: 'engRepairDetail',
      component: EngRepairDetail,
      meta: {
        requiresAuth: true
      }
    },

    /* 咨询 */ 
    {
      path: '/myConsult',
      name: 'myConsult',
      component: () => import('@/components/consult/MyConsult'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/consult',
      name: 'consult',
      component: () => import('@/components/consult/consult'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/consultDetail',
      name: 'consultDetail',
      component: () => import('@/components/consult/ConsultDetail'),
      meta: {
        requiresAuth: true
      }
    },
    /* 培训 */
    {
      path: '/trainCourse',
      name: 'trainCourse',
      component: () => import('@/components/train/TrainCourse'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/trainDetail',
      name: 'trainDetail',
      component: () => import('@/components/train/TrainDetail'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/trainSignup',
      name: 'trainSignup',
      component: () => import('@/components/train/TrainSignup'),
      meta: {
        requiresAuth: true
      }
    },
    
  ]
})
