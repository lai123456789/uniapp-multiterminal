<!--
	秒杀菜场模块
-->
<template>
	<view class="card" v-if="miaoshaGoodsList.length || caiChangGoodsList.length">
		<view class="content-wrap">
			<view
				v-if="miaoshaGoodsList.length"
				class="card-block"
				:style="{ backgroundImage: `linear-gradient(180deg,${miaoshaOptions.miaoshaHomeBgColor},#ffffff 25%)` }"
				@click="navigateToFn({ url: `/packageA/today-seckill/today-seckill` })"
			>
				<view class="title">今日秒杀</view>
				<view class="time" style="color: #ff6027">{{ timeStr }}</view>
				<view class="shop-block">
					<view v-for="(item, index) in miaoshaGoodsList" :key="index">
						<image :src="item.image"></image>
						<view class="price-block">
							<view class="shop-price-block-lr" v-if="item.is_vip_price == 1">
								<view class="origin-price">
									¥
									<text>{{ item.vip_market_price ? item.vip_market_price : '' }}</text>
								</view>
								<view class="line-price">¥{{ item.shop_price ? item.shop_price : '' }}</view>
							</view>
							<view class="shop-price-block-lr" v-else>
								<view class="origin-price">
									¥
									<text>{{ item.shop_price ? item.shop_price : '' }}</text>
								</view>
								<view class="line-price">
									¥{{ item.vip_market_price ? item.vip_market_price : '' }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view
				v-if="caiChangGoodsList.length"
				class="card-block"
				:style="{
					backgroundImage: `linear-gradient(180deg,${caiChangOptions.caichangHomeBgColor},#ffffff 25%)`
				}"
				@click="navigateToFn({ url: `/packageA/caichang/index` })"
			>
				<view class="title">{{ caiChangOptions.caichangTitleText }}</view>
				<view class="time" style="color: #6ccc4e">{{ caiChangOptions.caichangSubTitleText }}</view>
				<view class="shop-block">
					<view v-for="(item, index) in caiChangGoodsList" :key="index">
						<image :src="item.image"></image>
						<view class="price-block">
							<view class="shop-price-block-lr" v-if="item.is_vip_price == 1">
								<view class="origin-price">
									¥
									<text>{{ item.vip_market_price ? item.vip_market_price : '' }}</text>
								</view>
								<view class="line-price">¥{{ item.shop_price ? item.shop_price : '' }}</view>
							</view>
							<view class="shop-price-block-lr" v-else>
								<view class="origin-price">
									¥
									<text>{{ item.shop_price ? item.shop_price : '' }}</text>
								</view>
								<view class="line-price">
									¥{{ item.vip_market_price ? item.vip_market_price : '' }}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';

import { assertObject, assertString, num2zeroStr } from '@/tools/tools.js';
import { getMiaoshaTimeOption } from '@/pages/index/index-components/miaosha-tool.js';

let timeOutTimer, interValtimer;

export default {
	props: {
		// 秒杀模块的 商品列表数据
		miaoshaGoodsList: {
			type: Array,
			default: []
		},
		// 菜场模块 的商品列表
		caiChangGoodsList: {
			type: Array,
			default: []
		},
		// 首页是否shou
		homeIsShow: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			timeStr: ''
		};
	},
	methods: {
		// 给页面赋值时间
		setPageTimeFn() {
			let that = this;
			let miaoshaStartTime = assertString(assertObject(that.miaoshaOptions).miaoshaStartTime);
			let miaoshaEndTime = assertString(assertObject(that.miaoshaOptions).miaoshaEndTime);
			let { tipTitle, hour, minute, second } = getMiaoshaTimeOption(miaoshaStartTime, miaoshaEndTime);
			that.timeStr = `${tipTitle}${hour}:${minute}:${second}`;
		},
		// 循环赋值
		loopIntervalFn() {
			let that = this;
			clearInterval(interValtimer);
			interValtimer = setInterval(() => {
				that.setPageTimeFn();
			}, 1000);
		}
	},
	mounted() {
		this.loopIntervalFn();
	},
	watch: {
		homeIsShow(newVal, oldVal) {
			let that = this;
			console.log('watch homeIsShow ', newVal, oldVal);

			if (newVal) {
				clearTimeout(timeOutTimer);
				timeOutTimer = setTimeout(() => {
					that.loopIntervalFn();
				}, 300);
			} else {
				clearTimeout(timeOutTimer);
				clearInterval(interValtimer);
			}
		},
		miaoshaOptions() {
			let that = this;
			clearTimeout(timeOutTimer);
			timeOutTimer = setTimeout(() => {
				that.loopIntervalFn();
			}, 300);
		}
	},
	computed: {
		// 返回秒杀的倒计时
		miaoshaTime() {},
		...mapState({
			miaoshaOptions: store => store.home.miaoshaOptions, //  秒杀模块的 样式配置
			caiChangOptions: store => store.home.caiChangOptions // 菜场模块 信息 和 样式配置
		})
	}
};
</script>

<style scoped lang="scss">
.card {
	padding: 10rpx 0;
	background-color: $bg-grey-color;

	.content-wrap {
		display: flex;
		justify-content: space-between;

		.card-block {
			width: 342rpx;
			height: 310rpx;
			overflow: hidden;
			border-radius: 20rpx;
			background-image: linear-gradient(180deg, #fff6e6, #ffffff 25%);
			background-color: #ffffff;
		}

		.shop-block {
			display: flex;
			justify-content: space-between;
			& > view {
				width: 50%;
			}
			image {
				margin-left: 12rpx;
				display: block;
				width: 150rpx;
				height: 150rpx;
				transform: scale(0.9);
			}
		}

		.title {
			margin-top: 10rpx;
			line-height: 63rpx;
			padding-left: 22rpx;
			font-size: 36rpx;
			font-weight: 600;
			color: #374050;
		}

		.time {
			padding-left: 22rpx;
			font-size: 26rpx;
			color: #ff6027;
		}

		.price-block {
			overflow: hidden;
			padding-left: 12rpx;

			.shop-price-block-lr {
				white-space: nowrap;
				display: inline-block;
				.origin-price {
					white-space: nowrap;
					display: inline-block;
					color: $red-color;
					font-size: 18rpx;
					font-weight: 900;
					text {
						color: $red-color;
						font-size: 28rpx;
					}
				}
				.line-price {
					text-indent: 0.1em;
					white-space: nowrap;
					display: inline-block;
					font-size: 24rpx;
					color: $grey2-color;
					text-decoration: line-through;
				}
			}
		}
	}
}
</style>
