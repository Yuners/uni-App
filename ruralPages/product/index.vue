<template>
	<view class="container" v-if="loading">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item.fileUrl" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{ productData.specialtyName }}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price" v-if="specList.length && !specSelected">{{ specList[0].specsPrice || '' }}</text>
				<text class="price" v-else>
					{{ specSelected.price }}
				</text>
				<!-- <text class="m-price">¥488</text>
				<text class="coupon-tip">7折</text> -->
			</view>
			<view class="bot-row">
				<text>销量: 108</text>
				<text>库存: {{ inventory }}</text>
				<text>浏览量: 768</text>
			</view>
		</view>

		<!--  分享 -->
		<!-- <view class="share-section" @click="share">
			<view class="share-icon">
				<u-icon name="star" color="#ffffff" size="24" />
				返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<u-icon name="arrow-right"  color="#888" size="24"></u-icon>
			</view>

		</view> -->

		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text">
						{{ specSelected.param || "请选择购买规则" }}
					</text>
				</view>
				<u-icon name="arrow-right" color="#888" size="24"></u-icon>
			</view>
			<!-- <view class="c-row b-b">
				<text class="tit">优惠券</text>
				<text class="con t-r red">领取优惠券</text>
				<u-icon name="arrow-right"  color="#888" size="24"></u-icon>
			</view>
			<view class="c-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text>新人首单送20元无门槛代金券</text>
					<text>订单满50减10</text>
					<text>订单满100减30</text>
					<text>单笔购买满两件免邮费</text>
				</view>
			</view> -->
			<view class="c-row b-b" @tap="toNav">
				<text class="tit">邮费说明</text>
				<view class="con">
					<view>
						{{ freightInfo }}
					</view>
					<view class="delivery">
						<text>
							配送至：
						</text>
						<text>
							{{ defAddress.ressLocation.replace(defAddress.ressDetail, '') }}
						</text>
					</view>
				</view>
				<u-icon name="arrow-right" color="#888" size="24"></u-icon>
			</view>
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>7天无理由退换货 ·</text>
					<text>假一赔十 ·</text>
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<u-icon name="arrow-right" color="#888" size="24"></u-icon>
			</view>
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view>

		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<view class="graphic_main">
				<view class="mainList" v-if="productData.specialtyDescribeList.length && productData.specialtyDescribeList">
					<view class="item" v-for="(item, index) in productData.specialtyDescribeList" :key="index">
						<template v-if="item.fileList.length && item.fileList">
							<u-image v-for="(image, imageIndex) in item.fileList" mode="scaleToFill" width="100%" height="500rpx" :key="imageIndex"
							 :src="image.fileUrl"></u-image>
						</template>
						<view class="content">
							{{ item.describeContent }}
						</view>
					</view>
				</view>
			</view>
			<!-- <rich-text :nodes="desc"></rich-text> -->
		</view>

		<view class="detail-desc">
			<view class="d-header">
				<text>用户须知</text>
			</view>
			<view class="notice_main">
				<view class="not_block">
					<view class="block_title">
						发货时间：
					</view>
					<view class="block_cont">
						{{ noticeData.noticeDeliveryTime }}
					</view>
				</view>
				<view class="not_block">
					<view class="block_title">
						价格说明：
					</view>
					<view class="block_cont">
						{{ noticeData.noticePriceDescription }}
					</view>
				</view>
				<view class="not_block">
					<view class="block_title">
						关于快递：
					</view>
					<view class="block_cont">
						{{ noticeData.noticeExpressInstructions }}
					</view>
				</view>
				<view class="not_block">
					<view class="block_title">
						签收提醒：
					</view>
					<view class="block_cont">
						{{ noticeData.noticeSignReminder }}
					</view>
				</view>
				<view class="not_block">
					<view class="block_title">
						退换问题：
					</view>
					<view class="block_cont">
						{{ noticeData.noticeReturnExchange }}
					</view>
				</view>
				<view class="not_block" v-if="noticeData.noticeReminder">
					<view class="block_title">
						温馨提示：
					</view>
					<view class="block_cont">
						{{ noticeData.noticeReminder }}
					</view>
				</view>
			</view>
			<!-- <rich-text :nodes="desc"></rich-text> -->
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<view class="is_flex">
				<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
					<u-icon name="home" color="#909399" size="40"></u-icon>
					<text>首页</text>
				</navigator>
				<!-- <navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
					<text class="yticon icon-gouwuche"></text>
					<text>购物车</text>
				</navigator> -->
				<view class="p-b-btn" @click="toFavorite">
					<u-icon name="share-fill" color="#909399" size="40"></u-icon>
					<text>分享</text>
				</view>
				<view class="p-b-btn" :class="{active: favorite}" @click="toFavorite">
					<u-icon name="heart-fill" :color="favorite ? '#fa436a' : '#909399'" size="40"></u-icon>
					<text>收藏</text>
				</view>
				<view class="p-b-btn" @click="toFavorite">
					<u-icon name="server-man" color="#909399" size="40"></u-icon>
					<text>客服</text>
				</view>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="buy">立即购买</button>
			</view>
		</view>


		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="shopInfo">
					<view class="a-t">
						<view class="right">
							<text class="price" v-if="specList.length && !specSelected">￥{{ specList[0].specsPrice || '' }}</text>
							<text class="price" v-else>￥{{ specSelected.price }}</text>
							<view class="selected">
								已选：
								<text class="selected-text" v-if="specSelected">
									{{ specSelected.param }}
								</text>
							</view>
						</view>
					</view>
					<view class="attr-list">
						<view class="attrTitle">
							规格分类
						</view>
						<view class="item-list">
							<text v-for="(item, index) in specList" :class="{selected: specSelected.id == item.specsId}" :key="index" class="tit"
							 @click="selectSpec(item)">
								{{item.specsParam}}
							</text>
						</view>
					</view>
					<view class="amount">
						<view class="is_flex">
							<view class="left">
								<view class="attrTitle">
									购买数量
								</view>
								<view class="stock" v-if="specList.length && !specSelected">
									库存 {{ specList[0].specsNumber || '' }} 件
								</view>
								<view class="stock" v-else>
									库存 {{ specSelected.number }} 件
								</view>
							</view>
							<view class="quantity">
								<view class="modified" hover-class="hove" @tap="minusNum">
									<u-icon name="minus"></u-icon>
								</view>
								<view class="number">
									{{ shopNumber }}
								</view>
								<view class="modified" hover-class="hove" @tap="plusNum">
									<u-icon name="plus"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
				<button class="btn" @click="toggleSpec">完成</button>
			</view>
		</view>
		<!-- 分享 -->
		<share ref="share" :contentHeight="580" :shareList="shareList" />
	</view>
	<view class="loading" v-else>
		<loading></loading>
	</view>
