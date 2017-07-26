<template>
    <div class="header-container">
    	<header>
    		<input type="text" placeholder="搜索音乐、歌曲、电台" @focus="inputFocus" v-model="searchInput">
    		<div>搜索</div>
    	</header>
        <transition name="fade-in">
            <v-touch @pan.self="hideSearchTip" @tap.self="hideSearchTip">
                <div class="tip-container" @click="hideSearchTip" v-show="searchInput !== '' && showSearchTip">
                    <ul class="seach-tip-list">
                        <li class="search-tip-item">
                            <router-link :to="{ name: 'SearchResult', params: { keyWords: searchInput }}">
                                搜索"{{searchInput}}"
                            </router-link>
                        </li>
                        <li class="search-tip-item" v-for="(item, index) in tipSongs">
                            <router-link :to="{ name: 'SearchResult', params: { keyWords: item.name }}">
                                <i class="icon-search"></i>
                                {{item.name}}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </v-touch>
        </transition>
    </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

export default {
	name: 'header',
    data() {
        return {
            searchInput: '',
            tipSongs: []
        }
    },
    computed: {
        ...mapState({
            showSearchTip: state => state.search.showSearchTip
        })
    },
    methods: {
        ...mapMutations([
            'hideSearchTip'
        ]),
        inputFocus() {
            if (this.searchInput !== '') {
                this.$store.commit('showSearchTip');
            }
        }
    },
    watch: {
        searchInput(next, prev) {
            if (next === '') {
                return;
            }
            this.$store.commit('showSearchTip');
            const that = this;
            this.$http.get('/search/suggest?keywords=' + next).then((response) => {
                const data = response.data.result;
                if (data.songs) {
                    that.tipSongs = data.songs;
                }else {
                    that.tipSongs = [];
                }
            })
        }
    }
}	
</script>

<style scoped>
    .header-container {
        position: relative;
    }
	header {
		background: #d43c33;
        padding: 8px;
        color: #fff;
        display: flex;
	}

    header>input {
        height: 30px;
        border-radius: 5px;
        flex: 5;
        padding: 0 1.2rem;
        outline: none;
        color: #333;
    }

    header>div {
        flex: 1;
        text-align: right;
        height: 30px;
        line-height: 30px;
    }

    .tip-container {
        position: absolute;
        top: 46px;
        height: 100vh;
        width: 100%;
        background: transparent;
        z-index: 300;
    }

    .seach-tip-list {
        position: relative;
        left: 3%;
        right: 3%;
        background: #fff;
        z-index: 300;
        width: 94%;
        box-shadow: 0 1px 5px 1px gray;
    }

    .seach-tip-list .search-tip-item {
        color: #949494;
        height: 4rem;
        line-height: 4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-top: solid 1px rgba(107, 107, 107, 0.298);
        padding: 0 1rem;
    }
    .seach-tip-list .search-tip-item a {
        color: #949494;
        height: 100%;
        width: 100%;
        display: block;
    }
    .seach-tip-list .search-tip-item:first-child {
        color: #428bca;
        border-top: none;
    }
    .icon-search {
       
    }
</style>