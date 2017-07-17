<template>
    <div class="play-list-detail">
        <div></div>
    </div>
</template>

<script>
    export default {
        name: 'HostStation',
        data() {
            return {
                id: ''
            }
        },

        created() {
            this.id = this.$route.params.id;
            this.$http.get(baseUrl + '/personalized')
                    .then(function (response) {
                        let data = response.data;
                        if (data.code === 200) {
                            // that.musices = data.result
                        }
                    })
                    .catch(function (error) {
                        alert('服务器错误!')
                    });
        }
    } 
</script>