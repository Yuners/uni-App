<template>
	<view class="homestay">
		<view v-if="!loading">
			<view class="stayItem" v-for="(item,index) of list" :key="index" @tap="ruralSkip(item.bedLocationId)">
				<view class="backImage">
					<u-image :src="item.fileUrl" mode="scaleToFill" height="304" />
					<view class="village">
						<text>{{ item.villageName }}</text>
					</view>
				</view>
				<view class="itemAbout">
					<view class="aboutTitle">
						<text>{{ item.bedName }}</text>
					</view>
					<view class="aboutMain">
						<view class="info">
							<view class="trait">
								{{ item.bedLabelOne }}
							</view>
							<view class="trait">
								{{ item.bedLabelTwo }}
							</view>
						</view>
						<view class="price">
							<text>￥{{ item.bedPrice }}</text>
							起
						</view>
					</view>
				</view>
			</view>
			<u-loadmore v-show="list && list.length" :status="status" :icon-type="iconType" :load-text="loadText" @loadmore="loadMore"
			 margin-bottom="30" />
			<u-empty v-show="!list && !list.length" mode="list"></u-empty>
		</view>
		<view class="loading" v-else>
			<loading></loading>
		</view>
	</view>
</template>

<script>
	import {
		getBedList
	} from '@/api/country.js'


	export default {
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
		created() {
			// this.fetchData()
		},
		methods: {
			fetchData(type) {
				let params = {
					curPage: this.pages.pageIndex,
					pageSize: this.pages.pageSize,
					isDeleted: 0,
					isDisabled: 0
				}
				getBedList(params)
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
			ruralSkip(id) {
				uni.navigateTo({
					url: `/ruralPages/RuralDetails/index?id=${id}`,
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.loading {
		margin-top: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.stayItem {
		padding: 30rpx;
		padding-bottom: 53rpx;
		border-bottom: 2rpx solid rgba(0, 0, 0, .1);
		margin-bottom: 25rpx;

		.backImage {
			position: relative;

			.village{
				position: absolute;
				bottom: 0;
				left: 0;
				
				text{
					font-size: 32rpx;
					color: #FFFFFF;
					line-height: 1.5;
					padding-left: 15rpx;
				}
			}
		}

		.itemAbout {
			padding-top: 35rpx;

			.aboutTitle {
				text {
					color: #000000;
					font-size: 30rpx;
				}
			}

			.aboutMain {
				padding-top: 24rpx;
				display: flex;
				justify-content: space-between;

				.info {
					display: flex;
					justify-content: flex-start;
					align-items: flex-end;

					.score {
						margin-right: 30rpx;

						text {
							color: #FFBA00;
							font-size: 36rpx;
						}
					}

					.trait {
						margin-right: 30rpx;
						color: #959595;
						font-size: 24rpx;
					}
				}

				.price {
					font-size: 24rpx;
					color: #959595;

					text {
						color: #FF0A00;
						font-size: 36rpx;

						&:last-child {
							margin-right: 12rpx;
						}
					}
				}
			}
		}
	}
</style>
