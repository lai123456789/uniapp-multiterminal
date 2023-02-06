<template>
	<view>
		<view class="jifen" :style="{ background: configInfo.web_site_color }">
			<view class="content-wrap">
				<view class="h3">
					当前等级:
					<image :src="calcImageSrc('/my/my-log.png')" mode=""></image>
					vip{{ lv }}
				</view>
				<view class="h2">我的积分: {{ integral }}</view>
				<view @click="navigateToFn({ url: `/packageA/jifenshangcheng/jifenmingxi` })" class="jifenmingxi">
					<image :src="calcImageSrc('/my/mingxi.png')" mode=""></image>
					<text>积分明细</text>
				</view>

				<view class="btn-block border-radius20" v-if="!miniProgrameCheck">
					<view class="chongzhi" @click="navigateToFn({ url: '/packageA/yve/chongzhi', type: 'redirectTo' })">
						<image :src="calcImageSrc('/my/chongzhi.png')" mode=""></image>
						<text>充值</text>
					</view>
					<!-- <view class="hongbao" v-show="(integralShopInfo.user_vip_card-0)" @click="navigateToFn({url:'/packageA/kaitonghuiyuan/huiyuanrenwu',type:'redirectTo'})"> -->
					<!-- 
					<view class="hongbao" v-show="(integralShopInfo.user_vip_card-0)" @click="devIngFn">
						<image :src="calcImageSrc('/my/hongbao.png')" mode=""></image>
						<text>会员任务红包</text>
					</view>
					 -->
				</view>
			</view>
		</view>

		<view class="goods-list">
			<view class="content-wrap">
				<view class="title-block">
					<view class="h4">积分兑换</view>
					<view class="h5">你想兑换什么呢?</view>
				</view>
				<view class="goods-list-block">
					<block v-for="(item, index) in goodsList" :key="index">
						<view
							class="item"
							@click="
								navigateToFn({
									url: `/packageB/goods-detail/jifen-goods-detail?goods_id=${item.goods_id}`
								})
							"
						>
							<view class="goods-image-block"><image :src="item.img" mode=""></image></view>
							<view class="goods-name">{{ item.goods_name }}</view>
							<view class="jifenshu">{{ item.exchange_score }}积分</view>
							<view
								@click.stop="$onceClick(duihuan, item)"
								class="navigator-btn border-radius"
								:style="{ background: configInfo.web_site_color }"
							>
								立即兑换
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>

		<null-block
			v-if="goodsList.length <= 0"
			min-height="100vh"
			is-show-to-page-btn
			to-page-text="逛逛首页"
			:to-page-url="{ isTab: true, url: '/pages/index/index' }"
		></null-block>

		<goods-spec
			:is-show="isShowGoodsSpec"
			:goods-spec-rows-list="goodsSpecRowsList"
			:goods-spec-select-item-list="goodsSpecSelectItemList"
			:goods-name="currentGoodsName"
			:goods-description="currentGoodsDescription"
			:goods-images="currentGoodsImages"
			:goods-id="currentGoodsId"
			:selected-num="0"
			page="jifen-page"
			@setGoodsSpec="setGoodsSpec"
			@setSpecFilterItemActiveFn="setSpecFilterItemActiveFn"
			@commitSpec="commitSpec"
		></goods-spec>

		<loading-css :is-show="isShowLoading"></loading-css>

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="loadFn" @close="closeGlobalLoginFn" hide-page to-back></login-fn>

		
	</view>
</template>

