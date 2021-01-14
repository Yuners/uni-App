<!-- 

Loadingå› 
 -->
<template>
	<view class="loading-box">
		<!-- loading7 -->
		<view class="lds-default">
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
			<view></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
	created() {}
};
</script>

<style lang="scss" scoped>
	.loading-box >view{
		margin: 15upx 20upx;
	}
@import './loading7';
</style>
