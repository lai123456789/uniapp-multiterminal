<template>
	<view>
		<loading-image :is-show-gif="isShowGif"></loading-image>
		<!-- <back-btn></back-btn> -->
		<goods-detail-swiper
			:goods-video-src="videoStrStr"
			:swiper-img-arr="swiperImgArr"
			page-type="jifen"
		></goods-detail-swiper>

		<!-- 商品 描述↓↓↓ -->
		<view class="goods-description-block">
			<view class="content-wrap">
				<view class="goods-name-share">
					<view class="goods-name">{{ detailGoodsName }}</view>
					<view class="share-btn">
						<share-code-img
							:goods-id="goodsId"
							:goods-name="detailGoodsName"
							:goods-imgs="swiperImgArr"
							:goods-price="detailGoodsShopExchangeScore"
							goods-type="jifen"
							path="packageB/goods-detail/jifen-goods-detail"
						></share-code-img>
					</view>
				</view>
				<view class="goods-description">{{ detailGoodsRemark }}</view>
				<view class="jifen" :style="{ color: configInfo.web_site_color }">
					<text>{{ detailGoodsShopExchangeScore }}</text>
					积分
				</view>
			</view>
		</view>

		<!-- 商品详情 ↓↓↓ -->
		<view class="detail-row">
			<view class="content-wrap">
				<view class="title-block"><view :class="['title-btn']">商品详情</view></view>
				<view class="detail-block"><rich-text :nodes="detailGoodsContent"></rich-text></view>
			</view>
		</view>

		<!-- ↓↓ 商品详情页面 展示 评论组件 -->
		<comment
			:goods-id="goodsId"
			:comment-name="goodsCommentName"
			:comment-sum="goodsCommentSum"
			:comment-scale="goodsCommentScale"
			:comment-list="goodsCommentArr"
		></comment>

		<!-- 商品详情页面 商家承诺 和 价格说明组件  -->
		<seller-promise-price-show :seller-promise="promisesNodes" :price-show="priceMean"></seller-promise-price-show>

		<!-- ↓↓↓ 轮播平台售卖记录组件 -->
		<play-buy-history :page-is-show="pageShowFlag" page="detail"></play-buy-history>

		<goods-spec
			:is-show="isShowGoodsSpec"
			:goods-spec-rows-list="goodsSpecRowsList"
			:goods-spec-select-item-list="goodsSpecSelectItemList"
			:goods-name="detailGoodsName"
			:goods-description="detailGoodsRemark"
			:goods-images="swiperImgArr[0]"
			:goods-id="goodsId"
			page="jifen-page"
			@setGoodsSpec="setGoodsSpec"
			@setSpecFilterItemActiveFn="setSpecFilterItemActiveFn"
			@commitSpec="commitSpec"
		></goods-spec>

		<view class="lijiduihuan" @click="$onceClick(lijiduihuan)" :style="{ background: configInfo.web_site_color }">
			立即兑换
		</view>
		<view style="height: 96rpx;"></view>

		<to-top-btn :flag="isShowToTopBtn"></to-top-btn>
		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn"></login-fn>

	</view>
</template>

<script>
// #ifdef H5
import jweixinModule from '@/tools/libs/jweixin-module.js';
// #endif
import { success, error,bindMobileTips } from '@/tools/const.js';


import loadingImage from '@/df-components/loading-image';
import shareCodeImg from '@/df-components/share-code-img/share-code-img';
import comment from '@/packageB/goods-detail/goods-detail-components/comment.vue'; // 商品详情页面 展示 评论组件
import sellerPromisePriceShow from '@/packageB/goods-detail/goods-detail-components/seller-promise-price-show.vue'; // 商品详情页面 商家承诺 和 价格说明组件

import backBtn from '@/packageB/goods-detail/goods-detail-components/back-btn.vue'; // 左上角 返回上一页的 按钮
import goodsDetailSwiper from '@/packageB/goods-detail/goods-detail-components/goods-detail-swiper.vue'; // 详情页的 头部轮播图组件 + 视频播放
import playBuyHistory from '@/df-components/global-components/play-buy-history.vue'; // 轮播平台售卖记录组件

