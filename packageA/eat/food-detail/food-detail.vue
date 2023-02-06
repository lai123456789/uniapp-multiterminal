<template>
	<view class="page">
		<!-- 数据加载中客户看到的图片 -->
		<loading-image :is-show-gif="isShowGif"></loading-image>

		<!-- 商品轮播图↓↓↓ -->
		<view class="goods-images-block">
			<view class="goods-image-block">
				<swiper
					class="swiper-block"
					@change="swiperChangeFn"
					:circular="true"
					:autoplay="true"
					:interval="3000"
					:duration="450"
				>
					<swiper-item class="swiper-item" v-for="(item, index) in deliciousDetailImgArr" :key="index">
						<image :src="item" @click="lookImgListFn(index)"></image>
					</swiper-item>
				</swiper>
				<view class="dot-index border-radius">{{ dotIndex }}/{{ deliciousDetailImgArr.length }}</view>

				<view
					class="to-back"
					@click="toBackFn"
					:style="{ position: 'fixed', top: `${backIconTop}px`, left: '12px' }"
				>
					<image :src="calcImageSrc('/detail/toback.png')" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 商品 描述↓↓↓ -->
		<view class="goods-description-block">
			<view class="content-wrap">
				<view class="goods-name">{{ deliciousDetailTitle }}</view>
				<view class="goods-description">
					制作时长:
					<view class="tag-block blueStyle" style="margin-left: 20rpx;margin-right:20rpx;">
						{{ deliciousDetailTime }}
					</view>
					难度:
					<view class="tag-block yellowStyle" style="margin-left: 20rpx;margin-right:20rpx;">
						{{ deliciousDetailLevel }}
					</view>
				</view>

				<view class="user-info-block">
					<image class="border-radius" :src="headimgurl" mode=""></image>
					<text>{{ nickname }}</text>
				</view>

				<view class="food-content">
					<text>{{ deliciousDetailTxt }}</text>
				</view>
			</view>
		</view>

		<view class="goods-block" v-if="foodsArr.length > 0">
			<view class="content-wrap">
				<view class="title">{{ foodsName }}</view>
			</view>
		</view>

		<view class="use-food-block" v-if="foodsArr.length > 0">
			<view class="content-wrap">
				<list-goods-item-row
					v-for="(goodsItem, index) in foodsArr"
					:key="index"
					:goods-id="goodsItem.goodsId"
					:goods-image="goodsItem.goodsImage"
					:is-hot="goodsItem.isHot"
					:is-new="goodsItem.isNew"
					:goods-name="goodsItem.goodsName"
					:goods-description="goodsItem.goodsDescription"
					:goods-tag="goodsItem.goodsTag"
					:is-vip-price="goodsItem.isVipPrice"
					:goods-price="goodsItem.goodsPrice"
					:vip-price="goodsItem.vipPrice"
					:line-price="goodsItem.linePrice"
					:selected-num="goodsItem.selectedNum"
					:is-spec="goodsItem.isSpec"
					:tag-img="goodsItem.tagImg"
					:gysMdId="goodsItem.gysMdId"
					:gysMdName="goodsItem.gysMdName"
				></list-goods-item-row>
			</view>
		</view>

		<!-- 推荐菜谱↓↓↓ -->
		<view style="background: #ffffff; margin-top: 20rpx;">
			<menu-block
				v-if="recommendArr.length > 0"
				:rec-delicious-arr="recommendArr"
				:rec-delicious-name="recommendName"
			></menu-block>
		</view>

		<view style="height: 100rpx;"></view>

		<view class="bottom-bar">
			<view class="item" @click="changeLikeFn">
				<view class="icon-block">
					<uni-icons size="20" color="#ea3a37" v-if="isZan" type="heart-filled"></uni-icons>
					<uni-icons size="20" color="#91939c" v-else type="heart-filled"></uni-icons>
				</view>
				<text>点赞{{ deliciousDetailZan }}</text>
			</view>

			<view class="item" @click="changeCollectFn">
				<view class="icon-block">
					<uni-icons size="20" v-if="isCollect" color="#ffdb4f" type="star-filled"></uni-icons>
					<uni-icons size="20" v-else color="#91939c" type="star-filled"></uni-icons>
				</view>
				<text>收藏{{ deliciousDetailCollect }}</text>
			</view>

			<!-- #ifdef MP-WEIXIN -->
			
			<button class="item" open-type="share" v-if="isRunBindMobileFunc">
				<view class="icon-block"><uni-icons size="20" color="#6ccc4e" type="weixin"></uni-icons></view>
				<text>分享</text>
			</button>
			<button class="item" v-else @click="toBindMobileFn">
				<view class="icon-block"><uni-icons size="20" color="#6ccc4e" type="weixin"></uni-icons></view>
				<text>分享</text>
			</button>
			
			<!-- #endif -->

			<!-- #ifdef APP-PLUS -->
			<button class="item" @click="appShareFoodDetailFn">
				<view class="icon-block"><uni-icons size="20" color="#6ccc4e" type="weixin"></uni-icons></view>
				<text>分享</text>
			</button>
			<!-- #endif -->

			<!-- #ifdef H5 -->
			<button class="item" @click="gzhH5WxShareFoodDetailFn">
				<view class="icon-block"><uni-icons size="20" color="#6ccc4e" type="weixin"></uni-icons></view>
				<text>分享</text>
			</button>
			<!-- #endif -->
		</view>

		<goods-spec
			:is-show="isShowGoodsSpec"
			:goods-spec-rows-list="goodsSpecRowsList"
			:goods-spec-select-item-list="goodsSpecSelectItemList"
			:goods-name="currentGoodsName"
			:goods-description="currentGoodsDescription"
			:goods-images="currentGoodsImages"
			:goods-id="currentGoodsId"
			:selected-num="currentGoodsSelectedNum"
			@setGoodsSpec="setGoodsSpec"
			@setSpecFilterItemActiveFn="setSpecFilterItemActiveFn"
		></goods-spec>

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn"></login-fn>

		<to-top-btn :flag="isShowToTopBtn"></to-top-btn>
		
		
		<!-- ↓↓↓ 轮播平台售卖记录组件 -->
		<play-buy-history :page-is-show="pageShowFlag" page="detail"></play-buy-history>
						
				
				
	</view>
