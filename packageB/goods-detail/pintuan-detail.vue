<template>
	<view>
		<loading-image :is-show-gif="isShowGif"></loading-image>

		<!-- 商品轮播图↓↓↓ -->

		<block v-if="isLogin">
			<!-- <back-btn></back-btn> -->
			<goods-detail-swiper
				:goods-video-src="videoStrStr"
				:swiper-img-arr="swiperImgArr"
				page-type="pintuan"
			></goods-detail-swiper>
			<!-- 拼团规则↓↓↓ -->
			<view class="layout">
				<view class="layout-left" :style="{ background: configInfo.web_site_color }">
					<text style="font-size: 20rpx;">￥</text>
					<text style="font-size: 50rpx;font-weight: 700;">{{ detailGoodsPintuanPrice }}</text>
					<text style="margin-left: 20rpx;font-size: 30rpx;" v-if="detailGoodsSalesSum">
						{{ detailGoodsSalesSum }}人已经拼
					</text>
				</view>
				<view class="layout-right">
					<!-- <view style="width: 300rpx;height: 50rpx;font-size: 30rpx;">{{detailGoodsBeginTime| filterTime}}</view> -->
					<text style="font-size: 25rpx;font-weight: 600;">距结束时间</text>
					<view style="font-size: 25rpx;font-weight: 600;">{{ detailGoodsEndTime | filterTime }}</view>
				</view>
			</view>
			<!-- 商品 描述↓↓↓ -->
			<view class="goods-description-block">
				<view class="content-wrap" style="padding-bottom: .5em;">
					<view class="goods-name_share">
						<view class="goods-name">{{ detailGoodsName }}</view>
						<view class="share-btn">
							<share-code-img
								:goods-id="goodsId"
								:goods-name="detailGoodsName"
								:goods-imgs="swiperImgArr"
								:goods-price="detailGoodsPintuanPrice"
								goods-type="pintuan"
								path="packageB/goods-detail/pintuan-detail"
							></share-code-img>
						</view>
					</view>
					<view style="display: flex;justify-content: space-between;">
						<view class="goods-description">{{ detailGoodsRemark }}</view>
						<text class="goods-descriptions">{{ detailGoodsPinCount }}人拼团</text>
					</view>

					<view style="border-top:1px solid #e3e3e3;margin-top: 15rpx;"></view>
					<view style="display: flex; justify-content: space-between; margin-top: 10rpx;">
						<text style="font-size: 25rpx;">剩余：{{ detailGoodsstorecount }}</text>
						<text style="font-size: 25rpx;">销量：{{ detailGoodsSalesSum }}</text>
					</view>
				</view>
			</view>
			<view class="goods-block" v-if="pindanList.length">
				<view
					style=" width: 730rpx;height: 80rpx;line-height: 80rpx;display: flex;justify-content: space-between;"
				>
					<text class="list-table">{{ pindanTitle }}</text>
					<text class="list-tables" @click="setPintuanListModalFlagFn(true)">查看更多</text>
				</view>
				<view class="lines" style="border-top: 1px solid #e3e3e3;margin-left: 25rpx;"></view>
				<block v-for="(item, index) in pindanList" :key="index">
					<view style="display: flex;flex-direction: row;width: 750rpx;height: 116rpx;" v-if="index < 2">
						<!-- 数据拼接 -->
						<view class="info">
							<view class="info-userinfo">
								<image
									v-for="(img, imgIndex) in item.userInfo"
									:src="img.headimgurl"
									:style="{ zIndex: `${(imgIndex + 1) * 10}`, left: `${imgIndex * 30}rpx` }"
									class="info-style"
								></image>
							</view>
							<view class="Hide">{{ item | filterUserName }}</view>
						</view>
						<view class="center-time">
							<view class="content">
								<text>还差</text>
								<text style="color: #ff4444;">{{ item.diffNum }}</text>
								<text>人拼成</text>
								<view style="color: #afafaf;">{{ item.endTime | filterTime }}</view>
							</view>
							<view
								class="root-bottom"
								@click="
									navigateToFn({
										url: `/packageA/pintuan/me?id=${item.gdId}&shareFn=true&scene=${item.encrypt}`
									})
								"
							>
								去拼单
							</view>
						</view>
					</view>
				</block>
			</view>

			<!-- 推荐商品↓↓↓ -->
			<view class="goods-block">
				<view class="content-wrap">
					<view class="title">{{ hotName }}</view>
					<pintuan-scroll-slider :scroll-view-shop-list="hotGoodsArr"></pintuan-scroll-slider>
				</view>
			</view>

			<!-- 显示与隐藏 -->
			<view class="flex-center pintuan-list-modal" v-if="isShowPintuanListModalFlag">
				<view class="pintuan-list-box">
					<view class="close-btn" @click="setPintuanListModalFlagFn(false)"></view>
					<view class="title-text">可参与的拼团</view>
					<scroll-view scroll-y class="scroll-view-dom" @scrolltolower="scrolltolowerFn">
						<view class="pintuan-list">
							<view class="pintuan-user-info-item" v-for="(item, index) in pindanList" :key="index">
								<view class="user-img-block">
									<image
										v-for="(img, imgIndex) in item.userInfo"
										class="user-img"
										:src="img.headimgurl"
										:style="{ zIndex: `${(imgIndex + 1) * 10}`, left: `${imgIndex * 32}rpx` }"
									></image>
								</view>
								<view class="user-name-block">{{ item | filterUserName }}</view>
								<view
									class="root-bottom"
									@click="
										navigateToFn({
											url: `/packageA/pintuan/me?id=${item.gdId}&shareFn=true&scene=${
												item.encrypt
											}`
										})
									"
								>
									去拼单
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

			<!-- 商品详情 和 购买记录↓↓↓ -->
			<view class="detail-row">
				<view class="content-wrap">
					<view class="title-block"><view :class="['title-btn', '']">商品详情</view></view>
					<view class="detail-block"><rich-text :nodes="detailGoodsContent"></rich-text></view>
				</view>
			</view>

			<!-- 商品详情页面 商家承诺 和 价格说明组件  -->
			<seller-promise-price-show
				:seller-promise="promisesNodes"
				:price-show="priceMean"
			></seller-promise-price-show>

			<view style="height: 96rpx;"></view>

			<view class="start-pintuan-block">
				<view style="display: flex;justify-content: flex-start;">
					<view
						class="iconfont icon-fangzi bottom-left"
						@click="navigateToFn({ isTab: true, url: '/pages/index/index' })"
					>
						<text style="font-size: 20rpx;">首页</text>
					</view>
					<view
						class="iconfont icon-gouwuche2 bottom-right"
						@click="navigateToFn({ isTab: true, url: '/pages/cart/cart' })"
					>
						<text style="font-size: 20rpx;">购物车</text>
					</view>
				</view>
				<view class="shoping-type self" @click="selfBuyFn" style="background: #fcaf36;">
					<view class="price-wrap">
						<view class="shop-price-block-lr">
							<view class="origin-price">
								<text style="color: #FFFFFF;">¥{{ detailGoodsShopPrice }}</text>
							</view>
						</view>
					</view>
					<view class="tip-text" style="color: #FFFFFF;">单独购买</view>
				</view>

				<view class="shoping-type every-body" @click="payFn" :style="{ background: configInfo.web_site_color }">
					<view class="price-wrap">
						<view class="shop-price-block-lr">
							<view class="origin-price">
								<text>¥{{ detailGoodsPintuanPrice }}</text>
							</view>
						</view>
					</view>
					<view class="tip-text">发起拼团</view>
				</view>
			</view>

			<float-icon
				:scroll-is-stop="mixinScrollIsStop"
				icon-class="icon-kefu1"
				title-text="客服"
				@click.native="navigateToFn({ url: '/packageA/kefu/kefu' })"
			></float-icon>

			<!-- ↓↓↓ 轮播平台售卖记录组件 -->
			<play-buy-history :page-is-show="pageShowFlag" page="detail"></play-buy-history>
		</block>

		<block v-else>
			<!-- 登录框组件 -->
			<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn" is-show-exit></login-fn>

			
		</block>

		<goods-spec
			:is-show="isShowGoodsSpec"
			:goods-spec-rows-list="goodsSpecRowsList"
			:goods-spec-select-item-list="goodsSpecSelectItemList"
			:goods-name="detailGoodsName"
			:goods-description="detailGoodsRemark"
			:goods-images="swiperImgArr[0]"
			:goods-id="goodsId"
			page="pintuan-page"
			@setGoodsSpec="setGoodsSpec"
			@setSpecFilterItemActiveFn="setSpecFilterItemActiveFn"
			@commitSpec="commitSpec"
		></goods-spec>
	</view>
