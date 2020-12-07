<template>
  <view class="scence">
    <u-navbar
        :is-back="false"
        :background="background"
    >
      <view class="navContent">
        <view class="flex-left">
          <view class="text">
            <span>杭州</span>
            <u-icon name="arrow-down" color="#ffffff" size="30" />
          </view>
        </view>
        <view class="flex-center">
          <u-search
              placeholder="输入乡村名字"
              v-model="keyword"
              height="60"
              :show-action="false"
              margin="0 0 0 15rpx"
              bg-color="#ffffff"
              :input-style="searchStyle"
          />
        </view>
      </view>
    </u-navbar>
    <view class="scroll-box" :style="{height:height + 'px'}">
      <scroll-view
          class="scroll-main"
          scroll-y
          @scrolltolower="loadMore"
          refresher-enabled
          :refresher-triggered="triggered"
          :refresher-threshold="100"
		  refresher-background="#4FAA81"
		  refresher-default-style="white"
          @refresherpulling="onPulling"
          @refresherrefresh="onRefresh"
          @refresherrestore="onRestore"
          @refresherabort="onAbort"
      >
        <view class="list-item" v-for="index of number" :key="index" @tap="ruralSkip">
          <view class="backImage">
            <u-image
                :src="imageSrc"
                mode="aspectFit"
                height="420"
            />
            <view class="itemAbout">
              <view class="aboutTitle">
                <text>良渚镇·良渚村</text>
              </view>
              <view class="aboutMain">
                <text>良渚村是典型的江南水乡，河网交织，土地肥沃。工程配套建设</text>
              </view>
            </view>
          </view>
        </view>
        <u-loadmore
            :status="status"
            :icon-type="iconType"
            :load-text="loadText"
            @loadmore="loadMore"
            margin-bottom="30"
        />
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return{
      background: {
        backgroundColor: '#4FAA81',
      },
      keyword:'',
      searchStyle:{
        fontSize:'24rpx'
      },
      imageSrc:require('@/static/images/2.jpg'),
      number:2,
      status: 'loadmore',
      iconType: 'flower',
      loadText: {
        loadmore: '点击或上拉加载',
        loading: '努力加载中',
        nomore: '实在没有了'
      },
      height:'',
      triggered: false
    }
  },

  onReady(){
    /**
     * 计算页面高度
     */
    try{
      const res = uni.getSystemInfoSync()
      let iphoneHeight = 44
      // #ifdef MP-WEIXIN
      iphoneHeight = res.system.indexOf("iOS") < 0 ? 48 : 44
      // #endif
      this.height = res.windowHeight - res.statusBarHeight - iphoneHeight
    }
    catch (err){
      console.log(err)
    }
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
        path:`/ruralPages/RuralDetails/index`,
        query:{
          id:'123'
        }
      })
      // uni.navigateTo({
      //   url:"/ruralPages/RuralDetails/index",
      //   success:function (res) {
      //     console.log(res)
      //   },
      //   fail:function (err) {
      //     console.log(err)
      //   },
      //   complete:function (e) {
      //     console.log(e)
      //
      //   }
      // })
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
    }
  }
}
</script>

<style lang="scss" scoped>
.scence{
  background: #F4F4F4;
  height: 100%;
  .navContent{
    width: 100%;
    padding: 0 30rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    .flex-left{
      span{
        color: #ffffff;
        font-size: 30rpx;
        margin-right: 10rpx;
      }
    }
    .flex-center{
      flex: 1;
    }
  }

  .scroll-box{
    height: calc(100% - 44px);
    background: #F4F4F4;
    .scroll-main{
      height: 100%;
      .list-item{
        width: 100%;
        height: 420rpx;
        position: relative;
        margin-bottom: 30rpx;
        .itemAbout{
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 112rpx;
          padding: 0 30rpx;
          background: rgba(0,0,0,.8);
          .aboutTitle{
            margin-top: 22rpx;
            margin-bottom: 12rpx;
            text{
              font-size: 30rpx;
              color: #ffffff;
            }
          }
          .aboutMain{
            text{
              color: #ffffff;
              font-size: 24rpx;
            }
          }
        }
      }
    }
  }
}
</style>
