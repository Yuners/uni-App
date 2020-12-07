<template>
  <view class="accommodation">
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
    <view class="tabToggle">
      <view
          class="togItem"
          :class="{action:action == 0}"
          @tap="action !=0 && tabHandle(0)"
      >
        乡村美食
      </view>
      <view
          class="togItem"
          :class="{action:action == 1}"
          @tap="action !=1 && tabHandle(1)"
      >
        乡村民宿
      </view>
    </view>
    <view v-show="action == 0" class="scroll-box" :style="{height:height + 'px'}">
      <scroll-view
          class="scroll-main"
          scroll-y
          @scrolltolower="loadMore"
      >
        <view class="list-item" v-for="index of number" :key="index">
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
    <view v-show="action == 1" class="scroll-box" :style="{height:height + 'px'}">
      <scroll-view
          class="scroll-main"
          scroll-y
          @scrolltolower="loadMore"
      >
        <view class="stayItem" v-for="index of number" :key="index">
          <view class="backImage">
            <u-image
                :src="imageSrc2"
                mode="aspectFit"
                height="304"
            />
            <view class="itemAbout">
              <view class="aboutTitle">
                <text>杭州良祝·西湖民宿</text>
              </view>
              <view class="aboutMain">
                <view class="info">
                  <view class="score">
                    <text>5.0</text>
                  </view>
                  <view class="trait">
                    宽敞明亮
                  </view>
                  <view class="trait">
                    空气清新
                  </view>
                </view>
                <view class="price">
                  <text>￥429.</text>
                  <text style="font-size: 24rpx">9</text>
                  起
                </view>
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
import { mapState, mapMutations } from 'vuex';

export default {
  data(){
    return{
      background:{ background: '#4FAA81' },
      imageSrc:require('@/static/images/2.jpg'),
      imageSrc2:require('@/static/images/3.jpg'),
      number:2,
      status: 'loadmore',
      iconType: 'flower',
      loadText: {
        loadmore: '轻轻上拉',
        loading: '努力加载中',
        nomore: '实在没有了'
      },
      action:0,
      height:''
    }
  },
  mounted(){
    /**
     * 计算页面高度
     */
    try{
        const res = uni.getSystemInfoSync()
        let iphoneHeight = 44
        // #ifdef MP-WEIXIN
        iphoneHeight = res.system.indexOf("iOS") < 0 ? 48 : 44
        // #endif
        this.height = res.windowHeight - res.statusBarHeight - iphoneHeight - 46 - 50
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
        console.log('++++++++++++=')
        this.number = this.number + 2
      }else {
        this.status = 'nomore'
      }
    },
    tabHandle(ind){
      console.log(ind)
      this.action = ind
    }
  }
}
</script>

<style lang="scss" scoped>
.accommodation{
  height: 100%;
  background: #FFFFFF;
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

  .tabToggle{
    display: flex;
    border-bottom: 2rpx solid rgba(0,0,0,.1);
    margin-bottom: 3rpx;
    .togItem{
      text-align: center;
      line-height: 84rpx;
      flex: 1;
      height: 84rpx;
      background: #FFFFFF;
      color: #000000;
      font-size: 30rpx;
      &.action{
        color: #4FAA81;
      }
    }
  }

  .scroll-box{
    height: calc(100% - 94px);
    background: #FFFFFF;
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
      .stayItem{
        padding: 30rpx;
        padding-bottom: 53rpx;
        border-bottom: 2rpx solid rgba(0,0,0,.1);
        margin-bottom: 25rpx;
        .itemAbout{
          padding-top: 35rpx;
          .aboutTitle{
            text{
              color: #000000;
              font-size: 30rpx;
            }
          }
          .aboutMain{
            padding-top: 24rpx;
            display: flex;
            justify-content: space-between;
            .info{
              display: flex;
              justify-content: flex-start;
              align-items: flex-end;
              .score{
                margin-right: 30rpx;
                text{
                  color: #FFBA00;
                  font-size: 36rpx;
                }
              }
              .trait{
                margin-right: 30rpx;
                color: #959595;
                font-size: 24rpx;
              }
            }
            .price{
              font-size: 24rpx;
              color: #959595;
              text{
                color: #FF0A00;
                font-size: 36rpx;
                &:last-child{
                  margin-right: 12rpx;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
