import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/page/Index'
import PlayList from '@/components/page/PlayList'
import HostStation from '@/components/page/HostStation'
import RankList from '@/components/page/RankList'
import PlayListDetail from '@/components/page/PlayListDetail'
import MusicPlayerDetail from '@/components/page/MusicPlayerDetail'
import MyNav from '@/components/template/Nav'
import MyHeader from '@/components/template/Header'
import Temp from '@/components/template/Temp'
import SearchResult from '@/components/page/SearchResult'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/Index',
        name: 'Index',
        components: {
            default: Index,
            header: MyHeader,
            nav: MyNav
        }
    }, { 
        path: '/', 
        redirect: '/Index' 
    }, {
        path: '/PlayList',
        name: 'PlayList',
        components: {
            default: PlayList,
            header: MyHeader,
            nav: MyNav
        } 
    }, {
        path: '/HostStation',
        name: 'HostStation',
        components: {
            default: HostStation,
            header: MyHeader,
            nav: MyNav
        } 
    }, {
        path: '/RankList',
        name: 'RankList',
        components: {
            default: RankList,
            header: MyHeader,
            nav: MyNav
        } 
    }, {
        path: '/PlayListDetail/:id',
        name: 'PlayListDetail',
        components: {
            default: PlayListDetail,
            header: Temp,
            nav: Temp
        }
    }, {
        path: '/MusicPlayerDetail/:id',
        name: 'MusicPlayerDetail',
        components: {
            default: MusicPlayerDetail,
            header: Temp,
            nav: Temp
        }
    }, {
        path: '/SearchResult/:keyWords',
        name: 'SearchResult',
        components: {
            default: SearchResult,
            header: MyHeader,
            nav: Temp
        }
    }],
    linkActiveClass: 'active'
})
