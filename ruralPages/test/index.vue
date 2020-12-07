<template>
    <view class="ruralDetails">
        <view class="hahaha">

        </view>
		<view class="eee">

		</view>
    </view>
</template>
<script>
    export default{

    }
</script>

<style lang="scss" scoped>
    @mixin default-border($direction:top,$color:#4FAA81){
        @if $direction == top {
            border-top: 1px solid $color;
        }@else if $direction == bottom{
            border-bottom: 1px solid $color;
        }
    }

	.ruralDetails{
		.hahaha{
			width: 100rpx;
			height: 100rpx;
			background-color: $base-color;
            @include default-border(top,#000000)
		}
		.eee{
            @extend .hahaha
		}
	}
</style>
