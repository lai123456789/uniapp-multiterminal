<!--
	秒杀商品
-->
<template>
	<view
		class="list-goods-item"
		@click="
			navigateToFn({ url: `/packageB/goods-detail/goods-detail-seckill?goods_id=${goodsId}&pageTypeRob=true` })
		"
	>
		<view class="image-wrap">
			<img-bg-css :src="goodsImage"></img-bg-css>
			<view class="icon-hot-wrap" v-if="trimFn(salesSum)"><icon-hot-wrap :text="salesSum"></icon-hot-wrap></view>
		</view>
		<view class="tag-img-wrap" v-if="tagPath"><image :src="tagImgSrc" class="image-dom"></image></view>
		<view class="goods-name-block text-ellipsis-rows">
			<image v-if="isNew" class="icon-new" :src="calcImageSrc('/global-image/new-flag.png')"></image>
			<image v-if="isHot" class="icon-hot" :src="calcImageSrc('/global-image/icon-hot.png')"></image>
			{{ goodsName }}
		</view>
		<view class="goods-description">
			<view class="goods-description-text text-ellipsis">{{ goodsDescription }}</view>
		</view>

		<view class="goods-tag-block">
			<view class="goods-tag text-ellipsis" v-if="trimFn(goodsTag)">{{ goodsTag }}</view>
		</view>

		<view class="bottom-price-block">
			<view class="price-block">
				<view class="price-icon">¥</view>
				<view class="price-text text-ellipsis">{{ goodsPrice | filterTransNum }}</view>
			</view>

			<view class="price-right-block">
				<vip-price v-if="isVipPrice">{{ vipPrice | filterTransNum }}</vip-price>
				<view class="price-line" v-else>¥{{ linePrice | filterTransNum }}</view>
			</view>
		</view>
		<view class="right-bottom-add-cart-block" @click.stop="goodsAddToCartFn">
			<view class="goods-selected-num" v-if="selectedNum >= 1">
				<uni-badge border size="small" :text="selectedNum" type="error"></uni-badge>
			</view>
			<view
				class="seckill-btn"
				:style="{
					boxShadow: `0 3rpx 15rpx ${configInfo.web_site_color}`,
					background: configInfo.web_site_color
				}"
			>
				抢
			</view>
		</view>
	</view>
</template>

<script>
import { bindMobileTips } from '@/tools/const.js';
import iconHotWrap from '@/df-components/icon-hot-wrap/index.vue';

let that;
// 本组件外层必须 使用 样式 font-size: 0; 来把 组件与组件之间的间隙去掉
export default {
	components: {
		iconHotWrap,
	},
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
		// 添加商品到购物车
		async goodsAddToCartFn() {
			let that = this;
			// 未登录就提示登录
			if (!that.isLogin) {
				that.closeGlobalLoginFn(true);
				return false;
			}

			// 未绑定手机号不能操作以下功能
			if (!that.isRunBindMobileFunc) {
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						e.confirm && that.navigateToFn({ url: `/packageA/tel-login/user-info` });
					}
				});
				return false;
			}

			console.log('添加购物车按钮js打印是否是多规格商品', that.isSpec);

			// 是多规格就弹框
			if (that.isSpec) {
				// 弹出规格框事件
				uni.$emit('popSpecBlock', {
					goodsId: that.goodsId,
				});
				return false;
			}
			that.hideAllFn();
			uni.showLoading();
			let result = await that.addShoppingCartFn(that.goodsId, 1);
			that.hideAllFn();
			if (result.type == 'success') {
				uni.showToast({
					icon: 'none',
					title: '加入购物车成功'
				});
				uni.$emit('goodsAddCartEd', {
					goodsId: that.goodsId,
					selectedNum: result.result
				});
				that.setTabBarCartNumFn();
			} else {
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
			}
		}
	},
	computed: {
		// 商品左上的图片标签 的 绝对路径字符串
		tagPath() {
			let that = this;
			return that.strTrimFn(that.tagImg); // 图片路径
		},
		// 商品左上的图片标签 的 网络地址
		tagImgSrc() {
			let that = this;
			return that.addimgPathHostFn(that.tagPath); // 拼接好域名
		}
	}
};
</script>

<style lang="scss" scoped>
.list-goods-item {
	display: inline-block;
	position: relative;
	width: 342rpx;
	height: 556rpx;
	border-radius: 20rpx;
	background: #ffffff;
	font-size: 0;
	overflow: hidden;

	.image-wrap {
		position: relative;
		padding: 20rpx;
		width: 342rpx;
		height: 342rpx;
		.icon-hot-wrap {
			position: absolute;
			z-index: 10;
			bottom: 20rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.tag-img-wrap {
		position: absolute;
		z-index: 10;
		top: 20rpx;
		left: 20rpx;
		width: 80rpx;
		height: 80rpx;
		.image-dom {
			width: 100%;
			height: 100%;
		}
	}

	.goods-name-block {
		padding: 0 20rpx;
		height: 72rpx;
		line-height: 1.4;
		font-size: 26rpx;
		color: #374050;
		font-weight: bold;

		/*设置或检索伸缩盒对象的子元素的排列方式*/
		.icon-new,
		.icon-hot {
			display: inline-block;
			margin-right: 4rpx;
			width: 32rpx;
			height: 32rpx;
			vertical-align: sub;
		}
	}

	.goods-description {
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		width: 100%;
		height: 36rpx;

		.goods-description-text {
			width: 100%;
			font-size: 22rpx;
			color: #91939c;
		}
	}

	.goods-tag-block {
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		height: 52rpx;
		overflow: hidden;

		.goods-tag {
			display: inline-block;
			padding: 0rpx 10rpx;
			color: #ff6128;
			line-height: 32rpx;
			font-size: 18rpx;
			border-radius: 8rpx;
			border: 1px solid #ff6128;
		}
	}

	.bottom-price-block {
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		height: 42rpx;

		.price-block {
			display: flex;
			flex-wrap: nowrap;
			align-items: flex-end;
			height: 40rpx;
			color: #eb3c39;
			font-weight: bold;

			.price-icon {
				display: inline-block;
				margin-right: 2rpx;
				line-height: 40rpx;
				font-size: 18rpx;
			}

			.price-text {
				flex: 1;
				display: inline-block;
				line-height: 40rpx;
				font-size: 28rpx;
			}
		}

		.price-right-block {
			padding-left: 4rpx;

			.price-line {
				margin-left: 4rpx;
				font-size: 24rpx;
				color: #91939c;
				text-decoration: line-through;
			}
		}
	}

	.right-bottom-add-cart-block {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
		width: 70rpx;
		height: 70rpx;
		background: #ffffff;
		.goods-selected-num {
			display: inline-block;
			position: absolute;
			left: inherit;
			top: 0;
			right: 0;
			transform: scale(0.8) translateX(4rpx) translateY(-12rpx);
		}

		.seckill-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			color: #ffffff;
			font-weight: 550;
			font-size: 34rpx;
		}
	}
}
</style>
