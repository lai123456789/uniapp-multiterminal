<!-- 
	首页优惠券弹框里的单个优惠券组件
-->
<template>
	<view class="quan">
		<view class="quan-block" :style="calcStyle_quan_block">
			<view class="money-block" :style="calcStyle_money_block">
				<!-- <view class="after" :style="calcStyle_after"> -->
				<view class="after">
					<view class="dot" :style="calcStyle_money_block" v-for="item in 10" :key="item"></view>
				</view>
				<view class="wrap">
					<text class="icon-money">¥</text>
					<text class="num-number">{{ info.money }}</text>
				</view>
			</view>
			<view class="description" :style="calcStyle_description">
				<text class="title-h4" :style="calcStyle_title_h4">{{ info.title }}</text>
				<!-- <text class="title-h5">7天内使用有效</text> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		info: {
			type: Object
		},
		styleObj: {
			type: [Object, Boolean]
		}
	},
	computed: {
		calcStyle_quan_block() {
			let that = this;
			if (that.styleObj) {
				let obj = {};
				if (that.styleObj.coupon_popout_color) {
					obj['box-shadow'] = `0 10rpx 10rpx ${that.styleObj.coupon_popout_color}`;
				}
				return that.obj2styleStr(obj);
			}
			return '';
		},
		calcStyle_money_block() {
			let that = this;
			if (that.styleObj) {
				let obj = {};
				/* 
					"coupon_popout_money_text_color": "#818819", // 弹框金额字体颜色
					"coupon_popout_money_color": "#ab7f7f", // 弹框金额背景颜色
					 */
				if (that.styleObj.coupon_popout_money_text_color) {
					obj.color = that.styleObj.coupon_popout_money_text_color;
				}
				if (that.styleObj.coupon_popout_money_color) {
					obj.background = that.styleObj.coupon_popout_money_color;
				}
				return that.obj2styleStr(obj);
			}
			return '';
		},
		calcStyle_after() {
			let that = this;
			if (that.styleObj) {
				let obj = {};
				if (that.styleObj.coupon_popout_money_color) {
					let str = `linear-gradient(45deg, ${
						that.styleObj.coupon_popout_money_color
					} 25%, transparent 25%, transparent),
						 linear-gradient(-45deg, ${that.styleObj.coupon_popout_money_color} 25%, transparent 25%, transparent),
						 linear-gradient(45deg, transparent 75%, ${that.styleObj.coupon_popout_money_color} 75%),
						 linear-gradient(-45deg, transparent 75%, ${that.styleObj.coupon_popout_money_color} 75%);`;
					obj['background-image'] = str;

					if (that.styleObj.coupon_popout_title_color) {
						obj['background-color'] = that.styleObj.coupon_popout_title_color;
					}
				}
				return that.obj2styleStr(obj);
			}
			return '';
		},
		calcStyle_description() {
			let that = this;
			if (that.styleObj) {
				let obj = {};
				if (that.styleObj.coupon_popout_title_color) {
					obj.background = that.styleObj.coupon_popout_title_color;
				}
				return that.obj2styleStr(obj);
			}
			return '';
		},
		calcStyle_title_h4() {
			let that = this;
			if (that.styleObj) {
				let obj = {};
				if (that.styleObj.coupon_popout_title_text_color) {
					obj.color = that.styleObj.coupon_popout_title_text_color;
				}
				return that.obj2styleStr(obj);
			}
			return '';
		}
	}
};
</script>

<style lang="scss" scoped>
.quan {
	padding: 0 40rpx;
	height: 146rpx;

	.quan-block {
		display: flex;
		background: #ffffff;
		height: 130rpx;
		box-shadow: 0 10rpx 10rpx #fcd2d3;
		border-radius: 10rpx;
		overflow: hidden;

		.money-block {
			// overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 210rpx;
			height: 100%;
			color: #ffffff;
			background: #fb6567;
			// box-shadow: inset 0 40rpx 40rpx rgba(255, 255, 255, 0.3);

			.icon-money {
				font-size: 30rpx;
			}

			.num-number {
				font-weight: 600;
				font-size: 60rpx;
			}

			position: relative;
			.after {
				position: absolute;
				right: 0;
				display: block;
				height: 100%;
				width: 10rpx;
				// background-color: red;
				// background-size: 10rpx 20rpx;
				transform: translateX(50%);
				/* 
					background-image:
						linear-gradient(45deg, #ff8180 25%, transparent 25%, transparent),
						linear-gradient(-45deg, #ff8180 25%, transparent 25%, transparent),
						linear-gradient(45deg, transparent 75%, #ff8180 75%),
						linear-gradient(-45deg, transparent 75%, #ff8180 75%);
						 */
				.dot {
					width: 16rpx;
					height: 16rpx;
					background: #ffffcd;
					border-radius: 50%;
				}
			}
		}

		.description {
			padding-left: 40rpx;
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-evenly;

			.title-h4 {
				@include text-ellipsis;
				max-width: 8em;
				color: $grey1-color;
				font-size: 30rpx;
			}

			.title-h5 {
				max-width: 10em;
				@include text-ellipsis;
				color: $grey2-color;
				font-size: 26rpx;
			}
		}
	}
}
</style>
