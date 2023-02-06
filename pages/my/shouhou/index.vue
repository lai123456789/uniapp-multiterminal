<template>
	<view class="page">
		<view class="top-bar">
			<view
				:class="['item', act == 0 ? 'act' : '']"
				@click="selectFn(0)"
				:style="{ color: act == 0 ? configInfo.web_site_color : '#374050' }"
			>
				<view class="after" :style="{ background: configInfo.web_site_color }"></view>
				申请售后
			</view>
			<view
				:class="['item', act == 1 ? 'act' : '']"
				@click="selectFn(1)"
				:style="{ color: act == 1 ? configInfo.web_site_color : '#374050' }"
			>
				<view class="after" :style="{ background: configInfo.web_site_color }"></view>
				全部售后
			</view>
		</view>
		<swiper :duration="300" @change="swiperChangeFn" :current="act" :style="{ height: swiperItemWrapH + 'px' }">
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block v-if="pageask.list.length == 0" min-height="100vh" is-show-to-page-btn></null-block>
					<view v-else class="order-list-block">
						<view class="content-wrap">
							<view class="order-list">
								<card-shouhou
									:type="typeArr[act]"
									v-for="(item, index) in pageask.list"
									:order-info="item"
									:key="item.id"
									@refreshFn="refreshFn"
								/>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item-wrap">
					<null-block v-if="pageall.list.length == 0" min-height="100vh" is-show-to-page-btn></null-block>
					<view v-else class="order-list-block">
						<view class="content-wrap">
							<view class="order-list">
								<card-shouhou
									:type="typeArr[act]"
									v-for="(item, index) in pageall.list"
									:order-info="item"
									:key="item.id"
									@refreshFn="refreshFn"
								/>
							</view>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<loading-css :is-show="isShowLoading"></loading-css>

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @loginSuccessCallback="refreshFn" @close="closeGlobalLoginFn" to-back></login-fn>

	</view>
</template>

<script>
import cardShouhou from './card-shouhou';

// 工具库 相关
import { checkTypeFn } from '@/tools/tools';

export default {
	components: {
		cardShouhou
	},
	data() {
		return {
			pageHeight:0,
			typeArr: ['ask', 'all'],
			pageask: {
				page: 1,
				list: []
			},
			pageall: {
				page: 1,
				list: []
			},
			swiperItemWrapH: 0,
			isShowLoading: true,
			act: 0,
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
		that.loadFn();
	},
	onLoad(){
		let that = this;
		that.pageHeight = uni.getSystemInfoSync().windowHeight; // 屏幕高
	},

	methods: {
		// 刷新当前页面
		refreshFn(fn) {
			let that = this;
			let attr = `page${that.typeArr[that.act]}`;
			that[attr].page = 1;
			that.getOrderAfterSaleFn(() => {
				that[attr].list = [];
				fn && fn();
			});
		},
		loadFn() {
			this.refreshFn();
		},
		// 切换swiper分类执行
		swiperChangeFn(e) {
			let that = this;
			that.act = e.target.current;
			let attr = `page${that.typeArr[that.act]}`;
			if (that[attr].list.length <= 0) {
				that.getOrderAfterSaleFn(() => {
					that.isShowLoading = false;
				});
			} else {
				that.setSwiperItemWrapH();
			}
		},

		// 点击菜单 按钮 加载对应的数据列表
		selectFn(act) {
			this.act = act;
		},
		// 根据配置 请求对应数据
		async getOrderAfterSaleFn(fn) {
			let that = this;
			let type = that.typeArr[that.act],
				attr = `page${type}`,
				page = that[attr].page;

			let result = await that.$request({
				loading: true,
				url: '/api/order/after_sale',
				data: {
					page,
					type
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					fn && fn();

					if (checkTypeFn(result.data.data) != 'Array') {
						let temArr = [];
						for (let i in result.data.data) {
							temArr.push(result.data.data[i]);
						}
						result.data.data = temArr;
					}

					if (result.data.data.length < 1) {
						that[attr].page--;
						if (that[attr].page <= 1) {
							that[attr].page = 1;
						}
					}

					that[attr].list = that[attr].list.concat(result.data.data);
					that.setSwiperItemWrapH();
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
		// 计算当前SwiperItem高度
		setSwiperItemWrapH() {
			let that = this;
			let index = that.act;
			setTimeout(() => {
				uni.createSelectorQuery()
					.selectAll('.swiper-item-wrap')
					.boundingClientRect(rect => {
						that.swiperItemWrapH = Math.ceil(that.getH(rect[index].height, that.pageHeight));
						/*
						console.log(
							rect, '所有的rect 高', '\n',
							index, '传过来的index', '\n',
							rect[index].height, '获取的当前item高', '\n',
							that.pageHeight, '全局的win高', '\n',
							Math.ceil(that.getH(rect[index].height, that.pageHeight)), '计算完的高', '\n',
						);
						*/
					})
					.exec();
			});
		},
	},
	onPullDownRefresh() {
		let that = this;
		that.refreshFn(() => {
			uni.stopPullDownRefresh(); //停止下拉刷新动画
		});
	},
	onReachBottom() {
		let that = this;
		let attr = `page${that.typeArr[that.act]}`;
		that[attr].page++;
		that.getOrderAfterSaleFn();
	}
};
</script>

<style lang="scss" scoped>
.page,
page {
	background: $bg-grey-color;
	min-height: 100vh;
}

.top-bar {
	display: flex;
	justify-content: space-around;
	position: sticky;
	z-index: 10;
	top: 0;
	background: #ffffff;
	width: 100%;

	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 88rpx;
		font-size: 26rpx;
		font-weight: 600;
		color: $grey1-color;

		.after {
			display: none;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 40rpx;
			height: 2px;
		}

		&.act {

			.after {
				display: block;
			}
		}
	}
}

.order-list-block {
	.content-wrap {
		padding-bottom: 10rpx;
	}

	padding-top: 20rpx;
	min-height: 100vh;
}
</style>
