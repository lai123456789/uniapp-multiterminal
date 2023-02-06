<template>
	<view class="page">
		<loading-css :is-show="isShowLoading"></loading-css>

		<!-- 选择 配送方式 组件 -->
		<pei-type
			:pei-type-arr="peiTypeArr"
			:pei-type-active="peiTypeActive"
			@setPeiTypeIndexFn="setPeiTypeIndexFn"
		></pei-type>

		<!-- 配送方式是 自提的情况下 展示的商家信息 -->
		<!-- 
		<view class="seller-address" v-if="calcPeiTypeId == peiTypeEnumObj[peiTypeZiti]">
			<view class="content-wrap">
				<view>提货地点:{{ sellerAddress }}</view>
				<view>店长信息:{{ sellerTel }}</view>
			</view>
		</view>
		-->
		<zitidian-show-seller
			v-if="calcPeiTypeId == peiTypeEnumObj[peiTypeZiti]"
			:seller-image="sellerImage"
			:seller-name="sellerName"
			:seller-tel="sellerMobile"
			:seller-open-time="sellerOpenTime"
			:seller-address="sellerAddress"
		></zitidian-show-seller>
		 

		<!-- 展示用户地址组件 -->
		<user-address
			:is-show-address="isShowAddress"
			:address-is-set="addressIsSet"
			:address-user-name="addressUserName"
			:address-user-tel="addressUserTel"
			:address-text="addressText"
			:address-tag-name="addressTagName"
		></user-address>

		<!-- 展示在页面上的自提点 -->
		<zitidian-show
			v-if="calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian]"
			:zitidian-info="currentzitidianInfo"
			:zitidian-is-all-not-range="zitidianIsAllNotRange"
			@openListModalFn="setduozitiModalFlagFn(true)"
		></zitidian-show>

		<!-- 自提点列表的模态框组件 -->
		<duoziti-modal
			:is-show="duozitiModalFlag"
			:zitidian-list="zitidianList"
			@closeFn="setduozitiModalFlagFn(false)"
			@selectZitiFn="selectZitiFn"
		></duoziti-modal>

		<view class="goods-list-block">
			<view class="content-wrap">
				<!-- 预约配送组件 -->

				<my-picker-comp
					:calc-post-type="calcPeiTypeId"
					:is-openyvyue-fun="isOpenyvyueFun"
					:yvyue-days="yvyueDays"
					:hours-arr="hoursArr"
					:new-to-day-hour-arr="newToDayHourArr"
					:days-index="daysIndex"
					:hours-index="hoursIndex"
					@pickerViewChangeFn="pickerViewChangeFn"
					@pickerViewClickFn="pickerViewClickFn"
					@pickerViewCancelFn="pickerViewCancelFn"
					@pickerViewColumnchangeFn="pickerViewColumnchangeFn"
					@isTomorrowStrFn="isTomorrowStrFn"
				></my-picker-comp>

				<view class="goods-list">
					<view class="item">
						<view class="item-image-block"><image :src="goodsDetailOriginalImg" mode=""></image></view>
						<view class="item-description-block">
							<view class="item-name">
								<text class="name-">{{ goodsDetailName }}</text>
								<text class="jifen">
									{{ isSpec ? currentgoodsJifen : goodsDetailexchangeScore }}积分
								</text>
							</view>
							<view class="item-description">
								<text class="description-">
									{{ isSpec ? `已选: ${specKeyStr}` : goodsDetailRemark }}
								</text>
							</view>
						</view>
					</view>

					<block
						v-if="
							calcPeiTypeId == peiTypeEnumObj[peiTypeZiti] ||
								calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian]
						"
					>
						<view class="line-block">
							<view class="h5">收货人</view>
							<view class="inp-block">
								<input type="text" placeholder="收货人" v-model="shouhuoren" />
							</view>
						</view>

						<view class="line-block">
							<view class="h5">手机号码</view>
							<view class="inp-block"><input type="text" placeholder="手机号码" v-model="haoma" /></view>
						</view>
					</block>

					<view class="line-block">
						<view class="h5">订单备注</view>
						<view class="h6">
							<view class="input-beizhu-block">
								<input
									class="show-style input-beizhu"
									v-model="textarea"
									:style="{ opacity: beizhuInputFlag ? 1 : 0 }"
									type="text"
									@blur="setBeizhuInputFlagFn(false)"
									@focus="setBeizhuInputFlagFn(true)"
								/>
								<!-- </input> -->
								<view
									class="show-style input-beizhu-text-view"
									:style="{ opacity: beizhuInputFlag ? 0 : 1 }"
								>
									{{ textarea ? textarea : '示例:订单备注' }}
								</view>
							</view>
						</view>
					</view>
					<!-- <textarea class="textarea" v-model="textarea" placeholder="示例:订单备注" /> -->

					<view class="line-block" @click="quehuoIsOpen = !quehuoIsOpen">
						<view class="h5">如遇缺货</view>
						<view class="h6">
							{{ quehuo[quehuoCurr].name }}
							<uni-icons
								:class="quehuoIsOpen ? 'deg90' : ''"
								size="13"
								color="#374050"
								type="arrowright"
							></uni-icons>
						</view>
					</view>

					<view class="line-cont-block" v-if="quehuoIsOpen">
						<view
							class="line-cont"
							v-for="(item, index) in quehuo"
							:key="index"
							@click="quehuoItemFn(index)"
						>
							<text>{{ item.name }}</text>
							<uni-icons v-if="quehuoCurr != index" size="22" type="circle" color="#c7c7c7"></uni-icons>
							<uni-icons v-else size="22" type="circle-filled" color="#6ccc4f"></uni-icons>
						</view>
					</view>

					<view class="line-block">
						<view class="h5"></view>
						<view class="h6">
							<text>使用积分:</text>
							<view class="price">{{ integralNum }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view style="width:100vw; height: 100rpx;"></view>
		<view class="order-btn-block">
			<view class="price-all">
				使用积分:
				<view class="shop-price-block-lr">
					<view class="origin-price">
						<text>{{ integralNum }}</text>
					</view>
				</view>
			</view>
			<view
				class="order-btn"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				@click="$onceClick(payFn)"
				:style="{ background: configInfo.web_site_color,opacity: payBtnFlag ? 1 : 0.8  }"
				
				
			>
				立即兑换
			</view>
		</view>
	</view>
</template>

<script>
import {
	// ↓↓ 支付方式 ===========================
	payTypeyve,
	payTypeWxxcx,
	payTypeWxapp,
	payTypeZfbapp,
	payTypeEnumObj,
	// ↓↓ 配送方式 ===========================
	peiTypeShangjia,
	peiTypeZiti,
	peiTypeKuaidi,
	peiTypeDada,
	peiTypeShansong,
	peiTypeDuozitidian,
	peiTypeEnumObj
} from '@/tools/const.js';

import {
	checkTypeFn,
	checkTelReg,
	assertArray,
	assertObject,
	createHoursArr,
	transNumFn,
	num2zeroStr,
	tomorrowStr
} from '@/tools/tools';
import peiType from '@/pages/order/order-components/pei-type.vue'; // 配送方式组件
import userAddress from '@/pages/order/order-components/user-address.vue'; // 展示用户地址组件
import zitidianShow from '@/pages/order/order-components/duozitidian/zitidian-show.vue'; // 展示在页面上的自提点
import duozitiModal from '@/pages/order/order-components/duozitidian/duoziti-modal.vue'; // 自提点列表的模态框组件

import myPickerComp from '@/pages/order/order-components/my-picker-comp.vue'; // 选时间组件
import zitidianShowSeller from '@/pages/order/order-components/zitidian-show-seller.vue'; // 展示在页面上的自提点 商家自提类型



/*
	把 2:09 格式时间 转 xx个小时
*/
function getHour(str) {
	let [hour,min] = str.split(':');
	hour = transNumFn(hour)
	min = transNumFn(min)
	if(hour>0){
		return hour;
	}
	return 1
}

export default {
	components: {
		peiType,
		userAddress,
		zitidianShow,
		duozitiModal,
		myPickerComp,
		zitidianShowSeller
	},
	data() {
		return {
			isShowLoading: true, // 开屏动画

			peiTypeShangjia,
			peiTypeZiti,
			peiTypeKuaidi,
			peiTypeDada,
			peiTypeShansong,
			peiTypeDuozitidian,
			peiTypeEnumObj,

			goodsDetailId: '', // 要兑换商品的id
			goodsDetailOriginalImg: '', // 要兑换商品的预览图
			goodsDetailName: '', // 要兑换商品的名字
			goodsDetailRemark: '', // 要兑换商品的描述信息
			goodsDetailexchangeScore: '', //  积分兑换 该商品 所需要的积分数量

			// 地址相关
			addressIsSet: false,
			addressUserName: '', // 收货人名字
			addressUserTel: '', // 收货人电话
			addressText: '', // 收货人地址描述
			addressTagName: '', // 地址标签
			addressId: null, // 收货地址id
			addressCoordinate: '', // 收货地址经纬度
			addressArea: '', // 收货地址的 市

		
			
			// 处理商家的一些信息
			sellerImage: '', // 商家门店图片
			sellerName: '', // 商家店名称
			sellerMobile: '', // 商家电话
			sellerOpenTime: '', // 商家营业时间
			sellerAddress: '', // 商家店地址
			
			
			payBtnFlag: true, // 支付按钮被点击状态 true可以点击, false不能点击
			
			

			postTime: '', // 配送时间 '8:20 - 22:50'
			peisongTimeLater: 0, // 预计骑手配送时长

			// 配送方法
			peiTypeArr: [{}],
			peiTypeActive: 0,

			previousInputUserName: '', // 上一次用户输入的名字
			previousInputUserPhone: '', // 上一次用户输入的 手机号

			quehuo: [{}], // 如果缺货 的 话 平台给出的 处理方式
			quehuoIsOpen: false, // 选择 缺货 状态
			quehuoCurr: 0, // 缺货当前的选中的下标

			sellerTel: '', // 联系商家的电话号码
			sellerAddress: '', // 联系商家的地址

			textarea: '', // 备注
			beizhuInputFlag: false, // 备注文字框的聚焦状态
			shouhuoren: '', // 配送方式是 自提 的情况下 用户的名字
			haoma: '', // 配送方式是 自提 的情况下 用户的手机号码

			integralNum: 0, // 兑换商品需要的积分

			// ↓↓↓ 多规格相关数据 --------------------------------------------------------
			isSpec: false, // 是否是多规格
			currentgoodsId: null, // 多规格 商品id
			currentgoodsJifen: 0, // 多规格 商品 积分
			specKeyStr: '', // 多规格 商品 已选规格字符串
			// ↑↑↑ 多规格相关数据 --------------------------------------------------------


			// ↓↓ 预约配送相关数据
			qiToTime: '', // 骑手开始配送
			qiOffTime: '', // 骑手结束配送
			qiRunTimeLen: 0, // 骑手配送过程中需要 的时间
			isOpenyvyueFun: false, // 是否开启预约配送
			yvyueDays: 0, // 预约的天数
			hoursArr: [{}], // 小时的数据
			newToDayHourArr: [{}], // 选择今天配送的小时数据
			newHours: 0, // 当前的小时数
			newMinutes: 0, // 当前的分钟数
			isTomorrowStr: false, // 当前选天的列 选中的 是否是 '明天'
			pickerSelectHour: '', // 当前选小时的列 选中的 小时字符串

			daysIndex: 0, // 天的索引
			hoursIndex: 0, // 小时的索引
			cancelIndexDays: 0, // 选择前的天数索引
			cancelIndexhours: 0, // 选择前的小时索引

			// ↓↓ 多自提点 数据
			localhostLon: 0, // 当前设备的 经度
			localhostLat: 0, // 当前设备的 纬度
			zitidianList: [{}], // 自提点列表数据
			zitidianActive: 0, // 默认选中的自提点
			duozitiModalFlag: false // 自提点列表模态框 显示 隐藏 状态
		};
	},

	onLoad(options) {
		let that = this;
		let selectGoods = JSON.parse(options.info);

		that.goodsDetailId = selectGoods.goods_id;
		that.goodsDetailOriginalImg = selectGoods.original_img;
		that.goodsDetailName = selectGoods.goods_name;
		that.goodsDetailRemark = selectGoods.goods_remark;
		that.goodsDetailexchangeScore = selectGoods.exchange_score;

		that.isSpec = selectGoods.isSpec; // 是否是多规格
		that.currentgoodsId = selectGoods.currentgoodsId; // 多规格 商品id
		that.currentgoodsJifen = selectGoods.currentgoodsJifen; // 多规格 商品 积分
		that.specKeyStr = selectGoods.specKeyStr; // 多规格 商品 已选规格字符串

		// 多自提点需要获取的经纬度信息
		let cartAddress = assertObject(uni.getStorageSync('cartAddress'));
		that.localhostLat = transNumFn(cartAddress.latitude);
		that.localhostLon = transNumFn(cartAddress.longitude);
		uni.setStorageSync('cartAddress', '');

		that.loadFn();
	},
	onShow() {
		let that = this;
		let temSelectAd = uni.getStorageSync('temSelectAd');
		console.log('获取 temSelectAd 的地址对象', temSelectAd);

		if (temSelectAd) {
			that.addressIsSet = true;
			that.addressUserName = temSelectAd.name; // 收货人名字
			that.addressUserTel = temSelectAd.mobile; // 收货人电话
			that.addressText = temSelectAd.address; // 收货人地址描述
			that.addressTagName = temSelectAd.tag; // 地址标签
			that.addressId = temSelectAd.id; // 收货地址id
			that.addressCoordinate = temSelectAd.coordinate; // 收货地址经纬度
			that.addressArea = temSelectAd.area; // 收货地址的 市
			if (
				that.calcPeiTypeId == peiTypeEnumObj[peiTypeDada] ||
				that.calcPeiTypeId == peiTypeEnumObj[peiTypeShansong]
			) {
				// 达达或者闪送 重新计算
				that.getOrderInfoFn(() => {
					uni.showToast({
						icon: 'none',
						title: '地址变更,费用已发生变化'
					});
				}, true);
			}
			uni.setStorageSync('temSelectAd', '');
		}
	},
	methods: {
		setBeizhuInputFlagFn(flag) {
			this.beizhuInputFlag = flag;
		},
		// 获取当前的小时数
		getNewHoursFn() {
			let that = this;
			let date = new Date();
			that.newHours = date.getHours();
			that.newMinutes = date.getMinutes();
		},
		// 拆分数据
		getChaiFenFn() {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let result = await that.$request({
					url: '/api/order/fill_chaifen'
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						// 成功返回的数据
						let resObj = {};
						let resultObj = assertObject(result.data.data);

						// 处理地址信息
						let addressObj = assertObject(resultObj.address);
						if (addressObj.id) {
							resObj.address = {
								isSet: true,
								addressId: addressObj.id, // 地址id
								addressUserName: addressObj.name, // 收货人名字
								addressUserTel: addressObj.mobile, // 收货人电话
								addressText: addressObj.address, // 收货人地址描述
								addressHousenumber: addressObj.housenumber, // 收货人门牌号
								addressCoordinate: addressObj.coordinate, // 收货地址经纬度
								addressArea: addressObj.area, // 收货地址的 市
								addressTagName: addressObj.tag_name // 地址标签
							};
						} else {
							resObj.address = {
								isSet: false
							};
						}

						// 如遇缺货如何处理
						let quehuo = assertArray(resultObj.quehuo);
						resObj.quehuo = quehuo;

						// 处理配送方式数据
						let peiTypeArr = assertArray(resultObj.peiType).filter(typeItem => typeItem.value == 1);

						resObj.peiTypeArr = peiTypeArr;

						// 处理自提商家信息
						let sellerInfo = assertObject(resultObj.peisong);

						resObj.sellerInfo = {
							freePost: transNumFn(sellerInfo.free_post), // 满多少免配送费
							postFee: transNumFn(sellerInfo.post_fee), // 骑手配送费
							postTime: sellerInfo.post_time, // 配送时间 '8:20 - 22:50'
							postage: transNumFn(sellerInfo.postage), // 快递运费
							freePostage: transNumFn(sellerInfo.free_postage), // 满多少减运费
							isPreparePeisong: sellerInfo.is_prepare_peisong == 1, // 是否开启预约配送
							prepareDays: transNumFn(sellerInfo.prepare_days), // 预约配送的天数
							
							
									
							peisongTimeLater: getHour(sellerInfo.peisong_time_later), // 预计骑手配送时长
							
							// 处理商家的一些信息
							sellerImage: sellerInfo.shop_image, // 商家门店图片
							sellerName: sellerInfo.shop_name, // 商家店名称
							sellerMobile: sellerInfo.mobile, // 商家电话
							sellerOpenTime: sellerInfo.shop_bh, // 商家营业时间
							sellerAddress: sellerInfo.address // 商家店地址
							
						};
						let yve = transNumFn(resultObj.yue); // 账户余额
						resObj.yve = yve;

						let { user_name: userName, user_phone: userPhone } = assertObject(resultObj.znp_user);
						resObj.previousInputInfo = {
							// 上一次输入的值
							userName,
							userPhone
						};

						resFn({
							type: 'success',
							msg: '获取拆分数据成功',
							result: resObj
						});
					} else {
						resFn({
							type: 'error',
							result,
							msg: result.data.msg
						});
					}
				} else {
					resFn({
						type: 'error',
						result,
						msg: that.$errorMsg
					});
				}
			});
		},

		// 获取 提交订单的 页面 展示信息 (配送方式、如遇缺货....)
		async loadFn() {
			let that = this;
			let chaifen = await that.getChaiFenFn(); //获取拆分出来的数据

			console.log('拆分出来的数据', chaifen);

			if (chaifen.type == 'success') {
				let chaifenResult = chaifen.result;
				// 处理 用户的配送方式
				that.peiTypeArr = chaifenResult.peiTypeArr;

				// 处理收货地址
				that.addressIsSet = chaifenResult.address.isSet;
				that.addressUserName = chaifenResult.address.addressUserName;
				that.addressUserTel = chaifenResult.address.addressUserTel;
				that.addressText = chaifenResult.address.addressText;
				that.addressTagName = chaifenResult.address.addressTagName;
				that.addressId = chaifenResult.address.addressId;
				that.addressCoordinate = chaifenResult.address.addressCoordinate; // 收货地址经纬度
				that.addressArea = chaifenResult.address.addressArea; // 收货地址的 市

				
				// 处理商家的一些信息
				that.sellerImage = chaifenResult.sellerInfo.sellerImage; // 商家门店图片
				that.sellerName = chaifenResult.sellerInfo.sellerName; // 商家店名称
				that.sellerMobile = chaifenResult.sellerInfo.sellerMobile; // 商家电话
				that.sellerOpenTime = chaifenResult.sellerInfo.sellerOpenTime; // 商家营业时间
				that.sellerAddress = chaifenResult.sellerInfo.sellerAddress; // 商家店地址
				
				
				

				that.postTime = chaifenResult.sellerInfo.postTime; // 配送时间 '8:20 - 22:50'

				that.isOpenyvyueFun = chaifenResult.sellerInfo.isPreparePeisong; // 是否开启预约配送
				that.yvyueDays = chaifenResult.sellerInfo.prepareDays; // 预约配送的天数 最多两天  0:立即送出; 1:今天 ; 2:明天
				that.peisongTimeLater = chaifenResult.sellerInfo.peisongTimeLater; // 预计骑手配送时长

				// 处理配送相关信息
				let startEndTimeArr = that.postTime.split('-'); // 得到开始和结束的时间数组 ["9:00 ", " 22:00"]
				that.qiToTime = startEndTimeArr[0]; // 赋值骑手开始上班时间-小时
				that.qiOffTime = startEndTimeArr[1]; // 赋值骑手开始下班时间-小时

				that.getNewHoursFn();

				that.hoursArr = createHoursArr(that.qiToTime, that.qiOffTime, that.peisongTimeLater);

				let newToDayTime = new Date((Math.floor(+new Date() / 1000) + 60 * 10) * 1000);

				let newToDayTimeStr = `${num2zeroStr(newToDayTime.getHours())}:${num2zeroStr(
					newToDayTime.getMinutes()
				)}`;

				let newToDayHourArr = createHoursArr(newToDayTimeStr, that.qiOffTime, that.peisongTimeLater);

				that.newToDayHourArr =
					newToDayHourArr.length > 0
						? newToDayHourArr
						: [
								{
									textStr: `${num2zeroStr(that.newHours)}:${num2zeroStr(
										that.newMinutes
									)}~${num2zeroStr(that.qiOffTime.split(':')[0])}:${num2zeroStr(
										that.qiOffTime.split(':')[1]
									)}`,
									toHoursBefore: that.newHours,
									offHoursBefore: that.qiOffTime.split(':')[0]
								}
						  ];

				// 处理如遇缺货
				that.quehuo = chaifenResult.quehuo;

				that.previousInputUserName = chaifenResult.previousInputInfo.userName; // 上一次用户输入的名字
				that.previousInputUserPhone = chaifenResult.previousInputInfo.userPhone; // 上一次用户输入的 手机号

				let zitidianList = await that.getDuozitidianFn(that.localhostLon, that.localhostLat);
				console.log('自提点 数据 zitidianList', zitidianList);
				if (zitidianList.type == 'success') {
					that.zitidianList = zitidianList.result;

					let zitidianIsAllNotRange = zitidianList.result.every(i => !i.isRange);

					if (!zitidianIsAllNotRange) {
						that.zitidianActive = zitidianList.result.findIndex(item => item.isRange);
					}

					that.getOrderInfoFn();
				} else {
					that.isShowLoading = false;
					uni.showToast({
						icon: 'none',
						title: zitidianList.msg
					});
				}
			} else {
				that.isShowLoading = false;
				uni.showToast({
					icon: 'none',
					title: `${chaifen.msg}.`
				});
			}
			
		},
		// 选择缺货情况处理方式
		quehuoItemFn(index) {
			this.quehuoCurr = index;
			this.quehuoIsOpen = false;
		},

		// 获取订单详情
		async getOrderInfoFn(fn, isShowLoading) {
			let that = this;
			let data = {
				from: 'integral',
				prom_type: 'integral',
				post_type: that.calcPeiTypeId,
				goods: that.goodsDetailId,
				address_id: that.addressId,
				vip_id: 0
			};
			if (that.isSpec) {
				data.group_goods_spec_id = that.currentgoodsId;
			}

			// #ifdef MP-WEIXIN
			data.Platform = 'wxMiniProgram';
			// #endif

			// #ifdef APP-PLUS
			data.Platform = 'APP';
			// #endif

			let result = await that.$request({
				loading: !!isShowLoading,
				url: '/api/order/fill_order',
				data
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let orderInfo = assertObject(result.data.data);

					let priceInfo = assertObject(orderInfo.price);

					that.integralNum = transNumFn(priceInfo['实付金额']);

					fn && fn();
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
		// 选择配送方式
		setPeiTypeIndexFn(arg) {
			let that = this;
			that.peiTypeActive = arg.index;
			that.getOrderInfoFn(() => {
				if (
					(that.calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian] &&
						that.previousInputUserName &&
						that.previousInputUserPhone &&
						!that.shouhuoren &&
						!that.haoma) ||
					(that.calcPeiTypeId == peiTypeEnumObj[peiTypeZiti] &&
						that.previousInputUserName &&
						that.previousInputUserPhone &&
						!that.shouhuoren &&
						!that.haoma)
				) {
					that.shouhuoren = that.previousInputUserName;
					that.haoma = that.previousInputUserPhone;
				}
				uni.showToast({
					icon: 'none',
					title: '配送变更,费用已发生变化'
				});
			}, true);
		},

		// 去支付按钮
		async payFn() {
			let that = this;
			if(!that.payBtnFlag){
				return false;
			}
			that.payBtnFlag = false;
			that.hideAllFn();
			uni.showLoading({})
			
			
			
			
			let userInfoObj = {};

			if (that.calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian]) {
				// 没有自提列表
				if (!that.zitidianList.length) {
					that.hideAllFn();
					uni.showToast({
						icon: 'none',
						title: `自提点列表为空`
					});
					that.payBtnFlag = true;
					return false;
				}

				// 有自提列表 没有 在范围内的自提点
				if (that.zitidianIsAllNotRange) {
					that.hideAllFn();
					uni.showToast({
						icon: 'none',
						title: `自提点不在配送范围内`
					});
					that.payBtnFlag = true;
					return false;
				}
			}

			// 当配送方式是 上门自提 或者是 多自提点 并且 用户没填写手机号 的提示
			if (
				that.calcPeiTypeId == peiTypeEnumObj[peiTypeZiti] ||
				that.calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian]
			) {
				if (that.shouhuoren.length < 1 || that.shouhuoren.length > 20) {
					that.hideAllFn();
					uni.showToast({
						title: '收货人名字长度是1~20',
						icon: 'none'
					});
					that.payBtnFlag = true;
					return false;
				}

				if (!that.regTel(that.haoma)) {
					that.hideAllFn();
					uni.showToast({
						title: '请检查手机号格式是否正确',
						icon: 'none'
					});
					that.payBtnFlag = true;
					return false;
				}
				userInfoObj.user_name = that.shouhuoren;
				userInfoObj.user_phone = that.haoma;
			}

			// 需要配送  当前没有地址
			if (that.checkIsMustAddress && !that.addressIsSet) {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: '请选择收货地址'
				});
				that.payBtnFlag = true;
				return false;
			}
			
			

			// 商家配送时限制距离
			if (peiTypeEnumObj[peiTypeShangjia] == that.calcPeiTypeId) {
				console.log('是商家配送开始判断是否在配送范围内');
				let checkRangeResult = await that.checkRangeFn(that.addressCoordinate);
				if (checkRangeResult.type != 'success') {
					
					that.hideAllFn();
					
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: '当前地址不在配送范围内',
						success(e) {
							//确认后的回调
							console.log(e);
						}
					});
					
					that.payBtnFlag = true;
					return false;
					
				}
			}			
			

			let quehuo = '';

			if (that.quehuo.length > 0) {
				quehuo = that.quehuo[that.quehuoCurr].id;
			}

			let postType = '';
			if (that.peiTypeArr.length > 0) {
				postType = that.peiTypeArr[that.peiTypeActive].id;
			}

			// 快递传1  商家配送自提 立即送出1  预约2
			let isSendImmediately = (() => {
				if (that.isOpenyvyueFun) {
					// 是否开启预约配送
					if (that.calcPeiTypeId == peiTypeEnumObj[peiTypeKuaidi]) {
						return 1;
					} else {
						if (that.isTomorrowStr) {
							return 2;
						} else {
							if (that.hoursIndex == 0) {
								return 1;
							} else {
								return 2;
							}
						}
					}
				} else {
					return 1;
				}
			})();

			// 传给后台的配送时间
			let peisongTime = (() => {
				let newDate = new Date();

				if (that.isTomorrowStr) {
					// 明天
					newDate = newDate.setDate(newDate.getDate() + 1);
					newDate = new Date(newDate);
				}

				let year = newDate.getFullYear();

				let month = num2zeroStr(newDate.getMonth() + 1);
				let getdate = num2zeroStr(newDate.getDate());

				// let hour = that.calcPickerHoursArr[that.hoursIndex].textStr.replace('~', '-');
				return `${year}-${month}-${getdate} ${that.pickerSelectHour}`;
			})();

			let addressId = (() => {
				if (that.checkIsMustAddress) {
					return that.addressId;
				} else {
					if (that.calcPeiTypeId == peiTypeEnumObj[peiTypeDuozitidian]) {
						return assertObject(that.zitidianList[that.zitidianActive]).id;
					}
					return '';
				}
			})();

			let objs = {
				prom_type: 'integral',
				from: 'integral',
				address_id: addressId,
				quehuo,
				goods_id: that.goodsDetailId,
				comment: that.textarea,
				ord_price: that.goodsDetailexchangeScore,

				pay_type: 3,

				post_type: postType,
				pay_price: that.isSpec ? that.currentgoodsJifen : that.goodsDetailexchangeScore,
				vip_id: 0,
				is_send_immediately: isSendImmediately, // 是否立即送出 1立即送出
				peisong_time: peisongTime,

				// 自提 名字 和 电话
				...userInfoObj
			};

			// #ifdef MP-WEIXIN
			objs.pay_platform = 'wxMiniProgram';
			// #endif

			// #ifdef APP-PLUS
			objs.pay_platform = 'APP';
			// #endif

			if (that.isSpec) {
				objs.group_goods_spec_id = that.currentgoodsId;
			}
			console.log(objs, JSON.stringify(objs), '发送到后台的参数');

			// 生成订单
			let result = await that.$request({
				method: 'POST',
				url: '/api/order/make_order',
				data: objs
			});

			console.log(JSON.stringify(result));

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);

					if (resultObj.ord_id) {
						// 拿着 订单id 开始支付

						let payRes = await that.$request({
							method: 'post',
							url: '/api/pay/pay',
							data: {
								ord_id: resultObj.ord_id,
								Platform: 'wxMiniProgram',
								type: 'integral'
							}
						});
						console.log(payRes, 'payRes 支付结果');

						if (payRes.statusCode == 200) {
							if (payRes.data.code == 200) {
								that.hideAllFn();
								
								uni.showToast({
									icon: 'success',
									title: '兑换成功'
								});
								setTimeout(() => {
									that.payBtnFlag = true;
									that.navigateToFn({
										url: `/pages/order-state/dingdan-state?id=${result.data.data.ord_id}`,
										type: 'redirectTo'
									});
								}, 600);
							} else {
								that.hideAllFn();
								uni.showToast({
									icon: 'none',
									title: payRes.data.msg
								});
								that.payBtnFlag = true;
							}
						} else {
							that.hideAllFn();
							uni.showToast({
								icon: 'none',
								title: that.$errorMsg
							});
							that.payBtnFlag = true;
						}
					} else {
						that.hideAllFn();
						uni.showToast({
							icon: 'none',
							title: result.data.msg
						});
						that.payBtnFlag = true;
					}
				} else {
					that.hideAllFn();
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
					that.payBtnFlag = true;
				}
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
				that.payBtnFlag = true;
			}
		},
		// ↓↓预约配送组件 相关方法=============================================
		pickerViewChangeFn(e) {
			let that = this;
			let { daysIndex, hoursIndex } = e;
			that.daysIndex = daysIndex;
			that.hoursIndex = hoursIndex;
		},
		pickerViewClickFn() {
			let that = this;
			that.cancelIndexDays = that.daysIndex; // 选择前的天数索引
			that.cancelIndexhours = that.hoursIndex; // 选择前的小时索引
		},
		pickerViewCancelFn() {
			let that = this;
			that.daysIndex = that.cancelIndexDays; // 选择前的天数索引
			that.hoursIndex = that.cancelIndexhours; // 选择前的小时索引
		},
		pickerViewColumnchangeFn(e) {
			let that = this;
			let { keyStr, value } = e;
			that[keyStr] = value;
		},
		isTomorrowStrFn(e) {
			let that = this;
			let { isTomorrowStr, pickerSelectHour } = e;
			that.isTomorrowStr = isTomorrowStr;
			that.pickerSelectHour = pickerSelectHour;
		},
		// ↓↓ 多自提点 相关方法=============================================
		// 设置 自提点列表 模态框 的隐藏 显示 状态
		setduozitiModalFlagFn(bool) {
			this.duozitiModalFlag = bool;
		},
		// 选择自提点
		selectZitiFn(index) {
			this.zitidianActive = index;
			this.setduozitiModalFlagFn(false);
		}
	}, // ↑↑↑↑↑ methods 结束
	computed: {
		/*
			返回 Id 值
			0 商家配送
			1 自提
			2 快递
			3 达达
			4 闪送
			400 表示配送方式的数组是空
		*/
		calcPeiTypeId() {
			let that = this;
			if (that.peiTypeArr.length) {
				return that.peiTypeArr[that.peiTypeActive].id;
			} else {
				return 400;
			}
		},

		// @description 是自提返回 true 不是自提返回 false
		// @return <Boolean>
		calsIsZiTi() {
			return assertObject(this.peiTypeArr[this.peiTypeActive]).id == peiTypeEnumObj[peiTypeZiti];
		},
		// @description 有地址返回 true 没有地址返回 false
		// @return <Boolean>
		calcIsHasAddress() {
			if (this.addressId) {
				return true;
			}
			return false;
		},
		/*
			@description
				是否展示用户的地址组件
			@return <Boolean>
				配送方式是 达达 闪送 商家配送 快递
					返回 true 显示
				配送方式是 到店自提 多自提点
					返回 false 隐藏
		*/
		isShowAddress() {
			let that = this;
			let peiTypeList = {
				[peiTypeEnumObj[peiTypeShangjia]]: true,
				[peiTypeEnumObj[peiTypeShansong]]: true,
				[peiTypeEnumObj[peiTypeDada]]: true,
				[peiTypeEnumObj[peiTypeKuaidi]]: true,
				[peiTypeEnumObj[peiTypeZiti]]: false,
				[peiTypeEnumObj[peiTypeDuozitidian]]: false
			};
			return peiTypeList[that.calcPeiTypeId];
		},
		/*
			@description
				自提点列表是否全部 不在范围内
			@return <Boolean>
				返回 false 表示 有可用的自提点在范围内
				返回 true 表示 没有可用的自提点在范围内
		*/
		zitidianIsAllNotRange() {
			return this.zitidianList.every(i => !i.isRange);
		},
		currentzitidianInfo() {
			return this.zitidianList[this.zitidianActive];
		},
		/*
		  @description
			检查 当前选择的配送方式 是否必须需要配送地址
		  @return <Boolean>
			true 表示当前选择的配送方式 必须填配送地址
			false 表示当前选择的配送方式 可以不填配送地址
		*/
		checkIsMustAddress() {
			let enumObj = {
				[peiTypeEnumObj[peiTypeShangjia]]: true,
				[peiTypeEnumObj[peiTypeKuaidi]]: true,
				[peiTypeEnumObj[peiTypeDada]]: true,
				[peiTypeEnumObj[peiTypeShansong]]: true,

				[peiTypeEnumObj[peiTypeZiti]]: false,
				[peiTypeEnumObj[peiTypeDuozitidian]]: false
			};
			return enumObj[this.calcPeiTypeId];
		}
	} // ↑↑↑↑↑ computed 结束
};
</script>

