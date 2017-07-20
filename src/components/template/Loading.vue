<template>
    <div class="loading-container">
        <div class="loading-icon"></div>
        拼命加载中...
    </div>
</template>

<script>

    import MyNav from '../template/Nav.vue'
    import MyHeader from '../template/Header.vue'

    export default {
        name: 'loading',
        data() {
            return {
                
            }
        }
    }
</script>

<style scoped>
    .loading-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .loading-icon {
        width: 50px;
        height: 50px;
        border: 2px solid  #d43c33;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        animation: loading .6s infinite linear;
    }
    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>