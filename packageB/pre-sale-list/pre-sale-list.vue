<template>
	<view
		class="page"
		:style="{
			background: listBgColor ? `linear-gradient(180deg, ${listBgColor},#f5f5f5)` : '#f5f5f5'
		}"
	>
		<view class="goods-list-page-banner-wrap" v-if="bannerImage">
			<image class="image-dom" :src="bannerImage" mode="widthFix"></image>
		</view>
		<loading-css :is-show="isShowLoading"></loading-css>

		<null-block min-height="100vh" v-if="goodsList.length == 0"></null-block>

		<view class="list-block">
			<view
				v-for="(item, index) in goodsList"
				:key="index"
				class="list-goods-item-row"
				@click="navigateToFn({ url: `/packageB/goods-detail/pre-sale-detail?goods_id=${item.goodsId}` })"
			>
				<view class="left-image-wraper">
					<view class="image-wrap"><img-bg-css :src="item.goodsImage"></img-bg-css></view>
					<view class="tag-img-wrap" v-if="item.tagImg">
						<image :src="item.tagImg" class="image-dom"></image>
					</view>
				</view>

				<view class="right-description-wrap">
					<view class="goods-name-block">
						<image
							v-if="item.isNew"
							class="icon-new"
							:src="calcImageSrc('/global-image/new-flag.png')"
						></image>
						<image
							v-if="item.isHot"
							class="icon-hot"
							:src="calcImageSrc('/global-image/icon-hot.png')"
						></image>
						{{ item.goodsName }}
					</view>
					<view class="goods-description">
						<view class="goods-description-text">{{ item.goodsDescription }}</view>
					</view>
					<view class="goods-tag-block">
						<view class="goods-tag" v-if="trimFn(item.goodsTag)">{{ item.goodsTag }}</view>
					</view>
					<view class="bottom-price-block">
						<view class="price-block">
							<view class="price-icon">¥</view>
							<view class="price-text">{{ item.dingjin | filterTransNum }}</view>
						</view>

						<view class="price-right-block" v-if="item.lijian > 0">
							<view class="price-line">付定金立减 ¥{{ item.lijian }}</view>
						</view>

						<view
							class="flex-center border-radius to-detail-btn"
							:style="{ background: configInfo.web_site_color }"
						>
							立即预定
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="uni-load-more" v-if="goodsList.length > 6">
			<uni-load-more :status="loadMoreStatus"></uni-load-more>
		</view>

		<fixed-cart-icon :scroll-is-stop="mixinScrollIsStop" :cardNumber="cardNumber"></fixed-cart-icon>
	</view>
</template>
<script>
// 工具库 相关
import { assertObject, assertArray, transNumFn } from '@/tools/tools';

export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画
			loadMoreStatus: 'more', // 底部商品列表 下拉状态
			page: 1, // 当前页面索引
			goodsList: [], // 商品数据
			bannerImage: '', // 列表顶部的图片
			listBgColor: '', // 列表背景过度颜色

			preSalePageTiele: '', // 预售列表页面标题
			cardNumber: 0 // 购物车数量
		};
	},
	onShow() {
		let that = this;
		that.isShowLoading = true;

		// 监听购物车数量改变
		uni.$off('setCardNumberFn');
		uni.$on('setCardNumberFn', cardNumber => {
			that.cardNumber = cardNumber;
		});
		that.setTabBarCartNumFn();

		that.page = 1;
		that.getMoreGoodsFn(() => {
			that.goodsList = [];
		});
	},
	methods: {
		async getMoreGoodsFn(fn, isShowLoading) {
			let that = this;
			let result = await that.$request({
				loading: !!isShowLoading,
				url: '/api/Goodspre/presale_goods_list',
				data: {
					page: that.page
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					let bannerImage = that.addimgPathHostFn(resultObj.presale_list_top_image); // 列表顶部的图片
					let listBgColor = resultObj.presale_list_color; // 列表顶部的图片
					let preSalePageTiele = resultObj.goods_presale_title; // 预售列表页面标题

					if (that.bannerImage != bannerImage) {
						that.bannerImage = bannerImage;
					}

					if (that.listBgColor != listBgColor) {
						that.listBgColor = listBgColor;
					}

					if (that.preSalePageTiele != preSalePageTiele) {
						that.preSalePageTiele = preSalePageTiele;
						uni.setNavigationBarTitle({ title: that.preSalePageTiele });
					}

					let list = assertArray(resultObj.list).map(item => {
						return {
							goodsId: item.goods_id, // 商品id
							goodsImage: item.image, // 商品图片
							isHot: item.is_hot == 1, // 是否热销爆款
							isNew: item.is_new == 1, // 是否新品
							goodsName: item.goods_name, // 商品名字
							goodsDescription: item.goods_remark, // 商品描述

							zongjia: transNumFn(item.total_presale_price), // 预售总价
							dingjin: transNumFn(item.deposit), // 定金
							lijian: transNumFn(item.reduce_money), // 立减金额

							goodsTag: item.activity, // 商品标签
							tagImg: that.addimgPathHostFn(item.top_left_tag_img) // 商品左上的图片标签
						};
					});

					if (list.length < 1) {
						that.page--;
						if (that.page <= 1) {
							that.page = 1;
						}
					}
					fn && fn(list);
					that.goodsList = that.goodsList.concat(list);
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
			that.isShowLoading = false;
		}
	},

	onReachBottom() {
		let that = this;
		that.page++;
		that.loadMoreStatus = 'loading';
		that.getMoreGoodsFn(list => {
			if (list.length > 0) {
				that.loadMoreStatus = 'more';
			} else {
				that.loadMoreStatus = 'noMore';
			}
		});
	},
	onPullDownRefresh() {
		let that = this;
		that.loadMoreStatus = 'more';
		that.page = 1;
		that.getMoreGoodsFn(() => {
			that.goodsList = [];
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		});
	}
};
</script>
<style lang="scss" scoped>
.page,
page {
	min-height: 100vh;
	overflow: hidden;
	background: $bg-grey-color;
}

.goods-list-page-banner-wrap {
	width: 750rpx;
	font-size: 0;
	.image-dom {
		width: 100%;
	}
}
.list-block {
	margin: 20rpx 20rpx 10rpx;
	.list-goods-item-row {
		margin-bottom: 20rpx;
		background: #ffffff;
		border-radius: 20rpx;
	}
}

.list-goods-item-row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 10rpx 0;
	// border-bottom: 1px solid #f5f5f5;
	font-size: 0;
	&:last-child {
		border-bottom: none;
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

		.goods-description {
			display: flex;
			align-items: center;
			width: 100%;
			height: 36rpx;

			.goods-description-text {
				width: 100%;
				font-size: 22rpx;
				color: #91939c;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
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
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}

		.bottom-price-block {
			display: flex;
			align-items: center;
			height: 42rpx;
			position: relative;

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

			.price-right-block {
				padding-left: 4rpx;

				.price-line {
					font-size: 24rpx;
					color: #91939c;
				}
			}
			.to-detail-btn {
				position: absolute;
				right: 20rpx;
				bottom: 10rpx;
				width: 160rpx;
				height: 60rpx;
				color: #ffffff;
				font-size: 24rpx;
			}
		}
	}
}
</style>
