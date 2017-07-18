<template>
    <div id="app">
        
        <router-view></router-view>
    </div>
</template>

<script>
    import MyNav from './components/template/Nav.vue'
    import MyHeader from './components/template/Header.vue'
    // import Index from './components/page/Index.vue'
    // import RecMusicList from './components/te/RecMusicList.vue'
    export default {
        name: 'app',
        data() {
            return {

            }
        },
        components: {
            MyNav,
            // Swipe,
            // index,
            MyHeader
        }
    }
</script>
    
<style lang="less">
    // @import './assets/css/style.css';
    // @import './assets/css/font-awesome.min.css';
</style>
