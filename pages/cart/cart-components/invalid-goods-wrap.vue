<!--
	购物车页面底部的失效商品组件
-->
<template>
	<view class="invalid-goods-block content-wrap">
		<view class="invalid-goods-content">
			<view class="invalid-goods-title-block content-wrap">
				<view class="invalid-msg text-ellipsis">{{ loseGoodsTitle }}</view>
				<view class="clear-btn" @click="clearInvalidGoodsFn">
					<view class="btn-text">清空</view>
					<view class="clear-icon flex-center">
						<uni-icons type="trash" size="12" color="#88898d"></uni-icons>
					</view>
				</view>
			</view>
			<view class="invalid-goods-list">
				<block v-for="(item,index) in loseGoodsList" :key="index">
					<invalid-goods-item
						:isLast="index == loseGoodsList.length-1"
						:goodsImage="item.goodsImage"
						:goodsName="item.goodsName"
						:loseReasonText="item.loseReasonText"
						:loseGoodsText="loseGoodsText"
						:topLeftTagImage="item.topLeftTagImage"
						:goodsPrice="item.goodsPrice"
						:vipStylePrice="item.vipStylePrice"
					></invalid-goods-item>
				</block>
			</view>
		</view>
	</view>
</template>
<script>
import invalidGoodsItem from '@/pages/cart/cart-components/invalid-goods-item.vue';

export default {
	components: { invalidGoodsItem },
	props: {
		loseGoodsList:{
			type:Array,
			default(){
				return []
			}
		},
		loseGoodsTitle:{
			type:String,
			default:''
		},
		loseGoodsText:{
			type:String,
			default:''
		},
	},
	methods:{
		// 清空失效商品
		async clearInvalidGoodsFn(){
			let that = this;
			let cartIdList = that.loseGoodsList.map(i=>i.cartId).join(',');
			
			
			let result = await that.$request({
				loading: true,
				method: 'post',
				url: '/api/Cart/cartDel',
				data:{
					cart_id:cartIdList,
					is_lose:1,
				}
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					that.$emit('clearInvalidGoodsFn');
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					})
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				})
			}
			
			/* 
			uni.showModal({
				title: '您确定清空失效商品吗？',
				async success({ confirm }) {
					if (confirm) {
						
						
						
					}
				}
			})
			
			*/

			
		}
	}
};
</script>

<style scoped lang="scss">
.invalid-goods-block {
	margin-top: 20rpx;
	.invalid-goods-content {
		background: #ffffff;
		border-radius: 30rpx;
		.invalid-goods-title-block {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			.invalid-msg {
				width: 584rpx;
				color: #1e1e1e;
				font-size: 26rpx;
			}
			.clear-btn {
				display: inline-flex;
				align-items: center;
				width: 70rpx;
				height: 100%;
				.btn-text {
					width: 56rpx;
					color: #88898d;
					font-size: 22rpx;
				}
				.clear-icon {
					height: 28rpx;
					font-size: 0;
				}
			}
		}
		.invalid-goods-list {
		}
	}
}
</style>
