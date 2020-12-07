import Vue from 'vue'
import Router, {RouterMount} from 'uni-simple-router';
Vue.use(Router)

console.log(ROUTES);

const router = new Router({
    routes: ROUTES
});

router.beforeEach((to, from, next) => {
    console.log(to,from)
    next()
})


export {
    RouterMount,
    Router
}
