<script>
	export default {
		onLaunch: function() {
			this.$store.dispatch('getProfile')
		},
		onShow: function() {
		},
		onHide: function() {
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
