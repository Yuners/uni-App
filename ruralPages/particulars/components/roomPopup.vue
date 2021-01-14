<template>
	<view>
		<u-popup mode="bottom" height="80%" v-model="show" closeable>
			<view class="main">
				<view class="roomTitle">
					房间详情
				</view>
				<view class="scroll">
					<view class="swiper">
						<u-swiper :list="roomData.fileList" name="fileUrl"></u-swiper>
					</view>
					<view class="roomName">
						{{ roomData.roomName }}
					</view>
					<view class="roomInfo">
						<view class="left">
							<view class="cell">
								<text class="cell_label">房间描述：</text>
								<text class="cell_value">{{ roomData.roomDescribe }}</text>
							</view>
							<view class="cell">
								<text class="cell_label">房间面积：</text>
								<text class="cell_value">{{ roomData.roomArea }}</text>
							</view>
							<view class="cell">
								<text class="cell_label">其它说明：</text>
								<text class="cell_value">{{ roomData.roomExplain || '暂无说明' }}</text>
							</view>
						</view>
						<view class="right">
							￥{{ roomData.roomPrice }}
						</view>
					</view>
					<view class="facility">
						<view class="itemTitle">
							设施包含
						</view>
						<view class="facilityList">
							<view class="listItem" v-for="(item,index) in roomData.roomFacilities" :key="index">
								{{ item }}
							</view>
						</view>
					</view>
				</view>
				<view class="bot-button">
					<view class="btn" @tap="show = false">
						查看其它房型
					</view>
					<view class="btn" @tap="phoneShow = true">
						立即预订
					</view>
				</view>
			</view>
		</u-popup>
		<u-modal v-model="phoneShow" @confirm="confirm" confirm-text="拨打电话" show-cancel-button>
			<view class="slot-content">
				<view style="padding: 40rpx;line-height: 1.5;font-size: 32rpx;color:#333333;">
					因系统升级，暂时只支持线下预订。请拨打商家电话咨询预订事宜
				</view>
				<view style="text-align: center;padding-bottom: 30rpx;">
					{{ roomData.phone }}
				</view>
			</view>
			
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				phoneShow: false,
				roomData: ''
			}
		},
		methods: {
			openPopup(data) {
				this.roomData = JSON.parse(JSON.stringify(data))
				this.roomData.roomFacilities = JSON.parse(this.roomData.roomFacilities)
				this.show = true
			},
			confirm(){
				uni.makePhoneCall({
				    phoneNumber: this.roomData.phone //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		height: 100%;
		display: flex;
		flex-direction: column;

		.roomTitle {
			height: 48px;
			line-height: 48px;
			padding-left: 30rpx;
			font-size: 36rpx;
			color: #333333;
			font-weight: bold;
		}

		.scroll {
			flex: 1;
			overflow-y: scroll;
			padding: 0 30rpx;

			.roomName {
				font-size: 38rpx;
				font-weight: bold;
				padding: 20rpx 0;
			}

			.roomInfo {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;

				.left {
					.cell {
						padding: 8rpx 0;

						.cell_label {
							color: #999999;
						}

						.cell_value {
							color: #333333;
						}
					}
				}

				.right {
					font-size: 36rpx;
					color: $price-related;
				}
			}

			.facility {
				margin-top: 30rpx;

				.itemTitle {
					font-size: 36rpx;
					color: #333333;
				}

				.facilityList {
					margin-top: 20rpx;

					.listItem {
						display: inline-block;
						padding: 15rpx;
					}
				}
			}
		}

		.bot-button {
			height: 48px;
			display: flex;

			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				flex: 1;

				&:first-child {
					background-color: #EEEEEE;
				}

				&:last-child {
					background-color: $base-color;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
