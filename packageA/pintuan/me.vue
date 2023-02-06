<template>
	<view class="page">
		<block v-if="isLogin">
			<block v-if="isShowTopTimer">
				<view style="height: 88rpx;"></view>
				<view class="time-block" :style="{ background: configInfo.web_site_color }">
					<image :src="calcImageSrc('/my/bg-time.png')" mode=""></image>
					<time-count-down h1text="距结束还有" :time-arr="timeArr"></time-count-down>
				</view>
			</block>
			<view class="success-block">
				<view class="content-wrap">
					<view class="tip-title">{{ titleStr }}</view>
					<view class="tip-num">
						<view>{{ descriptionStr }}</view>
					</view>
					<view class="user-image-block">
						<view class="user-image border-radius" v-for="(item, index) in tuanItemList" :key="index">
							<image :src="item.headimgurl" mode=""></image>
						</view>
						<view class="user-image border-radius" v-if="tuanStatusID == 0">
							<image :src="calcImageSrc('/my/per....png')" mode=""></image>
						</view>
					</view>

					<!-- start  以下按钮只会显示一个 -->

					<!-- 自己是团长 自己开团 -->

					<view
						v-if="btnIsStatus == 1 && checkTimer && tuanStatusID == 0"
						class="share-btn"
						:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
						:style="{ background: configInfo.web_site_color }"
						@click="setShareModuleFn(true)"
					>
						邀请好友参团
					</view>

					<!-- 通过别人分享的商品 参加团 -->
					<view
						v-if="btnIsStatus == 0 && checkTimer && tuanStatusID == 0"
						class="share-btn border-radius20"
						:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
						:style="{ background: configInfo.web_site_color }"
						@click="payFn"
					>
						立即参团
					</view>

					<!-- 自己支付时 取消后 再进入 显示开始支付 -->
					<view
						v-if="tuanStatusID == -1"
						class="share-btn border-radius20"
						:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
						@click="toPayFn"
						:style="{ background: configInfo.web_site_color }"
					>
						支付
					</view>

					<!-- 拼团成功去使用 -->
					<view
						v-if="tuanStatusID == 2"
						class="share-btn border-radius20"
						:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
						@click="toUseFn"
						:style="{ background: configInfo.web_site_color }"
					>
						已拼成功 去使用
					</view>

					<!-- end  以上按钮只会显示一个 -->
				</view>
			</view>

			<view class="line-tip">分享好友越多,成团越快</view>
			<view class="pintuan-info-block">
				<view class="content-wrap">
					<view
						class="line-block"
						@click="navigateToFn({ url: `/packageB/goods-detail/pintuan-detail?id=${goodsId}` })"
					>
						<view class="left-tip-text">拼团商品</view>
						<view class="right-tip-text">
							<text class="text">{{ goodsName }}</text>
							<uni-icons type="arrowright"></uni-icons>
						</view>
					</view>
					<view class="line-block">
						<view class="left-tip-text">拼团时间</view>
						<view class="right-tip-text">
							<text class="text">{{ tuanStartTime }}</text>
						</view>
					</view>

					<!-- 进度条 -->
					<view class="progress-bar-block">
						<uni-steps
							active-color="#ff9238"
							class="progress"
							:options="progressBarArr"
							:active="progressAct"
						></uni-steps>
					</view>
				</view>
			</view>

			<view class="do-you-like-block">
				<view class="content-wrap">
					<view class="tip-title">{{ likeTitle }}</view>
					<view class="goods-list-block">
						<block v-for="(item, index) in likeGoodsList" :key="index">
							<view
								class="item border-radius20"
								@click="
									navigateToFn({ url: `/packageB/goods-detail/pintuan-detail?id=${item.goods_id}` })
								"
							>
								<view class="goods-image-block"><image :src="item.original_img" mode=""></image></view>
								<view class="goods-name">{{ item.goods_name }}</view>
								<view class="goods-description">{{ item.goods_remark }}</view>
								<view class="price-wrap">
									<view class="shop-price-block-lr">
										<view class="origin-price">
											¥
											<text>{{ item.pinprice }}</text>
										</view>
									</view>
									<view class="tag-block">{{ item.pin_count }}人拼团</view>
								</view>
								<view class="num-block">已有{{ item.sales_sum }}人拼团</view>
								<view class="pintuan-btn border-radius" :style="{ background: configInfo.web_site_color }">拼</view>
							</view>
						</block>
					</view>
				</view>
			</view>

			<view :class="['share-modal-block', isShowShareModal ? 'showShareModal' : 'hideShareModal']">
				<view class="cancel-block" @click="setShareModuleFn(false)">
					<view>拼团已发起,人满后即可发货</view>
				</view>
				<view class="share-btn-block">
					<view class="tip-title">
						还差
						<text>{{ tuanBuyNum }}人</text>
						,赶快邀请好友来参团吧
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<button open-type="share" class="image-block" style="background: #ffffff;">
						<view class="iconfont icon-weixin" style="color: #6ccc4e;font-size: 116rpx;"></view>
					</button>
					<!-- #endif -->

					<!-- #ifdef APP-PLUS -->
					<button class="image-block" style="background: #ffffff;" @click="appPinTuanShareFn">
						<view class="iconfont icon-weixin" style="color: #6ccc4e;font-size: 116rpx;"></view>
					</button>
					<!-- #endif -->

					<!-- #ifdef H5 -->
					<button class="image-block" style="background: #ffffff;" @click="h5PinTuanShareFn">
						<view class="iconfont icon-weixin" style="color: #6ccc4e;font-size: 116rpx;"></view>
					</button>
					<!-- #endif -->

					<view class="progress-text">
						邀请好友进度
						<text>{{ tuanBuyNum }}/{{ tuanNum }}</text>
					</view>
				</view>
			</view>
		</block>
		<block v-else>


			<!-- 登录框组件 -->
			<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="loadFn" @close="closeGlobalLoginFn" is-show-exit></login-fn>

			
		</block>
		<loading-css :is-show="isShowLoading"></loading-css>
	</view>
