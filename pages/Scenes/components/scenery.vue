<template>
	<view class="scenery">
		<view v-if="!loading">
			<view class="list-item" v-for="(item,index) of list" :key="index" @tap="ruralSkip(item.sceneryLocationId)">
				<view class="backImage">
					<u-image :src="item.fileUrl" mode="scaleToFill" height="420" />
					<view class="itemAbout">
						<view class="aboutTitle">
							<text class="burg">{{ item.villageName }}</text>
							<text>{{ item.sceneryName }}</text>
						</view>
						<view class="aboutMain">
							<text>{{ item.describeContent }}</text>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore v-show="list && list.length" :status="status" :icon-type="iconType" :load-text="loadText" @loadmore="loadMore" margin-bottom="30" />
			<u-empty class="noContent" margin-top="300" v-show="!list.length" mode="list"></u-empty>
		</view>
		<view class="loading" v-else>
			<loading></loading>
		</view>
	</view>
</template>

<script>
	import {
		getSceneryList
	} from '@/api/country.js'


	export default {
		data() {
			return {
				list: [],
				pages: {
					pageSize: 5, // 每页多少条
					pageIndex: 1, // 当前页数
					total: 0, // 总页数
				},
				status: 'loadmore',
				iconType: 'flower',
				loadText: {
					loadmore: '点击或上拉加载',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				loading: true,
			}
		},
		created() {
			this.fetchData()
		},
		methods: {
			fetchData(type) {
				let params = {
					curPage: this.pages.pageIndex,
					pageSize: this.pages.pageSize,
					isDeleted: 0,
					isDisabled: 0
				}
				getSceneryList(params)
					.then(res => {
						let data = res.data
						if (data.code == '1') {
							if (data.data.length) {
								if (type == 'pull'){
									this.list = []
								}
								this.list = this.list.concat(data.data)
								this.pages.total = data.page.total
								if (this.pages.total <= this.list.length) {
									this.status = 'nomore'
								} else{
									this.status = 'loadmore'
								}
							} else {
								this.status = 'nomore'
							}
						} else {}
						this.loading = false
					})
					.catch(err => {
						console.log(err)
						this.loading = false
					})
			},
			loadMore() {
				if (this.list.length >= this.pages.total) {
					this.status = "nomore";
					return;
				}
				this.pages.pageIndex++
				this.status = 'loading'
				this.fetchData()
			},
			pullRefresh(){
				this.pages.pageIndex = 1
				this.pages.total = 0
				this.fetchData('pull')
				  setTimeout(function () {
				    uni.stopPullDownRefresh();
				  }, 1000);
			},
			ruralSkip(id) {
				uni.navigateTo({
					url: `/ruralPages/RuralDetails/index?id=${id}`,
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.scenery{
		position: relative;
		
		
		.loading{
			margin-top: 300rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.list-item {
		width: 100%;
		height: 420rpx;
		position: relative;
		margin-bottom: 30rpx;
	
		.itemAbout {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 130rpx;
			padding: 0 30rpx;
			background: rgba(0, 0, 0, .8);
	
			.aboutTitle {
				margin-top: 22rpx;
				margin-bottom: 12rpx;
				text {
					font-size: 30rpx;
					color: #ffffff;
				}
				
				.burg{
					font-size: 38rpx;
					margin-right: 15rpx;
				}
			}
	
			.aboutMain {
				text {
					color: #ffffff;
					font-size: 24rpx;
					text-overflow: -o-ellipsis-lastline;
					  overflow: hidden;
					  text-overflow: ellipsis;
					  display: -webkit-box;
					  -webkit-line-clamp: 2;
					  line-clamp: 2;
					  -webkit-box-orient: vertical;
				}
			}
		}
	}
</style>
