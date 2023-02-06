<template>
	<view class="weui-tabbar" :style="{ bottom: isiPhoneX ? '30rpx' : '0' }">
		<view
			v-for="(item, index) in list"
			@click="tabChange(index)"
			:key="item.pagePath"
			class="weui-tabbar__item"
			:class="{ 'weui-bar__item_on': index === tabCurrent }"
		>
			<view style="position: relative;display:inline-block;">
				<view class="uni-badge" v-if="item.type == 'card' && cardNumber > 0">
					<uni-badge :text="cardNumber" type="error" size="small"></uni-badge>
				</view>
				<image
					:src="tabCurrent === index ? item.selectedIconPath : item.iconPath"
					class="weui-tabbar__icon"
				></image>
			</view>
			<view
				class="weui-tabbar__label"
				:style="{ color: index == tabCurrent ? configInfo.web_site_color : '#374050' }"
			>
				{{ item.text }}
			</view>
		</view>
		<view
			v-if="isiPhoneX"
			:style="{ width: '100%', position: 'absolute', height: '30rpx', bottom: '-30rpx', background: '#ffffff' }"
		></view>
	</view>
</template>
<script>
import { mapState } from 'vuex';
export default {
	props: {
		// 
		tabCurrent: {
			type: Number,
			default: 0
		},
		// 购物车数量
		cardNumber: {
			type: Number,
			default: 0
		}
	},
	methods: {
		tabChange(index) {
			let that = this;
			if (index === that.tabCurrent) {
				return false;
			}
			let currentItem = that.list[index];
			if (currentItem.field == 'c') {
				that.swiperClickFn(currentItem);
				return false;
			}
			uni.switchTab({
				url: currentItem.pagePath
			});
		}
	},
	computed: {
		...mapState({
			list: 'MenuList'
		})
	}
};
</script>

<style lang="scss" scoped>
.weui-tabbar {
	display: flex;
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 500;
	background-color: #ffffff;
	height: 112rpx;
}

.weui-tabbar:before {
	content: ' ';
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	height: 1px;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	color: rgba(0, 0, 0, 0.1);
}

.weui-tabbar__item {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	font-size: 0;
	color: rgba(0, 0, 0, 0.5);
	text-align: center;
	-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	.uni-badge {
		position: absolute;
		top: 0;
		left: 50%;
		z-index: 10;
		transform: translateY(-20%) translateX(10%);
		/* #ifdef H5 || APP-PLUS */
		transform: translateY(-20%) translateX(10%) scale(0.86);
		/* #endif */
	}
}

.weui-tabbar__item:first-child {
	padding-left: constant(safe-area-inset-left);
	padding-left: env(safe-area-inset-left);
}

.weui-tabbar__item:last-child {
	padding-right: constant(safe-area-inset-right);
	padding-right: env(safe-area-inset-right);
}

.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon > i,
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
	color: #ffffff;
}

.weui-tabbar__icon {
	display: inline-block;
	width: 56rpx;
	height: 56rpx;
}

i.weui-tabbar__icon,
.weui-tabbar__icon > i {
	font-size: 24px;
	color: rgba(0, 0, 0, 0.5);
}

.weui-tabbar__icon image {
	width: 100%;
	height: 100%;
}

.weui-tabbar__label {
	font-size: 11px;
	line-height: 1.4;
}
/*5LiH6LGh5LyY6bKc55Sf6bKc57O757ufKOeugOensDog5LiH6LGh5LyY6bKcKQrova/okZfor4Hkuablj7c6IDY5MDcyMjAK6L2v6JGX55m76K6w5Y+3OiAyMDIxU1IwMTgyOTAzCuaJi+acujogMTgzMTAxOTk4MzgK55S16K+dOiA0MDA2Njk3Njg5CumCrueusTogMzMxOTY1MzA1MUBxcS5jb20K6JGX5L2c5p2D5Lq6OiDljJfkuqzkuJbpl7TkuIfosaHnvZHnu5znp5HmioDmnInpmZDlhazlj7gK54mI5p2D5omA5pyJOiDljJfkuqzkuJbpl7TkuIfosaHnvZHnu5znp5HmioDmnInpmZDlhazlj7gK5Lu75L2V57uE57uH5ZKM5Liq5Lq65pyq57uP5pys5Y2V5L2N6K645Y+v5LiO5o6I5p2DLCDkuI3lvpfmk4Xoh6rlpI3liLbjgIHmm7TmlLnlhoXlrrnmnKzns7vnu5/lj5fniYjmnYPms5Xkv53miqTlpoLmnKrnu4/mjojmnYPogIzmk4Xoh6rlpI3liLbmiJbkvKDmkq3mnKzns7vnu58o5oiW5YW25Lit6YOo5YiGKSwg5bCG5Y+X5Yiw5Lil5Y6J55qE5YiR5LqL5Y+K5rCR5LqL5Yi26KOB77yM5bm25bCG5Zyo5rOV5b6L6K645Y+v6IyD5Zu05YaF5Y+X5Yiw5pyA5aSn5Y+v6IO955qE6LW36K+JIQ==*/
</style>
