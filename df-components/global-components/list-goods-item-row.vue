<!-- 
	列表商品项 独占一行排列 (商品列表页面使用)
-->
<template>
	<view
		class="list-goods-item-row"
		:class="[goodsAddCartStyle == shuanganniushuzi ? 'shuanganniushuzi' : '']"
		@click="navigateToFn({ url: `/packageB/goods-detail/goods-detail?goods_id=${goodsId}` })"
	>
		<view class="left-image-wraper">
			<view class="image-wrap">
				<img-bg-css :src="goodsImage"></img-bg-css>
				<view class="icon-hot-wrap" v-if="isShowSalesSumBlock">
					<icon-hot-wrap :text="'已抢' + calcSalesSum + '件'"></icon-hot-wrap>
				</view>
			</view>

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

			<!-- 无供应商  无删除购物车按钮 -->
			<no1-ngys-nremove-class
				v-if="!gongyingshang && goodsAddCartStyle == anniushuzi"
				:goodsPrice="goodsPrice"
				:isVipPrice="isVipPrice"
				:vipPrice="vipPrice"
				:linePrice="linePrice"
				:selectedNum="selectedNum"
				@addGoodstoCartFn="addGoodstoCartFn"
			></no1-ngys-nremove-class>
			<!-- 无供应商  有删除购物车按钮 -->
			<no2-ngys-yremove-class
				v-if="!gongyingshang && goodsAddCartStyle == shuanganniushuzi"
				:goodsPrice="goodsPrice"
				:isVipPrice="isVipPrice"
				:vipPrice="vipPrice"
				:linePrice="linePrice"
				:selectedNum="selectedNum"
				@addGoodstoCartFn="addGoodstoCartFn"
				@minusGoodstoCartFn="minusGoodstoCartFn"
			></no2-ngys-yremove-class>

			<!-- 有供应商  无删除购物车按钮 -->
			<no3-ygys-nremove-class
				v-if="gongyingshang && goodsAddCartStyle == anniushuzi"
				:goodsPrice="goodsPrice"
				:isVipPrice="isVipPrice"
				:vipPrice="vipPrice"
				:linePrice="linePrice"
				:selectedNum="selectedNum"
				:gysName="gysMdName"
				:gysMdId="gysMdId"
				@addGoodstoCartFn="addGoodstoCartFn"
				@toSellerFn="toSellerFn"
			></no3-ygys-nremove-class>

			<!-- 有供应商  有删除购物车按钮 -->
			<no4-ygys-yremove-class
				v-if="gongyingshang && goodsAddCartStyle == shuanganniushuzi"
				:goodsPrice="goodsPrice"
				:isVipPrice="isVipPrice"
				:vipPrice="vipPrice"
				:linePrice="linePrice"
				:selectedNum="selectedNum"
				:gysName="gysMdName"
				:gysMdId="gysMdId"
				@addGoodstoCartFn="addGoodstoCartFn"
				@minusGoodstoCartFn="minusGoodstoCartFn"
				@toSellerFn="toSellerFn"
			></no4-ygys-yremove-class>
		</view>
	</view>
</template>

<script>
import { bindMobileTips } from '@/tools/const.js';
import iconHotWrap from '@/df-components/icon-hot-wrap/index.vue';
import { transNumFn } from '@/tools/tools.js';

import no1NgysNremoveClass from '@/df-components/global-components/list-goods-item-bottom-style/no1-ngys-nremove-class.vue';
import no2NgysYremoveClass from '@/df-components/global-components/list-goods-item-bottom-style/no2-ngys-yremove-class.vue';
import no3YgysNremoveClass from '@/df-components/global-components/list-goods-item-bottom-style/no3-ygys-nremove-class.vue';
import no4YgysYremoveClass from '@/df-components/global-components/list-goods-item-bottom-style/no4-ygys-yremove-class.vue';

// 本组件外层必须 使用 样式 font-size: 0; 来把 组件与组件之间的间隙去掉
export default {
	name: 'list-goods-item-row',
	components: {
		iconHotWrap,
		no1NgysNremoveClass,
		no2NgysYremoveClass,
		no3YgysNremoveClass,
		no4YgysYremoveClass
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
		// 商品已售的数量
		salesSum: {
			type: [String, Number],
			default: 0
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
		// 供应商门店id
		gysMdId: {
			type: [Number],
			default: 0
		},
		// 供应商门店名字
		gysMdName: {
			type: String,
			default: ''
		},
		// 实付最后一个
		isLast: {
			type: Boolean
		},
		// 引用组件 的页面是 caichanglist 加上售出组件
		page: {
			type: String
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
		},
		// 进入到供应商门店
		toSellerFn() {
			let that = this;
			if (that.gysMdId <= 0) {
				return false;
			}
			that.navigateToFn({ url: `/packageA/gongyingshang-seller/gongyingshang-seller?gysMdId=${that.gysMdId}` });
		}
	},
	computed: {
		// 把 传进来的 售出 字段 转为数字
		calcSalesSum() {
			return transNumFn(this.salesSum);
		},
		// 引用组件 的页面是 caichanglist  并且 售出数量不是0  就显示 售出数量 组件
		isShowSalesSumBlock() {
			if (this.page == 'caichanglist' && this.calcSalesSum > 0) {
				return true;
			}
			return false;
		},
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

			.icon-hot-wrap {
				position: absolute;
				z-index: 10;
				bottom: 10rpx;
				left: 50%;
				transform: translateX(-50%);
			}
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
	}

	.right-bottom-add-cart-block {
		display: flex;
		justify-content: space-between;
		align-items: center;
		&.anniushuzi {
			width: 60rpx;
		}
		&.shuanganniushuzi {
			width: 160rpx;
		}
		&.selectedNum0 {
			justify-content: flex-end;
		}

		position: absolute;
		z-index: 10;
		right: 10rpx;
		bottom: 10rpx;
		width: 142rpx;
		height: 60rpx;
		background: #ffffff;
		.input-dom {
			display: flex;
			margin: 0 10rpx;
			text-align: center;
			font-size: 26rpx;
			color: $grey1-color;
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
	}
}
</style>
