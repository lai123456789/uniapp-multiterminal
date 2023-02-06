<template>
	<view class="nullBlock" :style="{ 'min-height': minHeight }">
		<image class="image-block" :src="calcImageSrc('/global-image/undefined-png.png')" :style="calcStyle"></image>
		<text class="text">{{ text }}</text>
		<text
			class="to-page-btn"
			:style="{ color: configInfo.web_site_color, 'border-color': configInfo.web_site_color }"
			v-if="isShowToPageBtn"
			@click="toPageBtnClickFn"
		>
			{{ toPageText }}
		</text>
	</view>
</template>

<script>
// 工具库 相关
import { checkTypeFn } from '@/tools/tools';
export default {
	props: {
		// 默认展示的文字
		text: {
			type: String,
			default: '空空如也~'
		},
		// 占位的最小高度
		minHeight: {
			type: String,
			default: '80vh'
		},
		// 指定图片大小
		imageSize: {
			type: Object
		},
		// 是否显示页面下面的跳转其他页面按钮
		isShowToPageBtn: {
			type: Boolean,
			default: false
		},
		// 跳转页面按钮的展示文字
		toPageText: {
			type: String,
			default: '逛逛首页'
		},
		// 跳转参数
		toPageUrl: {
			type: Object,
			default() {
				return {
					isTab: true,
					url: '/pages/index/index'
				};
			}
		},
		toPagebtnCallbackFn: {
			required: false
		}
	},
	methods: {
		toPageBtnClickFn() {
			let that = this;
			if (that.toPagebtnCallbackFn) {
				that.toPagebtnCallbackFn();
				return false;
			}
			that.navigateToFn(that.toPageUrl);
		}
	},
	computed: {
		calcStyle() {
			let resStr = '';
			if (checkTypeFn(this.imageSize) == 'Object' && Object.keys(this.imageSize).length > 0) {
				for (let i in this.imageSize) {
					resStr += `${i}:${this.imageSize[i]};`;
				}
			}
			return resStr;
		}
	}
};
</script>

<style lang="scss">
.nullBlock {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #ffffff;
	min-height: 80vh;

	.image-block {
		width: 750rpx;
		height: 400rpx;
	}

	.text {
		color: #91939c;
		font-size: 30rpx;
	}
	.to-page-btn {
		margin: 50rpx;
		padding: 28rpx 46rpx;
		color: #91939c;
		font-size: 32rpx;
		border: 1px solid #91939c;
		background: #ffffff;
		border-radius: 5px;
	}
}
</style>
