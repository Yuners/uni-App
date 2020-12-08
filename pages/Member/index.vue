<template>
  <view class="member">
    <view class="userInfo">
      <view class="avater">
        <u-avatar
			v-if="false"
            :src="''"
            size="124"
        />
        <u-avatar
            size="124"
        />
      </view>
      <view v-if="userInfo" class="information">
        <view class="userName">
          白衣飘飘的少年
        </view>
        <view class="introduce">
          简介：周游世界
        </view>
      </view>
      <view v-else class="information">
        <view class="userName" @tap="navTo('/pages/login/login')">
          登录/注册
        </view>
        <view class="introduce">
          点击登录，享受更多精彩内容
        </view>
      </view>
    </view>
    <view class="order">
      <view class="orderTitle">
        我的订单
      </view>
      <view class="orderClassify">
        <view class="orderItem" @tap="navTo('/ruralPages/order/order',1)">
          <view class="imageItem">
            <image :src="require('@/static/images/dfk.png')" />
          </view>
          <view class="className">
            待付款
          </view>
        </view>
        <view class="orderItem" @tap="navTo('/ruralPages/order/order',2)">
          <view class="imageItem">
            <image :src="require('@/static/images/dsh.png')" />
          </view>
          <view class="className">
            待收货
          </view>
        </view>
        <view class="orderItem" @tap="navTo('/ruralPages/order/order',3)">
          <view class="imageItem">
            <image :src="require('@/static/images/dsh.png')" />
          </view>
          <view class="className">
            待评价
          </view>
        </view>
        <view class="orderItem">
          <view class="imageItem">
            <image :src="require('@/static/images/thsh.png')" />
          </view>
          <view class="className">
            退款/售后
          </view>
        </view>
        <view class="orderItem" @tap="navTo('/ruralPages/order/order',0)">
          <view class="imageItem">
            <image :src="require('@/static/images/qbjd.png')" />
          </view>
          <view class="className">
            全部订单
          </view>
        </view>
      </view>
    </view>
    <view class="activity">
      <view class="activityTitle">
        我的活动
      </view>
      <view class="activityClass">
        <view class="activityItem" @tap="navTo('/ruralPages/notice/notice')">
          <view class="imageItem">
            <image :src="require('@/static/images/xx.png')" />
          </view>
          <view class="className">
            我的消息
          </view>
        </view>
        <view class="activityItem" @tap="navTo('/ruralPages/collect/collect')">
          <view class="imageItem">
            <image :src="require('@/static/images/sc.png')" />
          </view>
          <view class="className">
            我的收藏
          </view>
        </view>
        <view class="activityItem" @tap="navTo('/pages/Member/PersonalCenter/PersonalCenter')">
          <view class="imageItem">
            <image :src="require('@/static/images/sz.png')" />
          </view>
          <view class="className">
            我的设置
          </view>
        </view>
        <view class="activityItem" @tap="navTo('/pages/Member/SystemSettings/SystemSettings')">
          <view class="imageItem">
            <image :src="require('@/static/images/xt.png')" />
          </view>
          <view class="className">
            系统设置
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return{
        userInfo:false
      }
    },
    methods:{
        navTo(url,state){
			if(state !== ''){
              uni.navigateTo({
                url:url + '?' + `state=${state}`
              })
			}else{
              uni.navigateTo({
                url
              })
			}
        },
    }
  }
</script>

<style lang="scss" scoped>
.member{
  min-height: 100%;
  background: #F4F4F4;
  padding: 0 30rpx;
  padding-top: 94rpx;

  .userInfo{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .information{
      padding-left: 36rpx;
      .userName{
        color: #000000;
        font-size: 36rpx;
        margin-bottom: 11rpx;
        font-weight: 500;
      }
      .introduce{
        color: #CACACA;
        font-size: 24rpx;
      }
    }
  }

  .order{
    padding: 30rpx 24rpx 50rpx;
    border-radius: 20rpx;
    background: #ffffff;
    margin-top: 36rpx;
    .orderTitle{
      font-weight: 600;
      color: #000000;
      font-size: 34rpx;
    }
    .orderClassify{
      display: flex;
      margin-top: 56rpx;
      .imageItem{
        image{
          width: 80rpx;
          height: 80rpx;
        }
      }
        .orderItem{
        flex: 1;
        text-align: center;
        .className{
          font-size: 24rpx;
          color: #000000;
          margin-top: 50rpx;
        }
      }
    }
  }

  .activity{
    margin-top: 37rpx;
    .activityTitle{
      font-size: 34rpx;
      color: #000000;
      font-weight: 600;
    }
    .activityClass{
      display: flex;
      margin-top: 56rpx;
	  flex-wrap: wrap;
      .activityItem{
        text-align: center;
		width: 25%;
		margin-bottom: 30rpx;
        .imageItem{
          image{
            width: 80rpx;
            height: 80rpx;
          }
        }
        .className{
          font-size: 24rpx;
          color: #000000;
          margin-top: 50rpx;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
