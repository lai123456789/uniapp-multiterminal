<template>
	<view class="page">
		<view class="line-block" v-for="(item, index) in list" :key="index" @click="setActIndex(index)">
			<view class="line">
				<text>{{ item.name }}</text>
				<view>
					<uni-icons
						v-if="actIndex == index"
						size="25"
						type="circle-filled"
						:color="configInfo.web_site_color"
					></uni-icons>
					<uni-icons v-else size="25" type="circle" color="#c7c7c7"></uni-icons>
				</view>
			</view>
		</view>

		<view class="line-block" v-if="!mobile">
			<view class="line">
				<text>联系人</text>
				<input style="width: 80%;" class="input" type="text" v-model="tel" placeholder="手机号" />
			</view>
		</view>

		<view class="line-block">
			<view class="line" style="border-bottom: none;"><text>意见/建议</text></view>
		</view>

		<view class="content-wrap">
			<textarea class="textarea" placeholder="请写下您的意见或建议" v-model="content"></textarea>
		</view>

		<view class="file-list-block">
			<view class="content-wrap">
				<view
					class="item border-radius20 show-image"
					v-for="(item, index) in uploadImgList"
					:key="index"
					@click="lookImgListFn(index)"
				>
					<image :src="item" class="image" mode=""></image>
					<uni-icons
						@click.native.stop="delImgFn(index)"
						style="position: absolute; z-index: 10; top: 20rpx; right: 20rpx;"
						size="20"
						type="close"
						color="#ffffff"
					></uni-icons>
				</view>
				<view class="item border-radius20 upload-btn" @click="chooseImageFn"></view>
			</view>
		</view>

		<view style="height: 100rpx;"></view>
		<view class="bottom-btn-block" @click="commitFn">
			<button
				:style="{ background: configInfo.web_site_color }"
				:class="['pay-btn', isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
			>
				提交
			</button>
		</view>
		<login-fn
			:is-show-login="loginBoxFlag"
			@loginSuccessCallback="getFeedbackTypeFn"
			@close="closeGlobalLoginFn"
			to-back
		></login-fn>
	</view>
</template>

<script>
import { host } from '@/tools/siteinfo.js';

export default {
	data() {
		return {
			actIndex: 0,
			list: [],
			content: '',
			uploadImgList: [],
			imgMaxLength: 4,
			tel: '',
			loginBoxFlag: false // 登录框显示隐藏状态
		};
	},

	onShow() {
		let that = this;
		// 监听登录框
		uni.$off('setLoginBoxFlag');
		uni.$on('setLoginBoxFlag', loginBoxFlag => {
			that.loginBoxFlag = loginBoxFlag;
		});
		that.getFeedbackTypeFn();
	},
	computed: {
		mobile() {
			return this.$store.state.userInfo.mobile ? this.$store.state.userInfo.mobile : false;
		}
	},
	methods: {
		async commitFn() {
			let that = this;

			if (!that.mobile) {
				if (!that.tel) {
					uni.showToast({
						icon: 'none',
						title: '请填写联系方式'
					});
					return;
				}
			}

			if (that.content.length < 1) {
				uni.showToast({
					icon: 'none',
					title: '请填写意见或建议'
				});
				return;
			}

			let result = await that.$request({
				method: 'post',
				url: '/api/User/FeedbackInfo',
				data: {
					type_id: that.list[that.actIndex].id,
					content: that.content,
					images: that.uploadImgList.join(','),
					user_mobile: that.mobile ? that.mobile : that.tel
				}
			});
			console.log(result, '提交建议返回的结果', '\n');

			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
					that.content = '';
					that.uploadImgList = [];
					that.actIndex = 0;
				} else {
					uni.showModal({
						showCancel: false,
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
		async getFeedbackTypeFn() {
			let that = this;
			let result = await that.$request({
				loading: 1,
				method: 'post',
				url: '/api/User/FeedbackType'
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					that.list = result.data.data.list;
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

			console.log(result, '关于我们也没返回 数据', '\n');
		},
		setActIndex(index) {
			this.actIndex = index;
		},
		uploadFileFn(tempFilePath) {
			return new Promise((res, rej) => {
				uni.uploadFile({
					url: `${host}/api/Upload/upload`,
					filePath: tempFilePath,
					name: 'file',
					success(e) {
						let result = JSON.parse(e.data);
						if (result.code == 200) {
							res(result.data.path.replace(/\\/g, '/'));
						} else {
							uni.showToast({
								icon: 'none',
								title: result.msg
							});
						}
					}
				});
			});
		},
		uploadFilesFn(imgArr) {
			let that = this;
			return new Promise((res, rej) => {
				uni.hideLoading();
				uni.showLoading();
				Promise.all(imgArr.map(item => that.uploadFileFn(item))).then(arr => {
					res(arr);
					uni.hideLoading();
				});
			});
		},
		chooseImageFn() {
			let that = this;
			if (that.uploadImgList.length >= that.imgMaxLength) {
				uni.showToast({
					icon: 'none',
					title: `最多上传${that.imgMaxLength}张`
				});
				return;
			}
			uni.chooseImage({
				async success(chooseImageRes) {
					const tempFilePaths = chooseImageRes.tempFilePaths;

					console.log(tempFilePaths, '临时的图片路径', '\n');
					let temSrc = await that.uploadFilesFn(tempFilePaths);

					let arr;
					if (temSrc.length >= that.imgMaxLength) {
						arr = temSrc.splice(0, that.imgMaxLength);
					} else {
						arr = temSrc;
					}

					that.uploadImgList.push(...arr);
				}
			});
		},
		delImgFn(index) {
			this.uploadImgList.splice(index, 1);
		},
		lookImgListFn(current) {
			console.log('look', current);
			let urls = this.uploadImgList;
			uni.previewImage({
				current,
				urls
			});
		}
	}
};
</script>

<style lang="scss">
.page,
page {
	overflow: hidden;
	min-height: 100vh;
}

.line-block {
	padding: 0 24rpx;
	background: #ffffff;

	.line {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		border-bottom: 1px solid $bg-grey-color;

		text {
			font-size: 26rpx;
			color: #414959;
		}

		.red-price {
			color: $red-color;
		}
	}

	&.clear-block {
		margin-top: 20rpx;
		margin-bottom: 40rpx;
	}
}

.bottom-btn-block {
	@include flex-center;
	position: fixed;
	z-index: 500;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100rpx;
	background: #ffffff;

	.pay-btn {
		@include btn-green;
	}
}

.textarea {
	margin: 0.5em;
	padding: 0.5em;
	text-indent: 1em;
	font-size: 24rpx;
	background: #f7f7f7;
	height: 6em;
	width: 90%;
	color: #bdbdbd;
	z-index: 1;
}

.file-list-block {
	padding: 15rpx 0;
	font-size: 0;

	.item {
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		display: inline-block;
		position: relative;
		width: 220rpx;
		height: 220rpx;
		overflow: hidden;

		&:nth-child(3n) {
			margin-right: 0;
		}
	}

	.upload-btn {
		position: relative;
		border: 1px solid #f0f0f0;

		&::after,
		&::before {
			content: '';
			display: block;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			border-radius: 10000rpx;
			background: #d8d8d8;
		}

		&::after {
			width: 36rpx;
			height: 2px;
		}

		&::before {
			height: 36rpx;
			width: 2px;
		}
	}

	.show-image {
		.image {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
