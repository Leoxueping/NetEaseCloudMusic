import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import player from './modules/player'
import search from './modules/search'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        player,
        search
    },
    strict: debug,
})
