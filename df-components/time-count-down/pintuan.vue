<template>
	<view class="time">
		<!-- 距结束还有 -->
		<block v-if="isEnd">已结束</block>
		<block v-else>
			{{ h1text }}
			<view class="time-box">{{ timeArr[0] }}</view>
			:
			<view class="time-box">{{ timeArr[1] }}</view>
			:
			<view class="time-box-red">{{ timeArr[2] }}</view>
		</block>
	</view>
</template>

<script>
export default {
	props: {
		h1text: {
			type: String
		},
		timeArr: {
			type: Array
		}
	},
	computed: {
		isEnd() {
			if (this.timeArr[0] == '00' && this.timeArr[1] == '00' && this.timeArr[2] == '00') {
				return true;
			} else {
				return false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.time {
	font-size: 26rpx;
	color: #ffffff;
	display: flex;
	height: 36rpx;

	.time-box {
		background-color: #545454;
		padding: 0 0.2em;
		margin: 0 0.5em;
		border-radius: 8rpx;
	}

	.time-box-red {
		background-color: #ea3a37;
		padding: 0 0.2em;
		margin: 0 0.5em;
		border-radius: 8rpx;
		width: 2em;
		text-align: center;
	}
}
</style>
