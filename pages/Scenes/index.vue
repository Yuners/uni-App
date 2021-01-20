<template>
	<view class="scence">
		<view class="tablist" style="top: 0;">
			<u-navbar :is-back="false" :is-fixed="false" :background="background">
				<view class="navContent">
					<view class="flex-left" @tap="openCity">
						<view class="text">
							<span>{{ defaultArea.frameworkName }}</span>
							<u-icon name="arrow-down" color="#ffffff" size="30" />
						</view>
					</view>
					<view class="flex-center">
						<u-search
						 placeholder="输入乡村名字"
						 height="60"
						 :show-action="false"
						 margin="0 0 0 15rpx"
						 bg-color="#ffffff"
						 :input-style="searchStyle"
						 @search="confirmSearch"
						  />
					</view>
				</view>
			</u-navbar>
		</view>
		<!-- <u-tabs-swiper ref="tabs" :list="tabsList" :is-scroll="false" :current="current" @change="sectionChange"></u-tabs-swiper> -->
		<view class="tablist" :style="{top:topHeight + 'px'}">
			<u-subsection :list="tabsList" height="85" :current="current" @change="sectionChange"></u-subsection>
		</view>
		<!--<view style="height: 85rpx;"></view>  -->
		<view class="tabMain" v-show="current == 0">
			<scenery ref="scenery" />
		</view>
		<view class="tabMain" v-show="current == 1">
			<gourmet ref="gourmet" />
		</view>
		<view class="tabMain" v-show="current == 2">
			<homestay ref="homestay" />
		</view>
		<lb-picker ref="picker" v-model="value" :list="cityList" mode="multiSelector" :level="2" :props="myProps" @confirm="confirmPicker" ></lb-picker>
		<!-- <u-select
			v-model="show"
			mode="mutil-column-auto"
			:list="list"
			@confirm="confirm"
			value-name="frameworkAdministrative"
			label-name="frameworkName"
			child-name="items"
			></u-select> -->
	</view>
</template>

<script>
	import Scenery from "./components/scenery.vue"
	import Gourmet from "./components/gourmet.vue"
	import Homestay from "./components/homestay.vue"
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				background: {
					backgroundColor: '#4FAA81',
				},
				keyword: '',
				searchStyle: {
					fontSize: '24rpx'
				},
				defaultArea:{
					frameworkAdministrative: "140000000000",
					frameworkId: "1338353936444280803",
					frameworkName: "山西省",
					frameworkPpId: "1338353936444280801",
				},
				tabsList: [{
						name: '乡村风景'
					},
					{
						name: '乡村美食'
					},
					{
						name: '乡村民宿'
					}
				],
				current: 0,
				list: [],
				myProps: {
					label: 'frameworkName',
					value: 'frameworkAdministrative',
					children: 'query'
				},
				value: [],
				scenery: true,
				gourmet: true,
				homestay: true,
				topHeight: '',
				statusBarHeight: ''
			}
		},
		components: {
			Scenery,
			Gourmet,
			Homestay
		},
		computed: {
			...mapGetters(['cityList'])
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
					this.statusBarHeight = res.statusBarHeight
				}
			})
		},
		onReachBottom() {
			switch (this.current) {
				case 0:
					this.$refs.scenery.loadMore()
					break;
				case 1:
					this.$refs.gourmet.loadMore()
					break;
				case 2:
					this.$refs.homestay.loadMore()
					break;
			}
		},
		onPullDownRefresh() {
			switch (this.current) {
				case 0:
					this.$refs.scenery.pullRefresh()
					break;
				case 1:
					this.$refs.gourmet.pullRefresh()
					break;
				case 2:
					this.$refs.homestay.pullRefresh()
					break;
			}
		},
		methods: {
			confirm(val) {
				console.log(val)
			},
			sectionChange(index) {
				this.current = index
				switch (index) {
					case 1:
						if (!this.gourmet) return
						this.gourmet = false
						this.$refs.gourmet.fetchData()
						break;
					case 2:
						if (!this.homestay) return
						this.homestay = false
						this.$refs.homestay.fetchData()
						break;
				}
			},
			openCity() {
				this.$refs.picker.show()
			},
			confirmSearch(value){
				console.log(value)
			},
			confirmPicker(value) {
				const data = value.item.reverse()[0]
				this.defaultArea = data
			}
		},

	}
</script>

<style lang="scss" scoped>
	.scence {
		background: #F4F4F4;
		min-height: 100%;
		position: relative;

		.tablist {
			position: sticky;
			z-index: 9999;
			left: 0;
			width: 100%;
			border-radius: 0;
			background-color: #eeeeef;
		}

		.navContent {
			width: 100%;
			padding: 0 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.flex-left {
				span {
					color: #ffffff;
					font-size: 30rpx;
					margin-right: 10rpx;
				}
			}

			.flex-center {
				flex: 1;
			}
		}


		.scroll-box {
			background: #F4F4F4;

		}
	}
</style>
