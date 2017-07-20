<template>
    <div class="page-container">
        播放器界面
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