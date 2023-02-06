<!-- 商品列表加载时的 loading图  -->
<template>
	<view class="loading-wrap" v-if="isShow" :style="{ width: width, height: height }">
		<view class="loading-block">
			<view
				class="loading-item loading-item1"
				:style="{ borderColor: `${configInfo.web_site_color} transparent transparent transparent` }"
			></view>
			<view
				class="loading-item loading-item2"
				:style="{ borderColor: `${configInfo.web_site_color} transparent transparent transparent` }"
			></view>
			<view
				class="loading-item loading-item3"
				:style="{ borderColor: `${configInfo.web_site_color} transparent transparent transparent` }"
			></view>
			<view
				class="loading-item loading-item4"
				:style="{ borderColor: `${configInfo.web_site_color} transparent transparent transparent` }"
			></view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'loader-goods',
	props: {
		isShow: {
			type: Boolean,
			default: false
		},
		width: {
			type: [Number, String],
			default: '100%'
		},
		height: {
			type: [Number, String],
			default: '100%'
		}
	},
};
</script>

<style lang="scss" scoped>
.loading-wrap {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background: $bg-grey-color;
	.loading-block {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
		transform: scale(0.5);

		@keyframes lds-ring {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}

		.loading-item {
			box-sizing: border-box;
			display: block;
			position: absolute;
			width: 64px;
			height: 64px;
			margin: 8px;
			border: 8px solid red;
			border-radius: 50%;
			animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
			border-color: #fff transparent transparent transparent;
			&1 {
				animation-delay: -0.45s;
			}
			&2 {
				animation-delay: -0.3s;
			}
			&3 {
				animation-delay: -0.15s;
			}
		}
	}
}
</style>
