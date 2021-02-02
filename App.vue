<script>
	import {
		getToken,
		removeToken
	} from "@/utils/auth.js"
	export default {
		onLaunch: function() {
			this.initData()
		},
		onShow: function() {},
		onHide: function() {},
		methods: {
			async initData() {
				this.$store.dispatch('getCity')
				const token = getToken()
				if (token) {
					try {
						const res = await this.$store.dispatch('user/refreshLogin')
						if(!res.userFlag){
							this.$msg('登陆已过期，请重新登陆')
							const outInfo = await this.$store.dispatch('user/logout')
						} else {
							this.$store.dispatch('getProfile')
						}
					} catch (err) {
						console.log(Error)
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	/*#ifndef APP-PLUS-NVUE */
	@import "uview-ui/index.scss";


	page {
		height: 100%;
	}

	view {
		line-height: 1;
	}

	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video {
		box-sizing: border-box;
	}

	button:after {
		border: 0;
	}

	.loading {
		margin-top: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	// 导入colorUI
	@import '/static/css/colorui/main.css';
	@import '/static/css/colorui/icon.css';
	@import '/static/css/colorui/animation.css';

	@import "./assets/styles/uview.scss";
	@import './static/css/uni.scss';

	/*#endif*/
</style>