</template>

<script>
import menuBlock from './food-detail-components/menu-block';
// vuex 相关
import { mapState } from 'vuex';

// #ifdef H5
import jweixinModule from '@/tools/libs/jweixin-module.js';
// #endif

import { success, error, bindMobileTips } from '@/tools/const.js';

import loadingImage from '@/df-components/loading-image';
import playBuyHistory from '@/df-components/global-components/play-buy-history.vue'; // 轮播平台售卖记录组件

import { cloneFn, assertObject, assertArray, addSpecFilterItemActAttrFn, transNumFn } from '@/tools/tools.js';
export default {
	components: {
		menuBlock,
		loadingImage,
		playBuyHistory
	},
	data() {
		return {
			isShowGif: true, // 是否显示 开屏的loading图片
			foodId: null, // 当前作品的id

			WXtop: 0,

			dotIndex: 1, //轮播图的索引

			foodInfo: {},

			deliciousDetailImgArr: [], //轮播图数组
			deliciousDetailTitle: '', //作品标题
			deliciousDetailTxt: '', //作品详情文字
			deliciousDetailTime: '', //时长
			deliciousDetailLevel: '', //难度级别
			deliciousDetailZan: '', //点赞数
			deliciousDetailCollect: '', //收藏数

			nickname: '', //发布人网名
			headimgurl: '', //发布人头像地址
			isCollect: false, //是否收藏
			isZan: false, //是否点赞

			foodsName: '', //所需食材的标题名字
			foodsArr: [], //所需食材的数组

			recommendName: '', //推荐菜谱的标题名字
			recommendArr: [], //推荐菜谱的数组
			
			pageShowFlag: false, // 当前页面是否show



			// ↓↓↓ 多规格相关数据 --------------------------------------------------------
			isShowGoodsSpec: false, // 是否显示多规格弹框
			goodsSpecSelectItemList: [{}], // 多规格项
			goodsSpecRowsList: {}, // 多规格 笛卡尔积项对应的 商品 信息
			currentGoodsName: '', // 当前弹窗多规格的商品名字
			currentGoodsDescription: '', // 当前弹窗多规格的商品描述
			currentGoodsImages: '', // 当前弹窗多规格的商品图片
			currentGoodsId: '', // 当前弹窗多规格的商品id
			currentGoodsSelectedNum: '', // 当前弹窗多规格的商品即加入到购物车里的数量
			// ↑↑↑ 多规格相关数据 --------------------------------------------------------
			loginBoxFlag:false, // 登录框显示隐藏状态
			

		};
	},
	onUnload() {
		uni.$off('goodsAddCartEd_foodDetail')
	},
	onLoad(options) {
		let that = this;
		that.foodId = options.id;
		if (options.shareFn) {
			that.setSharerStrFn_btn(options);
		}
		uni.$off('goodsAddCartEd_foodDetail')
		uni.$on('goodsAddCartEd_foodDetail', arg => {
			let { selectedNum, goodsId } = arg;
			that.foodsArr.forEach(goodsItem => {
				if (goodsItem.goodsId == goodsId) {
					goodsItem.selectedNum = selectedNum;
				}
			});
		});
	},
				
	onHide() {
		this.pageShowFlag = false;
	},
	
	
	
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});


		that.getFoodInfo();
		that.pageShowFlag = true;


		

		// 监听多规格弹框事件
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId } = arg;

			let currentGoods = assertObject(assertArray(that.foodsArr.filter(item => item.goodsId == goodsId))[0]);

			/*

			if (goodsId == that.currentGoodsId) {
				that.currentGoodsSelectedNum = currentGoods.selectedNum; // 当前弹窗多规格的商品即加入到购物车里的数量
				that.isShowGoodsSpec = true;
				return false;
			}
			*/
			that.currentGoodsId = goodsId;
			uni.showLoading({});

			console.log('当前点击商品的信息currentGoods', currentGoods);

			that.currentGoodsName = currentGoods.goodsName; // 当前弹窗多规格的商品名字
			that.currentGoodsDescription = currentGoods.goodsDescription; // 当前弹窗多规格的商品描述
			that.currentGoodsImages = currentGoods.goodsImage; // 当前弹窗多规格的商品图片

			that.currentGoodsSelectedNum = currentGoods.selectedNum; // 当前弹窗多规格的商品即加入到购物车里的数量

			let result = await that.getSpecInfoFn(that.currentGoodsId);
			if (result.type != 'success') {
				that.hideAllFn();
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: result.msg,
					success(e) {
						//确认后的回调
						console.log(e);
					}
				});
				return false;
			}

			that.goodsSpecSelectItemList = result.result.goodsSpecSelectItemList;
			that.goodsSpecRowsList = result.result.goodsSpecRowsList;

			console.log(`${that.currentGoodsId} 商品的规格信息`, result);

			that.isShowGoodsSpec = true;
			that.hideAllFn();
		});
	},
	methods: {
		// 去绑定手机号
		toBindMobileFn() {
			let that = this;
			// 收银系统功能- 未绑定手机号不能操作以下功能
			if (!that.isRunBindMobileFunc) {
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						e.confirm && that.navigateToFn({ url: `/packageA/tel-login/user-info` });
					}
				});
				return false;
			}
		},
		// 获取作品详情
		async getFoodInfo() {
			let that = this;
			let id = that.foodId;
			let result = await that.$request({
				url: '/api/Delicious/deliciousDetail',
				data: {
					id
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					let detail = assertObject(resultObj.detail);
					let foods = assertObject(resultObj.foods);
					let recommend = assertObject(resultObj.recommend);

					// 详情↓↓
					that.deliciousDetailImgArr = assertArray(detail.image); //轮播图数组
					that.deliciousDetailTitle = detail.title; //作品标题
					that.deliciousDetailTxt = detail.detail; //作品详情文字
					that.deliciousDetailTime = detail.time; //时长
					that.deliciousDetailLevel = detail.level; //难度级别
					that.deliciousDetailZan = detail.zan; //点赞数
					that.deliciousDetailCollect = detail.collect; //收藏数
					that.nickname = detail.nickname; //发布人网名
					that.headimgurl = detail.headimgurl; //发布人头像地址
					that.isCollect = detail.is_collect; //是否收藏
					that.isZan = detail.is_zan; //是否点赞

					// 食材↓↓
					that.foodsName = foods.name; //所需食材的标题名字
					that.foodsArr = assertArray(foods.value).map(item => {
						return {
							goodsId: item.goods_id, // 商品id
							goodsImage: item.original_img, // 商品图片
							isHot: item.is_hot == 1, // 是否热销爆款
							isNew: item.is_new == 1, // 是否新品
							goodsName: item.goods_name, // 商品名字
							goodsDescription: item.goods_remark, // 商品描述
							isVipPrice: item.is_vip_price == 1, // 是否会员专享
							goodsPrice: item.shop_price, // 商品价格
							vipPrice: item.market_price, // vip专享价
							linePrice: item.market_price, // 划线价
							goodsTag: item.tag_name, // 商品标签
							selectedNum: item.selectedNum, // 加入到购物车里的数量
							isSpec: item.is_guige == 1, // 商品是否多规格
							tagImg: item.top_left_tag_img, // 商品左上的图片标签
							gysMdId: transNumFn(item.supp_id), // 供应商门店id
							gysMdName: item.dp_name // 供应商门店名字
						};
					}); //所需食材的数组

					// 食材推荐菜谱
					that.recommendName = recommend.name; //推荐菜谱的标题名字
					that.recommendArr = assertArray(recommend.value); //推荐菜谱的数组
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
		// 登录成功后重新加载
		refreshFn() {
			this.getFoodInfo();
		},
		// 商品添加购物车
		resultFn(e, item) {
			item.selectedNum = e;
		},
		// 查看轮播大图
		lookImgListFn(current) {
			let urls = this.deliciousDetailImgArr;
			uni.previewImage({
				current,
				urls
			});
		},
		// 轮播图事件
		swiperChangeFn(e) {
			let that = this;
			that.dotIndex = e.target.current + 1;
		},
		// 改变是否喜欢的状态
		async changeLikeFn() {
			let that = this;
			let d_id = that.foodId;
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
			
			let result = await that.$request({
				loading: true,
				url: '/api/Delicious/zan',
				data: {
					d_id
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					if (that.isZan) {
						that.deliciousDetailZan--;
					} else {
						that.deliciousDetailZan++;
					}
					that.isZan = !that.isZan;

					let eatPageList = cloneFn(that.eatPageList);
					eatPageList.forEach(item => {
						if (item.id == d_id) {
							item.is_zan = result.data.data;
							if (that.isZan) {
								item.zan = item.zan + 1;
							} else {
								item.zan = item.zan - 1;
							}
						}
					});
					that.$store.commit('setEatPageList', eatPageList);
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
		// 改变是否收藏的状态
		async changeCollectFn() {
			let that = this;
			let d_id = that.foodId;
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
			
			let result = await that.$request({
				loading: true,
				url: '/api/Delicious/collect',
				data: {
					d_id
				}
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					if (that.isCollect) {
						that.deliciousDetailCollect--;
					} else {
						that.deliciousDetailCollect++;
					}

					that.isCollect = !that.isCollect;
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
		appShareFoodDetailFn() {
			let that = this;
			that.shareAppFn({
				path: `/packageA/eat/food-detail/food-detail`,
				query: {
					scene: true,
					id: that.foodId
				},
				options: {
					title: that.deliciousDetailTitle,
					imageUrl: that.deliciousDetailImgArr[0]
				}
			});
		},

		// #ifdef H5
		// h5公众号平台下分享作品
		gzhH5WxShareFoodDetailFn() {
			let that = this;
			if (!that.isLogin) {
				that.closeGlobalLoginFn(true);
				return false;
			}
			const shareUrlStr = `${location.origin}${location.pathname}${location.hash}&shareFn=true&scene=${
				that.userInfoEncrypt
			}`;
			that.copyStrFn(shareUrlStr, () => {
				uni.showToast({
					icon: 'success',
					title: '分享链接复制成功'
				});
			});
		},
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
					updateAppMessageShareDataOptions.imgUrl = that.deliciousDetailImgArr[0];
					updateAppMessageShareDataOptions.desc = that.deliciousDetailTitle;
					updateAppMessageShareDataOptions.title = '推荐菜谱';

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
		},
		// #endif

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
		}
		// ↑↑↑ 多规格相关方法 --------------------------------------------------------
	},
	computed: {
		...mapState({
			userInfoEncrypt: store => store.userInfo.userInfoEncrypt, // 加密字符串
			eatPageList: store => store.eat.eatPageList // 吃什么数据
		})
	},
	// 分享
	onShareAppMessage() {
		let that = this;
		return that.shareFn({
			path: `/packageA/eat/food-detail/food-detail`,
			query: {
				scene: true,
				id: that.foodId
			},
			options: {
				title: that.deliciousDetailTitle,
				imageUrl: that.deliciousDetailImgArr[0]
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
	overflow: hidden;
}

.goods-image-block {
	position: relative;

	.swiper-block {
		@mixin size {
			width: 750rpx;
			height: 750rpx;
		}

		@include size;

		.swiper-item {
			@include size;

			image {
				@include size;
			}
		}
	}

	.dot-index {
		position: absolute;
		right: 26rpx;
		bottom: 20rpx;
		width: 88rpx;
		height: 48rpx;
		background: rgba(178, 178, 178, 0.78);
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 25rpx;
	}

	@mixin size {
		width: 68rpx;
		height: 68rpx;
	}

	.to-back {
		position: absolute;
		z-index: 500;
		top: 12rpx;
		left: 0;
		font-size: 0;

		image {
			@include size;
		}
	}

	.btn-share {
		position: absolute;
		top: 12rpx;
		right: 0;
		font-size: 0;

		image {
			@include size;
		}
	}
}

@mixin h3style {
	font-size: 36rpx;
	font-weight: 600;
	color: $grey1-color;
}

@mixin h5style {
	font-size: 25rpx;
	color: $grey2-color;
}

.goods-description-block {
	padding-bottom: 20rpx;
	margin-bottom: 20rpx;
	background: #ffffff;

	.goods-name {
		font-size: 34rpx;
		font-weight: 600;
		color: #374050;
		line-height: 42rpx;
		padding-top: 26rpx;

		/* 
			@include h3style;
			line-height: 90rpx;
			 */
	}

	.goods-description {
		@include h5style;
		margin-top: 10rpx;
		margin-bottom: 40rpx;
		line-height: 34rpx;
	}

	.user-info-block {
		display: flex;
		align-items: center;

		image {
			width: 60rpx;
			height: 60rpx;
		}

		text {
			text-indent: 0.5em;
			font-size: 26rpx;
			color: $grey1-color;
		}
	}

	.food-content {
		margin-top: 50rpx;
		font-size: 26rpx;
		color: $grey1-color;
	}
}

.goods-block {
	height: 90rpx;
	line-height: 90rpx;
	background: #ffffff;

	.title {
		@include h3style;
	}
}

.use-food-block {
	background: #ffffff;

	.item {
		display: flex;
		padding: 10rpx 0;
		height: 218rpx;
		border-bottom: 1px solid #f1f1f1;

		&:last-child {
			border-bottom: none;
		}

		.item-image-block {
			@include flex-center;
			margin: 0 20rpx;
			width: 156rpx;
			height: 196rpx;

			image {
				width: 150rpx;
				height: 150rpx;
			}
		}

		.item-description-block {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			position: relative;

			.item-name {
				color: $grey1-color;
				font-size: 28rpx;
				max-width: 15em;
				@include text-ellipsis;
			}

			.item-description {
				color: $grey2-color;
				font-size: 23rpx;
				max-width: 20em;
				@include text-ellipsis;
			}

			.price-wrap {
				@include shop-price-block-lr;
			}

			.add-cart-wrap {
				position: absolute;
				right: 0;
				bottom: 0;
			}
		}
	}
}

.bottom-bar {
	display: flex;
	justify-content: space-around;
	position: fixed;
	z-index: 200;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 100rpx;
	background: #ffffff;

	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: 0;
		margin: 0;
		line-height: inherit;
		background: rgba(0, 0, 0, 0);
		flex: 1;

		text {
			color: $grey2-color;
			font-size: 20rpx;
		}
	}
}
</style>