import {
	goodsDetailWidthFn,
	assertArray,
	assertObject,
	assertString,
	cloneFn,
	addSpecFilterItemActAttrFn
} from '@/tools/tools';

let videoContext;
export default {
	components: {
		loadingImage,
		shareCodeImg,
		comment,
		sellerPromisePriceShow,
		backBtn,
		goodsDetailSwiper,
		playBuyHistory
	},
	data() {
		return {
			isShowGif: true, // 是否显示开屏动画
			goodsId: null, //商品id

			swiperImgArr: [], // 轮播图的图片数组

			// 商品信息↓↓
			detailGoodsName: '', // 商品名字
			detailGoodsRemark: '', // 商品描述
			detailGoodsContent: '', // 商品详情
			detailGoodsShopExchangeScore: 0, // 商品积分
			detailGoodsUnit: '', // 商品单位
			detailGoodsTag: '', // 商品标签

			videoStrStr: '', // 商品的视频连接地址
			
			
			shareTitle:'', // 分享标题
			shareImage:'', // 分享图片
			
			

			promisesNodes: '', //商家承诺
			priceMean: '', //价格说明
			

			// 商品评价↓↓
			goodsCommentSum: '', //商品的总和
			goodsCommentName: '', //名字
			goodsCommentScale: '', //百分比
			goodsCommentArr: [], //数据列表
			pageShowFlag: false, // 当前页面是否show

			// ↓↓↓ 多规格相关数据 --------------------------------------------------------
			isShowGoodsSpec: false, // 是否显示多规格弹框
			isSpec: false, // 当前商品是否是多规格商品
			goodsSpecSelectItemList: [{}], // 多规格项
			goodsSpecRowsList: {}, // 多规格 笛卡尔积项对应的 商品 信息
			// ↑↑↑ 多规格相关数据 --------------------------------------------------------
			loginBoxFlag:false, // 登录框显示隐藏状态
		};
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
		that.getGoodsInfoFn();
		that.pageShowFlag = true;
	},
	onHide() {
		this.pageShowFlag = false;
		this.hideAllFn();
	},
	onLoad(option) {
		let that = this;
		if (option.scene && !option.shareFn) {
			that.setSharerStrFn(option.scene);
			let searchArr = decodeURIComponent(option.scene).split(',');
			option.goods_id = searchArr[1];
			// console.log(searchArr, '解码后的东西', '\n', option.scene, '打印 option.scene', '\n');
		}

		if (option.shareFn) {
			that.setSharerStrFn_btn(option);
		}

		that.goodsId = option.goods_id;
	},
	// 分享
	onShareAppMessage() {
		let that = this;
		return that.shareFn({
			path: '/packageB/goods-detail/jifen-goods-detail',
			query: {
				scene: true,
				goods_id: that.goodsId
			},
			options: {
				
				
				title: that.shareTitle?that.shareTitle:that.detailGoodsName,
				imageUrl: that.shareImage?that.shareImage:that.swiperImgArr[0]
				
			}
		});
	},
	methods: {
		refreshFn() {
			this.getGoodsInfoFn();
		},
		//根据id获取商品详细信息
		async getGoodsInfoFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/Goods/goods_detail',
				data: {
					goods_id: that.goodsId,
					type: 'integral'
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultData = assertObject(result.data.data);
					
					
					

					let resultDataDetail = assertObject(resultData.detail);
					
					
					// 单个商品分享图文配置
					that.shareTitle = resultDataDetail.share_title;
					that.shareImage = resultDataDetail.share_img;
					
					

					// 赋值轮播图的数据
					that.swiperImgArr = assertArray(resultDataDetail.images);

					that.videoStrStr = resultDataDetail.video;

					// 赋值商品信息↓↓↓
					// 商品名字
					that.detailGoodsName = resultDataDetail.goods_name;
					// 商品描述
					that.detailGoodsRemark = resultDataDetail.goods_remark;

					// 商品详情
					that.detailGoodsContent = goodsDetailWidthFn(assertString(resultDataDetail.goods_content)); // 把商品的详情图片添加样式是100%宽
					// 商品积分
					that.detailGoodsShopExchangeScore = resultDataDetail.exchange_score;
					// 商品单位
					that.detailGoodsUnit = resultDataDetail.unit;
					// 商品tag 3是vip
					that.detailGoodsTag = resultDataDetail.tag;

					// 多规格相关--------------------------------------------------------
					let isSpec = resultDataDetail.is_guige == 1;
					if (isSpec) {
						let spec = assertObject(resultDataDetail.spec);
						that.goodsSpecSelectItemList = addSpecFilterItemActAttrFn(assertArray(spec.filter_spec)); // 多规格项
						that.goodsSpecRowsList = assertObject(spec.spec_goods_price); // 多规格 笛卡尔积项对应的 商品 信息
					} else {
						that.goodsSpecSelectItemList = []; // 多规格项
						that.goodsSpecRowsList = {}; // 多规格 笛卡尔积项对应的 商品 信息
					}
					that.isSpec = isSpec;

					// 赋值商品评论数据↓↓
					let resultDataGoodsComment = assertObject(resultData.goods_comment); // 评论相关数据

					that.goodsCommentArr = [assertObject(resultDataGoodsComment.value)]; //数据列表

					that.goodsCommentName = resultDataGoodsComment.name; //名字
					that.goodsCommentScale = resultDataGoodsComment.scale; //百分比

					// 商家承诺
					that.promisesNodes = goodsDetailWidthFn(assertString(resultDataDetail.promises)); // 把商品价格说明图片添加样式是100%宽

					// 价格说明
					that.priceMean = goodsDetailWidthFn(assertString(resultDataDetail.price_mean)); // 把商品的平台承诺图片添加样式是100%宽
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
			that.isShowGif = false;
			// #ifdef H5
			that.jweixinModuleReadyFn();
			// #endif
		},
		// 选好 多规格 开始提交订单购买
		async commitSpec(e) {
			let that = this;
			console.log('commitSpec emit事件数据', e);
			//没有登录就弹框
			if (!that.isLogin) {
				that.closeGlobalLoginFn(true);
				return false;
			}
			let info = JSON.stringify({
				isSpec: that.isSpec,
				goods_id: that.goodsId,
				original_img: that.swiperImgArr[0],
				goods_name: that.detailGoodsName,
				goods_remark: that.detailGoodsRemark,
				exchange_score: that.detailGoodsShopExchangeScore,

				currentgoodsId: e.currentgoodsId,
				currentgoodsJifen: e.currentgoodsJifen,
				specKeyStr: e.specKeyStr
			});

			that.setGoodsSpec(false);

			// #ifdef MP-WEIXIN
			let userLocationInfo = await that.settingInfoFn('scope.userLocation'); // 用户授权位置信息
			console.log('用户授权位置信息 userLocationInfo', userLocationInfo);

			if (userLocationInfo.type == 'success') {
				if (userLocationInfo.isFirst) {
					let locationInfo = await that.getLocationInfoFn();
					console.log('locationInfo 获取位置', locationInfo);
					return false;
				} else {
					if (userLocationInfo.isOk) {
						let locationInfo = await that.getLocationInfoFn();
						console.log('locationInfo 获取位置', locationInfo);

						if (locationInfo.type == 'success') {
							uni.setStorageSync('cartAddress', {
								latitude: locationInfo.result.latitude,
								longitude: locationInfo.result.longitude
							});
						} else {
							that.navigateToFn({
								url: `/packageA/set-address-page/index`
							});
							return false;
						}
					} else {
						that.navigateToFn({
							url: `/packageA/set-address-page/index`
						});
						return false;
					}
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: userLocationInfo.msg
				});
				return false;
			}
			// #endif

			// #ifdef APP-PLUS

			let locationInfo = await that.getLocationInfoFn();
			console.log('locationInfo 获取位置', locationInfo);
			if (locationInfo.type == 'success') {
				uni.setStorageSync('cartAddress', {
					latitude: locationInfo.result.latitude,
					longitude: locationInfo.result.longitude
				});
			} else {
				that.navigateToFn({
					url: `/packageA/set-address-page/index`
				});
				return false;
			}

			uni.setStorageSync('cartAddress', {
				latitude: locationInfo.result.latitude,
				longitude: locationInfo.result.longitude
			});

			// #endif

			// #ifdef H5
			let locationInfo = await that.getLocationInfoFn();
			uni.setStorageSync('cartAddress', {
				latitude: locationInfo.result.latitude,
				longitude: locationInfo.result.longitude
			});
			// #endif

			that.navigateToFn({
				checkLogin: true,
				url: `/pages/order/jifenduihuan?info=${info}`
			});
		},

		async lijiduihuan() {
			let that = this;
			//没有登录就弹框
			if (!that.isLogin) {
				that.closeGlobalLoginFn(true);
				return false;
			}
			
			
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
			
			if (that.isSpec) {
				that.isShowGoodsSpec = true;
				return false;
			}

			// 获取当前经纬度
			// #ifdef MP-WEIXIN
			let userLocationInfo = await that.settingInfoFn('scope.userLocation'); // 用户授权位置信息
			console.log('用户授权位置信息 userLocationInfo', userLocationInfo);

			if (userLocationInfo.type == 'success') {
				if (userLocationInfo.isFirst) {
					let locationInfo = await that.getLocationInfoFn();
					console.log('locationInfo 获取位置', locationInfo);
					return false;
				} else {
					if (userLocationInfo.isOk) {
						let locationInfo = await that.getLocationInfoFn();
						console.log('locationInfo 获取位置', locationInfo);

						if (locationInfo.type == 'success') {
							uni.setStorageSync('cartAddress', {
								latitude: locationInfo.result.latitude,
								longitude: locationInfo.result.longitude
							});
						} else {
							that.navigateToFn({
								url: `/packageA/set-address-page/index`
							});
							return false;
						}
					} else {
						that.navigateToFn({
							url: `/packageA/set-address-page/index`
						});
						return false;
					}
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: userLocationInfo.msg
				});
				return false;
			}
			// #endif

			// #ifdef APP-PLUS

			let locationInfo = await that.getLocationInfoFn();
			console.log('locationInfo 获取位置', locationInfo);
			if (locationInfo.type == 'success') {
				uni.setStorageSync('cartAddress', {
					latitude: locationInfo.result.latitude,
					longitude: locationInfo.result.longitude
				});
			} else {
				that.navigateToFn({
					url: `/packageA/set-address-page/index`
				});
				return false;
			}

			uni.setStorageSync('cartAddress', {
				latitude: locationInfo.result.latitude,
				longitude: locationInfo.result.longitude
			});

			// #endif

			// #ifdef H5
			let locationInfo = await that.getLocationInfoFn();
			uni.setStorageSync('cartAddress', {
				latitude: locationInfo.result.latitude,
				longitude: locationInfo.result.longitude
			});
			// #endif

			that.hideAllFn();
			uni.showLoading({});

			let info = JSON.stringify({
				goods_id: that.goodsId,
				original_img: that.swiperImgArr[0],
				goods_name: that.detailGoodsName,
				goods_remark: that.detailGoodsRemark,
				exchange_score: that.detailGoodsShopExchangeScore
			});
			that.navigateToFn({
				checkLogin: true,
				url: `/pages/order/jifenduihuan?info=${info}`
			});
		},

		// ↓↓↓ 多规格相关方法 --------------------------------------------------------
		// 设置规格框的显示隐藏
		setGoodsSpec(bool) {
			let that = this;
			that.isShowGoodsSpec = bool;
			if (!bool) {
				that.goodsSpecSelectItemList = addSpecFilterItemActAttrFn(cloneFn(that.goodsSpecSelectItemList));
			}
		},
		// 选择规格项 改变展示 状态
		setSpecFilterItemActiveFn(arg) {
			let that = this;
			let { index, specFilterIndex } = arg;

			console.log('外部列表修改', index, specFilterIndex);

			let goodsSpecSelectItemList = cloneFn(that.goodsSpecSelectItemList);

			goodsSpecSelectItemList.forEach((item, inde) => {
				if (inde == index) {
					item.item.forEach((it, inx) => {
						if (inx == specFilterIndex) {
							it.active = true;
						} else {
							it.active = false;
						}
					});
				}
			});
			that.goodsSpecSelectItemList = goodsSpecSelectItemList;
		},
		// ↑↑↑ 多规格相关方法 --------------------------------------------------------
		// #ifdef H5
		// 微信公众号sdk分享
		async jweixinModuleReadyFn() {
			let that = this;
			console.log('jweixinModuleReadyFn run', that.isWeixn());
			if (!that.isWeixn()) {
				return false;
			}
			let result = await that.getGzhSignPackageFn();
			console.log('that.getGzhSignPackageFn', result);
			if (result.type == success) {
				let jweixin = result.result;
				jweixinModule.ready(function() {
					console.log('jweixinModule.ready', updateAppMessageShareDataOptions);

					let updateAppMessageShareDataOptions = {
						success() {
							console.log('success', e);
						}
					};
					updateAppMessageShareDataOptions.imgUrl = that.swiperImgArr[0];
					updateAppMessageShareDataOptions.desc = that.detailGoodsRemark;
					updateAppMessageShareDataOptions.title = that.detailGoodsName;

					let shareUrlStr = `${location.origin}${location.pathname}${location.hash}`;
					if (that.isLogin) {
						shareUrlStr += `&shareFn=true&scene=${that.userInfoEncrypt}`;
					}
					updateAppMessageShareDataOptions.link = shareUrlStr;

					console.log('updateAppMessageShareDataOptions', updateAppMessageShareDataOptions);

					jweixinModule.updateAppMessageShareData(updateAppMessageShareDataOptions);
				});

				jweixinModule.error(function(e) {
					console.log('jweixinModule.error', e);
				});

				jweixinModule.config({
					// debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: jweixin.appId, // 必填，公众号的唯一标识
					timestamp: jweixin.timestamp, // 必填，生成签名的时间戳
					nonceStr: jweixin.nonceStr, // 必填，生成签名的随机串
					signature: jweixin.signature, // 必填，签名
					jsApiList: ['updateAppMessageShareData'], // 必填，需要使用的JS接口列表
					success(res) {
						console.log('jweixinModule.config res', res);
					}
				});
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: e.msg
				});
			}
		}
		// #endif
	}
};
</script>

