<template>
	<view class="particulars">
		<u-navbar :is-back="true"
			back-icon-color="#ffffff"
			:title-color="titleColor"
			:title="partData.bedName"
			:background="background"
			:border-bottom="false"
			immersive
		>
		</u-navbar>
		<view class="figure">
			<u-swiper v-if="teletext && teletext.length" :list="teletext" mode="none" name="fileUrl" img-mode="scaleToFill"
			 :height="450" duration="3000"></u-swiper>
			<!-- <u-image width="100%" height="450rpx" :src="require('../../static/images/2.jpg')"></u-image> -->
		</view>
		<view class="figure_flex"></view>
		<view class="detailsMain">
			<view class="title">
				{{ partData.bedName }}
			</view>
			<view class="introduce">
				<view class="introduce_item">
					{{ partData.bedLabelOne }}
				</view>
				<view v-if="partData.bedLabelTwo" class="introduce_item">
					{{ partData.bedLabelTwo }}
				</view>
			</view>
			<view class="site">
				<view class="siteInfo">
					<image :src="require('../../static/images/icon_location@3x.png')" mode="scaleToFill"></image>
					<view class="siteName">
						{{ partData.provinceName }}{{ partData.cityName }}{{ partData.countyName }}{{ partData.townName }}{{ partData.villageName }}
					</view>
				</view>
				<u-icon name="arrow-right" color="#FB9825" size="30"></u-icon>
			</view>
			<view class="tabs" :style="{ top: paddingHeight + 'px' }">
				<u-tabs-swiper @change="hanldChange" active-color="#4FAA81" ref="tabs" :list="tabsList" :current="tabAcitve"
				 :is-scroll="false"></u-tabs-swiper>
			</view>
			<view class="centent">
				<view class="Graphic cItem">
					<view class="itemTitle">
						图文详情
					</view>
					<view class="itemMain" v-if="teletext && teletext.length">
						<view class="info" v-for="(item,index) in teletext" :key="index">
							<view class="article">
								{{ item.describeContent }}
							</view>
							<u-image width="100%" height="450rpx" :src="item.fileUrl"></u-image>
						</view>
					</view>
				</view>
				<view class="Notice cItem">
					<view class="itemTitle">
						用户须知
					</view>
					<view class="userNotice">
						<view class="basics">
							<view class="basiceItem">
								<u-icon name="phone-fill" color="#f6a439" size="28"></u-icon>
								<text class="tally">电话</text>
								<text>{{ partData.bedPhone || '' }}</text>
							</view>
							<view class="basiceItem">
								<u-icon name="clock" color="#f6a439" size="28"></u-icon>
								<text class="tally">营业时间</text>
								<text>{{ partData.bedBusinesshours || '' }}</text>
							</view>
							<view class="basiceItem">
								<u-icon name="rmb" color="#f6a439" size="28"></u-icon>
								<text class="tally">价格</text>
								<text>{{ partData.bedPrice || '' }}</text>
							</view>
						</view>
						<view class="facility" v-if="partData.bedIndependenttravel || partData.bedRoadtrip ">
							<view class="subtitle">
								交通攻略
							</view>
							<view class="cell-vessel">
								<view class="cell_item" v-if="partData.bedIndependenttravel">
									<view class="cell_label">
										自助游：
									</view>
									<view class="cell_value">
										{{ partData.bedIndependenttravel }}
									</view>
								</view>
								<view class="cell_item" v-if="partData.bedRoadtrip">
									<view class="cell_label">
										自驾游：
									</view>
									<view class="cell_value">
										{{ partData.bedRoadtrip }}
									</view>
								</view>
							</view>
						</view>
						<view class="facility">
							<view class="subtitle">
								预订流程
							</view>
							<view class="cell-vessel">
								<view class="cell_item">
									<view class="cell_label">
										线上预订：
									</view>
									<view class="cell_value">
										提交订单后，需要房东确认订单
									</view>
								</view>
								<view class="cell_item">
									<view class="cell_label">
										线下押金：
									</view>
									<view class="cell_value">
										{{ partData.bedDeposit || '无需押金' }}
									</view>
								</view>
								<view class="cell_item">
									<view class="cell_label">
										提供发票：
									</view>
									<view class="cell_value">
										开具发票需与房东协商
									</view>
								</view>
								<view class="cell_item">
									<view class="cell_label">
										退订规则：
									</view>
									<view class="cell_value">
										<view class="text">
											入住日前1天14:00前取消订单，全额退款；距入住日14:00不足24小时取消，扣首晚房费；入住后提前离店，当日14:00前取消，扣当日房费，当日14:00后取消，扣当日+次日房费。
										</view>
										<steps direction="column" :active="2" :options="stepsData" />
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="roomType cItem">
					<view class="itemTitle">
						房型选择
					</view>
					<view class="roomList" v-if="roomList && roomList.length">
						<view class="roomItem" v-for="(item,index) in roomList" :key="index" @tap="openRoom(item)">
							<view class="image">
								<u-image :src="item.fileList ? item.fileList[0].fileUrl : ''" width="100%" height="100%" border-radius="10">
									<view slot="error" style="font-size: 24rpx;">图片加载失败</view>
								</u-image>
							</view>
							<view class="roomInfo">
								<view class="roomName">
									{{ item.roomName }}
								</view>
								<view class="roomDescribe">
									{{ item.roomDescribe }}
								</view>
								<view class="roomBot">
									<view class="roomSize">
										{{ item.roomArea }}
									</view>
									<view class="roomPrice">
										￥{{ item.roomPrice }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="Recommend cItem">
					<view class="itemTitle">
						周边推荐
					</view>
					<view class="periphery">
						<view class="dots">
							<view class="dotsItem" :class="{action: index == itemId}" v-for="(item,index) in recommend" :key="index" @tap="dotTap(index)">
								{{ item.type }}
							</view>
						</view>
						<view class="page-section swiper">
							<view class="page-section-spacing">
								<swiper class="swiper" :current="itemId" :autoplay="autoplay" :interval="interval" :duration="duration" @change="intervalChange">
									<swiper-item v-for="(item,index) in recommend" :key="index">
										<view class="swiper-item uni-bg-red">
											<scroll-view scroll-x class="scroll-box">
												<view class="scrollMain">
													<view v-for="(res,ind) in item.list" :key="ind" class="scroll_item" @tap="toDetails(res,item.type)">
														<u-image border-radius="10" width="100%" height="150" :src="res.fileUrl" />
														<view class="resName">
															{{ nameType(res,item.type) }}
														</view>
														<view class="resPrice">
															{{ priceType(res,item.type) || '' }}
														</view>
													</view>
												</view>
											</scroll-view>
										</view>
									</swiper-item>
								</swiper>
							</view>
						</view>
						<view class="complete">
							<view class="submit" @tap="toNav">
								{{ itemId | submitName }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="loading" class="load">
			<loading></loading>
		</view>
		<roomPopup ref="roomDetails"></roomPopup>
	</view>
</template>

<script>
	import {
		getBedDetail
	} from "@/api/villageDetails.js"
	import roomPopup from "./components/roomPopup.vue"
	import Steps from "@/ruralPages/components/fl-steps/index.vue"

	export default {
		data() {
			return {
				loading: true,
				background: {
					backgroundColor: 'rgba(79, 170, 129, 0)',
				},
				titleColor:'rgba(255, 255, 255, 0)',
				stepsData: [{
					title: '现在预订',
					desc: '如取消订单，全额退款'
				}, {
					title: '入住日前一天14:00前',
					desc: '如取消订单，扣首晚房费'
				}, {
					title: '入住当天14:00',
					desc: '  当日14:00前取消订单，扣当日房费，当日14:00后取消订单，扣当日+次日房费。'
				}, {
					title: '离店日当天12:00'
				}],
				tabsList: [{
						name: '图文详情'
					},
					{
						name: '用户须知'
					},
					{
						name: '房型选择'
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
				paddingHeight: 0,
				parId: '',
				partData: '', // 基本信息
				teletext: '', // 图文信息
				recommend: [], // 周边推荐
				roomList: [], // 房间型号
				autoplay: false,
				interval: 4000,
				duration: 400,
				itemId: 0,
			}
		},
		filters: {
			submitName(index) {
				switch (index) {
					case 0:
						return '全部周边风景'
						break;
					case 1:
						return '全部周边美食'
						break;
					case 2:
						return '全部周边民宿'
						break;
				}
			}
		},
		components:{
			roomPopup,
			Steps
		},
		onLoad(option) {
			if (!option.id) return
			this.parId = option.id
			this.getDetail()
		},
		onReady() {
			uni.getSystemInfo({
				success: (res) => {
					//#ifdef MP-WEIXIN
					let type = res.platform == 'ios' ? 44 : 48
					let height = res.statusBarHeight + type
					//#endif
					//#ifndef MP-WEIXIN
					let height = res.statusBarHeight + 44
					//#endif
					this.topHeight = height
				}
			})
			this.$nextTick(() => {
				this.init()
			})
		},
		methods: {
			intervalChange(e) {
				this.itemId = e.detail.current
			},
			dotTap(index) {
				this.itemId = index
			},
			nameType(data, type) {
				switch (type) {
					case '风景':
						return data.sceneryName
						break;
					case '美食':
						return data.foodName
						break;
					case '民宿':
						return data.bedName
						break;
				}
			},
			priceType(data, type) {
				switch (type) {
					case '风景':
						return data.sceneryPrice
						break;
					case '美食':
						return data.foodPrice
						break;
					case '民宿':
						return data.bedPrice
						break;
				}
			},
			//获取详情
			getDetail() {
				let params = {
					bedId: this.parId
				}
				getBedDetail(params)
					.then(res => {
						if (res.data.code == '1') {
							let data = JSON.parse(JSON.stringify(res.data.data))
							data.bed.bedFacilities = JSON.parse(data.bed.bedFacilities)
							data.bed.bedCoordinate = JSON.parse(data.bed.bedCoordinate)
							this.partData = data.bed
							this.teletext = data.bedDescribeList
							this.roomList = JSON.parse(JSON.stringify(data.bedRoomList))
							if (data.sceneryList.length != 0) {
								this.recommend.push({
									type: '风景',
									list: data.sceneryList
								})
							}
							if (data.foodList.length != 0) {
								this.recommend.push({
									type: '美食',
									list: data.foodList
								})
							}
							if (data.bedList.length != 0) {
								this.recommend.push({
									type: '民宿',
									list: data.bedList
								})
							}
						}
						this.loading = false
					})
					.catch(err => {
						console.log(err)
					})
			},
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
					let scrollTop = this.nodeInfoList[nav].top - 44 - this.topHeight
					uni.pageScrollTo({
						scrollTop: scrollTop,
						duration: 300
					})
				})
			},
			openRoom(roomData){
				roomData.phone = this.partData.bedPhone
				this.$refs.roomDetails.openPopup(roomData)
			},
			toNav() {
				const id = this.itemId
					switch (id) {
						case 0:
							this.$prePage().active = 1
							uni.navigateBack()
							break;
						case 1:
							this.$prePage().active = 2
							uni.navigateBack()
							break;
						case 2:
							this.$prePage().active = 3
							uni.navigateBack()
							break;
					}
			},
			toDetails(data, type) {
				switch (type) {
					case '风景':
						uni.navigateTo({
							url: `/ruralPages/particulars/sceneryDetails?id=${data.sceneryId}`
						})
						break;
					case '美食':
						uni.navigateTo({
							url: `/ruralPages/particulars/foodDetails?id=${data.foodId}`
						})
						break;
					case '民宿':
						uni.navigateTo({
							url: `/ruralPages/particulars/bedDetails?id=${data.bedId}`
						})
						break;
				}
			}
		},
		onPageScroll(e) {
			let scrollTop = e.scrollTop;
			if (scrollTop >= 0){
				let opacity = scrollTop / 100
				this.background.backgroundColor = `rgba(79, 170, 129, ${opacity})`
				this.titleColor = `rgba(255, 255, 255, ${opacity})`
			}else if(scrollTop >= 100){
				this.background.backgroundColor = `rgba(79, 170, 129)`
				this.titleColor = `rgba(255, 255, 255, ${opacity})`
			}
			if (scrollTop >= this.tabTop) {
				this.paddingHeight = this.topHeight
			} else {
				this.paddingHeight = 0
			}
			let b = this.nodeInfoList.filter(item => item.top <= scrollTop + 44 + this.topHeight)
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
			z-index: 0;
		}

		.figure_flex {
			height: 400rpx;
			width: 100%;
		}

		.detailsMain {
			position: relative;
			z-index: 1;
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
				margin-bottom: 20rpx;

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
				background-color: #f4f4f4;

				.cItem {
					padding: 30rpx 30rpx;
					margin-bottom: 28rpx;
					background-color: #FFFFFF;
				}

				.itemTitle {
					font-size: 34rpx;
					color: #333333;
					margin-bottom: 15rpx;
				}

				.userNotice {
					.basiceItem {
						display: flex;
						align-items: center;
						padding: 14rpx 0;

						.tally {
							color: #999999;
							padding: 0 20rpx;
						}
					}

					.facility {
						margin-top: 15rpx;

						.subtitle {
							font-size: 30rpx;
							color: #45C94D;
							padding: 10rpx 0;
						}

						.itemList {
							padding-top: 15rpx;
							display: flex;

							.facilItem {
								padding: 0 10rpx;
							}
						}

						.cell-vessel {
							margin-top: 15rpx;

							.cell_item {
								display: flex;
								align-items: flex-start;
								padding-bottom: 20rpx;

								.cell_label {
									line-height: 1.5;
									width: 150rpx;
									color: #999999;
								}

								.cell_value {
									flex: 1;

									.text {
										color: #333333;
										line-height: 1.5;
										padding-bottom: 20rpx;
									}
								}
							}
						}
					}
				}

				.itemMain {
					padding: 20rpx 0;

					.article {
						font-size: $font-base;
						color: $color-black;
						text-indent: 40upx;
						padding-bottom: 20rpx;
					}
				}

				.periphery {
					.dots {
						display: flex;
						align-items: center;
						margin: 20rpx 0;

						.dotsItem {
							margin: 10rpx 16rpx;
							padding: 0 4rpx;
							font-size: 32rpx;
							color: #999999;

							&.action {
								color: #333333;
								position: relative;
								z-index: 1;

								&::before {
									content: '';
									display: block;
									position: absolute;
									bottom: 0;
									left: 0;
									width: 100%;
									height: 16rpx;
									border-radius: 10rpx;
									background-image: linear-gradient(to right, #4faa81, #e3f5ed);
									z-index: -1;
								}
							}
						}
					}

					.scrollMain {
						white-space: nowrap;

						.scroll_item {
							display: inline-block;
							width: 25%;
							padding-right: 16rpx;
							box-sizing: content-box;

							.resName {
								padding: 14rpx 0;
								 white-space: nowrap;
								    text-overflow: ellipsis;
								    overflow: hidden;
								    word-break: break-all;
							}

							.resPrice {
								padding: 14rpx 0;
								 white-space: nowrap;
								    text-overflow: ellipsis;
								    overflow: hidden;
								    word-break: break-all;
							}
						}
					}

					.complete {
						display: flex;
						justify-content: center;

						.submit {
							padding: 16rpx 0;
							border: 1rpx solid #EEEEEE;
							border-radius: 10rpx;
						}
					}
				}
			
				.roomList{
					margin-top: 20rpx;
					
					.roomItem{
						display: flex;
						padding: 30rpx;
						
						.image{
							width: 200rpx;
							height: 200rpx;
							margin-right: 30rpx;
						}
						
						.roomInfo{
							height: 200rpx;
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							
							view{
								line-height: 1.8;
							}
							
							.roomName{
								color: #333333;
								font-weight: bold;
							}
							
							.roomDescribe{
								color: #999999;
							}
							
							.roomBot{
								display: flex;
								justify-content: space-between;
								align-items: center;
								
								.roomPrice{
									color: $price-related;
								}
							}
						}
					}
				}
			}
		}

		.load {
			width: 100%;
			height: 100%;
			background-color: #FFFFFF;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 9999999;
		}
	}
</style>
