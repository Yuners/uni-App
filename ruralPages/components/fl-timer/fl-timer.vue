<template>
		<view class="count">
			<view class="list" v-if="hour != '00'">{{hour}}</view>
			<view class="list" v-if="hour != '00'">{{tally == 'one' ? ':' : '小时'}}</view>
			<view class="list">{{minute}}</view>
			<view class="list">{{tally == 'one' ? ':' : '分钟'}}</view>
			<view class="list">{{second}}</view>
			<view class="list">{{tally == 'one' ? '' : '秒'}}</view>
		</view>
</template>

<script>
	export default {
		name: "countdown",
		props: {
			start: {
				type: Number,
				default: 0
			},
			finish: {
				type: Number,
				default: 0
			},
			tally:{
				type: String,
				default: 'one'
			}
		},
		data() {
			return {
				hour: '',
				minute:'',
				second:''
			}
		},
		created(){
			var a =this;
			var start = a.start.toString().substring(0,10);
			var finish = a.finish.toString().substring(0,10);
			var timer = parseInt(finish)-parseInt(start)
			var hours = parseInt((timer % (60 * 60 * 24)) / (60 * 60));
			var minutes = parseInt((timer % (60 * 60)) / (60));
			var seconds =  parseInt((timer % (1 * 60)) / 1);
			a.hour = (hours < 10 ? ('0' + hours) : hours);
			a.minute = (minutes < 10 ? ('0' + minutes) : minutes);
			a.second = (seconds < 10 ? ('0' + seconds) : seconds);
			var interval = setInterval(() => {
				if (a.second == 0) {
					if (a.minute != 0) {
							a.minute = (Array(2).join(0) + parseInt(--a.minute)).slice(-2)
						a.second = 59
					} else {
						if (a.hour != 0) {
							a.hour = (Array(2).join(0) + parseInt(--a.hour)).slice(-2)
							a.minute = 59
							a.second = 59
						} else {
							clearInterval(interval)
							a.finality()
						}
					}
				}else{
					a.second = (Array(2).join(0) + parseInt(--a.second)).slice(-2)
				}
			}, 1000)
		},
		methods: {
			finality(){

				this.$emit('finish');
			},
		}
	}
</script>

<style lang="scss">
	.count {
		display: flex;
		align-items: center;
		.list {
			font-size: 26rpx;
			color: #333333;
		}
	}
</style>
