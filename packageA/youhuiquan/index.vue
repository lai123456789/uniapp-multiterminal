<!--
	用户优惠券列表页面
-->
<template>
	<view class="root-page">
		<view class="card-class-bar">
			<view class="content-wrap">
				<view
					:class="['item', swiperCurrent == 0 ? 'act' : '']"
					:style="{ color: swiperCurrent == 0 ? configInfo.web_site_color : '#374050' }"
					@click="setMenuAct(0)"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					未使用
				</view>
				<view
					:class="['item', swiperCurrent == 1 ? 'act' : '']"
					:style="{ color: swiperCurrent == 1 ? configInfo.web_site_color : '#374050' }"
					@click="setMenuAct(1)"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					已使用
				</view>
				<view
					:class="['item', swiperCurrent == 2 ? 'act' : '']"
					:style="{ color: swiperCurrent == 2 ? configInfo.web_site_color : '#374050' }"
					@click="setMenuAct(2)"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					已过期
				</view>
			</view>
		</view>

		<swiper
			:duration="300"
			class="swiper-dom"
			:style="{ height: swiperItemWrapH + 'px' }"
			@change="swiperChange"
			:current="swiperCurrent"
		>
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block
						v-if="page0.list.length <= 0"
						min-height="100vh"
						is-show-to-page-btn
						text="没有更多优惠券~"
					></null-block>

					<view v-else class="coupon-list-wrap">
						<block v-for="(item, index) in page0.list" :key="index">
							<coupon-item
								:couponStatus="item.couponStatus"
								:couponValue="item.couponValue"
								:couponDesc="item.couponDesc"
								:couponName="item.couponName"
								:userUseType="item.userUseType"
								:goodsUseType="item.goodsUseType"
								:isShowBtn="item.isShowBtn"
								:time="item.time"
								:indexs="index"
								@btnClickFn="btnClickFn"
							></coupon-item>
						</block>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block
						v-if="page1.list.length <= 0"
						min-height="100vh"
						is-show-to-page-btn
						text="没有更多优惠券~"
					></null-block>

					<view v-else class="coupon-list-wrap">
						<block v-for="(item, index) in page1.list" :key="index">
							<coupon-item
								:couponStatus="item.couponStatus"
								:couponValue="item.couponValue"
								:couponDesc="item.couponDesc"
								:couponName="item.couponName"
								:userUseType="item.userUseType"
								:goodsUseType="item.goodsUseType"
								:isShowBtn="item.isShowBtn"
								:time="item.time"
								:indexs="index"
								@btnClickFn="btnClickFn"
							></coupon-item>
						</block>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block
						v-if="page2.list.length <= 0"
						min-height="100vh"
						is-show-to-page-btn
						text="没有更多优惠券~"
					></null-block>
					<view v-else class="coupon-list-wrap">
						<block v-for="(item, index) in page2.list" :key="index">
							<coupon-item
								:couponStatus="item.couponStatus"
								:couponValue="item.couponValue"
								:couponDesc="item.couponDesc"
								:couponName="item.couponName"
								:userUseType="item.userUseType"
								:goodsUseType="item.goodsUseType"
								:isShowBtn="item.isShowBtn"
								:time="item.time"
								:indexs="index"
								@btnClickFn="btnClickFn"
							></coupon-item>
						</block>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<loading-css :is-show="isShowLoading"></loading-css>
		<!-- 登录框组件 -->
		<login-fn
			:is-show-login="loginBoxFlag"
			@loginSuccessCallback="refreshFn"
			@close="closeGlobalLoginFn"
			is-show-exit
		></login-fn>

		<!--
			uniapp 在安卓上运行 不触发 $nextTick 里的回调
				解决方案 在给data赋值完后 随便找个响应式数据(这里用的是tttt) 把这个数据 "使用" 在页面上, 但是不显示出来不让用户看到
				给这个响应式数据赋值随机数。 $nextTick 完美触发 \(^o^)/
		-->
		<view style="width: 0;height: 0;overflow: hidden;">{{ tttt }}</view>
	</view>
</template>

