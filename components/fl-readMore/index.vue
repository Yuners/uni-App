<template>
    <view class="readMore">
        <view ref="hehe" class="content" :class="{hide:show}">
            <text class="cont">
                {{ text }}
            </text>
        </view>
        <view class="tapButton" v-if="buttonShow" @tap="spread">
            {{ show ? '展开>' : '收起>' }}
        </view>
    </view>
</template>

<script>
    export default {
        data(){
            return{
                show:true,
                buttonShow:true
            }
        },
        props:{
            text:{
                type:String,
                default: '粮食复种指数为103%，平均粮食亩产达到1121公斤。并经省农业厅、市农业局、郊区农办联合实地验收地'
            },
        },
        mounted(){
            this.$nextTick(() => {
                let content
                let text
                let query = uni.createSelectorQuery().in(this)
                query.select(".content").fields({
                    size: true,
                    scrollOffset: true
                }, data => {
                    content = data.height
                }).exec();
                query.select(".cont").fields({
                    size: true,
                    scrollOffset: true
                }, data => {
                    text = data.height
                }).exec();
                if (text <= content){
                    this.buttonShow = false
                }
            })
        },
        methods:{
            spread(){
                this.show = !this.show
            }
        }
    }
</script>

<style lang="scss" scoped>
    .readMore{
        width: 100%;
        .content{
            color: #6F6F6F;
            font-size: 24rpx;
            line-height: 2;
            &.hide{
                display: -webkit-box;
                overflow: hidden;
                white-space: normal;
                text-overflow: ellipsis;
                word-wrap: break-word;
                -webkit-line-clamp:4;
                -webkit-box-orient: vertical;
            }
        }
        .tapButton{
            text-align: right;
            color: #4EA63D;
            font-size:20rpx;
            line-height: 2;
        }
    }
</style>
