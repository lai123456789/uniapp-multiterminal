<template>
	<view class="page">
		<view
			class="gb-green-block"
			:style="{
				'background-image': miaoshaOptions.miaoshaListPageBgImage
					? ''
					: 'linear-gradient(180deg, ' +
					  (miaoshaOptions.miaoshaListPageBgColor
							? miaoshaOptions.miaoshaListPageBgColor
							: configInfo.web_site_color) +
					  ' 40%, #f5f5f5 80%)'
			}"
		>
			<view class="box1"></view>
			<view class="box2"></view>
			<image
				v-if="miaoshaOptions.miaoshaListPageBgImage"
				style="width: 100%; height: 100%;"
				:src="miaoshaOptions.miaoshaListPageBgImage"
				mode=""
			></image>
		</view>
		<view style="position: relative;z-index: 10;">
			<view class="today-seckill-block">
				<view class="h1">
					<view class="text">{{ head }}</view>
					<!-- <view class="box-show">{{ robInfo.head }}</view> -->
				</view>
				<view class="news border-radius">
					{{ time_title }}
					<text>{{ title }}</text>
				</view>

				<time-count-down :timeArr="timeArr" :h1text="tipTitle"></time-count-down>
			</view>

			<view class="goods-list-block">
				<view class="content-wrap">
					<view class="list-goods-item-div" v-for="(item, index) in listArr" :key="index">
						<show-goods
							:goods-id="item.goodsId"
							:goods-image="item.goodsImage"
							:is-hot="item.isHot"
							:is-new="item.isNew"
							:goods-name="item.goodsName"
							:goods-description="item.goodsDescription"
							:goods-tag="item.goodsTag"
							:is-vip-price="item.isVipPrice"
							:goods-price="item.goodsPrice"
							:vip-price="item.vipPrice"
							:line-price="item.linePrice"
							:selected-num="item.selectedNum"
							:is-spec="item.isSpec"
							:sales-sum="item.salesSumText"
							:tag-img="item.tagImg"
						></show-goods>
					</view>
				</view>
			</view>
			<view class="uni-load-more" v-if="listArr.length > showBottomLoadingNum">
				<uni-load-more :status="loadMoreStatus"></uni-load-more>
			</view>
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

		<!-- ??????????????? -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="loginEndFn" @close="closeGlobalLoginFn"></login-fn>

		<loading-css :is-show="isShowLoading"></loading-css>
		
		<fixed-cart-icon :scroll-is-stop="mixinScrollIsStop" :cardNumber="cardNumber"></fixed-cart-icon>
	</view>
</template>

<script>
import { mapState } from 'vuex';

import {
	timeStr2Arr,
	assertArray,
	assertObject,
	cloneFn,
	addSpecFilterItemActAttrFn,
	assertString
} from '@/tools/tools';

import { getMiaoshaTimeOption } from '@/pages/index/index-components/miaosha-tool.js';

import timeCountDown from '@/df-components/time-count-down';
import showGoods from './today-seckill-components/show-goods';

