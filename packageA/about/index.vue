<template>
	<view class="page">
		<view class="content-wrap"><rich-text :nodes="content"></rich-text></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			content: ''
		};
	},
	onLoad() {
		this.getAboutInfo();
	},
	methods: {
		async getAboutInfo() {
			let that = this;
			let result = await that.$request({
				loading: 1,
				method: 'post',
				url: '/api/User/RichText',
				data: {
					type: 1
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					that.content = result.data.data.content;
				} else {
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
			console.log(result, '关于我们也没返回 数据', '\n');
		}
	}
};
</script>

<style lang="scss"></style>
