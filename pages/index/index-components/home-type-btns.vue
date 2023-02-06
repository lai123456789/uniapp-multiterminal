<!--
	首页的 分类 组件 
-->
<template>
	<view class="home-type-btns">
		<!-- 首页分类菜单↓↓ (菜单小于等于10) -->
		<view class="main-menu" v-if="homeMenuBtnList.length > 0 && homeMenuBtnList.length <= 10">
			<view class="content-wrap">
				<view
					class="menu-item"
					v-for="(item, index) in homeMenuBtnList"
					:key="index"
					@click="swiperClickFn(item)"
				>
					<image class="icon-menu" :src="item.image"></image>
					<view class="text">{{ item.title }}</view>
				</view>
			</view>
		</view>
		<!-- 首页分类菜单↓↓ (菜单大于10) -->
		<view class="menu-wrap" v-if="homeMenuBtnList.length > 0 && homeMenuBtnList.length > 10">
			<view class="menu-item-list">
				<!-- #ifdef MP-WEIXIN || APP-PLUS || H5 -->
				<movable-area class="movable-area-dom">
					<movable-view
						inertia
						@change="movableViewChangeFn"
						class="movable-view-dom"
						direction="horizontal"
						:style="{ width: `${homeMenuLineNum * 142}rpx` }"
					>
						<view class="page-view" v-for="(item, index) in homeMenuBtnSlideList" :key="index">
							<view class="menu-item" v-for="(val, key) in item" :key="key" @click="swiperClickFn(val)">
								<image class="menu-img" :src="val.image"></image>
								<view class="text">{{ val.title }}</view>
							</view>
						</view>
					</movable-view>
				</movable-area>
				<!-- #endif -->
				<!-- #ifdef MP-TOUTIAO -->
				<!-- 
					头条小程序不支持
						movable-area
						movable-view
					用createSelectorQuery接口实现滑动效果
				-->
				<view class="movable-area-dom" @scroll="scrollFn">
					<view
						id="movable-view-dom"
						class="movable-view-dom"
						:style="{ width: `${homeMenuLineNum * 142}rpx` }"
					>
						<view class="page-view" v-for="(item, index) in homeMenuBtnSlideList" :key="index">
							<view class="menu-item" v-for="(val, key) in item" :key="key" @click="swiperClickFn(val)">
								<image class="menu-img" :src="val.image"></image>
								<view class="text">{{ val.title }}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- #endif -->
			</view>
			<view class="menu-bottom-progress-bar-wrap">
				<view class="menu-bottom-progress-bar-bg">
					<view
						class="menu-bottom-progress-bar-block"
						:style="{ background: configInfo.web_site_color, transform: `translateX(${offSetLeftBar}%)` }"
					></view>
				</view>
				<uni-transition :mode-class="['fade']" :show="isShowHomeMenuTip">
					<view class="flex-center tips">左滑查看更多</view>
				</uni-transition>
			</view>
		</view>
	</view>
</template>

<script>
let timer;
// #ifdef MP-TOUTIAO
import { assertArray, assertObject, transNumFn } from '@/tools/tools.js';
// #endif

