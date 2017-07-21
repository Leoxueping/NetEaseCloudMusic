<template>
    <div class="loading-container">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg>
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
    /*.loading-icon {
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
    }*/
    .circular {
        -webkit-animation: rotate 2s linear infinite;
                animation: rotate 2s linear infinite;
        height: 50px;
        -webkit-transform-origin: center center;
                transform-origin: center center;
        width: 50px;
    }   
    
    .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        -webkit-animation: dash 0.9s ease-in-out infinite;
                animation: dash 0.9s ease-in-out infinite;
        stroke-linecap: round;
        stroke: red;
    }

    @-webkit-keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
        }
    }

    @keyframes rotate {
        100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
        }
    }
    @-webkit-keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
</style>