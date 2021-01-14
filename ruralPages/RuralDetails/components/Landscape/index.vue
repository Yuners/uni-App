<template>
	<view class="landscape">
		<view class="scenery">
			<view v-if="!loading">
				<view class="list-item" v-for="(item,index) of list" :key="index" @tap="toNav(item.sceneryId)">
					<view class="itemAbout">
						<view class="aboutTitle">
							<text>{{ item.sceneryName }}</text>
						</view>
					</view>
					<view class="backImage">

						<u-image :src="item.fileUrl" mode="scaleToFill" width="100%" height="330" border-radius="5">
							<view slot="error" style="font-size: 24rpx;">图片加载失败</view>
						</u-image>
					</view>
					<view class="lightspot">
						<view class="light-item">
							{{ item.sceneryLabelOne }}
						</view>
						<view v-if="item.sceneryLabelTwo" class="light-item">
							{{ item.sceneryLabelTwo }}
						</view>
					</view>
					<view class="itemAbouts">
						{{ item.describeContent }}
					</view>
				</view>

				<u-loadmore margin-top="40" v-show="list && list.length" :status="status" :icon-type="iconType" :load-text="loadText"
				 @loadmore="loadMore" margin-bottom="130" />
				<u-empty class="noContent" margin-top="300" v-show="!list.length" mode="list"></u-empty>
			</view>
			<view class="loading" v-else>
				<loading></loading>
			</view>
		</view>
	</view>
</template>


<script>
	import {
		getVillageScenery
	} from '@/api/villageDetails.js'

	export default {
		props: {
			villageId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				list: [],
				pages: {
					pageSize: 5, // 每页多少条
					pageIndex: 1, // 当前页数
					total: 0, // 总页数
				},
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '点击或上拉加载',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				loading: true,
			}
		},
		methods: {
			fetchData(type) {
				let params = {
					sceneryLocationId: this.villageId,
					curPage: this.pages.pageIndex,
					pageSize: this.pages.pageSize,
					isDeleted: 0,
					isDisabled: 0
				}
				getVillageScenery(params)
					.then(res => {
						let data = res.data
						if (data.code == '1') {
							if (data.data.length) {
								if (type == 'pull') {
									this.list = []
								}
								this.list = this.list.concat(data.data)
								this.pages.total = data.page.total
								if (this.pages.total <= this.list.length) {
									this.status = 'nomore'
								} else {
									this.status = 'loadmore'
								}
							} else {
								this.status = 'nomore'
							}
						} else {}
						this.loading = false
					})
					.catch(err => {
						console.log(err)
						this.loading = false
					})
			},
			loadMore() {
				if (this.list.length >= this.pages.total) {
					this.status = "nomore";
					return;
				}
				this.pages.pageIndex++
				this.status = 'loading'
				this.fetchData()
			},
			pullRefresh() {
				this.pages.pageIndex = 1
				this.pages.total = 0
				this.fetchData('pull')
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			toNav(id){
				uni.navigateTo({
					url: `/ruralPages/particulars/sceneryDetails?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.landscape {
		min-height: 100%;
		background: #F4F4F4;

		.imageItem {
			width: 36rpx;
			height: 36rpx;

			&:last-child {
				width: 42rpx;
				height: 42rpx;
				margin-right: 31rpx;
				margin-left: 18rpx;
			}
		}

		.scenery {
			position: relative;
			padding: 30rpx 30rpx 0;

			.loading {
				margin-top: 300rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		/* .list-item {
			width: 100%;
			height: 330rpx;
			position: relative;
			margin-bottom: 30rpx;

			.itemAbout {
				width: 100%;
				height: 112rpx;
				padding: 0 30rpx;

				.aboutTitle {
					margin-top: 22rpx;
					margin-bottom: 12rpx;

					text {
						font-size: 30rpx;
						color: #ffffff;
					}

					.burg {
						font-size: 38rpx;
						margin-right: 15rpx;
					}
				}

				.aboutMain {
					text {
						color: #ffffff;
						font-size: 24rpx;
					}
				}
			}
		}*/

		.list-item {
			width: 100%;
			padding: 20rpx 30rpx 0;
			background-color: #FFFFFF;
			box-shadow: 0px 7px 12px 0px rgba(235, 235, 235, 0.85);
			border-radius: 20rpx;
			margin-bottom: 26rpx;

			.itemAbout {
				padding-top: 22rpx;

				.aboutTitle {
					text {
						font-size: 30rpx;
						color: #000000;
						font-weight: bold;
						position: relative;
						z-index: 11;

						&:before {
							content: '';
							position: absolute;
							z-index: -1;
							display: block;
							bottom: -7rpx;
							left: 0;
							width: 100%;
							height: 16rpx;
							background: #ABEBB0;
							border-radius: 8rpx;
						}
					}
				}

				.aboutMain {
					text {
						color: #ffffff;
						font-size: 24rpx;
					}
				}
			}

			.backImage {
				margin-top: 36rpx;
			}

			.lightspot {
				display: flex;
				padding-top: 30rpx;

				.light-item {
					width: 126rpx;
					height: 42rpx;
					background: #F5F5F5;
					margin-right: 30rpx;
					line-height: 42rpx;
					text-align: center;
					font-size: 24rpx;
					color: #4FAA81;
				}
			}

			.itemAbouts {
				font-size: 28rpx;
				text-indent: 56rpx;
				line-height: 1.8;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
			}
		}

	}
</style>