</template>

<script>
// #ifdef H5
import jweixinModule from '@/tools/libs/jweixin-module.js';
// #endif
import { success, error, bindMobileTips } from '@/tools/const.js';

import pintuanScrollSlider from './pintuan-detail-components/pintuan-scroll-slider';
import loadingImage from '@/df-components/loading-image';
import shareCodeImg from '@/df-components/share-code-img/share-code-img';
import backBtn from '@/packageB/goods-detail/goods-detail-components/back-btn.vue'; // 左上角 返回上一页的 按钮
import goodsDetailSwiper from '@/packageB/goods-detail/goods-detail-components/goods-detail-swiper.vue'; // 详情页的 头部轮播图组件 + 视频播放
import sellerPromisePriceShow from '@/packageB/goods-detail/goods-detail-components/seller-promise-price-show.vue'; // 商品详情页面 商家承诺 和 价格说明组件
import playBuyHistory from '@/df-components/global-components/play-buy-history.vue'; // 轮播平台售卖记录组件

import {
	calcOverTime,
	goodsDetailWidthFn,
	assertArray,
	assertObject,
	assertString,
	addSpecFilterItemActAttrFn,
	cloneFn,
	timeStamp2timeText
} from '@/tools/tools';
import { handleDataFn } from '@/packageB/goods-detail/pintuan-detail-tool.js';


