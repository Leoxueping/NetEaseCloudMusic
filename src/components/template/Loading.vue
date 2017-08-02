<template>
    <div class="loading-container">
        <!-- <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
        </svg> -->
        <div :class="[{ 'm-load2-small': small }, 'm-load2']">
            <div :class="[{ 'line-small': small }, 'line']">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div :class="[{ 'circlebg-small': small }, 'circlebg']"></div>
        </div>
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
        },
        props: {
            small: {
                default() {
                    return false;
                }
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
    .m-load2 {
        width: 36px;
        height: 36px;
        /*margin: 100px auto;*/
    }

    .m-load2-small {
        width: 100%;
        height: 100%;
    }


    .m-load2 {
        /*background: #535353;*/
    }
    /** 加载动画的静态样式 **/

    .m-load2 {
        position: relative;
    }

    .m-load2 .line div {
        position: absolute;
        left: 16px;
        top: 0;
        width: 3px;
        height: 36px;
    }

    .m-load2-small .line-small div {
        position: absolute;
        left: .5rem;
        top: 0;
        width: .1rem;
        height: 1rem;
        z-index: 100;
    }

    .m-load2 .line div:before,
    .m-load2 .line div:after {
        content: '';
        display: block;
        height: 50%;
        background: #d43c33;
        border-radius: 5px;
    }

    .m-load2-small .line-small div:before,
    .m-load2-small .line-small div:after {
        content: '';
        display: block;
        height: 50%;
        background: #fff;
        border-radius: 5px;
    }

    .m-load2 .line div:nth-child(2) {
        -webkit-transform: rotate(30deg);
    }

    .m-load2 .line div:nth-child(3) {
        -webkit-transform: rotate(60deg);
    }

    .m-load2 .line div:nth-child(4) {
        -webkit-transform: rotate(90deg);
    }

    .m-load2 .line div:nth-child(5) {
        -webkit-transform: rotate(120deg);
    }

    .m-load2 .line div:nth-child(6) {
        -webkit-transform: rotate(150deg);
    }

    .m-load2 .circlebg {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 18px;
        height: 18px;
        margin: -9px 0 0 -9px;
        background: #eee;
        border-radius: 18px;
    }

    .m-load2-small .circlebg-small {
        position: absolute;
        left: .4rem;
        top: .4rem;
        width: .2rem;
        height: .2rem;
        /*margin: -9px 0 0 -9px;*/
        background: #fff;
        border-radius: 50%;
        margin: 0;
    }
    /** 加载动画 **/

    @-webkit-keyframes load {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .m-load2 .line div:nth-child(1):before {
        -webkit-animation: load 1.2s linear 0s infinite;
    }

    .m-load2 .line div:nth-child(2):before {
        -webkit-animation: load 1.2s linear 0.1s infinite;
    }

    .m-load2 .line div:nth-child(3):before {
        -webkit-animation: load 1.2s linear 0.2s infinite;
    }

    .m-load2 .line div:nth-child(4):before {
        -webkit-animation: load 1.2s linear 0.3s infinite;
    }

    .m-load2 .line div:nth-child(5):before {
        -webkit-animation: load 1.2s linear 0.4s infinite;
    }

    .m-load2 .line div:nth-child(6):before {
        -webkit-animation: load 1.2s linear 0.5s infinite;
    }

    .m-load2 .line div:nth-child(1):after {
        -webkit-animation: load 1.2s linear 0.6s infinite;
    }

    .m-load2 .line div:nth-child(2):after {
        -webkit-animation: load 1.2s linear 0.7s infinite;
    }

    .m-load2 .line div:nth-child(3):after {
        -webkit-animation: load 1.2s linear 0.8s infinite;
    }

    .m-load2 .line div:nth-child(4):after {
        -webkit-animation: load 1.2s linear 0.9s infinite;
    }

    .m-load2 .line div:nth-child(5):after {
        -webkit-animation: load 1.2s linear 1s infinite;
    }

    .m-load2 .line div:nth-child(6):after {
        -webkit-animation: load 1.2s linear 1.1s infinite;
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