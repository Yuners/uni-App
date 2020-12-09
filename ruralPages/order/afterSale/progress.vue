<template>
	<view class="progress">
		<view class="saleInfo">
			<view class="code">
				服务单号：111111
			</view>
			<view class="time">
				申请时间：2017-11-11 17:00
			</view>
		</view>
		<view class="information">
			<view class="icon">
				<u-icon name="checkbox-mark" color="#ffffff" size="28" />
			</view>
			<view class="text">
				您的售后服务单已完成，感谢您的支持与理解！
			</view>
		</view>
		<view class="tracking">
			<view class="title">
				进度跟踪
			</view>
			<view class="main">
				<u-time-line>
					<u-time-line-item v-for="(item,index) of 5" :key="index">
						<template v-slot:node>
							<view class="u-node" :class="{active:index == 0}">
							</view>
						</template>
						<template v-slot:content>
							<view>
								<view class="u-order-desc">[自提柜]您的快件已放在楼下侧门见一红灯笼停下，喊“芝麻开门”即可。</view>
								<view class="u-order-time">2019-05-08 12:12</view>
							</view>
						</template>
					</u-time-line-item>
				</u-time-line>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.progress {
		height: 100%;

		.saleInfo {
			padding: 30rpx;
			background-color: #FFFFFF;

			@include _border($dir: bottom) .code,
				.time {
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				line-height: 2;
			}
		}

		.information{
			margin-top: 30rpx;
			background-color: #FFFFFF;
			padding: 20rpx 30rpx;
			display: flex;
			align-items: center;
			.icon{
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				background-color: $base-color;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
			.text{
				margin-left: 20rpx;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
			}
		}
		
		.tracking{
			margin-top: 30rpx;
			background-color: #FFFFFF;
			.title{
				padding: 30rpx;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
				@include _border($dir:bottom);
			}
			.main{
				padding: 30rpx 70rpx;
				.u-node {
						width: 30rpx;
						height: 30rpx;
						border-radius: 50%;
						background: #d0d0d0;
						&.active{
							background-color: $base-color;
						}
					}
					
				.u-order-desc {
					color: rgb(150, 150, 150);
					font-size: 28rpx;
					margin-bottom: 6rpx;
				}
				
				.u-order-time {
					color: rgb(200, 200, 200);
					font-size: 26rpx;
				}
				view{
					line-height: 1.7;
				}
			}
		}
	}
</style>
