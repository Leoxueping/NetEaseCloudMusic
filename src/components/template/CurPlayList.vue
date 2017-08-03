<template>
    <transition :name="showCurPlayList ? 'slide-up' : 'slide-down'" v-if="curPlayList">
        <div class="cur-play-list" v-show="showCurPlayList" @click.self="hideCurPlayList">
            <ul class="list-container">
                <li 
                    :class="['list-item', 'ripple-effect', { active: currentMusic.id===item.id }]" 
                    v-for="(item, index) in curPlayList.tracks"
                    @click.stop="changeMusic($event, index)"
                >
                    <div v-show="currentMusic.id!==item.id" class="list-item-left">{{index + 1}}</div>
                    <div v-show="currentMusic.id===item.id" class="list-item-left">
                        <i class="icon-volume-up"></i>
                    </div>
                    <div class="list-item-middle">{{item.name}}<span class="desc-text"> - {{item.ar[0].name}}</span></div>
                    <div class="list-item-right" @click.stop="reThMuFrCurPlList(index)">
                        <i class=" icon-remove"></i>
                    </div>
                </li>
            </ul>
        </div>
    </transition>
</template>

<script>

    import { mapState, mapMutations } from 'vuex'

    export default {
        name: 'curPlayList',
        data() {
            return {
                
            }
        },
        computed: {
            ...mapState({
                curPlayList: state => state.player.playList,
                currentMusic: state => state.player.currentMusic,
                showCurPlayList: state => state.player.showCurPlayList
            })
        },
        methods: {
            ...mapMutations([
                'hideCurPlayList'
            ]),
            changeMusic(event, index) {
                this.$ripple(event);
                const track = this.curPlayList.tracks[index];

                this.$store.dispatch('changeMusic', {
                    id: track.id,
                    arName: track.ar[0].name,
                    musicName: track.name,
                    showThePlayer: true
                });
                /*在MusicPlayer接收，使音乐停止播放*/
                this.$eventBus.$emit('changeMusic');
            },
            reThMuFrCurPlList(index) {
                this.$store.dispatch('reThMuFrCurPlList', {
                    removeIndex: index
                })
            }
        },
        components: {
        },
        watch: {
            
        }
    }
    
</script>

<style scoped>
    .cur-play-list {
        position: fixed;
        bottom: 0;
        top: 0;
        z-index: 305;
        width: 100%;
        background: rgba(0, 0, 0, .1);
    }
    .list-container {
        /*margin-top: 18rem;*/
        height: 60%;
        background: #fff;
        position: absolute;
        bottom: 0;
        width: 100%;
        overflow: auto;
    }
    .list-item {
        display: flex;
        height: 3rem;
        line-height: 3rem;
        text-overflow: ellipsis;
        border-top: solid 1px rgba(107, 107, 107, 0.298);
        font-size: 1.5rem;
    }
    .list-item.active, .list-item.active .desc-text {
        color: #d43c33;
    }
    .list-item-left {
        width: 3rem;
        text-align: center;
    }
    .list-item-right {
        width: 3rem;
        text-align: center;
        color: #949494;
    }
    .list-item-middle {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
    }
    .desc-text {
        font-size: 1.1rem;
    }
</style>