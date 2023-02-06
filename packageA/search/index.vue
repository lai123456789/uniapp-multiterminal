<template>
	<view>
		<view class="search-block">
			<view class="content-wrap">
				<uni-icons class="icon-search" size="20" :color="configInfo.web_site_color" type="search"></uni-icons>
				<input
					focus
					class="inp border-radius"
					type="text"
					@focus="setShowListFlag(false)"
					:placeholder="configInfo.search_default_text"
					v-model="searchKey"
					:style="{ border: `1px solid ${configInfo.web_site_color}` }"
				/>
				<view class="flex-center text" @click="searchFn" :style="{ background: configInfo.web_site_color }">
					搜索
				</view>
			</view>
		</view>

		<view v-if="!showListFlag">
			<view class="content-wrap" v-if="searchKeyList.length > 0">
				<view class="push-msg history-block">
					<view class="title">
						<text>历史搜索</text>
						<uni-icons @click="delHistoryKeyFn" type="trash" size="15" color="#595557"></uni-icons>
					</view>
					<view class="tag-list">
						<view
							class="history-tag tag-box"
							v-for="(item, index) in searchKeyList"
							:key="index"
							@click="hisBtnTxtFn(item)"
						>
							{{ item }}
						</view>
					</view>
				</view>
			</view>
			<view class="content-wrap" v-if="hotSearchKeyList.length > 0" style="padding-bottom: 20rpx;">
				<view class="push-msg hot-block">
					<view class="title">{{ hotSearchInfo.search_name ? hotSearchInfo.search_name : '热门搜索' }}</view>
					<view class="tag-list">
						<view
							class="hot-tag tag-box"
							v-for="(item, index) in hotSearchKeyList"
							:key="index"
							@click="hotBtnTxtFn(item)"
						>
							<image v-if="item.is_hot - 0" :src="hotSearchInfo.search_hot_image" mode=""></image>
							<text v-if="item.is_hot - 0" :style="{ color: hotSearchInfo.search_hot_font_color }">
								{{ item.name }}
							</text>
							<text v-else :style="{ color: hotSearchInfo.search_font_color }">{{ item.name }}</text>
						</view>
					</view>
				</view>
			</view>

			<view v-if="likeGoodsList.length" class="like-goods-list">
				<view class="like-goods-list-bar">
					<view class="bar-title">
						<view class="after-dom">
							<view class="icon-O"></view>
							<view class="icon-I"></view>
						</view>
						<view class="before-dom">
							<view class="icon-O"></view>
							<view class="icon-I"></view>
						</view>
						<!-- {{ likeGoodsTitle }} -->
						热门搜索
					</view>
				</view>

				<view class="bottom-shop-list">
					<view class="content-wrap">
						<view class="list-goods-item-div" v-for="(item, index) in likeGoodsList" :key="index">
							<list-goods-item
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
								:tag-img="item.tagImg"
								:gysMdId="item.gysMdId"
								:gysMdName="item.gysMdName"
							></list-goods-item>
						</view>
					</view>
				</view>
			</view>
		</view>

		<block v-else>
			<view class="nav-bar" v-if="shopListData.length > 0">
				<view class="content-wrap">
					<view class="nav-bar-block">
						<view
							v-for="(item, index) in ruleList"
							:key="index"
							class="tag-block border-radius"
							:class="[item.is_active ? 'greenStyle' : 'defaultStyle']"
							@click="ruleClickFn(item)"
							:style="{
								background: item.is_active ? hexToRgba(configInfo.web_site_color, 0.16) : '#efefef',
								color: item.is_active ? configInfo.web_site_color : '#afafaf',
								border: item.is_active ? '1px solid ' + configInfo.web_site_color : '#efefef'
							}"
						>
							{{ item.name }}
							<block v-if="item.name == '价格'">
								<uni-icons
									v-if="screen == 'price_up'"
									class="deg180"
									type="arrowdown"
									:color="configInfo.web_site_color"
									size="10"
								></uni-icons>
								<uni-icons
									v-if="screen == 'price_next'"
									type="arrowdown"
									:color="configInfo.web_site_color"
									size="10"
								></uni-icons>
							</block>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom-shop-list" v-if="shopListData.length > 0">
				<view class="content-wrap">
					<view class="list-goods-item-div" v-for="(item, index) in shopListData" :key="index">
						<list-goods-item
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
							:tag-img="item.tagImg"
							:gysMdId="item.gysMdId"
							:gysMdName="item.gysMdName"
						></list-goods-item>
					</view>
				</view>
			</view>
			<null-block v-else></null-block>

			<view class="uni-load-more" v-if="shopListData.length >= 6">
				<uni-load-more :status="loadMoreStatus"></uni-load-more>
			</view>
		</block>

		<to-top-btn :flag="isShowToTopBtn"></to-top-btn>



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
	
