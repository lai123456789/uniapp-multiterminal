<template>
	<view class="page">
		<view class="tixianjilu content-wrap">
			<text @click="navigateToFn({ url: `/packageA/fenxiao/tixianjilu` })">提现记录</text>
		</view>

		<view class="jine-block">
			<view class="jine">{{ money }}</view>
			<view class="text">{{ minTxMoney.tip }}({{ minTxMoney.title }}:{{ minTxMoney.value }}元)</view>
		</view>
		<view class="tixian-block">
			<view class="content-wrap">
				<view :class="['input-wrap', isFocus ? 'act' : '']">
					<input
						v-model="tixianNum"
						placeholder="请输入提现金额"
						type="digit"
						@focus="setFocusState(true)"
						@blur="blurFn"
					/>
					<text @click="tixianAllFn">全部提现</text>
				</view>
				<view class="tip-text">
					{{ txSXF.title }}: {{ txSXF.value | num2bfh }} 最终到账: ¥{{ daoZhangMoney }}
				</view>
				<view class="type-list">
					<view class="item" @click="setSelectType(0)" v-if="isShowType(1)">
						<uni-icons v-if="selectType == 0" type="checkbox-filled" color="#69a5e8" size="18"></uni-icons>
						<uni-icons v-else type="circle" color="#d9d9d9" size="18"></uni-icons>
						<text>系统余额</text>
					</view>

					<!-- #ifdef MP-WEIXIN || APP-PLUS -->
					<view class="item" @click="setSelectType(1)" v-if="isShowType(2)">
						<uni-icons v-if="selectType == 1" type="checkbox-filled" color="#69a5e8" size="18"></uni-icons>
						<uni-icons v-else type="circle" color="#d9d9d9" size="18"></uni-icons>
						<text>微信零钱</text>
					</view>
					<!-- #endif -->
					
					<!-- #ifdef H5 -->
					<view class="item" @click="setSelectType(1)" v-if="isShowType(2) && globalBrowserIsWx">
						<uni-icons v-if="selectType == 1" type="checkbox-filled" color="#69a5e8" size="18"></uni-icons>
						<uni-icons v-else type="circle" color="#d9d9d9" size="18"></uni-icons>
						<text>微信零钱</text>
					</view>
					<!-- #endif -->

					<!-- 
					<view class="item" @click="setSelectType(2)">
						<uni-icons v-if="selectType == 2" type="checkbox-filled" color="#69a5e8" size="18"></uni-icons>
						<uni-icons v-else type="circle" color="#d9d9d9" size="18"></uni-icons>
						<text>支付宝</text>
					</view>
					<view class="item" @click="setSelectType(3)">
						<uni-icons v-if="selectType == 3" type="checkbox-filled" color="#69a5e8" size="18"></uni-icons>
						<uni-icons v-else type="circle" color="#d9d9d9" size="18"></uni-icons>
						<text>银行卡</text>
					</view>
					 -->
				</view>

				<view class="commitInfo" v-if="selectType != 0">
					<view class="item selectType1" v-if="selectType == 1">
						<view class="text">微信真实姓名:</view>
						<input class="text-input" type="text" v-model="weixinName" />
					</view>

					<view class="item selectType2" v-if="selectType == 2">
						<view class="text">支付宝账户:</view>
						<input class="text-input" type="text" v-model="zhifubaoName" />
					</view>
					<view class="item selectType2" v-if="selectType == 2">
						<view class="text">支付宝真实姓名:</view>
						<input class="text-input" type="text" v-model="zhifubaoID" />
					</view>

					<view class="item selectType3" v-if="selectType == 3">
						<view class="text">银行卡名称:</view>
						<input class="text-input" type="text" v-model="yinhangName" />
					</view>
					<view class="item selectType3" v-if="selectType == 3">
						<view class="text">执卡人姓名:</view>
						<input class="text-input" type="text" v-model="yinhangNamePer" />
					</view>
					<view class="item selectType3" v-if="selectType == 3">
						<view class="text">银行卡账户:</view>
						<input class="text-input" type="text" v-model="yinhangID" />
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-btn-block">
			<view
				class="pay-btn"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				:style="{ background: hexToRgba(configInfo.web_site_color, 0.7) }"
				@click="commitFn"
			>
				提交
			</view>
		</view>

		<view class="content-wrap">
			<view class="guize">
				<view class="text">{{ txRule.tip }}:</view>
				<rich-text :nodes="txRuleTxt"></rich-text>
			</view>
		</view>

		<loading-css :is-show="isShowLoading" />
	</view>
</template>

