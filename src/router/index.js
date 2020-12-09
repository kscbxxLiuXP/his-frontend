import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: '/dashboard/dashboard'
  },
  { path: '/login', component: () => import('@/views/login'), name: '登录HIS', hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },

  // 首页
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/dashboard',
    meta: { title: '首页', icon: 'dashboard' },
    children: [
      {
        path: 'dashboard',
        name: '首页',
        component: () => import('@/views/dashboard/dashboard'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  }

]

export default new Router({

  routes: constantRouterMap
})
export const asyncRouterMap = [
  // 挂号收费
  {
    path: '/registration',
    component: Layout,
    redirect: '/registration/Register',
    name: '挂号收费',
    meta: { title: '挂号收费', icon: 'registration', roles: ['admin', 'ghy'] },
    children: [
      {
        path: 'Register',
        name: '现场挂号',
        component: () => import('@/views/registration/register'),
        meta: { title: '现场挂号', icon: 'register', roles: ['admin', 'ghy'] }
      },
      {
        path: 'UnRegister',
        name: '退号',
        component: () => import('@/views/registration/unregister'),
        meta: { title: '退号', icon: 'unregister', roles: ['admin', 'ghy'] }
      },
      {
        path: 'charge',
        name: '收费',
        component: () => import('@/views/registration/charge'),
        meta: { title: '收费', icon: 'charge', roles: ['admin', 'ghy'] }
      },
      {
        path: 'refund',
        name: '退费',
        component: () => import('@/views/registration/refund'),
        meta: { title: '退费', icon: 'refund', roles: ['admin', 'ghy'] }
      }
    ]
  },

  // 门诊医生
  {
    path: '/doctor',
    component: Layout,
    redirect: '/doctor/patientIndex',
    name: '门诊医生',
    meta: {
      title: '门诊医生',
      icon: 'doctor'
      , roles: ['admin', 'doctor']
    },
    children: [
      {
        path: 'patientIndex',
        name: '门诊病历',
        component: () => import('@/views/doctor/patientIndex'),
        meta: { title: '门诊病历', icon: 'patientIndex', roles: ['admin', 'doctor'] }
      },
      {
        path: 'checkModelManage',
        name: '医技模板管理',
        component: () => import('@/views/doctor/checkModelManage'),
        meta: { title: '医技模板管理', icon: 'checkModelManage', roles: ['admin', 'doctor'] }
      },
      {
        path: 'prescriptMan',
        name: '处方管理',
        component: () => import('@/views/doctor/prescriptMan'),
        meta: { title: '处方管理', icon: 'prescriptMan', roles: ['admin', 'doctor'] }
      }]
  },

  // 医技处置
  {
    path: '/check',
    component: Layout,
    redirect: '/check/patientCheck',
    name: '医技处置',
    meta: {
      title: '医技处置',
      icon: 'check'
      , roles: ['admin', 'checker']
    },
    children: [
      {
        path: 'patientCheck',
        name: '患者检查',
        component: () => import('@/views/check/patientCheck'),
        meta: { title: '患者检查', icon: 'patientCheck', roles: ['admin', 'checker'] }
      },
      {
        path: 'patientHandle',
        name: '患者处置',
        component: () => import('@/views/check/patientHandle'),
        meta: { title: '患者处置', icon: 'patientHandle', roles: ['admin', 'checker'] }
      }
    ]
  },

  // 药房发药
  {
    path: '/pharmacy',
    component: Layout,
    redirect: '/pharmacy/sendDrug',
    name: '药房管理',
    meta: {
      title: '药房管理',
      icon: 'pharmacy'
      , roles: ['admin', 'pharmacy']
    },
    children: [
      {
        path: 'sendDrug',
        name: '药房发药',
        component: () => import('@/views/pharmacy/sendDrug'),
        meta: { title: '药房发药', icon: 'sendDrug', roles: ['admin', 'pharmacy'] }
      },
      {
        path: 'returnDrug',
        name: '药房退药',
        component: () => import('@/views/pharmacy/returnDrug'),
        meta: { title: '药房退药', icon: 'returnDrug', roles: ['admin', 'pharmacy'] }
      },
      {
        path: 'drugManage',
        name: '药品管理',
        component: () => import('@/views/pharmacy/drugManage'),
        meta: { title: '药品管理', icon: 'drug', roles: ['admin', 'pharmacy'] }
      }
    ]
  },

  // 系统管理
  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/constant',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'settings'
      , roles: ['admin']
    },
    children: [
      {
        path: 'constant',
        name: '常数项管理',
        component: () => import('@/views/settings/constant'),
        meta: { title: '常数项管理', icon: 'constant', roles: ['admin'] }
      },
      {
        path: 'deptMan',
        name: '科室管理',
        component: () => import('@/views/settings/deptMan'),
        meta: { title: '科室管理', icon: 'department', roles: ['admin'] }
      },
      {
        path: 'userMan',
        name: '用户管理',
        component: () => import('@/views/settings/userMan'),
        meta: { title: '用户管理', icon: 'user', roles: ['admin'] }
      },
      {
        path: 'registerLevelMan',
        name: '挂号级别管理',
        component: () => import('@/views/settings/registerLevel'),
        meta: { title: '挂号级别管理', icon: 'registerLevel', roles: ['admin'] }
      },
      {
        path: 'scheduleMan',
        name: '排班管理',
        component: () => import('@/views/settings/scheduleMan'),
        meta: { title: '排班管理', icon: 'schedule', roles: ['admin'] }
      }
    ]
  },

  // 关于
  {
    path: '/about',
    component: Layout,
    redirect: 'about',
    children: [
      {
        path: 'aboutUS',
        name: '关于我们',
        component: () => import('@/views/about/index'),
        meta: { title: '关于', icon: 'about' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }]
