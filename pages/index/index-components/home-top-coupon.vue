<!--
	首页页面里展示优惠券组件
-->
<template>
	<view class="home-top-coupon">
		<view class="new-person-coupon-title" v-if="couponList.length > 0">
			<view class="content-wrap">
				<view class="title-text">
					<view class="text">
						<text class="h4">{{ couponTitleText }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 新人券领券 -->
		<view class="new-person-coupon-block" v-if="couponList.length > 0">
			<view class="content-wrap">
				<view class="new-person-coupon">
					<view
						class="coupon-block"
						v-for="(item, index) in couponList"
						:key="index"
						@click="getNewPersonCouponFn(item, index)"
					>
						<text class="h5">领取</text>
						<view class="money-value">
							<view class="money-icon">￥</view>
							<view class="text">{{ item.money }}</view>
						</view>
						<text class="h6">{{ item.title }}</text>
						<image
							class="bg-coupon"
							v-show="index % 3 == 0"
							:src="
								item.isGet
									? calcImageSrc('/index-images/dad8562db8b24bd0471d17e3872007b_03.png')
									: calcImageSrc('/index-images/dad8562db8b24ad0471d17e3872005b_01.png')
							"
						></image>
						<image
							class="bg-coupon"
							v-show="index % 3 == 1"
							:src="
								item.isGet
									? calcImageSrc('/index-images/dad8562db8b24bd0471d17e3872007b_03.png')
									: calcImageSrc('/index-images/dad8562db8b24ad0471d17e3872005b_02.png')
							"
						></image>
						<image
							class="bg-coupon"
							v-show="index % 3 == 2"
							:src="
								item.isGet
									? calcImageSrc('/index-images/dad8562db8b24bd0471d17e3872007b_03.png')
									: calcImageSrc('/index-images/dad8562db8b24ad0471d17e3872005b_03.png')
							"
						></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { bindMobileTips } from '@/tools/const.js';

export default {
	props: {
		// 优惠券默认标题文字
		couponTitleText: {
			type: String,
			default: ''
		},
		// 优惠券列表数据
		couponList: {
			type: Array,
			default: []
		}
	},
	methods: {
		// 领取优惠券
		async getNewPersonCouponFn(item, index) {
			let that = this;
			if (!that.isLogin) {
				that.closeGlobalLoginFn(true);
				return false;
			}
			
			
			// 未绑定手机号不能操作以下功能
			if(!that.isRunBindMobileFunc){
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						e.confirm && that.navigateToFn({url: `/packageA/tel-login/user-info`});
					},
				})
				return false;
			}
			
			if (item.isGet) {
				return false;
			}

			let result = await that.$request({
				loading: true,
				method: 'post',
				url: '/api/User/GetCoupon',
				data: {
					couponIds: item.id
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					that.$emit('getCouponSuccess', {
						item,
						index
					});
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
		}
	}
};
</script>

<style scoped lang="scss">
.home-top-coupon {
	padding: 10rpx 0;
	.h4 {
		display: inline-block;
		margin-bottom: 10rpx;
		font-weight: 700;
		font-size: 36rpx;
		color: #374050;
	}
	.new-person-coupon-block {
		.new-person-coupon {
			font-size: 0;
			white-space: nowrap;
			overflow-y: hidden;

			&::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
				white-space: nowrap;
			}

			.coupon-block {
				margin-right: 39rpx;
				width: 208rpx;
				height: 120rpx;
				position: relative;
				display: inline-block;
				overflow: hidden;
				&:last-child {
					margin-right: 0;
				}
			}

			image {
				width: 208rpx;
				height: 120rpx;
				position: absolute;
				z-index: 5;
			}

			text {
				display: inline-block;
				position: absolute;
				z-index: 10;
				color: #ffffff;
			}

			.h5 {
				top: 50%;
				transform: translateY(-50%);
				width: 24rpx;
				font-size: 24rpx;
				left: 11rpx;
				white-space: initial;
			}

			.text {
				display: inline-block;
			}

			.money-icon {
				font-size: 18rpx;
				font-weight: initial;

				display: inline-block;
			}

			.money-value {
				position: absolute;
				font-weight: 600;
				font-size: 36rpx;
				bottom: 50rpx;
				left: 50rpx;
				right: 0;
				height: 1.4em;
				z-index: 20;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #ffffff;

				display: block;
				text-align: center;
				white-space: nowrap;
			}

			.h6 {
				@include flex-center;
				font-weight: 400;
				top: 65rpx;
				line-height: 1em;
				left: 65rpx;
				font-size: 22rpx;
				width: 5.5em;
				height: 2.2em;
				text-align: center;
				@include text-ellipsis;
			}
		}
	}
}
</style>
