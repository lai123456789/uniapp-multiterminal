<template>
	<view class="page-block page">
		<view class="qishou" v-if="calcIsShowQiCommit">
			<view class="content-wrap">
				<view class="qishou-block border-radius20">
					<view class="title-block">
						<view class="h3">您对骑手满意吗</view>
						<view class="h4"></view>
					</view>
					<view class="qishou-info">
						<view class="image-block"><image :src="qiHeadimg" mode=""></image></view>
						<view class="qishou-description">
							<view class="qishou-name">
								<text>{{ qiName }}</text>
								<view class="tag-box" :style="{ background: configInfo.web_site_color }">
									{{ qiType }}
								</view>
							</view>
							<!-- <view class="get-time">今天13:45左右送达</view> -->
							<view class="get-time">您的好评是骑手小哥服务质量的动力</view>
						</view>
					</view>
					<view class="pingjia">
						<view class="item" @click="setQiShouFlagFn(true)">
							<view class="image-block">
								<image v-if="qishouFlag" :src="calcImageSrc('/my/pingjia-hao-o.png')" mode=""></image>
								<image v-else :src="calcImageSrc('/my/pingjia-hao.png')" mode=""></image>
							</view>
							<text>满意</text>
						</view>
						<view class="item" @click="setQiShouFlagFn(false)">
							<view class="image-block">
								<image v-if="qishouFlag" :src="calcImageSrc('/my/pingjia-cha.png')" mode=""></image>
								<image v-else :src="calcImageSrc('/my/pingjia-cha-o.png')" mode=""></image>
							</view>
							<text>不满意</text>
						</view>
					</view>
					<view class="tag-list">
						<view
							v-for="(item, index) in qiCommitList"
							:class="['tag-box', item.isSelect ? 'act' : '']"
							:key="index"
							@click="changeTagFn(index)"
						>
							{{ item.title }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="shangpin">
			<view class="content-wrap">
				<view class="shangpin-block border-radius20">
					<view class="title-block">
						<view class="h3">您对商品满意吗</view>
						<view class="h4" @click="isShowName = !isShowName">
							匿名
							<uni-icons
								v-if="isShowName"
								:color="configInfo.web_site_color"
								type="circle-filled"
							></uni-icons>
							<uni-icons v-else color="#91939c" type="circle"></uni-icons>
						</view>
					</view>
					<view class="goods-list">
						<block v-for="(item, index) in goodsList" :key="item.goods_id">
							<view class="item">
								<view class="good-info-block">
									<view class="image-block"><image :src="item.original_img" mode=""></image></view>
									<view class="goods-description-block">
										<view class="goods-name">{{ item.goods_name }}</view>
										<view class="goods-description">{{ item.goods_remark }}</view>
									</view>
								</view>
								<view class="pingfen">
									<text>评分</text>
									<uni-rate
										max="5"
										:value="item.value"
										@change="changeRateFn(item, index, $event)"
									></uni-rate>
								</view>
								<view class="pingfen">
									<text>评价</text>
									<input v-model="item.pingjia" type="text" />
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>

		<view style="height: 100rpx;"></view>
		<view class="bottom-btn-block">
			<button
				class="pay-btn"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				@click="submitFn"
				:style="{ background: configInfo.web_site_color }"
			>
				提交
			</button>
		</view>

		<loading-css :is-show="isShowLoading"></loading-css>
	</view>
</template>

<script>
import { checkTypeFn } from '@/tools/tools.js';
export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画

			goodsList: [], // 商品数组
			qiCommitList: [], // 骑手评论标签列表

			qiHeadimg: '', // 骑手头像图片地址
			qiName: '', // 骑手名字
			qiType: '', // 配送类型文字

			ordId: null,
			postType: '', // 配送方式

			qishouFlag: true,
			isShowName: false,

			pingjia: ['非常差', '差', '一般', '满意', '超赞'],
			commentFlag: false //
		};
	},
	onLoad(options) {
		let that = this;
		that.ordId = options.id;
		that.postType = options.postType;

		console.log(that.ordId, 'that.ordId', '\n', that.postType, 'that.postType', '\n');

		that.getCommentDataFn();
	},
	onUnload() {
		let that = this;
		if (!that.commentFlag) {
			uni.setStorageSync('refreshBack', 1);
		}
	},
	computed: {
		/* 
			@description 根据订单类型 返回是否需要显示 给骑手评论的模块
			@return <Boolean>
				返回true 显示给骑手评论
				返回false 不显示给骑手评论的模块
				
				
				配送方式
				  达达3
				  闪送4
				  商家配送0
				  
			需要  ↑↑↑↓↓↓ 不需要
				  
				  快递2
				  自提1

		*/
		calcIsShowQiCommit() {
			let postType = this.postType;
			if (postType == 1 || postType == 2) {
				return false;
			}
			return true;
		}
	},
	methods: {
		// 设置骑手 是否满意的状态
		setQiShouFlagFn(bool) {
			this.qishouFlag = bool;
		},
		changeTagFn(index) {
			let that = this;
			that.qiCommitList[index].isSelect = !that.qiCommitList[index].isSelect;
		},
		// 获取当前订单信息
		async getCommentDataFn() {
			let that = this;
			let result = await that.$request({
				url: '/api/order/comment_data',
				data: {
					ord_id: that.ordId
				}
			});

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = checkTypeFn(result.data.data) == 'Object' ? result.data.data : {};

					let goodsList = checkTypeFn(resultObj.goods) == 'Array' ? resultObj.goods : [];
					goodsList.forEach(item => {
						item.value = 5;
						item.pingjia = that.pingjia[item.value - 1];
					});

					that.goodsList = goodsList;

					let riderObj = checkTypeFn(resultObj.rider) == 'Object' ? resultObj.rider : {};

					let qiCommitList = checkTypeFn(riderObj.label) == 'Array' ? riderObj.label : [];
					qiCommitList.forEach(item => (item.isSelect = true));
					that.qiCommitList = qiCommitList;

					let qiInfo = checkTypeFn(riderObj.riderInfo) == 'Object' ? riderObj.riderInfo : {};

					that.qiHeadimg = qiInfo.headimg;
					that.qiName = qiInfo.name;
					that.qiType = qiInfo.type;
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
		// 点击评分组件
		changeRateFn(item, index, e) {
			let that = this;
			that.goodsList[index].value = e.value;
			that.goodsList[index].pingjia = that.pingjia[that.goodsList[index].value - 1];
			console.log(item, index, e, that.goodsList);
		},
		// 提交评论
		async submitFn() {
			let that = this;
			// 处理骑手数据
			let qiObj = {};
			if (that.calcIsShowQiCommit) {
				// 处理 骑手标签 文字
				let qiCommitStr = '';
				that.qiCommitList.forEach(item => {
					if (item.isSelect) {
						qiCommitStr += `${item.title},`;
					}
				});
				qiCommitStr = qiCommitStr.substring(0, qiCommitStr.length - 1);
				qiObj.label = qiCommitStr;

				qiObj.result = that.qishouFlag ? 1 : 0;
			}

			// 处理商品评价的数据
			let comment = {
				ord_id: that.ordId,
				status: that.isShowName ? 1 : 0,
				goods: that.goodsList.map(item => {
					return {
						goods_id: item.goods_id,
						content: item.pingjia,
						star: item.value,
						spec_id: item.spec_id,
					};
				})
			};

			let objs = {
				...qiObj,
				post_type: that.postType,
				comment: JSON.stringify(comment)
			};

			let result = await that.$request({
				loading: true,
				method: 'post',
				url: '/api/order/order_comment',
				data: objs
			});

			// console.log(result, '提交返回结果', '\n');

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: result.data.msg
					});
					setTimeout(() => {
						that.commentFlag = true;
						that.toBackFn();
					}, 1000);
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
		}
	}
};
</script>

