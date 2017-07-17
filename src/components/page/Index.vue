<template>
    <div>
        <my-header></my-header>
        <my-nav></my-nav>
        <swipe></swipe>
        <div class="cards">
            <ul>
                <li class="circle-li">
                    <div class="circle"></div>
                    <p>私人FM</p>
                </li>
                <li class="circle-li">
                    <div class="circle">
                        <div class="date">{{date}}</div>
                    </div>
                    <p>每日歌曲推荐</p>
                </li>
                <li class="circle-li">
                    <div class="circle"></div>
                    <p>云音乐热歌榜</p>
                </li>
            </ul>
        </div>
        <div class="rec-music-list">
            <div class="header">
                <div class="list-left">
                    <div>
                        <img src="../../assets/aei.png" style="width: 24px; height: 24px;">
                    </div>
                    <div style="padding-left: 5px;">推荐歌单</div>
                </div>
                <div class="list-right">
                    更多
                    <i class="icon-angle-right"></i>
                </div>
            </div>
            <div class="music-cards">
                <div v-for="(item, index) in musices" class="music-card-item" @click="playListDetail(index)">
                    <div class="my-badge">
                        <i class="icon-headphones"></i>
                        {{parseInt(item.playCount / 10000)}}万
                    </div>
                    <div>
                        <img :src="item.picUrl" style="height: 100%; width: 100%;">
                    </div>
                    <div style="text-align: left;">
                        {{item.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
        
</template>

<script>
    import Swipe from '../template/Swipe.vue'
    import MyNav from '../template/Nav.vue'
    import MyHeader from '../template/Header.vue'
    export default {
        name: 'indexPage',
        data() {
            return {
                date: 17,
                musices: []
            }
        },
        components: {
            Swipe,
            MyNav,
            MyHeader
        },
        created() {
            const that = this;
            this.$http.get(baseUrl + '/personalized')
                    .then(function (response) {
                        let data = response.data;
                        if (data.code === 200) {
                            that.musices = data.result
                        }
                    })
                    .catch(function (error) {
                        alert('服务器错误!')
                    });
        },

        methods: {
            
            playListDetail(index) {
                const that = this;
                this.$router.replace({name: 'PlayListDetail', params: { id: that.musices[index].id }});
            }
        }
    }
</script>

<style scoped>
    .cards>ul {
        display: flex;
        padding: 20px;
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
    }

    .rec-music-list {
        padding: 0 10px;
    }
    .rec-music-list .header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
    .rec-music-list .header .list-left {
        display: flex;
        height: 24px;
        line-height: 24px;
    }
    .list-right {
        height: 24px;
        line-height: 24px;
        color: #9da79b;
    }

    .music-card-item {
        font-size: 13px;
        width: 32%;
        text-align: center;
        display: inline-block;
        margin: 1%;
        position: relative;
    }
    .music-card-item:nth-child(3n+0) {
        margin-right: 0;
    }
    .music-card-item:nth-child(3n+1) {
        margin-left: 0;
    }
    .music-card-item .my-badge {
        position: absolute;
        color: #fff;
        right: 5px;
        top: 5px;
    }
</style>