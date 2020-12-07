<template>
  <view class="ruralHome">
    <u-navbar
        :is-back="true"
        title="乡村简介"
        :background="background"
        :border-bottom="false"
        back-icon-color="#FFFFFF"
        title-color="#FFFFFF"
        immersive
    >
      <!-- #ifdef APP-PLUS -->
      <template slot="right">
        <image class="imageItem" :src="require('@/static/images/share.png')" />
        <image class="imageItem" :src="require('@/static/images/collect.png')" />
      </template>
      <!-- #endif -->
    </u-navbar>
    <view class="wrap-main">
      <view class="backImage">
        <image :src="require('@/static/images/test.jpg')" />
      </view>
      <view class="wrap-about">
        <view class="villageInfo">
          <view class="title">
            良渚镇·良渚村
          </view>
          <view class="site">
            <image :src="require('@/static/images/icon_location@3x.png')" />
            <view class="siteInfo">
              杭州市仓前街道良渚镇良渚村
            </view>
            <view class="skit">
              导航>
            </view>
          </view>
        </view>
        <view class="villageDetails">
          <view class="title">
            村简介
          </view>
          <u-read-more
              id="content"
              :toggle="true"
              show-height="312"
              font-size="24"
              color="#4EA63D"
          >
            <rich-text :nodes="content"></rich-text>
          </u-read-more>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data(){
    return {
      background:{ background: 'transparent' },
      content:'良渚村是典型的江南水乡良渚村是典型的江南水乡良渚村是典型的江南水乡良渚村是典型的江南水乡良渚村是典型的江南水乡良渚村是典型的江南水乡良渚村是典型的江南水乡良渚村是典型的江南水乡良渚村是典型的江南水乡良渚村是典型的江南水乡，河网交织，土地肥沃。20世纪70年代初，开展吨粮工程配套建设，建设地下水渠2600米及地埋电线等。1976年，粮食复种指数为103%，平均粮食亩产达到1121公斤。并经省农业厅、市农业局、郊区农办联合实地验收，获省“吨粮工程示范村”的称号 。随着改革开放的深化和市场经济的建立，良渚村在搞好传统农业生产的同时，致力科学兴农，调整产业结构城'

    }
  },
}
</script>

<style lang="scss" scoped>
.ruralHome{
  height: 100%;
  position: relative;
  overflow-y: scroll;
  background-color: #ffffff;
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
  .backImage{
    width: 100%;
    height: 534rpx;
    image{
      width: 100%;
      height: 100%;
    }
  }
  .wrap-about{
    padding: 0 30rpx;
    .villageInfo{
      margin-top: 30rpx;
      width: 100%;
      border-radius: 10rpx;
      box-shadow: 0rpx 0rpx 14rpx 2rpx rgba(237, 237, 237, 0.85);
      padding-left: 28rpx;
      .title{
        font-size: 42rpx;
        color: #000000;
        font-weight: bold;
        padding-top: 30rpx;
      }
      .site{
        display: flex;
        align-items: center;
        padding-top: 28rpx;
        padding-bottom: 36rpx;
        image{
          width: 21rpx;
          height: 27rpx;
          margin-right: 11rpx;
        }
        .siteInfo{
          color: #6F6F6F;
          font-size: 24rpx;
          margin-right: 15rpx;
        }
        .skit{
          color: #4EA63D;
          font-size: 20rpx;
          text-decoration: underline;
        }
      }
    }

    .villageDetails{
      padding-top: 36rpx;
      .title{
        font-size: 36rpx;
        color: #000000;
        font-weight: bold;
        margin-bottom: 28rpx;
      }
    }
  }
}
</style>
