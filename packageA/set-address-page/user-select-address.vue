<!-- 
	用户选取地址信息页面
-->
<template>
	<view class="root-page">
		<loading-css :is-show="isShowLoading"></loading-css>

		<view class="search-input-block content-wrap" :style="{ background: configInfo.web_site_color }">
			<view class="input-wrap border-radius">
				<view class="icon-search">
					<view class="iconfont icon-fangdajing" style="color: #969696;font-size: 18px;"></view>
				</view>
				<input
					class="input-dom"
					type="text"
					placeholder="小区、写字楼、学校"
					v-model="inputVal"
					@input="inputFn"
				/>
				<view class="icon-cancel" @click="cancelBtnClickFn">
					<view class="iconfont icon-guanbi" style="color: #cccccc; font-size: 20px;"></view>
				</view>
			</view>
		</view>
		<view class="map-block" style="width: 750rpx; height: 710rpx;">
			<view class="address-icon">
				<view
					class="iconfont icon-dizhitianchong-"
					style="color: #ff4847; font-size: 60rpx; margin-left: -8rpx;margin-top: -20rpx;"
				></view>
			</view>
			<!-- @updated="mapUpdatedFn" -->
			<map
				id="map-dom"
				style="width: 750rpx; height: 710rpx;"
				:latitude="Beijinglat"
				:longitude="Beijinglng"
				@regionchange="mapRegionchangeFn"
			></map>
		</view>

		<view class="top-location-block content-wrap" v-if="inputVal.length">
			<block v-if="topAddressList.length">
				<view v-for="(item, index) in topAddressList" :key="item.id">
					<address-info-item
						:index-num="index"
						:title="item.title"
						:address="item.address"
						icon-type="top"
						@locationItemClickFn="locationItemClickFn"
					></address-info-item>
				</view>
			</block>
			<view v-else class="not-address-info-msg">无当前位置信息~</view>
		</view>
		<view class="bottom-location-block">
			<view class="bottom-location-list">
				<view class="content-wrap">
					<block v-if="bottomAddressList.length">
						<view v-for="(item, index) in bottomAddressList" :key="item.id">
							<address-info-item
								:index-num="index"
								:title="item.title"
								:address="item.address"
								icon-type="bottom"
								@locationItemClickFn="locationItemClickFn"
							></address-info-item>
						</view>
					</block>
					<view v-else class="not-address-info-msg">无当前位置信息~</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { assertObject, assertArray } from '@/tools/tools.js';
import QQMapWX from '@/tools/libs/tx-map-sdk/qqmap-wx-jssdk.min.js';
import addressInfoItem from '@/packageA/set-address-page/address-info-item.vue';

var qqmapsdk, timer, inputTimer;

