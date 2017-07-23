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
                console.log(detail, theUrl, lyric)
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

        /*把歌词格式化进一个对象里面*/
        // let lrcs1 = payload.lrc.lyric.split(']');
        // let lrcs = lrcs1.map(item => {
        //     let items = item.split('[');
        //     return items.filter(itemItem => (itemItem.replace(/(^\s*)|(\s*$)/g, "") !== ''))
        //     // return item.split('[');
        // })
        
        // lrcs = lrcs.reduce((prev, curr) => prev.concat(curr));
        // console.log(lrcs)
        // let lyric = {};
        // const timeToSecond = time => {
        //     time = time.slice(0, 5);
        //     time = time.split(':');
        //     return parseInt(time[0]) * 60 + parseInt(time[1]) + '';
        // } 
        // if (lrcs[0].indexOf('00:00') !== -1) {
        //     lrcs.forEach((item, index) => {
        //         if(index % 2 === 0) {
        //             lyric[timeToSecond(item)] = lrcs[index + 1];
        //         }
        //     })
        // }else {
        //     lyric['0'] = lrcs[0];
        //     lrcs.forEach((item, index) => {
        //         if(index % 2 !== 0) {
        //             lyric[timeToSecond(item)] = lrcs[index + 1];
        //         }
        //     })
        // }
        let lyric = payload.lrc.lyric.split(String.fromCharCode(10));

        console.log(lyric)
        
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