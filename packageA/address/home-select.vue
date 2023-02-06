<template>
	<view class="root-page">
		<view class="search-block">
			<view class="content-wrap">
				<view class="gb-block border-radius" @click="searchInputClickFn">
					<navigator url="" class="navigator-btn" hover-class="none">
						<text>{{ temCity ? temCity : '未选择' }}</text>
						▼
					</navigator>
					<input type="text" placeholder="请输入您的收货地址" disabled />
				</view>
			</view>
		</view>
		<block v-if="isLogin && myAddressList.length > 0">
			<view class="title-text">
				<view>我的收货地址</view>
				<view
					class="add-btn"
					:style="{ color: configInfo.web_site_color }"
					@click="navigateToFn({ url: `/packageA/address/add` })"
				>
					<view class="after border-radius" :style="{ background: configInfo.web_site_color }"></view>
					<view class="before border-radius" :style="{ background: configInfo.web_site_color }"></view>
					新增地址
				</view>
			</view>
			<view class="address-list">
				<block v-if="myAddressList.length > 0">
					<block v-for="(item, index) in myAddressList" :key="item.id">
						<addressInfo
							:index="index"
							:info="item"
							page="packageA/address/home-select"
							@addressInfoClick="addressInfoClick"
						></addressInfo>
					</block>
				</block>
			</view>
		</block>
		<view class="title-text">
			<view>附近地址</view>
			<view
				class="add-btn"
				:style="{ color: configInfo.web_site_color }"
				v-if="isLogin && myAddressList.length <= 0"
				@click="navigateToFn({ url: `/packageA/address/add` })"
			>
				<view class="after border-radius" :style="{ background: configInfo.web_site_color }"></view>
				<view class="before border-radius" :style="{ background: configInfo.web_site_color }"></view>
				新增地址
			</view>
		</view>

		<view class="address-line">
			<view class="content-wrap">
				<view
					class="line"
					v-for="(item, index) in poiAddressList"
					:key="index"
					@click="selectAdrFn(item, index)"
				>
					<text>{{ item.currentAddressText }}</text>
				</view>
			</view>
		</view>
		<loading-css :is-show="isShowLoading"></loading-css>
	</view>
</template>
<script>
import addressInfo from './address-info.vue';
import QQMapWX from '@/tools/libs/tx-map-sdk/qqmap-wx-jssdk.min.js';
import { assertObject, assertArray, Object2QueryString } from '@/tools/tools.js';

let qqmapsdk;

