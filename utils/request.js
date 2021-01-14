/**
 * 文档参考:https://www.quanzhan.co/luch-request
 * github:https://github.com/lei-mu/luch-request
 * 类似axios的api
 */
import Request from "luch-request";
import config from "@/config";
import store from "@/store";

let count = 1;

/**
 * 请求实例
 */
const http = new Request({
	baseURL: config.baseApiUrl,
});

/**
 * 请求拦截
 */
http.interceptors.request.use(
	async config => {
			/* let token = null;

			try {
				token = uni.getStorageSync("token");
			} catch (err) {
				console.error("请求拦截：", err);
			}

			token &&
				(config.header = {
					...console.header,
					Authorization: "Bearer " + token,
				}); */

			return config;
		},
		config => {
			return Promise.reject(config);
		}
);

/**
 * 响应拦截
 */
http.interceptors.response.use(
	async response => {
				/**
				 * 这里不用检查微信登录态是否过期，在路由权限的时候需要登录的页面就已经不让进入了
				 * 1005：登录过期
				 * 1004：无权限访问
				 */
			/* let rejectPaht = "/subPackages/login/index";

			try {
				if (response.data.code === 1005) {
					if (count === 1 && router.$Route.path !== rejectPaht) {
						uni.showToast({
							title: "未登录或登录已过期",
							icon: "none",
						});
					}
					count++;

					setTimeout(() => {
						store.dispatch("logout").then(() => {
							router.$Route.path !== rejectPaht && router.push(rejectPaht);
						});

						count = 1;
					}, 1000);
				}
			} catch (err) {
				console.error("响应拦截:", err);
			} */
			return response.data;
		},
		response => {
			return Promise.reject(response);
		}
);

function checkSession() {
	return new Promise((resolve, reject) => {
		uni.checkSession({
			success() {
				resolve(true);
			},
			fail() {
				resolve(false);
			},
		});
	});
}


export default http;
