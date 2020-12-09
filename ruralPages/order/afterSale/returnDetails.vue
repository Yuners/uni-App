<template>
	<view class="returnDetails">
		<view class="saleInfo">
			<view class="code">
				服务单号：111111
			</view>
			<view class="time">
				申请时间：2017-11-11 17:00
			</view>
		</view>
		<view class="steps">
			<view class="stepTitle" @tap="navTo('/ruralPages/order/afterSale/progress')">
				<view class="text">
					审核进度：
					<text>
						您的服务单财务已退款，请您注意查收
					</text>
				</view>
				<view class="more">
					<u-icon name="arrow-right" size="40" />
				</view>
			</view>
			<view class="stepsMain">
				<uni-steps :options="options" direction="row" :active="0" />
			</view>
		</view>
		<view class="describe">
			<view class="title">
				问题描述
			</view>
			<view class="main">
				拿来看也没看就洗了，发现有些不对劲，吊牌都没有，洗的时候还有泡沫，细看领口有一处缝补的痕迹，虽然是特价买的但是还是感觉很不爽。
			</view>
		</view>
		<view class="message">
			<view class="title">
				问题描述
			</view>
			<view class="main">
				亲爱的客户，很抱歉您的商品出现这样的问题。请准备好商品全套（商品、附件、发票原件、包装）按以下地址寄往优品汇售后部，不支持到付及平邮。如收到商品后情况属实，我们会尽快为您办理。感谢您对的支持。（注：电子发票及换货发票无需退回）。提示：为避免数据遗失或泄露，请您提前做好数据备份，优品汇将不承担相应责任。
			</view>
		</view>
		<view class="shopInfo">
			<view class="site">
				收货地址：广东省深圳市优品汇售后服务部
			</view>
			<view class="name">
				联系姓名：优品汇
			</view>
			<view class="coding">
				邮政编码：518000
			</view>
		</view>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'

	export default {
		data() {
			return {
				options: [{
					title: '买家下单',
					desc: '2018-11-11'
				}, {
					title: '卖家发货',
					desc: '2018-11-12'
				}, {
					title: '买家签收',
					desc: '2018-11-13'
				}, {
					title: '交易完成',
					desc: '2018-11-14'
				}]
			}
		},
		components: {
			uniSteps
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.returnDetails {
		height: 100%;

		.title {
			@include _border($dir: bottom);
			padding: 20rpx 30rpx;
			font-size: $uni-font-size-base;
			color: $uni-text-color;
			line-height: 40rpx;
		}

		.main {
			padding: 30rpx;
			line-height: 1.8;
			font-size: $uni-font-size-sm;
			color: $uni-text-color;
		}

		.saleInfo {
			padding: 30rpx;
			background-color: #FFFFFF;

			@include _border($dir: bottom) .code,
				.time {
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				line-height: 2;
			}
		}

		.steps {
			margin-top: 30rpx;
			background-color: #FFFFFF;

			.stepTitle {
				@include _border($dir: bottom);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 30rpx;

				.text {
					font-size: $uni-font-size-base;
					color: $uni-text-color;

					text {
						font-size: $uni-font-size-sm;
					}
				}
			}

			.stepsMain {
				padding: 50rpx 0;
			}
		}

		.describe,
		.message {
			margin-top: 30rpx;
			background-color: #FFFFFF;
			@include _border($dir: bottom);
		}
		
		.shopInfo{
			background-color: #FFFFFF;
			padding: 30rpx;
			view{
				line-height: 1.8;
				font-size: $uni-font-size-sm;
				color: $uni-text-color;
			}
		}
	}
</style>
