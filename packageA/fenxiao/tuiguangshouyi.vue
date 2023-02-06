<template>
	<view class="page">
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<view class="tixianjilu content-wrap">
			<text
				:style="{ color: configInfo.web_site_color }"
				@click="navigateToFn({ url: '/packageA/tuijianyouli/canvas' })"
			>
				推荐二维码
			</text>
		</view>
		<!-- #endif -->

		<!-- #ifdef H5 -->
		<view class="tixianjilu content-wrap"><text :style="{ color: 'rgba(0,0,0,0)' }">推荐二维码</text></view>
		<!-- #endif -->

		<view class="jine-block">
			<view class="jine" @click="navigateToFn({ url: '/packageA/fenxiao/tixian?money=' + money })">
				{{ money }}
				<view class="btn-tixian" :style="{ background: configInfo.web_site_color }">提现</view>
			</view>
			<view class="text">可提现金额(元)</view>
		</view>
		<view class="menu-dingdan-fensi-block">
			<view class="dingdan-block">
				<view class="text-title">订单数</view>
				<view class="num">{{ order_num }}</view>
			</view>
			<view class="line-block"></view>
			<view class="fensi-block" @click="navigateToFn({ url: '/packageA/fenxiao/fensi' })">
				<view class="text-title">
					粉丝数量
					<uni-icons type="arrowright" color="#9c9c9c"></uni-icons>
				</view>
				<view class="num">{{ fans_num }}</view>
			</view>
		</view>
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
					待结算
				</view>
				<view
					:class="['item', act == 2 ? 'act' : '']"
					@click="setActStyleFn(2)"
					:style="{ color: act == 2 ? configInfo.web_site_color : '#374050' }"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					已结算
				</view>
				<view
					:class="['item', act == 3 ? 'act' : '']"
					@click="setActStyleFn(3)"
					:style="{ color: act == 3 ? configInfo.web_site_color : '#374050' }"
				>
					<view class="after" :style="{ background: configInfo.web_site_color }"></view>
					已失效
				</view>
			</view>
		</view>

		<swiper :duration="300" @change="swiperChangeFn" :current="act" :style="{ height: swiperItemWrapH + 'px' }">
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block v-if="pageall.list.length == 0" min-height="100vh" is-show-to-page-btn></null-block>

					<view class="order-list" v-else>
						<view class="item" v-for="(item, index) in pageall.list" :key="item.ord_id">
							<view class="top-block content-wrap">
								<view class="order-ID">订单编号: {{ item.ord_bh }}</view>
								<view class="order-state">{{ item.status }}</view>
							</view>

							<view class="goods-list content-wrap">
								<view class="goods-item" v-for="(goodsItem, _index) in item.goods" :key="_index">
									<view class="img-wrap">
										<image :src="addimgPathHostFn(goodsItem.original_img)" mode=""></image>
									</view>
									<view class="description-block">
										<view class="goods-name">{{ goodsItem.goods_name }}</view>
										<view class="price">
											¥ {{ goodsItem.sale_single_price }} × {{ goodsItem.buy_num }}
										</view>
									</view>
								</view>
							</view>

							<view class="info-Obj-row content-wrap">
								<view class="item-row">
									<view class="key">会员名称</view>
									<view class="val">{{ item.nickname }}</view>
								</view>
								<view class="item-row">
									<view class="key">粉丝等级</view>
									<view class="val">{{ item.level }}</view>
								</view>
								<view class="item-row">
									<view class="key">下单时间</view>
									<view class="val">{{ item.pay_time }}</view>
								</view>
								<view class="item-row">
									<view class="key">订单状态</view>
									<view class="val">{{ item.yj_status }}</view>
								</view>
								<view class="item-row">
									<view class="key">预估佣金</view>
									<view class="val">
										{{ item.yongjin }}
										<block v-if="item.is_change">
											<uni-icons
												style="margin-left: .4em;"
												@click="showChangeInfoFn"
												type="info"
												size="20"
												color="#414959"
											></uni-icons>
										</block>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block v-if="pageing.list.length == 0" min-height="100vh" is-show-to-page-btn></null-block>
					<view class="order-list" v-else>
						<view class="item" v-for="(item, index) in pageing.list" :key="item.ord_id">
							<view class="top-block content-wrap">
								<view class="order-ID">订单编号: {{ item.ord_bh }}</view>
								<view class="order-state">{{ item.status }}</view>
							</view>

							<view class="goods-list content-wrap">
								<view class="goods-item" v-for="(goodsItem, _index) in item.goods" :key="_index">
									<view class="img-wrap">
										<image :src="addimgPathHostFn(goodsItem.original_img)" mode=""></image>
									</view>
									<view class="description-block">
										<view class="goods-name">{{ goodsItem.goods_name }}</view>
										<view class="price">
											¥ {{ goodsItem.sale_single_price }} × {{ goodsItem.buy_num }}
										</view>
									</view>
								</view>
							</view>

							<view class="info-Obj-row content-wrap">
								<view class="item-row">
									<view class="key">会员名称</view>
									<view class="val">{{ item.nickname }}</view>
								</view>
								<view class="item-row">
									<view class="key">粉丝等级</view>
									<view class="val">{{ item.level }}</view>
								</view>
								<view class="item-row">
									<view class="key">下单时间</view>
									<view class="val">{{ item.pay_time }}</view>
								</view>
								<view class="item-row">
									<view class="key">订单状态</view>
									<view class="val">{{ item.yj_status }}</view>
								</view>
								<view class="item-row">
									<view class="key">预估佣金</view>
									<view class="val">
										{{ item.yongjin }}
										<block v-if="item.is_change">
											<uni-icons
												style="margin-left: .4em;"
												@click="showChangeInfoFn"
												type="info"
												size="20"
												color="#414959"
											></uni-icons>
										</block>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block v-if="pagesuccess.list.length == 0" min-height="100vh" is-show-to-page-btn></null-block>
					<view class="order-list" v-else>
						<view class="item" v-for="(item, index) in pagesuccess.list" :key="item.ord_id">
							<view class="top-block content-wrap">
								<view class="order-ID">订单编号: {{ item.ord_bh }}</view>
								<view class="order-state">{{ item.status }}</view>
							</view>

							<view class="goods-list content-wrap">
								<view class="goods-item" v-for="(goodsItem, _index) in item.goods" :key="_index">
									<view class="img-wrap">
										<image :src="addimgPathHostFn(goodsItem.original_img)" mode=""></image>
									</view>
									<view class="description-block">
										<view class="goods-name">{{ goodsItem.goods_name }}</view>
										<view class="price">
											¥ {{ goodsItem.sale_single_price }} × {{ goodsItem.buy_num }}
										</view>
									</view>
								</view>
							</view>

							<view class="info-Obj-row content-wrap">
								<view class="item-row">
									<view class="key">会员名称</view>
									<view class="val">{{ item.nickname }}</view>
								</view>
								<view class="item-row">
									<view class="key">粉丝等级</view>
									<view class="val">{{ item.level }}</view>
								</view>
								<view class="item-row">
									<view class="key">下单时间</view>
									<view class="val">{{ item.pay_time }}</view>
								</view>
								<view class="item-row">
									<view class="key">订单状态</view>
									<view class="val">{{ item.yj_status }}</view>
								</view>
								<view class="item-row">
									<view class="key">预估佣金</view>
									<view class="val">
										{{ item.yongjin }}
										<block v-if="item.is_change">
											<uni-icons
												style="margin-left: .4em;"
												@click="showChangeInfoFn"
												type="info"
												size="20"
												color="#414959"
											></uni-icons>
										</block>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block v-if="pagefail.list.length == 0" min-height="100vh" is-show-to-page-btn></null-block>
					<view class="order-list" v-else>
						<view class="item" v-for="(item, index) in pagefail.list" :key="item.ord_id">
							<view class="top-block content-wrap">
								<view class="order-ID">订单编号: {{ item.ord_bh }}</view>
								<view class="order-state">{{ item.status }}</view>
							</view>

							<view class="goods-list content-wrap">
								<view class="goods-item" v-for="(goodsItem, _index) in item.goods" :key="_index">
									<view class="img-wrap">
										<image :src="addimgPathHostFn(goodsItem.original_img)" mode=""></image>
									</view>
									<view class="description-block">
										<view class="goods-name">{{ goodsItem.goods_name }}</view>
										<view class="price">
											¥ {{ goodsItem.sale_single_price }} × {{ goodsItem.buy_num }}
										</view>
									</view>
								</view>
							</view>

							<view class="info-Obj-row content-wrap">
								<view class="item-row">
									<view class="key">会员名称</view>
									<view class="val">{{ item.nickname }}</view>
								</view>
								<view class="item-row">
									<view class="key">粉丝等级</view>
									<view class="val">{{ item.level }}</view>
								</view>
								<view class="item-row">
									<view class="key">下单时间</view>
									<view class="val">{{ item.pay_time }}</view>
								</view>
								<view class="item-row">
									<view class="key">订单状态</view>
									<view class="val">{{ item.yj_status }}</view>
								</view>
								<view class="item-row">
									<view class="key">预估佣金</view>
									<view class="val">
										{{ item.yongjin }}
										<block v-if="item.is_change">
											<uni-icons
												style="margin-left: .4em;"
												@click="showChangeInfoFn"
												type="info"
												size="20"
												color="#414959"
											></uni-icons>
										</block>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
