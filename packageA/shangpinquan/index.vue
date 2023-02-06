<template>
	<view class="page">
		<!-- 
		<view class="inp-block">
			<view class="content-wrap">
				<input class="inp border-radius" type="text" placeholder="请输入兑换码" />
				<text class="text">兑换</text>
			</view>
		</view>
		 -->
		<view class="card-list-block" v-if="list.length > 0">
			<view class="content-wrap">
				<block v-for="(item, index) in list" :key="index">
					<view
						class="item border-radius20"
						@click="navigateToFn({ url: `/packageB/goods-detail/goods-detail?goods_id=${item.goods_id}` })"
					>
						<view class="goods-top-block">
							<view class="goods-image-block">
								<view class="flex-center not-use" v-if="!item.is_on_sale">已下架</view>
								<image :src="item.image"></image>
							</view>
							<view class="goods-description">
								<view class="goods-name">{{ item.title }}</view>
								<view class="price-wrap">
									<view class="shop-price-block-lr">
										<view class="origin-price">
											<text style="font-size: 30rpx;">¥{{ item.money }}</text>
										</view>
									</view>

									<view
										v-if="item.is_on_sale"
										class="right-btn-class border-radius use-btn"
										@click.stop="useFn(item)"
										:style="{ background: configInfo.web_site_color }"
									>
										立即使用
									</view>
									<view
										v-else
										class="right-btn-class border-radius del-btn"
										@click.stop="delGoodsCoupon(item.id, index)"
									>
										删除
									</view>
								</view>
							</view>
						</view>
						<view class="goods-bottom-block">
							<view class="card-name"><!-- {{ item.name }} --></view>
							<view class="time-block"><!-- 有效期: 2020.05.01-2020.07.01 --></view>
						</view>
					</view>
				</block>
			</view>
		</view>

		<view class="uni-load-more">
			<uni-load-more v-if="list.length > 8" :status="loadMoreStatus"></uni-load-more>
		</view>

		<null-block v-if="list.length < 1" min-height="100vh" is-show-to-page-btn></null-block>
		<loading-css :is-show="isShowLoading"></loading-css>



		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn" is-show-exit></login-fn>

	</view>
</template>

<script>
// 工具库 相关
import { assertObject, assertArray } from '@/tools/tools';
import { bindMobileTips } from '@/tools/const.js';

