<template>
    <div class="swipe">
        <ul class="swipe-container clearfix">
            <li @transitionend="transitionend($event)" 
                ref="swipeItem" v-for="(item, index) in banners" 
                :class="['swipe-item', {prev: prev === index}, 
                        {'next': next === index}, 
                        {current: current === index}, 
                        {'animation-it': animationIndex === index},
                        {'not-animation-it': notAnimationIndex === index}]">
                <v-touch @panmove="panMove($event, index)" @panstart="panStart($event)" @panend="panEnd($event, index)">
                    <img @click="donotDone" :src="item.pic">
                </v-touch>
            </li>
        </ul>
        <ul class="swipe-dot-container">
            <li v-for="index in banners.length" :class="['dot-item', { active: currentDot===index-1 }]"></li>
        </ul>
        <alert-info ref="alertInfo"></alert-info>
    </div>
</template>

<script>

    import AlertInfo from '../template/AlertInfo.vue'
    import defaultBanner from '../../assets/default_banner.png'

    export default {
        name: 'swipe',
        data() {
            return {
                banners:[{
                    pic: defaultBanner
                },{
                    pic: defaultBanner
                },{
                    pic: defaultBanner
                }],
                current: 0,
                bannerInterval: null,
                animationIndex: -1,
                notAnimationIndex: -1,
                currentDot: 0
            }
        },

        components: {
            AlertInfo
        },

        computed: {
            prev() {
                let prev = this.current - 1;
                if (prev >= 0) {
                    return prev;
                }
                return this.banners.length - 1;
            },
            next() {
                let next = this.current + 1;
                if (next >= this.banners.length) {
                    return 0;
                }
                return next;
            }
        },

        mounted() {
            let that = this;
            let interval = setInterval(function () {
                let items = that.$refs.swipeItem;
                if (items && items.length) {
                    clearInterval(interval);
                    that.beginAutoPlay();
                }
            })
            
            
        },

        methods: {
            goNext() {
                let length = this.banners.length;
                this.current = (this.current + 1) % length;
            },
            goPrev() {
                let current = this.current - 1;
                if (current < 0) {
                    current = this.banners.length - 1;
                }
                this.current = current;
            },
            beginAutoPlay() {
                let that = this;
                that.bannerInterval = setInterval(function () {
                    that.goNext();
                }, 3000)
            },
            stopAutoPlay() {
                clearInterval(this.bannerInterval);
                this.bannerInterval = null;
            },
            panStart(event) {
                this.stopAutoPlay();
            },
            panEnd(event, index) {
                let target = event.target.parentNode.parentNode,
                    prevNode = target.previousSibling || target.parentNode.lastChild,
                    nextNode = target.nextSibling || target.parentNode.firstChild,
                    deltaX = event.deltaX,
                    width = target.offsetWidth / 2;
                if (deltaX > width) {
                    this.animationIndex = index;
                    if(index === 1) {
                        this.notAnimationIndex = this.banners.length - 1;
                    }
                    this.goPrev();
                }else if (deltaX < -width) {
                    this.goNext();
                }else {
                    // nextNode.className = nextNode.className + ' animation-it';
                    this.animationIndex = index + 1 >= this.banners.length ? 0 : index + 1;
                }
                target.removeAttribute('style');
                prevNode.removeAttribute('style');
                nextNode.removeAttribute('style');
                this.beginAutoPlay();
            },
            panMove(event, index) {
                let target = event.target.parentNode.parentNode,
                    prevNode = target.previousSibling || target.parentNode.lastChild,
                    nextNode = target.nextSibling || target.parentNode.firstChild,
                    deltaX = event.deltaX,
                    width = target.offsetWidth;
                prevNode.style.transform = `translateX(${-width+deltaX}px)`;
                prevNode.style['transition-duration'] = '0ms';
                nextNode.style.transform = `translateX(${width+deltaX}px)`;
                nextNode.style['transition-duration'] = '0ms';
                nextNode.style['z-index'] = '200';
                target.style.transform = `translateX(${deltaX}px)`;
                target.style['transition-duration'] = '0ms';
                if (deltaX > width / 2) {
                    this.currentDot = index - 1 < 0 ? this.banners.length - 1 : index - 1
                }
                if(deltaX < -width / 2) {
                    this.currentDot = (index + 1) % this.banners.length;
                }
            },
            transitionend(event) {
                // let target = event.target;
                // target.className = target.className.replace(/(\sanimation\-it)|(\snot\-animation\-it)/g, '');
                // console.log(target)
                this.animationIndex = -1;
                this.notAnimationIndex = -1;
            },
            donotDone() {
                this.$refs.alertInfo.showMsg('暂未开发');
            }
        },

        created() {
            
        },

        activated() {
            const that = this;
            that.$http.get('/banner')
                .then(function (response) {
                    let data = response.data;
                    if (data.code === 200) {
                        that.banners = data.banners
                    }
                })
                .catch(function (error) {
                    if (error.message.indexOf('timeout') >= 0) {
                        that.$refs.alertInfo.showMsg('请求超时');
                    }else {
                        that.$refs.alertInfo.showMsg('服务器错误');
                    }
                });
        },

        deactivated() {
            // const that = this;
            // clearInterval(that.bannerInterval);

        },

        watch: {
            current(to) {
                this.currentDot = to;
            }
        }
    }
</script>

<style scoped>
    .swipe {
        position: relative;
    }
    .swipe-container {
        position: relative;
        overflow: hidden;
        /*height: 139px;*/
    }
    .swipe-item {
        /*transform: translateX(2000px);*/
        width: 100%;
        position: absolute;
        top: 0;
    }
    /* 为了撑起父元素的高度 */
    .swipe-item:first-child {
        /*transform: translateX(2000px);*/
        width: 100%;
        position: relative;
        top: 0;
    }
    .animation-it {
        transition:transform 600ms!important;
        z-index: 300!important;
    }
    .not-animation-it {
        transition:transform 0!important;
        z-index: -1!important;
    }
    .current {
        transition:transform 600ms;
        z-index: 200;
        transform: translateX(0);
    }
    .prev {
        transition:transform 600ms;
        z-index: 200;
        transform: translateX(-100%);
    }
    .next {
        transition:transform 0;
        z-index: -1;
        transform: translateX(100%);
    }
    .swipe-item img {
        width: 100%;
        /*height: 139px;*/
    }
    
    .swipe-dot-container {
        position: absolute;
        bottom: .4rem;
        z-index: 301;
        left: 0;
        right: 0;
        text-align: center;
    }
    .dot-item {
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
        background: #aaa;
        display: inline-block;
        margin: 0 .4rem;
    }
    .dot-item.active {
        background: #d43c33;
    }
</style>