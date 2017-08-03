<template>
    <div class="search-result-container">
        <ul class="search-result-list">
            <li v-for="(item, index) in songs" class="search-result-item" @click="playAndAddToList(index)">
                <div class="music-name">{{item.name}}</div>
                <div class="ar-album-name">{{item.artists[0].name}} - {{item.album.name}}</div>
            </li>
        </ul>
    </div>
</template>

<script>


    export default {
        name: 'searchResult',
        data() {
            return {
                songs: []
            }
        },
        components: {
            
        },

        methods: {
            search() {
                const that = this;
                this.$store.commit('hideSearchTip');
                this.$http.get('/search?keywords=' + that.$route.params.keyWords).then(response => {

                    const data = response.data.result;
                    console.log(data)
                    if (data.songs) {
                        that.songs = data.songs;
                    }else {
                        that.songs = [];
                    }
                });
            },
            playAndAddToList(index) {
                const that = this,
                    oldSong = that.songs[index];
                this.$store.dispatch('playAndAddToList', {
                    song: {
                        a: null,
                        al: oldSong.album,
                        alia: oldSong.alias,
                        ar: oldSong.artists,
                        id: oldSong.id,
                        name: oldSong.name
                    }
                })
            }
        },

        activated() {
            this.search();
        },

        watch: {
            $route(from, to) {
                if(to.name === 'SearchResult') {
                    this.search();
                }
            }
        }
    }
</script>

<style scoped>
    .search-result-item {
        height: 5rem;
        border-top: solid 1px rgba(107, 107, 107, 0.298);
        padding-left: .6rem;
    }
    .music-name {
        height: 2.5rem;
        line-height: 2.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.6rem;
        margin-top: .3rem;
        color: #428bca;
    }
    .ar-album-name {
        height: 2.5rem;
        line-height: 2.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: -.7rem;
    }
</style>