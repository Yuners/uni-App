<template>
	<view class="set">
		<view class="list-cell b-b" @tap="navTo('/pages/Member/userInfo/userInfo')" hover-class="cell-hover">
			<text class="cell-tit">我的资料</text>
			<!-- <text class="cell-tip"></text> -->
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b" @tap="navTo()" hover-class="cell-hover">
			<text class="cell-tit">支付设置</text>
			<!-- <text class="cell-tip"></text> -->
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b" @tap="navTo('/ruralPages/address/address')" hover-class="cell-hover">
			<text class="cell-tit">收货地址</text>
			<!-- <text class="cell-tip"></text> -->
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b" @tap="navTo('/ruralPages/order/evaluation/myRating')" hover-class="cell-hover">
			<text class="cell-tit">我的评价</text>
			<!-- <text class="cell-tip"></text> -->
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b" @tap="navTo('/ruralPages/certification/certification')" hover-class="cell-hover">
			<text class="cell-tit">商户绑定</text>
			<!-- <text class="cell-tip"></text> -->
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b" @tap="navTo('/ruralPages/password/changePass')" hover-class="cell-hover">
			<text class="cell-tit">修改密码</text>
			<!-- <text class="cell-tip"></text> -->
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="list-cell m-t">
			<text class="cell-tit">消息推送</text>
			<switch :checked="notifyChecked" color="#fa436a" />
		</view>
		<!-- #endif -->
		<view class="list-cell log-out-btn text-rf" @tap="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
		<!-- modal -->
	</view>
</template>
<script>
	export default {
		data() {
			return {
				user: {},
				notifyChecked: false,
			};
		},
		onLoad() {
			this.initData();
		},
		methods: {
			// 初始化数据
			initData() {
				this.user = uni.getStorageSync('user');
			},
			// 通用跳转
			navTo(url) {
				uni.navigateTo({
					url
				});
			},
			// 退出登录
			toLogout() {
				uni.showModal({
					content: '确定要退出登录么',
					success: e => {
						if (e.confirm) {
							this.$store.dispatch('user/logout')
								.then(res => {
									if (res.userFlag) {
										this.$msg(res.msg)
										setTimeout( () => {
											uni.navigateBack()
										}, 600)
									} else {
										this.$msg(res.msg)
									}
								})
								.catch(err => {
									console.log(err)
								})
						}
					}
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
