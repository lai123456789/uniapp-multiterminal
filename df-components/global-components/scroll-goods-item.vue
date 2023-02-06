<!--
	滑动商品展示组件
		引用此组件的页面有3个
			1. 菜场页面
			page="caichang"

			2. 首页的热销排行
			page="home-scroll"

			3. 商品详情的推荐商品
			page="goodsdetail"
 -->
<template>
	<view
		class="goods-scroll-item"
		@click="navigateToFn({ url: `/packageB/goods-detail/goods-detail?goods_id=${goodsId}` })"
	>
		<view class="image-wrap">
			<img-bg-css :src="goodsImage"></img-bg-css>
			<view class="icon-hot-wrap" v-if="isShowSalesSumBlock">
				<icon-hot-wrap :text="'已抢' + calcSalesSum + '件'"></icon-hot-wrap>
			</view>
		</view>
		<view class="tag-img-wrap" v-if="tagPath"><image :src="tagImgSrc" class="image-dom"></image></view>

		<view class="goods-name-block">
			<image v-if="isNew" class="icon-new" :src="calcImageSrc('/global-image/new-flag.png')"></image>
			<image v-if="isHot" class="icon-hot" :src="calcImageSrc('/global-image/icon-hot.png')"></image>
			{{ goodsName }}
		</view>
		<view class="goods-tag-block">
			<view class="goods-tag" v-if="trimFn(goodsTag)">{{ goodsTag }}</view>
		</view>
		<view class="price-block">
			<view class="price-icon">¥</view>
			<view class="price-text">{{ goodsPrice }}</view>
		</view>
		<view class="bottom-price-block">
			<vip-price v-if="isVipPrice">{{ vipPrice | filterTransNum }}</vip-price>
			<view class="price-line" v-else>¥{{ linePrice | filterTransNum }}</view>
		</view>

		<view class="right-bottom-add-cart-block" @click.stop="goodsAddToCartFn">
			<view
				v-if="selectedNum >= 1"
				class="goods-selected-num"
			>
				<uni-badge border size="small" :text="selectedNum" type="error"></uni-badge>
			</view>
			
			<uni-icons
				:color="configInfo.web_site_color"
				size="25"
				type="plus-filled"
			></uni-icons>
		</view>
	</view>
</template>

<script>
import iconHotWrap from '@/df-components/icon-hot-wrap/index.vue';
import { transNumFn } from '@/tools/tools.js';
import { bindMobileTips } from '@/tools/const.js';



// 需要更新购物车数量的页面
const getCartNumEnum = {
	caichang:false, // 菜场页面不更新
	['home-scroll']:true, // 首页的热销排行更新
	goodsdetail:true, // 商品详情更新
}



// 本组件外层必须 使用 样式 font-size: 0; 来把 组件与组件之间的间隙去掉
export default {
	name: 'scroll-doods-item',
	components: {
		iconHotWrap
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
		引用组件 的页面是  caichang  显示 已售 组件
		引用组件 的页面是  home-scroll 首页的热销排行 把页面标识传递 给 加入购物车按钮组件
		*/
		page: {
			type: String
		},
		// 商品已售的数量
		salesSum: {
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
		}
	},
	methods:{
		// 加入购物车
		async goodsAddToCartFn(){
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
					selectedNum:result.result
				});
				// 开始更新购物车列表
				getCartNumEnum[that.page] && that.setTabBarCartNumFn();
				
				console.log('getCartNumEnum',getCartNumEnum);
				console.log('that.page',that.page);
			} else {
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
			}
			return false; // 返回false用来阻止冒泡
		}
	},
	computed: {
		// 把 传进来的 售出 字段 转为数字
		calcSalesSum() {
			return transNumFn(this.salesSum);
		},
		// 引用组件 的页面是 caichang  并且 售出数量不是0  就显示 售出数量 组件
		isShowSalesSumBlock() {
			if (this.page == 'caichang' && this.calcSalesSum > 0) {
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
.goods-scroll-item {
	display: inline-block;
	position: relative;
	width: 200rpx;
	height: 396rpx;
	vertical-align: bottom;
	white-space: initial;

	.image-wrap {
		position: relative;
		padding: 10rpx;
		width: 200rpx;
		height: 200rpx;

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
		top: 10rpx;
		left: 10rpx;
		width: 60rpx;
		height: 60rpx;
		.image-dom {
			width: 100%;
			height: 100%;
		}
	}

	.goods-name-block {
		padding: 0 10rpx;
		height: 68rpx;
		font-size: 24rpx;
		font-weight: bold;
		color: #000000;
		text-overflow: ellipsis;
		/*设置溢出显示类型为...*/
		-webkit-line-clamp: 2;
		/*设置显示的行数*/
		overflow: hidden;
		/*隐藏多于行*/
		display: -webkit-box;
		/*将对象作为弹性伸缩盒子模型显示*/
		-webkit-box-orient: vertical;

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

	.goods-tag-block {
		display: flex;
		align-items: center;
		padding: 0 10rpx;
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
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}

	.price-block {
		display: flex;
		flex-wrap: nowrap;
		align-items: flex-end;
		padding: 0 10rpx;
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

	.bottom-price-block {
		padding: 0 10rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
	}

	.price-line {
		font-size: 24rpx;
		color: #91939c;
		text-decoration: line-through;
	}

	.right-bottom-add-cart-block {
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
		width: 50rpx;
		height: 50rpx;
		.goods-selected-num{
			display: inline-block;
			position: absolute;
			top: 0;
			left: 0;
			transform: scale(0.7) translateX(22rpx) translateY(-12rpx);

			/* #ifdef H5 || APP-PLUS */
			transform: scale(0.7) translateX(20rpx) translateY(-2rpx);
			/* #endif */
		}
	}
}
</style>
