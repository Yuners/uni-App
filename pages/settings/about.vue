<template>
	<view class="about">
		<view class="logo">
			<image src="../../static/logo.png" mode="widthFix"></image>
		</view>
		<view class="info">
			<view class="telephone">
				客服热线：400-0000-000
			</view>
			<view class="email">
				客服邮箱：service@site.com
			</view>
			<view class="versions">
				当前版本：v 1.0.0
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.about{
		height: 100%;
		text-align: center;
		.info{
			view{
				line-height: 2;
				font-size: 30rpx;
				color: $font-color-light;
			}
		}
	}
</style>
