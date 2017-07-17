<template>
    <div>
        <my-header></my-header>
        <my-nav></my-nav>
        歌单
    </div>
</template>

<script>

    import MyNav from '../template/Nav.vue'
    import MyHeader from '../template/Header.vue'

    export default {
        name: 'playList',
        data() {
            return {
                
            }
        },
        components: {
            MyNav,
            MyHeader
        }
    }
</script>