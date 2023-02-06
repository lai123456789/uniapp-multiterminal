<!-- 
	会员模块 展示的商品 独占一行组件
-->
<template>
	<view
		class="list-goods-item-row"
		:class="[goodsAddCartStyle == shuanganniushuzi ? 'shuanganniushuzi' : '']"
		@click="navigateToFn({ url: `/packageB/goods-detail/goods-detail?goods_id=${goodsId}` })"
	>
		<view class="left-image-wraper">
			<view class="image-wrap"><img-bg-css :src="goodsImage"></img-bg-css></view>

			<view class="tag-img-wrap" v-if="tagPath"><image :src="tagImgSrc" class="image-dom"></image></view>
		</view>
		<view class="right-description-wrap">
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

			<!-- 无减购按钮(价格) -->
			<view class="bottom-price-block" v-if="goodsAddCartStyle == anniushuzi">
				<view class="price-block">
					<view class="price-icon">¥</view>
					<view class="price-text">{{ goodsPrice | filterTransNum }}</view>
				</view>
				<view class="price-right-block">
					<vip-price v-if="isVipPrice">{{ vipPrice | filterTransNum }}</vip-price>
					<view class="price-line" v-else>¥{{ linePrice | filterTransNum }}</view>
				</view>
			</view>
			<!-- 有减购按钮(价格) -->
			<block v-if="goodsAddCartStyle == shuanganniushuzi">
				<view class="bottom-price-block">
					<view class="price-block shuanganniushuzi">
						<view class="price-icon">¥</view>
						<view class="price-text">{{ goodsPrice | filterTransNum }}</view>
					</view>
				</view>
				<view class="bottom-price-block">
					<view class="price-right-block">
						<vip-price v-if="isVipPrice">{{ vipPrice | filterTransNum }}</vip-price>
						<view class="price-line" v-else>¥{{ linePrice | filterTransNum }}</view>
					</view>
				</view>
			</block>
		</view>

		<!-- 无减购按钮(加入购物的按钮) -->
		<view
			v-if="goodsAddCartStyle == anniushuzi"
			class="right-bottom-add-cart-block anniushuzi"
			@click.stop="addGoodstoCartFn"
		>
			<view class="goods-selected-num" v-if="selectedNum > 0">
				<uni-badge border size="small" :text="selectedNum" type="error"></uni-badge>
			</view>
			<uni-icons :color="configInfo.web_site_color" size="25" type="plus-filled"></uni-icons>
		</view>

		<!-- 有减购按钮(加入购物的按钮) -->
		<view
			v-if="goodsAddCartStyle == shuanganniushuzi"
			class="right-bottom-add-cart-block shuanganniushuzi"
			:class="[selectedNum <= 0 ? 'selectedNum0' : '']"
			@click.stop="catchTouchMove"
		>
			<block v-if="selectedNum <= 0">
				<view
					@click="addGoodstoCartFn"
					class="add-btn-icon-style flex-center"
					:style="{
						backgroundImage: `linear-gradient(160deg, ${hexToRgba(configInfo.web_site_color, 0.5)}, ${
							configInfo.web_site_color
						})`
					}"
				>
					<view class="iconfont icon-ziyuan" style="color: #ffffff;font-size: 30rpx;"></view>
				</view>
			</block>
			<block v-else>
				<uni-icons
					:color="configInfo.web_site_color"
					size="25"
					type="minus"
					@click.native="minusGoodstoCartFn"
				></uni-icons>
				<input class="input-dom" disabled type="number" :value="selectedNum" />
				<uni-icons
					:color="configInfo.web_site_color"
					size="25"
					type="plus-filled"
					@click.native="addGoodstoCartFn"
				></uni-icons>
			</block>
		</view>
	</view>
</template>

<script>
import { bindMobileTips } from '@/tools/const.js';

