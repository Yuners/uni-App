<template>
	<view class="particulars">
		<!-- #ifdef MP -->
		<view v-if="paddingHeight">
			<u-navbar :is-back="false" title-color="#ffffff" :title="'人间仙境张家界'" :background="background">
			</u-navbar>
		</view>
		<!-- #endif -->
		<view class="figure">
			<u-image width="100%" height="450rpx" src="../../static/images/2.jpg"></u-image>
		</view>
		<view class="figure_flex"></view>
		<view class="detailsMain">
			<view class="title">
				人间仙境张家界
			</view>
			<view class="introduce">
				<view class="introduce_item">
					扩大的盆景
				</view>
				<view class="introduce_item">
					扩大的盆景
				</view>
			</view>
			<view class="site">
				<view class="siteInfo">
					<image src="../../static/images/icon_location@3x.png" mode="scaleToFill"></image>
					<view class="siteName">
						山西省晋城市陵川县附城镇仗河村
					</view>
				</view>
				<u-icon name="arrow-right" color="#FB9825" size="30"></u-icon>
			</view>
			<!-- #ifdef MP -->
			<view class="tabs" :style="{ top: paddingHeight + 'px' }">
				<u-tabs-swiper @change="hanldChange" active-color="#4FAA81" ref="tabs" :list="tabsList" :current="tabAcitve"
				 :is-scroll="false"></u-tabs-swiper>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP -->
			<view class="tabs" :style="{ paddingTop: paddingHeight + 'px' }">
				<u-tabs-swiper @change="hanldChange" active-color="#4FAA81" ref="tabs" :list="tabsList" :current="tabAcitve"
				 :is-scroll="false"></u-tabs-swiper>
			</view>
			<!-- #endif -->
			<view class="centent">
				<view class="Graphic cItem">
					1
					<u-image width="100%" height="450rpx" src="../../static/images/2.jpg"></u-image>
					<u-image width="100%" height="450rpx" src="../../static/images/2.jpg"></u-image>
				</view>
				<view class="Notice cItem">
					2
					<u-image width="100%" height="450rpx" src="../../static/images/2.jpg"></u-image>
					<u-image width="100%" height="450rpx" src="../../static/images/2.jpg"></u-image>
				</view>
				<view class="Recommend cItem">
					3
					<u-image width="100%" height="450rpx" src="../../static/images/2.jpg"></u-image>
					<u-image width="100%" height="450rpx" src="../../static/images/2.jpg"></u-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#4FAA81',
				},
				tabsList: [{
						name: '图文详情'
					},
					{
						name: '用户须知'
					},
					{
						name: '周边推荐'
					}
				],
				tabAcitve: 0,
				isTouchScrollView: false,
				nodeInfoList: [],
				topHeight: 0,
				tabTop: 0,
				paddingHeight: 0
			}
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					//#ifdef MP-WEIXIN
					let type = res.platform == 'ios' ? 44 : 48
					let height = res.statusBarHeight + type
					//#endif
					//#ifndef MP-WEIXIN
					let height = res.statusBarHeight
					//#endif
					this.topHeight = height
				}
			})
			this.$nextTick(() => {
				this.init()
			})
		},
		methods: {
			init() {
				const query = uni.createSelectorQuery().in(this);
				query.selectAll('.centent .cItem').boundingClientRect(data => {
					this.nodeInfoList = data.map((item, index) => ({
						index,
						...item
					}))
				}).exec()
				query.select('.tabs').boundingClientRect(data => {
					this.tabTop = data.top
				}).exec()
			},
			hanldChange(nav) {
				if (this.tabAcitve == nav) return;
				// 锁定联动
				// 解决clickedNavIndex相同触发更新失败
				if (this.tabAcitve == nav) {
					this.tabAcitve = -1;
				}
				this.$nextTick(() => {
					this.tabAcitve = nav;
					let scrollTop = this.nodeInfoList[nav].top - 100
					uni.pageScrollTo({
						scrollTop: scrollTop,
						duration: 300
					})
				})
			}
		},
		onPageScroll(e) {
			let scrollTop = e.scrollTop;
			if (scrollTop >= this.tabTop) {
				this.paddingHeight = this.topHeight
			} else {
				this.paddingHeight = 0
			}
			console.log(this.tabsStyle)
			let b = this.nodeInfoList.filter(item => item.top <= scrollTop)
			if (!b.length) return
			let c = b.sort((a, b) => b.top - a.top)[0].index;
			this.tabAcitve = c;
		}
	}
</script>

<style lang="scss" scoped>
	.particulars {
		height: 100%;
		position: relative;

		.figure {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
		}

		.figure_flex {
			height: 300rpx;
			width: 100%;
		}

		.detailsMain {
			background-color: #FFFFFF;
			border-radius: 50rpx 50rpx 0 0;
			padding-top: 50rpx;
			min-height: calc(100% - 300rpx);

			.title {
				@include _border($dir: bottom) font-size: 38rpx;
				padding: 0 30rpx;
				color: $font-color-dark;
				font-weight: bold;
				line-height: 76rpx;
				height: 76rpx;
			}

			.introduce {
				display: flex;
				align-items: center;
				padding: 20rpx 30rpx 0;

				.introduce_item {
					text-align: center;
					line-height: 1.8;
					border-radius: 10rpx;
					width: 160rpx;
					font-size: $font-sm;
					color: $uni-color-primary;
					background-color: #EEEEEE;
					margin-right: 20rpx;
				}
			}

			.site {
				margin-top: 20rpx;
				padding: 10rpx 30rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #fcfdd2ba;
				padding-bottom: 30rpx;

				.siteInfo {
					display: flex;
					align-items: center;

					image {
						width: 28rpx;
						height: 34rpx;
						margin-right: 20rpx;
					}

					.siteName {
						color: #FB9825;
						font-size: $uni-font-size-base;
					}
				}
			}

			.tabs {
				width: 100%;
				@include _border($dir: bottom) position: sticky;
				top: 0;
				left: 0;
				width: 100%;
				z-index: 999;
				background-color: #FFFFFF;
				transition: all 0.4s ease;
			}

			.centent {
				padding: 50rpx 30rpx 0;
			}
		}
	}
</style>
