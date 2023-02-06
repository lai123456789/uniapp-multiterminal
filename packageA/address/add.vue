<!--
	添加收货地址页面
-->
<template>
	<view class="root-page">
		<loading-css :is-show="isShowLoading"></loading-css>
		<view class="from-content">
			<view class="content-wrap">
				<view class="line">
					<view class="text-title">收货人</view>
					<view class="text-content"><input type="text" placeholder="姓名" v-model="name" /></view>
				</view>
				<view class="line">
					<view class="text-title"></view>
					<view class="text-content sex-block">
						<view class="sex" @click="setSexFn(nv)">
							<uni-icons
								v-if="sex == nv"
								size="20"
								:color="configInfo.web_site_color"
								type="circle-filled"
							></uni-icons>
							<uni-icons v-else size="20" color="#91939c" type="circle"></uni-icons>
							<text>女士</text>
						</view>
						<view class="sex" @click="setSexFn(nan)">
							<uni-icons
								v-if="sex == nan"
								size="20"
								:color="configInfo.web_site_color"
								type="circle-filled"
							></uni-icons>
							<uni-icons v-else size="20" color="#91939c" type="circle"></uni-icons>
							<text>先生</text>
						</view>
					</view>
				</view>
				<view class="line">
					<view class="line">
						<view class="text-title">手机号</view>
						<view class="text-content"><input type="text" placeholder="手机号" v-model="mobile" /></view>
					</view>
				</view>
				<view class="line" @click="selectAddressFn" style="height: 120rpx;">
					<view class="text-title">收货地址</view>
					<view class="text-content autoMapSelect">{{ address }}</view>
					<view class="icon-block"><uni-icons color="#91939c" size="20" type="arrowright"></uni-icons></view>
				</view>

				<view class="line">
					<view class="text-title">门牌号</view>
					<view class="text-content">
						<input type="text" placeholder="例 万达广场 A座818" v-model="housenumber" />
					</view>
				</view>
				<view class="line">
					<view class="text-title">标签</view>
					<view class="text-content">
						<view class="tag-list">
							<view
								v-for="(item, index) in tagList"
								:key="index"
								@click="selectTagFn(index)"
								:class="['tag-block', tagAct == index ? item.tagStyle : 'defaultStyle']"
							>
								{{ item.tagName }}
							</view>
						</view>
					</view>
				</view>

				<view class="set-default-address">
					<view class="text-block">
						<view class="h4">设为默认地址</view>
						<view class="h5">每次购物时会优先定位该地址,方便您轻松购物</view>
					</view>
					<view class="icon-block">
						<switch
							style="transform: scale(.76)"
							:checked="false"
							:color="configInfo.web_site_color"
							@change="switchChangeFn"
						/>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-group">
			<button
				:loading="commitBtnLoading"
				type="default"
				class="btn-save"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				@click="saveFn"
				:style="{ background: configInfo.web_site_color }"
			>
				保存收货信息
			</button>
		</view>
	</view>
</template>

<script>
import { assertArray, checkTypeFn } from '@/tools/tools.js';
import { bindMobileTips } from '@/tools/const.js';
import { nan, nv, sexEnum } from './address';
import QQMapWX from '@/tools/libs/tx-map-sdk/qqmap-wx-jssdk.min';

let qqmapsdk;

