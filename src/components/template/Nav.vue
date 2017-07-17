<template>
    <div>
        <ul>
            <li class="active">
                <router-link to="/Index">个性推荐</router-link>
            </li>
            <li>
                <router-link to="/PlayList">歌单</router-link>
            </li>
            <li>
                <router-link to="/HostStation">主播电台</router-link>
            </li>
            <li>
                <router-link to="/RankList">排行榜</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'nav'
    }
</script>

<style scoped>
    ul, li {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 14px;
    }
    ul {
        display: flex;
        box-shadow: 1px 1px 8px #888;
    }
    li {
        flex: 1;
        text-align: center;
    }

    a.active {
        border-bottom: 1px solid #d43c33;
    }

    a {
        height: 100%;
        width: 100%;
        display: block;
        color: #000;
        text-decoration: none;
        padding: 10px;
    }

</style>