<style lang="scss" scoped>
.lijiduihuan {
	position: fixed;
	bottom: 0;
	width: 100vw;
	height: 96rpx;
	line-height: 96rpx;
	text-align: center;
	color: #ffffff;
	font-size: 35rpx;
}

.goods-description-block {
	.goods-name-share {
		display: flex;
		justify-content: space-between;
		.goods-name {
			flex: 1;
			margin-top: 30rpx;
			margin-bottom: 10px;
			line-height: 1.3em;
			font-size: 36rpx;
			font-weight: 600;
			color: $grey1-color;
		}
		.share-btn {
			width: 80rpx;
			padding-top: 30rpx;
		}
	}

	.goods-description {
		margin-top: 10rpx;
		margin-bottom: 20rpx;
		line-height: 34rpx;
		font-size: 25rpx;
		color: $grey2-color;
	}

	.jifen {
		margin-bottom: 20rpx;
		color: #6ccc4f;
		font-size: 30rpx;

		text {
			font-weight: 600;
			font-size: 36rpx;
		}
	}
}

.detail-row {
	border-top: 20rpx solid $bg-grey-color;
	.title-block {
		display: flex;
		height: 88rpx;
		.title-btn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: flex-start;
			position: relative;
			height: 88rpx;
			font-size: 40rpx;
			font-weight: 600;
			color: $grey1-color;
		}
	}
}
</style>
