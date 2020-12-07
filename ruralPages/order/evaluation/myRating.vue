<template>
	<view class="rating">
		<view class="rating_list">
			<view class="list-item" v-for="(item,index) of num" :key="index">
				<view class="item_head">
					<view class="userInfo">
						<u-avatar />
						<view class="info">
							<view>呵呵哒</view>
							<view>程序猿/杭州</view>
						</view>
					</view>
					<u-icon name="more-dot-fill" />
				</view>
				<view class="item_main">
					<view class="img_list">
						<image src="https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg"
						 mode="aspectFit" />
						<image src="https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg"
						 mode="aspectFit" />
						<image src="https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg"
						 mode="aspectFit" />
					</view>
					<view class="centent">
						爱过哈几十个雷克萨好搞了凯撒奖管理卡山旮旯忽视了公开爱过哈几十个雷克萨好搞了凯撒奖管理卡山旮旯忽视了公开爱过哈几十个雷克萨好搞了凯撒奖管理卡山旮旯忽视了公开爱过哈几十个雷克萨好搞了凯撒奖管理卡山旮旯忽视了公开爱过哈几十个雷克萨好搞了凯撒奖管理卡山旮旯忽视了公开
					</view>
					<view class="shopInfo">
						<image src="https://img13.360buyimg.com/n8/jfs/t1/30343/20/1029/481370/5c449438Ecb46a15b/2b2adccb6dc742fd.jpg"
						 mode="aspectFit" />
						<view class="info">
							<view class="name">
								大白菜啊大白菜
							</view>
							<view class="size">
								黄色/大
							</view>
							<view class="evaluate">
								好评嘞，已获得50积分
							</view>
						</view>
					</view>
				</view>
			</view>

			<u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" @loadmore="loadMore" margin-bottom="30" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: '',
				num: 5,
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '点击或上拉加载',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
			};
		},
		onReady() {},

		onReachBottom() {
			this.status = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				if (this.num < 20) {
					this.loadMore()
					this.status = 'loadmore';
				} else {
					this.status = 'nomore'
				}
			}, 1000)
		},
		methods: {
			loadMore() {
				this.num = this.num + 5
			},
		}
	}
</script>

<style lang="scss" scoped>
	.rating {
		height: 100%;

		.rating_list {
			padding-top: 30rpx;

			.list-item {
				padding: 30rpx;
				background-color: #FFFFFF;
				margin-bottom: 30rpx;

				.item_head {
					display: flex;
					justify-content: space-between;

					.userInfo {
						display: flex;
						align-items: center;

						.info {
							margin-left: 30rpx;

							view {
								line-height: 1.5;
							}
						}
					}
				}

				.item_main {
					padding-top: 30rpx;

					.img_list {
						display: flex;
						justify-content: space-between;

						image {
							width: calc(85vw / 3);
							height: calc(85vw / 3);
						}
					}

					.centent {
						padding-top: 20rpx;
						font-size: 28rpx;
						color: #000000;
						display: -webkit-box;
						overflow: hidden;
						white-space: normal;
						text-overflow: ellipsis;
						word-wrap: break-word;
						-webkit-line-clamp: 3;
						-webkit-box-orient: vertical;
						line-height: 1.5;
					}

					.shopInfo {
						background-color: $image-bg-color;
						margin-top: 30rpx;
						padding: 30rpx;
						display: flex;

						image {
							width: 160rpx;
							height: 160rpx;
						}

						.info {
							padding-left: 20rpx;
							display: flex;
							flex-direction: column;
							justify-content: space-between;

							view {
								display: -webkit-box;
								overflow: hidden;
								white-space: normal;
								text-overflow: ellipsis;
							}
						}

						.name {
							font-size: 30rpx;
							color: #000000;
						}

						.size {
							font-size: 28rpx;
							color: $font-color-disabled;
						}

						.evaluate {
							font-size: 28rpx;
							color: $font-color-light;
						}
					}
				}
			}
		}
	}
</style>
