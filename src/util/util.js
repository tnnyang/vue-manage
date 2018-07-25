const domain = '../static/data/data.json';
import axios from 'axios'
import store from '../vuex'
import router from '../router'
import NProgress from 'nprogress'  //路由切换或数据加载进度条
NProgress.configure({showSpinner: false})   //禁用进度环

export default {
  baseUrl: domain
}

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const token = getCookie("token")
    if(!token && to.path !== '/login'){
        next('/login');
    }else {
        next();
    }
    NProgress.start();    //路由切换时出现进度条
})

//路由切换完成后去掉进度条
// router.afterEach(transition => {
//   NProgress.done();
// });

// router.beforeRouteLeave((to, from, next) => {
//     console.log(1);
// })

// 添加请求拦截器
axios.interceptors.request.use((config) =>{
     config.headers['token'] = getCookie("token");
     return config;
},function(error) {
    return Promise.reject(error);
});

//封装axios post请求
export function apiPost(url, data = {}, type) {
    // let token = getCookie("token");
    // if(type != "login"){
    //     axios.defaults.headers.common['token'] = token;
    // }else{
    //     axios.defaults.headers.common['token'] = "";
    // }

    NProgress.start();  //数据加载时出现进度条
    return new Promise((resolve, reject) => {
        axios.get(url, data, {timeout: 5000}).then((res) => {    //设置请求超时时间5秒
            NProgress.done();    //路由切换完成和数据加载完成后去掉进度条
            if(res.data.code == 401){
                router.push('/login');
            }else{
                resolve(res.data);
            }            
        }).catch((res) => {
            console.log('error:', res);
        });
    });  
}

/* 
* 保存cookies函数  
* name：cookie的名字，value：cookie的值 
* 默认cookie在30天后过期
*/ 
export function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/* 
* 获取cookies函数  
* name：cookie的名字 
*/ 
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

/* 
* 删除cookies函数  
* name：cookie的名字 
*/ 
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//提示弹窗
export function alertMsg(str){
    store.dispatch('showAlert', true);
    store.dispatch('alertMsg', str);
}
//带回调的提示弹窗
export function msgFoo(str, foo){
    store.dispatch('alertCallBack', true);
    store.dispatch('alertMsg', str);
    setTimeout(foo,2000);
}
//升序排列
export function sortByAsc(array, key){
    return array.sort((a, b) => {
        var x = a[key];
        var y = b[key];
        return x - y;
        // return ((x < y) ? -1 : (x > y) ? 1 : 0);
    });
}
//降序排列
export function sortByDesc(array, key){
    return array.sort((a, b) => {
        var x = a[key];
        var y = b[key];
        return y - x;
    });
}