export default {
	components: {
		pintuanScrollSlider,
		loadingImage,
		shareCodeImg,
		backBtn,
		goodsDetailSwiper,
		sellerPromisePriceShow,
		playBuyHistory
	},
	data() {
		return {
			isShowGif: true, // 是否显示开屏动画
			goodsId: null, //商品id
			page: 1,
			swiperImgArr: [], // 轮播图的图片数组

			// 商品信息↓↓
			detailGoodsName: '', // 商品名字
			detailGoodsRemark: '', // 商品描述
			detailGoodsContent: '', // 商品详情
			detailGoodsShopPrice: '', // 商品价格
			detailGoodsPintuanPrice: '', // 商品拼团价格
			detailGoodsPinCount: 0, // 几人成团
			detailGoodsSalesSum: 0, // 几人已拼成
			detailGoodsstorecount: 0, //剩余库存
			detailGoodsBeginTime: 0, //开始时间
			detailGoodsEndTime: 0, //结束时间

			videoStrStr: '', // 商品的视频连接地址

			shareTitle: '', // 分享标题
			shareImage: '', // 分享图片

			promisesNodes: '', //商家承诺
			priceMean: '', //价格说明

			// 热门拼团↓↓
			hotGoodsArr: [], //热门拼团列表数据
			hotName: '', //热门拼团标题文字

			templateId: [], // 模板id

			// 待成团列表数据
			pindanTitle: '', // 标题文字
			pindanList: [], // 拼团中列表数据

			isShowPintuanListModalFlag: false, // 是否显示拼团中列表弹框
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
	onLoad(option) {
		let that = this;
		
		if (option.scene && !option.shareFn) {
			that.setSharerStrFn(option.scene);
			let searchArr = decodeURIComponent(option.scene).split(',');
			option.id = searchArr[1];
			console.log(searchArr, '解码后的东西', '\n', option.scene, '打印 option.scene', '\n');
		}
		if (option.shareFn) {
			that.setSharerStrFn_btn(option);
		}
		
		that.goodsId = option.id;
		
		console.log('that.goodsId',that.goodsId);
		that.getMore();
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});


		that.isShowGif = true;
		that.pageShowFlag = true;
		if (!that.isLogin) {
			that.closeGlobalLoginFn(true);
			that.isShowGif = false;
		} else {
			that.getGoodsDetailFn();
		}
	},
	onHide() {
		this.pageShowFlag = false;
	},

	methods: {
		refreshFn() {
			let that = this;
			that.isShowGif = true;
			that.getGoodsDetailFn();
		},
		scrolltolowerFn() {
			let that = this;
			that.page++;
			that.hideAllFn();
			uni.showLoading({});
			that.getMore(pindanList => {
				that.hideAllFn();
			});
		},

		// 拼团弹框列表 滑动到底部执行的函数
		onPullDownRefresh() {
			let that = this;
			that.page = 1;
			that.getMore(() => {
				that.pindanList = [];
				uni.showToast({
					title: '加载中'
				});
			});
		},
		async getMore(fn) {
			let that = this;
			const result = await that.$request({
				url: '/api/ordergroup/getMorePindanList',
				data: {
					page: that.page,
					goods_id: that.goodsId
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let pindanList = handleDataFn(assertArray(result.data.data));
					fn && fn(pindanList);
					that.pindanList = that.pindanList.concat(pindanList);
					// that.pindanList = that.pindanList.concat([...pindanList,...that.pindanList])
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
		

		setPintuanListModalFlagFn(flag) {
			this.isShowPintuanListModalFlag = flag;
		},

		// 获取当前id 商品详情
		async getGoodsDetailFn() {
			let that = this;
			let data = {
				goods_id: that.goodsId
			};
			// #ifdef MP-WEIXIN
			data.Platform = 'wxMiniProgram';
			// #endif

			let result = await that.$request({
				url: '/api/ordergroup/group_goods_detail',
				data
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					const resultData = assertObject(result.data.data);

					let goodsDetail = assertObject(resultData.detail); // 商品详情

					// 单个商品分享图文配置
					that.shareTitle = goodsDetail.share_title;
					that.shareImage = that.addimgPathHostFn(goodsDetail.share_img);


					const resultHot = resultData.hot; // 热门拼团

					that.templateId = assertArray(resultData.templateId); // 模板id

					// 赋值轮播图的数据
					that.swiperImgArr = assertArray(goodsDetail.images);

					that.videoStrStr = goodsDetail.video;

					// 赋值商品信息↓↓↓
					// 商品名字
					that.detailGoodsName = goodsDetail.goods_name;
					// 商品描述
					that.detailGoodsRemark = goodsDetail.goods_remark;

					//几人拼团
					that.detailGoodsPinCount = goodsDetail.pin_count;

					//已经拼
					that.detailGoodsSalesSum = goodsDetail.sales_sum;
					//剩余库存
					that.detailGoodsstorecount = goodsDetail.store_count;

					// 把商品的平台承诺图片添加样式是100%宽
					that.detailGoodsContent = goodsDetailWidthFn(assertString(goodsDetail.goods_content));

					// 商家承诺
					that.promisesNodes = goodsDetailWidthFn(assertString(goodsDetail.promises));

					// 价格说明
					that.priceMean = goodsDetailWidthFn(assertString(goodsDetail.price_mean));

					// 商品价格
					that.detailGoodsShopPrice = goodsDetail.shop_price;
					// 商品拼团价格
					that.detailGoodsPintuanPrice = goodsDetail.pinprice;

					// 开始时间
					that.detailGoodsBeginTime = goodsDetail.begin_time;
					// 结束时间
					that.detailGoodsEndTime = goodsDetail.end_time;

					// 赋值热门拼团数据↓↓
					that.hotGoodsArr = assertArray(resultHot.value); //数据列表
					that.hotName = resultHot.name; //名字

					// 处理拼团中列表数据
					let pindanResult = assertObject(resultData.pindanList);

					console.log('pindanResult', pindanResult);
					that.pindanTitle = pindanResult.name; // 标题文字
					let pindanList = assertArray(pindanResult.value); // 拼团中列表数据

					that.pindanList = handleDataFn(pindanList); // 拼团中列表数据 处理完后的

					// 多规格相关--------------------------------------------------------
					let isSpec = goodsDetail.is_guige == 1;
					if (isSpec) {
						let spec = assertObject(goodsDetail.spec);
						that.goodsSpecSelectItemList = addSpecFilterItemActAttrFn(assertArray(spec.filter_spec)); // 多规格项
						that.goodsSpecRowsList = assertObject(spec.spec_goods_price); // 多规格 笛卡尔积项对应的 商品 信息
					} else {
						that.goodsSpecSelectItemList = []; // 多规格项
						that.goodsSpecRowsList = {}; // 多规格 笛卡尔积项对应的 商品 信息
					}
					that.isSpec = isSpec;
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
		// 单独购买
		selfBuyFn() {
			let that = this;
			if (!that.isLogin) {
				that.closeGlobalLoginFn(true);
				return false;
			}
			that.navigateToFn({
				url: `/packageB/goods-detail/goods-detail?goods_id=${that.goodsId}`
			});
		},
		// 发起拼团
		async payFn() {
			let that = this;
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
			
			let newTime = Math.floor(new Date().getTime() / 1000);
			if (newTime > that.detailGoodsBeginTime && newTime < that.detailGoodsEndTime) {
				if (that.isSpec) {
					that.setGoodsSpec(true);
					return false;
				}
				let pintuanInfo = {
					goods_id: that.goodsId,
					original_img: that.swiperImgArr[0],
					goods_name: that.detailGoodsName,
					goods_remark: that.detailGoodsRemark,
					shop_price: that.detailGoodsPintuanPrice
				};
				uni.setStorageSync('pintuanInfo', pintuanInfo);

				that.navigateToFn({
					url: `/pages/order/pintuan`
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: '不在活动之间内'
				});
			}
		},
		// 选好 多规格 开始提交订单购买
		commitSpec(e) {
			let that = this;
			console.log('commitSpec emit事件数据', e);
			//没有登录就弹框
			if (!that.isLogin) {
				that.closeGlobalLoginFn(true);
				return false;
			}
			let pintuanInfo = {
				isSpec: true,
				goods_id: that.goodsId,
				original_img: that.swiperImgArr[0],
				goods_name: that.detailGoodsName,
				goods_remark: that.detailGoodsRemark,
				shop_price: that.detailGoodsPintuanPrice,

				currentgoodsId: e.currentgoodsId,
				currentgoodsPinPrice: e.currentgoodsPinPrice,
				specKeyStr: e.specKeyStr
			};
			console.log(pintuanInfo);
			uni.setStorageSync('pintuanInfo', pintuanInfo);
			that.setGoodsSpec(false);
			that.navigateToFn({
				url: `/pages/order/pintuan`
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
					jsApiList: ['getLocation', 'updateAppMessageShareData'], // 必填，需要使用的JS接口列表
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
	},

	computed: {
		checkTime() {
			let that = this;
			let startTime = new Date(that.detailGoodsBeginTime * 1000).getTime();
			let endTime = new Date(that.detailGoodsEndTime * 1000).getTime();
			let newTime = new Date().getTime();

			if (newTime <= startTime) {
				// 还没开始
				return {
					description: '距开始还有',
					time: calcOverTime(startTime - newTime)
				};
			} else if (newTime >= endTime) {
				// 已经结束
				return {
					description: '',
					time: '已结束'
				};
			} else {
				// 在活动期限内
				return {
					description: '距结束还有',
					time: calcOverTime(endTime - newTime)
				};
			}
		}
	},
	filters: {
		filterUserName(arg) {
			let str = '';
			assertArray(assertObject(arg).userInfo).forEach(i => {
				str += `${i.nickName} 、`;
			});
			return str.substring(0, str.length - 1);
		},
		// 过滤器 处理时间字符串
		filterTime(i) {
			let newDate = new Date(); // 当前时间
			let endTime = new Date(i * 1000).getTime(); // 结束时间
			return `${timeStamp2timeText(endTime - newDate)}`;
		}
	},
	onShareAppMessage() {
		let that = this;
		let obj = that.shareFn({
			path: '/packageB/goods-detail/pintuan-detail',
			query: {
				scene: true,
				id: that.goodsId,
			},
			options: {
				title: that.shareTitle ? that.shareTitle : that.detailGoodsName,
				imageUrl: that.shareImage ? that.shareImage : that.swiperImgArr[0]
			}
		});
		console.log(obj);
		return obj 
	}
};
</script>

<style lang="scss" scoped>
.layout {
	width: 750rpx;
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;

	.layout-left {
		width: 450rpx;
		height: 100rpx;
		line-height: 70rpx;
		color: #ffffff;
		/* background-color: #09bd04; */
		padding: 18rpx;
	}

	.layout-right {
		width: 300rpx;
		height: 100rpx;
		color: #ffffff;
		background: rgb(252, 175, 54);
		display: flex;
		align-items: center;
		font-size: 25rpx;
		flex-direction: column;
		justify-content: center;
	}
}


.goods-description-block {
	margin-top: 20rpx;

	.goods-description {
		font-size: 25rpx;
		color: $grey2-color;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.goods-descriptions {
		font-size: 25rpx;
		color: $grey2-color;
		text-overflow: ellipsis;
		white-space: nowrap;
		/* overflow: hidden; */
	}
}

.goods-name_share {
	display: flex;

	.goods-name {
		flex: 1;
		margin-bottom: 10px;
		line-height: 1.3em;
		font-size: 32rpx;
		font-weight: 600;
		color: $grey1-color;
	}

	.share-btn {
		padding-top: 10rpx;
		width: 80rpx;
		padding-top: 10rpx;
	}
}

.goods-block {
	border-top: 20rpx solid $bg-grey-color;
	border-bottom: 20rpx solid $bg-grey-color;

	.title {
		line-height: 90rpx;
		font-size: 36rpx;
		font-weight: 600;
		color: $grey1-color;
	}
}

.detail-row {
	border-top: 20rpx solid $bg-grey-color;
	padding-bottom: 10rpx;

	.title-block {
		display: flex;
		height: 88rpx;

		.title-btn {
			height: 88rpx;
			display: flex;
			flex: 1;
			// justify-content: center;
			justify-content: flex-start;
			align-items: center;
			font-size: 36rpx;
			font-weight: 600;
			color: $grey1-color;
			position: relative;

			
		}
	}
}

.start-pintuan-block {
	display: flex;
	position: fixed;
	bottom: 0;
	width: 100%;
	background: #ffffff;
	box-shadow: 0 0px 8px #c3c3c3;
	z-index: 100;
	.bottom-left {
		width: 150rpx;
		font-size: 55rpx;
		line-height: 40rpx;
		font-weight: 500;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-right: 1px solid #e3e3e3;
		padding: 5rpx;
	}

	.bottom-right {
		width: 150rpx;
		font-size: 40rpx;
		font-weight: 500;
		line-height: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5rpx;
	}

	.shoping-type {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 98rpx;

		.tip-text {
			font-size: 20rpx;
			font-weight: 600;
		}

		&.every-body {

			.price-wrap .origin-price text,
			.price-wrap .origin-price {
				color: #ffffff !important;
			}

			.tip-text {
				color: #ffffff;
			}
		}

		.price-wrap {
			@include shop-price-block-lr;
		}

		
	}
}

.list-table {
	margin-left: 25rpx;
	font-size: 25rpx;
	font-weight: 600;
}

.list-tables {
	font-size: 25rpx;
	font-weight: 600;
}

.info {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 340rpx;
	margin-left: 25rpx;
	.info-userinfo {
		position: relative;
		width: 120rpx;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.info-style {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 70rpx;
		height: 70rpx;
		border: 1px solid #ffffff;
		border-radius: 50%;
	}
	.Hide {
		width: 200rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}

.center-time {
	width: 410rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.content {
	float: left;
	width: 260rpx;
	font-size: 24rpx;
	text-align: center;
}

.root-bottom {
	width: 120rpx;
	height: 50rpx;
	font-size: 30rpx;
	line-height: 50rpx;
	margin-right: 10rpx;
	background-color: #e02e24;
	border-radius: 3px;
	float: right;
	text-align: center;
	color: #ffffff;
}

.pintuan-list-modal {
	position: fixed;
	z-index: 800;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	.pintuan-list-box {
		position: relative;
		width: 554rpx;
		height: 750rpx;
		background: #ffffff;
		border-radius: 14rpx;
		.title-text {
			height: 94rpx;
			line-height: 94rpx;
			font-size: 34rpx;
			color: #000000;
			text-align: center;
			border-bottom: 1px solid #f2f2f2;
		}

		.close-btn {
			position: absolute;
			top: 0;
			right: 0;
			transform: translateX(50%) translateY(-50%);
			width: 56rpx;
			height: 56rpx;
			background: #e0e0e0;
			border-radius: 50%;

			&::before,
			&::after {
				content: '';
				display: inline-block;
				position: absolute;
				top: 50%;
				left: 50%;
				width: 26rpx;
				height: 4rpx;
				background: #5f5f5f;
				border-radius: 1000rpx;
			}

			&::before {
				transform: translate(-50%, -50%) rotate(45deg);
			}

			&::after {
				transform: translate(-50%, -50%) rotate(-45deg);
			}
		}

		.scroll-view-dom {
			height: 656rpx;
		}

		.pintuan-list {
			width: 100%;

			.pintuan-user-info-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0 20rpx;
				height: 116rpx;
				border-top: 1px solid #f2f2f2;

				&:first-child {
					border-top: none;
				}

				.user-img-block {
					position: relative;
					width: 120rpx;
					height: 100%;
					.user-img {
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						width: 70rpx;
						height: 70rpx;
						border: 1px solid #ffffff;
						border-radius: 50%;
					}
				}

				.user-name-block {
					padding: 0 0.5em;
					width: 284rpx;

					height: 116rpx;
					line-height: 116rpx;
					font-size: 30rpx;

					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
				}

				.to-pintuan-btn {
					width: 150rpx;
					height: 60rpx;
					background-color: #e02e24;
					border-radius: 10rpx;
					text-align: center;
					color: #ffffff;
					margin-right: 10rpx;
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}
		}
	}
}
</style>
