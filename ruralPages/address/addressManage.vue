<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">联系人</text>
			<input class="input" type="text" v-model="addressData.ressUserName" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.ressMobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseLocation" class="input">
				{{ addressData.ressLocation }}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b">
			<text class="tit">门牌号</text>
			<input class="input" type="text" v-model="addressData.ressDoorplate" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>

		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.isDefault" :color="color" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	import {
		getAddressDetails,
		addAddress,
		editAddress
	} from '@/api/address.js'
	
	export default {
		data() {
			return {
				addressData: {
					ressUserName: '',
					ressMobile: '',
					ressLocation: '在地图选择',
					ressDetail: '',
					ressDoorplate: '',
					ressLatitude: '',
					ressLongitude: '',
					ressProvince: '',
					ressCity: '',
					ressDistrict: '',
					ressCityCode: '',
					ressProvinceCode: '',
					isDefault: false
				},
				addressId: ''
			}
		},
		computed:{
			color(){
				return this.addressData.isDefault ? '#4FAA81' : '#dfdfdf'
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				title = '编辑收货地址'
				let a = JSON.parse(option.data)
				this.addressId = a.ressId
				for (let key in this.addressData) {
					if (!a[key]) continue
					this.addressData[key] = a[key]
				}
				console.log(this.addressData)
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			switchChange(e){
				this.addressData.isDefault = e.detail.value;
			},

			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						this.addressDetails(data)
					}
				})
			},

			// 根据经纬查询详细地址
			addressDetails(data){
				let params = {
					lat: data.latitude,
					lng: data.longitude
				}
				getAddressDetails(params)
					.then( res => {
						if ( res.code == 1 ) {
							let dat = res.data
							this.addressData.ressLocation = dat.formattedAddress
							this.addressData.ressDetail = dat.smallAddress
							this.addressData.ressLatitude = data.latitude
							this.addressData.ressLongitude = data.longitude
							this.addressData.ressProvince = dat.province
							this.addressData.ressCity = dat.city
							this.addressData.ressDistrict = dat.district
							this.addressData.ressCityCode = dat.cityCode
							this.addressData.ressProvinceCode = dat.provinceCode
						}
					})
			},
			
			//提交
			async confirm(){
				let data = this.addressData;
				if(!data.ressUserName){
					this.$msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.ressMobile)){
					this.$msg('请输入正确的手机号码');
					return;
				}
				console.log(data.ressLocation)
				if(data.ressLocation == '在地图选择'){
					this.$msg('请在地图选择所在位置');
					return;
				}
				
				try {
					if (this.addressId){
						data.ressId = this.addressId
						let res = await editAddress(data)
						console.log(res)
					} else {
						let res = await addAddress(data)
						console.log(res)
					}
					this.$store.dispatch('getProfile')
					this.$msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
					setTimeout(()=>{
						uni.navigateBack()
					}, 800)
				}
				catch(err) {
					console.log(err)
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;

		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: $font-color-light;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
