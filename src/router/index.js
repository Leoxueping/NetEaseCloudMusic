import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/page/Index'
// import PlayList from '@/components/page/PlayList'
// import HostStation from '@/components/page/HostStation'
// import RankList from '@/components/page/RankList'
// import PlayListDetail from '@/components/page/PlayListDetail'
// import MusicPlayerDetail from '@/components/page/MusicPlayerDetail'
// import MyNav from '@/components/template/Nav'
// import MyHeader from '@/components/template/Header'
// import Temp from '@/components/template/Temp'
// import SearchResult from '@/components/page/SearchResult'

Vue.use(Router)
const getComponents = (path) => {
    return resolve => require([path], resolve)
    
    // return () => import(path)
}

export default new Router({
    routes: [{
        path: '/Index',
        name: 'Index',
        components: {
            // default: getComponents('../components/page/Index'),
            // header: getComponents('../components/template/Header'),
            // nav: getComponents('../components/template/Nav')
            default: resolve => require(['../components/page/Index'], resolve),
            header: resolve => require(['../components/template/Header'], resolve),
            nav: resolve => require(['../components/template/Nav'], resolve)
        }
    }, { 
        path: '/', 
        redirect: '/Index' 
    }, {
        path: '/PlayList',
        name: 'PlayList',
        components: {
            // default: PlayList,
            // header: MyHeader,
            // nav: MyNav
            default: resolve => require(['@/components/page/PlayList'], resolve),
            header: resolve => require(['../components/template/Header'], resolve),
            nav: resolve => require(['../components/template/Nav'], resolve)
        } 
    }, {
        path: '/HostStation',
        name: 'HostStation',
        components: {
            // default: HostStation,
            // header: MyHeader,
            // nav: MyNav
            default: resolve => require(['@/components/page/HostStation'], resolve),
            header: resolve => require(['../components/template/Header'], resolve),
            nav: resolve => require(['../components/template/Nav'], resolve)
        } 
    }, {
        path: '/RankList',
        name: 'RankList',
        components: {
            default: resolve => require(['@/components/page/RankList'], resolve),
            header: resolve => require(['../components/template/Header'], resolve),
            nav: resolve => require(['../components/template/Nav'], resolve)
        } 
    }, {
        path: '/PlayListDetail/:id/:copywriter',
        name: 'PlayListDetail',
        components: {
            default: resolve => require(['@/components/page/PlayListDetail'], resolve),
            header: resolve => require(['../components/template/Temp'], resolve),
            nav: resolve => require(['../components/template/Temp'], resolve)
        }
    }, {
        path: '/MusicPlayerDetail/:id',
        name: 'MusicPlayerDetail',
        components: {
            default: resolve => require(['@/components/page/MusicPlayerDetail'], resolve),
            header: resolve => require(['../components/template/Temp'], resolve),
            nav: resolve => require(['../components/template/Temp'], resolve)
        }
    }, {
        path: '/SearchResult/:keyWords',
        name: 'SearchResult',
        components: {
            default: resolve => require(['@/components/page/SearchResult'], resolve),
            header: resolve => require(['../components/template/Temp'], resolve),
            nav: resolve => require(['../components/template/Temp'], resolve)
        }
    }],
    linkActiveClass: 'active'
})
