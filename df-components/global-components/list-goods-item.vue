<!-- 
	列表商品项 两行排列
		使用到该组件的页面有三个
			首页底部商品
			搜索页面的猜你喜欢
			购物车页面底部猜你喜欢
-->
<template>
	<view
		class="list-goods-item"
		@click="navigateToFn({ url: `/packageB/goods-detail/goods-detail?goods_id=${goodsId}` })"
		:style="{ height: `${calcListGoodsItemHeight}rpx` }"
	>
		<view class="image-wrap"><img-bg-css :src="goodsImage"></img-bg-css></view>

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

		<!-- 普通商品页面 -->
		<no1-ngys-nremove
			v-if="!gongyingshang && goodsAddCartStyle == anniushuzi"
			:goodsPrice="goodsPrice"
			:isVipPrice="isVipPrice"
			:vipPrice="vipPrice"
			:linePrice="linePrice"
			:selectedNum="selectedNum"
			@addGoodstoCartFn="addGoodstoCartFn"
		></no1-ngys-nremove>

		<no2-ngys-yremove
			v-if="!gongyingshang && goodsAddCartStyle == shuanganniushuzi"
			:goodsPrice="goodsPrice"
			:isVipPrice="isVipPrice"
			:vipPrice="vipPrice"
			:linePrice="linePrice"
			:selectedNum="selectedNum"
			@addGoodstoCartFn="addGoodstoCartFn"
			@minusGoodstoCartFn="minusGoodstoCartFn"
		></no2-ngys-yremove>

		<no3-ygys-nremove
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
		></no3-ygys-nremove>

		<no4-ygys-yremove
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
		></no4-ygys-yremove>
	</view>
</template>

<script>
import { bindMobileTips } from '@/tools/const.js';

import no1NgysNremove from '@/df-components/global-components/list-goods-item-bottom-style/no1-ngys-nremove.vue';
import no2NgysYremove from '@/df-components/global-components/list-goods-item-bottom-style/no2-ngys-yremove.vue';
import no3YgysNremove from '@/df-components/global-components/list-goods-item-bottom-style/no3-ygys-nremove.vue';
import no4YgysYremove from '@/df-components/global-components/list-goods-item-bottom-style/no4-ygys-yremove.vue';
// 本组件外层必须 使用 样式 font-size: 0; 来把 组件与组件之间的间隙去掉
export default {
	components: {
		no1NgysNremove,
		no2NgysYremove,
		no3YgysNremove,
		no4YgysYremove
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
		/*
			引用组件 的页面是 gouwuche 加入购物车成功后刷新购物车列表
			引用组件 的页面是 home-bottom-goods-list 首页的底部商品列表 把页面标识传递 给 加入购物车按钮组件
		*/
		page: {
			type: String,
			default: ''
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
				that.changeCartSuccess();
			} else {
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
							uni.showLoading();
							let result = await that.delCartGoodsAtListFn(that.goodsId);
							console.log('that.delCartGoodsAtListFn result', result);
							that.hideAllFn();
							if (result.type == 'success') {
								uni.$emit('goodsAddCartEd', {
									goodsId: that.goodsId,
									selectedNum: 0
								});
								that.changeCartSuccess();
							} else {
								uni.showToast({
									icon: 'none',
									title: result.msg
								});
							}
						}
					}
				});
				return false;
			}

			that.hideAllFn();
			uni.showLoading();
			let result = await that.addShoppingCartFn(that.goodsId, -1);
			that.hideAllFn();
			if (result.type == 'success') {
				uni.$emit('goodsAddCartEd', {
					goodsId: that.goodsId,
					selectedNum: that.selectedNum - 1
				});
				that.changeCartSuccess();
			} else {
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
		},
		/* 
			增加或减去商品数量成功后执行的函数
				引用组件页面是购物车就刷新购物车数据
				引用组件页面是首页就更新购物车角标数
		*/
		changeCartSuccess() {
			let that = this;
			if (that.page == 'gouwuche') {
				that.$emit('emitGetCartListFn');
			} else if (that.page == 'home-bottom-goods-list') {
				that.setTabBarCartNumFn();
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
		},

		// 计算这个组件高度 根据 是否开启供应商 和 是否显示减购物车按钮 来返回
		calcListGoodsItemHeight() {
			let that = this;
			if (!that.gongyingshang && that.goodsAddCartStyle == that.anniushuzi) {
				return 556;
			}
			return 600;
		}
	}
};
</script>

<style lang="scss" scoped>
.list-goods-item {
	display: inline-block;
	position: relative;
	width: 342rpx;
	height: 598rpx;
	border-radius: 20rpx;
	background: #ffffff;
	font-size: 0;
	overflow: hidden;

	.image-wrap {
		position: relative;
		padding: 20rpx;
		width: 342rpx;
		height: 342rpx;
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
		&.selectedNum0 {
			justify-content: flex-end;
		}
		background: #ffffff;
		&.rob-page-class {
			width: 70rpx;
			height: 70rpx;
		}
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
		&.anniushuzi {
			width: 60rpx;
		}
		&.shuanganniushuzi {
			width: 160rpx;
		}
		height: 60rpx;

		.input-dom {
			display: flex;
			margin: 0 10rpx;
			text-align: center;
			font-size: 26rpx;
			color: $grey1-color;
		}
	}
}
</style>
