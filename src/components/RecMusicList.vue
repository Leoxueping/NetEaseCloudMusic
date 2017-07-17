<template>
    <div class="rec-music-list">
        <div class="header">
            <div class="list-left">
                <div>
                    <img src="../assets/aei.png" style="width: 24px; height: 24px;">
                </div>
                <div style="padding-left: 5px;">推荐歌单</div>
            </div>
            <div class="list-right">
                更多
                <i class="icon-angle-right"></i>
            </div>
        </div>
        <div class="music-cards">
            <div v-for="item in musices" class="music-card-item">
                <div>
                    <img :src="item.img" style="height: 100%; width: 100%;">
                </div>
                <div style="text-align: left;">
                    {{item.dec}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'recMusicList',
        data() {
            return{
                musices: [{
                    img: 'http://p1.music.126.net/FTZHKJJctuDubiGHeuuPtA==/109951162972417934.jpg',
                    url: '',
                    dec: '家里开始放假了时间发了'
                }, {
                    img: 'http://p1.music.126.net/FTZHKJJctuDubiGHeuuPtA==/109951162972417934.jpg',
                    url: '',
                    dec: '家里开始放假了时间发了'
                }, {
                    img: 'http://p1.music.126.net/FTZHKJJctuDubiGHeuuPtA==/109951162972417934.jpg',
                    url: '',
                    dec: '家里开始放假了时间发了'
                }, {
                    img: 'http://p1.music.126.net/FTZHKJJctuDubiGHeuuPtA==/109951162972417934.jpg',
                    url: '',
                    dec: '家里开始放假了时间发了'
                }, {
                    img: 'http://p1.music.126.net/FTZHKJJctuDubiGHeuuPtA==/109951162972417934.jpg',
                    url: '',
                    dec: '家里开始放假了时间发了'
                }, {
                    img: 'http://p1.music.126.net/FTZHKJJctuDubiGHeuuPtA==/109951162972417934.jpg',
                    url: '',
                    dec: '家里开始放假了时间发了'
                }]
            }
            
        }
    }
</script>

<style scoped>
    .rec-music-list {
        padding: 0 20px;
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
        width: 30%;
        text-align: center;
        display: inline-block;
        margin: 2.5%;
    }
    .music-card-item:nth-child(3n+0) {
        margin-right: 0;
    }
    .music-card-item:nth-child(3n+1) {
        margin-left: 0;
    }
    
</style>