<template>
	<view>
		<view
			class="works-time-block"
			:style="{ height: workTime ? '280rpx' : '200rpx', background: configInfo.web_site_color }"
		>
			<view class="content-wrap" v-if="workTime">
				<view class="h3">客服工作时间</view>
				<view class="h5">客服工作时间{{ workTime }}</view>
			</view>
		</view>
		<view class="icon-list-block">
			<view class="content-wrap">
				<view class="icon-list border-radius20">
					<view class="title">自助服务</view>
					<view class="list-box">
						<view class="item" @click="navigateToFn({ url: '/pages/my/shouhou/index', checkLogin: true })">
							<view class="icon-image">
								<image :src="calcImageSrc('/my/shouhou.png')" mode=""></image>
							</view>
							<text>售后/退款</text>
						</view>
						<!-- #ifdef MP-WEIXIN -->
						<button open-type="contact" class="item">
							<view class="icon-image"><image :src="calcImageSrc('/my/tousu.png')" mode=""></image></view>
							<text>我要投诉</text>
						</button>
						<!-- #endif -->
						<!-- #ifdef APP-PLUS || MP-TOUTIAO -->
						<button class="item" @click="appToMiniprogramFn()">
							<view class="icon-image"><image :src="calcImageSrc('/my/tousu.png')" mode=""></image></view>
							<text>我要投诉</text>
						</button>
						<!-- #endif -->

						<!-- #ifdef H5 -->
						<button class="item" @click="h5ToMiniprogramFn">
							<view class="icon-image"><image :src="calcImageSrc('/my/tousu.png')" mode=""></image></view>
							<text>我要投诉</text>
						</button>
						<!-- #endif -->
					</view>
				</view>
			</view>
		</view>

		<view class="question-block">
			<view class="content-wrap">
				<view class="title">猜你想问</view>
				<view class="question-list-block">
					<view
						class="line-block"
						v-for="(item, index) in list"
						:key="index"
						@click="toHelpDetailFn(item, index)"
					>
						<view class="show-block">
							<text>{{ index + 1 }}、{{ item.title }}</text>
							<uni-icons type="arrowright"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="btn-block">
			<view class="content-wrap">
				<!-- #ifdef MP-WEIXIN -->
				<button
					class="line-kefu"
					:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
					open-type="contact"
					:style="{ background: configInfo.web_site_color }"
				>
					在线客服
				</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS || MP-TOUTIAO -->
				<button
					class="line-kefu"
					:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
					:style="{ background: configInfo.web_site_color }"
					@click="appToMiniprogramFn()"
				>
					在线客服
				</button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<button
					class="line-kefu"
					:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
					:style="{ background: configInfo.web_site_color }"
					@click="h5ToMiniprogramFn"
				>
					在线客服
				</button>
				<!-- #endif -->
				<button
					class="tel-kefu"
					:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
					@click="telFn(telStr)"
				>
					客服热线{{ telStr }}
				</button>
			</view>
		</view>

		<loading-css :is-show="isShowLoading"></loading-css>

		<!-- 登录框组件 -->
		<login-fn :is-show-login="loginBoxFlag" @close="closeGlobalLoginFn"></login-fn>


	</view>
</template>

<script>
import { assertObject, assertArray } from '@/tools/tools.js';
export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画
			showIndex: 0, // 问题被展开的索引
			telStr: '', // 联系电话
			workTime: '', // 工作时间字符串
			list: [], // 常见问题列表
			loginBoxFlag:false, // 登录框显示隐藏状态

		};
	},
	onShow(){
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag=>{
			that.loginBoxFlag = loginBoxFlag;
		});
	},
	onLoad() {
		this.getHelpsFn();
	},
	methods: {
		// 进入当前问题的详情页面
		toHelpDetailFn(item, index) {
			let that = this;
			let { title, content } = item;
			uni.setStorageSync('helpQuestionItem', {
				title,
				content
			});
			that.navigateToFn({
				url: `/packageA/kefu/help-detail`
			});
		},
		// 获取帮助页面的数据
		async getHelpsFn() {
			let that = this;
			let result = await that.$request({
				method: 'post',
				url: '/api/User/Helps'
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					let setObj = assertObject(resultObj.set);

					that.telStr = setObj.service_hotline; // 练习电话
					that.workTime = setObj.working_hours; // 工作时间字符串

					that.list = assertArray(resultObj.list); // 问题列表
					that.showIndex = that.list.length;
				} else {
					uni.showToast({
						title: result.data.msg,
						icon: 'none'
					});
				}
			} else {
				uni.showToast({
					title: that.$errorMsg,
					icon: 'none'
				});
			}
			that.isShowLoading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
@mixin h1style {
	font-size: 36rpx;
	font-weight: 600;
	color: $grey1-color;
}

@mixin h2style {
	font-size: 26rpx;
	color: $grey2-color;
}

.works-time-block {
	height: 280rpx;

	.h3 {
		padding-top: 40rpx;
		@include h1style;
		color: #ffffff;
		line-height: 60rpx;
	}

	.h5 {
		font-size: 20rpx;
		color: #ffffff;
		line-height: 40rpx;
	}
}

.icon-list-block {
	.icon-list {
		position: relative;
		top: -118rpx;
		margin-bottom: -118rpx;
		height: 236rpx;
		background: #ffffff;
		box-shadow: 0 3rpx 10rpx #f6f6f8;

		.title {
			@include h1style;
			text-indent: 0.5em;
			line-height: 90rpx;
		}

		.list-box {
			display: flex;
			height: 110rpx;
			justify-content: space-around;
			align-items: center;

			image {
				width: 80rpx;
				height: 80rpx;
			}

			button.item {
				background: rgba(0, 0, 0, 0);
				line-height: inherit;
				padding: 0;
				margin: 0;
			}

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				text {
					color: $grey1-color;
					font-size: 30rpx;
				}
			}
		}
	}
}

.question-block {
	padding-top: 30rpx;

	.title {
		@include h1style;
	}

	.show-block {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f8f8f8;

		text {
			font-size: 30rpx;
			color: $grey1-color;
			line-height: 86rpx;
		}
	}

	.info {
		font-size: 28rpx;
		color: $grey2-color;
		line-height: 32rpx;
	}

	.deg90 {
		transform: rotate(90deg);
	}
}

.btn-block {
	margin-top: 66rpx;

	.line-kefu {
		@include btn-green;
	}

	.tel-kefu {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		@include btn-green;
		background: #dfdfdf;
	}
}
</style>
