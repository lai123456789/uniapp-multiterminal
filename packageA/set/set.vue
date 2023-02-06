<template>
	<view class="page">
		<view class="line-group">
			<view class="line-item" @click="toDetailFn('hysy')">
				<view class="left-title-text">欢迎使用</view>
				<view class="right-content">
					<view class="content-block"></view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</view>

			<view class="line-item" @click="toDetailFn('ptzz')">
				<view class="left-title-text">平台资质</view>
				<view class="right-content">
					<view class="content-block"></view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</view>

			<view class="line-item" @click="toDetailFn('fwxy')">
				<view class="left-title-text">服务协议</view>
				<view class="right-content">
					<view class="content-block"></view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</view>

			<view class="line-item" @click="toDetailFn('yszc')">
				<view class="left-title-text">隐私政策</view>
				<view class="right-content">
					<view class="content-block"></view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</view>

			<view class="line-item" @click="navigateToFn({ url: '/packageA/about/yijian' })">
				<view class="left-title-text">意见与反馈</view>
				<view class="right-content">
					<view class="content-block"></view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</view>

			<view class="line-item" @click="navigateToFn({ url: '/packageA/about/index' })">
				<view class="left-title-text">关于我们</view>
				<view class="right-content">
					<view class="content-block"></view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view class="line-item" @click="loadSellerAppFn">
				<view class="left-title-text">当前版本</view>
				<view class="right-content">
					<view class="content-block">V{{ AppVersion }} {{ calcVersion }}</view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</view>
			<!-- #endif -->
		</view>

		<view :class="['commit-block']">
			<view
				:class="[
					'commit-btn',
					'flex-center',
					isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg'
				]"
				:style="{ background: configInfo.web_site_color }"
				@click="logOutRunFn"
			>
				退出登录
			</view>
		</view>

		<view v-if="isShowProgress" class="progress-wrap">
			<progress class="progress-dom" :percent="percent" show-info></progress>
		</view>
	</view>
</template>

<script>
import { goodsDetailWidthFn, getVersionFn } from '@/tools/tools';
export default {
	data() {
		return {
			AppVersion: '',
			downloadTask: null, // 页面关闭时 取消下载
			isShowProgress: false, // 是否显示 isShowProgress 遮罩层
			percent: 0 // progress 组件进度条
		};
	},
	onLoad() {
		// #ifdef APP-PLUS
		this.AppVersion = plus.runtime.version;
		// this.AppVersion = 1.8;
		// #endif
	},
	onUnload() {
		let that = this;
		console.log('onUnload run', '\n');
		that.percent = 0;
		that.isShowProgress = false;
		if (that.downloadTask && that.downloadTask.abort) {
			that.downloadTask.abort();
		}
	},
	methods: {
		logOutRunFn() {
			let that = this;
			that.logOutFn();
			that.navigateToFn({
				isTab: true,
				url: '/pages/index/index'
			});
		},
		// 跳转到详情
		toDetailFn(type) {
			let that = this;
			let mapping = {
				ptzz: {
					title: '平台资质',
					content: goodsDetailWidthFn(that.configInfo.certification)
				},
				fwxy: {
					title: '服务协议',
					content: that.configInfo.agreement
				},
				yszc: {
					title: '隐私政策',
					content: that.configInfo.policy
				},
				hysy: {
					title: '欢迎使用',
					content: that.configInfo.warn_content
				}
			};
			uni.setStorageSync('helpQuestionItem', mapping[type]);
			that.navigateToFn({
				url: '/packageA/kefu/help-detail'
			});
		},
		loadApkFn(url) {
			let that = this;
			that.isShowProgress = true;
			that.percent = 0;
			console.log('loadSellerAppFn 执行');
			const downloadTask = uni.downloadFile({
				url,
				success(res) {
					console.log('uni.downloadFile success 结果', res);
					if (res.statusCode === 200) {
						console.log('下载成功');
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success(red) {
								// that.luj = red.savedFilePath
								console.log('uni.saveFile success 结果', red);
								that.percent = 0;
								that.hideAllFn();
								uni.showToast({
									icon: 'success'
								});
								uni.openDocument({
									filePath: red.savedFilePath,
									success: function(res) {
										console.log('打开文档成功', res);
									}
								});
							}
						});
					}
				}
			});
			downloadTask.onProgressUpdate(res => {
				that.percent = res.progress;
				console.log('进度 that.percent', res.progress);
				if (res.progress >= 100) {
					that.isShowProgress = false;
				}
				/* 
				console.log('下载进度' + res.progress);
				console.log('已经下载的数据长度' + res.totalBytesWritten);
				console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				 */
			});
			that.downloadTask = downloadTask;
		},
		// 下载商城app
		loadSellerAppFn() {
			let that = this;
			if (that.calcVersion == '') {
				uni.showToast({
					icon: 'success',
					title: '无更新'
				});
				return false;
			}
			that.loadApkFn(that.configInfo.app_download_url);
		}
	},
	computed: {
		// 更新版本信息
		calcVersion() {
			let that = this;
			let currentVersion = getVersionFn(that.AppVersion);
			let newVersion = getVersionFn(that.configInfo.versionNum);
			if (newVersion > currentVersion) {
				return `(可更新到 ${that.configInfo.versionNum})`;
			}
			return '';
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	background: $bg-grey-color;
	min-height: 100vh;

	.line-group {
		background: #ffffff;
		.line-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 30rpx;
			padding: 14rpx 0;
			border-top: 1px solid #eaeaea;
			&:first-child {
				border-top: none;
			}
			.left-title-text {
				display: inline-flex;
				align-items: center;
				min-height: 76rpx;
				font-size: 26rpx;
				color: #414959;
			}
			.right-content {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.content-block {
					flex: 1;
					display: flex;
					justify-content: flex-end;
					margin-right: 0.5em;
					font-size: 26rpx;
					color: #7f7f7f;

					.img-block {
						width: 120rpx;
						height: 120rpx;
						border-radius: 10px;
						overflow: hidden;
						image {
							height: 100%;
							width: 100%;
						}
					}
				}
				.more-icon {
					display: inline-flex;
					align-items: center;
					height: 100%;
				}
			}
			.red-price {
				color: $red-color;
			}
		}
	}
	.commit-block {
		padding: 10vh 23rpx;
		.commit-btn {
			height: 84rpx;
			border-radius: 5px;
			font-size: 30rpx;
			color: #ffffff;
		}
	}
}

.progress-wrap {
	position: absolute;
	z-index: 10;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	color: #ffffff;
	.progress-dom {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
		width: 50%;
	}
}
</style>
