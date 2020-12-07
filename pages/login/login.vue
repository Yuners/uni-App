<template>
	<view class="login">
		<view class="logo">
			<image src="../../static/logo.png" mode="widthFix"></image>
		</view>
		<view class="login-main">
			<u-field
				name="Phone"
				v-model="phoneNumber"
				placeholder="手机号码"
				label-width="50"
				:field-style="fieldStyle"
			>
				<u-icon name="phone" slot="icon" size="40"></u-icon>
			</u-field>
			<u-field
				style="margin-top: 30rpx;"
				name="password"
				:password="!passwordShow"
				v-model="password"
				placeholder="登录密码"
				label-width="50"
				:field-style="fieldStyle"
				:clearable="false"
			>
				<u-icon name="lock" slot="icon" size="40"></u-icon>
				<switch class="detail" slot="right" :checked="passwordShow" color="#4FAA81" @change="switchChange" />
			</u-field>
		</view>
		<view class="skip">
			<view class="item" @tap="navTo('/pages/register/register')">
				注册账号
			</view>
			<view class="item" @tap="navTo('/ruralPages/password/forgetPass')">
				忘记密码				
			</view>
		</view>
		<view class="push-button">
			<view class="loginSub">
				登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber:'',
				password:'',
				passwordShow:false,
				fieldStyle:{
					fontSize:'30rpx'
				}
			}
		},
		methods: {
			switchChange(e){
				this.passwordShow = e.detail.value
			},
			navTo(path){
				this.$Router.push({
					path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		height: 100%;
		background-color: #fff;
		.logo{
			padding: 30rpx;
			text-align: center;
			image{
				width: 50vw;
			}
		}
		.login-main{
			padding: 0 100rpx;
			.detail{
				&::before{
					
				}
			}
		}
		
		.skip{
			padding: 0 100rpx;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
			.item{
				font-size: 28rpx;
				color: $base-color;
			}
		}
		.push-button{
			width: 100%;
			padding: 0 100rpx;
			margin-top: 50rpx;
			.loginSub{
				width: 100%;
				background-color: $base-color;
				font-size: 30rpx;
				color: #FFFFFF;
				line-height: 80rpx;
				border-radius: 36rpx;
				text-align: center;
			}
		}
	}

</style>
