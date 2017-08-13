<template>
    <div class="page-container">
        <swipe></swipe>
        <div class="cards">
            <ul>
                <li class="circle-li" @click="gotoPersonalFM">
                    <div class="circle"></div>
                    <p>私人FM</p>
                </li>
                <li class="circle-li" @click="gotoDayRecommand">
                    <div class="circle">
                        <div class="date">{{new Date().getDate()}}</div>
                    </div>
                    <p>每日歌曲推荐</p>
                </li>
                <li class="circle-li" @click="gotoHotList">
                    <div class="circle"></div>
                    <p>云音乐热歌榜</p>
                </li>
            </ul>
        </div>
        <div class="rec-music-list">
            <div class="header">
                <div class="list-left">
                    <!-- <div ></div> -->
                    <div class="header-text">
                        <span>推荐歌单</span>
                        <i class="icon-angle-right"></i>
                    </div>
                    
                </div>
            </div>
            <transition name="fade-in">
                <div class="music-cards" v-if="musices && musices.length">
                    <div v-for="(item, index) in musices" class="music-card-item col-3">
                        <router-link :to="{ 
                            name: 'PlayListDetail', 
                            params: { id: musices[index].id, copywriter: musices[index].copywriter }}"
                        >
                            <div class="my-badge">
                                <i class="icon-headphones"></i>
                                {{parseInt(item.playCount / 10000)}}万
                            </div>
                            <div>
                                <img :src="item.picUrl" style="height: 100%; width: 100%;">
                            </div>
                            <p class="card-item-desc">
                                {{item.name}}
                            </p>
                        </router-link>
                    </div>
                </div>
            </transition>
            <transition name="fade-in">
                <div v-if="!musices || !musices.length" style="height: 10rem;">
                    <loading></loading>
                </div>
            </transition>
        </div>

        <div class="exclusive-delivery">
            <div class="header">
                <div class="list-left">
                    <!-- <div ></div> -->
                    <div class="header-text">
                        <span>独家放送</span>
                        <i class="icon-angle-right"></i>
                    </div>
                    
                </div>
            </div>
            <div>
                <transition name="fade-in">
                    <div class="music-cards" v-if="exclusiveDeliveries && exclusiveDeliveries.length">
                        <div v-for="(item, index) in exclusiveDeliveries" class="music-card-item col-2">
                            <router-link :to="{ 
                                name: 'PlayListDetail', 
                                params: { id: exclusiveDeliveries[index].id, copywriter: exclusiveDeliveries[index].copywriter }}"
                            >
                                <div class="my-badge">
                                    <i class="icon-headphones"></i>
                                    {{parseInt(item.playCount / 10000)}}万
                                </div>
                                <div>
                                    <img :src="item.picUrl" style="height: 100%; width: 100%;">
                                </div>
                                <p class="card-item-desc">
                                    {{item.name}}
                                </p>
                            </router-link>
                        </div>
                    </div>
                </transition>
                <transition name="fade-in">
                    <div v-if="!exclusiveDeliveries || !exclusiveDeliveries.length" style="height: 10rem;">
                        <loading></loading>
                    </div>
                </transition> 
            </div>
        </div>
        <!-- <music-player></music-player> -->
        <alert-info ref="alertInfo"></alert-info>
    </div>
        
</template>