let statusEnum = {
	'0': false,
	'310': '请求参数信息有误',
	'311': 'Key格式错误',
	'306': '请求有护持信息请检查字符串',
	'110': '请求来源未被授权'
};
export default {
	components: { addressInfoItem },
	data() {
		return {
			isShowLoading: true,
			Beijinglat: 39.908821,
			Beijinglng: 116.397479,
			bottomAddressList: [],
			topAddressList: [],
			inputVal: '',
			mapCtx: null
		};
	},
	onLoad() {
		qqmapsdk = new QQMapWX({
			key: this.configInfo.tx_map_key
		});
		this.onloadFn();
	},
	onShow() {
		uni.setNavigationBarColor({
			frontColor: '#ffffff', // 必写项
			backgroundColor: this.configInfo.web_site_color
		});
	},
	onReady(e) {
		this.mapCtx = uni.createMapContext('map-dom');
		console.log('this.mapCtx', this.mapCtx);
	},
	methods: {
		async onloadFn() {
			let that = this;
			let latlon2addressResult = await that.latlon2addressFn(that.Beijinglat, that.Beijinglng);
			if (latlon2addressResult.type == 'success') {
				that.bottomAddressList = latlon2addressResult.result;
			} else {
				uni.showToast({
					icon: 'none',
					title: latlon2addressResult.msg
				});
			}
			that.isShowLoading = false;
		},
		mapRegionchangeFn(e) {
			let that = this;

			if (e.type == 'end') {
				clearTimeout(timer);
				timer = setTimeout(async () => {
					let { latitude, longitude } = e.detail.centerLocation;
					let latlon2addressResult = await that.latlon2addressFn(latitude, longitude);
					if (latlon2addressResult.type == 'success') {
						that.bottomAddressList = latlon2addressResult.result;
					} else {
						uni.showToast({
							icon: 'none',
							title: latlon2addressResult.msg
						});
					}

					console.log('latlon2addressResult', latlon2addressResult);
				}, 450);
			}
		},
		// 解析坐标信息返回 附近地址列表
		latlon2addressFn(latitude, longitude) {
			let that = this;
			return new Promise(resFn => {
				qqmapsdk.reverseGeocoder({
					location: {
						latitude,
						longitude
					},
					get_poi: 1,
					// poi_options: `address_format=short;radius=1000;page_size=6;page_index=1;policy=2`,
					poi_options: `policy=1`,
					async success(res) {
						// console.log('qqmapsdk.reverseGeocoder 信息', res);

						let errorMsg = statusEnum[res.status];
						if (errorMsg) {
							resFn({
								type: 'error',
								msg: errorMsg,
								result: res
							});
							return false;
						}
						let addressList = assertArray(assertObject(res.result).pois).map(i => ({
							id: i.id,
							title: i.title,
							address: i.address,
							latitude: i.location.lat,
							longitude: i.location.lng
						}));

						resFn({
							type: 'success',
							msg: '获取地址列表成功',
							result: addressList
						});
						return false;
					},
					fail(e) {
						console.log('qqmapsdk.reverseGeocoder 失败的错误信息', e);
						resFn({
							type: 'error',
							msg: '地址解析失败',
							result: e
						});
					},
					complete(e) {
						// console.log('qqmapsdk.reverseGeocoder 函数运行完的结果', e);
					}
				});
			});
		},
		// input事件
		inputFn() {
			let that = this;
			clearTimeout(inputTimer);
			inputTimer = setTimeout(async () => {
				if (that.inputVal.length) {
					let searchKeywordResult = await that.searchKeywordFn(that.inputVal);
					if (searchKeywordResult.type == 'success') {
						that.topAddressList = searchKeywordResult.result;
					} else {
						that.topAddressList = [];
					}
				}
			}, 500);
		},
		async locationItemClickFn(e) {
			let that = this;
			let addressEnum = {
				top: that.topAddressList,
				bottom: that.bottomAddressList
			};
			let { longitude, latitude, address } = addressEnum[e.type][e.index];

			let checkRangeResult = await that.checkRangeFn(`${longitude},${latitude}`);

			let indexAddressInfo = {
				latitude,
				longitude,
				currentAddressText: address,
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
		searchKeywordFn(keyword) {
			let that = this;
			return new Promise(resFn => {
				qqmapsdk.getSuggestion({
					keyword,
					page_size: 20,
					policy: 1,
					success(res) {
						let errorMsg = statusEnum[res.status];
						if (errorMsg) {
							resFn({
								type: 'error',
								msg: errorMsg,
								result: res
							});
							return false;
						}

						let addressList = assertArray(res.data).map(i => ({
							id: i.id,
							title: i.title,
							address: i.address,
							latitude: i.location.lat,
							longitude: i.location.lng
						}));

						resFn({
							type: 'success',
							msg: '获取地址列表成功',
							result: addressList
						});
						return false;
					},
					fail(e) {
						resFn({
							type: 'error',
							msg: '地址解析失败',
							result: e
						});
					}
				});
			});
		},
		cancelBtnClickFn() {
			this.inputVal = '';
		}

		/*
		mapUpdatedFn(e){
			console.log(e);
		}
		*/
	}
};
</script>

<style lang="scss" scoped>
.root-page {
	display: flex;
	flex-direction: column;
	height: 100vh;

	.search-input-block {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		height: 98rpx;
		.input-wrap {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			height: 100%;
			background: #f4f4f4;
			.input-dom {
				flex: 1;
				padding: 0 0.3em;
				font-size: 26rpx;
			}
		}
	}
	.map-block {
		position: relative;
		.address-icon {
			position: absolute;
			z-index: 10;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			width: 50rpx;
			height: 68rpx;
			line-height: 68rpx;
			text-align: center;
		}
	}
	.not-address-info-msg {
		font-size: 28rpx;
		color: #4b4b4b;
	}

	.top-location-block {
		position: fixed;
		z-index: 20;
		top: 98rpx;
		left: 0;
		right: 0;
		bottom: 0;
		background: #ffffff;
		overflow-x: hidden;
		.not-address-info-msg {
			text-align: center;
			line-height: 200rpx;
		}
	}

	.bottom-location-block {
		flex: 1;
		overflow: hidden;
		position: relative;
		.bottom-location-list {
			height: 100%;
			background: #ffffff;
			overflow-x: hidden;
			.not-address-info-msg {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
			}
		}
	}
}
</style>