import { checkTypeFn, transNumFn, toDoubleNumFn } from '@/tools/tools';

export default {
	data() {
		return {
			pageHeight:0,
			act: 0,
			page: 1,
			swiperItemWrapH: 0,
			typeArr: ['all', 'ing', 'success', 'fail'],
			pageall: {
				page: 1,
				list: []
			},

			pageing: {
				page: 1,
				list: []
			},

			pagesuccess: {
				page: 1,
				list: []
			},
			pagefail: {
				page: 1,
				list: []
			},
			fans_num: 0,
			order_num: 0,
			money: ''
		};
	},

	onLoad(options) {
		let that = this;

		that.pageHeight = uni.getSystemInfoSync().windowHeight; // 屏幕高


		console.log(options, '推广收益 options', '\n');
		let { fans_num, order_num, money } = options;
		that.fans_num = fans_num;
		that.order_num = order_num;
		that.money += money;

		that.setNavigationBarColorFn();
		that.getMyOrderFn();
	},

	methods: {
		// 设置顶部导航栏 背景
		setNavigationBarColorFn() {
			let that = this;
			uni.setNavigationBarColor({
				frontColor: '#000000',
				backgroundColor: that.configInfo.web_site_color,
				animation: {
					duration: 0,
					timingFunc: 'easeIn'
				}
			});
		},
		// 点击菜单 切样式 请求当前菜单下数据
		setActStyleFn(num) {
			this.act = num;
		},
		swiperChangeFn(e) {
			let that = this;
			that.act = e.target.current;
			let attr = `page${that.typeArr[that.act]}`;
			if (that[attr].list.length <= 0) {
				that.getMyOrderFn(() => {
					// that.isShowLoading = false
				});
			} else {
				that.setSwiperItemWrapH(that.act);
			}
		},
		// 获取订单
		async getMyOrderFn(fn) {
			let that = this;
			let type = that.typeArr[that.act],
				attr = `page${type}`,
				page = that[attr].page;

			let result = await that.$request({
				url: '/api/Share/myTgsy',
				data: {
					page,
					type
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					fn && fn();
					if (checkTypeFn(result.data.data) == 'Array' && result.data.data.length > 0) {
						result.data.data.forEach(item => {
							item.yongjin = toDoubleNumFn(transNumFn(item.add) - transNumFn(item.cut));
						});

						that[attr].list = that[attr].list.concat(result.data.data);
					} else {
						that[attr].page--;
						if (that[attr].page <= 1) {
							that[attr].page = 1;
						}
					}

					console.log(that[attr].list, '拼完的arr打印', '\n');
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
		},
		// 给外层swiper设置高
		setSwiperItemWrapH(index) {
			let that = this;
			console.log('setSwiperItemWrapH__Run', '\n');
			setTimeout(() => {
				uni.createSelectorQuery()
					.selectAll('.swiper-item-wrap')
					.boundingClientRect(rect => {
						that.swiperItemWrapH = Math.ceil(that.getH(rect[index].height, that.pageHeight));

						console.log(
							rect,
							'所有的rect 高',
							'\n',
							index,
							'传过来的index',
							'\n',
							rect[index].height,
							'获取的当前item高',
							'\n',
							that.pageHeight,
							'全局的win高',
							'\n',
							Math.ceil(that.getH(rect[index].height, that.pageHeight)),
							'计算完的高',
							'\n'
						);
					})
					.exec();
			});
		},
		showChangeInfoFn() {
			uni.showModal({
				showCancel: false,
				title: '商品售后成功会导致佣金发生变化',
			});
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
		let attr = `page${that.typeArr[that.act]}`;
		that[attr].page = 1;
		that.getMyOrderFn(() => {
			console.log(that[attr].list, '赋值前', '\n');
			that[attr].list = [];
			console.log(that[attr].list, '赋值后', '\n');

			uni.stopPullDownRefresh(); //停止下拉刷新动画
			setTimeout(() => {
				console.log(that[attr].list, '1000后_打印最终展示的数组', '\n');
			}, 1000);
			console.log('stopPullDownRefresh', '\n');
		});
	}
};
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: $bg-grey-color;
}

.tixianjilu {
	background: #ffffff;
	text-align: right;

	text {
		line-height: 80rpx;
		font-size: 28rpx;
		color: $red-color;
	}
}

.jine-block {
	background: #ffffff;
	text-align: center;

	.jine {
		font-weight: 600;
		color: #000000;
		font-size: 46rpx;

		.btn-tixian {
			font-size: 22rpx;
			color: #ffffff;
			line-height: 36rpx;
			padding: 0 0.4em;
			background: $red-color;
			display: inline-block;
			border-radius: 2px;
			margin-left: 0.2em;
			transform: translateY(-3px);
		}
	}

	.text {
		line-height: 80rpx;
		font-size: 28rpx;
		color: #a2a2a2;
	}
}

.menu-dingdan-fensi-block {
	padding-bottom: 24rpx;
	background: #ffffff;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	border-bottom: 20rpx solid $bg-grey-color;

	.fensi-block,
	.dingdan-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.line-block {
		width: 2px;
		height: 70rpx;
		background: #d4d4d4;
	}

	.text-title {
		color: #9c9c9c;
		font-size: 28rpx;
	}

	.num {
		font-weight: 600;
		color: #000000;
		font-size: 32;
	}
}

.top-bar {
	position: sticky;
	z-index: 200;
	top: 0;
	left: 0;
	width: 100vw;
	background: #ffffff;
	border-bottom: 1px solid #f2f2f2;

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

.order-list {
	background: #ffffff;
	padding-bottom: 20rpx;

	.item {
		border-bottom: 20rpx solid $bg-grey-color;

		&:last-child {
			border-bottom: none;
		}

		.top-block {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			border-bottom: 1px solid #f0f0f0;

			.order-ID {
				font-size: 28rpx;
				color: #414959;
			}

			.order-state {
				font-size: 28rpx;
				color: $red-color;
			}
		}

		.goods-list {
			$len: 20rpx;
			padding-bottom: $len;

			.goods-item {
				display: flex;
				margin-top: $len;

				.img-wrap {
					width: 90rpx;
					height: 90rpx;
					margin-right: 0.4em;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.description-block {
					display: flex;
					flex-direction: column;
					justify-content: center;

					.goods-name {
						max-width: 18em;
						font-size: 28rpx;
						color: #414959;
						@include text-ellipsis;
						// 一会处理 溢出隐藏
					}

					.price {
						font-size: 22rpx;
						color: #a2a2a2;
					}
				}
			}
		}

		.info-Obj-row {
			.item-row {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 50rpx;
				font-size: 28rpx;
				color: #414959;

				.val {
					display: flex;
					align-items: center;
				}
			}
		}
	}
}
</style>
