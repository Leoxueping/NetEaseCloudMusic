<template>
    <div>
        <ul class="tab-container">
            <li class="active ripple-effect" @click="navClicked($event, 0)">
                <router-link to="/Index">个性推荐</router-link>
            </li>
            <li class="ripple-effect" @click="navClicked($event, 1)">
                <router-link to="/PlayList">歌单</router-link>
            </li>
            <li class="ripple-effect" @click="navClicked($event, 2)">
                <router-link to="/HostStation">主播电台</router-link>
            </li>
            <li class="ripple-effect" @click="navClicked($event, 3)">
                <router-link to="/RankList">排行榜</router-link>
            </li>
            <li class="active-tab-border" :style="{ left: `${currentIndex*25}%` }"></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'nav',
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            navClicked(event, index) {
                this.$ripple(event);
                this.currentIndex = index;
            }
        }
    }
</script>

<style scoped>
    .tab-container {
        position: relative;
        display: flex;
    }
    .tab-container, li {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 14px;
    }
    li {
        flex: 1;
        text-align: center;
    }

    .active-tab-border {
        position: absolute;width: 25%;
        left: 0;
        bottom: 0;
        height: 2px;
        background: #d43c33;
        transition: left .3s;
    }

    a.active {
        /*border-bottom: 1px solid #d43c33;*/
        color: #d43c33;
    }

    a {
        height: 100%;
        width: 100%;
        display: block;
        color: #000;
        text-decoration: none;
        padding: 10px 0;
    }

</style>