<script>
    import AlertInfo from '../template/AlertInfo.vue'
    import Swipe from '../template/Swipe.vue'
    import Loading from '../template/Loading.vue'
    // import MusicPlayer from '../template/MusicPlayer.vue'
    export default {
        name: 'indexPage',
        data() {
            return {
                musices: [],
                exclusiveDeliveries: []
            }
        },
        components: {
            Swipe,
            AlertInfo,
            Loading
        },
        created() {

        },

        activated() {
            
            const that = this;

            /*获取推荐歌单*/
            this.$http.get('/personalized').then(function (response) {
                let data = response.data;
                if (data.code === 200) {
                    that.musices = data.result;
                }
            }).catch(function (error) {
                // alert('服务器错误!')
                if (error.message.indexOf('timeout') >= 0) {
                    that.$refs.alertInfo.showMsg('请求超时');
                }else {
                    that.$refs.alertInfo.showMsg('服务器错误');
                }
                
                // console.error('服务器错误', error)
            });

            /*获取独家放送*/
            this.$http.get('/personalized/privatecontent').then(function (response) {
                let data = response.data;
                if (data.code === 200) {
                    that.exclusiveDeliveries = data.result;
                }
            }).catch(function (error) {
                // alert('服务器错误!')
                if (error.message.indexOf('timeout') >= 0) {
                    that.$refs.alertInfo.showMsg('请求超时');
                }else {
                    that.$refs.alertInfo.showMsg('服务器错误');
                }
                
                // console.error('服务器错误', error)
            });
        },

        methods: {
            // playListDetail(index) {
            //     const that = this;
            //     this.$router.replace({name: 'PlayListDetail', params: { id: that.musices[index].id }});
            // }
            gotoPersonalFM() {
                this.$refs.alertInfo.showMsg('该功能需登录，暂未开发');
            },
            gotoDayRecommand() {
                this.$refs.alertInfo.showMsg('该功能需登录，暂未开发');
            },
            gotoHotList() {

            }
        }
    }
</script>

<style scoped>
    .cards {
        border-bottom: 1px solid rgba(107, 107, 107, 0.298);
    }
    .cards>ul {
        display: flex;
        padding: 20px;
        padding-bottom: 6px;
    }
    .circle-li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: .6em;
    }
    .circle {
        border: 1px solid #d43c33;
        width: 59%;
        padding-top: 59%;
        border-radius: 50%;
        position: relative;
        margin-bottom: 10px;
    }
    .circle-li:nth-child(1) .circle {
        background-image: url('../../assets/radio.png');
        background-size: 50px 50px;
        background-repeat: no-repeat;
        background-position: center;
    }
    .circle-li:nth-child(3) .circle {
        background-image: url('../../assets/list.png');
        background-size: 45px 45px;
        background-repeat: no-repeat;
        background-position: center;
    }
    .date {
        position: absolute;
        left: 50%;
        top: 50%;
        color: #d43c33;
        font-size: 30px;
        height: 30px;
        width: 30px;
        margin-left: -15px;
        margin-top: -15px;
        text-align: center;
        line-height: 30px;
    }

    .rec-music-list {
        padding: 0 10px;
    }
    .rec-music-list .header{
        display: flex;
        justify-content: space-between;
        margin: 20px 0 5px 0;
    }
    .rec-music-list .header .list-left {
        display: flex;
        height: 24px;
        line-height: 24px;
    }
    .header-text {
        position: relative;
        padding-left: 8px;
    }
    .header-text::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 100%;
        border-left: 4px solid #d43c33;
    }
    .icon-angle-right {
        font-size: 1.3em;
        font-weight: 100;
    }
    .list-right {
        height: 24px;
        line-height: 24px;
        color: #9da79b;
    }

    .music-card-item {
        text-align: center;
        display: inline-block;
        position: relative;
    }
    .col-3 {
        width: 32%;
        margin: 1%;
    }
    .col-3:nth-child(3n+0) {
        margin-right: 0;
    }
    .col-3:nth-child(3n+1) {
        margin-left: 0;
    }
    .music-card-item .my-badge {
        position: absolute;
        color: #fff;
        right: 5px;
        top: 5px;
    }
    .music-card-item .card-item-desc {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding: 6px 2px 0 6px;
        line-height: 1.2;
        font-size: 13px;
        height: 36px;
        text-align: left;
    }

    .exclusive-delivery {
        margin-top: 25px;
    }
    .col-2 {
        width: 49%;
        margin: 1%;
    }
    .col-2:nth-child(odd) {
        margin-left: 0;
    }
    .col-2:nth-child(even) {
        margin-right: 0;
    }
</style>