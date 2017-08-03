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
        showThePlayer: false,
        // progressTotalTime: 0/*进度条宽度从调整当前播放时间时间后到100%的时间*/
    },
    playList: null,
    isLoadingUrl: true,/*audio加载音频资源*/
    isLoadingMusic: true,/*请求音频资源*/
    isJustingTime: false,/*是否正在手动调整进度*/
    // showThePlayer: false,
    track: {/*这是切换音乐的时候立即获得的数据，不需要ajax请求的*/
        id: '',
        arName: '',
        musicName: ''
    },
    lyric: {

    },
    klyric: {

    },
    showCurPlayList: false
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

    playAndAddToList({ commit, state, dispatch }, { song }) {

        commit('addMusicToPlayList', { song })

        dispatch('changeMusic', {
            id: song.id,
            arName: song.name,
            musicName: song.name,
            showThePlayer: true
        });

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
    },

    reThMuFrCurPlList({ state, commit, dispatch }, { removeIndex }) {
        if (state.currentMusic.id === state.playList.tracks[removeIndex].id) {
            dispatch('playNext');
        }
        commit('reThMuFrCurPlList', { removeIndex });
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

        if (payload.uncollected) {
            state.lyric = null;
            state.klyric = null;
            return;
        }
        if (payload.nolyric) {
            state.lyric = [[6000, '纯音乐,请欣赏']]
            return;
        }
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
                value = item.replace(pattern, '') || result[resule.length - 1][1];
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

    showThePlayer(state) {
        state.playInfo.showThePlayer = true;
    },

    setThePlayInfo(state, { currentTime, percent, currentLyric }) {
        state.playInfo.currentTime = currentTime;

        if(!state.isJustingTime) {
            state.playInfo.percent = percent;
        }
        
        state.playInfo.currentLyric = currentLyric;
    },

    updateCurrentLyric(state, { currentLyric }) {
        state.playInfo.currentLyric = currentLyric;
    },

    replacePlayList(state, { playList }) {
        state.playList = playList;
        console.log(playList)
    },

    addMusicToPlayList(state, { song }) {
        const playList = state.playList,
              currentMusic = state.currentMusic;
              // currentMusic.id
        if(!playList || !playList.tracks) {
            state.playList = {
                tracks: [song], 
                trackIds: [{
                    id: song.id
                }]
            }

            return;
        }
        let currentIndex = 0;
        
        if(currentMusic) {
            for(let i = 0, len = playList.tracks.length; i < len; i ++) {
                if (playList.tracks[i].id === currentMusic.id) {
                    currentIndex = i;
                    break;
                }
            }
        }
        
        playList.tracks.splice(currentIndex, 0, song);
        playList.trackIds.splice(currentIndex, 0, {id: song.id});
    },

    setTotalTime(state, { totalTime }) {
        state.playInfo.totalTime = totalTime;
    },

    adjustTime(state, { currentTime }) {
        const playInfo = state.playInfo;
        playInfo.currentTime = currentTime;
    },

    setLoadingUrl(state, { isLoadingUrl }) {
        state.isLoadingUrl = isLoadingUrl;
    },

    setIsJustingTime(state, { isJustingTime }) {
        state.isJustingTime = isJustingTime;
    },
    showCurPlayList(state) {
        state.showCurPlayList = true;
    },
    hideCurPlayList(state) {
        state.showCurPlayList = false;
    },
    reThMuFrCurPlList(state, { removeIndex }) {
        state.playList.tracks.splice(removeIndex, 1);
        state.playList.trackIds.splice(removeIndex, 1);
    }
}

export default {
    state,
    getters,
    actions,
    mutations
    // namespaced: true
}