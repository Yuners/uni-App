<template>
	<view class="register">
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
				name="code"
				v-model="code"
				placeholder="输入短信验证码"
				label-width="50"
				:field-style="fieldStyle"
			>
				<u-icon name="lock-open" slot="icon" size="40"></u-icon>
				<view class="getCode" slot="right" @tap="getCode">
					{{codeText}}
				</view>
			</u-field>
			<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
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
			<view class="check" :class="{'check-bj':protocol}" @tap="proto">
				<u-icon name="checkbox-mark" size="20" color="#ffffff"></u-icon>
			</view>
			我已阅读并同意《用户服务协议》
		</view>
		<view class="push-button">
			<view class="loginSub">
				确认
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
				},
				code: '',
				codeText: '',
				protocol:false,
			}
		},
		methods: {
			switchChange(e){
				this.passwordShow = e.detail.value
			},
			navTo(url){
				uni.navigateTo({
					url
				})
			},
			codeChange(text) {
				this.codeText = text;
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 1000);
				}else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			proto(){
				this.protocol = !this.protocol
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register{
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
					display: none;
				}
			}
			.getCode{
				color: $base-color;
			}
		}

		.skip{
			padding: 0 100rpx;
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			font-size: 28rpx;
			color:$base-color;
			.check{
				width: 40rpx;
				height: 40rpx;
				border:1rpx solid rgba(197, 197, 197, 0.5);
				border-radius: 50%;
				margin: 0 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				&.check-bj{
					background-color: $base-color;
				}
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
