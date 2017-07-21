import axios from 'axios'

const state = {
    currentMusic: '',
    playInfo: {
        isPlaying: false,
        currentTime: 0,
        totalTime: 0,
        playInterval: null,
        currentLyric: '暂无歌词',
        percent: 0
    },
    playList: [],

    isLoadingMusic: true,
    showThePlayer: false,
    track: {/*这是切换音乐的时候立即获得获得的数据，不需要ajax请求的*/
        id: '',
        arName: '',
        musicName: ''
    },
    lyric: {

    },
    klyric: {

    }
    // showThePlayer: false
}

const getters = {
    // currentMusic: state => state.currentMusic
}

const actions = {
    changeMusic({ commit, state }, payload) {
        commit('changeMusicTrack', payload)
        axios.get(baseUrl + '/song/detail?ids=' + payload.id)/*获取歌曲详情*/
                .then(response => {
                    let data = response.data;
                    let currentMusic = null;
                    if (data.code === 200) {
                        currentMusic = data.songs[0]

                        axios.get(baseUrl + '/music/url?id=' + payload.id)/*获取歌曲URL*/
                                .then(response => {
                                    let data = response.data;
                                    if (data.code === 200) {
                                        currentMusic.urlInfo = data.data[0];
                                        commit('changeMusic', {
                                            currentMusic
                                        })
                                    }
                                })
                                .catch(error => {
                                    console.error(error)
                                });

                    }
                })
                .catch(error => {
                    console.error(error)
                });

        
    },

    getLyric({ commit, state }) {
        axios.get(baseUrl + '/lyric?id=' + state.track.id)/*获取歌曲详情*/
                .then(response => {
                    let data = response.data;
                    if (data.code === 200) {
                        commit('setLyric', data);
                    }
                })
                .catch(error => {
                    console.error(error)
                });
    }
}

const mutations = {
    changeMusic(state, { currentMusic }) {
        state.currentMusic = currentMusic;
        // state.showThePlayer = true;
    },
    beginPlay(state, { playInterval, totalTime }) {
        const playInfo = state.playInfo;
        playInfo.isPlaying = true;
        playInfo.playInterval = playInterval;
        state.isLoadingMusic = false;
        state.playInfo.totalTime = totalTime;
    },
    pausePlay(state) {
        clearInterval(state.playInfo.playInterval);
        state.playInfo.playInterval = null;
        state.playInfo.isPlaying = false;
    },
    playEnded(state) {
        clearInterval(state.playInfo.playInterval);
        state.playInfo.playInterval = null;
        state.playInfo.isPlaying = false;
    },
    changeMusicTrack(state, payload) {
        // let theAudio = this.$refs.musicPlayerAudio;
        // if (this.playInfo.isPlaying) {
        //     this.playOrPause();    
        // }
        state.playInfo.isPlaying = false;
        state.track = payload;
        state.showThePlayer = true;
        state.isLoadingMusic = true;
    },

    setLyric(state, payload) {
        state.lyric = payload.lrc;
        state.klyric = payload.klyric;
    },

    hideThePlayer(state) {
        state.showThePlayer = false;
    },

    setThePlayInfo(state, { currentTime, percent }) {
        state.playInfo.currentTime = currentTime;
        state.playInfo.percent = percent;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
    // namespaced: true
}