import { assertObject, assertArray, cloneFn, addSpecFilterItemActAttrFn, transNumFn } from '@/tools/tools.js';
export default {
	data() {
		return {
			loadMoreStatus: 'more', // 底部网络状态
			searchKey: '', // 关键字
			searchKeyList: [], // 搜索历史 关键字数据
			showListFlag: false, // 是否显示搜索商品列表
			hotSearchInfo: {}, // 搜索的一些配置信息
			hotSearchKeyList: [], // 热门搜索关键字数据
			shopListData: [], // 搜索结果 商品列表数据
			screen: '',
			page: 1, // 分页数
			ruleList: [], // 规则数据
			logData: {},

			likeGoodsTitle: '', // 猜你喜欢商品的标题文字
			likeGoodsList: [], // 猜你喜欢商品数据
			isOnReachBottomFlag: false, // false 不能下拉加载更多 , true 可以

			// ↓↓↓ 多规格相关--------------------------------------------------------
			isShowGoodsSpec: false, // 是否显示多规格弹框
			goodsSpecSelectItemList: [{}], // 多规格项
			goodsSpecRowsList: {}, // 多规格 笛卡尔积项对应的 商品 信息
			currentGoodsName: '', // 当前弹窗多规格的商品名字
			currentGoodsDescription: '', // 当前弹窗多规格的商品描述
			currentGoodsImages: '', // 当前弹窗多规格的商品图片
			currentGoodsId: '', // 当前弹窗多规格的商品id
			currentGoodsSelectedNum: '', // 当前弹窗多规格的商品即加入到购物车里的数量
			// ↑↑↑ 多规格相关--------------------------------------------------------
			loginBoxFlag:false, // 登录框显示隐藏状态
		};
	},

	onUnload() {
		uni.$off('goodsAddCartEd_searchIndex')
	},

	onLoad() {
		let that = this;
		that.handleLikeGoodsFn();


		uni.$off('goodsAddCartEd_searchIndex');
		// 加入完购物车 修改的数量
		uni.$on('goodsAddCartEd_searchIndex', arg => {
			let { selectedNum, goodsId } = arg;
			that.shopListData.forEach(item => {
				if (item.goodsId == goodsId) {
					item.selectedNum = selectedNum;
				}
			});

			that.likeGoodsList.forEach(item => {
				if (item.goodsId == goodsId) {
					item.selectedNum = selectedNum;
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


		that.getHotSearchList();
		let searchKeyList = uni.getStorageSync('homeSearchKeyList');
		let tem;
		if (searchKeyList) {
			tem = JSON.parse(searchKeyList);
		} else {
			tem = [];
		}
		that.searchKeyList = tem;

	

		// 监听多规格弹框事件
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId, page } = arg;

			let currentGoods = assertObject(
				[
					...assertArray(that.shopListData.filter(item => item.goodsId == goodsId)),
					...assertArray(that.likeGoodsList.filter(item => item.goodsId == goodsId))
				][0]
			);

			console.log('currentGoods', currentGoods);
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
		// 刷新页面
		refreshFn() {
			let that = this;
			that.page = 1;
			that.getSearchGoodsListFn(() => {
				that.shopListData = [];
			});
		},
		// 获取猜你喜欢 的 商品数据
		getLikeGoodsFn() {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let result = await that.$request({
					url: `/api/Cart/likeGoods`
				});

				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObj = assertObject(result.data.data);
						let likeGoodsObj = assertObject(resultObj.like);

						resFn({
							msg: result.data.msg,
							result: {
								likeGoodsTitle: likeGoodsObj.name,
								likeGoodsList: assertArray(likeGoodsObj.value)
							}
						});
					} else {
						rejFn({
							msg: result.data.msg,
							result
						});
					}
				} else {
					rejFn({
						msg: that.$errorMsg,
						result
					});
				}
			});
		},

		// 按照对应 规则 来排序
		ruleClickFn(item) {
			let that = this;
			let screen;
			that.page = 1;
			if (item.is_active) {
				if (!that.logData[item.name]) {
					that.logData[item.name] = 1;
				} else {
					that.logData[item.name]++;
				}
				screen = item.param[that.logData[item.name] % item.param.length];
			} else {
				screen = item.param[0];
			}
			that.screen = screen;

			that.getSearchGoodsListFn(() => {
				that.shopListData = [];
			});
			for (let i in that.logData) {
				if (i != item.name) {
					delete that.logData[i];
				}
			}
		},
		// 设置搜索列表的显示隐藏
		setShowListFlag(flag) {
			let that = this;
			that.showListFlag = flag;
			that.isOnReachBottomFlag = flag;
		},
		// 获取热门搜索列表
		async getHotSearchList() {
			let that = this;
			let result = await that.$request({
				url: '/api/Index/HotSearchList'
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					let Hot = assertObject(resultObj.Hot);
					that.hotSearchKeyList = assertArray(Hot.list);
					that.hotSearchInfo = Hot;
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
		// 根据关键字去搜索商品
		searchFn() {
			let that = this;
			if (!that.searchKey || that.searchKey.length <= 0) {
				that.searchKey = that.configInfo.search_default_text;
			}
			let searchKeyList = uni.getStorageSync('homeSearchKeyList');
			let tem;
			if (searchKeyList) {
				tem = JSON.parse(searchKeyList);
			} else {
				tem = [];
			}
			if (!tem.includes(that.searchKey)) {
				tem.push(that.searchKey);
				that.searchKeyList.push(that.searchKey);
			}
			uni.setStorageSync('homeSearchKeyList', JSON.stringify(tem));
			that.page = 1;
			that.logData = {};
			that.screen = '';
			that.getSearchGoodsListFn(() => {
				that.isOnReachBottomFlag = true;
				that.shopListData = [];
			}, true);
		},
		// 根据关键字搜索对应的商品列表
		async getSearchGoodsListFn(fn, isShowLoading) {
			let that = this;
			let result = await that.$request({
				loading: !!isShowLoading,
				url: '/api/Index/GoodsList',
				data: {
					param: that.searchKey,
					screen: that.screen,
					page: that.page
				}
			});
			that.setShowListFlag(true);

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					let goodsList = assertArray(resultObj.goods).map(item => {
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
							tagImg: item.top_left_tag_img, // 商品左上的图片标签
							gysMdId: transNumFn(item.supp_id), // 供应商门店id
							gysMdName: item.dp_name // 供应商门店名字
						};
					});
					let goodsRule = assertArray(resultObj.rule);
					if (goodsList.length < 1) {
						that.page--;
						if (that.page <= 1) {
							that.page = 1;
						}
					}
					console.log('获取的商品数据', goodsList);
					fn && fn(goodsList);
					that.shopListData = that.shopListData.concat(goodsList);
					if (goodsRule.length > 0) {
						that.ruleList = goodsRule;
					}
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
		// 加载更多
		onReachBottom() {
			let that = this;

			console.log('that.isOnReachBottomFlag', that.isOnReachBottomFlag);

			if (!that.isOnReachBottomFlag) {
				return false;
			}
			that.page++;
			that.loadMoreStatus = 'loading';
			that.getSearchGoodsListFn(list => {
				if (list.length <= 0) {
					that.loadMoreStatus = 'noMore';
				} else {
					that.loadMoreStatus = 'more';
				}
			});
		},
		hotBtnTxtFn(item) {
			this.hisBtnTxtFn(item.name);
		},
		hisBtnTxtFn(txt) {
			this.searchKey = txt;
			this.searchFn();
		},
		delHistoryKeyFn() {
			let that = this;
			uni.showModal({
				title: '提示',
				content: '删除历史记录',
				success(e) {
					if (e.confirm) {
						uni.setStorageSync('homeSearchKeyList', '');
						that.searchKeyList.splice(0, that.searchKeyList.length);
					}
				}
			});
		},
		// 处理购物车页面底部的猜你喜欢商品
		async handleLikeGoodsFn() {
			let that = this;
			try {
				let { result } = await that.getLikeGoodsFn();
				that.likeGoodsTitle = result.likeGoodsTitle;

				let likeGoodsList = result.likeGoodsList.map(item => {
					return {
						goodsId: item.goods_id, // 商品id
						goodsImage: item.original_img, // 商品图片
						isHot: item.is_hot == 1, // 是否热销爆款
						isNew: item.is_new == 1, // 是否新品
						goodsName: item.goods_name, // 商品名称
						goodsDescription: item.goods_remark, // 商品描述
						goodsTag: item.tag_name, // 商品标签文字
						isVipPrice: item.is_vip_price == 1, // 是否会员专享
						goodsPrice: item.shop_price, // 商品价格
						vipPrice: item.vip_market_price, // 会员价
						linePrice: item.vip_market_price, // 划线价
						selectedNum: item.selectedNum, // 已经添加到购物车的数量
						isSpec: item.is_guige == 1, // 商品是否多规格
						tagImg: item.topLeftTag, // 商品左上的图片标签
						gysMdId: transNumFn(item.supp_id), // 供应商门店id
						gysMdName: item.dp_name // 供应商门店名字
					};
				});

				that.likeGoodsList = likeGoodsList;
			} catch (e) {
				uni.showToast({
					icon: 'none',
					title: e.msg
				});
			}
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
	}
};
</script>

<style lang="scss" scoped>
.uni-load-more {
	background: $bg-grey-color;
}

.search-block {
	position: sticky;
	z-index: 20;
	top: 0;
	left: 0;
	width: 100%;
	background: #ffffff;

	.content-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		height: 88rpx;

		.icon-search {
			position: absolute;
			left: 42rpx;
		}

		.inp {
			flex: 1;
			box-sizing: border-box;
			padding: 0 1em 0 3em;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 26rpx;
			color: $grey2-color;
			background: #f7f7f7;
		}

		.text {
			margin-left: 14rpx;
			width: 100rpx;
			height: 60rpx;
			font-size: 30rpx;
			color: $grey1-color;
			color: #ffffff;
			border-radius: 10000px;
		}
	}
}

.push-msg {
	.title {
		display: flex;
		justify-content: space-between;
		margin-top: 28rpx;
		color: $grey1-color;
		line-height: 48rpx;
		font-weight: 600;
	}
}

.tag-list {
	font-size: 0;

	.tag-box {
		display: inline-block;
		font-size: 26rpx;
		color: $grey1-color;
		background: #f7f7f7;
		padding: 0.2em 0.6em;
		border-radius: 10rpx;
		margin: 10rpx;
	}

	.hot-tag {
		display: inline-flex;
		align-items: center;
		color: $red-color;

		image {
			width: 24rpx;
			height: 30rpx;
			margin-right: 0.2em;
		}
	}
}

.like-goods-list-bar {
	line-height: 88rpx;
	text-align: center;
	font-size: 30rpx;
	font-weight: 600;
	color: $grey1-color;
	background: $bg-grey-color;
	.bar-title {
		display: inline-block;
		position: relative;
		padding: 0 20rpx;
		.before-dom,
		.after-dom {
			position: absolute;
			top: 50%;
		}
		.icon-O {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 7rpx;
			height: 7rpx;
			background: $grey1-color;
			border-radius: 50%;
		}
		.icon-I {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 50rpx;
			height: 2rpx;
		}

		.before-dom {
			left: 0;
			transform: translateY(-50%) translateX(-100%);
			.icon-I {
				right: 0;
				background: linear-gradient(90deg, rgba(0, 0, 0, 0), $grey1-color);
			}
			.icon-O {
				right: 0;
			}
		}
		.after-dom {
			right: 0;
			transform: translateY(-50%) translateX(100%);
			.icon-I {
				left: 0;
				background: linear-gradient(-90deg, rgba(0, 0, 0, 0), $grey1-color);
			}
			.icon-O {
				left: 0;
			}
		}
	}
}
.like-goods-list {
	background: $bg-grey-color;
	font-size: 0;

	.list-goods-item-div {
		display: inline-block;
		margin-right: 19rpx;
		margin-bottom: 20rpx;

		&:nth-child(2n) {
			margin-right: 0;
		}
	}
}

.bottom-shop-list {
	min-height: 90vh;
	background: $bg-grey-color;
	padding-top: 20rpx;
	margin-bottom: -20rpx;
	font-size: 0;

	.list-goods-item-div {
		display: inline-block;
		margin-right: 19rpx;
		margin-bottom: 20rpx;

		&:nth-child(2n) {
			margin-right: 0;
		}
	}
}

.nav-bar {
	position: sticky;
	z-index: 20;
	top: 88rpx;
	left: 0;
	width: 100%;
	background: #ffffff;

	.nav-bar-block {
		height: 88rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		.tag-block {
			@include flex-center;
			margin-left: 55rpx;
			width: 90rpx;
			height: 44rpx;
			white-space: nowrap;

			.deg180 {
				transform: rotate(180deg);
			}
		}
	}
}
</style>
