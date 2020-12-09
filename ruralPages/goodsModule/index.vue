<template>
	<view class="goodsModule">
		<view class="goodData">
			<view class="today">
				<view class="block">
					<view class="icon">
						<u-icon name="order" size="80" />
					</view>
					<view class="right_main">
						<view class="title">
							今日订单总数
						</view>
						<view class="num">
							20
						</view>
					</view>
				</view>
				<view class="block">
					<view class="icon">
						<u-icon name="rmb-circle" size="80" />
					</view>
					<view class="right_main">
						<view class="title">
							今日销售总额
						</view>
						<view class="num">
							￥540.00
						</view>
					</view>
				</view>
			</view>
			
			<view class="pending">
				<view class="title">
					待处理事务
				</view>
				<view class="orderClass">
					<view class="block">
						<view class="orderName">
							代付款订单
						</view>
						<view class="num">
							(<text>11</text>)
						</view>
					</view>
					<view class="block">
						<view class="orderName">
							代付款订单
						</view>
						<view class="num">
							(<text>11</text>)
						</view>
					</view>
					<view class="block">
						<view class="orderName">
							代付款订单
						</view>
						<view class="num">
							(<text>11</text>)
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="itemIcon">
			<view class="list-item">
				<view class="item">
					<view class="icon">
						<image src="../../static/svg/addGoods.svg" />
					</view>
					<view class="name">
						添加商品
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/svg/shopAdmin.svg" />
					</view>
					<view class="name">
						商品管理
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/svg/order.svg" />
					</view>
					<view class="name">
						订单管理
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/svg/afterSale.svg" />
					</view>
					<view class="name">
						售后服务
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/svg/freight.svg" />
					</view>
					<view class="name">
						运费设置
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/svg/promotion.svg" />
					</view>
					<view class="name">
						促销优惠
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/svg/orders-received.svg" />
					</view>
					<view class="name">
						订单统计
					</view>
				</view>
				<view class="item">
					<view class="icon">
						<image src="../../static/svg/sales-statistics.svg" />
					</view>
					<view class="name">
						销售统计
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.goodsModule {
		height: 100%;
		display: flex;
		flex-direction: column;
		.goodData{
			padding: 0 30rpx;
			margin-bottom: 30rpx;
			
			.today {
				display: flex;
				margin-top: 30rpx;
			
				.block {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: stretch;
			
					.right_main {
						margin-left: 20rpx;
			
						.title {
							font-size: $uni-font-size-sm;
							color: $uni-text-color;
							line-height: 1.8;
						}
			
						.num {
							font-size: $uni-font-size-sm;
							color: $price-related;
							line-height: 1.8;
						}
					}
				}
			}
				
			.pending{
				border-radius: 20rpx;
				background-color: #FFFFFF;
				padding: 20rpx 40rpx;
				margin-top: 30rpx;
				.title{
					text-align: center;
					font-size: $uni-font-size-base;
					color: $uni-text-color;
					line-height: 1.8;
				}
				.block{
					display: flex;
					margin-bottom: 10rpx;
					.orderName{
						flex: 1;
						font-size: $uni-font-size-sm;
						color: $uni-text-color;
						line-height: 1.8;
					}
					.num{
						flex: 1;
						font-size: $uni-font-size-sm;
						color: $uni-text-color;
						line-height: 1.8;
						text{
							color: $price-related;
						}
					}
				}
			}
		}
		
		
		.itemIcon{
			flex: 1;
			background-color: #FFFFFF;
			padding: 30rpx;
			padding-top: 50rpx;
			.list-item{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				.item{
					width: 25%;
					text-align: center;
					margin-bottom: 30rpx;
					.icon{
						image{
							width: 70rpx;
							height: 70rpx;
						}
					}
					.name{
						font-size: $uni-font-size-base;
						color: $uni-text-color;
						margin-top: 20rpx;
					}
				}
			}
		}
	}
</style>
