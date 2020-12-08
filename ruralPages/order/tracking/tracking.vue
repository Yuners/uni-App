<template>
	<view class="tracking">
		<view class="shopInfo">
			<view class="shopImg">
				<image src="../../../static/images/test.jpg" mode="aspectFill" />
				<view class="imageInfo">
					X件商品
				</view>
			</view>
			<view class="shippInfo">
				<view class="logistics">
					配送企业：顺丰快递
				</view>
				<view class="orderId">
					快递单号：22222222222
				</view>
				<view class="phone">
					联系电话：15555555555
				</view>
			</view>
		</view>
		<view class="steps">
			<u-steps :list="numList" :current="current" active-color="#4FAA81" />
			<view class="location">
				<view class="origin">
					北京市
				</view>
				<view class="destination">
					深圳市
				</view>
			</view>
		</view>
		<view class="shippingDetails">
			<view class="title">
				物流详情
			</view>
			<view class="shippingInfo">
				<u-time-line>
					<u-time-line-item v-for="(item,index) of 5" :key="index">
						<template v-slot:node>
							<view class="u-node" :class="{active:index == 0}">
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-desc">[自提柜]您的快件已放在楼下侧门见一红灯笼停下，喊“芝麻开门”即可。</view>
								<view class="u-order-time">2019-05-08 12:12</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numList: [{
					name: '已发货'
				}, {
					name: '运输中'
				}, {
					name: '派件中'
				}, {
					name: '已签收'
				}, ],
				current: 1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tracking {
		height: 100%;

		.shopInfo {
			display: flex;
			padding: 30rpx 70rpx;
			align-items: center;
			background-color: $base-color;

			.shopImg {
				position: relative;
				width: 200rpx;
				height: 200rpx;
				background-color: #FFFFFF;

				image {
					width: 200rpx;
					height: 200rpx;
				}

				.imageInfo {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					font-size: 26rpx;
					line-height: 2;
					text-align: center;
					background-color: rgba(0, 0, 0, .7);
					color: #FFFFFF;
					z-index: 1;
				}
			}

			.shippInfo {
				margin-left: 50rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				view {
					font-size: 30rpx;
					line-height: 1.8;
					color: #FFFFFF;
				}
			}
		}

		.steps {
			padding: 40rpx 0;
			background-color: #FFFFFF;

			.location {
				display: flex;
				justify-content: space-between;
				padding-top: 30rpx;

				view {
					font-size: 26rpx;
					width: 25%;
					text-align: center;
				}
			}
		}

		.shippingDetails {
			margin-top: 30rpx;
			@include _border($dir: top);
			background-color: #FFFFFF;

			.title {
				padding: 20rpx 30rpx;
				font-size: 30rpx;
				color: #000000;
				@include _border($dir: bottom);
			}

			.shippingInfo {
				padding:30rpx 70rpx;
				.u-node {
						width: 30rpx;
						height: 30rpx;
						border-radius: 50%;
						background: #d0d0d0;
						&.active{
							background-color: #4FAA81;
						}
					}
					
				.u-order-desc {
					color: rgb(150, 150, 150);
					font-size: 28rpx;
					margin-bottom: 6rpx;
				}

				.u-order-time {
					color: rgb(200, 200, 200);
					font-size: 26rpx;
				}
				view{
					line-height: 1.7;
				}
			}
		}
	}
</style>