<style lang="scss" scoped>
.page {
	overflow: hidden;
	min-height: 100vh;
	background: $bg-grey-color;
}

.seller-address {
	margin-top: 20rpx;
	color: $grey1-color;
	text-indent: 0.5em;
	font-size: 26rpx;
}

.input-beizhu-block {
	position: relative;
	@mixin size {
		width: 370rpx;
		height: 64rpx;
	}
	@include size;
	.show-style {
		@include size;
		position: absolute;
		right: 0;
		top: 0;
		text-align: right;
		font-size: 26rpx;
		line-height: 64rpx;
	}
	.input-beizhu {
		z-index: 2;
	}
	.input-beizhu-text-view {
		z-index: 1;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}

.goods-list-block {
	margin-top: 20rpx;

	
}

.goods-list {
	border-radius: 0 0 20rpx 20rpx;
	padding: 0 20rpx;
	background: #ffffff;
	margin-bottom: 10rpx;
	.item {
		display: flex;
		padding: 10rpx 0;
		height: 200rpx;
		border-top: 1px solid #f1f1f1;

		&:last-child {
		}

		.item-image-block {
			@include flex-center;
			margin: 0 20rpx;
			width: 156rpx;
			height: 100%;

			image {
				width: 150rpx;
				height: 150rpx;
			}
		}

		.item-description-block {
			display: flex;
			flex-direction: column;
			// justify-content: space-between;
			flex: 1;
			position: relative;

			.item-name,
			.item-description {
				display: flex;
				justify-content: space-between;
			}

			.item-name {
				color: $grey1-color;
				font-size: 30rpx;
				margin-top: 0.2em;
				line-height: 1.6em;
				.name- {
					max-width: 12em;
					@include text-ellipsis;
				}
				.jifen {
					white-space: nowrap;
				}
			}

			.item-description {
				color: $grey2-color;
				font-size: 23rpx;
				line-height: 1.4em;
				.description- {
					max-width: 16em;
					@include text-ellipsis;
				}
			}
			.price-info-block {
				text-align: right;
				color: $grey2-color;
				font-size: 23rpx;
				line-height: 1.4em;
				.red-price {
					color: $red-color;
				}
			}
		}
	}
	.textarea {
		margin: 0.5em;
		padding: 0.5em;
		text-indent: 1em;
		font-size: 26rpx;
		background: #f7f7f7;
		height: 6em;
		width: 90%;
		z-index: 1;
		color: #374050;
	}
}

.line-block {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 90rpx;
	border-top: 1px solid #f1f1f1;

	.h6,
	.h5 {
		font-size: 26rpx;
		color: $grey1-color;
	}

	.h6 {
		display: flex;
		align-items: center;
		color: $grey1-color;

		.price {
			margin-left: 0.5em;
			font-size: 30rpx;
			font-weight: 600;
		}
	}
	.inp-block {
		width: 80%;
		input {
			padding-left: 0.2em;
			font-size: 26rpx;
			font-weight: 600;
			color: $grey1-color;
			background: #f7f7f7;
			padding: 0.4em 1em;
		}
	}
}
.line-cont-block {
	.line-cont {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		border-top: 1px solid #f1f1f1;
		font-size: 22rpx;
		padding: 0 20rpx;
	}
}
.deg90 {
	transform: rotate(90deg);
}
.useRedCard-block {
	.useRedCard-cont {
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		border-top: 1px solid #f1f1f1;
		align-items: center;
		.card-info {
			display: flex;
			align-items: center;
			height: 45rpx;
			.card-name {
				margin-right: 0.5em;
				font-weight: 600;
				font-size: 30rpx;
				color: $grey1-color;
			}
			.youhui {
				font-size: 24rpx;
				color: $grey2-color;
			}
		}
		.time {
			font-size: 23rpx;
			color: $grey2-color;
		}
	}
}

.pay-type {
	margin: 20rpx 0;

	.cont-block {
		padding: 0 20rpx;
		border-radius: 20rpx;
		background: #ffffff;

		.h3 {
			line-height: 88rpx;
			font-size: 36rpx;
			color: $grey1-color;
			font-weight: 600;
		}

		.line-block-list {
			.line-block:first-child {
				border-top: none;
			}

			.line-block {
				border-top: 1px solid #f8f8f8;

				.content-wrap {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					height: 120rpx;
					padding: 0;

					.left-block {
						display: flex;
						align-items: center;

						.image-block {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;

							image {
								width: 100%;
								height: 100%;
							}
						}

						text {
							color: $grey1-color;
							text-indent: 0.5em;
							font-size: 26rpx;
						}
					}
				}
			}
		}
	}
}

.order-btn-block {
	position: fixed;
	width: 100%;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 24rpx;
	width: 100%;
	height: 100rpx;
	background: #ffffff;

	.price-all {
		display: flex;
		align-items: flex-end;
		font-size: 23rpx;
		color: $grey2-color;
		@include shop-price-block-lr;

		.shop-price-block-lr {
			text-indent: 0.3em;
		}
	}

	.order-btn {
		@include btn-green;
		@include flex-center;
		width: 240rpx;
		height: 88rpx;
		border-radius: 10rpx;
		font-size: 32rpx;
	}
}
</style>
