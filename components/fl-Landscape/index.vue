<template>
  <view class="landscape">
    <u-navbar
        :is-back="true"
        title="乡村简介"
        :background="background"
        :border-bottom="false"
        back-icon-color="#FFFFFF"
        title-color="#FFFFFF"
    >
      <!-- #ifdef APP-PLUS -->
      <template slot="right">
        <image class="imageItem" :src="require('@/static/images/share.png')" />
        <image class="imageItem" :src="require('@/static/images/collect.png')" />
      </template>
      <!-- #endif -->
    </u-navbar>
      <scroll-view scroll-x enable-flex class="left-aside" :scroll-into-view="'scroll-'+viewNavIndex">
          <view
                  v-for="(item,index) in list"
                  :key="index"
                  :id="'scroll-'+index"
                  class="f-item b-b"
                  :class="{active: index === viewNavIndex}"
                  @click="handleClickNav(index)"
          >
            {{item.name}}
          </view>
      </scroll-view>
    <view class="scroll-box" :style="{height:height + 'px'}">
      <scroll-view
          class="scroll-main list-container"
          id="list-container"
          @scroll="handleListScroll"
          @touchstart="handleTouchScrollView"
          :scroll-y="true"
          :scroll-into-view="'scroll-item-'+clickedNavIndex"
          :show-scrollbar="false"
          :scroll-with-animation="true"
      >
        <view class="list-item" v-for="(item,listIndex) of list" :key="listIndex" :id="'scroll-item-'+listIndex">
          <view class="itemAbout">
            <view class="aboutTitle">
              <text>{{ item.name }}</text>
            </view>
          </view>
          <view class="backImage">
            <u-image
                :src="item.picture"
                mode="aspectFit"
                width="100%"
                height="330"
                border-radius="5"
            />
          </view>
          <view class="lightspot">
            <view
                    class="light-item"
                    v-for="(item,index) of 2"
                    :key="index"
            >
              一马川平
            </view>
          </view>
          <view class="itemAbout">
            <fl-readMore :text="about" />
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>


<script>

