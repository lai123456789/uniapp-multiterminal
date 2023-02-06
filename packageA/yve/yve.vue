<template>
	<view>
		<view class="text-wrap">
			<view class="content-wrap"><view class="right-text-block" @click="navigateToFn({ url: '/packageA/yve/zhangdanjilu' })">账单记录</view></view>
		</view>
		<view class="inp-block" v-if="isShowInput">
			<view class="content-wrap">
				<input class="inp border-radius" type="text" placeholder="请输入激活码" v-model="jihuoma" />
				<text @click="commitJiHuoMaFn">兑换</text>
			</view>
		</view>
		<view class="card-block">
			<view class="content-wrap">
				<view class="card">
					<image class="border-radius20" :src="calcImageSrc('/my/card-image.png')"></image>
					<view style="position: relative;z-index: 10;">
						<view class="yve-text">
							<text class="h3">{{ yveName }}</text>
							<view class="h6" @click="yveshuoming = true">
								余额说明
								<uni-icons size="15" color="#ffffff" type="help"></uni-icons>
							</view>
						</view>
						<view class="yve-num">
							¥
							<text>{{ yve }}</text>
						</view>
						<view class="bottom-block" v-if="moneyList.length > 0">
							<view class="item-chuxv" v-for="(item, index) in moneyList" :key="index">
								<view class="h4">{{ item.name }}</view>
								<view class="h5">
									¥
									<text>{{ item.money }}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view @click="navigateToFn({ url: `/packageA/yve/chongzhi`, type: 'redirectTo' })" class="bottom-btn-block">
			<button class="pay-btn" :class="[isAllAngle?'border-radius-style-all-arg':'border-radius-style-half-arg']" :style="{ background: configInfo.web_site_color }">去充值</button>
		</view>
		<modal-box :show="yveshuoming" @closeFn="yveshuoming = false">
			<template slot="title">
				余额说明
			</template>
			<template slot="content">
				<view><rich-text :nodes="yveShuoMing"></rich-text></view>
			</template>
		</modal-box>

		<loading-css :is-show="isShowLoading"></loading-css>
	</view>
</template>

<script>
import { bindMobileTips } from '@/tools/const.js';
import modalBox from '@/df-components/modal-box';
import { assertArray, assertObject, assertString } from '@/tools/tools.js';
export default {
	components: {
		modalBox
	},
	data() {
		return {
			isShowLoading: true, // 开屏动画
			yveshuoming: false, // 余额说明的模态框 显示 隐藏 状态

			yveName: '', // 余额名称
			yveShuoMing: '', // 余额说明
			yve: 0, // 余额
			moneyList: [{}], // 其他余额
			jihuoma: '' // 激活码
		};
	},
	onLoad() {
		this.getMoneyDetailsFn();
	},
	methods: {
		// 兑换激活码
		async commitJiHuoMaFn() {
			let that = this;
			
			// 未绑定手机号不能操作以下功能
			if(!that.isRunBindMobileFunc){
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						e.confirm && that.navigateToFn({url: `/packageA/tel-login/user-info`});
					},
				})
				return false;
			}
			
			let cdkey = assertString(that.jihuoma);
			if (cdkey.length <= 0) {
				uni.showToast({
					icon: 'none',
					title: '请输入激活码'
				});
				return false;
			}
			let result = await that.$request({
				method: 'post',
				url: `/api/User/storedcardCdkey`,
				data: {
					cdkey: that.jihuoma
				}
			});

			if (result.statusCode == 200) {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: result.data.msg,
					success(e) {
						that.jihuoma = '';
						that.getMoneyDetailsFn()
					}
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		},
		// 获取账户余额信息
		async getMoneyDetailsFn() {
			let that = this;
			let result = await that.$request({
				method: 'post',
				url: '/api/User/MoneyDetails'
			});

			//数据返回后 处理方式  处理数据
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);

					let moneyInfo = assertObject(resultObj.moneyInfo);
					that.yveName = moneyInfo.money_name; // 余额名称
					that.yveShuoMing = moneyInfo.money_pay_explain; // 余额说明
					that.yve = moneyInfo.money; // 余额
					that.moneyList = assertArray(resultObj.moneyListInfo);
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
		// 是否展示兑换框
		isShowInput() {
			return this.configInfo.stored_card_cdkey == 1;
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: $bg-grey-color;
}

.inp-block {
	background-color: #ffffff;
	padding: 15rpx 0;

	.content-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.inp {
		width: 628rpx;
		height: 60rpx;
		background-color: #f7f7f7;
		padding: 0 0.8em;
		color: $grey2-color;
		box-sizing: border-box;
		font-size: 24rpx;
	}

	text {
		font-size: 30rpx;
		color: $grey1-color;
		font-weight: 600;
	}
}

.card-block {
	color: #ffffff;

	.card {
		position: relative;
		padding: 0 60rpx;

		@mixin size {
			width: 702rpx;
			height: 400rpx;
		}

		@include size;

		image {
			position: absolute;
			top: 0;
			left: 0;
			@include size;
			box-shadow: 2rpx 5rpx 10rpx #f9ceca;
		}

		.yve-text {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 155rpx;

			.h3 {
				font-size: 36rpx;
				font-weight: 600;
			}

			.h6 {
				font-size: 23rpx;
			}
		}

		.yve-num {
			display: flex;
			align-items: center;
			height: 80rpx;
			font-size: 36rpx;
			font-weight: 600;

			text {
				font-size: 50rpx;
				text-indent: 0.1em;
				transform: translateY(-0.1em);
				display: inline-block;
				max-width: 10em;
				@include text-ellipsis;
			}
		}

		.bottom-block {
			display: flex;
			align-items: center;
			height: 155rpx;
			border-top: 1px solid #ffccae;

			.item-chuxv {
				flex: 1;
			}

			.chuxv,
			.lipinka {
				display: flex;
				flex-direction: column;
				flex: 1;
			}

			.h4 {
				font-size: 30rpx;
				font-weight: 600;
			}

			.h5 {
				font-size: 20rpx;
				font-weight: 600;

				text {
					font-size: 30rpx;
				}
			}
		}
	}
}

.bottom-btn-block {
	@include flex-center;
	position: fixed;
	z-index: 800;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	background: #ffffff;

	.pay-btn {
		@include btn-green;
	}
}
</style>
