<template>
	<view class="wrap">
		<view v-if="!loading">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @tap="payOrder">
						<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
						<u-lazy-load threshold="-450" :image="item.fileUrl" :index="index" />
						<view class="wrapMain">
							<view class="demo-title">
								<text class="read">
									{{ item.specialtyTypeName }}
								</text>
								{{item.specialtyName}}
							</view>
							<view class="demo-price">
								<view class="price">
									￥{{item.specialtyShowPrice}}
								</view>
								<view class="people">
									{{item.shop || '1'}}人累计付款
								</view>
							</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter warRight" v-for="(item, index) in rightList" :key="index" @tap="payOrder">
						<u-lazy-load threshold="-450" :image="item.fileUrl" :index="index" />
						<view class="wrapMain">
							<view class="demo-title">
								<text class="read">
									{{ item.specialtyTypeName }}
								</text>
								{{item.specialtyName}}
							</view>
							<view class="demo-price">
								<view class="price">
									￥{{item.specialtyShowPrice}}
								</view>
								<view class="people">
									{{item.shop || '1'}}人累计付款
								</view>
							</view>
						</view>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore v-show="flowList && flowList.length" :status="loadStatus" :icon-type="iconType" :load-text="loadText"
			 @loadmore="loadMore" margin-bottom="30" />
			<u-empty class="noContent" margin-top="300" v-show="!flowList.length" mode="list"></u-empty>
		</view>
		<view class="loading" v-else>
			<loading></loading>
		</view>
	</view>
</template>

<script>
	import {
		getSpecialtyList
	} from "@/api/country.js"

	export default {
		props: {
			villageId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				background: {
					backgroundColor: '#4FAA81',
				},
				keyword: '',
				searchStyle: {
					fontSize: '24rpx'
				},
				pages: {
					pageSize: 10, // 每页多少条
					pageIndex: 1, // 当前页数
					total: 0, // 总页数
				},
				loadStatus: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '点击或上拉加载',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				flowList: [],
				loading: true,
			}
		},
		onReady() {
			this.getList()
		},
		methods: {
			loadMore() {
				if (this.flowList.length >= this.pages.total) {
					this.loadStatus = "nomore";
					return;
				}
				this.pages.pageIndex++
				this.loadStatus = 'loading'
				this.getList()
			},
			pullRefresh() {
				this.pages.pageIndex = 1
				this.pages.total = 0
				this.getList('pull')
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			getList(type) {
				let params = {
					specialtyLocationId: this.villageId,
					curPage: this.pages.pageIndex,
					pageSize: this.pages.pageSize,
					isDeleted: 0,
					isDisabled: 0
				}
				getSpecialtyList(params)
					.then(res => {
						let data = res.data
						if (data.code == '1') {
							if (data.data.length) {
								if (type == 'pull') {
									this.flowList = []
								}
								this.flowList = this.flowList.concat(data.data)
								this.pages.total = data.page.total
								if (this.pages.total <= this.flowList.length) {
									this.loadStatus = 'nomore'
								} else {
									this.loadStatus = 'loadmore'
								}
							} else {
								this.loadStatus = 'nomore'
							}
						} else {}
						this.loading = false
					})
					.catch(err => {
						console.log(err)
						this.loading = false
					})
			},
			payOrder() {
				uni.navigateTo({
					url: '/ruralPages/product/index'
				})
			},
			toJSON() {
				return this
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		min-height: 100%;
		padding-bottom: 30rpx;
		background: #F4F4F4;

		.loading {
			margin-top: 300rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.navContent {
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		.flex-left {
			span {
				color: #ffffff;
				font-size: 30rpx;
				margin-right: 10rpx;
			}
		}

		.flex-center {
			flex: 1;
		}
	}

	.demo-warter {
		border-radius: 10rpx;
		background-color: #ffffff;
		padding-bottom: 36rpx;
		margin: 15rpx 10rpx 15rpx 30rpx;
		position: relative;
		overflow: hidden;

		&.warRight {
			margin: 15rpx 30rpx 15rpx 10rpx;
		}
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.wrapMain {
		padding: 14rpx;
	}

	.demo-image {
		width: 100%;
	}

	.demo-title {
		font-size: 24rpx;
		margin-top: 11rpx;
		color: #656565;
		line-height: 36rpx;

		.read {
			font-size: 24rpx;
			color: #656565;
			background: #FF0A00;
			padding: 0 4rpx;
			border-radius: 5px;
			color: #ffffff;
			margin-right: 10rpx;
		}
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		margin-top: 29rpx;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;

		.price {
			font-size: 36rpx;
			color: #FF0A00;
		}

		.people {
			font-size: 20rpx;
			color: #656565;
		}
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>
