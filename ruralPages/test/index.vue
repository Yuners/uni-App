<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :current="itemId" :autoplay="autoplay" :interval="interval" :duration="duration" @change="intervalChange">
						<swiper-item>
							<view class="swiper-item uni-bg-red">
								<scroll-view scroll-x class="scroll-box">
									<image src="../../static/images/2.jpg" mode="scaleToFill"></image>
									<image src="../../static/images/2.jpg" mode="scaleToFill"></image>
									<image src="../../static/images/2.jpg" mode="scaleToFill"></image>
									<image src="../../static/images/2.jpg" mode="scaleToFill"></image>
									<image src="../../static/images/2.jpg" mode="scaleToFill"></image>
									<image src="../../static/images/2.jpg" mode="scaleToFill"></image>
								</scroll-view>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-green">B</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-blue">C</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="dots">
				<view class="dotsItem" :class="{action: index == itemId}" v-for="(item,index) of 3" :key="index" @tap="dotTap(index)">
					{{ index + 1 }}
				</view>
			</view>
		</view>
		<scroll-view class="scroll-view_H" scroll-x="true">
			<view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
			<view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
			<view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
		</scroll-view>
	</view>
</template>

<script>
	import city from "@/city.js"

	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				autoplay: false,
				interval: 4000,
				duration: 400,
				itemId: 0
			}
		},
		onReady() {},
		onLoad() {},
		methods: {
			intervalChange(e) {
				this.itemId = e.detail.current
			},
			dotTap(index) {
				this.itemId = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-box {
		width: 100%;
		white-space: nowrap;

		image {
			width: 110px;
			height: 200rpx;
		}
	}
	.uni-bg-red{
		background-color: red;
	}
	.uni-bg-green{
		background-color: green;
		
	}
	.uni-bg-blue{
		background-color: blue;
	}
	.scroll-view_H{
		white-space: nowrap;
		width: 100%;
	}
	.scroll-view-item_H{
		display: inline-block;
		width: 100%;
	}
</style>
