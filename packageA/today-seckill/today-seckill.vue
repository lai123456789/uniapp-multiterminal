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

		<!-- 登录框组件 -->
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
			miaoshaOptions: store => store.home.miaoshaOptions //  秒杀模块的 样式配置
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

			tipTitle: '', // 距离结束 or 距离开始

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
			cardNumber: 0 // 购物车数量

		};
	},
	onUnload() {
		uni.$off('goodsAddCartEd_todaySeckill')
		clearInterval(timer);
		console.log('packageA/today-seckill/today-seckill 卸载');
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
		
		// 监听购物车数量改变
		uni.$off('setCardNumberFn');
		uni.$on('setCardNumberFn', cardNumber => {
			that.cardNumber = cardNumber;
		});
		that.setTabBarCartNumFn();
		
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
		

		// 监听多规格弹框事件
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId } = arg;

			let currentGoods = assertObject(assertArray(that.listArr.filter(item => item.goodsId == goodsId))[0]);

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
	// 下拉刷新
	onPullDownRefresh() {
		let that = this;
		that.page = 1;
		that.getRobGoods(() => {
			that.listArr = [];
			uni.stopPullDownRefresh();
		}, true);
	},
	// 触底事件
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
		// load 生命周期执行的函数
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

			// 设置主题色
			let color = that.miaoshaOptions.miaoshaListPageBgColor
				? that.miaoshaOptions.miaoshaListPageBgColor
				: that.configInfo.web_site_color;
			uni.setNavigationBarColor({
				frontColor: '#ffffff', // 必写项
				backgroundColor: color,
				animation: {
					// 可选项
					duration: 100,
					timingFunc: 'easeIn'
				}
			});
		},

		/* 
				获取秒杀商品列表 
				fn  成功的回调
				isHideLoading 是否隐藏loading加载
				isLoad 是否是 onload 触发执行的  (是onload 触发会复制所有结果 不是的话只赋值 列表)
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
							goodsId: item.goods_id, // 商品id
							goodsImage: item.image, // 商品图片
							isHot: item.is_hot == 1, // 是否热销爆款
							isNew: item.is_new == 1, // 是否新品
							goodsName: item.goods_name, // 商品名称
							goodsDescription: item.goods_remark, // 商品描述
							goodsTag: item.activity, // 商品标签文字
							isVipPrice: item.is_vip_price == 1, // 是否会员专享
							goodsPrice: item.shop_price, // 商品价格
							vipPrice: item.vip_market_price, // 会员价
							linePrice: item.vip_market_price, // 划线价
							selectedNum: item.selectedNum, // 已经添加到购物车的数量
							isSpec: item.is_guige == 1, // 商品是否多规格
							salesSumText: item.rob_num, // 已抢购的文字信息
							tagImg: item.top_left_tag_img // 商品左上的图片标签
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
		// 登录成功后的回调
		loginEndFn() {
			let that = this;
			that.page = 1;
			that.getRobGoods(() => {
				that.listArr = [];
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
		}
		// ↑↑↑ 多规格相关方法 --------------------------------------------------------
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
