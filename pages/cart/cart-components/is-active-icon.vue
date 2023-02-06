<!--
	是否勾选的组件
-->
<template>
	<view class="is-active-icon flex-center">
		<view v-show="isActive">
			<uni-icons :color="configInfo.web_site_color" size="20" type="checkbox-filled"></uni-icons>
		</view>
		<view v-show="!isActive"><uni-icons color="#d4d7da" size="20" type="circle"></uni-icons></view>
	</view>
</template>

<script>
export default {
	props:{
		// 是否勾选
		isActive:{
			type: Boolean,
			default:false
		}
	},
};
</script>

<style scoped lang="scss">
.is-active-icon {
	width: 40rpx;
	height: 40rpx;
}
</style>
