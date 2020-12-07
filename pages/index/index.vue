<template>
	<view class="content">
		<map style="width: 100%; height: 100%;" :latitude="latitude" :longitude="longitude" :markers="covers" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 30.37961,
				longitude: 120.06709,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: require('@/static/images/icon_location@3x.png')
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: require('@/static/images/icon_location@3x.png')
				}]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
