<template>
  <view class="wrap">
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
    <u-waterfall v-model="flowList" ref="uWaterfall">
      <template v-slot:left="{leftList}">
        <view class="demo-warter" v-for="(item, index) in leftList" :key="index" @tap="payOrder">
          <!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
          <u-lazy-load threshold="-450" :image="item.image" :index="index" />
          <view class="wrapMain">
            <view class="demo-title">
              <text class="read">
                杭州名吃
              </text>
              {{item.title}}
            </view>
            <view class="demo-price">
              <view class="price">
                ￥{{item.price}}
              </view>
              <view class="people">
                {{item.shop}}人累计付款
              </view>
            </view>
          </view>
        </view>
      </template>
      <template v-slot:right="{rightList}">
        <view class="demo-warter warRight" v-for="(item, index) in rightList" :key="index" @tap="payOrder">
          <u-lazy-load threshold="-450" :image="item.image" :index="index" />
          <view class="wrapMain">
            <view class="demo-title">
              <text class="read">
                杭州名吃
              </text>
              {{item.title}}
            </view>
            <view class="demo-price">
              <view class="price">
                ￥{{item.price}}
              </view>
              <view class="people">
                {{item.shop}}人累计付款
              </view>
            </view>
          </view>
        </view>
      </template>
    </u-waterfall>
    <u-loadmore
        :status="loadStatus"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      background: {
        backgroundColor: '#4FAA81',
      },
      keyword:'',
      searchStyle:{
        fontSize:'24rpx'
      },
      loadStatus: 'loadmore',
      flowList: [
        {
          price: '35',
          title: '北国风光，千里冰封，万里雪飘',
          shop: '124',
          image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',
        },
        {
          price: '75',
          title: '望长城内外，惟余莽莽',
          shop: '345',
          image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23325_s.jpg',
        },
        {
          price: '385',
          title: '大河上下，顿失滔滔',
          shop: '3463',
          image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
        },
        {
          price: '784',
          title: '欲与天公试比高',
          shop: '2342',
          image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/zzpic23369_s.jpg',
        },
        {
          price: '7891',
          title: '须晴日，看红装素裹，分外妖娆',
          shop: '1643',
          image: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2130_s.jpg',
        },
        {
          price: '2341',
          shop: '6436',
          title: '李白杜甫白居易旗舰店',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23346_s.jpg',
        },
        {
          price: '661',
          shop: '7567',
          title: '李白杜甫白居易旗舰店',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23344_s.jpg',
        },
        {
          price: '1654',
          title: '唐宗宋祖，稍逊风骚',
          shop: '1346',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
        },
        {
          price: '1678',
          title: '一代天骄，成吉思汗',
          shop: '71547',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
        },
        {
          price: '924',
          title: '只识弯弓射大雕',
          shop: '4573',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
        },
        {
          price: '8243',
          title: '俱往矣，数风流人物，还看今朝',
          shop: '45843',
          image: 'http://pic1.sc.chinaz.com/Files/pic/pic9/202002/zzpic23343_s.jpg',
        },
      ],
    }
  },
  onReachBottom() {
    this.loadStatus = 'loading';
    // 模拟数据加载
    setTimeout(() => {
      this.loadStatus = 'loadmore';
    }, 1000)
  },
  onPullDownRefresh() {
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  methods: {
    payOrder() {
      uni.navigateTo({
        url:'/ruralPages/product/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  min-height: 100%;
  padding-bottom: 30rpx;
  background: #F4F4F4;
}
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
.demo-warter {
  border-radius: 10rpx;
  background-color: #ffffff;
  padding-bottom: 36rpx;
  margin: 15rpx 10rpx 15rpx 30rpx;
  position: relative;
  overflow: hidden;
  &.warRight{
    margin: 15rpx 30rpx 15rpx 10rpx;
  }
}

.u-close {
  position: absolute;
  top: 32rpx;
  right: 32rpx;
}

.wrapMain{
  padding: 14rpx;
}

.demo-image {
  width: 100%;
}

.demo-title {
  font-size: 24rpx;
  margin-top: 11rpx;
  color: #656565;
  line-height: 36rpx;
  .read{
    font-size: 24rpx;
    color: #656565;
    background: #FF0A00;
    padding: 0 4rpx;
    border-radius: 5px;
    color: #ffffff;
    margin-right: 10rpx;
  }
}

.demo-tag {
  display: flex;
  margin-top: 5px;
}

.demo-tag-owner {
  background-color: $u-type-error;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 4rpx 14rpx;
  border-radius: 50rpx;
  font-size: 20rpx;
  line-height: 1;
}

.demo-tag-text {
  border: 1px solid $u-type-primary;
  color: $u-type-primary;
  margin-left: 10px;
  border-radius: 50rpx;
  line-height: 1;
  padding: 4rpx 14rpx;
  display: flex;
  align-items: center;
  border-radius: 50rpx;
  font-size: 20rpx;
}

.demo-price {
  margin-top: 29rpx;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  .price{
    font-size: 36rpx;
    color: #FF0A00;
  }
  .people{
    font-size: 20rpx;
    color: #656565;
  }
}

.demo-shop {
  font-size: 22rpx;
  color: $u-tips-color;
  margin-top: 5px;
}
</style>
