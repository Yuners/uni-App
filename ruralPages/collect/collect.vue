<template>
	<view class="collect">
		<view class="toggle">
			<view class="togItem" :class="{active:subscript == 0}" @tap="toggle(0)">
				<text>商品</text>
			</view>
			<view class="togItem" :class="{active:subscript == 1}" @tap="toggle(1)">
				<text>名片</text>
			</view>
		</view>
		<view class="scroll-box">
			<view class="inform" v-show="subscript == 0">
					<view
						v-for="(item,index) of 3" :key="index"
						class="order-item"
					>
						<view class="goods-box-single">
							<image class="goods-img" src="https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg" mode="aspectFill"></image>
							<view class="right">
								<text class="title-clamp">臭鸡蛋</text>
								<text class="attr-box">营养丰富</text>
								<text class="price">￥3333</text>
							</view>
						</view>
					</view>
			</view>
			<view class="message" v-show="subscript == 1">
				<view class="notice-item">
					<text class="time">2019-07-26 12:30</text>
					<view class="content">
						<text class="title">新品上市，全场满199减50</text>
						<view class="img-wrapper">
							<image class="pic" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556465765776&di=57bb5ff70dc4f67dcdb856e5d123c9e7&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01fd015aa4d95fa801206d96069229.jpg%401280w_1l_2o_100sh.jpg"></image>
							<view class="cover">
								活动结束
							</view>
						</view>
						<text class="introduce">新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起，新品上市全场2折起</text>
						<view class="bot b-t">
							<text>查看详情</text>
							<text class="more-icon yticon icon-you"></text>
						</view>
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
				subscript: 0,
			}
		},
		onLoad() {

		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			toggle(index) {
				this.subscript = index
			}
		}
	}
</script>

<style lang='scss' scoped>
	.collect {
		height: 100%;
		padding-bottom: 30upx;
		.toggle {
			position: relative;
			display: flex;
			box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);

			.togItem {
				flex: 1;
				line-height: 44px;
				font-size: 30rpx;
				text-align: center;
				background-color: #FFFFFF;

				&:not(:last-child) {
					border-right: 2rpx solid $border-color-light;
				}

				&.active {
					color: $base-color;
				}
			}
		}

		.scroll-box {
			height: calc(100% - 44px);

			.inform,
			.message {
				height: 100%;
				overflow-y: scroll;
			}
			.inform{
				.order-item{
					margin-top: 16rpx;
					background-color: #FFFFFF;
					display: flex;
					padding:40rpx 30rpx ;
					.goods-box-single{
						display: flex;
						align-items: center;
						image{
							width: 160rpx;
							height: 160rpx;
						}
						.right{
							display: flex;
							flex-direction: column;
							height: 100%;
							justify-content: space-between;
							padding:10rpx 0;
							padding-left: 30rpx;
							text{
								display: flex;
							}
						}
					}
				}
			}
		}
	}

	.notice-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80upx;
		padding-top: 10upx;
		font-size: 26upx;
		color: #7d7d7d;
	}

	.content {
		width: 710upx;
		padding: 0 24upx;
		background-color: #fff;
		border-radius: 4upx;
	}

	.title {
		display: flex;
		align-items: center;
		height: 90upx;
		font-size: 32upx;
		color: #303133;
	}

	.img-wrapper {
		width: 100%;
		height: 260upx;
		position: relative;
	}

	.pic {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 6upx;
	}

	.cover {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 36upx;
		color: #fff;
	}

	.introduce {
		display: inline-block;
		padding: 16upx 0;
		font-size: 28upx;
		color: #606266;
		line-height: 38upx;
	}

	.bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80upx;
		font-size: 24upx;
		color: #707070;
		position: relative;
	}

	.more-icon {
		font-size: 32upx;
	}
</style>
