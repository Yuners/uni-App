<template>
	<view class="content">
		<map style="width: 100%; height: 100%;" :polygons="polygons" :latitude="latitude" :longitude="longitude" :markers="covers" />
	</view>
</template>

<script>
	import city from "@/city.js"
	
	export default {
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 42.82076954338393,
				longitude: 126.0966025302346,
				covers: [{
					latitude: 42.82076954338393,
					longitude: 126.0966025302346,
					iconPath: require('@/static/images/icon_location@3x.png')
				}],
				polygons: [{
					//多边形的坐标数组
					points: city,
					fillColor: "#ffb30020", //填充颜色
					strokeColor: "#DC143C", //描边颜色
					strokeWidth: 2, //描边宽度
					zIndex: 1, //层级
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
