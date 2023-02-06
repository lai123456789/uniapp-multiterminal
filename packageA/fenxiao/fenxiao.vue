<template>
	<view class="page">
		<view class="user-block">
			<view class="content-wrap">
				<view class="touxiang-wrap"><image class="border-radius" :src="userInfoAvatar"></image></view>
				<view class="user-info-block">
					<view class="user-name">{{ userInfoNickName }}</view>
					<view class="user-Id">ID: {{ user_id }}</view>
					<view class="sharer">邀请人: {{ nickname }}</view>
				</view>
			</view>
		</view>

		<view class="jine-block">
			<view class="content-wrap">
				<view class="num-block">
					<view class="num">{{ money }}</view>
					<view class="text">可提现金额(元)</view>
				</view>
				<view class="btn-block">
					<button
						type="default"
						:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
						@click="toTiXian()"
					>
						提现
					</button>
				</view>
			</view>
		</view>

		<view class="line-block" @click="navigateToFn({ url: '/packageA/fenxiao/fensi' })">
			<view class="line">
				<text>我的粉丝</text>
				<uni-icons type="arrowright"></uni-icons>
			</view>
		</view>

		<view class="line-block" @click="tuiguan">
			<view class="line">
				<text>推广收益</text>
				<uni-icons type="arrowright"></uni-icons>
			</view>
		</view>
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<view class="line-block" @click="navigateToFn({ url: '/packageA/tuijianyouli/canvas' })">
			<view class="line">
				<text>我的二维码</text>
				<uni-icons type="arrowright"></uni-icons>
			</view>
		</view>
		<!-- #endif -->
		<loading-css :is-show="isShowLoading"></loading-css>

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="loadFn" @close="closeGlobalLoginFn" to-back></login-fn>


	</view>
</template>

<script>
import {
    mapState
} from 'vuex'

import { toDoubleNumFn } from '@/tools/tools';

export default {
	data() {
		return {
			isShowLoading: true,
			nickname: '',
			user_id: '',
			money: '',
			fans_num: '',
			order_num: '',
			loginBoxFlag:false, // 登录框显示隐藏状态
		};
	},
	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
		that.isShowLoading = true;
		that.loadFn();
	},
	methods: {
		loadFn() {
			this.getMyFxFn();
		},
		// 去提现函数
		toTiXian() {
			let that = this;
			if (that.userInfoMobile) {
				that.navigateToFn({
					url: '/packageA/fenxiao/tixian?money=' + that.money
				});
			} else {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: '请先绑定手机号',
					success(e) {
						//确认后的回调
						that.navigateToFn({
							url: '/packageA/tel-login/user-info'
						});
					}
				});
			}
		},
		// 进入推广收益页面
		tuiguan() {
			let that = this;
			let { fans_num, order_num, money } = that;
			let url = `./tuiguangshouyi?fans_num=${fans_num}&order_num=${order_num}&money=${money}`;
			that.navigateToFn({
				url
			});
		},
		// 获取分销 信息
		async getMyFxFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/Share/myFx'
			});
			console.log('接口 /api/Share/myFx 返回的数据——', result);
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let { nickname, user_id, money, fans_num, order_num } = result.data.data;

					that.nickname = nickname ? nickname : '无';
					that.user_id = user_id;
					console.log(money, '转换前', '\n');
					that.money = toDoubleNumFn(money);
					console.log(that.money, '金额', '\n');
					that.fans_num = fans_num;
					that.order_num = order_num;
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
		}
	},
	computed: {
		...mapState({
			userInfoAvatar: store => store.userInfo.userInfoAvatar, // 头像地址
			userInfoNickName: store => store.userInfo.userInfoNickName, // 网名
			userInfoMobile: store => store.userInfo.userInfoMobile, // 手机号
		})
	}
};
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: $bg-grey-color;
}

@mixin bottom-border {
	border-bottom: 1px solid $bg-grey-color;
}

.user-block {
	padding: 26rpx 0;
	background: #ffffff;
	@include bottom-border;

	.content-wrap {
		display: flex;

		.touxiang-wrap {
			margin-right: 20rpx;
			width: 120rpx;
			height: 120rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.user-info-block {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			color: #303030;
			font-size: 28rpx;
		}
	}
}

.jine-block {
	height: 140rpx;
	@include bottom-border;
	background: #ffffff;

	.content-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100%;

		.num-block {
			display: flex;
			flex-direction: column;

			.num {
				font-weight: 600;
				font-size: 44rpx;
				color: $red-color;
			}

			.text {
				font-size: 28rpx;
				color: #a2a2a2;
			}
		}

		.btn-block button {
			width: 112rpx;
			height: 54rpx;
			line-height: 54rpx;
			background: $red-color;
			color: #ffffff;
			font-size: 26rpx;
		}
	}
}

.line-block {
	background: #ffffff;

	.line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		border-bottom: 1px solid $bg-grey-color;
		padding: 0 24rpx;

		text {
			font-size: 26rpx;
			color: #414959;
		}

		.red-price {
			color: $red-color;
		}
	}

	&.clear-block {
		margin-top: 20rpx;
		margin-bottom: 40rpx;
	}
}
</style>
