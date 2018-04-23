import types from './types'

const state = {
	showAlert: false,      //公共弹窗
	alertMsg: "",          //公共弹窗的内容
	alertCallBack: false,  //带有回调函数的公共弹窗
	curPage: false,        //分页初始化
	editPwdShow: false     //修改密码弹窗
}

const getters = {
	showAlert: state => state.showAlert,    //这是es6的写法，箭头函数之前的state是参数的意思，如果有两个参数就要加上括号了，就应该写成(state, 参数2)，箭头函数之后的语句如果直接作为返回值的话，是可以省去花括号的。如果不是es6的话，写法为function(state){return state.showAlert}
	alertMsg: state => state.alertMsg,
	alertCallBack: state => state.alertCallBack,
	curPage: state => state.curPage,
	editPwdShow: state => state.editPwdShow
}

const actions = {
	showAlert({commit}, status){
		commit(types.SHOWALERT, status)
	},
	alertMsg({commit}, str) {
        commit(types.ALERTMSG, str)
    },
	alertCallBack({commit}, str) {
        commit(types.ALERTCALLBACK, str)
    },
	curPage({commit}, status) {
        commit(types.PAGEINDEX, status)
    },
	editPwdShow({commit}, status) {
        commit(types.EDITPWDSHOW, status)
    }
}

const mutations = {
	[types.SHOWALERT](state, status){
		state.showAlert = status
	},
	[types.ALERTMSG](state, str){
		state.alertMsg = str
	},
	[types.ALERTCALLBACK](state, status){
		state.alertCallBack = status
	},
	[types.PAGEINDEX](state, status){
		state.curPage = !state.curPage   //这里用了state.curPage的取反操作是为了在多次点击搜索按钮时能及时改变curPage的状态以使得pagination.vue组件中能及时的监听到curPage的改变，如果这里没有用到取反，那么在赋值一次后就没法再次赋值了，它就不会及时改变状态了。
	},
	[types.EDITPWDSHOW](state, status){
		state.editPwdShow = status
	}
}

export default {	
	state,
	getters,
	actions,
	mutations
}