<script>
import { assertObject, assertArray, transNumFn } from '@/tools/tools.js';
import couponItem from './coupon-item.vue';
import { weiling, yiling, yiyong, guoqi, couponStatusEnum } from './coupon-const.js';
export default {
	components: {
		couponItem
	},
	data() {
		return {
			pageLoadCount: 0, // 页面加载次数
			pageHeight: 0,
			isShowLoading: true, // 开屏动画
			page0: {
				list: [],
				page: 1
			},
			page1: {
				list: [],
				page: 1
			},
			page2: {
				list: [],
				page: 1
			},
			tttt: null,
			swiperItemWrapH: 0,
			swiperCurrent: 0,
			isPullDownRefreshIng: false, // 上次的下拉是否在请求中
			isReachBottomIng: false, // 上次的上拉加载更多是否在请求中
			loginBoxFlag: false // 登录框显示隐藏状态
		};
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag => {
			that.loginBoxFlag = loginBoxFlag;
		});
		/*
			第一次页面load执行onShow不执行
			第多次页面load不执行onShow执行
		*/
		if (that.pageLoadCount >= 1) {
			that.showFn();
		}
		if (!that.isLogin) {
			that.closeGlobalLoginFn(true);
			that.isShowLoading = false;
		}
		that.pageLoadCount++;
	},
	onReady() {
		this.pageHeight = uni.getSystemInfoSync().windowHeight; // 可用高
	},
	onLoad() {
		this.isLogin && this.loadFn();
	},
	methods: {
		// 根据优惠券类型和当前页数返回列表
		getCouponListFn(type, page) {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					method: 'post',
					url: '/api/User/UserCoupon',
					data: {
						type: type + 1,
						page
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						resFn({
							type: 'success',
							msg: '获取优惠券列表成功',
							result: assertArray(assertObject(result.data.data).list).map(i => {
								let couponStatusMap = {
									[0]: weiling,
									[1]: yiling,
									[2]: yiyong,
									[3]: guoqi
								};

								let resObj = {
									couponId: i.coupon_id,
									couponUserId: i.coupon_user_id,
									couponStatus: couponStatusMap[i.coupon_status],
									couponValue: transNumFn(i.money),
									couponDesc: i.title,
									couponName: `【${i.coupon_name}】${i.coupon_title}`,
									userUseType: i.user_coupon_use_type,
									goodsUseType: i.goods_range_title,
									time: i.indate
								};
								if (resObj.couponStatus == weiling) {
									resObj.isShowBtn = true;
								} else {
									if (resObj.couponStatus == yiling) {
										if (i.goods_range == 1 || i.goods_range == 2) {
											resObj.isShowBtn = true;
										} else {
											resObj.isShowBtn = false;
										}
									} else {
										resObj.isShowBtn = false;
									}
								}
								return resObj;
							})
						});
					} else {
						resFn({
							type: 'error',
							msg: result.data.msg
						});
					}
				} else {
					resFn({
						type: 'error',
						msg: that.$errorMsg
					});
				}
			});
		},
		// 根据优惠券id领取对应优惠券
		gainCouponFn(couponId) {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					method: 'post',
					url: '/api/User/GetCoupon',
					data: {
						couponIds: couponId
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						resFn({
							type: 'success',
							msg: result.data.msg
						});
					} else {
						resFn({
							type: 'error',
							msg: result.data.msg
						});
					}
				} else {
					resFn({
						type: 'error',
						msg: that.$errorMsg
					});
				}
			});
		},
		// 页面onShow
		async showFn() {
			let that = this;
			if (that.isLogin) {
				uni.showLoading();

				let current = that[`page${that.swiperCurrent}`];
				current.page = 1;

				let getCouponListResult = await that.getCouponListFn(that.swiperCurrent, current.page);
				if (getCouponListResult.type == 'success') {
					current.list = getCouponListResult.result;
					that.$nextTick(() => {
						that.setSwiperItemWrapH(that.swiperCurrent);
					});
				} else {
					that.hideAllFn();
					uni.showToast({
						icon: 'none',
						title: getCouponListResult.msg
					});
				}
			} else {
				that.closeGlobalLoginFn(true);
			}
		},
		// 页面onLoad
		async loadFn() {
			let that = this;
			let getCouponListResult = await that.getCouponListFn(
				that.swiperCurrent,
				that[`page${that.swiperCurrent}`].page
			);
			if (getCouponListResult.type == 'success') {
				that[`page${that.swiperCurrent}`].list = getCouponListResult.result;
				that.$nextTick(() => {
					that.setSwiperItemWrapH(that.swiperCurrent);
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: getCouponListResult.msg
				});
			}
			that.isShowLoading = false;
		},
		// 右侧的按钮被点击
		async btnClickFn(index) {
			let that = this;
			let current = that[`page${that.swiperCurrent}`];
			let couponId = current.list[index].couponId;

			// 根据优惠券类型判断 领取 或 查看可使用商品列表
			if (current.list[index].couponStatus == weiling) {
				uni.showLoading();
				let gainCouponResult = await that.gainCouponFn(couponId);
				that.hideAllFn();
				if (gainCouponResult.type == 'success') {
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: gainCouponResult.msg,
						async success(e) {
							//确认后的回调
							uni.showLoading();
							current.page = 1;
							let getCouponListResult = await that.getCouponListFn(that.swiperCurrent, current.page);
							if (getCouponListResult.type == 'success') {
								current.list = getCouponListResult.result;
								that.$nextTick(() => {
									that.setSwiperItemWrapH(that.swiperCurrent);
								});
							} else {
								that.hideAllFn();
								uni.showToast({
									icon: 'none',
									title: getCouponListResult.msg
								});
							}
						}
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: gainCouponResult.msg
					});
				}
			} else if (current.list[index].couponStatus == yiling) {
				that.navigateToFn({ url: `/pages/list-page/youhuiquan?id=${couponId}` });
			}
		},
		// 登录后刷新页面
		async refreshFn() {
			let that = this;
			uni.showLoading();
			let current = that[`page${that.swiperCurrent}`];
			current.page = 1;
			let getCouponListResult = await that.getCouponListFn(that.swiperCurrent, current.page);
			if (getCouponListResult.type == 'success') {
				current.list = getCouponListResult.result;
				that.$nextTick(() => {
					that.setSwiperItemWrapH(that.swiperCurrent);
				});
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: getCouponListResult.msg
				});
			}
		},
		// swiper切换事件
		async swiperChange(e) {
			let that = this;
			console.log('swiper 切换事件 e.target.current', e.target.current);
			that.swiperCurrent = e.target.current;
			uni.showLoading();
			let current = that[`page${that.swiperCurrent}`];
			current.page = 1;
			let getCouponListResult = await that.getCouponListFn(that.swiperCurrent, current.page);
			if (getCouponListResult.type == 'success') {
				current.list = getCouponListResult.result;
				that.tttt = Math.random();
				console.log('set_ Data end1');
				that.$nextTick(() => {
					console.log('that.$nextTick callback run');
					that.setSwiperItemWrapH(that.swiperCurrent);
				});
				console.log('set Data end2');
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: getCouponListResult.msg
				});
			}
		},
		// 点击标题 切换到 对应的类目 下
		setMenuAct(act) {
			this.swiperCurrent = act;
		},
		// 根据索引设置 SwiperItemWrap 的高
		setSwiperItemWrapH(index) {
			let that = this;
			uni.createSelectorQuery()
				.selectAll('.swiper-item-wrap')
				.boundingClientRect(rect => {
					console.log('rect', rect);
					let swiperHeight = transNumFn(assertObject(assertArray(rect)[index]).height);
					that.swiperItemWrapH = Math.ceil(that.getH(swiperHeight, that.pageHeight));
					that.hideAllFn();
				})
				.exec();
		}
	},
	// 下拉刷新触发的函数
	async onPullDownRefresh() {
		let that = this;
		if (that.isPullDownRefreshIng) {
			return false;
		}
		that.isPullDownRefreshIng = true;
		let current = that[`page${that.swiperCurrent}`];
		current.page = 1;

		let getCouponListResult = await that.getCouponListFn(that.swiperCurrent, current.page);
		if (getCouponListResult.type == 'success') {
			current.list = getCouponListResult.result;
			that.$nextTick(() => {
				that.setSwiperItemWrapH(that.swiperCurrent);
			});
		} else {
			that.hideAllFn();
			uni.showToast({
				icon: 'none',
				title: getCouponListResult.msg
			});
		}
		that.isPullDownRefreshIng = false;
		uni.stopPullDownRefresh(); //停止下拉刷新动画
	},
	// 上拉加载更多
	async onReachBottom() {
		let that = this;
		if (that.isReachBottomIng) {
			return false;
		}
		that.isReachBottomIng = true;
		uni.showLoading();

		let current = that[`page${that.swiperCurrent}`];
		current.page++;
		let getCouponListResult = await that.getCouponListFn(that.swiperCurrent, current.page);
		if (getCouponListResult.type == 'success') {
			if (getCouponListResult.result.length >= 1) {
				current.list = current.list.concat(getCouponListResult.result);
				that.$nextTick(() => {
					that.setSwiperItemWrapH(that.swiperCurrent);
				});
			} else {
				current.page--;
				if (current.page <= 1) {
					current.page = 1;
				}
			}
			that.hideAllFn();
		} else {
			that.hideAllFn();
			uni.showToast({
				icon: 'none',
				title: getCouponListResult.msg
			});
		}
		that.isReachBottomIng = false;
	}
};
</script>
<style lang="scss" scoped>
.root-page {
	overflow: initial;
}
.card-class-bar {
	position: sticky;
	top: 0;
	left: 0;
	z-index: 99;
	background: #ffffff;

	.content-wrap {
		display: flex;
		justify-content: space-around;
		align-items: center;

		.item {
			display: flex;
			align-items: center;
			height: 88rpx;
			position: relative;
			color: $grey1-color;
			font-size: 26rpx;

			.after {
				display: none;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 40rpx;
				height: 2px;
				border-radius: 10000rpx;
			}

			&.act {
				font-weight: 600;

				.after {
					display: block;
				}
			}
		}
	}
}

.swiper-dom {
	min-height: 100vh;
	.coupon-list-wrap {
		padding: 10rpx 0;
	}
}
</style>
