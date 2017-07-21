<template>
    <div class="player-detail-container">
        <div class="img-bg" :style="'background-image: url(' + currentMusic.al.picUrl + '); z-index: -1;'"></div>
        <header class="player-detail-header list-item">
            <div class="list-item-left">
               <i style="font-size: 3rem;" class="icon-angle-left"></i> 
            </div>
            <div class="list-item-middle">
                <div class="music-name">
                    <p>{{track.musicName}}</p>
                </div>
                <div class="desc-text">{{track.arName}}</div>
            </div>
            <div class="list-item-right">
                <i class="icon-share-alt"></i>
            </div>
            
        </header>
        <section class="player-detail-lyric">
            <div class="cd-container">
                <div :class="['cd-ar-picture', { 'not-playing': !playInfo.isPlaying }]">
                    <img :src="currentMusic.al.picUrl">
                </div>
                <div :class="['cd-wrapper', { 'not-playing': !playInfo.isPlaying }]"></div>
            </div>
            <div class="current-lyric">我就是歌词啊歌词啊歌词啊歌词啊歌词啊 啊</div>
            <div :class="['play-stick', { 'not-playing': !playInfo.isPlaying }]"></div>
        </section>
        <section class="player-detail-control">
            <div class="personal-operation">
                <i class="icon-heart-empty personal-operation-item"></i>
                <i class="icon-download-alt personal-operation-item"></i>
                <i class="icon-comment-alt personal-operation-item"></i>
                <i class=" icon-list-ul personal-operation-item"></i>
            </div>
            <div class="my-progress-bar">
                <span>{{playInfo.currentTime | time}}</span>
                <div class="bar-wrapper">
                    <div class="outer-bar">
                        <div class="inner-bar" :style="{width: playInfo.percent * 100 + '%'}"></div>
                    </div>
                </div>
                <span>{{playInfo.totalTime | time}}</span>
            </div>
            <div class="play-control">
                <i class="play-control-item icon-refresh"></i>
                <i class="play-control-item icon-step-backward"></i>
                <i :class="['play-control-item', playInfo.isPlaying ? 'icon-pause' : 'icon-play']"></i>
                <i class="play-control-item icon-step-forward"></i>
                <i class="play-control-item icon-indent-right"></i>
            </div>
        </section>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        name: 'musicPlayerDetail',
        data() {
            return {
                
            }
        },
        components: {

        },
        created() {
            // this.$http()
            this.$store.commit('hideThePlayer');
        },
        computed: {
            ...mapState({
                currentMusic: state => state.player.currentMusic,
                playInfo: state => state.player.playInfo,
                isLoadingMusic: state => state.player.isLoadingMusic,
                showThePlayer: state => state.player.showThePlayer,
                track: state => state.player.track,
                lyric: state => state.player.lyric,
                klyric: state => state.player.klyric
            })
        }
    }
    
</script>

<style scoped>
    .player-detail-container {
        position: relative;
        height: 100vh;
        width: 100vw;
        display: flex;
        overflow: hidden;
        flex-direction: column;
    }
    .player-detail-header {
        flex-basis: 4.7rem;
        color: #fff;
        position: relative;
    }
    .player-detail-header:after {
        position: absolute;
        content: "";
        bottom: -.1rem;
        left: 0;
        display: block;
        width: 100%;
        height: .1rem;
        background: radial-gradient(#d3d3d3 -90%,transparent 100%);
        /*background: red;*/
        z-index: 100;
    }
    .player-detail-lyric {
        flex: 1;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .current-lyric {
        font-size: 1.5rem;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        padding: 0 4rem;
        text-align: center;
    }


    .player-detail-control {
        height: 20rem;
        flex-basis: 10rem;
    }
    .list-item {
        display: flex;
        font-size: 18px;
    }
    .list-item-left {
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .list-item-middle {
        flex: 3;
        width: 0;
    }
    .list-item-right {
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .desc-text {
        font-size: 1.5rem;

    }
    .music-name {
        height: 3rem;
        position: relative;
    }
    .music-name p {
        position: absolute;
        bottom: 0;   
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;   
        width: 100%;
        margin: 0; 
    }

    .cd-container {
        margin: 8rem auto 0;
        width: 65%;
        padding: 3rem;
        position: relative;
    }
    .cd-ar-picture {
        width: 100%;
    }
    .cd-ar-picture img {
        width: 100%;
        height: auto;
        border-radius: 50%;
        animation: cd_rotate 3s linear infinite;
    }
    .cd-wrapper {
        background-image: url(../../assets/cd_wrapper.99bfb20.png);
        background-size: cover;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(107, 107, 107, 0.298);
        border-radius: 50%;
        animation: cd_rotate 3s linear infinite;
    }
    .cd-wrapper.not-playing, .cd-ar-picture.not-playing {
        animation-play-state: paused;
    }
    @keyframes cd_rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .play-stick {
        height: 14rem;
        width: 14rem;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: -.4rem;
        background-image: url(../../assets/stick_bg.98d5134.png);
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 5rem -1rem;
        transform-origin: center top;
        transition: all .3s ease-in;
    }
    .play-stick.not-playing {
        transform: rotate(-20deg);
    }

    .personal-operation {
        display: flex;
        width: 100%;
        line-height: 2;
        padding: 0 3rem;
    }
    .personal-operation-item {
        flex: 1;
        text-align: center;
        color: #fff;
        font-size: 2rem;
    }

    .my-progress-bar {
        display: flex;
        padding: 1rem;
    }
    .my-progress-bar span {
        color: #fff;
    }
    .bar-wrapper {
        flex: 1;
        position: relative;
    }
    .outer-bar {
        height: 2px;
        background: #dbdbdb;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 90%;
    }
    .inner-bar {
        height: 2px;
        width: 0;
        background: #ce3d3e;
        position: relative;
        transition: all .3s linear;
    }
    .inner-bar:after {
        content: '';
        display: block;
        position: absolute;
        right: -0.5rem;
        bottom: -0.5rem;
        height: 1rem;
        width: 1rem;
        background: #ce3d3e;
        border-radius: 50%;
    }

    .play-control {
        display: flex;
    }
    .play-control-item {
        flex: 1;
        color: #fff;
        text-align: center;
        font-size: 2rem;
    }
</style>