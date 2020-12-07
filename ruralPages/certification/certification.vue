<template>
	<view class="userinfo">
		<view class="input-content">
			<view class="input-item">
				<u-field
					v-model="shopInfo.shopName"
					label="商铺名称:"
					placeholder="请输入商铺名称"
				>
				</u-field>
			</view>
			<view class="input-item">
				<u-field
					v-model="shopInfo.shopkeeper"
					label="店主姓名:"
					placeholder="请输入店主姓名"
				>
				</u-field>
			</view>
			<view class="input-item">
				<u-field
					v-model="shopInfo.country"
					label="所属乡村:"
					placeholder="请输入您所属乡村"
				>
				</u-field>
			</view>
			<view class="input-item">
				<u-field
					v-model="shopInfo.IDType"
					label="证件类型:"
					placeholder="请选择证件类型"
					disabled
					right-icon="arrow-right"
					@click="piacker"
				>
				</u-field>
				<u-select v-model="show" :list="list" @confirm="submit"></u-select>
			</view>
			<view class="input-item">
				<u-field
					v-model="shopInfo.IDnumber"
					label="证件号码:"
					placeholder="请输入证件号码"
				>
				</u-field>
			</view>
			<view class="input-item">
				<u-field
					v-model="shopInfo.mobile"
					label="手机号码:"
					placeholder="请输入手机号码"
				>
				</u-field>
			</view>
			<view class="input-item">
				<u-field
					label="手机号码:"
					name="code"
					v-model="shopInfo.code"
					placeholder="输入短信验证码"
				>
					<view class="getCode" slot="right" @tap="getCode">
						{{codeText}}
					</view>
				</u-field>
				<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
			</view>
			<view class="reminder">
				<view class="centent">
					常见问题？
				</view>
			</view>
			<button
				class="confirm-btn"
				:class="'bg-' + themeColor.name"
				:disabled="btnLoading"
				:loading="btnLoading"
			>
				绑定商铺
			</button>
		</view>

	</view>
</template>

<script>
/**
 * @des 修改用户信息
 *
 * @author stav stavyan@qq.com
 * @date 2020-01-10 14:28
 * @copyright 2019
 */

export default {
	data() {
		return {
			shopInfo:{
				shopName:'',
				shopkeeper:'',
				country:'',
				IDType:'',
				IDnumber:'',
				mobile:'',
				code:'',
			},
			btnLoading: false,
			themeColor:{
				name:'rf',
				color:'#4FAA81'
			},
			codeText: '',
				show: false,
				list: [
					{
						value: '1',
						label: '江'
					},
					{
						value: '2',
						label: '湖'
					}
				],
		};
	},
	onLoad() {
	},
	methods: {
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
			piacker(){
				this.show = true
			},
			submit(e){
				this.shopInfo.IDType = e[0].label
			}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: $color-white;
}

.userinfo {
	.user-section {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 320upx;
		padding: 40upx 30upx 0;
		overflow: hidden;
		position: relative;
		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100vw;
			opacity: 0.84;
		}

		.portrait-box {
			clear: both;
			z-index: 2;
		}

		.portrait {
			position: relative;
			width: 200upx;
			height: 200upx;
			border-radius: 50%;
			border: 6upx solid #fff;
		}

		.yticon {
			position: absolute;
			line-height: 1;
			z-index: 5;
			font-size: 48upx;
			color: #fff;
			padding: 4upx 6upx;
			border-radius: 6upx;
			background: rgba(0, 0, 0, 0.4);
		}

		.pt-upload-btn {
			right: 0;
			bottom: 10upx;
		}

		.bg-upload-btn {
			right: 20upx;
			bottom: 16upx;
		}
	}

	.input-content {
		padding: 40upx 60upx;

		.input-item {
			display: flex;
			padding: 0 20upx;
			padding-left: 0;
			// background: $page-color-light;
			height: 80upx;
			line-height: 80upx;
			margin-bottom: 30upx;

			&:last-child {
				margin-bottom: 0;
			}

			.tit {
				width: 150upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				text-align: center;
			}

			input {
				width: calc(100% - 100upx);
				height: 80upx;
				line-height: 80upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
			}

			.date {
				height: 80upx;
				line-height: 80upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
			}

			.gender-item {
				margin-right: 20upx;

				.gender-item-text {
					padding-left: 10upx;
				}

				radio .wx-radio-input.wx-radio-input-checked {
					background: $uni-color-primary;
					border-color: $uni-color-primary;
				}
			}
		}
	
		.reminder{
			padding-top: 30rpx;
			text-align: right;
			color: $base-color;
			font-size: 30rpx;
		}
	}
}
</style>