export default {
	props: {
		// 是否显示 左滑查看更多 提示气泡 true显示 false隐藏
		isShowHomeMenuTip: {
			type: Boolean,
			default: true
		},
		homeMenuBtnList: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			offSetLeftBar: 0 // 首页跳转到分类页面的菜单栏 按钮 数据超过10个就显示下面的 滑动指示 的 偏移量
		};
	},
	methods: {
		// #ifdef MP-TOUTIAO
		scrollFn(e) {
			let that = this;
			const query = uni.createSelectorQuery().in(that);
			query
				.select('#movable-view-dom')
				.boundingClientRect(data => {
					data = assertObject(data);
					let a = transNumFn(data.width) - that.rpxTopxFn(710);
					let b = that.rpxTopxFn(20) - transNumFn(data.left);
					let c = Math.floor((100 * b) / a);
					that.offSetLeftBar = c;
				})
				.exec();
		},
		// #endif
		// 滑动菜单
		movableViewChangeFn(e) {
			let that = this;
			let { x, y } = e.detail;

			let calc = 750 / that.windowWidth;
			let pxWidth = 142 / calc;

			let s = pxWidth * that.homeMenuLineNum - pxWidth * 5;
			let absx = Math.abs(x);
			that.offSetLeftBar = Math.floor((absx / s) * 100);
			// console.log('that.isShowHomeMenuTip', that.isShowHomeMenuTip);
		}
	},
	watch: {
		offSetLeftBar(...arg) {
			let that = this;
			clearTimeout(timer);
			timer = setTimeout(() => {
				/* 
				console.log(
					'that.offSetLeftBar , that.isShowHomeMenuTip',
					that.offSetLeftBar,
					that.isShowHomeMenuTip,
					arg
				);
				 */
				if (!that.isShowHomeMenuTip) {
					return false;
				}
				if (that.offSetLeftBar >= 30) {
					console.log('emitRun');
					that.$emit('hideHomeMenuTipFn');
				}
			}, 800);
		}
	},

	computed: {
		// 返回 首页的按钮菜单 一行 有几个
		homeMenuLineNum() {
			let that = this;
			if (that.homeMenuBtnList.length > 10) {
				return Math.ceil(that.homeMenuBtnList.length / 2);
			} else {
				return 0;
			}
		},
		// 返回 首页的按钮菜单 滑动 的数据结构
		homeMenuBtnSlideList() {
			let that = this;
			let resultList = [];

			for (let j = 0; j < 2; j++) {
				let start = j * that.homeMenuLineNum;
				let end = start + that.homeMenuLineNum;
				resultList.push(that.homeMenuBtnList.slice(start, end));
			}
			return resultList;
		}
	}
};
</script>

<style scoped lang="scss">
.home-type-btns {
	overflow: hidden;
	background: $bg-grey-color;
}
.main-menu {
	background: #ffffff;
	.content-wrap {
		padding: 0 20rpx;
	}
	view {
		font-size: 0;
	}
	.menu-item {
		display: inline-block;
		padding: 10rpx 0;
		width: 142rpx;
		height: 174rpx;
		text-align: center;
		.icon-menu {
			width: 112rpx;
			height: 112rpx;
		}
		.text {
			margin-top: 8rpx;
			padding: 0 2px;
			max-width: 100%;
			font-size: 26rpx;
			color: #374050;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}

.menu-wrap {
	margin-bottom: 10rpx;
	padding: 0 20rpx 0;
	overflow: hidden;
	font-size: 0;
	background: #ffffff;
	.menu-item-list {
		width: 710rpx;
		height: 348rpx;
		.movable-area-dom {
			width: 710rpx;
			height: 348rpx;
			/* #ifdef MP-TOUTIAO */
			overflow-x: auto;
			/* #endif */

			.movable-view-dom {
				height: 348rpx;

				.page-view {
					// white-space: nowrap;
					.menu-item {
						display: inline-flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						width: 142rpx;
						height: 174rpx;
						.menu-img {
							width: 112rpx;
							height: 112rpx;
						}
						.text {
							margin-top: 8rpx;
							padding: 0 2px;
							max-width: 100%;
							font-size: 26rpx;
							color: #374050;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}
	.menu-bottom-progress-bar-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		height: 46rpx;
		.menu-bottom-progress-bar-bg {
			width: 56rpx;
			height: 12rpx;
			background: #f5f5f5;
			border-radius: 1000px;
			.menu-bottom-progress-bar-block {
				width: 28rpx;
				height: 12rpx;
				background: #f5f5f5;
				border-radius: 1000px;
			}
		}
		.tips {
			@keyframes move {
				0% {
					transform: translateX(100%);
				}
				100% {
					transform: translateX(110%);
				}
			}

			position: absolute;
			left: 50%;
			top: 50%;
			margin-top: -19rpx;
			margin-left: -90rpx;
			width: 180rpx;
			height: 38rpx;
			background: rgba(0, 0, 0, 0.8);
			color: #ffffff;
			transform: translateX(100%);
			font-size: 26rpx;
			border-radius: 8rpx;
			animation: move 1s infinite alternate ease-in-out;
			&::after {
				content: '';
				display: block;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translate(-100%, -50%);
				border: 12rpx solid rgba(0, 0, 0, 0);
				border-right-color: rgba(0, 0, 0, 0.8);
			}
		}
	}
}
</style>
