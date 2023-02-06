<!--
	展示地址 组件
		引用在 地址列表、下单时选地址
-->
<template>
	<view class="address-wrap" @click="addressInfoClick">
		<view class="address-content content-wrap">
			<view class="active-block flex-center" v-if="isShowActive">
				<icon v-if="act" type="success" size="18" :color="configInfo.web_site_color"></icon>
				<view v-else class="circle-icon"></view>
			</view>
			<view class="address-info-block" :class="[isShowActive ? 'showActive' : '']">
				<view class="address-text text-ellipsis-rows">
					<view v-if="info.status" :class="['tag-block', 'defaultStyle']">默认</view>
					<view :class="['tag-block', info.tagStyle]">{{ info.tag }}</view>
					{{ info.address }}
				</view>
				<view class="user-info-block">
					<view class="user-name text-ellipsis">{{ info.name }}</view>
					<view class="user-tel text-ellipsis">{{ info.mobile }}</view>
				</view>
			</view>
			<view
				v-if="isShowEdit"
				class="edit-icon-block flex-center"
				@click.stop="navigateToFn({ url: `/packageA/address/edit?id=${info.id}` })"
			>
				<view class="iconfont icon-daochu1024-30" style="font-size: 40rpx; color: #432407"></view>
			</view>
			<view class="after" v-if="index"></view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['index', 'info', 'page', 'act'],
	/* 
		page
			packageA/address/index 收货地址列表
			packageA/address/cart-select 提交订单时展示的地址
			packageA/address/home-select 首页选地址
	*/
	methods: {
		addressInfoClick() {
			this.$emit('addressInfoClick', this.index);
		}
	},
	computed: {
		// 是否显示 选中状态
		isShowActive() {
			let enumObj = {
				'packageA/address/index': false,
				'packageA/address/cart-select': true,
				'packageA/address/home-select': false
			}
			return enumObj[this.page]
		},
		// 是否显示编辑按钮
		isShowEdit(){
			let enumObj = {
				'packageA/address/index': true,
				'packageA/address/cart-select': true,
				'packageA/address/home-select': false
			}
			return enumObj[this.page]
		}
	}
};
</script>

<style lang="scss" scoped>
.circle-icon{
	width: 36rpx;
	height: 36rpx;
	border: 1px solid #c9c9c9;
	border-radius: 50%;
}
.address-wrap {
	background: #ffffff;
	position: relative;
	
	.active-block{
		width: 60rpx;
	}

	.address-content {
		padding-top: 24rpx;
		padding-bottom: 24rpx;
		display: flex;
		
		.address-info-block {
			flex: 1;
			display: flex;
			flex-direction: column;
			.address-text {
				width: 100%;
				height: 76rpx;
				font-size: 28rpx;
				color: #374050;
				.tag-block {
					display: inline-block;
					margin-right: 12rpx;
					vertical-align: middle;
				}
			}
			.user-info-block {
				display: flex;
				align-items: center;
				width: 100%;
				height: 36rpx;
				font-size: 26rpx;
				color: #91939c;
				.user-name {
					margin-right: 12rpx;
					max-width: 275rpx;
				}
				.user-tel {
					max-width: 275rpx;
				}
			}
		}

		.edit-icon-block {
			width: 80rpx;
		}
		
		.after {
			display: inline-block;
			position: absolute;
			left: 50%;
			top: -2rpx;
			transform: translateX(-50%);
			height: 1px;
			width: 702rpx;
			background: $bg-grey-color;
		}
	}
}
</style>
