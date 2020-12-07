import Vue from "vue"
import App from './App'
import store from "./store";
import flowerPlugin from "@/plugins/fl";
import { RouterMount } from "./router";
import routerLink from "./node_modules/uni-simple-router/component/router-link.vue";
import uView from 'uview-ui';
Vue.use(uView);
Vue.config.productionTip = false
Vue.component("router-link", routerLink);
Vue.use(flowerPlugin);

App.mpType = 'app'

const prePage = ()=>{
    let pages = getCurrentPages();
    let prePage = pages[pages.length - 2];
    // #ifdef H5
    return prePage;
    // #endif
    return prePage.$vm;
}

const msg = (title, duration=1500, mask=false, icon='none')=>{
    //统一提示方便全局修改
    if(Boolean(title) === false){
        return;
    }
    uni.showToast({
        title,
        duration,
        mask,
        icon
    });
}

Vue.prototype.$api = {msg, prePage};

const app = new Vue({
    ...App,
    store
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, "#app");
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
