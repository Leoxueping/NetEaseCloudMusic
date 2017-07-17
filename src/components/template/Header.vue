<template>
	<header>
		<input type="text" placeholder="搜索音乐、歌曲、电台" name="search">
		<div>搜索</div>
	</header>
</template>

<script>
export default {
	name: 'header'
}	
</script>

<style scoped>
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
        padding-left: 40px;
    }

    header>div {
        flex: 1;
        text-align: right;
        height: 30px;
        line-height: 30px;
    }
</style>