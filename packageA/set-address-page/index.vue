<!-- 
	说明程序需要获取位置权限才能正常使用
-->
<template>
	<view class="setAddressPage">
		<image :src="calcImageSrc('/index-images/setAddress.png')"></image>
		<view class="h4">定位服务未开启</view>
		<view class="h5">
			请打开手机系统设置中的定位权限，
			<!-- #ifdef MP-WEIXIN || MP-TOUTIAO -->
			同时在小程序中开通 「定位服务」。
			<!-- #endif -->
			程序知道您的位置才能更好地服务哦
		</view>
		<!-- #ifdef MP-WEIXIN || MP-TOUTIAO -->
		<button
			type="default"
			@click="openSettingFn"
			class="xcxAdrBtn"
			:style="{ background: configInfo.web_site_color }"
		>
			开通地址权限
		</button>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS -->
		<button
			type="default"
			@click="appBtnClickFn"
			class="xcxAdrBtn"
			:style="{ background: configInfo.web_site_color }"
		>
			开通地址权限
		</button>
		<button
			v-if="isShowSearchBtn"
			type="default"
			class="searchAdrBtn"
			@click="selectAddressFn"
			:style="{ color: configInfo.web_site_color, border: `1px solid ${configInfo.web_site_color}` }"
		>
			手动搜索地址
		</button>
		<!-- #endif -->
		
		
		<!-- #ifdef MP-WEIXIN || MP-TOUTIAO -->
		<button
			v-if="isShowSearchBtn"
			type="default"
			class="searchAdrBtn"
			@click="navigateToFn({url:'/packageA/set-address-page/user-select-address'})"
			:style="{ color: configInfo.web_site_color, border: `1px solid ${configInfo.web_site_color}` }"
		>
			手动搜索地址
		</button>
		<!-- #endif -->
		
		
	</view>
</template>

<script>
import QQMapWX from '@/tools/libs/tx-map-sdk/qqmap-wx-jssdk.min.js';
var qqmapsdk;
export default {
	data(){
		return {
			page: ''
		}
	},
	onLoad(options) {
		let that = this;
		console.log('packageA/set-address-page/index onLoad');
		that.page = options.page;
	},
	onShow() {
		let that = this;
		console.log('packageA/set-address-page/index onShow');
		// #ifdef MP-WEIXIN || MP-TOUTIAO
		that.onshowFn();
		// #endif
		// #ifdef APP-PLUS
		uni.getLocation({
			success() {
				that.toBackFn(); // 正常返回上一页 如果没有上一页 就回首页
			},
			complete(e) {
				console.log('packageA/set-address-page/index 页面show函数 uni.getLocation complete e',e);
			}
		});
		// #endif
	},
	methods: {
		// #ifdef MP-WEIXIN || MP-TOUTIAO
		async onshowFn() {
			let that = this;
			let scopeUserLocationResult = await that.settingInfoFn('scope.userLocation');
			console.log('scopeUserLocationResult', scopeUserLocationResult);

			if (scopeUserLocationResult.type == 'success') {
				let flag, locationInfoResult;
				if (scopeUserLocationResult.isFirst) {
					flag = true;
					locationInfoResult = await that.getLocationInfoFn();
				} else if (scopeUserLocationResult.isOk) {
					flag = true;
					locationInfoResult = await that.getLocationInfoFn();
				} else {
					flag = false;
				}
				if (flag) {
					if (locationInfoResult.type == 'success') {
						console.log('locationInfoResult', locationInfoResult);
						that.setIndexAddressInfoStorageFn(locationInfoResult.result);
					}
				}
			} else {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: scopeUserLocationResult.msg,
					success(e) {
						//确认后的回调
						console.log(e);
					}
				});
			}
		},
		// #endif
		// #ifdef APP-PLUS
		appBtnClickFn() {
			let that = this;
			let isOpenLocationFlag = that.checkOpenGPSServiceByAndroid();
			console.log('检查是否打开GPS功能', isOpenLocationFlag);
			// 检查是否打开GPS功能（android）
			if (isOpenLocationFlag) {
				// 安卓打开应用信息设置
				that.openSettingAppFn();
			} else {
				// 打开定位服务函数
				that.openLocationFn();
			}
		},
		// #endif

		// #ifdef APP-PLUS
		// 手动选取地址坐标位置
		selectAddressFn() {
			let that = this;
			console.log('selectAddressFn');
			uni.chooseLocation({
				success(locationInfo) {
					that.setIndexAddressInfoStorageFn(locationInfo);
				},
				fail(e) {
					console.log('失败', e);
					uni.showToast({
						icon: 'none',
						title: '请先授权'
					});
				},
				complete(e) {
					console.log('complete', e);
				}
			});
		},
		// #endif
		setIndexAddressInfoStorageFn({latitude,longitude}) {
			let that = this;
			qqmapsdk = new QQMapWX({
				key: that.configInfo.tx_map_key
			});
			
			qqmapsdk.reverseGeocoder({
				location: {
					latitude,
					longitude
				},
				// get_poi: 1,
				// poi_options: `address_format=short;radius=1000;page_size=6;page_index=1;policy=2`,
				poi_options: `address_format=short`,
				async success(res) {
					console.log('qqmapsdk.reverseGeocoder 信息', res);

					let checkRangeResult = await that.checkRangeFn(`${longitude},${latitude}`);
					console.log('checkRangeResult',checkRangeResult);

					let indexAddressInfo = {
						latitude,
						longitude,
						currentAddressText: res.result.address,
						addressIsAtRangeFlag: checkRangeResult.type == 'success',
						reset: 1
					};

					console.log('indexAddressInfo 数据', indexAddressInfo);

					uni.setStorageSync('indexAddressInfo', indexAddressInfo);

					that.navigateToFn({
						isTab: true,
						url: `/pages/index/index`
					});
				},
				fail(e) {
					console.log('qqmapsdk.reverseGeocoder 失败的错误信息', e);
				},
				complete(e) {
					console.log('qqmapsdk.reverseGeocoder 函数运行完的结果', e);
				}
			});
		}
	},
	computed:{
		isShowSearchBtn(){
			let that = this;
			let showSearchBtnEnum = {
				index: true,
				cart: false,
				indexSelect: true
			}
			return showSearchBtnEnum[that.page]
		}
	}
};
</script>

<style lang="scss" scoped>
.setAddressPage {
	position: fixed;
	z-index: 500;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	background: #ffffff;

	image {
		display: block;
		width: 320rpx;
		height: 272rpx;
		margin: 200rpx auto 0;
	}

	.h5,
	.h4 {
		text-align: center;
	}

	.h4 {
		line-height: 136rpx;
		font-weight: 600;
		font-size: 34rpx;
		color: $grey1-color;
	}

	.h5 {
		padding: 0 85rpx;
		line-height: 48rpx;
		font-size: 26rpx;
		color: $grey2-color;
		margin-bottom: 100rpx;
	}

	.searchAdrBtn,
	.xcxAdrBtn {
		width: 460rpx;
		height: 88rpx;
		@include flex-center;
		font-size: 30rpx;
	}

	.xcxAdrBtn {
		margin: 0 auto 38rpx;
		color: #ffffff;
	}

	.searchAdrBtn {
		background: transparent;
	}
}
</style>
