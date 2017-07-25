import axios from 'axios'

const state = {
    currentMusic: '',
    playInfo: {
        isPlaying: false,
        currentTime: 0,
        totalTime: 0,
        // playInterval: null,
        currentLyric: '暂无歌词',
        percent: 0,
        showThePlayer: false
    },
    playList: null,

    isLoadingMusic: true,
    // showThePlayer: false,
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
        const id = payload.id;
        function getDetail() {
            return axios.get('/song/detail?ids=' + id);/*获取歌曲详情*/
        }
        function getURL() {
            return axios.get('/music/url?id=' + id);/*获取歌曲URL*/
        }
        function getLyric() {
            return axios.get('/lyric?id=' + id)
        }
        axios.all([getDetail(), getURL(), getLyric()])
            .then(axios.spread((detail, theUrl, lyric) => {
                let currentMusic = null;
                // console.log(detail, theUrl, lyric)
                currentMusic = detail.data.songs[0];
                currentMusic.urlInfo = theUrl.data.data[0];
                commit('changeMusic', {
                    currentMusic
                })
                commit('setLyric', lyric.data);
            }))
            .catch(error => {
                console.error(error)
            });
       
        // axios.get('/song/detail?ids=' + id)
        // .then((res) => {
        //     console.log(res)
        //     return axios.get('/music/url?id=' + id);;
        // }).then(res => {
        //     console.log(res);
        //     return axios.get('/lyric?id=' + id);
        // }).then(res => {
        //     console.log(res)
        // })
    },

    playEnded({ state, commit, dispatch }) {
        dispatch('playNext');
    },

    playNext({ state, commit, dispatch }) {
        commit('playEnded');
        const tracks = state.playList.tracks;
        for(let i = 0, len = tracks.length; i < len; i ++) {
            if (tracks[i].id === state.track.id) {
                let next = (i === len - 1) ? 0 : i + 1;
                dispatch('changeMusic', {
                    id: tracks[next].id,
                    arName: tracks[next].ar[0].name,
                    musicName: tracks[next].name,
                    showThePlayer: false
                })
                break;
            }
        }
    },

    playPrev({ state, commit, dispatch }) {
        commit('playEnded');
        const tracks = state.playList.tracks;
        for(let i = 0, len = tracks.length; i < len; i ++) {
            if (tracks[i].id === state.track.id) {
                let next = (i === 0) ? len - 1 : i - 1;
                dispatch('changeMusic', {
                    id: tracks[next].id,
                    arName: tracks[next].ar[0].name,
                    musicName: tracks[next].name,
                    showThePlayer: false
                })
                break;
            }
        }
    }
}

const mutations = {
    changeMusic(state, { currentMusic }) {
        state.currentMusic = currentMusic;
        // state.showThePlayer = true;
    },
    beginPlay(state) {
        const playInfo = state.playInfo;
        playInfo.isPlaying = true;
        // playInfo.playInterval = playInterval;
        state.isLoadingMusic = false;
        // state.playInfo.totalTime = totalTime;
    },
    pausePlay(state) {
        // clearInterval(state.playInfo.playInterval);
        // state.playInfo.playInterval = null;
        state.playInfo.isPlaying = false;
    },
    playEnded(state) {
        // clearInterval(state.playInfo.playInterval);
        // state.playInfo.playInterval = null;
        state.playInfo.isPlaying = false;
        state.playInfo.currentTime = 0;
        state.playInfo.percent = 0;

    },
    changeMusicTrack(state, { id, arName, musicName, showThePlayer }) {
        // let theAudio = this.$refs.musicPlayerAudio;
        // if (this.playInfo.isPlaying) {
        //     this.playOrPause();    
        // }
        state.playInfo.isPlaying = false;
        state.playInfo.showThePlayer = showThePlayer;
        state.track = { id, arName, musicName };
        // state.showThePlayer = true;
        state.isLoadingMusic = true;
    },

    setLyric(state, payload) {

        
        let lyric = payload.lrc.lyric,
            lines = lyric.split('\n'),  
            pattern = /\[\d{2}:\d{2}.\d{1,3}\]/g,
            result = [];
        
        lines.pop();
        while (!pattern.test(lines[0])) {/*去掉不含时间的行*/
            lines = lines.slice(1);
        };
        
        lines.forEach(item => {
            let time = item.match(pattern),
                value = item.replace(pattern, '');
            time.forEach(item => {
                let timeVals = item.slice(1, -1).split(':');
                result.push([parseInt(timeVals[0]) * 60 + parseFloat(timeVals[1]), value]);
            })
        })

        result.sort((prev, next) => {
            return prev[0] - next[0];
        })

        // console.log(result)
        // console.log(lines)
        
        state.lyric = result;
        state.klyric = payload.klyric;
    },

    hideThePlayer(state) {
        state.playInfo.showThePlayer = false;
    },

    setThePlayInfo(state, { currentTime, percent, currentLyric }) {
        state.playInfo.currentTime = currentTime;
        state.playInfo.percent = percent;
        state.playInfo.currentLyric = currentLyric;
    },

    updateCurrentLyric(state, { currentLyric }) {
        state.playInfo.currentLyric = currentLyric;
    },

    replacePlayList(state, { playList }) {
        state.playList = playList;
        console.log(playList)
    },

    setTotalTime(state, { totalTime }) {
        state.playInfo.totalTime = totalTime;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
    // namespaced: true
}