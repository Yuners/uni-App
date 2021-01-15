<template>
	<view class="app">
		<view class="price-box">
			<view class="payTime">
				<view class="hint">
					订单提交成功
				</view>
				<view class="times">
					请在
					<timer v-if="startTime && pastDueTime" :start="startTime" :finish="pastDueTime" />内完成支付
				</view>
			</view>
			<text>支付金额</text>
			<text class="price">{{ payPrice }}</text>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @click="changePayType(1)">
				<view class="icon">
					<u-icon name="zhifubao" color="#01aaef" size="48"></u-icon>
				</view>
				<view class="con">
					<text class="tit">支付宝支付</text>
					<text>推荐使用支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#4FAA81" :checked='payType == 1' />
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(2)">
				<view class="icon">
					<u-icon name="weixin-fill" color="#36cb59" size="48"></u-icon>
				</view>
				<view class="con">
					<text class="tit">微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#4FAA81" :checked='payType == 2' />
				</label>
			</view>
		</view>

		<text class="mix-btn" @click="confirm">确认支付</text>
	</view>
</template>

<script>
	import Timer from "@/ruralPages/components/fl-timer/fl-timer.vue"
	import { payment, confirmPay } from "@/api/order.js"

	export default {
		data() {
			return {
				payType: 1,
				orderId: '',
				payPrice: 0,
				startTime: 0,
				pastDueTime: 0,
			}
		},
		components: {
			Timer
		},
		onLoad(option) {
			if (option) {
				this.orderId = Number(option.orderId)
				this.payPrice = Number(option.payPrice)
				this.startTime = new Date().getTime()
				this.pastDueTime = option.createTime * 1000 + 60 * 60 * 1000
			}
		},
		methods: {
			// 唤起支付
			openPayment(type,info){
				let _this = this
				uni.requestPayment({
				    provider: type,
				    orderInfo: info, //微信、支付宝订单数据
				    success: function (res) {
						let params = {
							reqOrderId: _this.orderId,
							plantPayFlag: _this.payType,
							payType: 1,
						}
						confirmPay(params)
							.then( res => {
								console.log(res)
							})
						_this.$msg('支付成功')
						setTimeout( _ => {
							uni.redirectTo({
								url: '/ruralPages/money/paySuccess'
							})
						}, 1000)
				    },
				    fail: function (err) {
						_this.$msg('支付失败')
						console.log(err)
				    }
				});
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			//确认支付
			confirm: async function() {
				let params = {
					reqOrderId: this.orderId,
					plantPayFlag: this.payType,
					payType: 1,
				}
				payment(params)
					.then( res => {
						if ( res.data.code == 1 ) {
							let data = res.data.data
							console.log(data)
							uni.getProvider({
								service: 'payment',
								success: (res) => {
									if (~res.provider.indexOf('alipay') && this.payType == 1){
										this.openPayment('alipay', data.payStr)
									}
								}
							});
						}
					})
					.catch( err => {
						console.log(err)
					})
			},
		}
	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.payTime {
			text-align: center;

			.hint {
				font-size: 36rpx;
				margin-bottom: 20rpx;
			}

			.times {
				display: flex;
				font-size: 32rpx;
				margin-bottom: 20rpx;
			}
		}

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
			width: 100upx;
			font-size: 52upx;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(69, 201, 77, 0.4);
	}
</style>
