<!-- 商品展示组件列(上图下字)布局 -->
<template>
	<view
		class="goods-column-item"
		@click="navigateToFn({ url: `/packageB/goods-detail/goods-detail?goods_id=${goodsId}` })"
	>
		<view class="top-image-wrap">
			<view class="tag-img-wrap" v-if="tagImg"><image :src="tagImg" class="image-dom"></image></view>
			<image class="image-size image-dom" :src="goodsImage"></image>
		</view>
		<view class="bottom-goods-description">
			<view class="goods-name-box">
				<view class="goods-name-text text-ellipsis-rows">
					<image v-if="isNew" class="icon-new" :src="calcImageSrc('/global-image/new-flag.png')"></image>
					<image v-if="isHot" class="icon-hot" :src="calcImageSrc('/global-image/icon-hot.png')"></image>
					{{ goodsName }}
				</view>
			</view>
			<view class="goods-description-box">
				<view class="goods-description-text text-ellipsis">{{ goodsDescription }}</view>
			</view>
			<view class="tag-wrap">
				<view class="tag-style" v-if="goodsTag">{{ goodsTag }}</view>
			</view>

			<view class="price">
				<view class="price-icon">¥</view>
				<view class="price-money">{{ goodsPrice }}</view>
			</view>

			<view class="bottom-line-price-vip-price-box">
				<view class="vip-price-wrap" v-if="isVipPrice">
					<view class="vip-price-box">
						<view class="vip-price-icon">¥</view>
						<view class="vip-price-money">{{ vipPrice }}</view>
					</view>
					<view class="vip-price-text">
						<view class="iconfont icon-VIP1" style="font-size: 24rpx;"></view>
					</view>
				</view>
				<view v-else class="price-line">¥{{ linePrice }}</view>
			</view>
			<view
				class="add-cart-btn"
				:style="{ background: configInfo.web_site_color }"
				@click.stop="$onceClick(goodsAddCartFn)"
			>
				<view v-if="selectedNum > 0" class="flex-center buy-num-icon" style="display: inline-flex;">
					{{ selectedNum }}
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import { bindMobileTips } from '@/tools/const.js';
export default {
	props: {
		// 商品id
		goodsId: {
			type: [String, Number]
		},
		// 商品图片
		goodsImage: {
			type: String,
			default: ''
		},
		// 是否热销爆款
		isHot: {
			type: Boolean,
			default: false
		},
		// 是否新品
		isNew: {
			type: Boolean,
			default: false
		},
		// 商品名称
		goodsName: {
			type: String,
			default: ''
		},
		// 商品描述
		goodsDescription: {
			type: String,
			default: ''
		},
		// 商品标签文字
		goodsTag: {
			type: String,
			default: ''
		},
		// 是否会员专享
		isVipPrice: {
			type: Boolean,
			default: false
		},
		// 商品价格
		goodsPrice: {
			type: [String, Number],
			default: 0
		},
		// vip专享价
		vipPrice: {
			type: [String, Number],
			default: 0
		},
		// 划线价
		linePrice: {
			type: [String, Number],
			default: 0
		},
		// 已经添加到购物车的数量
		selectedNum: {
			type: [String, Number]
		},

		/* 
			引用组件 的页面是 vip 加上边框
			引用组件 的页面是 gouwuche 加入购物车成功后刷新购物车列表
			引用组件 的页面是 home-bottom-goods-list 首页的底部商品列表 把页面标识传递 给 加入购物车按钮组件
			引用组件 的页面是 rob-page 抢购秒杀页面 把已抢xx件的文字信息 组件展示在商品图上
		*/
		page: {
			type: String
		},
		// 是否多规格商品
		isSpec: {
			type: Boolean
		},
		// 已抢xx件的文字信息 页面是 秒杀 时显示出这个组件
		salesSum: {
			type: [String, Number]
		},
		// 商品左上的图片标签
		tagImg: {
			type: String,
			default: ''
		}
	},
	methods: {
		// 商品添加到购物车里
		async goodsAddCartFn() {
			let that = this;
			// 未登录就提示登录
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
			
			console.log('添加购物车按钮js打印是否是多规格商品', that.isSpec);

			// 是多规格就弹框
			if (that.isSpec) {
				// 弹出规格框事件
				uni.$emit('popSpecBlock', {
					goodsId: that.goodsId,
					page: that.page
				});
				return false;
			}
			that.hideAllFn();
			uni.showToast({
				icon: 'none',
				title: '加入购物车成功'
			});
			let result = await that.addShoppingCartFn(that.goodsId, 1);
			if (result.type == 'success') {
				uni.$emit('goodsAddCartEd', {
					goodsId: that.goodsId,
					selectedNum: that.selectedNum + 1
				});
				// 开始更新购物车列表
				that.setTabBarCartNumFn();
			} else {
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.goods-column-item {
	$size: 226rpx;
	display: inline-block;
	position: relative;
	width: $size;
	border-radius: 12rpx;
	overflow: hidden;
	background: #ffffff;
	font-size: 0;

	.top-image-wrap {
		position: relative;
		width: $size;
		height: $size;
		padding: 10rpx;

		.image-dom {
			border-radius: 12rpx;
		}
		.tag-img-wrap {
			position: absolute;
			z-index: 10;

			top: 10rpx;
			left: 10rpx;
			width: 60rpx;
			height: 60rpx;

			.image-dom {
				width: 100%;
				height: 100%;
			}
		}
	}

	.goods-name-box {
		width: 226rpx;
		height: 74rpx;
		padding: 0 10rpx;
		white-space: initial;
		.goods-name-text {
			color: #000000;
			font-size: 28rpx;
			line-height: 1.3;
			font-weight: 600;
			
			
			
			.icon-new,
			.icon-hot {
				display: inline-block;
				margin-right: 4rpx;
				width: 28rpx;
				height: 28rpx;
				vertical-align: middle;
				transform: translateY(-1rpx);
			}
		}
	}

	.goods-description-box {
		display: flex;
		align-items: center;
		width: 212rpx;
		height: 44rpx;
		padding: 0 10rpx;
		.goods-description-text {
			font-size: 26rpx;
			color: #a5a7ac;
		}
	}

	.tag-wrap {
		display: flex;
		align-items: center;
		width: 212rpx;
		height: 44rpx;
		padding: 0 10rpx;

		.tag-style {
			color: #f30d1d;
			border: 1px solid #f30d1d;
			font-size: 24rpx;
			display: inline-block;
			margin-right: 6rpx;
			height: 36rpx;
			line-height: 36rpx;
			border-radius: 6rpx;
			padding: 0 4rpx;
		}
	}

	.price {
		display: flex;
		align-items: center;
		color: #f30d1d;
		width: 212rpx;
		height: 44rpx;
		padding: 0 10rpx;
		.price-icon {
			display: inline-block;
			font-size: 24rpx;
		}

		.price-money {
			display: inline-block;
			font-size: 32rpx;
			font-weight: 600;
		}
	}

	.bottom-line-price-vip-price-box {
		display: flex;
		align-items: center;
		width: 212rpx;
		height: 44rpx;
		padding: 0 10rpx;
		.price-line {
			display: inline-block;
			font-size: 24rpx;
			color: #a5a7ac;
			text-decoration-line: line-through;
		}

		.vip-price-wrap {
			display: inline-flex;
			height: 32rpx;
			border-radius: 8rpx;
			overflow: hidden;
			background: #fee9cb;
			.vip-price-box {
				display: inline-block;
				color: #000000;
				padding: 0 8rpx;
				height: 32rpx;
				.vip-price-icon {
					display: inline-block;
					font-size: 24rpx;
					line-height: 32rpx;
				}
				.vip-price-money {
					display: inline-block;
					font-weight: 600;
					font-size: 32rpx;
					line-height: 32rpx;
				}
			}
			.vip-price-text {
				height: 32rpx;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				padding: 0 6rpx;
				font-size: 26rpx;
				color: #fee9cb;
				background: #000000;
			}
		}
	}
}

/* 加入购物车按钮 */

.add-cart-btn {
	position: absolute;
	right: 20rpx;
	bottom: 20rpx;
	width: 44rpx;
	height: 44rpx;
	background: #5ade51;
	border-radius: 40%;

	&::before,
	&::after {
		content: '';
		display: block;
		position: absolute;
		left: 50%;
		top: 50%;
		background: #ffffff;
		height: 22rpx;
		width: 4rpx;
		border-radius: 1000px;
	}

	&::before {
		transform: translate(-50%, -50%);
	}

	&::after {
		transform: translate(-50%, -50%) rotate(90deg);
	}

	.buy-num-icon {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0 6rpx;
		min-width: 20rpx;
		height: 20rpx;
		font-size: 16rpx;
		border-radius: 1000px;
		background: #fe3227;
		color: #ffffff;
		transform: translate(0, -36%);
	}
}
</style>
