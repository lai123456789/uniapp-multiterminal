<!-- 
	展示用户地址组件
-->
<template>
	<view class="address-wrap" v-if="isShowAddress">
		<view class="content-wrap">
			<view class="address border-radius20" @click="addressWrapClickFn">
				<image class="gb-image" :src="calcImageSrc('/cart/bottom-green-line.png')"></image>
				<view class="address-content">
					<view class="address-icon">
						<image :src="calcImageSrc('/cart/dad8562db8b24ad0471d20e3872007b_03.png')"></image>
					</view>
					<view class="address-cont" v-if="addressIsSet">
						<view class="user-addres">
							<view class="address-text">
								<view class="tag-block orangeStyle">{{ addressTagName }}</view>
								{{ addressText }}
							</view>
							
						</view>
						<view class="user-info">
							<view class="name text-ellipsis">{{ addressUserName }}</view>
							<view class="tel text-ellipsis">{{ addressUserTel }}</view>
						</view>
					</view>
					<view v-else class="address-cont"><text class="add-address-btn">新增地址</text></view>
					<view :class="['icon-block', isDingdanStatePage ? 'visibility-hidden' : '']">
						<uni-icons size="20" color="#432407" type="arrowright"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		// 是否显示地址组件
		isShowAddress: {
			type: Boolean,
			default: false
		},
		// 是否有设置过地址
		addressIsSet: {
			type: Boolean,
			default: false
		},
		// 地址id
		addressId: {
			required:false
		},
		// 收货人名字
		addressUserName: {
			type: String,
			default: ''
		},
		// 收货人电话
		addressUserTel: {
			type: String,
			default: ''
		},
		// 收货人地址描述
		addressText: {
			type: String,
			default: ''
		},
		// 地址标签
		addressTagName: {
			type: String,
			default: ''
		},
		// 引用组件的页面
		page: {
			type: String,
			default: ''
		}
	},
	methods: {
		// 展示地址的组件被点击后
		addressWrapClickFn() {
			let that = this;
			if (that.isDingdanStatePage) {
				return false;
			}
			that.navigateToFn({ url: `/packageA/address/cart-select?isSet=${that.addressIsSet}&id=${that.addressId}` });
		}
	},
	computed: {
		// 引用组件的页面是否订单展示页面
		isDingdanStatePage() {
			return this.page == 'dingdan-state';
		}
	}
};
</script>

<style lang="scss" scoped>
.address-wrap {
	padding: 10rpx 0;
	overflow: hidden;

	.address {
		position: relative;
		overflow: hidden;
		padding-top: 26rpx;
		padding-bottom: 26rpx;
		background: #ffffff;

		.gb-image {
			position: absolute;
			bottom: 0;
			width: 702rpx;
			height: 20rpx;
		}

		.address-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			width: 100%;
			// height: 120rpx;

			.address-icon {
				margin-right: 20rpx;
				font-size: 0;

				image {
					width: 38rpx;
					height: 46rpx;
				}
			}

			.address-cont {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.user-addres {
					display: inline-flex;
					align-items: center;
					justify-content: space-between;
					font-size: 0;
					.address-text{
						display: inline-block;
						font-size: 26rpx;
						color: $grey1-color;
						/*
						margin-right: 0.2em;
						@include text-ellipsis-rows;
						max-width: 18em;
						*/
						line-height: 1.4em;
					}
					.tag-block{
						margin-right: 12rpx;
						white-space: nowrap;
					}
				}

				.user-info {
					margin-top: 4rpx;
					display: flex;
					color: $grey2-color;
					font-size: 26rpx;

					.name {
						margin-right: 12rpx;
						max-width: 276rpx;
					}
					.tel{
						max-width: 276rpx;
					}
					
				}
				
			}

			.icon-block {
				&.visibility-hidden {
					visibility: hidden;
				}
			}
			.add-address-btn {
				color: $grey1-color;
				font-weight: 600;
			}
		}
	}
}
</style>