export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画
			list: [], // 商品券数据
			page: 1, // 分页索引
			loadMoreStatus: 'more', // 底部商品列表 下拉状态
			loginBoxFlag:false, // 登录框显示隐藏状态

		};
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
		
		that.isShowLoading = true;
		that.list = [];
		that.getGoodsCardFn();
	},
	methods: {
		// 登录后刷新
		refreshFn() {
			let that = this;
			that.page = 1;
			that.getGoodsCardFn(() => {
				that.list = [];
			});
		},
		// 获取商品券列表
		async getGoodsCardFn(fn) {
			let that = this;
			let result = await that.$request({
				method: 'post',
				url: '/api/User/GoodsCard',
				data: {
					page: that.page
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					let list = assertArray(resultObj.list);

					if (list.length < 1) {
						that.page--;
						if (that.page <= 1) {
							that.page = 1;
						}
					}
					fn && fn(list);
					that.list = that.list.concat(list);
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
		},
		// 使用优惠券
		async useFn(item) {
			let that = this;
			
			
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
			
			uni.showLoading();
			// 商品加入购物车 并跳转
			let goodsId = item.goods_id;
			let specId = item.spec_id;
			let result = await that.addShoppingCartFn(goodsId, 1, specId);
			uni.hideLoading();
			if (result.type == 'success') {
				that.navigateToFn({
					isTab: true,
					url: `/pages/cart/cart`
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
			}
		},
		delGoodsCoupon(id) {
			let that = this;
			uni.showModal({
				title: '删除商品券',
				async success(e) {
					if (e.confirm) {
						// 确认后的回调
						let result = await that.$request({
							method: 'post',
							url: '/api/User/GoodsCardDel',
							data: {
								id
							}
						});
						if (result.statusCode == 200) {
							uni.showToast({
								icon: 'none',
								title: result.data.msg
							});
							that.refreshFn();
						} else {
							uni.showToast({
								icon: 'none',
								title: that.$errorMsg
							});
						}
					}
				}
			});
		}
	},
	// 下拉刷新触发的函数
	onPullDownRefresh() {
		let that = this;
		that.page = 1;
		that.getGoodsCardFn(() => {
			that.list = [];
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		});
	},
	onReachBottom() {
		let that = this;
		that.page++;
		that.loadMoreStatus = 'loading';
		that.getGoodsCardFn(list => {
			if (list.length > 0) {
				that.loadMoreStatus = 'more';
			} else {
				that.loadMoreStatus = 'noMore';
			}
		});
	}
};
</script>

<style lang="scss" scoped>
.page,
page {
	background: $bg-grey-color;
	min-height: 100vh;
	overflow: hidden;
}

.uni-load-more {
	padding: 10rpx 0;
}

.inp-block {
	background: #ffffff;

	.content-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 88rpx;

		.inp {
			width: 630rpx;
			height: 58rpx;
			font-size: 23rpx;
			color: $grey1-color;
			background: $bg-grey-color;

			padding-left: 1em;
			padding-right: 1em;
			box-sizing: border-box;
		}

		.text {
			@include flex-center;
			flex: 1;
			font-size: 26rpx;
			color: $grey1-color;
		}
	}
}

.card-list-block {
	.item {
		margin-top: 20rpx;
		position: relative;
		width: 702rpx;
		// height: 261rpx;
		height: 200rpx;
		background: #ffffff;
		overflow: hidden;
		box-shadow: 0 3rpx 3rpx #f0f1f3;

		&::before,
		&::after {
			content: '';
			display: block;
			position: absolute;
			top: 50%;
			width: 40rpx;
			height: 40rpx;
			background: $bg-grey-color;
			border-radius: 50%;
		}

		&::before {
			left: 0;
			transform: translate3d(-50%, -50%, 0);
		}

		&::after {
			right: 0;
			transform: translate3d(50%, -50%, 0);
		}

		.goods-top-block {
			display: flex;
			margin-top: 35rpx;
			margin-left: 20rpx;

			.goods-image-block {
				position: relative;
				margin-left: 10rpx;
				width: 130rpx;
				height: 130rpx;
				.not-use {
					position: absolute;
					z-index: 5;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					color: #ffffff;
					background: rgba(0, 0, 0, 0.4);
					font-size: 26rpx;
					border-radius: 20rpx;
					overflow: hidden;
				}
				image {
					overflow: hidden;
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
			}

			.goods-description {
				display: flex;
				width: 510rpx;
				flex-direction: column;
				border-bottom: 1px dashed #efefef;
				margin-left: 1em;
				margin-right: 1em;

				.goods-name {
					font-size: 28rpx;
					line-height: 55rpx;
					font-weight: 600;
					color: $grey1-color;
					max-width: 15em;
					@include text-ellipsis;
				}

				.price-wrap {
					display: flex;
					justify-content: space-between;
					@include shop-price-block-lr;

					.right-btn-class {
						@include flex-center;
						width: 140rpx;
						height: 56rpx;
						font-size: 25rpx;
						color: #ffffff;
						transform: scale(0.91);

						&.use-btn {
						}
						&.del-btn {
							background: $red-color;
						}
					}
				}
			}
		}

		.goods-bottom-block {
			margin-top: 20rpx;
			margin-left: 20rpx;
			font-size: 20rpx;
			color: $grey2-color;

			.card-name {
				line-height: 45rpx;
			}

			.time-block {
			}
		}
	}
}
</style>
