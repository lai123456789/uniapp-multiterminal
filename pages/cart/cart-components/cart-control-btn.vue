<!--
	购物车页面的添加删除按钮
	
	<cart-control-btn btn-type="plus" :is-disable="false"></cart-control-btn>
	<cart-control-btn btn-type="plus" :is-disable="true"></cart-control-btn>
	
	<cart-control-btn btn-type="minus" :is-disable="false"></cart-control-btn>
	<cart-control-btn btn-type="minus" :is-disable="true"></cart-control-btn>
	
-->
<template>
	<view class="cart-control-btn flex-center">
		<view
			class="icon-wrap border-radius flex-center"
			:style="{ 'border-color': isDisable ? disableColor : defaultColor }"
		>
			<view
				:class="['iconfont', btnType == 'plus' ? 'icon-jia' : 'icon-jianshao']"
				:style="{ color: isDisable ? disableColor : defaultColor, 'font-size': '28rpx' }"
			></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		/*
			按钮类型
				plus +
				minus -
		*/
		btnType: {
			type: String,
			default: 'plus'
		},
		// 是否不能点击  true置灰不能点;     false正常颜色可以点;
		isDisable: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			// 浅灰色
			disableColor: '#dddddd',

			// 深灰色
			defaultColor: '#3d3d3d'
		};
	},
};
</script>

<style scoped lang="scss">
.cart-control-btn {
	width: 54rpx;
	height: 54rpx;
	.icon-wrap {
		width: 46rpx;
		height: 46rpx;
		border: 1px solid;
	}
}
</style>
