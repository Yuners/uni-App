<template>
	<view class="saleList">
		<view class="">
			<view class="saleItem" v-for="(data,inx) of 5" :key="inx">
				<view class="saleTitle">
					<view class="serveCode">
						服务单号:1111111
					</view>
					<view class="serveTime">
						申请时间:2017-10-10 16:00
					</view>
				</view>
				<view class="shopItem" v-for="(item,index) of 2" :key="index">
					<view class="shopInfo">
						<view class="preImage">
							<image src="../../../static/images/2.jpg" mode="aspectFill" />
						</view>
						<view class="shopDetail">
							<view class="shopName">
								银色星芒刺绣网纱底裤
							</view>
							<view class="shopColor">
								肤色/M
							</view>
							<view class="shopPrice">
								￥99
							</view>
						</view>
						<view class="shopAmount">
							X1
						</view>
					</view>
					<view class="shopState">
						<view class="text">
							<view class="finish">
								<u-icon name="checkbox-mark" color="#FFFFFF" />
							</view>
							<view class="centent">
								已完成
							</view>
						</view>
						<view class="more" @tap="navTo('/ruralPages/order/afterSale/returnDetails')">
							<u-icon name="arrow-right" size="40" />
						</view>
					</view>
				</view>
			</view>
			<u-loadmore margin-bottom="30" :status="loadStatus" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'loadmore',
			}
		},

		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods:{
			navTo(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.saleList {
		height: 100%;

		.saleItem {
			padding: 30rpx;
			background-color: #FFFFFF;
			margin-bottom: 30rpx;

			.saleTitle {
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;

				view {
					font-size: 28rpx;
					color: $uni-text-color;
				}
			}

			.shopItem {
				@include around_border;
				margin-bottom: 30rpx;

				.shopInfo {
					padding: 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: stretch;
					@include _border($dir: bottom, $num:two);

					.preImage {
						image {
							width: 200rpx;
							height: 200rpx;
						}
					}

					.shopDetail {
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						view {
							font-size: 28rpx;
							color: $uni-text-color-grey;
							line-height: 1.8;
						}

						.shopPrice {
							color: $price-related;
							line-height: 1.8;
						}
					}

					.shopAmount {
						color: $font-color-spec;
					}
				}

				.shopState {
					padding: 20rpx 30rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					@include _border($dir: bottom);

					.text {
						display: flex;
						align-items: center;
						flex: 1;
						.finish {
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 50%;
							width: 50rpx;
							height: 50rpx;
							background-color: $uni-color-success;
						}

						.centent {
							font-size: 30rpx;
							color: $uni-text-color;
							margin-left: 20rpx;
						}
					}
					.more{
						flex: 1;
						text-align: right;
					}
				}
			}
		}
	}
</style>
