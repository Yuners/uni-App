<template>
	<view class="ruralHome">
		<!-- <u-navbar :is-back="true" title="乡村简介" :background="background" :border-bottom="false" back-icon-color="#FFFFFF"
		 title-color="#FFFFFF" immersive> -->
			<!-- #ifdef APP-PLUS -->
			<!-- <template slot="right">
				<image class="imageItem" :src="require('@/static/images/share.png')" />
				<image class="imageItem" :src="require('@/static/images/collect.png')" />
			</template> -->
			<!-- #endif -->
		<!-- </u-navbar> -->
		<view class="wrap-main" v-if="villageInfo">
			<view class="backImage" v-if="villageFile && villageType == '图片'">
				<u-swiper height="534" name="fileUrl" :list="villageFile" mode="dot" indicator-pos="bottomCenter"></u-swiper>
			</view>
			<view class="backImage" v-else-if="villageFile && villageType == '视频'">
				<video autoplay show-mute-btn class="_video" :src="villageFile[0].fileUrl" controls></video>
			</view>
			<view class="wrap-about">
				<view class="villageInfo">
					<view class="title">
						{{ villageInfo.villageName }}
					</view>
					<view class="site">
						<image :src="require('@/static/images/icon_location@3x.png')" />
						<view class="siteInfo">
							杭州市仓前街道良渚镇良渚村
						</view>
						<view class="skit">
							导航>
						</view>
					</view>
				</view>
				<view class="villageDetails">
					<view class="title">
						村简介
					</view>
					<u-read-more id="content" :toggle="true" show-height="312" font-size="24" color="#4EA63D">
						<rich-text :nodes="villageInfo.villageIntroduction"></rich-text>
					</u-read-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		getVillageDetails
	} from "@/api/villageDetails.js"
	import { parseHtml } from "@/utils/html-parser.js"

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
					background: 'transparent'
				},
				villageInfo:'',
				villageType:'',
				villageFile:'',
			}
		},
		watch:{
			villageId(val){
				console.log(val)
			}
		},
		mounted() {
			if(!this.villageId) return
			this.getDetails(this.villageId)
		},
		methods: {
			getDetails(id) {
				let params = {
					villageLocationId: id
				}
				getVillageDetails(params)
					.then(res => {
						let data = res.data
						if(data.code == 1){
							this.villageInfo = data.data
							this.villageType = data.data.villagePropagandaType
							this.villageFile = data.data.villageDescribeList
						}
					})
					.catch(err => {
						console.log(err)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ruralHome {
		min-height: 100%;
		position: relative;
		background-color: #ffffff;
		padding-bottom: 50px;

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

		.backImage {
			width: 100%;
			height: 534rpx;

			._video{
				width: 100%;
				height: 534rpx;
			}
			/* image {
				width: 100%;
				height: 100%;
			} */
		}

		.wrap-about {
			padding: 0 30rpx;

			.villageInfo {
				margin-top: 30rpx;
				width: 100%;
				border-radius: 10rpx;
				box-shadow: 0rpx 0rpx 14rpx 2rpx rgba(237, 237, 237, 0.85);
				padding-left: 28rpx;

				.title {
					font-size: 42rpx;
					color: #000000;
					font-weight: bold;
					padding-top: 30rpx;
				}

				.site {
					display: flex;
					align-items: center;
					padding-top: 28rpx;
					padding-bottom: 36rpx;

					image {
						width: 21rpx;
						height: 27rpx;
						margin-right: 11rpx;
					}

					.siteInfo {
						color: #6F6F6F;
						font-size: 24rpx;
						margin-right: 15rpx;
					}

					.skit {
						color: #4EA63D;
						font-size: 20rpx;
						text-decoration: underline;
					}
				}
			}

			.villageDetails {
				padding-top: 36rpx;

				.title {
					font-size: 36rpx;
					color: #000000;
					font-weight: bold;
					margin-bottom: 28rpx;
				}
			}
		}
	}
</style>
