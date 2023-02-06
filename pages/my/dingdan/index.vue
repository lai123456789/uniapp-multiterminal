<!-- 
	全部订单页面
-->
<template>
	<view class="page">
		<view class="top-bar">
			<view class="content-wrap">
				<view
					:class="['item', act == 0 ? 'act' : '']"
					@click="setActStyleFn(0)"
					:style="{ color: act == 0 ? configInfo.web_site_color : '#374050' }"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					全部
				</view>
				<view
					:class="['item', act == 1 ? 'act' : '']"
					@click="setActStyleFn(1)"
					:style="{ color: act == 1 ? configInfo.web_site_color : '#374050' }"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					待支付
				</view>
				<view
					:class="['item', act == 2 ? 'act' : '']"
					@click="setActStyleFn(2)"
					:style="{ color: act == 2 ? configInfo.web_site_color : '#374050' }"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					进行中
				</view>
				<view
					:class="['item', act == 3 ? 'act' : '']"
					@click="setActStyleFn(3)"
					:style="{ color: act == 3 ? configInfo.web_site_color : '#374050' }"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					待评价
				</view>
			</view>
		</view>

		<swiper :duration="300" @change="swiperChangeFn" :current="act" :style="{ height: swiperItemWrapH + 'px' }">
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block
						v-if="pageall.list.length == 0"
						min-height="100vh"
						:is-show-to-page-btn="true"
					></null-block>
					<view v-else class="cart-list-block">
						<view class=" content-wrap">
							<card-dingdan
								v-for="(item, index) in pageall.list"
								:key="item.id"
								:type="typeArr[act]"
								@refreshFn="refreshFn"
								:order-info="item"
							></card-dingdan>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block
						v-if="pagedzf.list.length == 0"
						min-height="100vh"
						:is-show-to-page-btn="true"
					></null-block>
					<view v-else class="cart-list-block">
						<view class=" content-wrap">
							<card-dingdan
								v-for="(item, index) in pagedzf.list"
								:key="item.id"
								:type="typeArr[act]"
								@refreshFn="refreshFn"
								:order-info="item"
							></card-dingdan>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block
						v-if="page1.list.length == 0"
						min-height="100vh"
						:is-show-to-page-btn="true"
					></null-block>
					<view v-else class="cart-list-block">
						<view class=" content-wrap">
							<card-dingdan
								v-for="(item, index) in page1.list"
								:key="item.id"
								:type="typeArr[act]"
								@refreshFn="refreshFn"
								:order-info="item"
							></card-dingdan>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block
						v-if="page3.list.length == 0"
						min-height="100vh"
						:is-show-to-page-btn="true"
					></null-block>
					<view v-else class="cart-list-block">
						<view class=" content-wrap">
							<card-dingdan
								v-for="(item, index) in page3.list"
								:key="item.id"
								:type="typeArr[act]"
								@refreshFn="refreshFn"
								:order-info="item"
							></card-dingdan>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<loading-css :is-show="isShowLoading"></loading-css>

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn" to-back></login-fn>


	</view>
</template>

<script>
import cardDingdan from '@/df-components/card-dingdan/card-dingdan';
let optionsAct;