// 本组件外层必须 使用 样式 font-size: 0; 来把 组件与组件之间的间隙去掉
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
		// 是否多规格商品
		isSpec: {
			type: Boolean
		},
		// 商品左上的图片标签
		tagImg: {
			type: String,
			default: ''
		},
		// 是否最后一个
		isLast: {
			type: Boolean
		}
	},
	methods: {
		// 添加商品到购物车
		async addGoodstoCartFn() {
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
					page: that.page
				});
				return false;
			}
			that.hideAllFn();
			uni.showLoading({});
			let result = await that.addShoppingCartFn(that.goodsId, 1);

			if (result.type == 'success') {
				uni.showToast({
					icon: 'none',
					title: '加入购物车成功'
				});
				uni.$emit('goodsAddCartEd', {
					goodsId: that.goodsId,
					selectedNum: result.result,
					specId: that.goodsSpecId
				});
				that.setTabBarCartNumFn();
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
			}
		},
		// 删除一个购物车商品
		async minusGoodstoCartFn() {
			let that = this;

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

			if (that.isSpec) {
				uni.showToast({
					icon: 'none',
					title: '多规格商品只能去购物车删除哦~'
				});
				return false;
			}
			// 判断如果小于等于0就删掉
			if (that.selectedNum - 1 <= 0) {
				uni.showModal({
					title: '把商品从购物车删除',
					async success(e) {
						if (e.confirm) {
							that.hideAllFn();
							uni.showLoading({});
							let result = await that.delCartGoodsAtListFn(that.goodsId);

							if (result.type == 'success') {
								that.hideAllFn();
								uni.$emit('goodsAddCartEd', {
									goodsId: that.goodsId,
									selectedNum: 0
								});
							} else {
								that.hideAllFn();
								uni.showToast({
									icon: 'none',
									title: result.msg
								});
							}
							that.setTabBarCartNumFn();
						}
					}
				});
				return false;
			}

			that.hideAllFn();
			uni.showLoading({});
			let result = await that.addShoppingCartFn(that.goodsId, -1);
			if (result.type == 'success') {
				that.hideAllFn();
				uni.$emit('goodsAddCartEd', {
					goodsId: that.goodsId,
					selectedNum: that.selectedNum - 1
				});
				that.setTabBarCartNumFn();
			} else {
				that.hideAllFn();
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
.list-goods-item-row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 10rpx 0;
	font-size: 0;
	background: #ffffff;
	border-radius: 20rpx;
	&.shuanganniushuzi {
		padding: 20rpx 0;
	}

	.left-image-wraper {
		position: relative;
		width: 232rpx;
		height: 232rpx;
		margin-right: 10rpx;

		.image-wrap {
			padding: 10rpx;
			width: 100%;
			height: 100%;
		}
		.tag-img-wrap {
			position: absolute;
			z-index: 10;
			top: 20rpx;
			left: 20rpx;
			width: 60rpx;
			height: 60rpx;
			.image-dom {
				width: 100%;
				height: 100%;
			}
		}
	}

	.right-description-wrap {
		width: 468rpx;

		.goods-name-block {
			width: 100%;
			height: 72rpx;
			line-height: 1.4;
			font-size: 26rpx;
			color: #374050;
			font-weight: bold;
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
			height: 42rpx;
			.price-block {
				display: flex;
				flex-wrap: nowrap;
				align-items: flex-end;
				margin-right: 8rpx;
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
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
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
	}

	.right-bottom-add-cart-block {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		z-index: 10;
		right: 10rpx;
		bottom: 10rpx;
		width: 142rpx;
		height: 60rpx;
		background: #ffffff;

		&.anniushuzi {
			width: 60rpx;
		}
		&.shuanganniushuzi {
			width: 160rpx;
		}
		&.selectedNum0 {
			justify-content: flex-end;
		}
		.input-dom {
			display: flex;
			margin: 0 10rpx;
			text-align: center;
			font-size: 26rpx;
			color: $grey1-color;
		}

		.goods-selected-num {
			display: inline-block;
			position: absolute;
			top: 0;
			left: 0;
			transform: scale(0.7) translateX(22rpx) translateY(-12rpx);

			/* #ifdef H5 || APP-PLUS */
			transform: scale(0.7) translateX(20rpx) translateY(-2rpx);
			/* #endif */
		}

		.add-btn-style {
			position: absolute;
			bottom: 10rpx;
			right: 10rpx;
			padding: 0 20rpx;
			width: 160rpx;
			height: 60rpx;
			line-height: 60rpx;
			color: #ffffff;
			font-size: 24rpx;
			background: #89d251;
		}

		.add-btn-icon-style {
			width: 56rpx;
			height: 56rpx;
			border-radius: 50%;
		}
	}
}
</style>
