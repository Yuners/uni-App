<template>
	<view class="inprint">
		<view class="image_item">
			<image src="../../static/svg/imprint.svg" mode="widthFix"></image>
			<view>版本不息 优化不止</view>
		</view>
		<view class="main">
			<view class="versions">
				<view class="text">
					V1.0.0
				</view>
				<view class="time">
					2020-10-01
				</view>
			</view>
			<view class="centent">
				1.在地图上可以漫游到你喜欢的村庄, 原来她就在哪里<br>
				2.您可以即时了解每个乡村的动态<br>
				3.您可以收到每个乡村发出的精美名片<br>
				4.您还可以搜索你喜欢的乡村, 领略它的别样风采<br>
				5.在您对乡村的美赞不绝口时, 你还可以把你中意的宝贝带回家
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.inprint{
		height: 100%;
		.image_item{
			text-align: center;
			padding: 50rpx;
			font-size:30rpx;
			color:#000000;
			background-color: #FFFFFF;
			image{
				width: 200rpx;
				margin-bottom: 20rpx;
			}
		}
		
		.main{
			margin-top: 30rpx;
			background-color: #FFFFFF;
			.versions{
				padding: 0 30rpx;
				height: 80rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 30rpx;
				color: $font-color-light;
				border-top:2rpx solid rgba(0,0,0,.5) ;
				border-bottom:2rpx solid rgba(0,0,0,.5) ;
			}
			.centent{
				padding: 20rpx 30rpx;
				line-height: 2;
				font-size: 28rpx;
				color: $font-color-light;
			}
		}
	}
</style>