</template>

<script>
	import {
		getDetails
	} from '@/api/product.js'
	import {
		getAddress
	} from '@/api/address.js'
	import Share from "@/ruralPages/components/fl-share/index.vue"
	import store from "@/store/index.js"

	export default {
		data() {
			return {
				specClass: 'none',
				specSelected: '', // 已选规格
				productData: '', // 商品信息
				favorite: true,
				shareList: [], // 分享
				imgList: [], // 商品轮播
				specList: [], // 规格数据
				noticeData: '', // 用户须知
				freightData: '', // 运费模板数据
				shopNumber: 1, // 购买数量
				loading: false,
				specialtyId: '', // 特产id
				defAddress: store.getters.defAddress, //默认地址
				freightInfo: '',
			};
		},
		async onLoad(options) {

			//接收传值,id里面放的是标题，因为测试数据并没写id
			let id = options.shopId;
			if (id) {
				this.specialtyId = id
				this.getProduct(id)
			}

			this.shareList = [{
					type: 1,
					icon: '/static/temp/share_wechat.png',
					text: '微信好友'
				},
				{
					type: 2,
					icon: '/static/temp/share_moment.png',
					text: '朋友圈'
				},
				{
					type: 3,
					icon: '/static/temp/share_qq.png',
					text: 'QQ好友'
				},
				{
					type: 4,
					icon: '/static/temp/share_qqzone.png',
					text: 'QQ空间'
				}
			];
		},
		onShow() {
			this.specSelected = ''
		},
		computed: {
			inventory() {
				let num = this.specList.reduce((inventory, item) => {
					return inventory + item.specsNumber
				}, 0)
				return num
			}
		},
		components: {
			Share
		},
		methods: {
			isUnit(id){
				switch(id) {
					case '0':
						return '件'
						break;
					case '1':
						return 'KG'
						break;
					case '2':
						return 'm³'
						break;
				}
			},
			imputedPrice() {
				let city = this.defAddress.ressProvinceId
				let freight = JSON.parse(JSON.stringify(this.freightData))
				freight.freightNotDistribution = JSON.parse(freight.freightNotDistribution)
				let unit = this.isUnit(freight.freightChargingType)
				let info = ''
				if (freight.freightNotDistribution.indexOf(city) == -1) {
					if (freight.freightIsAllFree != 1) {
						let region = this.selectArray(city, freight.freightDistributionList, 'distributionRegionId')
						if (region) {
							info = `首件${region.distributionFirstWeight + unit}${region.distributionFirstPrice}元,续件${region.distributionContinuationWeight + unit}${region.distributionContinuationPrice}元`
						} else {
							let details = freight.freightDistributionList[0]
							info = `首件${details.distributionFirstWeight + unit}${details.distributionFirstPrice}元,续件${details.distributionContinuationWeight + unit}${details.distributionContinuationPrice}元`
						}
						let condition = this.selectArray(city, freight.freightParcelList, 'parcelRegionId')
						if (condition) {
							if(condition.parcelWeight > 0 && condition.parcelPrice > 0){
								info = info + ` 满${condition.parcelWeight}件或满${condition.parcelPrice}元包邮`
							} else {
								if(condition.parcelWeight > 0){
									info = info + ` 满${condition.parcelWeight}件包邮`
								}
								if(condition.parcelPrice > 0){
									info = info + ` 满${condition.parcelPrice}元包邮`
								}
							}
						}
					} else {
						info = '快递包邮'
					}
				} else {
					info = '当前位置不配送，请重新选择收货地址'
				}
				return info
			},
			// 计算邮费价格
			computeMoeny(a, b) {
				let money = 0
				if (a.shopNumber < b.distributionFirstWeight) {
					money = b.distributionFirstPrice
				} else {
					money = b.distributionFirstPrice + Math.ceil((a.shopNumber - b.distributionFirstWeight) / b.distributionContinuationWeight) *
						b.distributionContinuationPrice
				}
				return money
			},
			//查看数组中是否存在
			selectArray(item, arr, key) {
				if (!arr.length) return false
				return arr.filter((child, index) => {
					return child[key].indexOf(item) >= 0
				})[0]
			},
			// 购买数量加
			plusNum() {
				if (this.specSelected.number <= this.shopNumber) return
				this.shopNumber++
				if (!this.specSelected) return
				this.specSelected.shopNumber = this.shopNumber
			},
			// 购买数量减
			minusNum() {
				if (this.shopNumber <= 1) return
				this.shopNumber--
				if (!this.specSelected) return
				this.specSelected.shopNumber = this.shopNumber
			},
			// 获取商品详情
			getProduct(id) {
				let params = {
					specialtyId: id
				}
				getDetails(params)
					.then(res => {
						if (res.data.code == '1') {
							let data = res.data.data.specialty
							this.noticeData = res.data.data.notice
							this.freightData = res.data.data.freight
							this.productData = data
							this.imgList = this.imgList.concat(data.fileUrlList)
							this.specList = JSON.parse(JSON.stringify(data.specsList))
							if (this.specList.length < 2) return
							let compare = () => {
								return function(a, b) {
									return a.specsPrice - b.specsPrice
								}
							}
							this.specList.sort(compare())
						}
						this.freightInfo = this.imputedPrice()
						this.loading = true
					})
					.catch(err => {
						this.loading = true
						console.log(err)
					})
			},
			// 选择地址回调
			selectAddress(data) {
				uni.showLoading({
				    title: '加载中'
				});
				this.defAddress = data
				this.freightInfo = this.imputedPrice()
				setTimeout(function () {
				    uni.hideLoading();
				}, 1000);
			},
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
						this.shopNumber = 1
					}, 250);
				} else if (this.specClass === 'none') {
					this.shopNumber = 1
					this.specClass = 'show';
				}
			},
			//选择规格
			selectSpec(data) {
				this.shopNumber = 1
				let a = {
					id: data.specsId,
					number: data.specsNumber,
					param: data.specsParam,
					price: data.specsPrice,
					unit: data.specsUnit,
					shopNumber: this.shopNumber
				}
				this.specSelected = a
			},
			//分享
			share() {
				this.$refs.share.toggleMask();
			},
			//收藏
			toFavorite() {
				this.favorite = !this.favorite;
			},
			toNav(){
				uni.navigateTo({
					url: '/ruralPages/address/address?source=1'
				})
			},
			buy() {
				if (!this.specSelected) {
					this.$msg('请选择规格后提交')
					setTimeout(() => {
						this.toggleSpec()
					}, 1000)
					return
				}
				uni.navigateTo({
					url: `/ruralPages/order/createOrder?id=${this.specialtyId}&specSelected=${JSON.stringify(this.specSelected)}`
				})
			},
			stopPrevent() {}
		},

	}
