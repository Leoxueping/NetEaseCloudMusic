import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/page/Index'
import PlayList from '@/components/page/PlayList'
import HostStation from '@/components/page/HostStation'
import RankList from '@/components/page/RankList'
import PlayListDetail from '@/components/page/PlayListDetail'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/Index',
        name: 'Index',
        component: Index
    }, { 
        path: '/', 
        redirect: '/Index' 
    }, {
        path: '/PlayList',
        name: 'PlayList',
        component: PlayList 
    }, {
        path: '/HostStation',
        name: 'HostStation',
        component: HostStation 
    }, {
        path: '/RankList',
        name: 'RankList',
        component: RankList 
    }, {
        path: '/PlayListDetail',
        name: 'PlayListDetail',
        component: PlayListDetail 
    }],
    linkActiveClass: 'active'
})
