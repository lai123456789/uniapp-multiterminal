<!--
	app 平台下版本升级的 首页弹框
-->
<template>
	<view class="flex-center app-update-version-wrap"  @touchmove.stop="catchTouchMove">
		<view class="app-update-version-box" v-if="!isShowProgress">
			<view class="flex-center title-text">版本升级</view>
			<view class="tips-text">
				{{ configInfo.shoname }} {{ configInfo.versionNum }}版本来了, 点击立即更新马上体验!
			</view>
			<view class="flex-center btn-group">
				<view
					class="flex-center confirm-btn"
					:style="{ backgroundColor: configInfo.web_site_color }"
					@click="loadApkFn(configInfo.app_download_url)"
				>
					立即更新
				</view>
			</view>
		</view>
		<view class="appLoad-progress-box" v-else>
			<view class="flex-center title-text">升级</view>

			<view class="flex-center bottom-progress-block">
				<view class="progress-title" style="line-height: 2.4">下载中,请稍后</view>
				<view class="progress-block">
					<progress :percent="percent" :activeColor="configInfo.web_site_color"></progress>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			percent: 0, // 下载进度
			isShowProgress: false, // 是否显示进度条
			downloadTask: null // 页面关闭时 取消下载
		};
	},
	methods: {
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
		}
	}
};
</script>

<style scoped lang="scss">
.app-update-version-wrap {
	position: fixed;
	z-index: 300;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	.title-text {
		height: 120rpx;
		font-size: 40rpx;
		color: #000000;
	}
	.app-update-version-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		width: 496rpx;
		height: 416rpx;
		background: #ffffff;
		border-radius: 30rpx;
		overflow: hidden;

		.tips-text {
			width: 70%;
			text-align: center;
			line-height: 1.8;
			font-size: 28rpx;
			color: #3f3f3f;
		}
		.btn-group {
			width: 100%;
			height: 102rpx;
			.confirm-btn {
				width: 190rpx;
				height: 75rpx;
				color: #ffffff;
				font-size: 30rpx;
				border-radius: 20rpx;
			}
		}
	}
	.appLoad-progress-box {
		width: 496rpx;
		height: 250rpx;
		background: #ffffff;
		border-radius: 30rpx;
		overflow: hidden;
		.bottom-progress-block {
			flex-direction: column;
			align-items: flex-start;
			margin-top: -20rpx;
			padding: 0 24rpx;
			height: 130rpx;
			font-size: 30rpx;
			.progress-block {
				width: 100%;
				height: 20rpx;
			}
		}
	}
}
</style>
