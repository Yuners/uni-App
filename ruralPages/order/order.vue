<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex == index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<vacancy v-if="tabItem.loaded === true && tabItem.orderList.length === 0" />

					<!-- 订单列表 -->
					<view v-for="(item,index) in tabItem.orderList" :key="index" class="order-item">
						<view class="i-top b-b">
							<text class="time">订单编号： {{item.orderId}}</text>
							<text class="state" :style="{color: stateTipColor(item.status) }">{{item.status | orderState}}</text>

						</view>

						<view
							v-if="item.orderInfoList.length"
							class="goods-box-single"
							v-for="(goodsItem, goodsIndex) in item.orderInfoList" :key="goodsIndex"
						>
							<image class="goods-img" :src="goodsItem.cartInfo.src" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.cartInfo.title}}</text>
								<text class="attr-box">{{goodsItem.cartInfo.space}}  x {{goodsItem.cartInfo.number}}</text>
								<text class="price">{{goodsItem.cartInfo.price}}</text>
							</view>
						</view>

						<!-- <view class="price-box">
							共
							<text class="num">7</text>
							件商品 实付款
							<text class="price">143.7</text>
						</view>
						<view class="action-box b-t" v-if="item.state != 9">
							<button class="action-btn" @click="toNav('/ruralPages/order/tracking/tracking')">查看物流</button>
							<button class="action-btn" @click="toNav('/ruralPages/order/orderDetail')">订单详情</button>
							<button class="action-btn" @click="cancelOrder(item)">取消订单</button>
							<button class="action-btn recom">立即支付</button>
						</view> -->
					</view>

					<load-more :status="tabItem.loadingType" />

				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import Json from '../../Json';
	import LoadMore from '@/ruralPages/components/fl-load-more/index.vue'
	import Vacancy from '@/ruralPages/components/fl-vacancy/index.vue'
	import {
		getOrderList
	} from '@/api/order.js'

	export default {
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 100,
						text: '全部',
						loadingType: 'more',
						orderList: [],
						loading: true,
						pageInfo: {
							curPage: 1,
							pageSize: 10,
							total: 0,
						}
					},
					{
						state: 5,
						text: '待付款',
						loadingType: 'more',
						orderList: [],
						loading: true,
						pageInfo: {
							curPage: 1,
							pageSize: 10,
							total: 0,
						}
					},
					{
						state: 1,
						text: '待收货',
						loadingType: 'more',
						orderList: [],
						loading: true,
						pageInfo: {
							curPage: 1,
							pageSize: 10,
							total: 0,
						}
					},
					{
						state: 3,
						text: '待评价',
						loadingType: 'more',
						orderList: [],
						loading: true,
						pageInfo: {
							curPage: 1,
							pageSize: 10,
							total: 0,
						}
					},
					{
						state: 4,
						text: '已取消',
						loadingType: 'more',
						orderList: [],
						loading: true,
						pageInfo: {
							curPage: 1,
							pageSize: 10,
							total: 0,
						}
					}
				],
			};
		},
		filters: {
			orderState(state) {
				switch (state) {
					case -1:
						return '申请退货'
						break
					case -2:
						return '退货驳回'
						break
					case -3:
						return '退款中'
						break
					case -4:
						return '退款成功'
						break
					case -5:
						return '退款驳回'
						break
					case 0:
						return '待发货'
						break
					case 1:
						return '待收货'
						break
					case 2:
						return '已收货'
						break
					case 3:
						return '待评价'
						break
					case 4:
						return '订单失效'
						break
					case 5:
						return '待付款'
						break
					case 6:
						return '订单完成'
						break
				}
			}
		},
		onLoad(options) {
			/**
			 * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
			 * 替换onLoad下代码即可
			 */
			console.log(options)
			this.tabCurrentIndex = options.state;
			// #ifndef MP
			this.loadData()
			// #endif
			// #ifdef MP
			if (options.state == 0) {
				this.loadData()
			}
			// #endif

		},
		components: {
			LoadMore,
			Vacancy
		},
		methods: {
			//颜色
			stateTipColor(state) {
				let color = '#fa436a'
				switch (state) {
					case 4:
						color = '#909399';
						break;
					case -5:
						color = '#909399';
						break;
				}
				return color
			},
			//获取订单列表
			loadData(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				let pageInfo = navItem.pageInfo

				if (source === 'tabChange' && navItem.loaded === true) {
					//tab切换只有第一次需要加载数据
					return;
				}
				if (navItem.loadingType === 'loading') {
					//防止重复加载
					return;
				}
				if (!navItem.loading) return

				navItem.loadingType = 'loading';

				getOrderList(state, pageInfo)
					.then(res => {
						if (res.data.code == 1) {
							let page = res.data.data.page
							let list = res.data.data.items
							navItem.pageInfo.total = Number(page.total)
							list.map((item, index) => {
								list[index].orderInfoList[0].cartInfo = JSON.parse(item.orderInfoList[0].cartInfo)
							})
							navItem.orderList = navItem.orderList.concat(list)
							if (navItem.pageInfo.total <= navItem.orderList.length) {
								navItem.loadingType = 'noMore';
								navItem.loading = false
							} else {
								navItem.loadingType = 'more';
								navItem.pageInfo.curPage++
								console.log(navItem.pageInfo)
							}
						}
					})
					.catch(err => {
						console.log(err)
					})
					.finally(() => {
						setTimeout(() => {
							this.$set(navItem, 'loaded', true);
						}, 600)
					})

				/* setTimeout(()=>{
                    console.log(Json)
					let orderList = Json.orderList.filter(item=>{
						//添加不同状态下订单的表现形式
						item = Object.assign(item, this.orderStateExp(item.state));
						//演示数据所以自己进行状态筛选
						if(state === 0){
							//0为全部订单
							return item;
						}
						return item.state === state
					});
					orderList.forEach(item=>{
						navItem.orderList.push(item);
					})
					//loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
					this.$set(navItem, 'loaded', true);

					//判断是否还有数据， 有改为 more， 没有改为noMore
					navItem.loadingType = 'more';
				}, 600); */
			},

			/* toNav(url){
				uni.navigateTo({
					url
				})
			}, */

			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			//删除订单
			deleteOrder(index) {},
			//取消订单
			cancelOrder(item) {},
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.uni-swiper-item {
		height: auto;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;

		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.state {
				color: $base-color;
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 8upx;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
				border: 1px solid rgba(0, 0, 0, .2);
			}

			&.recom {
				background: #fff9f9;
				color: $price-related;

				&:after {
					border: 1px solid #f7bcc8;
				}
			}
		}
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>
