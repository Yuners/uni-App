<template>
	<view class="userinfo">
		<!--头像 + 背景-->
		<view class="user-section" :class="'bg-' + themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--#ifdef H5-->
			<!--h5直接上传头像-->
			<view class="portrait-box" @tap="uploadImage">
				<image
					class="portrait"
					:src="profileInfo.head_portrait || headImg"
				></image>
			</view>
			<!-- #endif -->
			<!--#ifndef H5-->
			<!--非h5裁剪头像上传-->
			<view class="portrait-box">
				<fl-avatar
					canRotate="false"
					selWidth="200px"
					selHeight="400upx"
					@upload="handleUploadFile"
					:avatarSrc="profileInfo.head_portrait || headImg"
					avatarStyle="width: 200upx; height: 200upx; border-radius: 100%; border: 6upx solid #fff;"
				>
				</fl-avatar>
			</view>
			<!-- #endif -->
		</view>
		<view class="input-content">
			<view class="input-item">
				<text class="tit">手机号</text>
				<input
					type="number"
					v-model="profileInfo.mobile"
					disabled
					placeholder="请输入手机号码"
				/>
			</view>
			<view class="input-item">
				<text class="tit">昵　称</text>
				<input
					type="text"
					v-model="profileInfo.nickname"
					placeholder="请输入您的昵称"
				/>
			</view>
			<view class="input-item">
				<text class="tit">姓　名</text>
				<input
					type="text"
					v-model="profileInfo.realname"
					placeholder="请输入您的姓名"
				/>
			</view>
			<view class="input-item">
				<text class="tit">性　别</text>
				<radio-group @change="handleGenderChange">
					<label
						class="gender-item"
						v-for="(item, index) in genders"
						:key="index"
					>
						<radio
							class="gender-item-radio"
							:color="themeColor.color"
							:value="item.value"
							:checked="item.value === profileInfo.gender"
						/>
						<text class="gender-item-text">{{ item.name }}</text>
					</label>
				</radio-group>
			</view>
			<view class="input-item">
				<text class="tit">生　日</text>
				<picker mode="date" v-model="date" @change="bindDateChange">
					<view class="date" style="background: none;">{{
						date || '请选择日期'
					}}</view>
				</picker>
			</view>
			<view class="input-item">
				<text class="tit">城　市</text>
				<input
					type="text"
					v-model="profileInfo.qq"
					placeholder="填写职业"
				/>
			</view>
			<view class="input-item">
				<text class="tit">职　业</text>
				<input
					type="text"
					v-model="profileInfo.qq"
					placeholder="填写职业"
				/>
			</view>
			<view class="input-item">
				<text class="tit">个性签名</text>
				<input v-model="profileInfo.email" placeholder="填写您的个性签名" />
			</view>
			<button
				class="confirm-btn"
				:class="'bg-' + themeColor.name"
				:disabled="btnLoading"
				:loading="btnLoading"
				@tap="toUpdateInfo"
			>
				修改资料
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
import moment from '@/common/moment';

export default {
	data() {
		return {
			loadProgress: 0,
			profileInfo: {"id":"2949","merchant_id":"0","username":"155555555555","password_hash":"$2y$13$UNIraWg2ch17lgtMuELAR.ZjzTwFO8MM9ihOubLtG6KjUHfCbhug6","auth_key":"kEl6Th3A9yC7aJTwKD6OLgA4qOe-xg7a","password_reset_token":"","type":"1","nickname":"","realname":"","head_portrait":"","current_level":"1","gender":"0","qq":"","email":"","birthday":null,"visit_count":"6","home_phone":"","mobile":"15516017718","role":"10","last_time":"1606894138","last_ip":"115.197.82.68","province_id":"0","city_id":"0","area_id":"0","pid":"0","level":"1","promo_code":"Y21MBQB9Gm","tree":"tr_0 ","status":"1","created_at":"1606726401","updated_at":"1606894199","account":{"id":"2949","merchant_id":"0","member_id":"2949","level":"-1","user_money":"11079.00","accumulate_money":"11111.00","give_money":"0.00","consume_money":"-32.00","frozen_money":"0.00","user_integral":"0","accumulate_integral":"0","give_integral":"0","consume_integral":"0.00","frozen_integral":"0","status":"1"},"memberLevel":null,"coupon_num":"0","cart_num":"0","order_synthesize_num":{"0":0,"1":0,"2":0,"3":"1","-1":"0"},"promoter":null,"is_open_commission":"1"},
			genders: [
				{
					value: '0',
					name: '未知'
				},
				{
					value: '1',
					name: '男'
				},
				{
					value: '2',
					name: '女'
				}
			],
			date: moment().format('YYYY-MM-DD'),
			array:['中国', '美国', '巴西', '日本'],
			index:0,
			token: null,
			loading: true,
			headImg: require('@/static/images/missing-face.png'),
			userBg: require('@/static/images/user-bg.png'),
			btnLoading: false,
			themeColor:{
				name:'rf',
				color:'#4FAA81'
			}
		};
	},
	onLoad() {
		console.log(moment().format('YYYY-MM-DD'))
		this.initData();
	},
	methods: {
		// 上传头像
		uploadImage() {
			// 从相册选择图片
			const _this = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album'],
				success: function(res) {
					_this.handleUploadFile(res.tempFilePaths);
				}
			});
		},
		// 上传头像
		handleUploadFile(data) {
			
		},
		// 监听日期更改
		bindDateChange(e) {
			this.date = e.target.value;
		},
		// 监听城市更改
		bindCityChange(e) {
			this.city = e.target.value;
		},
		// 监听性别更改
		handleGenderChange(e) {
			this.profileInfo.gender = e.detail.value;
		},
		// 数据初始化
		initData() {
			this.getMemberInfo();
		},
		// 获取用户信息
		getMemberInfo() {
			
		},
		// 更新用户信息
		toUpdateInfo() {
			this.handleUpdateInfo();
		},
		// 更新用户信息
		async handleUpdateInfo() {
			
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
			background: $page-color-light;
			height: 80upx;
			line-height: 80upx;
			border-radius: 4px;
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
	}
}
</style>
