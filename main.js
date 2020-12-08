import Vue from "vue"
import App from './App'
import store from "./store";
import flowerPlugin from "@/plugins/fl";
import uView from 'uview-ui';
Vue.use(uView);
Vue.config.productionTip = false
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

Vue.prototype.$msg = msg
Vue.prototype.$prePage = prePage

const app = new Vue({
    ...App,
    store
})

app.$mount(); //为了兼容小程序及app端必须这样写才有效果

