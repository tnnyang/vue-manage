import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/',
		redirect: '/login',
		component: resolve => require(['@/components/login'], resolve)
	},
	{
		path: '/login',
		component: resolve => require(['@/components/login'], resolve)
	},
	{
		path: '/index',
		component: resolve => require(['@/components/index'], resolve),
		children:[
		{
                path: '/',
                component: resolve => require(['../components/accountIndex'], resolve)
            },
            {
                path: '/newOrder',
                component: resolve => require(['../components/newOrder'], resolve)
            },
            {
                path: '/accountInfor',
                component: resolve => require(['../components/accountInfor'], resolve)
            },
            {
                path: '/editPwd',
                component: resolve => require(['../components/editPwd'], resolve)
            },
            {
                path: '/bindWechat',
                component: resolve => require(['../components/bindWechat'], resolve)
            },
            {
                path: '/orderRecord',
                component: resolve => require(['../components/orderRecord'], resolve)
            },
            {
                path: '/overDetail/:id',
                component: resolve => require(['../components/overDetail'], resolve)
            },
            {
                path: '/waitingXiaHu/:model',
                component: resolve => require(['../components/waitingXiaHu'], resolve)
            },
            {
                path: '/overConfirmation/:model',
                component: resolve => require(['../components/overConfirmation'], resolve)
            },
            {
                path: '/addAccountChild',
                component: resolve => require(['../components/addAccountChild'], resolve)
            },
            {
                path: '/childAccountDetail',
                component: resolve => require(['../components/childAccountDetail'], resolve)
            },
            {
                path: '/editAccountChild/:userId',
                component: resolve => require(['../components/editAccountChild'], resolve)
            },
            {
                path: '/waitingXiaHuDetail/:id',
                component: resolve => require(['../components/waitingXiaHuDetail'], resolve)
            }
        ]
	}
  ]
})
