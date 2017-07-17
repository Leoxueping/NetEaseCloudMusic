<template>
    <div>
        <my-header></my-header>
        <my-nav></my-nav>
        主播电台
    </div>
</template>

<script>

    import MyNav from '../template/Nav.vue'
    import MyHeader from '../template/Header.vue'

    export default {
        name: 'HostStation',
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