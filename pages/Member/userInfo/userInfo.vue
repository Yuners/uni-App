<template>
	<view class="userinfo" v-if="!loading">
		<!--头像 + 背景-->
		<view class="user-section" :class="'bg-' + themeColor.name">
			<image class="bg" :src="userBg"></image>
			<!--#ifdef H5-->
			<!--h5直接上传头像-->
			<view class="portrait-box" @tap="uploadImage">
				<image class="portrait" :src="profileInfo.userPhoto || headImg"></image>
			</view>
			<!-- #endif -->
			<!--#ifndef H5-->
			<!--非h5裁剪头像上传-->
			<view class="portrait-box">
				<u-avatar @click="uploadImage" :size="200" :src="profileInfo.userPhoto || headImg"></u-avatar>
				<!-- <fl-avatar
					canRotate="false"
					selWidth="200px"
					selHeight="400upx"
					@upload="handleUploadFile"
					:avatarSrc="profileInfo.userPhoto || headImg"
					avatarStyle="width: 200upx; height: 200upx; border-radius: 100%; border: 6upx solid #fff;"
				>
				</fl-avatar> -->
			</view>
			<!-- #endif -->
		</view>
		<view class="input-content">
			<view class="input-item">
				<text class="tit">手机号</text>
				<input type="number" v-model="profileInfo.userPhone" disabled placeholder="请输入手机号码" />
			</view>
			<view class="input-item">
				<text class="tit">昵　称</text>
				<input type="text" v-model="profileInfo.userNickName" placeholder="请输入您的昵称" />
			</view>
			<view class="input-item">
				<text class="tit">姓　名</text>
				<input type="text" v-model="profileInfo.userName" placeholder="请输入您的姓名" />
			</view>
			<view class="input-item">
				<text class="tit">性　别</text>
				<radio-group @change="handleGenderChange">
					<label class="gender-item" v-for="(item, index) in genders" :key="index">
						<radio class="gender-item-radio" :color="themeColor.color" :value="item.value" :checked="item.value == profileInfo.userSex" />
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
				<input type="text" v-model="profileInfo.qq" placeholder="填写职业" />
			</view>
			<!-- <view class="input-item">
				<text class="tit">职　业</text>
				<input
					type="text"
					v-model="profileInfo.qq"
					placeholder="填写职业"
				/>
			</view> -->
			<view class="input-item">
				<text class="tit">个性签名</text>
				<input v-model="profileInfo.email" placeholder="填写您的个性签名" />
			</view>
			<button class="confirm-btn" :class="'bg-' + themeColor.name" :disabled="btnLoading" :loading="btnLoading" @tap="toUpdateInfo">
				修改资料
			</button>
		</view>

	</view>
	<view class="loading" v-else>
		<loading></loading>
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
	import {
		getUserInfo
	} from "@/api/user.js"

	export default {
		data() {
			return {
				loadProgress: 0,
				profileInfo: {
					userPhone: '',
					userPhoto: '',
					userNickName: '',
					userSex: 0.,
					userBirthday: moment().format('YYYY-MM-DD'),
				},
				genders: [{
						value: 0,
						name: '男'
					},
					{
						value: 1,
						name: '女'
					}
				],
				date: moment().format('YYYY-MM-DD'),
				array: ['中国', '美国', '巴西', '日本'],
				index: 0,
				token: null,
				loading: true,
				headImg: require('@/static/images/missing-face.png'),
				userBg: require('@/static/images/user-bg.png'),
				btnLoading: false,
				themeColor: {
					name: 'rf',
					color: '#4FAA81'
				},
				loading: true,
			};
		},
		onLoad() {
			this.initData();
			uni.$on('uAvatarCropper', path => {
				console.log(path)
				// this.avatar = path;
				// 可以在此上传到服务端
				/* uni.uploadFile({
					url: 'http://www.example.com/upload',
					filePath: path,
					name: 'file',
					complete: (res) => {
						console.log(res);
					}
				}); */
			})
		},
		methods: {
			// 上传头像
			uploadImage() {
				// 从相册选择图片
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: 'pages/Member/userInfo/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			// 上传头像
			handleUploadFile(data) {
				console.log(data)
			},
			// 监听日期更改
			bindDateChange(e) {
				console.log(e.target.value)
				this.date = e.target.value;
			},
			// 监听城市更改
			bindCityChange(e) {
				this.city = e.target.value;
			},
			// 监听性别更改
			handleGenderChange(e) {
				this.profileInfo.userSex = e.detail.value;
			},
			// 数据初始化
			initData() {
				this.getMemberInfo();
				this.loading = false
			},
			// 获取用户信息
			async getMemberInfo() {
				try {
					let res = await getUserInfo()
					if (res.code == 1) {
						this.profileInfo = res.data
						for (let key in this.profileInfo) {
							this.profileInfo[key] = res.data[key]
						}
					}
				} catch (err) {
					this.$msg('获取用户信息失败')
					this.loading = false
				}
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
				z-index: 99999;
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
