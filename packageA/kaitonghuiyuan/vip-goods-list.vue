<!--
	会员专属商品列表页面
-->
<template>
	<view
		class="page"
		:style="{
			background: pageBgStyle.isSetStyle ? `linear-gradient(180deg, ${pageBgStyle.bgColor},#f5f5f5)` : '#f5f5f5'
		}"
	>
		<view class="goods-list-page-banner-wrap" v-if="pageBgStyle.isSetStyle">
			<image class="image-dom" :src="pageBgStyle.bgImg" mode="widthFix"></image>
		</view>
		
		
		
		<!-- 
			vip 会员商品 列表
		 -->
		<loading-css :is-show="isShowLoading"></loading-css>

		<null-block min-height="100vh" v-if="goodsList.length == 0"></null-block>
		<fixed-cart-icon :scroll-is-stop="mixinScrollIsStop" :cardNumber="cardNumber"></fixed-cart-icon>

		<view class="list-block">
			<view class="list-goods-item-row" v-for="(goodsItem, index) in goodsList" :key="index">
				<!--
					list-goods-item-row
				-->
				<show-goods-row
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
					:tag-img="item.tagImg"
					:is-last="index + 1 == goodsList.length"
				></show-goods-row>
			</view>
		</view>
		<view class="uni-load-more" v-if="goodsList.length > 6">
			<uni-load-more :status="loadMoreStatus"></uni-load-more>
		</view>

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn"></login-fn>


		
		
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
	</view>
</template>
<script>
// 工具库 相关
import { assertObject, assertArray, cloneFn, addSpecFilterItemActAttrFn, transNumFn } from '@/tools/tools';
import { showGoodsRow } from './huiyuan-components/show-goods-row.vue';


export default {
	components:{showGoodsRow},
	data() {
		return {
			isShowLoading: true, // 开屏动画
			loadMoreStatus: 'more', // 底部商品列表 下拉状态
			page: 1, // 当前页面索引
			goodsList: [], // 商品数据
			// ↓↓↓ 多规格相关数据 --------------------------------------------------------
			isShowGoodsSpec: false, // 是否显示多规格弹框
			goodsSpecSelectItemList: [{}], // 多规格项
			goodsSpecRowsList: {}, // 多规格 笛卡尔积项对应的 商品 信息
			currentGoodsName: '', // 当前弹窗多规格的商品名字
			currentGoodsDescription: '', // 当前弹窗多规格的商品描述
			currentGoodsImages: '', // 当前弹窗多规格的商品图片
			currentGoodsId: '', // 当前弹窗多规格的商品id
			currentGoodsSelectedNum: '' ,// 当前弹窗多规格的商品即加入到购物车里的数量
			// ↑↑↑ 多规格相关数据 --------------------------------------------------------
			loginBoxFlag:false, // 登录框显示隐藏状态
			cardNumber: 0 // 购物车数量
		};
	},
	onUnload() {
		uni.$off('goodsAddCartEd_vipGoodsList')
	},

	onLoad(options) {
		let that = this;
		uni.$off('goodsAddCartEd_vipGoodsList')
		uni.$on('goodsAddCartEd_vipGoodsList', arg => {
			let { selectedNum, goodsId } = arg;
			that.goodsList.forEach(goodsItem => {
				if (goodsItem.goodsId == goodsId) {
					goodsItem.selectedNum = selectedNum;
				}
			});
		});
	},
	onShow() {
		let that = this;

		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
		
		// 监听购物车数量改变
		uni.$off('setCardNumberFn');
		uni.$on('setCardNumberFn', cardNumber => {
			that.cardNumber = cardNumber;
		});
		that.setTabBarCartNumFn();
		
		that.isShowLoading = true;
		that.page = 1;
		that.getMoreGoodsFn(() => {
			that.goodsList = [];
		});

		
		
		// 监听多规格弹框事件
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId } = arg;
		
			let currentGoods = assertObject(assertArray(that.goodsList.filter(item => item.goodsId == goodsId))[0]);
		
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
		refreshFn() {
			let that = this;
			that.loadMoreStatus = 'more';
			that.page = 1;
			that.getMoreGoodsFn(() => {
				that.goodsList = [];
			});
		},

		async getMoreGoodsFn(fn, isShowLoading) {
			let that = this;
			let result = await that.$request({
				loading: !!isShowLoading,
				method: 'post',
				url: '/api/Index/getGoodslist',
				data: {
					page: that.page
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					let list = assertArray(resultObj.list).map(item => {
						return {
							goodsId: item.goods_id, // 商品id
							goodsImage: item.image, // 商品图片
							isHot: item.is_hot == 1, // 是否热销爆款
							isNew: item.is_new == 1, // 是否新品
							goodsName: item.goods_name, // 商品名字
							goodsDescription: item.goods_remark, // 商品描述
							isVipPrice: item.is_vip_price == 1, // 是否会员专享
							goodsPrice: item.shop_price, // 商品价格
							vipPrice: item.vip_market_price, // vip专享价
							linePrice: item.vip_market_price, // 划线价
							goodsTag: item.activity, // 商品标签
							selectedNum: transNumFn(item.selectedNum), // 加入到购物车里的数量
							isSpec: item.is_guige == 1, // 商品是否多规格
							tagImg: item.top_left_tag_img, // 商品左上的图片标签
						};
					});
					if (list.length < 1) {
						that.page--;
						if (that.page <= 1) {
							that.page = 1;
						}
					}

					fn && fn(list);
					that.goodsList = that.goodsList.concat(list);
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
			
			console.log('外部列表修改',index, specFilterIndex);
			
			
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
		
	},
	computed: {
		pageBgStyle() {
			let that = this;
	
			let goodsListBgStyleObj = assertObject(that.configInfo.gl_poster);
	
			let styuleObj = assertObject(goodsListBgStyleObj.kthy);
	
			if (styuleObj.bg_img && styuleObj.bg_color) {
				return {
					isSetStyle: true,
					bgImg: that.addimgPathHostFn(styuleObj.bg_img),
					bgColor: styuleObj.bg_color
				};
			}
			return {
				isSetStyle: false,
				bgImg: '',
				bgColor: ''
			};
		}
	},
	onReachBottom() {
		let that = this;
		that.page++;
		that.loadMoreStatus = 'loading';
		that.getMoreGoodsFn(list => {
			if (list.length > 0) {
				that.loadMoreStatus = 'more';
			} else {
				that.loadMoreStatus = 'noMore';
			}
		}, true);
	},
	onPullDownRefresh() {
		let that = this;
		that.loadMoreStatus = 'more';
		that.page = 1;
		that.getMoreGoodsFn(() => {
			that.goodsList = [];
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		}, true);
	}
};
</script>
<style lang="scss" scoped>
.page,
page {
	min-height: 100vh;
	overflow: hidden;
	background: $bg-grey-color;
}

.goods-list-page-banner-wrap {
	width: 750rpx;
	font-size: 0;
	.image-dom{
		width: 100%;
	}
}


.list-block {
	margin: 20rpx 20rpx 10rpx;
	.list-goods-item-row {
		margin-bottom: 20rpx;
		&:last-child{
			margin-bottom: 0
		}
	}
}


</style>
