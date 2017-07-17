<template>
    <div class="cards">
        <ul>
            <li class="circle-li">
                <div class="circle"></div>
                <p>私人FM</p>
            </li>
            <li class="circle-li">
                <div class="circle">
                    <div class="date">{{date}}</div>
                </div>
                <p>每日歌曲推荐</p>
            </li>
            <li class="circle-li">
                <div class="circle"></div>
                <p>云音乐热歌榜</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'cards',
        data() {
            return {
                date: 17
            }
        }
    }
</script>

<style scoped>
    .cards>ul {
        display: flex;
        padding: 20px;
    }
    .circle-li {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: .6em;
    }
    .circle {
        border: 1px solid #d43c33;
        width: 59%;
        padding-top: 59%;
        border-radius: 50%;
        position: relative;
    }
    .circle-li:nth-child(1) .circle {
        background-image: url('../assets/radio.png');
        background-size: 50px 50px;
        background-repeat: no-repeat;
        background-position: center;
    }
    .circle-li:nth-child(3) .circle {
        background-image: url('../assets/list.png');
        background-size: 45px 45px;
        background-repeat: no-repeat;
        background-position: center;
    }
    .date {
        position: absolute;
        left: 50%;
        top: 50%;
        color: #d43c33;
        font-size: 30px;
        height: 30px;
        width: 30px;
        margin-left: -15px;
        margin-top: -15px;
    }
</style>