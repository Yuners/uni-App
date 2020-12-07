<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import "uview-ui/index.scss";


  view{
    line-height: 1;
  }

  page{
    height: 100%;
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
    button:after{
        border: 0;
    }
// 导入colorUI
@import '/static/css/colorui/main.css';
@import '/static/css/colorui/icon.css';
@import '/static/css/colorui/animation.css';

// 导入阿里巴巴矢量图标库
/*#ifdef MP*/
@import './static/css/iconfont/iconfont.css';
/*#endif*/
/*#ifndef MP*/
@import url('https://at.alicdn.com/t/font_1681579_dwilkcq6mvg.css');
/*#endif*/

  @import "./assets/styles/uview.scss";
@import './static/css/uni.scss';
</style>