</script>

<style lang='scss' scoped>
	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.icon-you {
		font-size: $font-base + 2upx;
		color: #888;
	}

	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $price-related;
		}

		.price {
			color: $price-related;
			font-size: 34rpx;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $price-related;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}

	/* 分享 */
	.share-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;

		.share-icon {
			display: flex;
			align-items: center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $price-related;
			border-radius: 4upx;
			position: relative;
			overflow: hidden;
			font-size: 22upx;
			color: $price-related;

			&:after {
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position: absolute;
				background: $price-related;
			}
		}

		.icon-xingxing {
			position: relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}

		.tit {
			font-size: $font-base;
			margin-left: 10upx;
		}

		.icon-bangzhu1 {
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}

		.share-btn {
			flex: 1;
			text-align: right;
			font-size: $font-sm;
			color: $price-related;
		}

		.icon-you {
			font-size: $font-sm;
			margin-left: 4upx;
			color: $price-related;
		}
	}

	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 30upx;
			position: relative;
			@include _border($dir: bottom);
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
			.delivery{
				margin-top: 10rpx;
				color: #999999;
			}
		}

		.bz-list {
			height: 40upx;
			line-height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			color: $price-related;
		}
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;

			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;
		padding-bottom: 100rpx;

		.graphic_main {
			padding-bottom: 30rpx;

			.content {
				padding-top: 16rpx;
				line-height: 1.5;
			}
		}

		.notice_main {
			padding: 30rpx;

			.not_block {
				.block_title {
					font-size: 34rpx;
					color: #333333;
					font-weight: bold;
					line-height: 1.8;
				}

				.block_cont {
					font-size: 28rpx;
					color: #999999;
					white-space: pre-wrap;
					text-indent: 40rpx;
					line-height: 1.5;
				}
			}
		}

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
			}
		}
	}

	/* 规格选择弹窗 */
	.attr-content {
		/* #ifdef H5 */
		margin-bottom: env(safe-area-inset-bottom);
		/* #endif */
		padding: 10upx 30upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.attr-content-scroll-view {
			max-height: calc(60vh - 220upx);
		}

		.shopInfo {}

		.a-t {
			display: flex;

			image {
				width: 200upx;
				height: 200upx;
				flex-shrink: 0;
				border-radius: 8upx;
			}

			.right {
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;

				.title {
					line-height: 1.4;
				}

				.price {
					font-size: $font-lg;
					color: $price-related;
					margin-bottom: 10upx;
					line-height: 1.4;
				}

				.selected {
					line-height: 1.4;

					.selected-text {
						margin-right: 10upx;
					}
				}
			}
		}

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
		}

		.attrTitle {
			font-size: 32rpx;
			color: #333333;
			margin-right: 10rpx;
		}

		.amount {
			padding-top: 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.is_flex {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;

				.stock {
					color: #999999;
				}

				.left {
					display: flex;
					align-items: center;
				}

				.quantity {
					display: flex;
					align-items: center;

					.number {
						padding: 0 20rpx;
					}

					.modified {
						width: 100rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						border: 1rpx solid #EEEEEE;
						border-radius: 10rpx;

						&.hove {
							background-color: rgba(238, 238, 238, .5);
						}
					}
				}
			}
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

			text {
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}

			.selected {
				background: #fbebee;
				color: #fa436a;
			}
		}
	}

	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				width: 100%;
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $price-related;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;
		display: flex;
		justify-content: space-between;

		.is_flex {
			display: flex;
			justify-content: space-between;
		}

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}

		.action-btn-group {
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30, #fa436a, #F56C6C);
			margin: 0 20upx;
			position: relative;


			.action-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base;
				padding: 0;
				border-radius: 0;
				background: transparent;
			}
		}
	}
</style>
