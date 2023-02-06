<template>
	<view :class="[huiyuanshuoming ? 'stopScrollStyle' : '']">
		<view class="user-info-block">
			<view class="user-info">
				<image class="gb-image" :src="calcImageSrc('/my/vip-bg.png')"></image>
				<view class="content-wrap">
					<view class="user-image-block" @click="openLoginFn">
						<image class="user-hat" v-if="userinfo.is_vip == 1" :src="calcImageSrc('/my/hat.png')"></image>

						<image
							class="user-image"
							:src="isLogin ? userInfoAvatar : calcImageSrc('/my/per0.png')"
						></image>
					</view>
					<view class="user-name-block">
						<view class="vip-block" style="overflow: initial;">
							<view class="flg user-name" @click="openLoginFn">
								{{ isLogin ? userinfo.nickname : '未登录' }}
							</view>

							<view class="api" @click="huiyuanshuoming = true">
								{{ VipData.vip_explain_title }}
								<uni-icons style="margin-left: .3em;" size="15" color="#ffffff" type="help"></uni-icons>
							</view>
						</view>

						<view class="vip-block">
							<view class="flg">{{ isLogin ? userinfo.vip_name : '' }}</view>
							<view class="api">{{ userinfo.vip_end_time ? userinfo.vip_end_time : '' }}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="vip-card-block" :style="{ height: isHideMsg ? '250rpx' : '310rpx' }">
				<view class="content-wrap">
					<view class="card-A">
						<view>
							<image :src="calcImageSrc('/my/lb.png')" mode=""></image>
							<text>
								{{ VipData.vip_info.vip_point ? VipData.vip_info.vip_point : '开通会员享特权' }}
							</text>
						</view>
					</view>
					<view class="card-B" :style="{ top: isHideMsg ? '0' : '56rpx' }">
						<view class="card-B-title">
							<view>
								<image :src="calcImageSrc('/my/my-log.png')" mode=""></image>
								<text>
									{{ userinfo.is_vip == 0 ? VipData.vip_info.vip_point : VipData.vip_info.vip_eco }}
								</text>
							</view>

										

							<view class="navigator border-radius" @click="navigateToFn({ checkLogin: true, url: `/packageA/kaitonghuiyuan/index` })">
								{{ VipData.vip_button }}
							</view>
						</view>
						<view class="icon-list">
							<view class="h3">{{ isLogin ? userinfo.vip_name : '优享会员' }}</view>
							<view class="h4">
								<block v-if="isLogin && userinfo.is_vip != 0">
									{{ VipData.vip_info.vip_privilege }}
								</block>
							</view>
						</view>

						<image :src="calcImageSrc('/my/bg-logo-wxsx.png')" class="bg-logo"></image>
					</view>
				</view>
			</view>
		</view>

		<block v-for="(item, index) in VipData.vip_list" :key="index">
			<view class="title-bar">
				<image :src="calcImageSrc('/my/icon-3line.png')" mode=""></image>
				<text>{{ item.title }}</text>
				<image :src="calcImageSrc('/my/icon-3line.png')" mode=""></image>
			</view>

			<block v-if="item.type == 0">
				<view class="icon-list-block">
					<view class="item" v-for="(item1, index1) in item.ct.list" :key="index1">
						<view class="images-block"><image :src="item1.icon"></image></view>
						<text>{{ item1.name }}</text>
					</view>
				</view>
				<view class="yellow-btn" @click="navigateToFn({ checkLogin: true, url: `/packageA/kaitonghuiyuan/index`})">
					{{ item.ct.button }}
				</view>
			</block>

			<block v-else-if="item.type == 2">
				<view class="task-block">
					<view class="content-wrap">
						<view class="task-cont border-radius20">
							<view class="title-line">
								<view class="h4">{{ item.ct.month_title }}</view>


								<view class="h5" @click="navigateToFn({ checkLogin: true, url: `/packageA/kaitonghuiyuan/huiyuanrenwu` })">
									查看详情
									<uni-icons size="15" type="arrowright"></uni-icons>
								</view>
							</view>
							<view class="h3">{{ item.ct.title }}</view>
							<view class="p" v-if="item.ct.sub_title">({{ item.ct.sub_title }})</view>
							<view class="red-pack-block">
								<view class="item" v-for="(item3, index3) in item.ct.list" :key="index3">
									<image :src="calcImageSrc('/my/used.png')" mode=""></image>
									<text class="RMB">{{ item3.money }}元</text>
									<text class="danshu">{{ item3.order }}单</text>
								</view>
							</view>
							<view class="yellow-btn" @click="navigateToFn({ checkLogin: true, url: `/packageA/kaitonghuiyuan/huiyuanrenwu` })">
								{{ item.ct.button }}
							</view>
							<view class="h6">{{ item.ct.money_text }}</view>
						</view>
					</view>
				</view>
			</block>

			<block v-else-if="item.type == 4">
				<view class="bottom-shop-list">
					<view class="content-wrap">
						<view class="list-goods-item-div" v-for="(goodsItem, indx) in item.ct.goodsList" :key="indx">
							<!-- list-goods-item -->
							<show-goods
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
							></show-goods>
						</view>
					</view>
				</view>
				<view class="yellow-btn" @click="navigateToFn({ url: `/packageA/kaitonghuiyuan/vip-goods-list` })">查看更多</view>
			</block>

			<block v-else>
				<view class="banner-image-block border-radius20"><image :src="item.ct.info" mode=""></image></view>
			</block>
		</block>

		<view
			class="yellow-btn"
			style="margin-top: 40rpx;margin-bottom: 20rpx"
			@click="navigateToFn({ checkLogin: true, url: `/packageA/kaitonghuiyuan/index`})"
		>
			开通会员
		</view>

		<modal-box :show="huiyuanshuoming" @closeFn="huiyuanshuoming = false">
			<template slot="title">
				{{ VipData.vip_explain_title }}
			</template>
			<template slot="content">
				<view>
					<block v-for="(item, index) in VipData.vip_explain_list" :key="index">
						<view class="h5_title">{{ index + 1 }}、{{ item.title }}</view>
						<view class="h6_content">{{ item.details }}</view>
					</block>
				</view>
			</template>
		</modal-box>

		
		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="getVipEquityDetail" @close="closeGlobalLoginFn"></login-fn>

		<loading-css :is-show="isShowLoading"></loading-css>

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
import {
    mapState
} from 'vuex'
import { assertObject, assertArray, cloneFn, addSpecFilterItemActAttrFn, transNumFn } from '@/tools/tools.js';
import modalBox from '@/df-components/modal-box';
import showGoods from './huiyuan-components/show-goods.vue';

							

