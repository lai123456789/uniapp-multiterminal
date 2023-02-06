<!-- 
	轮播平台售卖记录组件
 -->
<template>
	<view
		class="border-radius play-buy-history-wrap"
		:class="[isShow ? 'show' : '', { pageIndex: page == 'index', pageDetail: page == 'detail' }]"
		v-if="calcBuyHistoryList.length"
	>
		<view class="border-radius image-wrap"><image class="image-dom" :src="currentItem.headimgurl"></image></view>
		<view class="msg">{{ currentItem.msg }}</view>
	</view>
</template>

<script>
import { assertObject } from '@/tools/tools.js';

export default {
	/* 
		pageIsShow 引入当前组件的页面是否show
		page 引入当前组件的页面 index:首页; detail:商品详情
	*/
	props: ['pageIsShow', 'page'],
	data() {
		return {
			timer: null,
			pageShowTimer:null,
			cont: 1,
			isShow: false,
			currentItemIndex: 0
		};
	},
	methods: {
		// 开始轮播函数
		async startFn() {
			let that = this;
			that.cont = 1;
			clearInterval(that.timer);
			if (!that.calcBuyHistoryList.length) {
				return false;
			}
			that.timer = setInterval(() => {
				that.cont++;
				if (that.cont % 2 == 0) {
					that.currentItemIndex =
						that.currentItemIndex + 1 >= that.calcBuyHistoryList.length ? 0 : that.currentItemIndex + 1;
					that.isShow = true;
				} else {
					that.isShow = false;
				}
			}, 2500);
		}
	},
	mounted() {
		let that = this;
		uni.$on('homeLoadEndFn', () => {
			that.startFn();
		});
	},
	computed: {
		calcBuyHistoryList() {
			return this.$store.state.buyHistoryList;
		},
		currentItem() {
			return assertObject(this.calcBuyHistoryList[this.currentItemIndex]);
		}
	},
	watch: {
		pageIsShow(newVal, oldVal) {
			let that = this;
			console.log('play-buy-history watch  newVal,oldVal', newVal, oldVal,that.pageIsShow,that.page);
			if (newVal) {
				clearInterval(that.pageShowTimer);
				that.pageShowTimer = setTimeout(() => {
					that.startFn();
				}, 1000);
			} else {
				clearInterval(that.pageShowTimer);
				clearInterval(that.timer);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.play-buy-history-wrap {
	display: inline-flex;
	align-items: center;
	position: fixed;
	z-index: 750;
	left: 0;
	padding: 0 20rpx;
	height: 60rpx;
	border-radius: 100;
	background: rgba(0, 0, 0, 0.6);
	transform: translateX(-100%);
	transition: 0.6s ease-in-out;

	&.pageIndex {
		top: 360rpx;
	}
	&.pageDetail {
		top: 220rpx;
	}
	&.show {
		transform: translateX(0);
	}

	.image-wrap {
		width: 40rpx;
		height: 40rpx;
		overflow: hidden;
		.image-dom {
			width: 100%;
			height: 100%;
		}
	}
	.msg {
		display: inline-block;
		padding-left: 10rpx;
		color: #ffffff;
		font-size: 28rpx;
		max-width: 285rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
}
</style>