</template>

<script>
import {
    mapState
} from 'vuex'

import timeCountDown from '@/df-components/time-count-down/pintuan';
import { checkTypeFn, assertObject, assertArray } from '@/tools/tools';
import { bindMobileTips } from '@/tools/const.js';


let timer;
export default {
	components: {
		timeCountDown
	},
	data() {
		return {
			isShowLoading: true, // 开屏动画
			isShowShareModal: false, // 控制 显示隐藏 发起拼团模态框

			id: null, // 查询的id
			gbId: null, // 团id
			progressList: [], // 进度条信息
			likeTitle: '', // 猜你喜欢 展示 文字标题
			likeGoodsList: [], // 猜你喜欢的商品列表
			tuanEndTime: 0, // 团失效时间戳
			tuanStartTime: 0, // 开团的时间

			titleStr: '', // 开团标题文字展示
			descriptionStr: '', // 开团标题下的描述信息

			tuanStatusID: 0, // 团状态id  //-1--待支付  0--邀请参团  1--已失效  2--团已成立，商品券待使用  3--券已使用

			goodsName: '', // 商品名称
			goodsId: null, // 商品id
			goodsOriginalImg: '', // 商品缩略图
			goodsRemark: '', // 商品描述
			goodsPrice: '', // 商品价格
			goodsOrdId: '', // 订单id
			Platform: '', // 支付平台
			payType: '', // 支付类型

			tuanItemList: [], // 团成员列表
			btnIsStatus: 1, // 按钮状态 1邀请   0参团
			tuanNum: 0, // 拼团总共需要xx人
			tuanBuyNum: 0, // 本团还差xx人就可以拼团成功

			timeArr: [], // 顶部显示时间 的参数
			options: {}, // 页面options参数

			// ↓↓↓ 多规格相关数据 --------------------------------------------------------
			isSpec: false, // 是否是多规格
			currentgoodsId: 0, // 规格id
			specKeyStr: '', // 多规格 商品 已选规格字符串
			// ↑↑↑ 多规格相关数据 --------------------------------------------------------
			loginBoxFlag:false, // 登录框显示隐藏状态

		};
	},
	onLoad(options) {
		this.options = options;
		console.log('团详情页面options参数', options);
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
		that.loadFn();

	},
	onUnload() {
		clearInterval(timer);
	},
	methods: {
		// app 拼团分享
		appPinTuanShareFn() {
			let that = this;
			that.shareAppFn({
				path: '/packageA/pintuan/me',
				query: {
					scene: true,
					id: that.gbId
				},
				options: {
					title: `还差${that.tuanBuyNum}人! 快来团购${that.goodsName}`,
					imageUrl: that.goodsOriginalImg
				}
			});
		},

		// #ifdef H5
		// h5拼团执行
		h5PinTuanShareFn() {
			let that = this;
			const shareUrlStr = `${location.origin}${location.pathname}${location.hash}&shareFn=true&scene=${
				that.userInfoEncrypt
			}`;
			that.copyStrFn(shareUrlStr, () => {
				uni.showToast({
					icon: 'success',
					title: '成功复制拼团链接'
				});
				that.setShareModuleFn(false);
			});
			/* 
			if (that.globalBrowserIsWx) {
				// 公众号 基于微信浏览器环境
				
			} else {
				// 普通浏览器
			}
			 */
		},
		// #endif

		// 页面加载后执行的函数
		loadFn() {
			let that = this;
			if (!that.isLogin) {
				// 如果没登录 弹框提示登录
				that.closeGlobalLoginFn(true);
				that.isShowLoading = false;
			} else {
				if (that.options.shareFn) {
					that.setSharerStrFn_btn(that.options);
				}
				// that.gbId = that.options.gb_id;
				that.id = that.options.id;
				that.getGroupOrderDetailFn();
			}
		},
		// 已拼成功 去使用
		async toUseFn() {
			let that = this;
			
			
			// 未绑定手机号不能操作以下功能
			if(!that.isRunBindMobileFunc){
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						e.confirm && that.navigateToFn({url: `/packageA/tel-login/user-info`});
					},
				})
				return false;
			}
			
			uni.showLoading({});

			// 商品加入购物车 并跳转
			let goodsId = that.goodsId;
			let result = await that.addShoppingCartFn(goodsId, 1, that.currentgoodsId);

			uni.hideLoading();

			if (result.type == 'success') {
				that.navigateToFn({
					isTab: true,
					url: `/pages/cart/cart`
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: result.msg
				});
				return false;
			}
		},
		// 获取团 详情 信息
		async getGroupOrderDetailFn() {
			let that = this;
			let data = {}; // 给后台发送 的数据

			let options = assertObject(that.options);
			if (options.shareFn) {
				data.share_id = that.id;
			} else {
				data.gb_id = that.id;
			}
			console.log('给后台发送的参数', data);

			let result = await that.$request({
				url: '/api/ordergroup/group_order_detail',
				data
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data); // 接口返回的大对象

					that.btnIsStatus = resultObj.is; // 按钮状态 1邀请   0参团

					let detailObj = assertObject(resultObj.detail); // 返回结果的商品详情

					that.tuanStartTime = detailObj.start_time; // 开团的时间
					that.tuanEndTime = detailObj.end_time; // 团失效时间戳
					that.titleStr = detailObj.status; // 开团标题文字展示
					that.descriptionStr = detailObj.desc; // 开团标题下的描述信息
					that.tuanStatusID = detailObj.statusID; // 团状态id  //-1--待支付  0--邀请参团  1--已失效  2--团已成立，商品券待使用  3--券已使用
					that.goodsName = detailObj.goods_name; // 商品名称
					that.goodsOriginalImg = detailObj.original_img; // 商品缩略图
					that.goodsRemark = detailObj.goods_remark; // 商品描述
					that.goodsPrice = detailObj.price; // 商品价格
					that.goodsOrdId = detailObj.ord_id; // 订单id
					that.Platform = detailObj.Platform; // 支付平台
					that.payType = detailObj.pay_type; // 支付类型

					that.gbId = detailObj.gb_id; // 团id

					// that.id = detailObj.id; // 查询的id

					that.goodsId = detailObj.goods_id; // 商品id
					that.tuanItemList = assertArray(detailObj.headimgurl).map(item => {
						item.headimgurl = that.addimgPathHostFn(item.headimgurl);
						return item;
					}); // 团成员列表
					that.tuanNum = detailObj.num; // 拼团总共需要xx人
					that.tuanBuyNum = detailObj.buy_num; // 本团还差xx人就可以拼团成功

					// 多规格 相关

					let specId = detailObj.spec_id;

					if (specId != 0) {
						that.isSpec = true; // 是否是多规格
						that.currentgoodsId = specId;
					} else {
						that.isSpec = false;
						that.currentgoodsId = 0;
					}
					that.specKeyStr = detailObj.spec_name; // 多规格 商品 已选规格字符串

					let progressList = assertArray(resultObj.jdt); // 进度条信息
					that.progressList = progressList;

					let likeObj = assertObject(resultObj.like); // 猜你喜欢的数据
					let likeTitle = likeObj.name; // 猜你喜欢 展示 文字标题
					let likeGoodsList = assertArray(likeObj.value); // 猜你喜欢的商品列表
					that.likeTitle = likeTitle;
					that.likeGoodsList = likeGoodsList;

					that.setTimeFn();
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
			console.log('团 详情接口返回的数据', result);

			that.isShowLoading = false;
		},
		// 定时器赋值
		setTimeFn() {
			let that = this;
			clearInterval(timer);
			that.setTimeRunFn();
			timer = setInterval(() => {
				that.setTimeRunFn();
			}, 1000);
		},
		// 真正在干活的函数
		setTimeRunFn() {
			let that = this;
			let time = that.tuanEndTime;
			if (time * 1000 < new Date().getTime()) {
				that.timeArr = ['00', '00', '00'];
				return false;
			}
			let stamp = time * 1000 - new Date().getTime();
			let miao = Math.floor(stamp / 1000);
			that.timeArr = [
				that.timeZero(Math.floor(miao / 3600)),
				that.timeZero(Math.floor(miao / 60) % 60),
				that.timeZero(miao % 60)
			];
		},
		// 设置分享模态框显示隐藏
		setShareModuleFn(flag) {
			this.isShowShareModal = flag;
		},

		// 立即参团
		payFn() {
			let that = this;
			// 未绑定手机号不能操作以下功能
			if(!that.isRunBindMobileFunc){
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						e.confirm && that.navigateToFn({url: `/packageA/tel-login/user-info`});
					},
				})
				return false;
			}
			/*
					商品id
					商品图片地址
					商品名字
					商品描述
					商品拼团价格
				*/

			let pintuanInfo = {
				goods_id: that.goodsId,
				original_img: that.goodsOriginalImg,
				goods_name: that.goodsName,
				goods_remark: that.goodsRemark,
				shop_price: that.goodsPrice,
				gb_id: that.gbId,

				isSpec: that.isSpec,
				currentgoodsId: that.currentgoodsId,
				currentgoodsPinPrice: that.goodsPrice,
				specKeyStr: that.specKeyStr
			};
			uni.setStorageSync('pintuanInfo', pintuanInfo);

			that.navigateToFn({
				url: `/pages/order/pintuan`
			});
		},
		async toPayFn() {
			let that = this;
			let payRes = await that.$request({
				method: 'post',
				url: '/api/pay/pay',
				data: {
					ord_id: that.goodsOrdId,
					Platform: that.Platform,
					type: that.payType
				}
			});

			// 跳详情
			if (that.payType == 'balance') {
				// 刷新详情
				that.loadFn();
				return false;
			}

			if (payRes.statusCode == 200) {
				if (payRes.data.code == 200) {
					// 支付
					let payOptions = JSON.parse(payRes.data.data);

					uni.requestPayment({
						...payOptions,
						success(e) {
							console.log('成功', e);
							// 刷新详情
							that.loadFn();
						},
						fail(e) {
							return;
							console.log('失败！！！！', e);
							uni.showModal({
								showCancel: false, //不显示取消按钮
								title: '支付失败',
								success(e) {
									//确认后的回调
									// that.toBackFn()
								}
							});
						}
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: payRes.data.msg
					});
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		}
	},
	computed: {
		/*
				@description 检测当前时间 是否 在结束时间之内
				@return <Boolean>
					true 代表有效
					false 代表不在拼团时间之内了
			*/
		checkTimer() {
			return Math.floor(new Date().getTime() / 1000) < this.tuanEndTime;
		},
		// 当前团的 进度 索引
		progressAct() {
			let that = this;
			let act = 0;
			that.progressList.forEach(item => {
				if (item.is == 1) {
					act++;
				}
			});
			act = act - 1 < 0 ? 0 : act - 1;
			return act;
		},
		// 返回 进度条 整理好的 数组信息
		progressBarArr() {
			let that = this;
			return that.progressList.map(item => {
				return {
					title: item.name
				};
			});
		},
		/*
				@description 根据团类型 判断是否要显示顶部的倒计时
				@return <Boolean>
					true 代表 显示顶部倒计时组件
					false 代表 不显示顶部倒计时组件
			*/
		isShowTopTimer() {
			let tuanStatusID = this.tuanStatusID;
			if (tuanStatusID == 1 || tuanStatusID == 2 || tuanStatusID == 3) {
				return false;
			}
			return true;
		},
		...mapState({
			userInfoEncrypt: store => store.userInfo.userInfoEncrypt, // 加密字符串
		})
	},
	onShareAppMessage() {
		let that = this;
		return that.shareFn({
			path: '/packageA/pintuan/me',
			query: {
				scene: true,
				id: that.gbId
			},
			options: {
				title: `还差${that.tuanBuyNum}人! 快来团购${that.goodsName}`,
				imageUrl: that.goodsOriginalImg
			}
		});
	}
};
</script>