export default {
	components: {
		cardDingdan
	},
	data() {
		return {
			pageHeight:0,
			isShowLoading: true,
			// 全部--all   待付款--'dzf'  1--进行中  3--待评价
			typeArr: ['all', 'dzf', '1', '3'],
			act: 0,
			optionsAct: undefined,
			swiperItemWrapH: 0,
			pageall: {
				page: 1,
				list: []
			},
			pagedzf: {
				page: 1,
				list: []
			},
			page1: {
				page: 1,
				list: []
			},
			page3: {
				page: 1,
				list: []
			},
			pageCont: 0,
			loginBoxFlag:false, // 登录框显示隐藏状态
		};
	},
	onLoad(options) {
		let that = this;
		that.pageHeight = uni.getSystemInfoSync().windowHeight; // 屏幕高
		// 个人中心 点击进入 到订单页面
		let currentType = options.act || 0;
		that.act = currentType;

		// #ifdef APP-PLUS || H5
		if (that.pageCont == 0 && that.act != 0) {
			that.refreshFn();
		}
		// #endif

		if (that.pageCont == 0 && that.act == 0) {
			console.log('pageCont0  在运行', that.act);
			that.refreshFn(() => {
				that.isShowLoading = false;
			});
		}
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
		uni.setStorageSync('orderZhifuLoadCont', 0);
		uni.setStorageSync('orderZhifuReloadFlag', 0);
		console.log('打印that.pageCont', that.pageCont);
		if (that.pageCont >= 1) {
			console.log(uni.getStorageSync('refreshBack'), 'show 函数里 refreshBack 结果', '\n');
			//  refreshBack 是1  不刷新  否则刷新
			if (uni.getStorageSync('refreshBack') != 1) {
				that.refreshFn();
			}
		}
		uni.setStorageSync('refreshBack', '');
		that.pageCont++;
	},
	methods: {
		// 刷新
		refreshFn(fn) {
			let that = this;
			let attr = `page${that.typeArr[that.act]}`;
			that[attr].page = 1;
			that.getMyOrderFn(() => {
				that[attr].list = [];
				fn && fn();
			});
		},
		// 切换swiper分类执行
		swiperChangeFn(e) {
			let that = this;
			that.act = e.target.current;
			let attr = `page${that.typeArr[that.act]}`;
			if (that[attr].list.length <= 0) {
				that.getMyOrderFn(() => {
					console.log('切换swiper分类执行', '\n');
					that.isShowLoading = false;
				});
			} else {
				that.setSwiperItemWrapH(that.act);
			}
		},
		// 点击菜单 切样式 请求当前菜单下数据
		setActStyleFn(num) {
			this.act = num;
		},
		// 给外层swiper设置高
		setSwiperItemWrapH(index) {
			let that = this;
			setTimeout(() => {
				uni.createSelectorQuery()
					.selectAll('.swiper-item-wrap')
					.boundingClientRect(rect => {
						that.swiperItemWrapH = Math.ceil(that.getH(rect[index].height, that.pageHeight));
						/* 
						console.log(
							rect, '所有的rect 高', '\n',
							index, '传过来的index', '\n',
							rect[index].height, '获取的当前item高', '\n',
							that.pageHeight, '全局的win高', '\n',
							Math.ceil(that.getH(rect[index].height, that.pageHeight)), '计算完的高', '\n',
						);
						 */
					})
					.exec();
			});
		},
		//  请求当前菜单下数据 回调清除 不用的数据
		async getMyOrderFn(fn) {
			let that = this;
			let type = that.typeArr[that.act],
				attr = `page${type}`,
				page = that[attr].page;

			let result = await that.$request({
				loading: true,
				url: '/api/order/my_order',
				data: {
					type,
					page
				}
			});
			console.log('获取订单列表接口 /api/order/my_order 返回数据', result);
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					fn && fn();
					if (result.data.data.length <= 0) {
						that[attr].page--;
						if (that[attr].page <= 1) {
							that[attr].page = 1;
						}
					}
					that[attr].list = that[attr].list.concat(result.data.data);
					that.setSwiperItemWrapH(that.act);
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
	// 触底事件
	onReachBottom() {
		let that = this;
		let attr = `page${that.typeArr[that.act]}`;
		that[attr].page++;
		that.getMyOrderFn();
	},
	//下拉刷新触发的函数
	onPullDownRefresh() {
		let that = this;
		that.refreshFn(() => {
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		});
	},
};
</script>

<style lang="scss" scoped>
page,
.page {
	display: inline-block;
	min-height: 100vh;
	background: $bg-grey-color;
	vertical-align: top;
}

.top-bar {
	position: sticky;
	z-index: 200;
	top: 0;
	left: 0;
	width: 100vw;
	background: #ffffff;

	.content-wrap {
		display: flex;
		justify-content: space-between;

		.item {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			height: 88rpx;
			font-size: 26rpx;
			font-weight: 600;
			color: $grey1-color;

			.after {
				content: '';
				display: none;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 40rpx;
				height: 2px;
			}

			&.act {
				.after {
					display: block;
				}
			}
		}
	}
}

.cart-list-block {
	background: $bg-grey-color;
	min-height: 100vh;
	padding-top: 20rpx;
	padding-bottom: 10rpx;
}
</style>