export default {
	components: {
		modalBox,
		showGoods
	},
	data() {
		return {
			isShowLoading: true, // 开屏动画

			huiyuanshuoming: false,

			VipData: {
				vip_button: '',
				vip_explain_list: [],
				vip_explain_title: '',
				vip_info: {
					vip_eco: '',
					vip_point: '',
					vip_privilege: ''
				},
				vip_list: [],
				vip_name: ''
			},
			userinfo: {},

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
		uni.$off('goodsAddCartEd_huiyuanjieshao')
	},

	onLoad() {
		let that = this;
		uni.$off('goodsAddCartEd_huiyuanjieshao')
		uni.$on('goodsAddCartEd_huiyuanjieshao', arg => {

			let { selectedNum, goodsId } = arg;

			that.VipData.vip_list.forEach(item => {
				if (item.type == 4) {
					item.ct.goodsList.forEach(goodsItem => {
						if (goodsItem.goodsId == goodsId) {
							goodsItem.selectedNum = selectedNum;
							console.log('赋值完的商品数量', goodsItem.selectedNum)
						}
					});
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

		// 监听多规格弹框事件
		uni.$off('popSpecBlock');
		uni.$on('popSpecBlock', async arg => {
			let { goodsId } = arg;
			let currentGoods;
			that.VipData.vip_list.forEach(item => {
				if (item.type == 4) {
					item.ct.goodsList.forEach(goodsItem => {
						if (goodsItem.goodsId == goodsId) {
							currentGoods = goodsItem;
						}
					});
				}
			});

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

		that.getVipEquityDetail();
	},
	computed: {
		isHideMsg() {
			let that = this;
			if (that.userinfo.is_vip == 0 && !that.VipData.vip_info.vip_point) {
				return true;
			}
			if (that.userinfo.is_vip != 0 && !that.VipData.vip_info.vip_eco) {
				return true;
			}
			return false;
		}
	},
	methods: {
		// 未登录的时候 打开登录框
		openLoginFn() {
			let that = this;
			if (that.isLogin) {
				return false;
			}
			that.closeGlobalLoginFn(true);
		},
		// 获取开通vip页面的数据
		async getVipEquityDetail() {
			let that = this;
			let result = await that.$request({
				url: '/api/User/VipEquityDetail'
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					let vipData = assertObject(resultObj.VipData);

					vipData.vip_list = assertArray(vipData.vip_list);
					vipData.vip_list.forEach(item => {
						if (item.type == 4) {
							let goodsList = cloneFn(assertArray(item.ct.goods_list));
							item.ct.goodsList = goodsList.map(goodsItem => {
								return {
									goodsId: goodsItem.goods_id, // 商品id
									goodsImage: goodsItem.image, // 商品图片
									isHot: goodsItem.is_hot == 1, // 是否热销爆款
									isNew: goodsItem.is_new == 1, // 是否新品
									goodsName: goodsItem.goods_name, // 商品名称
									goodsDescription: goodsItem.goods_remark, // 商品描述
									goodsTag: goodsItem.activity, // 商品标签文字
									isVipPrice: goodsItem.is_vip_price == 1, // 是否会员专享
									goodsPrice: goodsItem.shop_price, // 商品价格
									vipPrice: goodsItem.vip_market_price, // 会员价
									linePrice: goodsItem.vip_market_price, // 划线价
									selectedNum: transNumFn(goodsItem.selectedNum), // 已经添加到购物车的数量
									isSpec: goodsItem.is_guige == 1 ,// 商品是否多规格
									tagImg: goodsItem.top_left_tag_img, // 商品左上的图片标签
								};
							});
						}
					});

					that.VipData = vipData;
					that.userinfo = assertObject(resultObj.userinfo);
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
		// 点击 按钮 追加更多 商品
		/* 
		async loadMoreFn() {
			let that = this;
			let result = await that.$request({
				loading: 1,
				method: 'post',
				url: '/api/Index/getGoodslist'
			});
			console.log(result, '点击 按钮 追加更多 商品', '\n');

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					if (result.data.data.list.length > 0) {
						result.data.data.list.forEach(item => {
							item.activity = '会员专享';
							item.huiyuan_price = item.vip_market_price;
							item.market_price = item.shop_price;
						});

						that.VipData.vip_list.forEach(item => {
							if (item.type == 4) {
								item.ct.goods_list = item.ct.goods_list.concat(result.data.data.list);
							}
						});
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
		}
		*/
		
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
			userInfoAvatar: store => store.userInfo.userInfoAvatar, // 头像地址
		})
	}
};
</script>

<style lang="scss" scoped>
.user-info-block {
	position: relative;
	background: #272525;

	.user-info {
		position: relative;

		.gb-image {
			width: 750rpx;
			height: 180rpx;
			position: absolute;
			z-index: 5;
		}

		.content-wrap {
			display: flex;
			align-items: center;
			position: relative;
			z-index: 10;
			height: 180rpx;

			.time-tips {
				position: absolute;
				right: 24rpx;
				bottom: 0;
				color: #374050;
				font-size: 20rpx;
			}
		}

		.user-image-block {
			display: inline-block;
			width: 132rpx;
			height: 142rpx;
			position: relative;

			.user-hat {
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				transform: translate(0rpx, -3rpx);
				width: 62rpx;
				height: 52rpx;
			}

			.user-image {
				position: absolute;
				z-index: 10;
				top: 50%;
				left: 50%;
				width: 96rpx;
				height: 96rpx;
				transform: translate(-50%, -50%);
				border-radius: 50%;
				border: 2px solid #fff7da;
			}
		}

		.user-name-block {
			margin-left: 17rpx;
			display: inline-flex;
			flex-direction: column;
			justify-content: space-around;
			height: 100rpx;
			flex: 1;

			.user-name {
				color: #ffffff;
				font-weight: 600;
				font-size: 26rpx;
			}

			.vip-block {
				display: flex;
				justify-content: space-between;
				color: #ffcf80;
				font-size: 20rpx;

				.api {
					color: #ffffff;
				}
			}
		}
	}

	.vip-card-block {
		width: 702rpx;
		height: 310rpx;
		position: relative;

		.card-A {
			position: absolute;
			top: 0;
			width: 100%;
			height: 160rpx;
			background-image: linear-gradient(90deg, #ffe9ab, #ffb4bf);
			border-radius: 20rpx 20rpx 0 0;
			box-shadow: 0 -1px 1px #fffbd9;

			image {
				width: 26rpx;
				height: 26rpx;
				margin: 0 20rpx;
			}

			text {
				font-size: 20rpx;
				color: #4a4033;
			}

			> view {
				display: flex;
				line-height: 1.5em;
				align-items: center;
			}
		}

		.card-B {
			overflow: hidden;
			position: absolute;
			top: 56rpx;
			width: 100%;
			height: 255rpx;
			background-image: linear-gradient(90deg, #706a6b, #281c1f);
			border-radius: 20rpx 20rpx 0 0;

			.card-B-title {
				position: relative;
				z-index: 10;
				border-bottom: 1px solid #615f5c;
				height: 80rpx;
				margin: 0 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				image {
					width: 30rpx;
					height: 24rpx;
					margin-right: 20rpx;
				}

				text {
					font-size: 26rpx;
					color: #ffcf80;
				}

				.navigator {
					width: 140rpx;
					height: 48rpx;
					font-size: 24rpx;
					color: #3a3129;
					display: flex;
					justify-content: center;
					align-items: center;
					background-image: linear-gradient(90deg, #ffe894, #ffde62);
				}
			}

			.icon-list {
				position: relative;
				z-index: 10;
				margin: 18rpx 20rpx 0;
				display: flex;
				flex-wrap: wrap;
				height: 50%;
				align-items: center;

				.h3 {
					font-size: 45rpx;
					font-weight: 600;
					color: #fed58e;
				}

				.h4 {
					text-indent: 0.8em;
					font-size: 34rpx;
					color: #feecc0;

					text {
						font-size: 45rpx;
						color: #fed58e;
					}
				}
			}

			.bg-logo {
				position: absolute;
				z-index: 1;
				right: 0;
				bottom: -15rpx;
				width: 193rpx;
				height: 243rpx;
			}
		}
	}
}

.title-bar {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 118rpx;
	font-size: 36rpx;
	font-weight: 600;
	position: relative;
	z-index: 10;
	background: #ffffff;

	image {
		width: 60rpx;
		height: 40rpx;
	}

	text {
		padding: 0 0.8em;
		color: #3a3129;
		font-size: 26rpx;
	}
}

.bottom-shop-list {
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

.icon-list-block {
	font-size: 0;
	margin: 20rpx 0;

	.item {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		width: 185rpx;

		.images-block {
			@include flex-center;
			width: 100rpx;
			height: 100rpx;
			// background-image: linear-gradient(135deg, #ffe7b4, #ffd893);
			background-image: linear-gradient(135deg, #fff9ee, #ffe6ba);

			border-radius: 40rpx;

			image {
				width: 45rpx;
				height: 45rpx;
			}
		}

		text {
			font-size: 24rpx;
			color: #3a3129;
			line-height: 64rpx;
		}
	}
}

.yellow-btn {
	margin: 0 auto;
	@include flex-center;
	width: 578rpx;
	height: 100rpx;
	font-size: 30rpx;
	color: #3b322a;
	background-image: linear-gradient(90deg, #ffe894, #ffdd61);
	border-radius: 10000rpx;
	font-weight: 600;
	box-shadow: 0 5rpx 20rpx #fff3c8;
}

.task-block {
	.task-cont {
		background: #fff9e8;

		.title-line {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			height: 80rpx;
			border-bottom: 1px solid #ffffff;
			color: #3a3129;

			.h4 {
				font-size: 26rpx;
			}

			.h5 {
				font-size: 22rpx;
			}
		}

		.h3 {
			margin-top: 30rpx;
			font-size: 34rpx;
			font-weight: 600;
			color: #3a3129;
			text-align: center;
		}

		.p {
			font-size: 22rpx;
			color: #3a3129;
			line-height: 80rpx;
			text-align: center;
		}

		.red-pack-block {
			display: flex;
			justify-content: space-around;
			position: relative;
			margin: 48rpx 0 40rpx;
			font-size: 0;

			&::after {
				content: '';
				display: block;
				position: absolute;
				z-index: 5;
				top: 50%;
				width: 80%;
				height: 4rpx;
				background: #ffe5b0;
			}

			.item {
				display: inline-block;
				position: relative;
				z-index: 10;

				.RMB {
					position: absolute;
					left: 50%;
					top: 30rpx;
					font-weight: 600;
					transform: translateX(-50%);
					font-size: 30rpx;
					color: #ea3a37;
				}

				.danshu {
					position: absolute;
					left: 50%;
					bottom: 20rpx;
					transform: translateX(-50%);
					font-size: 26rpx;
					color: #ffffff;
				}

				image {
					display: block;
					width: 138rpx;
					height: 168rpx;
				}
			}
		}

		.h6 {
			text-align: center;
			line-height: 62rpx;
			color: $grey2-color;
			font-size: 20rpx;
		}
	}
}

.banner-image-block {
	margin: 0 auto;
	width: 702rpx;
	height: 200rpx;
	overflow: hidden;

	image {
		width: 100%;
		height: 100%;
	}
}

.h5_title {
	margin-top: 20rpx;
	font-size: 26rpx;
	color: $grey1-color;
}

.h6_content {
	text-indent: 1.3em;
	font-size: 26rpx;
	color: $grey2-color;
}
</style>
