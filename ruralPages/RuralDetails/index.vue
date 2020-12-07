<template>
  <view class="ruralDetails">
    <view class="ruralMain">
      <view class="ruralHeight" v-show="active == 0">
        <fl-RuralHome />
      </view>
      <view class="ruralHeight" v-if="active == 1">
        <fl-Landscape />
      </view>
      <view class="ruralHeight" v-show="active == 2">
        <fl-Accommodation />
      </view>
      <view class="ruralHeight" v-show="active == 3">
        <fl-Specialty />
      </view>
    </view>
    <view class="tabBar">
      <view class="item"
            :class="{active:active == index}"
            v-for="(item,index) in tabBarList"
            :key="index"
            @tap="handTab(index)"
      >
        <view class="image">
          <image :src="active == index ? item.selectedIconPath : item.iconPath" />
        </view>
        <view class="text">
          <text>{{ item.text }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return{
      active:0,
      height:'',
      tabBarList: [
        {
          iconPath: "/static/images/home_x.png",
          selectedIconPath: "/static/images/home.png",
          text: '首页',
        },
        {
          iconPath: "/static/images/w_scenery.png",
          selectedIconPath: "/static/images/w_scenertyx.png",
          text: '风景',
        },
        {
          iconPath: "/static/images/roomandboard.png",
          selectedIconPath: "/static/images/roomandboardx.png",
          text: '食宿',
        },
        {
          iconPath: "/static/images/localspecialty.png",
          selectedIconPath: "/static/images/localspecialtyx.png",
          text: '特产',
        },
      ],
    }
  },
  methods:{
    /**
     * tab切换
     * @param ind
     */
    handTab(ind){
      this.active = ind
    },
  }
}
</script>


<style lang="scss" scoped>
/*page{*/
/*  height: calc(100% - 50px);*/
/*  overflow-y: scroll;*/
/*}*/
.ruralDetails{
  position: relative;
  height: calc(100% - 50px);
  overflow-y: scroll;
  .ruralMain{
    height: 100%;
    .ruralHeight{
      height: 100%;
    }
  }
  .tabBar{
    background: #ffffff;
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-top:2rpx solid rgba(0,0,0,.1) ;
    .item{
      flex: 1;
      text-align: center;
      .image{
        image{
          width: 40rpx;
          height: 40rpx;
        }
      }
      .text{
        font-size: 24rpx;
        color: #DADADA;
      }
      &.active{
        text{
          color: #4FAA81;
        }
      }
    }
  }
}

</style>
