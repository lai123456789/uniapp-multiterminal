<template>
	<!-- 标题栏组件包裹元素 -->
	<view class="title-bar-wrap">
		<!-- 占位元素 -->
		<view class="title-bar-block" :style="{ height: `${statusBarHeight + 44}px` }"></view>

		<!-- 根据屏幕定位的元素 -->
		<view class="title-bar-flex" :style="{ height: `${statusBarHeight + 44}px`, background: bgColor }">
			<!-- 手机状态栏  (手机信号 手机电量 时间 。。。) -->
			<view class="status-bar-block" :style="{ height: `${statusBarHeight}px` }"></view>

			<!-- 放置内容的元素 -->
			<view class="title-block flex-center">
				<view class="title-text text-ellipsis-rows">
					<!-- 标题栏中间 的 文字 -->
					<slot>标题</slot>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
let statusBarHeight = uni.getSystemInfoSync().statusBarHeight; // 状态栏 高度
export default {
	props: {
		bgColor: {
			// 标题栏 背景颜色
			type: String,
			default: '#89d251'
		}
	},
	data() {
		return {
			statusBarHeight
		};
	},
};
</script>

<style lang="scss" scoped>
.title-bar-wrap {
	position: sticky;
	z-index: 50;
	left: 0;
	top: 0;
	width: 100vw;
	.title-bar-block {
		width: 100vw;
	}
	.title-bar-flex {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: fixed;
		z-index: 200;
		top: 0;
		left: 0;
		width: 100vw;
		transition: 0.1s;
		.status-bar-block {
			width: 100vw;
		}
		.title-block {
			width: 100vw;
			height: 44px;
			.title-text {
				max-width: 80vw;
				font-size: 16px;
				color: #ffffff;
				font-weight: bold;
				letter-spacing: 1px;
				-webkit-line-clamp: 1;
			}
		}
	}
}


</style>
