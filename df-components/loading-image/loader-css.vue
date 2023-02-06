<template>
	<view class="loading-wrap" v-show="isShow">
		<view class="loading">
			<view class="span"></view>
			<view class="span"></view>
			<view class="span"></view>
			<view class="span"></view>
			<view class="span"></view>
		</view>
	</view>
</template>
<script>
export default {
	name: 'loader-css',
	props: {
		isShow: {
			type: Boolean
		}
	},
};
</script>

<style lang="scss" scoped>
@keyframes load {
	0%,
	100% {
		height: 40px;
		background: lightgreen;
	}

	50% {
		height: 70px;
		margin: -15px 0;
		background: lightblue;
	}
}

.loading-wrap {
	position: fixed;
	z-index: 880;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: #ffffff;
	overflow: hidden;

	.loading {
		display: flex;
		justify-content: space-between;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%,-50%,0);
		width: 80px;
		height: 40px;

		.span {
			display: inline-block;
			width: 8px;
			height: 100%;
			border-radius: 4px;
			background: lightgreen;
			animation: load 1s ease infinite;

			&:nth-child(2) {
				animation-delay: 0.2s;
			}

			&:nth-child(3) {
				animation-delay: 0.4s;
			}

			&:nth-child(4) {
				animation-delay: 0.6s;
			}

			&:nth-child(5) {
				animation-delay: 0.8s;
			}
		}
	}
}
</style>
