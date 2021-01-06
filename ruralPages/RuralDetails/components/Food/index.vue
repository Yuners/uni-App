<template>
	<view class="food">
		<view v-if="!loading">
			<view class="list_item" v-for="(item,index) of list" :key="index">
				<view class="item_image">
					<u-image :src="item.fileUrl" mode="scaleToFill" width="100%" height="180" border-radius="5">
						<view slot="error" style="font-size: 24rpx;">图片加载失败</view>
					</u-image>
				</view>
				<view class="item_info">
					<view class="foodName">
						{{ item.foodName }}
					</view>
					<view class="feature">
						<view class="feat_item">
							{{ item.foodLabelOne || '' }}
						</view>
						<view v-if="item.foodLabelTwo" class="feat_item">
							{{ item.foodLabelTwo }}
						</view>
					</view>
					<view class="item_about">
						{{ item.describeContent || ''  }}
					</view>
				</view>
			</view>
			<u-loadmore margin-top="40" v-show="list && list.length" :status="status" :icon-type="iconType" :load-text="loadText"
			 @loadmore="loadMore" margin-bottom="130" />
			<u-empty margin-top="300" v-show="!list.length" mode="list"></u-empty>
		</view>
		<view class="loading" v-else>
			<loading></loading>
		</view>
	</view>
</template>

<script>
	import {
		getVillageFood
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
					foodLocationId: this.villageId,
					curPage: this.pages.pageIndex,
					pageSize: this.pages.pageSize,
					isDeleted: 0,
					isDisabled: 0
				}
				getVillageFood(params)
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
			scapeDetails() {
				console.log()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.food {
		min-height: 100%;
		background-color: #F5F5F5;
		padding: 30rpx 30rpx 0;

		.list_item {
			box-sizing: content-box;
			height: 180rpx;
			padding: 30rpx 15rpx;
			background-color: #FFFFFF;
			box-shadow: 0px 7px 12px 0px rgba(235, 235, 235, 0.85);
			border-radius: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.item_image {
				flex: 1;
				box-sizing: border-box;
				padding-right: 30rpx;
			}

			.item_info {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex: 1;

				.foodName {
					font-size: 32rpx;
					color: #333333;
					font-weight: bold;
					overflow: hidden;
				}

				.feature {
					display: flex;

					.feat_item {
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

				.item_about {
					font-size: 24rpx;
					padding: 16rpx;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
				}
			}
		}

		.loading {
			margin-top: 300rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