<script>
import { checkTypeFn, transNumFn, toDoubleNumFn, bigMinus, bigTimes, bigDiv } from '@/tools/tools';
export default {
	data() {
		return {
			isShowLoading: true,
			money: '',
			isFocus: false,
			tixianNum: '',
			/* 
					selectType
						0系统余额
						1微信零钱
						2支付宝
						3银行卡
				*/
			selectType: 0,

			weixinName: '', //微信实名
			zhifubaoName: '', //支付宝实名
			zhifubaoID: '', //支付宝账号
			yinhangName: '', //xx银行
			yinhangNamePer: '', //银行卡执卡人姓名
			yinhangID: '', //银行卡账号

			//最小提现金额
			minTxMoney: {
				title: '',
				tip: '',
				value: ''
			},
			// 提现手续费
			txSXF: {
				title: '',
				tip: '',
				value: ''
			},

			// 提现规则
			txRule: {
				title: '',
				tip: '',
				value: ''
			},

			// 最终到账钱数
			daoZhangMoney: 0,

			tixianTypeArr: [],
			// 模板消息相关信息
			templateInfo: {
				templateStatus: false,
				templateId: ''
			}
		};
	},
	onLoad(options) {
		let that = this;
		let { money } = options;
		that.money += money;
		that.getPageDataFn(() => {
			that.isShowLoading = false;
		});
	},
	methods: {
		// 选择提现类型
		setSelectType(n) {
			this.selectType = n;
		},
		// 激活 提现金额 的输入框
		setFocusState(flag) {
			this.isFocus = flag;
		},
		/* 
			获取页面数据 
				提现金额
				提现类型
				手续费.....
		*/
		async getPageDataFn(fn) {
			let that = this;
			let result = await that.$request({
				url: '/api/Share/fx_tx_data'
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					fn && fn();

					// 处理余额
					that.money = toDoubleNumFn(result.data.data.money);

					// 最小提现金额
					that.minTxMoney.title = result.data.data.tx_small_money.title;
					that.minTxMoney.tip = result.data.data.tx_small_money.tip;
					that.minTxMoney.value = toDoubleNumFn(result.data.data.tx_small_money.value);

					// 最小提现金额
					that.txSXF.title = result.data.data.tx_sxf.title;
					that.txSXF.tip = result.data.data.tx_sxf.tip;
					that.txSXF.value = result.data.data.tx_sxf.value;

					// 提现规则
					that.txRule.title = result.data.data.tx_rule.title;
					that.txRule.tip = result.data.data.tx_rule.tip;
					that.txRule.value = result.data.data.tx_rule.value;

					// 处理类型
					that.tixianTypeArr = [];
					result.data.data.tx_action.value.forEach(item => {
						that.tixianTypeArr.push(item.value);
					});

					// 处理模板消息
					that.templateInfo.templateStatus = result.data.data.template.mini_status == 1 ? true : false;
					that.templateInfo.templateId = result.data.data.template.mini_template_id;
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

		// 赋值提现到账 的钱数
		setZhangMoneyFn(num_dot) {
			let that = this;
			let sxf = transNumFn(that.txSXF.value);
			console.log(sxf, '1sxf', '\n');
			let tixian = transNumFn(num_dot);

			console.log(tixian, '1tixian', '\n');

			// let doubleNum = mathjsCalc(`(${tixian} * ${sxf}) / 100`);
			let doubleNum = bigDiv(bigTimes(tixian, sxf), 100);

			// let daoZhangMoney = mathjsCalc(`${tixian} - ${doubleNum}`);
			let daoZhangMoney = bigMinus(tixian, doubleNum);

			console.log(daoZhangMoney, '1daoZhangMoney', '\n');

			that.daoZhangMoney = toDoubleNumFn(daoZhangMoney);
			console.log(that.daoZhangMoney, '1that.daoZhangMoney', '\n');
		},
		// 提现全部
		tixianAllFn() {
			let that = this;
			let money = transNumFn(that.money);
			if (money > 0) {
				that.tixianNum = toDoubleNumFn(money);
				that.setZhangMoneyFn(money);
			} else {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: '余额不足',
					success(e) {
						//确认后的回调
						console.log(e);
					}
				});
			}
		},
		/*
			 根据类型返回是否显示
				类型
					name: "系统余额"
					value: 1
					
					name: "微信零钱"
					value: 2
					
			*/
		isShowType(flag) {
			if (this.tixianTypeArr) {
				return this.tixianTypeArr.includes(flag);
			} else {
				return false;
			}
		},
		// 提交 提现请求
		commitFn() {
			let that = this;
			let data = {};

			/*
					selectType
						0系统余额
						1微信零钱
						2支付宝
						3银行卡
				*/

			if (that.selectType == 0) {
				data.tx_type = 1;
			}
			
			if (that.selectType == 1) {
				data.tx_type = 2;

				if (!that.weixinName || checkTypeFn(that.weixinName) != 'String') {
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: '请输入微信真实姓名',
						success(e) {
							//确认后的回调
							console.log(e);
						}
					});
					return false;
				}
				data.param1 = that.weixinName;
			}

			data.tx_money = that.tixianNum - 0;
			

			console.log(
				that.templateInfo.templateId,
				'that.templateId',
				'\n',
				that.templateInfo.templateStatus,
				'that.templateInfo.templateStatus',
				'\n'
			);

			// #ifdef MP-WEIXIN
			data.platform_type = 'wxMiniProgram';

			if (that.templateInfo.templateStatus) {
				let opt = {
					tmplIds: [that.templateInfo.templateId], //数组
					success(e) {
						console.log(e, '模板消息结果', '\n');
					},
					fail(err) {
						console.log(err, '失败', '\n');
					},
					complete(e) {
						console.log('complete1', '\n');
						that.tixianFn(data);
					}
				};
				uni.requestSubscribeMessage(opt);
				console.log(opt, 'opt 配置数据', '\n');
			} else {
				that.tixianFn(data);
			}
			// #endif

			// #ifdef APP-PLUS
			data.platform_type = 'App';
			that.tixianFn(data);
			// #endif
			
			// #ifdef H5
			if(that.globalBrowserIsWx){
				data.platform_type = 'officialAccount';
			}else{
				data.platform_type = 'H5';
			}
			that.tixianFn(data);
			// #endif
		},
		async tixianFn(data) {
			let that = this;
			console.log('tixianFn', '\n');
			let result = await that.$request({
				method: 'post',
				url: '/api/Share/fx_tx',
				data
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: result.data.msg
					});
					that.getPageDataFn(() => {
						that.resetFn();
					});
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
		blurFn() {
			let that = this;
			// 设置动画 线的 状态
			that.setFocusState(false);
			that.tixianNum = toDoubleNumFn(that.tixianNum);

			let tixianNum = transNumFn(that.tixianNum);
			console.log(tixianNum, '提现金额', '\n');

			if (tixianNum > 0 && tixianNum <= transNumFn(that.money)) {
				that.setZhangMoneyFn(tixianNum);
			} else {
				that.tixianNum = '';
				/* 
					uni.showToast({
						icon: 'none',
						title: '余额不足'
					})
					 */
			}
		},
		resetFn() {
			let that = this;
			that.tixianNum = '';
			that.selectType = 0;
			that.daoZhangMoney = 0;
		}
	}, //<----methods 结束
	computed: {
		txRuleTxt() {
			let that = this;
			return ` ${that.txRule.value}`;
		}
	},
	filters: {
		// 把小数转换成 百分比 显示
		num2bfh(val) {
			let num = transNumFn(val);
			return `${num}%`;
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: $bg-grey-color;
}

.tixianjilu {
	background: #ffffff;
	text-align: right;

	text {
		line-height: 80rpx;
		font-size: 28rpx;
		color: #69a5e8;
	}
}

.jine-block {
	background: #ffffff;
	text-align: center;
	border-bottom: 20rpx solid $bg-grey-color;

	.jine {
		font-weight: 600;
		color: #000000;
		font-size: 46rpx;
	}

	.text {
		line-height: 80rpx;
		font-size: 28rpx;
		color: #a2a2a2;
	}
}

.tixian-block {
	padding-top: 40rpx;
	background: #ffffff;

	.input-wrap {
		display: flex;
		align-items: center;
		position: relative;
		height: 80rpx;
		border-bottom: 1px solid $bg-grey-color;

		input {
			flex: 4;
			box-sizing: border-box;
			padding: 0 0.4em;
		}

		text {
			flex: 1;
			font-size: 28rpx;
			color: #69a5e8;
		}

		&::after {
			content: '';
			display: block;
			position: absolute;
			bottom: 0;
			width: 0;
			height: 1px;
			background: #69a5e8;
			transform: translateY(1px);
			transition: 0.3s;
		}

		&.act::after {
			width: 100%;
		}
	}

	.tip-text {
		font-size: 22rpx;
		color: #a2a2a2;
		line-height: 60rpx;
	}

	.type-list {
		display: flex;
		height: 94rpx;
		align-items: center;

		.item {
			margin-right: 20rpx;
			display: flex;
			align-items: center;

			text {
				text-indent: 0.2em;
				color: #414959;
				font-size: 28rpx;
			}
		}
	}

	.commitInfo {
		padding-bottom: 40rpx;

		.item {
			margin-bottom: 24rpx;

			.text {
				font-size: 28rpx;
				color: #414959;
			}

			.text-input {
				border: 1px solid #e8e8e8;
				width: 100%;
				padding: 0 0.4em;
				box-sizing: border-box;
			}
		}
	}
}

.bottom-btn-block {
	margin: 46rpx 0;

	@include flex-center;
	width: 100%;
	height: 100rpx;

	.pay-btn {
		@include btn-green;
	}
}

.guize {
	font-size: 28rpx;
	color: #a2a2a2;
}
</style>
