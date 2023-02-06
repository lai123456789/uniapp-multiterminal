<template>
	<view class="add-cart-block">
		<view class="content-wrap">
			<view class="icon-list">
				<view class="icon-item" @click="navigateToFn({ url: '/pages/index/index', isTab: true })">
					<image class="item-img" :src="calcImageSrc('/global-image/goods_info_home-icon.png')"></image>
					<view class="item-text">首页</view>
				</view>


				<!-- #ifdef MP-WEIXIN -->
				<button open-type="contact" class="clear-btn-style icon-item" :send-message-title="goodsName" :send-message-img="goodsImage" :send-message-path="pagePath" bindcontact='contact' show-message-card>
					<image class="item-img" :src="calcImageSrc('/global-image/goods_info_new-icon.png')"></image>
					<view class="item-text">客服</view>
				</button>
				<!-- #endif -->
				
				
				<!-- #ifdef APP-PLUS -->
				<button class="clear-btn-style icon-item" @click="appToMiniprogramFn(false)">
					<image class="item-img" :src="calcImageSrc('/global-image/goods_info_new-icon.png')"></image>
					<view class="item-text">客服</view>
				</button>
				<!-- #endif -->
				
				
				<!-- #ifdef MP-TOUTIAO -->
				<button class="clear-btn-style icon-item" @click="appToMiniprogramFn(false)" v-if="configInfo.service_url">
					<image class="item-img" :src="calcImageSrc('/global-image/goods_info_new-icon.png')"></image>
					<view class="item-text">客服</view>
				</button>
				<!-- #endif -->
				
				
				

				<!-- #ifdef H5 -->
				<button class="clear-btn-style icon-item" @click="h5ToMiniprogramFn">
					<image class="item-img" :src="calcImageSrc('/global-image/goods_info_new-icon.png')"></image>
					<view class="item-text">客服</view>
				</button>
				<!-- #endif -->

				<view class="icon-item" @click="navigateToFn({ url: '/pages/cart/cart', isTab: true })">
					<view class="uni-badge-icon">
						<uni-badge :text="cardNumber" size="small" type="error"></uni-badge>
					</view>
					<image class="item-img" :src="calcImageSrc('/global-image/goods_info_cart-icon.png')"></image>
					<view class="item-text">购物车</view>
				</view>
			</view>
			<view
				:class="['btn-block', isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				@click="$onceClick(addFn)"
				:style="{ background: configInfo.web_site_color }"
			>
				{{ text ? text : '加入购物车' }}
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { getMiaoshaTimeOption } from '@/pages/index/index-components/miaosha-tool.js';

import { assertObject, assertString } from '@/tools/tools.js';

import { bindMobileTips } from '@/tools/const.js';



export default {
	props: {
		// 商品id
		goodsId: {
			type: [Number, String]
		},
		// 按钮上 展示的 文字
		text: {
			type: String
		},
		// 该商品添加到购物车里的数量
		selectedNum: {
			type: [Number, String]
		},
		// 是否是多规格商品
		isSpec: {
			type: Boolean
		},
		// 使用组件的页面 default 默认普通商品;   seckill 秒杀商品页面
		page: {
			type: String,
			default: 'default'
		},
		
		// 小程序客服对话框预览图
		goodsImage: {
			type: String,
			default: ''
		},
		// 小程序客服对话框预览图点击的路径
		pagePath: {
			type: String,
			default: ''
		},
		// 小程序客服对话框预览图的商品名字
		goodsName: {
			type: String,
			default: ''
		},
		cardNumber:{
			type: Number,
			default: 0
		}
	},
	computed: {
		// 返回秒杀的倒计时
		...mapState({
			miaoshaOptions: store => store.home.miaoshaOptions //  秒杀模块的 样式配置
		})
	},

	methods: {
		// 加入到购物车
		async addFn() {
			let that = this;
			if (!that.isLogin) {
				// 未登录就提示登录
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
			if (that.page == 'seckill') {
				let miaoshaStartTime = assertString(assertObject(that.miaoshaOptions).miaoshaStartTime);
				let miaoshaEndTime = assertString(assertObject(that.miaoshaOptions).miaoshaEndTime);

				let { tipTitle } = getMiaoshaTimeOption(miaoshaStartTime, miaoshaEndTime);
				if (tipTitle == '距离开始') {
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: '请在秒杀时间内购买商品',
						success(e) {}
					});
					return false;
				}
			}

			console.log('that.isSpec', that.isSpec);
			if (that.isSpec) {
				uni.$emit('popSpecBlock', {
					goodsId: that.goodsId,
					page: 'goods-detail-bottom-add-cart-block'
				});
				return false;
			}
			uni.hideLoading();
			uni.showToast({
				icon: 'none',
				title: '加入购物车成功'
			});
			let selectedNum = that.selectedNum;

			that.changeView(selectedNum + 1); // 添加购物车后 的数量
			let result = await that.addShoppingCartFn(that.goodsId, 1);
			if (result.type != 'success') {
				uni.hideLoading();
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
				that.changeView(selectedNum, cartNum);
				return false;
			}
			console.log('that.addShoppingCartFn(that.goodsId, 1)', result);
			that.$emit('changeGoodsInfoFn', result.result);
			that.setTabBarCartNumFn();
		},
		// 改变视图
		changeView(selectedNum, cartNum) {
			let that = this;
			uni.$emit('goodsAddCartEd', {
				goodsId: that.goodsId,
				selectedNum
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.add-cart-block {
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 300;
	padding: 4rpx 0;
	width: 750rpx;
	height: 96rpx;
	background-color: #ffffff;

	.content-wrap {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icon-list {
			flex: 2;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.icon-item {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;

				.item-img {
					width: 36rpx;
					height: 36rpx;
				}

				.item-text {
					color: #6b6b6b;
					font-size: 20rpx;
					line-height: 1.8em;
				}

				.uni-badge-icon {
					position: absolute;
					z-index: 5;
					right: 0;
					top: 0;
					transform: translateX(30%) translateY(-30%) scale(0.9);
				}
			}
		}
		.btn-block {
			flex: 3;
			border-radius: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 528rpx;
			height: 100%;
			color: #ffffff;
			font-size: 30rpx;
		}
	}
}
</style>
