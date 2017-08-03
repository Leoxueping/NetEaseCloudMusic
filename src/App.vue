<template>
    <div id="app">
        <transition :name="transitionName" mode="out-in">
            <keep-alive>
                <router-view name="header"></router-view>
            </keep-alive>
        </transition>
        <transition :name="transitionName" mode="out-in">
            <keep-alive>
                <router-view name="nav"></router-view>
            </keep-alive>
        </transition>
        <transition :name="transitionName" mode="out-in">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <music-player></music-player>
        <cur-play-list></cur-play-list>
    </div>
</template>

<script>
    import MusicPlayer from './components/template/MusicPlayer.vue'
    import CurPlayList from './components/template/CurPlayList.vue'
    // import Index from './components/page/Index.vue'
    // import RecMusicList from './components/te/RecMusicList.vue'
    export default {
        name: 'app',
        data() {
            return {
                transitionName: 'slide-right'
            }
        },
        components: {
            // Swipe,
            // index,
            MusicPlayer,
            CurPlayList
        },
        watch: {
            '$route'(to, from) {
                /*页面跳转动画*/
                const order = {
                    Index: 0,
                    PlayList: 1,
                    HostStation: 2,
                    RankList: 3,
                    PlayListDetail: 4
                }

                if (to.name === 'MusicPlayerDetail') {
                    this.transitionName = 'slide-up';
                }else if(from.name === 'MusicPlayerDetail') {
                    this.transitionName = 'slide-down';
                }else {
                    this.transitionName = order[to.name] > order[from.name] ? 'slide-left' : 'slide-right';
                }

                /*从播放器界面出来时显示底部小播放器*/
                if (from.name === "MusicPlayerDetail") {
                    this.$store.commit("showThePlayer");
                }

            }
        }
    }
</script>
    
<style lang="less">
    // @import './assets/css/style.css';
    // @import './assets/css/font-awesome.min.css';
</style>