<style lang="scss" scoped>
.page {
	background: #ffffff;
}

.time-block {
	position: fixed;
	z-index: 200;
	top: 0;
	width: 100%;
	height: 88rpx;
	overflow: hidden;
	@include flex-center;

	image {
		width: 154rpx;
		height: 88rpx;
		position: absolute;
		top: 0;
		left: 0;
	}
}

.success-block {
	padding-bottom: 55rpx;

	.tip-title {
		color: #ff6128;
		font-size: 36rpx;
		font-weight: 600;
		line-height: 116rpx;
		text-align: center;
	}

	.tip-num {
		line-height: 100rpx;
		font-size: 26rpx;
		color: $grey2-color;
		text-align: center;

		text {
			color: #ff6128;
		}
	}

	.user-image-block {
		text-align: center;
		margin-top: 30rpx;
		margin-bottom: 40rpx;

		.user-image {
			margin: 20rpx;
			display: inline-block;
			width: 100rpx;
			height: 100rpx;

			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
	}

	.share-btn {
		@include btn-green;
	}
}

.line-tip {
	text-align: center;
	font-size: 23rpx;
	color: $grey2-color;
	line-height: 64rpx;
	background: $bg-grey-color;
}

.pintuan-info-block {
	.line-block {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		border-bottom: 1px solid #f8f8f8;

		.left-tip-text {
			font-size: 26rpx;
			color: $grey2-color;
		}

		.right-tip-text {
			font-size: 26rpx;
			color: $grey1-color;

			.text {
				display: inline-block;
				max-width: 20em;
				@include text-ellipsis;
			}
		}
	}

	.progress-bar-block {
		margin-top: 40rpx;
	}
}

.do-you-like-block {
	background: $bg-grey-color;

	.tip-title {
		font-weight: 600;
		font-size: 26rpx;
		color: $grey1-color;
		text-align: center;
		line-height: 88rpx;
	}

	.item {
		display: inline-block;
		margin-right: 20rpx;
		margin-bottom: 20rpx;

		&:nth-child(2n) {
			margin-right: 0;
		}

		position: relative;
		width: 340rpx;
		height: 540rpx;
		background: #ffffff;

		.goods-image-block {
			width: 342rpx;
			height: 320rpx;
			@include flex-center;

			image {
				width: 310rpx;
				height: 310rpx;
			}
		}

		.goods-name,
		.goods-description,
		.price-wrap,
		.num-block {
			margin-left: 20rpx;
		}

		.goods-name {
			max-width: 8em;
			@include text-ellipsis;
			font-weight: 600;
			line-height: 64rpx;
			height: 64rpx;
			font-size: 30rpx;
			color: $grey1-color;
		}

		.goods-description {
			max-width: 12em;
			@include text-ellipsis;
			font-size: 25rpx;
			color: $grey2-color;
			height: 1.4em;
		}

		.price-wrap {
			height: 66rpx;
			display: flex;
			align-items: center;
			@include shop-price-block-lr;

			.tag-block {
				margin-left: 0.5em;
			}
		}

		.num-block {
			font-size: 24rpx;
			color: $grey2-color;
		}

		.pintuan-btn {
			width: 68rpx;
			height: 68rpx;
			position: absolute;
			right: 20rpx;
			bottom: 34rpx;
			font-weight: 600;
			@include flex-center;
			font-size: 36rpx;
			color: #ffffff;
		}
	}
}

.share-modal-block {
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: 300;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	// transition: .2s;
	background: rgba(0, 0, 0, 0.6);

	&.showShareModal {
		top: 0;
	}

	&.hideShareModal {
		top: 100vh;
	}

	.cancel-block {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		flex: 1;

		view {
			line-height: 112rpx;
			color: #ffffff;
			font-size: 36rpx;
		}
	}

	.share-btn-block {
		height: 425rpx;
		padding-top: 54rpx;
		background: #ffffff;

		.tip-title {
			font-weight: 600;
			font-size: 36rpx;
			color: $grey1-color;
			line-height: 75rpx;
			text-align: center;

			text {
				color: #ff6128;
			}
		}

		.image-block {
			height: 200rpx;
			@include flex-center;

			image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
		}

		.progress-text {
			text-align: center;
			font-size: 23rpx;
			font-weight: 600;
			color: $grey1-color;

			text {
				color: #ff6128;
			}
		}
	}
}
</style>
