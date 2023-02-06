<template>
	<view class="title">
		<div class="h3">购物清单</div>
		<view v-if="calcPostType != 2" class="get-time">
			{{ calcSendTextBefore }}

			<view>{{ pickerArr[0][daysIndex].textStr }}</view>
			<view>{{ pickerArr[1][hoursIndex].textStr }}</view>
			{{ calcSendTextAfter }}
		</view>
		<picker
			v-if="isShowSelectTimeComponent"
			mode="multiSelector"
			range-key="textStr"
			@change="changeFn"
			@columnchange="columnchangeFn"
			@click="pickerClickFn"
			@cancel="pickerCancelFn"
			:range="pickerArr"
		>
			<view class="change-getTime" :style="{ color: configInfo.web_site_color }">
				<text style="margin-right: .1em;">{{ calcPostType == 1 ? '更改自提时间' : '更改配送时间' }}</text>
				<uni-icons size="13" :color="configInfo.web_site_color" type="arrowright"></uni-icons>
			</view>
		</picker>
	</view>
</template>

<script>
import { toDayStr, tomorrowStr, assertString, assertObject, transNumFn } from '@/tools/tools';
export default {
	name: 'my-picker-comp',
	props: {
		// 配送方式
		calcPostType: {
			// type: Number
		},
		// 是否开启预约配送
		isOpenyvyueFun: {
			// type: Boolean,
			default: false
		},
		// 预约的天数
		yvyueDays: {
			// type: Number,
			default: 0
		},
		// 小时的数据
		hoursArr: {
			// type: Array,
			default: [{}]
		},
		// 选择今天配送的小时数据
		newToDayHourArr: {
			// type: Array,
			default: [{}]
		},

		// 天的索引
		daysIndex: {
			// type: Number,
			default: 0
		},

		// 小时的索引
		hoursIndex: {
			// type: Number,
			default: 0
		}
	},
	data() {
		return {
			newHours: 0, // 当前的小时数
			newMinutes: 0 // 当前的分钟数
		};
	},
	mounted() {
		this.getNewHoursFn();
	},
	updated() {
		let that = this;
		that.emitIsTomorrowStrFn && that.emitIsTomorrowStrFn();
	},

	watch: {
		daysIndex() {
			let that = this;
			that.emitIsTomorrowStrFn && that.emitIsTomorrowStrFn();
		},
		hoursIndex() {
			let that = this;
			that.emitIsTomorrowStrFn && that.emitIsTomorrowStrFn();
		}
	},
	methods: {
		emitIsTomorrowStrFn() {
			let that = this;
			let str = assertObject(that.calcPickerHoursArr[that.hoursIndex]).textStr;
			let pickerSelectHour = assertString(str).replace('~', '-');
			that.$emit('isTomorrowStrFn', {
				isTomorrowStr: that.calcPickerDaysArr[that.daysIndex].textStr == tomorrowStr,
				pickerSelectHour
			});
		},
		// 获取当前的小时数
		getNewHoursFn() {
			let that = this;
			let date = new Date();
			that.newHours = date.getHours();
			that.newMinutes = date.getMinutes();
		},
		// picker组件点击 报错修改前的索引
		pickerClickFn() {
			let that = this;
			that.$emit('pickerViewClickFn');
		},
		// picker组件点击 取消把索引修改成修改前的
		pickerCancelFn() {
			let that = this;
			that.$emit('pickerViewCancelFn');
		},
		// 选择时间 组件  (暂时不用 展示送达时间)
		changeFn(e) {
			let that = this;
			that.$emit('pickerViewChangeFn', {
				daysIndex: e.detail.value[0],
				hoursIndex: e.detail.value[1]
			});
		},
		columnchangeFn(e) {
			let that = this;
			let { column, value } = e.detail;
			console.log('columnchangeFn 事件对象', column, value, e);
			let keyStr;
			if (column == 0) {
				keyStr = 'daysIndex';
			} else if (column == 1) {
				keyStr = 'hoursIndex';
			}

			// that[keyStr] = value;
			that.$emit('pickerViewColumnchangeFn', {
				keyStr: keyStr,
				value: value
			});

			// console.log('当前选择的值', that.pickerArr[column][value]);
		}
	},

	computed: {
		pickerArr() {
			let that = this;
			return [that.calcPickerDaysArr, that.calcPickerHoursArr];
		},

		// 是否显示 选择日期组件
		isShowSelectTimeComponent() {
			let that = this;
			if (that.calcPostType == 2) {
				return false;
			}
			if (that.isOpenyvyueFun) {
				if (that.yvyueDays == 0) {
					return false;
				} else {
					return true;
				}
			} else {
				return false;
			}
		},
		// 现在的时间是否大于最后的配送时间
		newTimeIsgtQiLastTime() {
			let that = this;
			let lastOffHour = that.hoursArr[that.hoursArr.length - 1].offHoursBefore;
			let lastOffMinutes = (() => {
				let s1 = that.hoursArr[that.hoursArr.length - 1].textStr || '';
				let s2 = s1.split('~')[1] || '';
				return s2.split(':')[1];
			})();

			if (that.newHours >= lastOffHour) {
				if (that.newHours == lastOffHour) {
					if (that.newMinutes >= transNumFn(lastOffMinutes)) {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			} else {
				return false;
			}
		},
		// ========================================= 预约配送相关
		// 返回 天 数组
		/*
			返回 天数组
				今天
				明天
		*/
		calcPickerDaysArr() {
			let that = this;
			// 现在的时间过了最晚配送 此时只能明天早上配送 返回 明天
			if (that.newTimeIsgtQiLastTime) {
				return [
					{
						textStr: tomorrowStr
					}
				];
				// 现在的时间没过了最晚配送 根据后台设置的返回 对应的数据
			} else {
				if (that.yvyueDays == 0) {
					return [
						{
							textStr: toDayStr
						}
					];
				} else if (that.yvyueDays == 1) {
					return [
						{
							textStr: toDayStr
						}
					];
				} else if (that.yvyueDays == 2) {
					return [
						{
							textStr: toDayStr
						},
						{
							textStr: tomorrowStr
						}
					];
				}
			}
		},

		/*
			返回 小时数组
		*/
		calcPickerHoursArr() {
			let that = this;

			// 立即送出
			if (that.yvyueDays == 0) {
				// 现在的时间超过最晚配送时间
				if (that.newTimeIsgtQiLastTime) {
					return that.hoursArr;
				} else {
					// 现在的时间 在配送 时间 内

					// 返回当前时间 往后的时间数据

					return that.newToDayHourArr;
				}

				// 可预约今天
			} else if (that.yvyueDays == 1) {
				// 现在的时间超过最晚配送时间
				if (that.newTimeIsgtQiLastTime) {
					return that.hoursArr;

					// 现在的时间 在配送 时间 内
				} else {
					// 返回当前时间 往后的时间数据
					return that.newToDayHourArr;
				}

				// 可预约今天 明天
			} else if (that.yvyueDays == 2) {
				if (that.calcPickerDaysArr[that.daysIndex].textStr == tomorrowStr) {
					return that.hoursArr;
				} else {
					// 现在的时间超过最晚配送时间
					if (that.newTimeIsgtQiLastTime) {
						return that.hoursArr;
					} else {
						// 现在的时间 在配送 时间 内

						return that.newToDayHourArr;
					}
				}
			}
			return that.hoursArr;
		},
		// 返回 天 数组
		/*
			返回 天数组
				今天
				明天
		*/
		calcPickerDaysArr() {
			let that = this;
			// 现在的时间过了最晚配送 此时只能明天早上配送 返回 明天
			if (that.newTimeIsgtQiLastTime) {
				return [
					{
						textStr: tomorrowStr
					}
				];
				// 现在的时间没过了最晚配送 根据后台设置的返回 对应的数据
			} else {
				if (that.yvyueDays == 0) {
					return [
						{
							textStr: toDayStr
						}
					];
				} else if (that.yvyueDays == 1) {
					return [
						{
							textStr: toDayStr
						}
					];
				} else if (that.yvyueDays == 2) {
					return [
						{
							textStr: toDayStr
						},
						{
							textStr: tomorrowStr
						}
					];
				}
			}
		},
		// 返回 时间 前 文字描述
		/*
		立即送出今天10:10~12:22
		预计明天10:10~12:22送达

		立即自提10:10~12:22
		预计明天10:10~12:22自提
		*/
		calcSendTextBefore() {
			/*
			<!-- {{ hoursIndex == 0 && daysIndex == 0 ? (calcPostType == 1 ? '立即自提' : '立即送出') : '预计' }} -->
			<view>{{ pickerArr[0][daysIndex].textStr }}</view>
			<view>{{ pickerArr[1][hoursIndex].textStr }}</view>
			{{  }}
			<!-- {{ hoursIndex == 0 && daysIndex == 0 ? '' : calcPostType == 1 ? '自提' : '送达' }} -->
			*/
			let that = this;

			if (that.pickerArr[0][that.daysIndex].textStr == tomorrowStr) {
				return '预计';
			} else {
				if (that.hoursIndex == 0 && that.daysIndex == 0) {
					if (that.calcPostType == 1) {
						return '立即自提';
					} else {
						return '立即送出';
					}
				} else {
					return '预计';
				}
			}
		},
		// 返回 时间 后 文字描述
		calcSendTextAfter() {
			let that = this;
			if (that.pickerArr[0][that.daysIndex].textStr == tomorrowStr) {
				if (that.calcPostType == 1) {
					return '自提';
				} else {
					return '送达';
				}
				// 今天
			} else {
				// 第一个
				if (that.hoursIndex == 0 && that.daysIndex == 0) {
					if (that.calcPostType == 1) {
						return '';
					} else {
						return '';
					}
				} else {
					if (that.calcPostType == 1) {
						return '自提';
					} else {
						return '送达';
					}
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.title {
	padding: 0 20rpx;
	border-radius: 20rpx 20rpx 0 0;
	background: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 88rpx;
	overflow: hidden;
	.h3 {
		font-size: 30rpx;
		font-weight: 600;
		color: $grey1-color;
	}

	.get-time {
		font-size: 22rpx;
		color: $grey2-color;
		view {
			display: inline-block;
		}
	}
	.change-getTime {
		font-size: 22rpx;
	}
}
</style>
