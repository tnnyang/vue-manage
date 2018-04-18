const domain = 'http://127.0.0.1:7073/sv_pc/api';
import axios from 'axios'
import store from '../vuex'
import router from '../router'
import NProgress from 'nprogress'  //路由切换或数据加载进度条
NProgress.configure({showSpinner: false})   //禁用进度环

export default {
  baseUrl: domain
}

//导航钩子  判断是否登陆
router.beforeEach((to, from, next) => {
    if(getCookie("token")){       
        next();
    }else{
        if(to.path == '/login'){  //如果是登录页面路径，就直接next()
            next();
        }else{     //否则就跳转到登录
            next('/login');
        }
    }
    NProgress.start();    //路由切换时出现进度条
})

//路由切换完成后去掉进度条
// router.afterEach(transition => {
//   NProgress.done();
// });

//封装axios post请求
export function apiPost(url, data, type) {
    let token = getCookie("token");
    if(type != "login"){
        axios.defaults.headers.common['token'] = token;
    }else{
        axios.defaults.headers.common['token'] = "";
    }

    NProgress.start();  //数据加载时出现进度条
    return new Promise((resolve, reject) => {
        axios.post(url, data).then((res) => {
            NProgress.done();    //路由切换完成和数据加载完成后去掉进度条
            if(res.data.code == 401){
                router.push('/login');
            }else{
                resolve(res.data);
            }
            
        }).catch((res) => {
            console.log('error', res);
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