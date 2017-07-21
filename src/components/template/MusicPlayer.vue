<template>
    <transition name="slide-up">
        <div class="music-player" v-show="showThePlayer">

            <router-link class="music-player-header" :to="{ name: 'MusicPlayerDetail', params: { id: track.id }}">
                <img class="al-picture" :src="currentMusic && currentMusic.al.picUrl">
                <div class="loading-music-icon" v-show="isLoadingMusic">
                    <i class="icon-spinner icon-spin"></i>
                </div>
            </router-link>

            <router-link class="music-player-name" :to="{ name: 'MusicPlayerDetail', params: { id: track.id }}">
                <div class="music-name">{{track.musicName}}</div>
                <div class="desc-text ar-name">{{track.arName}}</div>
            </router-link>

            <div class="music-player-controller">
                <div class="progress-circle">
                    <div class="left-part">
                        <div class="left-circle" ref="leftCircle"></div>
                    </div>
                    <div class="right-part">
                        <div class="right-circle" ref="rightCircle"></div>
                    </div>
                    <i @click="playOrPause" :class="playInfo.isPlaying ? 'icon-pause pause-icon' : 'icon-play play-icon'"></i>
                </div>
                <div class="show-play-list">
                    <i class="icon-indent-right"></i>
                </div>
            </div>

            <audio @canplay.self="bufferEnded" ref="musicPlayerAudio" :src="currentMusic && currentMusic.urlInfo.url"></audio>

        </div>
    </transition>
</template>

<script>

import { mapState, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'musicPlayer',
        data() {
            return {
                
            }
        },
        components: {
            
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
            // currentMusic() { return this.$store.state.player.currentMusic }
        },
        created() {
            // console.log(this.currentMusic)
            // console.log(this.test)
            // console.log(this.$store.state)
            // this.$store.dispatch('playThisMusic', {
            //     id: 95447
            // })
            this.$store.dispatch('getLyric');

        },
        mounted() {
            let theAudio = null,
                that = this;
            const interval = setInterval(function () {
                theAudio = that.$refs.musicPlayerAudio;
                if (theAudio) {
                    clearInterval(interval)
                    that.$eventBus.$on('changeMusic', function () {
                        theAudio.pause();
                    })
                }
                // console.log(that.$refs.musicPlayerAudio)

            }, 2000)
            // console.log(this.$refs.musicPlayerAudio)
            // console.log(that.$refs.musicPlayerAudio.duration)
            
        },
        methods: {
            ...mapMutations([
                
            ]),
            playOrPause(toPlay) {
                let theAudio = this.$refs.musicPlayerAudio;

                let interval = null;
                const that = this;
                if (this.playInfo.isPlaying && (!toPlay || typeof toPlay === 'object')) {
                    theAudio.pause();
                    that.$store.commit('pausePlay');
                }else {
                    interval = setInterval(() => {

                        let rightcircle = that.$refs.rightCircle,
                            leftcircle = that.$refs.leftCircle,
                            percent = theAudio.currentTime / theAudio.duration;

                        if(isNaN(percent)) return;
                        if(percent <= 0.5){
                            rightcircle.style.cssText = "transform: rotate("+ (-135 + 360 * percent) +"deg)";
                            leftcircle.style.cssText = "transform: rotate(-134deg)";
                        }else{
                            rightcircle.style.cssText = "transform: rotate(45deg)";
                            leftcircle.style.cssText = "transform: rotate("+ (-135 + 360 * (percent - 0.5)) +"deg)";
                        }

                        that.$store.commit('setThePlayInfo', { currentTime: theAudio.currentTime, percent });

                        if (theAudio.ended) {
                            that.$store.commit('playEnded');
                        }

                    }, 500);
                    theAudio.play();
                    that.$store.commit('beginPlay', {
                        playInterval: interval,
                        totalTime: theAudio.duration
                    });
                }
                
            },

            bufferEnded() {
                console.log('缓存完成')

                this.playOrPause(true);
            }

            // changeMusic(track) {
            //     console.log('dksfjdklsfj')
            //     let theAudio = this.$refs.musicPlayerAudio;
            //     if (this.playInfo.isPlaying) {
            //         this.playOrPause();    
            //     }
            //     this.track = track;
            //     this.showThePlayer = true;
            //     this.isLoadingMusic = true;
            //     this.$store.dispatch('playThisMusic', { id: track.id })
            // }
           
        }
    }
</script>

<style scoped>
    .music-player {
        position: fixed;
        bottom: 0;
        left: 0;
        background: #fff;
        display: flex;
        z-index: 100;
        height: 50px;
        line-height: 50px;
        width: 100%;
    }
    .al-picture {
        height: 100%;
        width: 100%;
    }
    .music-player-header {
        width: 50px;
        padding: 5px;
        line-height: 40px;
        position: relative;
    }
    .music-player-name {
        flex: 1;
    }
    .music-player-controller {
        width: 100px;
        display: flex;
        align-items: center;
    }
    .music-name {
        line-height: 30px;
    }
    .ar-name {
        line-height: 20px;
        font-size: 10px;
        margin-top: -7px;
    }
    .progress-circle {
        height: 34px;
        width: 34px;
        line-height: 34px;
        text-align: center;
        position: relative;
        /*border: 2px solid #d43c33;*/
        /*border-radius: 50%;*/
    }

    .right-part{
        position: absolute;
        width: 17px;
        height: 34px;
        right: 0;
        top: 0;
        overflow: hidden;
    }
    .right-circle{
        width: 34px;
        height: 34px;
        border: 2px solid #333;
        border-radius: 50%;
        border-top: solid 2px #d43c33;
        border-right: solid 2px #d43c33;
        transform: rotate(-134deg);
        /*animation: circle_right 5s linear infinite;*/
        position: absolute;
        transition: all 0.4s;
        right: 0;
        top: 0;
    }
    /*@-webkit-keyframes circle_right{
        0%{
            transform : rotate(-134deg);
        }
        50%, 100%{
            transform : rotate(45deg);
        }
    }*/

    .left-part{
        position: absolute;
        width: 17px;
        height: 34px;
        left: 0;
        top: 0;
        overflow: hidden;
    }
    .left-circle{
        width: 34px;
        height: 34px;
        border: 2px solid #333;
        border-radius: 50%;
        border-left: solid 2px #d43c33;
        border-bottom: solid 2px #d43c33;
        /*transform: rotate(45deg);*/
        /*animation: circle_left 5s linear infinite;*/
        transform : rotate(-134deg);
        transition: all 0.5s;
        position: absolute;
        left: 0;
        top: 0;
    }
    /*@-webkit-keyframes circle_left{
        0%, 50%{
            transform : rotate(-134deg);
        }
        100%{
            transform : rotate(45deg);
        }
    }*/

    .play-icon {
        color: #d43c33; 
        font-size: 20px;
        position: relative;
        right: -2px;
        bottom: -2px;
    }
    .pause-icon {
        color: #d43c33; 
        font-size: 20px;
        position: relative;
        /*right: -2px;*/
        bottom: -2px;
    }
    .show-play-list {
        font-size: 20px;
        padding-left: 20px;
    }
    .loading-music-icon {
        color: #d43c33;
        font-size: 20px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        text-align: center;
        /*line-height: 50px;*/
        background: #aaa;
        margin: 5px;
    }

</style>