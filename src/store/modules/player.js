import axios from 'axios'

const state = {
    currentMusic: ''
}

const getters = {
    // currentMusic: state => state.currentMusic
}

const actions = {
    playThisMusic({ commit, state }, { id }) {
        axios.get(baseUrl + '/song/detail?ids=' + id)/*获取歌曲详情*/
                .then(response => {
                    let data = response.data;
                    let currentMusic = null;
                    if (data.code === 200) {
                        currentMusic = data.songs[0]

                        axios.get(baseUrl + '/music/url?id=' + id)/*获取歌曲URL*/
                                .then(response => {
                                    let data = response.data;
                                    if (data.code === 200) {
                                        currentMusic.urlInfo = data.data[0];
                                        commit('playThisMusic', {
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

        
    }
}

const mutations = {
    playThisMusic(state, { currentMusic }) {
        // state.currentMusic = payload.id;
        console.log(currentMusic)
        state.currentMusic = currentMusic;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
    // namespaced: true
}