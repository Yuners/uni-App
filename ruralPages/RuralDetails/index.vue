<template>
	<view class="ruralDetails">
		<view class="ruralMain">
			<view class="ruralHeight" v-show="active == 0">
				<ruralHome :villageId="villageId" />
			</view>
			<view class="ruralHeight" v-show="active == 1">
				<landscape :villageId="villageId" ref="landscape" />
			</view>
			<view class="ruralHeight" v-show="active == 2">
				<food :villageId="villageId" ref="food" />
			</view>
			<view class="ruralHeight" v-show="active == 3">
				<accommodation :villageId="villageId" ref="accommodation" />
			</view>
			<view class="ruralHeight" v-show="active == 4">
				<specialty :villageId="villageId" ref="specialty" />
			</view>
		</view>
		<view class="tabBar">
			<view class="item" :class="{active:active == index}" v-for="(item,index) in tabBarList" :key="index" @tap="handTab(index)">
				<view class="image">
					<image :src="active == index ? item.selectedIconPath : item.iconPath" />
				</view>
				<view class="text">
					<text>{{ item.text }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import RuralHome from "./components/RuralHome/index.vue"
	import Landscape from "./components/Landscape/index.vue"
	import Food from "./components/Food/index.vue"
	import Accommodation from "./components/Accommodation/index.vue"
	import Specialty from "./components/Specialty/index.vue"

	export default {
		data() {
			return {
				active: 0,
				tabBarList: [{
						iconPath: "/static/images/home_x.png",
						selectedIconPath: "/static/images/home.png",
						text: '首页',
					},
					{
						iconPath: "/static/images/w_scenery.png",
						selectedIconPath: "/static/images/w_scenertyx.png",
						text: '风景',
					},
					{
						iconPath: "/static/images/roomandboard.png",
						selectedIconPath: "/static/images/roomandboardx.png",
						text: '美食',
					},
					{
						iconPath: "/static/images/roomandboard.png",
						selectedIconPath: "/static/images/roomandboardx.png",
						text: '民宿',
					},
					{
						iconPath: "/static/images/localspecialty.png",
						selectedIconPath: "/static/images/localspecialtyx.png",
						text: '特产',
					},
				],
				landscape: true,
				food: true,
				accommodation: true,
				specialty: true,
				villageId:''
			}
		},
		components: {
			RuralHome,
			Landscape,
			Accommodation,
			Specialty,
			Food
		},
		onLoad(option) {
			this.villageId = option.id
		},
		onReachBottom() {
			switch (this.active) {
				case 1:
					this.$refs.landscape.loadMore()
					break;
				case 2:
					this.$refs.food.loadMore()
					break;
			}
		},
		onPullDownRefresh() {
			switch (this.active) {
			    case 0:
                  uni.stopPullDownRefresh();
                  break;
				case 1:
                  this.$refs.landscape.pullRefresh()
                  break;
				case 2:
                  this.$refs.food.pullRefresh()
                  break;
			}
		},
		methods: {
			/**
			 * tab切换
			 * @param ind
			 */
			handTab(ind) {
				this.active = ind
				switch (ind) {
					case 1:
						if(!this.landscape) return
						this.landscape = false
						this.$refs.landscape.fetchData()
						break;
					case 2:
						if(!this.food) return
						this.food = false
						this.$refs.food.fetchData()
						break;
				}
			},
			toJSON(){
				return this
			}
		}
	}
</script>


<style lang="scss" scoped>
	/*page{*/
	/*  height: calc(100% - 50px);*/
	/*  overflow-y: scroll;*/
	/*}*/
	.ruralDetails {
		position: relative;
		height: calc(100% - 50px);

		.ruralMain {
			height: 100%;

			.ruralHeight {
				height: 100%;
			}
		}

		.tabBar {
			background: #ffffff;
			height: 50px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 9999;
			border-top: 2rpx solid rgba(0, 0, 0, .1);

			.item {
				flex: 1;
				text-align: center;

				.image {
					image {
						width: 40rpx;
						height: 40rpx;
					}
				}

				.text {
					font-size: 24rpx;
					color: #DADADA;
				}

				&.active {
					text {
						color: #4FAA81;
					}
				}
			}
		}
	}
</style>
