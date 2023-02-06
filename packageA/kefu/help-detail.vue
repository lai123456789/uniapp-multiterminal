<template>
	<view class="page">
		<view class="content-wrap">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
			};
		},
		onLoad() {
			let that = this;
			let {
				title,
				content,
			} = uni.getStorageSync('helpQuestionItem');
			that.content = content;
			title = title.length > 12 ? `${title.substring(0,12)}...` : title;

			console.log(title, content);

			uni.setNavigationBarTitle({
				title,
			})

			uni.setStorageSync('helpQuestionItem', {});

		},
	}
</script>

<style lang="scss">
	.page,
	page {}
</style>
