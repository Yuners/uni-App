<template>
	<view class="set">
		<view
			class="list-cell b-b"
			@tap="navTo('clearCache')"
			hover-class="cell-hover"
		>
			<text class="cell-tit">清除缓存</text>
			<text class="cell-tip">{{ cache }}</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view
			class="list-cell b-b"
			@tap="navTo('/pages/settings/feedback')"
			hover-class="cell-hover"
		>
			<text class="cell-tit">意见反馈</text>
			<!-- <text class="cell-tip"></text> -->
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view
			class="list-cell b-b"
			@tap="navTo('/pages/settings/about')"
			hover-class="cell-hover"
		>
			<text class="cell-tit">关于我们</text>
			<!-- <text class="cell-tip"></text> -->
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view
			class="list-cell b-b"
			@tap="navTo('/pages/settings/imprint')"
			hover-class="cell-hover"
		>
			<text class="cell-tit">版本说明</text>
			<!-- <text class="cell-tip"></text> -->
			<text class="cell-more iconfont iconyou"></text>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			user: {},
			notifyChecked: false,
			cache:'0 kb'
		};
	},
	onLoad() {
		this.initData();
	},
	methods: {
		// 初始化数据
		initData() {
			this.user = uni.getStorageSync('user');
			// 缓存大小
			this.cache = `${uni.getStorageInfoSync().currentSize} kb`;
		},
		// 通用跳转
		navTo(route) {
			if (route === 'clearCache') {
				uni.showModal({
					content: '确定要清除缓存吗',
					success: e => {
						if (e.confirm) {
							uni.clearStorageSync();
							this.cache = '0 kb';
							console.log('清除成功')
						}
					}
				});
				return;
			}
			this.$Router.push({
				path:route
			});
		},
	}
};
</script>
<style lang="scss">
page {
	background: $page-color-base;
}
.set {
	padding: $spacing-base 0;
}
.cu-list.card-menu {
	margin: $spacing-base 0;
	.title {
		margin-left: $spacing-base;
	}
}
</style>
