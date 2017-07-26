import axios from 'axios'

const state = {
    showSearchTip: true
}

const getters = {
    // currentMusic: state => state.currentMusic
}

const actions = {
    
}

const mutations = {
    hideSearchTip(state) {
        state.showSearchTip = false;
    },
    showSearchTip(state) {
        state.showSearchTip = true;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
    // namespaced: true
}