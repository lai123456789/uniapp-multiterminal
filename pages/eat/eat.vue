<template>
	<view class="page">
		<view class="sticky-wrap">
			<view :style="{ height: `${statusBarHeight}px`, background: '#ffffff' }"></view>
			<view class="search">
				<view class="content-wrap">
					<navigator
						v-if="isLogin"
						url="/packageA/eat/eat-user/index"
						class="my-user-image"
						hover-class="none"
					>
						<image
							:style="{ border: '2px solid ' + borderColor, transition: '1s' }"
							:src="userInfoAvatar"
						></image>
					</navigator>

					<view v-else class="my-user-image" @click="closeGlobalLoginFn(true)">
						<image
							:style="{ border: '2px solid ' + borderColor, transition: '1s' }"
							:src="calcImageSrc('/eat/my-user-image.png')"
							mode=""
						></image>
					</view>

					<navigator url="/packageA/eat/search?type=eat" class="input-box">
						<uni-icons class="icon-search" size="20" color="#91939c" type="search"></uni-icons>
						<text>{{ keyWord }}</text>
					</navigator>

					<!-- #ifdef MP-WEIXIN || MP-TOUTIAO -->
					<view
						class="add"
						@click="navigateToFn({ url: '/packageA/eat/fabuzuopin/index', checkLogin: true })"
						:style="{
							'margin-right': menuButtonRectInfo.right - menuButtonRectInfo.left + 12 + 'px',
							background: configInfo.web_site_color,
							'box-shadow': '3px 2px 4px' + hexToRgba(configInfo.web_site_color, 0.32)
						}"
					></view>
					<!-- #endif -->

					<!-- #ifdef H5 || APP-PLUS -->
					<view
						class="add"
						@click="navigateToFn({ url: '/packageA/eat/fabuzuopin/index', checkLogin: true })"
						:style="{
							background: configInfo.web_site_color,
							'box-shadow': '3px 2px 4px' + hexToRgba(configInfo.web_site_color, 0.32)
						}"
					></view>
					<!-- #endif -->
				</view>
			</view>

			<!-- 滑动菜单列表↓↓ -->
			<view class="scroll-menu-list">
				<view class="scroll-view-block">
					<scroll-view scroll-x :scroll-left="navBarScrollLeft" :scroll-with-animation="true">
						<view
							v-for="(item, index) in menuList"
							:key="index"
							:class="['item', menuListAct == index ? 'act' : '']"
							@click="changeClassFn(item, index)"
							:style="{ color: menuListAct == index ? configInfo.web_site_color : '#374050' }"
						>
							<view class="after" :style="{ background: configInfo.web_site_color }"></view>
							{{ item.name }}
						</view>
					</scroll-view>
				</view>
				<view class="menu-btn">
					<navigator class="btn-box" url="/packageA/eat/menu-class/menu-class" hover-class="none">
						<view>
							<view class="line border-radius"></view>
							<view class="line border-radius"></view>
							<view class="line border-radius"></view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 吃什么 列表↓↓ -->

		<view class="eat-list" v-if="eatPageList.length > 0">
			<view class="content-wrap" :style="{ 'margin-bottom': eatPageList.length >= 6 ? '0rpx' : '20rpx' }">
				<view
					class="item border-radius20"
					v-for="(item, index) in eatPageList"
					:key="index"
					@click="navigateToFn({ url: `/packageA/eat/food-detail/food-detail?id=${item.id}` })"
				>
					<view class="image-wrap"><image class="goods-image" :src="item.cover_image"></image></view>

					<view class="text-wrap">
						<view class="txt-description">{{ item.title }}</view>
					</view>
					<view class="info-block">
						<view class="user-info-block">
							<image class="border-radius" :src="item.headimgurl"></image>
							<text>{{ item.nickname }}</text>
						</view>
						<view class="good-num">
							<uni-icons
								:color="item.is_zan == 1 ? '#dc3c3a' : '#d4d7da'"
								type="heart-filled"
							></uni-icons>

							<!-- <uni-icons color='#d4d7da' type="heart"></uni-icons> -->

							<!-- 
							<uni-icons color="#dc3c3a" type="heart-filled"></uni-icons>
							<uni-icons color='#d4d7da' type="heart"></uni-icons>
							 -->
							<text>{{ item.zan }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<null-block
			v-else
			min-height="100vh"
			is-show-to-page-btn
			to-page-text="发布作品"
			:to-page-url="{ url: '/packageA/eat/fabuzuopin/index', checkLogin: true }"
		></null-block>

		<view class="uni-load-more" v-if="eatPageList.length >= 6">
			<uni-load-more :status="loadMoreStatus"></uni-load-more>
		</view>

		<!-- ↓↓↓ 登录框 -->
		<login-fn
			:is-show-login="loginBoxFlag"
			@close="closeGlobalLoginFn"
			@loginSuccessCallback="loginSuccessCallbackFn"
		></login-fn>

		<to-top-btn :flag="isShowToTopBtn"></to-top-btn>

		<view class="hans-tabbar">
			<view class="hans-tabbar-height" :class="[isiPhoneX ? 'isiPhoneXClass' : '']"></view>
			<view class="hans-tabbar-fixde" :class="[isiPhoneX ? 'isiPhoneXClass' : '']">
				<hans-tabbar :cardNumber="cardNumber" :list="MenuList" :tab-current="tabCurrent"></hans-tabbar>
			</view>
		</view>
		<loading-css :is-show="isShowLoading"></loading-css>
	</view>
</template>

<script>
import { assertArray, cloneFn } from '@/tools/tools.js';
import { mapState } from 'vuex';

let timer,
	statusBarHeight = uni.getSystemInfoSync().statusBarHeight; // 状态栏 高度
export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画
			borderColor: '#ffffff',
			loadMoreStatus: 'more',
			keyWord: '小龙虾',
			menuList: [],
			menuListAct: 0,
			pageIndex: 1,
			scrollWidth: 375, // 屏幕的宽度
			statusBarHeight,
			loginBoxFlag: false, // 登录框显示隐藏状态
			cardNumber: 0 // 购物车数量
		};
	},
	onLoad() {
		let that = this;
		that.scrollWidth = uni.getSystemInfoSync().screenWidth;
		that.pageLoadFn();
	},
	onUnload() {
		clearInterval(timer);
	},
	onShow() {
		let that = this;
		
		// 监听购物车数量改变
		uni.$off('setCardNumberFn');
		uni.$on('setCardNumberFn', cardNumber => {
			that.cardNumber = cardNumber;
		});
		that.setTabBarCartNumFn();

		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag => {
			that.loginBoxFlag = loginBoxFlag;
		});
		

		clearInterval(timer);

		let borderColorCont = 0;
		timer = setInterval(() => {
			borderColorCont++;
			if (borderColorCont % 2 == 0) {
				that.borderColor = '#ffffff';
			} else {
				that.borderColor = that.hexToRgba(that.configInfo.web_site_color, 0.8);
			}
		}, 1000);

		let title;
		for (let i = 0; i < that.MenuList.length; i++) {
			if (that.MenuList[i].field == 'c') {
				title = that.MenuList[i].text;
			}
		}

		let cid = uni.getStorageSync('cid');
		if (cid) {
			uni.setStorageSync('cid', '');
			that.menuListAct = that.menuList.findIndex(item => item.id == cid);
			that.getDeliciousList(() => {
				that.$store.commit('setEatPageList', []);
			});
		}
		setTimeout(() => {
			uni.setNavigationBarColor({
				frontColor: '#000000', // 必写项
				backgroundColor: '#ffffff'
			});
		});
	},
	onHide() {
		clearInterval(timer);
	},
	methods: {
		loginSuccessCallbackFn() {
			this.setTabBarCartNumFn();
		},
		// 页面第一次加载
		async pageLoadFn() {
			let that = this;
			that.menuListAct = 0;
			that.pageIndex = 1;
			let menuList = await that.getMenuTitleListFn();
			if (menuList.type == 'success') {
				that.menuList = menuList.result;
				that.getDeliciousList();
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: menuList.msg
				});
				that.isShowLoading = false;
				return false;
			}
		},
		/*
				@description 获取菜单标题列表数据
				@return <Promise>
			*/
		getMenuTitleListFn() {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let result = await that.$request({
					url: '/api/Delicious/indexCategory'
				});
				let resObj = {};
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultArr = assertArray(result.data.data);
						resObj = {
							type: 'success',
							msg: result.data.msg,
							result: resultArr
						};
					} else {
						resObj = {
							type: 'error',
							msg: result.data.msg,
							result
						};
					}
				} else {
					resObj = {
						type: 'error',
						msg: that.$errorMsg,
						result
					};
				}
				resFn(resObj);
			});
		},
		// 根据当前选择 菜单id 获取当前的 所属内容
		async getDeliciousList(fn, isShowLoading) {
			let that = this;
			let cid = that.menuList[that.menuListAct].id;
			let result = await that.$request({
				loading: !!isShowLoading,
				url: '/api/Delicious/deliciousList',
				data: {
					cid: cid <= 0 ? 0 : cid,
					page: that.pageIndex
				}
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let deliciousArr = assertArray(result.data.data);
					if (deliciousArr.length <= 0) {
						that.pageIndex--;
						if (that.pageIndex <= 1) {
							that.pageIndex = 1;
						}
					}
					fn && fn(deliciousArr);
					let eatPageList = cloneFn(that.eatPageList);
					that.$store.commit('setEatPageList', eatPageList.concat(deliciousArr));
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
		// 点击横向滑动的菜单 渲染当前分类下的 作品列表
		changeClassFn(item, index) {
			let that = this;
			that.pageIndex = 1;
			that.menuListAct = index;
			that.getDeliciousList(() => {
				that.$store.commit('setEatPageList', []);
			}, true);
		}
	},
	computed: {
		tabCurrent() {
			let that = this;
			for (let i = 0; i < that.MenuList.length; i++) {
				if (that.MenuList[i].field == 'c') {
					return i;
				}
			}
			return 0;
		},
		navBarScrollLeft() {
			let that = this;
			let itemWeight = (that.scrollWidth * 75) / 375;
			let res = that.menuListAct * itemWeight - that.scrollWidth / 2 + itemWeight / 2;
			return res;
		},
		...mapState({
			userInfoAvatar: store => store.userInfo.userInfoAvatar, // 头像地址
			eatPageList: store => store.eat.eatPageList // 吃什么数据
		})
	},
	// ↓↓↓ 下拉刷新
	onPullDownRefresh() {
		let that = this;
		that.pageIndex = 1;
		that.getDeliciousList(() => {
			that.$store.commit('setEatPageList', []);
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		});
	},
	// ↓↓↓ 触底加载更多
	onReachBottom() {
		let that = this;
		that.pageIndex++;
		that.loadMoreStatus = 'loading';

		that.getDeliciousList(list => {
			if (list.length <= 0) {
				that.loadMoreStatus = 'noMore';
			} else {
				that.loadMoreStatus = 'more';
			}
		});
	}
};
</script>

<style lang="scss" scoped>
page,
.page {
	background: $bg-grey-color;
	min-height: 100vh;
}

.sticky-wrap {
	position: sticky;
	z-index: 20;
	top: 0;
	left: 0;
	width: 100%;
}

.uni-load-more {
	background: $bg-grey-color;
}

.search {
	height: 88rpx;
	background: #ffffff;

	.content-wrap {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.input-box {
		letter-spacing: 2rpx;
		height: 60rpx;
		width: 100%;
		line-height: 60rpx;
		color: #919191;
		font-size: 30rpx;
		text-align: center;
		border-radius: 16rpx;
		background-color: #f1f1f1;
		// background-color: #FFFFFF;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-left: 1em;
		margin-right: 1em;

		.icon-search {
			margin-left: 0.7em;
			margin-top: 0.17em;
		}

		text {
			max-width: 80%;
			display: inline-block;
			margin-left: 0.25em;
			@include text-ellipsis;
		}
	}

	.add {
		box-sizing: content-box;
		width: 60px;
		height: 48rpx;
		border-radius: 16rpx;
		font-size: 0;
		position: relative;

		&::before,
		&::after {
			content: '';
			display: block;
			position: absolute;
			background: #ffffff;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%, -50%, 0);
			border-radius: 5rpx;
		}

		&::after {
			width: 6rpx;
			height: 26rpx;
		}

		&::before {
			height: 6rpx;
			width: 26rpx;
		}
	}

	.my-user-image {
		// margin-left: 1em;
		@include flex-center;

		image {
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
		}
	}
}

/* #ifdef H5 || APP-PLUS */
.search {
	.content-wrap {
		display: flex;
		justify-content: space-between;

		.input-box {
			flex: 1;
		}

		.add {
			width: 30px;
		}
	}
}

/* #endif */

.scroll-menu-list {
	overflow: hidden;
	display: flex;
	height: 88rpx;
	background: #ffffff;

	scroll-view {
		height: 100rpx;
	}

	.scroll-view-block {
		flex-grow: 1;
		overflow: hidden;

		scroll-view {
			width: 100%;

			@include hide-scrollbar;
			white-space: nowrap;

			.item {
				position: relative;
				height: 88rpx;
				width: 150rpx;
				display: inline-flex;
				justify-content: center;
				align-items: center;
				font-size: 30rpx;
				color: $grey1-color;
				font-weight: 600;

				.after {
					display: none;
				}

				&.act {
					.after {
						display: block;
						position: absolute;
						bottom: 0;
						left: 50%;
						width: 40rpx;
						height: 4rpx;
						border-radius: 10000rpx;
						transform: translateX(-50%);
					}
				}
			}
		}
	}

	.menu-btn {
		.btn-box {
			width: 88rpx;
			height: 88rpx;
			background-color: #ffffff;
			box-shadow: 0 0 100rpx #f0f1f2;
			position: relative;

			> view {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate3d(-50%, -50%, 0);
				width: 32rpx;
				height: 28rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			.line {
				width: 32rpx;
				height: 4rpx;
				background-color: #432407;
			}
		}
	}
}

.eat-list {
	background-color: $bg-grey-color;
	// padding: 20rpx 0 0 0;
	font-size: 0;
	pading-bottom: 20rpx;
	overflow: hidden;

	.content-wrap {
		overflow: hidden;
	}

	.item {
		float: left;
		// display: inline-block;
		margin-right: 18rpx;
		margin-top: 20rpx;
		overflow: hidden;
		background-color: #ffffff;
		position: relative;
		width: 342rpx;
		height: 516rpx;

		&:nth-child(2n) {
			margin-right: 0;
		}

		.image-wrap {
			border-radius: 20rpx;
			width: 342rpx;
			height: 320rpx;
			overflow: hidden;

			.goods-image {
				width: 100%;
				height: 100%;
			}
		}

		.text-wrap {
			margin-top: 14rpx;
			height: 88rpx;
			padding-left: 20rpx;
			padding-right: 10rpx;

			.txt-description {
				text-align: left;
				font-size: 30rpx;
				font-weight: 600;
				color: $grey1-color;
				@include text-ellipsis-rows;
				line-height: 1.5em;
			}
		}

		.good-num,
		.user-info-block {
			display: flex;
			align-items: center;
		}

		.user-info-block image {
			display: inline-block;
			width: 52rpx;
			height: 52rpx;
		}

		.good-num text,
		.user-info-block text {
			display: inline-block;
			font-size: 24rpx;
			color: $grey2-color;
			text-indent: 0.5em;
		}

		.info-block {
			width: 100%;
			position: absolute;
			bottom: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
		}
	}
}

/*
	万象优鲜生鲜系统(简称: 万象优鲜)
	软著证书号: 6907220
	软著登记号: 2021SR0182903
	手机: 18310199838
	电话: 4006697689
	邮箱: 3319653051@qq.com
	著作权人: 北京世间万象网络科技有限公司
	版权所有: 北京世间万象网络科技有限公司
	任何组织和个人未经本单位许可与授权, 不得擅自复制、更改内容本系统受版权法保护如未经授权而擅自复制或传播本系统(或其中部分), 将受到严厉的刑事及民事制裁，并将在法律许可范围内受到最大可能的起诉!
*/
</style>