let timer;
export default {
	components: {
		timeCountDown,
		showGoods
	},
	computed: {
		...mapState({
			miaoshaOptions: store => store.home.miaoshaOptions //  ??????????????? ????????????
		})
	},
	data() {
		return {
			loadMoreStatus: 'more',
			isShowLoading: true,
			page: 1,
			listArr: [],
			showBottomLoadingNum: 2,
			head: '',
			time_title: '',
			title: '',
			end_time: '',
			timeArr: ['00', '00', '00'],

			tipTitle: '', // ???????????? or ????????????

			// ????????? ????????????????????? --------------------------------------------------------
			isShowGoodsSpec: false, // ???????????????????????????
			goodsSpecSelectItemList: [{}], // ????????????
			goodsSpecRowsList: {}, // ????????? ???????????????????????? ?????? ??????
			currentGoodsName: '', // ????????????????????????????????????
			currentGoodsDescription: '', // ????????????????????????????????????
			currentGoodsImages: '', // ????????????????????????????????????
			currentGoodsId: '', // ??????????????????????????????id
			currentGoodsSelectedNum: '', // ???????????????????????????????????????????????????????????????
			// ????????? ????????????????????? --------------------------------------------------------
			loginBoxFlag:false, // ???????????????????????????
			cardNumber: 0 // ???????????????

		};
	},
	onUnload() {
		uni.$off('goodsAddCartEd_todaySeckill')
		clearInterval(timer);
		console.log('packageA/today-seckill/today-seckill ??????');
	},
	onLoad() {
		let that = this;
		that.loadFn();
		uni.$off('goodsAddCartEd_todaySeckill')
		uni.$on('goodsAddCartEd_todaySeckill', arg => {
			let { selectedNum, goodsId } = arg;

			that.listArr.forEach(goodsItem => {
				if (goodsItem.goodsId == goodsId) {
					goodsItem.selectedNum = selectedNum;
				}
			});
		});

	},
	onShow() {
		let that = this;
		
		// ???????????????????????????
		uni.$off('setCardNumberFn');
		uni.$on('setCardNumberFn', cardNumber => {
			that.cardNumber = cardNumber;
		});
		that.setTabBarCartNumFn();
		
		// ???????????????
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
		

		// ???????????????????????????
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId } = arg;

			let currentGoods = assertObject(assertArray(that.listArr.filter(item => item.goodsId == goodsId))[0]);

			/*
			if (goodsId == that.currentGoodsId) {
				that.currentGoodsSelectedNum = currentGoods.selectedNum; // ???????????????????????????????????????????????????????????????
				that.isShowGoodsSpec = true;
				return false;
			}
			*/
			that.currentGoodsId = goodsId;
			uni.showLoading({});

			console.log('???????????????????????????currentGoods', currentGoods);

			that.currentGoodsName = currentGoods.goodsName; // ????????????????????????????????????
			that.currentGoodsDescription = currentGoods.goodsDescription; // ????????????????????????????????????
			that.currentGoodsImages = currentGoods.goodsImage; // ????????????????????????????????????

			that.currentGoodsSelectedNum = currentGoods.selectedNum; // ???????????????????????????????????????????????????????????????

			let result = await that.getSpecInfoFn(that.currentGoodsId);
			if (result.type != 'success') {
				that.hideAllFn();
				uni.showModal({
					showCancel: false, //?????????????????????
					title: result.msg,
					success(e) {
						//??????????????????
						console.log(e);
					}
				});
				return false;
			}

			that.goodsSpecSelectItemList = result.result.goodsSpecSelectItemList;
			that.goodsSpecRowsList = result.result.goodsSpecRowsList;

			console.log(`${that.currentGoodsId} ?????????????????????`, result);

			that.isShowGoodsSpec = true;
			that.hideAllFn();
		});
	},
	// ????????????
	onPullDownRefresh() {
		let that = this;
		that.page = 1;
		that.getRobGoods(() => {
			that.listArr = [];
			uni.stopPullDownRefresh();
		}, true);
	},
	// ????????????
	onReachBottom() {
		let that = this;
		that.loadMoreStatus = 'loading';
		that.page++;
		that.getRobGoods(arr => {
			if (arr.length > 0) {
				that.loadMoreStatus = 'more';
			} else {
				that.loadMoreStatus = 'noMore';
			}
		}, true);
	},
	methods: {
		// load ???????????????????????????
		loadFn() {
			let that = this;
			clearInterval(timer);
			
			
			let miaoshaStartTime = assertString(assertObject(that.miaoshaOptions).miaoshaStartTime);
			let miaoshaEndTime = assertString(assertObject(that.miaoshaOptions).miaoshaEndTime);
			let { tipTitle, hour, minute, second } = getMiaoshaTimeOption(miaoshaStartTime, miaoshaEndTime);
			that.tipTitle = tipTitle;
			that.$set(that, 'timeArr', [hour, minute, second]);
			
			
			timer = setInterval(() => {
				let miaoshaStartTime = assertString(assertObject(that.miaoshaOptions).miaoshaStartTime);
				let miaoshaEndTime = assertString(assertObject(that.miaoshaOptions).miaoshaEndTime);
				let { tipTitle, hour, minute, second } = getMiaoshaTimeOption(miaoshaStartTime, miaoshaEndTime);
				that.tipTitle = tipTitle;
				that.$set(that, 'timeArr', [hour, minute, second]);
			}, 1000);
			that.getRobGoods(() => {}, true, true);

			// ???????????????
			let color = that.miaoshaOptions.miaoshaListPageBgColor
				? that.miaoshaOptions.miaoshaListPageBgColor
				: that.configInfo.web_site_color;
			uni.setNavigationBarColor({
				frontColor: '#ffffff', // ?????????
				backgroundColor: color,
				animation: {
					// ?????????
					duration: 100,
					timingFunc: 'easeIn'
				}
			});
		},

		/* 
				???????????????????????? 
				fn  ???????????????
				isHideLoading ????????????loading??????
				isLoad ????????? onload ???????????????  (???onload ??????????????????????????? ????????????????????? ??????)
			*/
		async getRobGoods(fn, isHideLoading, isLoad) {
			let that = this;
			let result = await that.$request({
				loading: !isHideLoading,
				url: '/api/Index/GetRobGoods',
				data: {
					page: that.page
				}
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					let rob = assertObject(resultObj.Rob);

					let { head, time_title, title, end_time, list: listArr } = rob;

					let arr = assertArray(listArr).map(item => {
						return {
							goodsId: item.goods_id, // ??????id
							goodsImage: item.image, // ????????????
							isHot: item.is_hot == 1, // ??????????????????
							isNew: item.is_new == 1, // ????????????
							goodsName: item.goods_name, // ????????????
							goodsDescription: item.goods_remark, // ????????????
							goodsTag: item.activity, // ??????????????????
							isVipPrice: item.is_vip_price == 1, // ??????????????????
							goodsPrice: item.shop_price, // ????????????
							vipPrice: item.vip_market_price, // ?????????
							linePrice: item.vip_market_price, // ?????????
							selectedNum: item.selectedNum, // ?????????????????????????????????
							isSpec: item.is_guige == 1, // ?????????????????????
							salesSumText: item.rob_num, // ????????????????????????
							tagImg: item.top_left_tag_img // ???????????????????????????
						};
					});
					if (arr.length < 1) {
						that.page--;
						if (that.page <= 1) {
							that.page = 1;
						}
					}
					fn && fn(arr);
					if (isLoad) {
						that.head = head;
						that.time_title = time_title;
						that.title = title;
						that.end_time = end_time;
					}
					that.listArr = that.listArr.concat(arr);
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
		// ????????????????????????
		loginEndFn() {
			let that = this;
			that.page = 1;
			that.getRobGoods(() => {
				that.listArr = [];
			});
		},

		// ????????? ????????????????????? --------------------------------------------------------
		// ??????????????????????????????
		setGoodsSpec(bool) {
			let that = this;
			that.isShowGoodsSpec = bool;
			if (!bool) {
				that.goodsSpecSelectItemList = addSpecFilterItemActAttrFn(cloneFn(that.goodsSpecSelectItemList));
			}
		},
		// ??????????????? ???????????? ??????
		setSpecFilterItemActiveFn(arg) {
			let that = this;
			let { index, specFilterIndex } = arg;

			console.log('??????????????????', index, specFilterIndex);

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
		// ????????? ????????????????????? --------------------------------------------------------
	},
	
};
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background-color: $bg-grey-color;
}

.uni-load-more {
	background: $bg-grey-color;
}

.gb-green-block {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 750rpx;
	height: 774rpx;

	.box1 {
		position: absolute;
		top: 50rpx;
		left: 90rpx;
		width: 385rpx;
		height: 385rpx;
		border-radius: 50%;
		background-image: linear-gradient(80deg, rgba(255, 255, 255, 0.1) 40%, transparent 80%);
	}

	.box2 {
		position: absolute;
		top: -50rpx;
		left: -60rpx;
		width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
		background-image: linear-gradient(-80deg, rgba(255, 255, 255, 0.1) 40%, transparent 80%);
	}
}

.back-topbar-block {
	.content-wrap {
		display: flex;
		height: 88rpx;
		justify-content: space-between;
		align-items: center;
	}

	.back-btn {
		padding-right: 20rpx;

		image {
			width: 22rpx;
			height: 40rpx;
		}
	}

	button {
		background-color: transparent;
		border: none !important;
		padding: 0;
		margin: 0;

		&::after {
			border: none !important;
		}
	}

	.share-btn {
		image {
			width: 36rpx;
			height: 36rpx;
		}
	}
}

.today-seckill-block {
	height: 275rpx;
	display: flex;
	flex-direction: column;
	align-items: center;

	.h1 {
		position: relative;

		.text {
			display: inline-block;
			position: relative;
			z-index: 10;
			font-size: 60rpx;
			font-weight: 600;
			color: #fff;
			text-align: center;
			background-image: linear-gradient(top, #fff3dc, #ebc766 90%);
			-webkit-text-fill-color: transparent;
			-webkit-background-clip: text;
			-webkit-background-size: 200% 100%;
		}

		.box-show {
			position: absolute;
			z-index: 1;
			top: 0;
			color: transparent;
			text-shadow: 0 8rpx 5rpx #49ad57;
			font-size: 60rpx;
			font-weight: 600;
			white-space: nowrap;
		}
	}

	.news {
		margin-top: 30rpx;
		margin-bottom: 50rpx;
		text-align: center;
		width: 360rpx;
		height: 48rpx;
		line-height: 48rpx;
		background-image: linear-gradient(#fffcf0, #ffd487);
		font-weight: 600;
		font-size: 23rpx;
		color: #ff6128;
		// box-shadow: 0 5rpx 5rpx #4bab5c;

		text {
			color: #3a3129;
		}
	}
}

.goods-list-block {
	.content-wrap {
		font-size: 0;
		margin-bottom: -20rpx;

		.list-goods-item-div {
			display: inline-block;
			margin-right: 19rpx;
			margin-bottom: 20rpx;

			&:nth-child(2n) {
				margin-right: 0;
			}
		}
	}
}
</style>
