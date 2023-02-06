<!-- 
列表商品项 滑动商品使用
 -->
<template>
	<view class="goods-scroll-item" @click="showGoodsItemClickFn">
		<view class="image-wrap"><img-bg-css :src="goodsImage"></img-bg-css></view>
		<view class="tag-img-wrap"><image :src="tagImgSrc" class="image-dom"></image></view>
		<view class="goods-name-block text-ellipsis-rows">{{ goodsName }}</view>
		<view class="goods-tag-block">
			<view class="goods-tag" v-if="trimFn(goodsTag)">{{ goodsTag }}</view>
		</view>
		<view class="price-block">
			<view class="price-icon">¥</view>
			<view class="price-text">{{ goodsPrice }}</view>
		</view>
		<view class="bottom-price-block">
			<view class="price-line">¥{{ linePrice | filterTransNum }}</view>
		</view>
		<view class="right-bottom-add-cart-block flex-center">
			<image class="flag-btn" v-if="isSelect" :src="calcImageSrc('/eat/remobtn.png')"></image>
			<image class="flag-btn" v-else :src="calcImageSrc('/global-image/addbtn.png')"></image>
		</view>
	</view>
</template>

<script>
// 本组件外层必须 使用 样式 font-size: 0; 来把 组件与组件之间的间隙去掉
export default {
	props: {
		// 索引
		ind: {
			type: Number
		},
		// 商品图片
		goodsImage: {
			type: String,
			default: ''
		},
		// 是否热销爆款
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
		// 商品价格
		goodsPrice: {
			type: [String, Number],
			default: 0
		},
		// 划线价
		linePrice: {
			type: [String, Number],
			default: 0
		},

		// 是否选中状态
		isSelect: {
			type: Boolean
		}
	},
	methods: {
		showGoodsItemClickFn() {
			this.$emit('showGoodsItemClickFn', this.ind);
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

	.right-bottom-add-cart-block {
		position: absolute;
		right: 10rpx;
		bottom: 10rpx;
		width: 50rpx;
		height: 50rpx;
		.flag-btn {
			width: 40rpx;
			height: 40rpx;
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
}
</style>
