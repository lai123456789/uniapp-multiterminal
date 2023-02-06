<!--
	收货地址列表页面
-->
<template>
	<view class="root-page">
		<loading-css :is-show="isShowLoading"></loading-css>
		<block v-if="myAddressList.length > 0">
			<block v-for="(item, index) in myAddressList" :key="item.id">
				<addressInfo
					:index="index"
					:info="item"
					:act="calcIsAct(item)"
					page="packageA/address/cart-select"
					@addressInfoClick="addressInfoClick"
				></addressInfo>
			</block>
		</block>
		<null-block
			v-else
			min-height="100vh"
			:is-show-to-page-btn="true"
			to-page-text="添加收货地址"
			:to-page-url="{ url: '/packageA/address/add' }"
		></null-block>

		<view class="uni-load-more" v-if="isShowLoadMore" style="background: #ffffff">
			<uni-load-more :status="loadMoreStatus"></uni-load-more>
		</view>

		<block v-if="myAddressList.length">
			<view style="height: 100rpx"></view>
			<view class="bottom-btn-block">
				<button
					@click="navigateToFn({ url: './add' })"
					class="clear-btn-style btn-green"
					:style="{ background: configInfo.web_site_color }"
					:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				>
					新增地址
				</button>
			</view>
		</block>
	</view>
</template>

<script>
import { assertArray } from '@/tools/tools.js';
import addressInfo from './address-info.vue';

export default {
	components: {
		addressInfo
	},
	data() {
		return {
			isSet: false,
			addressId: null,
			pageHeight: 0, // 页面可用高度
			page: 1,
			loadMoreStatus: 'more',
			isShowLoading: true, // 开屏动画
			myAddressList: [], // 存放地址的列表
			myAddressPageIndex: 1 // 当前页的索引
		};
	},
	onLoad(options) {
		let that = this;
		that.isSet = options.isSet;
		that.addressId = options.id;
		that.pageHeight = uni.getSystemInfoSync().windowHeight;
		console.log('packageA/address/cart-select load执行 options:', options);
	},
	onShow() {
		let that = this;
		that.myAddressPageIndex = 1;
		that.showAddressList(() => {
			that.myAddressList = [];
		});
	},
	onReachBottom() {
		let that = this;
		that.loadMoreStatus = 'loading';
		that.myAddressPageIndex++;
		that.showAddressList(list => {
			if (list.length <= 0) {
				that.loadMoreStatus = 'noMore';
			} else {
				that.loadMoreStatus = 'more';
			}
		});
	},
	onPullDownRefresh() {
		let that = this;
		that.myAddressPageIndex = 1;
		that.showAddressList(() => {
			that.myAddressList = [];
			uni.stopPullDownRefresh();
		});
	},
	methods: {
		// 请求我的地址列表
		async showAddressList(fn, isShowLoading) {
			let that = this;
			let result = await that.$request({
				loading: !!isShowLoading,
				url: '/api/Address/my_address',
				data: {
					page: that.myAddressPageIndex
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let addressList = assertArray(result.data.data);
					addressList.forEach((item, index) => {
						item.tagStyle = that.tagStyle(index);
					});

					if (addressList.length <= 0) {
						that.myAddressPageIndex--;
						if (that.myAddressPageIndex <= 1) {
							that.myAddressPageIndex = 1;
						}
					}

					fn && fn(addressList);
					that.myAddressList = that.myAddressList.concat(addressList);
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
		addressInfoClick(index) {
			let that = this;
			let item = that.myAddressList[index];
			that.isSet = 'true';
			that.addressId == item.id;
			uni.setStorageSync('temSelectAd', item);
			console.log('设置给 temSelectAd 的地址对象', item);
			that.toBackFn();
		}
	},
	computed: {
		// 当前地址是否选中状态
		calcIsAct() {
			let that = this;
			return item => {
				if (that.isSet == 'true' && that.addressId == item.id) {
					return true;
				}
				return false;
			};
		},
		// 是否展示 加载更多组件
		isShowLoadMore() {
			let that = this;
			if (that.myAddressList.length) {
				let bottomBarHeight = that.rpxTopxFn(100); // 底部添加按钮高度 px
				let listHeight = that.pageHeight - bottomBarHeight; // 给 地址列表 展示的区块 高度

				let listRpxHeight = that.myAddressList.length * 160 + 20; // 实际地址 列表 高度
				if (that.rpxTopxFn(listRpxHeight) >= listHeight) {
					return true;
				}
			}
			return false;
		}
	}
};
</script>

<style lang="scss" scoped>
.root-page {
	padding-top: 20rpx;
}

.bottom-btn-block {
	background: $bg-grey-color;
	@include flex-center;
	position: fixed;
	z-index: 500;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
}
</style>
