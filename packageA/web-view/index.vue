<template>
	<view><web-view :src="src"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			src: ''
		};
	},
	onLoad(options) {
		console.log('web-view options',options);
		let { data, title } = options;
		this.src = decodeURIComponent(data);
		console.log('this.src',this.src);
		uni.setNavigationBarTitle({ title });
	}
};
</script>

<style lang="scss"></style>