export default {
	data() {
		return {
			nan,
			nv,
			isShowLoading: true,
			name: '',
			sex: nv,
			mobile: '',
			address: '点击选择收货地址',
			housenumber: '',
			defaultStatus: false,
			longitude: '',
			latitude: '',
			tagList: [],
			tagAct: 0,
			commitBtnLoading: false
		};
	},
	onShow() {
		let that = this;
		// 收银系统功能- 未绑定手机号不能操作以下功能
		if (!that.isRunBindMobileFunc) {
			uni.showModal({
				title: bindMobileTips,
				success(e) {
					e.confirm && that.navigateToFn({ url: `/packageA/tel-login/user-info` });
				}
			});
			return false;
		}
	},
	onLoad() {
		let that = this;
		qqmapsdk = qqmapsdk = new QQMapWX({
			key: that.configInfo.tx_map_key
		});
		that.loadFn();
	},
	methods: {
		// 获取地址标签列表数据
		getAddressTagFn() {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					url: '/api/Address/gettag'
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let tagList = assertArray(result.data.data).map((v, k) => {
							return {
								tagStyle: that.tagStyle(k),
								id: v.id,
								tagName: v.name
							};
						});
						resFn({
							type: 'success',
							msg: '获取标签数据成功',
							result: tagList
						});
					} else {
						resFn({
							type: 'error',
							msg: result.data.msg,
							result
						});
					}
				} else {
					resFn({
						type: 'error',
						msg: that.$errorMsg,
						result
					});
				}
			});
		},
		async loadFn() {
			let that = this;
			let getAddressTagResult = await that.getAddressTagFn();
			if (getAddressTagResult.type == 'success') {
				that.tagList = getAddressTagResult.result;
			} else {
				uni.showToast({
					icon: 'none',
					title: getAddressTagResult.msg
				});
			}
			that.isShowLoading = false;
		},
		// 设置性别
		setSexFn(sex) {
			this.sex = sex;
		},
		// 打开地图 选择地址
		selectAddressFn() {
			let that = this;
			uni.chooseLocation({
				async success(e) {
					console.log(e);
					let str, longitude, latitude;
					if (e.errMsg == 'chooseLocation:ok' && e.address) {
						str = `${e.address} ${e.name}`;
						longitude = e.longitude;
						latitude = e.latitude;
					} else {
						str = '点击选择收货地址';
						longitude = '';
						latitude = '';
					}
					that.address = str;
					that.longitude = longitude;
					that.latitude = latitude;
				},
				fail(e) {
					console.log('失败', e);
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: '允许系统获取位置信息',
						success(e) {
							//确认后的回调
							uni.openSetting();
						}
					});
				}
			});
		},
		switchChangeFn(e) {
			this.defaultStatus = e.detail.value;
		},
		selectTagFn(index) {
			this.tagAct = index;
		},
		async saveFn() {
			let that = this;
			if (that.name.length < 1 || that.name.length > 20) {
				uni.showToast({
					title: '收货人名字长度是1~20',
					icon: 'none'
				});
				return;
			}
			// 收银系统功能- 未绑定手机号不能操作以下功能
			if (!that.isRunBindMobileFunc) {
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						e.confirm && that.navigateToFn({ url: `/packageA/tel-login/user-info` });
					}
				});
				return false;
			}

			if (!that.regTel(that.mobile)) {
				uni.showToast({
					title: '请检查手机号格式是否正确',
					icon: 'none'
				});
				return;
			}

			if (that.address == '点击选择收货地址') {
				uni.showToast({
					title: '请选择收货地址',
					icon: 'none'
				});
				return;
			}

			if (!that.housenumber || that.housenumber.length > 60) {
				uni.showToast({
					title: '请填写门牌号(限填写60个字符)',
					icon: 'none'
				});
				return;
			}
			if (that.commitBtnLoading) {
				return false;
			}
			that.commitBtnLoading = true;

			let addressTextResult = await that.getCurrentAddressInfo({
				latitude: that.latitude,
				longitude: that.longitude
			});
			console.log('getCurrentAddressInfo addressTextResult',addressTextResult);

			if (addressTextResult.type != 'success') {
				uni.showToast({
					title: '该坐标获取城市信息失败',
					icon: 'none'
				});
				that.commitBtnLoading = false;
				return false;
			}

			let area = addressTextResult.result.address_component.city;

			let sendDataObj = {
				name: that.name,
				sex: sexEnum[that.sex],
				mobile: that.mobile,
				coordinate: `${that.longitude},${that.latitude}`,
				area,
				address: that.address,
				housenumber: that.housenumber,
				tag: that.tagList[that.tagAct].id,
				status: that.defaultStatus ? 1 : 0
			};

			let result = await that.$request({
				method: 'post',
				url: '/api/Address/add_address',
				data: sendDataObj
			});
			console.log('保存添加的收货地址 /api/Address/add_address 接口参数', sendDataObj);
			console.log('保存添加的收货地址 /api/Address/add_address 接口返回数据', result);
			if (result.statusCode == 200) {
				uni.showToast({
					icon: result.data.code == 200 ? 'success' : 'none',
					title: result.data.msg
				});
				setTimeout(() => {
					that.toBackFn();
				}, 1000);
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
			that.commitBtnLoading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.from-content {
	margin-top: 20rpx;
	background: #ffffff;

	.line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		font-size: 26rpx;
		border-bottom: 1px solid #f5f5f5;

		&:last-child {
			border: none;
		}

		.text-title {
			display: flex;
			align-items: center;
			width: 155rpx;
			height: 100%;
		}

		.text-content {
			flex: 1;
			font-size: 26rpx;

			&.autoMapSelect {
				color: $grey2-color;
				@include text-ellipsis-rows;
			}
		}

		.icon-block {
			display: flex;
			justify-content: flex-end;
			width: 150rpx;
		}

		.grey1-color {
			color: $grey1-color;
		}

		.grey2-color {
			color: $grey2-color;
		}

		input {
			font-size: 26rpx;
		}

		.sex-block {
			display: flex;

			.sex {
				margin-right: 80rpx;
				display: flex;
				align-items: center;

				text {
					margin-right: 0.2em;
				}
			}
		}
		.tag-list {
			.tag-block {
				margin: 0 10rpx;
			}
		}
	}

	.set-default-address {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;

		.text-block {
			display: flex;
			flex-direction: column;

			.h4 {
				font-size: 26rpx;
				color: $grey1-color;
				line-height: 40rpx;
			}

			.h5 {
				font-size: 22rpx;
				color: $grey2-color;
			}
		}
	}
}

.btn-group {
	padding-top: 80rpx;

	.btn-save {
		margin-bottom: 20rpx;
		@include btn-green;
	}
}
</style>