<script>
import { bindMobileTips } from '@/tools/const.js';
import { assertObject, assertArray, cloneFn, addSpecFilterItemActAttrFn } from '@/tools/tools.js';
export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画
			lv: '', // 积分等级
			integral: '', // 积分数
			goodsList: [{}], // 积分商品数据

			// ↓↓↓ 多规格相关数据 --------------------------------------------------------
			isShowGoodsSpec: false, // 是否显示多规格弹框
			goodsSpecSelectItemList: [{}], // 多规格项
			goodsSpecRowsList: {}, // 多规格 笛卡尔积项对应的 商品 信息
			currentGoodsName: '', // 当前弹窗多规格的商品名字
			currentGoodsDescription: '', // 当前弹窗多规格的商品描述
			currentGoodsImages: '', // 当前弹窗多规格的商品图片
			currentGoodsId: '', // 当前弹窗多规格的商品id
			// ↑↑↑ 多规格相关数据 --------------------------------------------------------
			loginBoxFlag:false, // 登录框显示隐藏状态

			goods_id: null,
			original_img: '',
			goods_name: '',
			goods_remark: '',
			exchange_score: 0
		};
	},
	onHide() {
		this.hideAllFn();
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
	methods: {
		loadFn() {
			let that = this;
			that.getIntegralShopInfoFn(() => {
				that.goodsList = [];
			});
		},
		// 获取积分商城页面信息
		async getIntegralShopInfoFn(fn) {
			let that = this;
			let result = await that.$request({
				method: 'post',
				url: '/api/User/GetIntegral'
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					fn && fn();
					let resultObj = assertObject(result.data.data);
					that.goodsList = assertArray(resultObj.goods); // 积分商品数据

					that.integral = `${resultObj.integral}`; // 积分数
					that.lv = `${resultObj.lv}`; // 积分等级
					// console.log('积分页面的等级和积分数', that.integral, that.lv);
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
		// 开始兑换商品
		async duihuan(item) {
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
			
			if (item.exchange_score > that.integral) {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: '积分不足',
					success(e) {
						//确认后的回调
						console.log(e);
					}
				});
				return false;
			}

			let { goods_id, is_guige, goods_name, goods_remark, img, exchange_score } = item;

			that.currentGoodsName = goods_name;
			that.currentGoodsDescription = goods_remark;
			that.currentGoodsImages = img;
			that.currentGoodsId = goods_id;

			if (is_guige == 1) {
				that.goods_id = goods_id;
				that.original_img = img;
				that.goods_name = goods_name;
				that.goods_remark = goods_remark;
				that.exchange_score = exchange_score;
				that.hideAllFn();
				uni.showLoading({});

				let result = await that.getSpecInfoFn(goods_id);
				that.hideAllFn();
				if (result.type != 'success') {
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
				that.setGoodsSpec(true);
				return false;
			}

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
				goods_id: goods_id,
				original_img: img,
				goods_name: goods_name,
				goods_remark: goods_remark,
				exchange_score: exchange_score
			});
			console.log(info, item);

			that.navigateToFn({
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
				isSpec: true,
				goods_id: that.goods_id,
				original_img: that.original_img,
				goods_name: that.goods_name,
				goods_remark: that.goods_remark,
				exchange_score: that.exchange_score,

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

			that.navigateToFn({
				checkLogin: true,
				url: `/pages/order/jifenduihuan?info=${info}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.jifen {
	position: relative;
	color: #ffffff;
	height: 280rpx;

	.h3 {
		font-size: 23rpx;
		vertical-align: middle;
		line-height: 88rpx;

		image {
			width: 30rpx;
			height: 24rpx;
			padding: 0 0.3em;
		}
	}

	.h2 {
		font-weight: 600;
		font-size: 36rpx;
		line-height: 75rpx;
		max-width: 16em;
		@include text-ellipsis;
	}

	.jifenmingxi {
		position: absolute;
		z-index: 10;
		top: 20rpx;
		right: 0;
		width: 175rpx;
		height: 48rpx;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 1000rpx 0 0 1000rpx;
		font-size: 23rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		white-space: nowrap;

		image {
			width: 42rpx;
			height: 36rpx;
		}

		text {
			padding: 0 0.1em;
		}
	}

	.btn-block {
		margin-top: 20rpx;
		height: 164rpx;
		background-color: #ffffff;
		box-shadow: 0 3rpx 10rpx #f6f6f8;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.chongzhi,
		.hongbao {
			height: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			color: $grey1-color;
			font-size: 22rpx;
		}

		.chongzhi {
			image {
				width: 70rpx;
				height: 74rpx;
			}
		}

		.hongbao {
			image {
				width: 70rpx;
				height: 72rpx;
			}
		}
	}
}

.goods-list {
	padding-top: 100rpx;

	.title-block {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50rpx;

		.h4 {
			font-weight: 600;
			font-size: 36rpx;
			color: $grey1-color;
		}

		.h5 {
			font-size: 23rpx;
			color: $grey2-color;
		}
	}

	.goods-list-block {
		font-size: 0;
		padding-bottom: 20rpx;
	}

	.item {
		$width: 234rpx;
		width: $width;
		height: 434rpx;
		display: inline-flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding-top: 20rpx;

		.goods-image-block {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 277rpx;

			image {
				// width: $width;
				width: 214rpx;
				height: 214rpx;
			}
		}

		.goods-name {
			@include flex-center;
			font-size: 26rpx;
			font-weight: 600;
			color: $grey1-color;
			display: inline-block;
			max-width: 80%;
			@include text-ellipsis;
		}

		.jifenshu {
			font-size: 23rpx;
			color: #ff6933;
			@include flex-center;
			// justify-content: flex-start;
			width: 80%;
		}

		.navigator-btn {
			width: 140rpx;
			height: 56rpx;
			color: #ffffff;
			font-size: 22rpx;
			@include flex-center;
		}
	}
}
</style>
