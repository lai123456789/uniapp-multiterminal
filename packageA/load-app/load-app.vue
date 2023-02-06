<template>
	<view class="root-page">
		<view class="bg-img-wrap"><image class="bg-img-dom" :src="appLoadPageBg"></image></view>
		<view class="btn-group">
			<view
				class="btn-block"
				@click="loadSellerAppFn"
				:style="{ background: configInfo.down_btn_color }"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
			>
				<image :src="calcImageSrc('/global-image/icon-android-app-load.png')"></image>
				<view class="text">android下载</view>
			</view>

			<view
				class="btn-block"
				@click="loadRunAppFn"
				:style="{ background: configInfo.down_btn_color }"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
			>
				<image :src="calcImageSrc('/global-image/icon-android-app-load.png')"></image>
				<view class="text">配送骑手端下载</view>
			</view>
		</view>
		<view v-if="isShowProgress" class="progress-wrap">
			<progress class="progress-dom" :percent="percent" show-info activeColor="#09bb07"></progress>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			downloadTask: null, // 页面关闭时 取消下载
			isShowProgress: false, // 是否显示 isShowProgress 遮罩层
			percent: 0 // progress 组件进度条
		};
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
		// 下载商城app
		loadSellerAppFn() {
			this.loadApkFn(this.sellerAppSrc);
		},
		loadRunAppFn() {
			this.loadApkFn(this.runAppSrc);
		},
		loadApkFn(url) {
			let that = this;
			// #ifdef H5
			let taga = document.createElement('a');
			taga.href = url;
			document.body.append(taga);
			taga.click();
			taga.remove();
			// #endif

			// #ifdef MP-WEIXIN || APP-PLUS || MP-TOUTIAO
			that.isShowProgress = true;
			that.percent = 0;
			console.log('loadSellerAppFn 执行');
			const downloadTask = uni.downloadFile({
				url,
				success(res) {
					console.log('uni.downloadFile success 结果', res);
					if (res.statusCode === 200) {
						uni.openDocument({
							filePath: res.tempFilePath,
							success(res) {
								console.log('打开文档成功');
							}
						});
					}
				}
			});
			downloadTask.onProgressUpdate(res => {
				that.percent = that.getProgress(res);
				console.log('that.getProgress(res)',that.getProgress(res));
				if (that.percent >= 100) {
					that.isShowProgress = false;
				}
				/*
				console.log('监听下载数据的事件源对象' + JSON.stringify(res));
				console.log('下载进度' + res.progress);
				console.log('已经下载的数据长度' + res.totalBytesWritten);
				console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
				*/
			});
			that.downloadTask = downloadTask;
			// #endif
		},
		// 返回百分比
		getProgress(res) {
			// #ifdef MP-WEIXIN || APP-PLUS
			return res.progress;
			// #endif
			// #ifdef MP-TOUTIAO
			return Math.floor((res.totalBytesWritten / res.totalBytesExpectedToWrite) * 100);
			// #endif
		}
	},
	computed: {
		// 下载地址
		sellerAppSrc() {
			return this.configInfo.app_download_url;
		},
		runAppSrc() {
			return this.configInfo.rider_download_url;
		},
		// 返回下载app页面的背景图片链接
		appLoadPageBg() {
			return this.addimgPathHostFn(this.configInfo.down_img);
		}
	}
};
</script>

<style lang="scss" scoped>
.root-page {
	position: relative;
	height: 1334rpx;
	.bg-img-wrap {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100%;
		.bg-img-dom {
			width: 100%;
			height: 100%;
		}
	}
	.btn-group {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
		z-index: 5;
		top: 980rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 378rpx;
		height: 244rpx;
		.btn-block {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 70rpx;
			background: #0085d0;
			border-radius: 14rpx;
			image {
				margin: 0 20rpx;
				width: 44rpx;
				height: 52rpx;
			}
			.text {
				color: #ffffff;
				font-size: 30rpx;
			}
		}
	}
	.progress-wrap {
		position: absolute;
		z-index: 10;
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
}
</style>
