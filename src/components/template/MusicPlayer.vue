<template>
    <div class="music-player" v-if="currentMusic">
        <div class="music-player-header">
            <img class="al-picture" :src="currentMusic.al.picUrl">
        </div>
        <div class="music-player-name">
            <div class="music-name">{{currentMusic.name}}</div>
            <div class="desc-text ar-name">{{currentMusic.ar[0].name}}</div>
        </div>
        <div class="music-player-controller">
            <div class="progress-circle">
                <div class="left-part">
                    <div class="left-circle"></div>
                </div>
                <div class="right-part">
                    <div class="right-circle"></div>
                </div>

            </div>
        </div>
        <audio ref="musicPlayerAudio" :src="currentMusic.urlInfo.url"></audio>
    </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

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
                currentMusic: state => state.player.currentMusic
            })
            // currentMusic() { return this.$store.state.player.currentMusic }
        },
        created() {
            // console.log(this.currentMusic)
            // console.log(this.test)
            // console.log(this.$store.state)
            this.$store.dispatch('playThisMusic', {
                id: 95447
            })

        },
        mounted() {
            console.log(this.$refs.musicPlayerAudio)
            let that = this;
            console.log(that.$refs.musicPlayerAudio.duration)
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
        line-height: 50px;
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
    }
    .progress-circle {
        height: 40px;
        width: 40px;
        position: relative;
        /*border: 2px solid #d43c33;*/
        /*border-radius: 50%;*/
    }

    .right-part{
        position: absolute;
        width: 20px;
        height: 40px;
        right: 0;
        top: 0;
        overflow: hidden;
    }
    .right-circle{
        width: 40px;
        height: 40px;
        border: 2px solid #949494;
        border-radius: 50%;
        border-top: solid 2px #d43c33;
        border-right: solid 2px #d43c33;
        /*transform: rotate(45deg);*/
        animation: circle_right 5s linear infinite;
        position: absolute;
        right: 0;
        top: 0;
    }
    @-webkit-keyframes circle_right{
        0%{
            transform : rotate(-135deg);
        }
        50%, 100%{
            transform : rotate(45deg);
        }
    }

    .left-part{
        position: absolute;
        width: 20px;
        height: 40px;
        left: 0;
        top: 0;
        overflow: hidden;
    }
    .left-circle{
        width: 40px;
        height: 40px;
        border: 2px solid #949494;
        border-radius: 50%;
        border-left: solid 2px #d43c33;
        border-bottom: solid 2px #d43c33;
        /*transform: rotate(45deg);*/
        animation: circle_left 5s linear infinite;
        /*transform : rotate(135deg);*/
        position: absolute;
        left: 0;
        top: 0;
    }
    @-webkit-keyframes circle_left{
        0%, 50%{
            transform : rotate(-135deg);
        }
        100%{
            transform : rotate(45deg);
        }
    }
</style>