<style lang="scss" scoped>
.page,
page {
	background: $bg-grey-color;
	min-height: 100vh;
	padding-top: 20rpx;
}

.bottom-btn-block {
	@include flex-center;
	position: fixed;
	z-index: 300;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	background: #ffffff;

	.pay-btn {
		@include btn-green;
	}
}

.title-block {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 88rpx;

	.h3 {
		font-size: 34rpx;
		color: $grey1-color;
		font-weight: 600;
	}

	.h4 {
		font-size: 23rpx;
		color: $grey2-color;
	}
}

.page-block {
	.qishou-block {
		margin: 20rpx 0;
		padding: 0 20rpx 20rpx;
		background: #ffffff;

		.qishou-info {
			display: flex;
			justify-content: space-between;
			padding-top: 30rpx;
			height: 130rpx;

			.image-block {
				width: 80rpx;
				height: 80rpx;
				margin-right: 20rpx;

				border-radius: 10000rpx;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.qishou-description {
				flex: 1;
				display: flex;
				flex-direction: column;

				.qishou-name {
					font-size: 0;
					display: flex;

					text {
						font-size: 30rpx;
						color: $grey1-color;
						font-weight: 600;
					}

					.tag-box {
						@include flex-center;
						padding: 0 0.4em;
						margin-left: 1em;
						font-size: 20rpx;
						color: #ffffff;
						border-radius: 20rpx 0 20rpx 0;
					}
				}

				.get-time {
					font-size: 22rpx;
					line-height: 1.2;
					color: $grey2-color;
				}
			}
		}

		.pingjia {
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 175rpx;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;

				.image-block {
					width: 76rpx;
					height: 76rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				text {
					font-size: 23rpx;
					color: $grey1-color;
					line-height: 45rpx;
				}
			}
		}

		.tag-list {
			font-size: 0;

			.tag-box {
				margin: 10rpx;
				display: inline-block;
				font-size: 23rpx;
				border-radius: 10rpx;
				padding: 0.1em 0.3em;

				border: 1px solid transparent;
				color: $grey2-color;
				background: #f7f7f7;

				&.act {
					border: 1px solid #6ccc4e;
					color: #72cf54;
					background: #eaffe4;
				}
			}
		}
	}
}

.shangpin {
	padding-bottom: 20rpx;

	.shangpin-block {
		padding: 0 20rpx;
		background: #ffffff;
	}

	.goods-list {
		.item {
			display: flex;
			flex-direction: column;
			height: 320rpx;
			padding-bottom: 10rpx;

			.good-info-block {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;
				height: 200rpx;

				.image-block {
					width: 160rpx;
					height: 160rpx;
					margin-right: 20rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.goods-description-block {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;

					.goods-name {
						font-size: 28rpx;
						color: $grey1-color;
						line-height: 45rpx;
						font-weight: 600;
						max-width: 10em;
						@include text-ellipsis;
					}

					.goods-description {
						font-size: 23rpx;
						color: $grey2-color;
						max-width: 15em;
						@include text-ellipsis;
					}
				}
			}

			.pingfen {
				flex: 1;
				display: flex;
				align-items: center;

				text {
					margin-right: 20rpx;
					color: $grey1-color;
					font-size: 26rpx;
					color: $grey1-color;
				}

				input {
					width: 80%;
					border: 1px solid #f5f5f5;
					padding: 0 1em;
					border-radius: 10rpx;
					font-size: 24rpx;
					color: $grey2-color;
				}
			}
		}
	}
}
</style>
