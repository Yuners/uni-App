import directives from "./directives";
import filters from "./filters";

const FlowerPlugin = {};

FlowerPlugin.install = function (Vue, options) {
	/// 注册自定义指令
	for (let name in directives) {
		Vue.directive(name, directives[name]);
	}

	// 注册过滤器
	for (let name in filters) {
		Vue.filter(name, filters[name]);
	}
};

export default FlowerPlugin;
