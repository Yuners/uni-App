<template>
	<view class="login">
		<view class="logo">
			<image src="../../static/logo.png" mode="widthFix"></image>
		</view>
		<view class="login-main">
			<u-field name="Phone" v-model="userPhone" placeholder="手机号码" label-width="50" :field-style="fieldStyle">
				<u-icon name="phone" slot="icon" size="40"></u-icon>
			</u-field>
			<u-field style="margin-top: 30rpx;" name="password" :password="!passwordShow" v-model="userPassword" placeholder="登录密码"
			 label-width="50" :field-style="fieldStyle" :clearable="false">
				<u-icon name="lock" slot="icon" size="40"></u-icon>
				<switch class="detail" slot="right" :checked="passwordShow" :color="passwordShow ? '#4FAA81' : '#dcdfe6'" @change="switchChange" />
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
			<view class="loginSub" @tap="login">
				登录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userPhone: '',
				userPassword: '',
				passwordShow: false,
				fieldStyle: {
					fontSize: '30rpx'
				}
			}
		},
		methods: {
			switchChange(e) {
				this.passwordShow = e.detail.value
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			login() {
				if (!this.userPhone) {
					this.$msg('请填写手机号码');
					return
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.userPhone)) {
					this.$msg('请输入正确的手机号码');
					return;
				}
				if (!this.userPassword) {
					this.$msg('请填写登录密码');
					return
				}
				let params = {
					userPhone: this.userPhone,
					userPassword: this.userPassword
				}
				this.$store.dispatch('user/login', params)
					.then( res => {
						if (res.userFlag){
							this.$msg(res.msg);
							this.$store.dispatch('getProfile')
							setTimeout(() => {
								uni.switchTab({
								    url: '/pages/index/index'
								});
							},500)
						} else {
							this.$msg(res.msg);
						}
					})
					.catch( err => {
						console.log(err)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		height: 100%;
		background-color: #fff;

		.logo {
			padding: 30rpx;
			text-align: center;

			image {
				width: 50vw;
			}
		}

		.login-main {
			padding: 0 100rpx;

			.detail {
				&::before {
					display: none;
				}
			}
		}

		.skip {
			padding: 0 100rpx;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;

			.item {
				font-size: 28rpx;
				color: $base-color;
			}
		}

		.push-button {
			width: 100%;
			padding: 0 100rpx;
			margin-top: 50rpx;

			.loginSub {
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
