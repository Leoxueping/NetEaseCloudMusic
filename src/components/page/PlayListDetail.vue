<template>
    <transition name="slide-left">
        <div class="play-list-detail page-container">
            <div class="list-header">
                
                <div class="img-bg" :style="'background-image:url(' + playlist.coverImgUrl + ')'">
                </div>
                <div class="header-nav">
                    <div class="header-nav-left ripple-effect" @click="goBack">
                        <i class="icon-angle-left"></i>
                    </div>
                    <div class="header-nav-right">
                        <div class="header-nav-name">歌单</div>
                        <div class="header-nav-desc">{{copywriter}}</div>
                    </div>
                </div>
                <div class="list-header-content">
                    <div class="list-header-left">
                        <img class="list-img" :src="playlist.coverImgUrl">
                    </div>
                    <div class="list-header-right">
                        <div style="font-size: 17px;">{{playlist.name}}</div>
                        <div style="margin-top: 20px;">
                            <div class="avat-img-container">
                                <img class="avat-img" :src="creator.avatarUrl">
                                <div class="avat-icon u-icon"></div>
                            </div>
                            
                            {{creator.nickname}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="list-item ripple-effect" @click.stop="changeMusic($event, 0)">
                <div class="list-item-left">
                    <i style="font-size:20px;" class="icon-play-circle"></i>
                </div>
                <div class="list-item-middle">
                    播放全部
                    <span class="desc-text">(共{{playlist.trackCount}}首)</span>
                </div>
                <div class="list-item-right">
                    <i style="font-size: 20px; margin-right: 5px;" class="icon-list-ul"></i>多选
                </div>
            </div>

            <div v-if="playlist.tracks" @click.stop="changeMusic($event, index)" class="list-item ripple-effect" v-for="(item, index) in playlist.tracks">
                <div class="list-item-left">
                    <span class="desc-text">{{index + 1}}</span>
                </div>
                <div class="list-item-middle">
                    <div class="music-name">{{item.name}}</div>
                    <div class="desc-text list-desc-text">
                        {{item.ar[0].name}}-{{item.al.name}}
                    </div>
                </div>
                <div class="list-item-right">
                    <i style="font-size: 20px;" class="icon-indent-right"></i>
                </div>
            </div>
            <div v-if="!playlist.tracks" style="height: calc(100vh - 282px);">
                <loading></loading>
            </div>
        </div>
    </transition>
</template>

<script>

    import MusicPlayer from '../template/MusicPlayer.vue'
    import Loading from '../template/Loading.vue'
    import defaultCover from '../../assets/default_cover.png'
    import defaultUser from '../../assets/user-default.png'

    export default {
        name: 'HostStation',
        data() {
            return {
                id: '',
                copywriter: '',
                playlist: {
                    coverImgUrl: defaultCover
                },
                creator: {
                    nickname: '昵称',
                    avatarUrl: defaultUser
                }
            }
        },

        created() {
            
        },

        activated() {
            const that = this;
            this.id = this.$route.params.id;
            this.copywriter = this.$route.params.copywriter;
            this.$http.get('/playlist/detail?id=' + that.$route.params.id)
                .then(function (response) {
                    let data = response.data;
                    if (data.code === 200) {
                        that.playlist = data.playlist;
                        that.creator = data.playlist.creator;
                        // console.log(data)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    alert('服务器错误!')
                });
        },

        methods: {
            changeMusic(event, index) {

                this.$ripple(event);
                const track = this.playlist.tracks[index];
                const that = this;

                this.$store.dispatch('changeMusic', {
                    id: track.id,
                    arName: track.ar[0].name,
                    musicName: track.name,
                    showThePlayer: true
                });

                const playList = this.$store.state.player.playList;

                if (!playList || playList.id !== this.playlist.id) {
                    this.$store.commit('replacePlayList', {
                        playList: that.playlist
                    })
                }

                /*在MusicPlayer接收，使音乐停止播放*/
                this.$eventBus.$emit('changeMusic');
            },

            goBack() {
                this.$router.go(-1);
                this.$ripple(event);
            }
        },

        components: {
            MusicPlayer,
            Loading
        }
    } 
</script>

<style scoped>
    .list-header {
        position: relative;
        overflow: hidden;
        padding: 30px 20px;
    }
    .list-header-content {
        display: flex;
        background: #fff;
        z-index: 2;
    }
    .list-header-left {
        width: 126px;
        height: 126px;
        z-index: 2;
    }
    .list-header-right {
        z-index: 2;
        color: #fff;
        flex: 1;
        margin-left: 16px;
    }
    .list-img {
        height: 100%;
        width: 100%;    
    }
    .avat-img-container {
        display: inline-block;
        position: relative;
    }
    .avat-img {
        height: 30px; 
        width: 30px; 
        border-radius: 50%;
    }
    .avat-icon {
        background-position: -40px 0;
    }

    .list-item {
        display: flex;
        /*padding: 10px;  */
        font-size: 1.5rem;
        line-height: 2;
    }
    .list-item-left {
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .list-item-middle {
        flex: 3;
        width: 0;
        border-top: solid 1px rgba(107, 107, 107, 0.298);
    }
    .list-item-right {
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        display: none;
    }
    
    .music-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .list-desc-text {
        font-size: 12px;
        line-height: 1.5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: -7px;
    }
    
</style>