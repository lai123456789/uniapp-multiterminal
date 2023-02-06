<!--
	详情页 优惠券组件外层的展示条
-->
<template>
	<view class="coupon-bar" @click="couponBarClickFn">
		<view class="title-text">{{ titleText }}</view>
		<view class="coupon-list">
			<scroll-view :scroll-x="true" class="scroll-view-dom">
				<block v-for="(item, index) in couponList" :key="index">
					<coupon :style-is-default="item.styleIsDefault" :coupon-name="item.couponName"></coupon>
				</block>
			</scroll-view>
		</view>
		<view class="more-arrow-icon">
			<view style="font-size: 16px; color: #52361b;" class="iconfont icon-arrow-right-copy-copy"></view>
		</view>
	</view>
</template>

<script>
import coupon from '@/packageB/goods-detail/goods-detail-components/coupon.vue'; // 详情页 优惠券组件
export default {
	components: {
		coupon,
	},
	props: {
		// 优惠券名字
		titleText: {
			type: String,
			default: ''
		},
		// 优惠券数据
		couponList: {
			type: Array,
			default: []
		}
	},
	methods: {
		couponBarClickFn() {
			let url = {
				[`优惠券`]: `/packageA/youhuiquan/index`,
				[`商品券`]: `/packageA/shangpinquan/index`
			};
			this.navigateToFn({ url: url[this.titleText], checkLogin: true });
		}
	}
};
</script>

<style lang="scss" scoped>
.coupon-bar {
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 0 24rpx;
	height: 80rpx;
	.title-text {
		width: 120rpx;
		font-size: 25rpx;
		color: #91939c;
	}
	.coupon-list {
		width: 558rpx;
		.scroll-view-dom {
			white-space: nowrap;
		}
	}
	.more-arrow-icon {
		width: 24rpx;
	}
}
</style>