export default {

  data(){
    return{
      background:{ background: '#4FAA81' },
      imageSrc:require('@/static/images/2.jpg'),
      number:2,
      status: 'loadmore',
      iconType: 'flower',
      loadText: {
        loadmore: '轻轻上拉',
        loading: '努力加载中',
        nomore: '实在没有了'
      },
      height:'',
      triggered: false,
      sizeCalcState: false,
      list:[
        {
          picture:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
          name: '风景1风景1'
        },
        {
          picture:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
          name: '风景2风景2'
        },
        {
          picture:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
          name: '风景3风景3'
        },
        {
          picture:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
          name: '风景4风景4'
        },
        {
          picture:'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
          name: '风景5风景5'
        },
      ],
      isTouchScrollView: false,
      clickedNavIndex: 0,
      viewNavIndex: 0,
      nodeInfoList: [],
      scrollTop:0,
      topDistance: 0,
      about:'良渚村是典型的江南水乡，河网交织，开展吨粮工程配套建设，建设良渚村是典型的江南水乡，河网交织，开展吨粮工程配套建设，建设良渚村是典型的江南水乡，河网交织，开展吨粮工程配套建设，建设良渚村是典型的江南水乡，河网交织，开展吨粮工程配套建设，建设地下水渠2600米及地埋电线等。1976年，粮粮粮粮食复种指数为103%，平均粮食亩产达到1121公斤。并经省农业厅、市农业局、'
    }
  },
  mounted(){
    /**
     * 计算页面高度
     */
      const res = uni.getSystemInfoSync()
      let iphoneHeight = 44
      // #ifdef MP-WEIXIN
      iphoneHeight = res.system.indexOf("iOS") < 0 ? 48 : 44
      // #endif
    this.$nextTick(() => {
      let that = this
      let qurey = uni.createSelectorQuery().in(this)
      qurey.select('.left-aside').fields({
        size: true,
        scrollOffset: true
      }, data => {
        that.height = res.windowHeight - res.statusBarHeight - iphoneHeight - 50 - data.height
      }).exec();
      this.init()
    })
  },
  methods:{
    loadMore(){
      this.status = 'loadmore'
      if (this.number < 10){
        this.status = 'loading'
        this.number = this.number + 2
      }else {
        this.status = 'nomore'
      }
    },
    ruralSkip(){
      this.$Router.push({
        path:`/pages/RuralDetails/RuralHome/index`,
        query:{
          id:'123'
        }
      })
    },
    onPulling(){
      console.log(11111111)
    },
    onRefresh(){
      console.log(22222222)
      this.triggered = true
      setTimeout(() => {
        this.triggered = false
      },3000)
    },
    onRestore(){
      console.log(33333333)
    },
    onAbort(){
      console.log(4444444444444)
    },
        init(){
            const query = uni.createSelectorQuery().in(this);
            query.selectAll('#list-container .list-item').boundingClientRect(data => {
                // console.log(data);
                let a = data.map((item,index) => ({
                  index,...item
                }))
                this.nodeInfoList = a

            }).exec()
          query.select('.scroll-box').boundingClientRect(data => {
            this.topDistance = data.top
          }).exec()
        },
        handleClickNav(nav){
            if(!this.isTouchScrollView&&this.clickedNavIndex == nav) return;
            // 锁定联动
            this.isTouchScrollView = false;
            // 解决clickedNavIndex相同触发更新失败
            if(this.clickedNavIndex == nav){
                this.clickedNavIndex = -1;
            }
            this.$nextTick(function(){
                this.clickedNavIndex = nav;
                this.viewNavIndex = nav
            })
        },
        handleListScroll(e){
          if(!this.isTouchScrollView) return;
          let scrollTop = this.scrollTop = e.detail.scrollTop;
          let a = this.nodeInfoList
          let b = a.filter(item => item.top <= scrollTop + this.topDistance)
          let c = b.sort((a,b)=>b.top-a.top)[0].index;
          this.viewNavIndex = c;
        },
        handleTouchScrollView(){
            this.isTouchScrollView = true;
        },
  }
}
</script>

<style lang="scss" scoped>

.landscape{
  height: 100%;
  background: #F4F4F4;
  .imageItem{
    width: 36rpx;
    height: 36rpx;
    &:last-child{
      width: 42rpx;
      height: 42rpx;
      margin-right: 31rpx;
      margin-left: 18rpx;
    }
  }
  .scroll-box{
    background: #ffffff;
    .scroll-main{
      height: 100%;
      .list-item{
        width: 100%;
        padding: 35rpx 30rpx 0;
        .itemAbout{
          padding-top: 22rpx;
          .aboutTitle{
            text{
              font-size: 30rpx;
              color: #000000;
              font-weight: bold;
              position: relative;
              z-index: 11;
              &:before{
                content: '';
                position: absolute;
                z-index: -1;
                display: block;
                bottom: -7rpx;
                left: 0;
                width: 100%;
                height: 16rpx;
                background: #ABEBB0;
                border-radius: 8rpx;
              }
            }
          }
          .aboutMain{
            text{
              color: #ffffff;
              font-size: 24rpx;
            }
          }
        }
        .backImage{
          margin-top: 36rpx;
        }
        .lightspot{
          display: flex;
          padding-top: 30rpx;
          .light-item{
            width: 126rpx;
            height: 42rpx;
            background: #F5F5F5;
            margin-right: 30rpx;
            line-height: 42rpx;
            text-align: center;
            font-size: 24rpx;
            color: #4FAA81;
          }
        }
      }
    }
  }
  .left-aside{
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    background: #ffffff;
    border-bottom: 2rpx solid rgba(0,0,0,.1);
    .f-item{
      display: inline-block;
      font-size: 26rpx;
      color: #000000;
      padding:30rpx;
      &.active{
        font-weight: bold;
      }
    }
  }
}
</style>
