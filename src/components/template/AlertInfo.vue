<template>
    <transition name="fade-in">
        <div class="alert-info" v-if="isShowMsg">
            {{msg}}
        </div>
    </transition>
</template>

<script>

    export default {
        name: 'alertInfo',
        data() {
            return {
                isShowMsg: false,
                msg: '错误'
            }
        },
        components: {

        },
        methods: {
            showMsg(msg) {
                this.msg = msg;
                this.isShowMsg = true;
                const that = this;
                setTimeout(() => {
                    that.isShowMsg = false;
                }, 3000)
            }
        }
    }
    
</script>

<style scoped>
    .alert-info {
        background: rgba(0, 0, 0, .5);
        color: #fff;
        position: fixed;
        top: 4rem;
        left: 50%;
        transform: translate(-50%, 0);
        text-align: center;
        padding: .5rem 2rem;        
        z-index: 300;
    }
</style>