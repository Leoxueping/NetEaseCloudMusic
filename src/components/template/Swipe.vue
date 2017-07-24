<template>
    <div class="swipe">
        <ul>
            <li ref="swipeItem" v-for="(item, index) in banners" :class="['swipe-item', {'not-current': current + 1 === index}, {current: current === index}]">
                <img :src="item.pic">
            </li>
        </ul>
        <alert-info ref="alertInfo"></alert-info>
    </div>
</template>

<script>

    import AlertInfo from '../template/AlertInfo.vue'

    export default {
        name: 'swipe',
        data() {
            return {
                banners:[],

                current: 0,
                bannerInterval: ''
            }
        },

        components: {
            AlertInfo
        },

        mounted() {
            let that = this;
            let interval = setInterval(function () {
                let items = that.$refs.swipeItem;
                if (items && items.length) {
                    clearInterval(interval);
                    if (that.bannerInterval) {
                        clearInterval(bannerInterval);
                        that.bannerInterval = '';
                    }
                    let width = items[0].offsetWidth;
                    
                    items[that.current].style['z-index'] = 200;
                    items[that.current + 1].style.transform = 'translateX('+ width +'px)';

                    that.bannerInterval = setInterval(function () {
                        
                        that.next();
                    }, 2000)
                }
            })
            
            
        },

        methods: {
            next() {
                let that = this,
                    items = that.$refs.swipeItem;
                if(!items || !items.length) {
                    return;
                }
                let width = items[0].offsetWidth,
                    length = that.banners.length;
                // console.log(width)
                items[that.current].style['z-index'] = 200;
                items[that.current].style.transform = 'translateX(-'+ width +'px)';
                // console.log(that.$refs.swipeItem[that.current])
                that.current = (that.current + 1) % length;
                items[that.current].style['z-index'] = 200;
                items[that.current].style.transform = 'translateX(0)';
                items[(that.current + 1) % length].style['z-index'] = -1;
                items[(that.current + 1) % length].style.transform = 'translateX('+ width +'px)';
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
                    that.$refs.alertInfo.showMsg('服务器错误');
                });
        },

        deactivated() {
            const that = this;
            clearInterval(that.bannerInterval);

        }
    }
</script>

<style scoped>
    .swipe>ul {
        position: relative;
        overflow: hidden;
        height: 139px;
    }
    .swipe-item {
        /*transform: translateX(2000px);*/
        transition:all 500ms;
        width: 100%;
        position: absolute;
        top: 0;
    }
    .swipe-item img {
        width: 100%;
        height: 139px;
    }
    /*.swipe-item.current {
        transform: translateX(0);
        display: block;
    }*/
    .swipe-item.not-current {
        /*display: none;*/
        /*transform: translateX(-2000px);*/
    }
</style>