export default {
	components: {
		addressInfo
	},
	data() {
		return {
			isShowLoading: true, // 开屏动画
			myAddressList: [], // 我的地址列表数据
			temCity: '', // 当前的市
			poiAddressList: [], // 附近的地址数据
			showCont: 0
		};
	},
	onLoad(e) {
		let that = this;
		// #ifdef MP-WEIXIN || APP-PLUS || MP-TOUTIAO
		qqmapsdk = new QQMapWX({
			key: that.configInfo.tx_map_key
		});
		// #endif
	},
	onShow() {
		let that = this;
		console.log('home-select showfnrun');
		that.showCont = 0;
		that.getPoiLocationListFn();
		that.getMyLocationListFn();
		uni.setStorageSync('loopShowModalFlag', '');
	},
	methods: {
		// 获取附近地址 列表
		async getPoiLocationListFn() {
			let that = this;
			let indexAddressInfo = assertObject(uni.getStorageSync('indexAddressInfo'));
			console.log(indexAddressInfo);
			// #ifdef H5
			let url = `https://apis.map.qq.com/ws/geocoder/v1/?`;

			let mapOptions = {
				key: that.configInfo.tx_map_key,
				output: 'jsonp',
				poi_options: 'address_format=short',
				location: `${indexAddressInfo.latitude},${indexAddressInfo.longitude}`,
				get_poi: 1,
				poi_options: `address_format=short;radius=1000;page_size=6;page_index=1;policy=2`
			};

			let addressObject = await that.$jsonp(`${url}${Object2QueryString(mapOptions)}`);
			if (addressObject.status == 0) {
				that.temCity = addressObject.result.address_component.city;

				that.poiAddressList = addressObject.result.pois.map(item => {
					return {
						latitude: item.location.lat,
						longitude: item.location.lng,
						currentAddressText: item.title
					};
				});
			}

			that.showCont++;
			if (that.showCont >= 2) {
				that.isShowLoading = false;
			}

			// #endif

			// #ifdef MP-WEIXIN || APP-PLUS || MP-TOUTIAO

			qqmapsdk.reverseGeocoder({
				location: {
					latitude: indexAddressInfo.latitude,
					longitude: indexAddressInfo.longitude
				},
				get_poi: 1,
				poi_options: `address_format=short;radius=1000;page_size=6;page_index=1;policy=2`,
				success(res) {
					console.log('qqmapsdk.reverseGeocoder 获取的附件地址信息', res);
					that.temCity = res.result.address_component.city;
					that.poiAddressList = res.result.pois.map(item => {
						return {
							latitude: item.location.lat,
							longitude: item.location.lng,
							currentAddressText: item.title
						};
					});
				},
				complete() {
					that.showCont++;
					if (that.showCont >= 2) {
						that.isShowLoading = false;
					}
				}
			});

			// #endif
		},
		// 获取我的地址列表
		async getMyLocationListFn() {
			let that = this;
			if (!that.isLogin) {
				that.myAddressList = [];
				that.showCont++;
				if (that.showCont >= 2) {
					that.isShowLoading = false;
				}
				return false;
			}
			let result = await that.$request({
				url: '/api/Address/my_address',
				data: {
					page: 1
				}
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let addressArr = assertArray(result.data.data);

					addressArr.forEach((item, index) => {
						item.tagStyle = that.tagStyle(index);
					});
					that.myAddressList = addressArr;
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
			that.showCont++;
			if (that.showCont >= 2) {
				that.isShowLoading = false;
			}
		},
		// 点击搜索框开始搜索地址
		searchInputClickFn() {
			let that = this;
			uni.chooseLocation({
				type: 'gcj02',
				async success(res) {
					that.hideAllFn();
					uni.showLoading();
					let result = await that.checkRangeFn(`${res.longitude},${res.latitude}`);
					let indexAddressInfo = {
						latitude: res.latitude,
						longitude: res.longitude,
						currentAddressText: res.address,
						addressIsAtRangeFlag: result.type == 'success',
						reset: true
					};
					uni.setStorageSync('indexAddressInfo', indexAddressInfo);
					that.hideAllFn();
					that.toBackFn();
				},
				fail(e) {
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: '未获取位置权限',
						success(e) {
							//确认后的回调
							that.navigateToFn({
								url: `/packageA/set-address-page/index?page=indexSelect`
							});
						}
					});
				}
			});
		},
		// 我的收获地址列表点击
		// 附近地址点击
		async addressInfoClick(index) {
			let that = this;
			that.hideAllFn();
			uni.showLoading();
			let item = that.myAddressList[index];
			let result = await that.checkRangeFn(item.coordinate);
			let indexAddressInfo = {
				latitude: item.coordinate.split(',')[1],
				longitude: item.coordinate.split(',')[0],
				currentAddressText: item.address,
				addressIsAtRangeFlag: result.type == 'success',
				reset: true
			};
			console.log('addressInfoClick checkRangeFn result', result);
			console.log('addressInfoClick indexAddressInfo', indexAddressInfo);
			uni.setStorageSync('indexAddressInfo', indexAddressInfo);
			that.hideAllFn();
			that.toBackFn();
		},
		// 点击附近列表地址
		async selectAdrFn(item) {
			let that = this;
			that.hideAllFn();
			uni.showLoading();
			let result = await that.checkRangeFn(`${item.longitude},${item.latitude}`);

			let indexAddressInfo = {
				latitude: item.latitude,
				longitude: item.longitude,
				currentAddressText: item.currentAddressText,
				addressIsAtRangeFlag: result.type == 'success',
				reset: true
			};
			console.log('selectAdrFn checkRangeFn result', result);
			console.log('selectAdrFn indexAddressInfo', indexAddressInfo);

			uni.setStorageSync('indexAddressInfo', indexAddressInfo);
			that.hideAllFn();
			that.toBackFn();
		}
	}
};
</script>

<style lang="scss" scoped>
.title-text {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;
	height: 64rpx;
	color: $grey1-color;
	font-size: 23rpx;

	.add-btn {
		position: relative;
		.after,
		.before {
			position: absolute;
			width: 20rpx;
			height: 2rpx;
			left: 0;
			top: 50%;
		}
		.after {
			transform: translateX(-120%) translateY(-50%);
		}
		.before {
			transform: translateX(-120%) translateY(-50%) rotate(90deg);
		}
	}
}

.search-block {
	padding: 12rpx 0 14rpx;
	background: #ffffff;

	.gb-block {
		display: flex;
		align-items: center;

		height: 60rpx;
		background: #f7f7f7;

		.navigator-btn {
			display: flex;
			align-items: center;
			margin: 0 1em;
			font-size: 26rpx;
			color: $grey1-color;

			text {
				display: inline-block;
				max-width: 10em;
				@include text-ellipsis;
			}
		}

		input {
			flex: 1;
			padding: 0 1.5em;
			height: 100%;
			color: $grey2-color;
			font-size: 23rpx;
		}
	}
}

.address-list {
	background: #ffffff;

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		height: 122rpx;
		border-bottom: 1px solid #f5f5f5;

		&:last-child {
			border: none;
		}

		.text-block {
			display: flex;
			flex-direction: column;

			.address-text {
				display: flex;
				align-items: center;

				text {
					margin-right: 0.8em;
					font-size: 28rpx;
					color: $grey1-color;
					@include text-ellipsis;
					max-width: 15em;
				}

				.tag-list {
					font-size: 0;

					view {
						margin-right: 1em;
					}
				}
			}

			.user-info {
				display: flex;
				font-size: 26rpx;
				color: $grey2-color;

				.user-name {
					margin-right: 0.5em;
				}
			}
		}

		.icon-block {
			display: flex;
			align-items: center;
			margin-right: 20rpx;
		}
	}
}

.address-line {
	background: #ffffff;

	.line {
		display: flex;
		align-items: center;
		height: 88rpx;
		font-size: 28rpx;
		border-bottom: 1px solid #f5f5f5;

		text {
			display: inline-block;
			max-width: 20em;
			@include text-ellipsis;
		}

		&:last-child {
			border: none;
		}
	}
}
</style>
