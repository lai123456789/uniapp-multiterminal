<template>
	<view class="page">
		<open-setting
			:is-show="isShowOpenSetting"
			@cloneFn="cloneSettingFn"
			title="打开允许保存到相册设置"
		></open-setting>
		<view class="hide-canvas-dom">
			<canvas
				class="avatarCanvas"
				:style="{ width: avatarSize + 'px', height: avatarSize + 'px' }"
				canvas-id="avatarCanvas"
			/>
			<canvas
				class="sharImgCanvas"
				:style="{ width: canvasBgWidth + 'px', height: canvasBgHeight + 'px' }"
				canvas-id="sharImgCanvas"
			/>
		</view>
		<loading-css :is-show="isShowLoading" />
		<image
			v-if="shareImgPath"
			:src="shareImgPath"
			:style="{ display: 'block', width: canvasBgWidth + 'px', height: canvasBgHeight + 'px' }"
		></image>
		<!-- #ifdef MP-WEIXIN || APP-PLUS -->
		<view class="bottom-btn-block">
			<button
				class="pay-btn"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				@click="saveShearImgFn"
				:style="{ background: configInfo.web_site_color }"
			>
				保存图片
			</button>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
import {
    mapState
} from 'vuex'

import openSetting from '@/df-components/openSetting/openSetting';
import { url2temPath } from '@/tools/tools';
import { bindMobileTips } from '@/tools/const.js';

export default {
	components: { openSetting },
	data() {
		return {
			isShowOpenSetting: false,
			isShowLoading: true,
			// 头像信息
			avatarSrc: '', //头像地址
			avatarSize: 0, //头像尺寸

			// 二维码信息
			codeSize: 0, //二维码尺寸
			codeX: 0, //二维码x坐标
			codeY: 0, //二维码y坐标

			// 画布信息
			canvasBgWidth: 0, //画布宽
			canvasBgHeight: 0, //画布高

			// 背景图信息
			gbImgSrc: '',

			//存放临时路径的对象
			temPathArr: {
				avatar: '', //头像
				code: '', //初始二维码
				bg: '', //背景图片
				avatarCode: '' //头像二维码 (剪切圆形的头像本地地址)
			},
			shareImgPath: ''
		};
	},
	mounted() {
		let that = this;
		// #ifdef H5
		uni.showModal({
			showCancel: false, //不显示取消按钮
			title: '请使用小程序或app生成分销海报',
			success(e) {
				//确认后的回调
				console.log(e);
				that.toBackFn()
			}
		});
		that.isShowLoading = false;
		// #endif
	},
	onShow() {
		let that = this;
		that.isShowLoading = true;
		// #ifdef APP-PLUS || MP-WEIXIN
		// 收银系统功能- 未绑定手机号不能操作以下功能
		if(!that.isRunBindMobileFunc){
			that.isShowLoading = false;
			uni.showModal({
				title: bindMobileTips,
				success(e) {
					e.confirm && that.navigateToFn({url: `/packageA/tel-login/user-info`});
				},
			})
			return false;
		}
		that.setConfigFn();
		// #endif
	},
	onLoad() {
		console.log('vuex 的 头像地址that.userInfoAvatar;', this.userInfoAvatar);
	},
	methods: {
		// pc后台转换单位函数
		pc2pxFn(px) {
			px = px - 0;
			// pc后台设置屏幕宽度320
			return (this.windowWidth * px) / 320;
		},

		// 把配置列表的信息复制到data里
		async setConfigFn() {
			let that = this;
			that.avatarSrc = that.userInfoAvatar; //头像地址
			that.gbImgSrc = that.configInfo.invite_bg_img; //背景图地址

			if (!that.gbImgSrc) {
				that.failFn({
					msg: '未设置海报背景图片'
				});
				return;
			}

			that.codeX = that.pc2pxFn(that.configInfo.invite_bg_qrcode_left); //二维码左边距
			that.codeY = that.pc2pxFn(that.configInfo.invite_bg_qrcode_top); //二维码上边距
			that.codeSize = that.pc2pxFn(that.configInfo.invite_bg_qrcode_size); //二维码大小

			that.canvasBgWidth = that.windowWidth; //画布宽
			that.canvasBgHeight = that.pc2pxFn(540); //画布高

			that.avatarSize = (that.codeSize * 192) / 430;

			// 获取分享二维码图片链接
			let shareCodeImgHttpSrc = await that.getShareCodeImgFn();

			if (shareCodeImgHttpSrc.type == 'success') {
				Promise.all([
					url2temPath(shareCodeImgHttpSrc.result),
					url2temPath(that.avatarSrc),
					url2temPath(that.gbImgSrc)
				])
					.then(temPathArr => {
						//初始二维码    //头像    //背景图片
						that.temPathArr.code = temPathArr[0].result;
						that.temPathArr.avatar = temPathArr[1].result;
						that.temPathArr.bg = temPathArr[2].result;

						console.log(that.temPathArr, '拿到三个临时路径', '\n');

						that.clipArcAvatarFn();
					})
					.catch(e => {
						that.failFn({
							msg: e.msg
						});
					});
			} else {
				that.failFn({
					msg: shareCodeImgHttpSrc.msg
				});
			}

			console.log(that.avatarSrc, ' 头像地址', '\n', that.gbImgSrc, ' 背景地址', '\n');
		},
		// 剪切头像 成圆形
		async clipArcAvatarFn() {
			let that = this;
			// 创建画布对象
			let ctx = uni.createCanvasContext('avatarCanvas');

			// 根据 图片的大小 绘制底图 的大小
			let imgW = that.avatarSize,
				imgH = that.avatarSize,
				imgPath = that.temPathArr.avatar;

			ctx.save();
			ctx.arc(imgW / 2, imgH / 2, imgW / 2, 0, 2 * Math.PI); //绘制圆形
			ctx.setStrokeStyle('rgba(0,0,0,0)');
			ctx.stroke(); //这个一定要有，不然图片不剪切，我就是遇到了这个问题
			ctx.clip(); //剪切
			ctx.drawImage(imgPath, 0, 0, imgW, imgH); //置入图片
			ctx.restore(); //恢复之前保存的绘图上下文
			ctx.draw(true, () => {
				//保存画布上的东西 画完后执行回调
				that.saveAvatarFn();
			});
		},
		// 保存圆形头像地址
		saveAvatarFn() {
			let that = this;
			// 拿到拼合好的图片
			uni.canvasToTempFilePath(
				{
					canvasId: 'avatarCanvas',
					success(res) {
						let tempFilePath = res.tempFilePath;

						that.temPathArr.avatarCode = tempFilePath;

						console.log('保存完圆形头像的临时路径开始 画最终分享图', '\n');
						that.createSharImgFn();
					},
					fail(res) {
						that.failFn({
							msg: '获取圆形头像路径失败'
						});
					}
				},
				that
			);
		},
		// 生成分享图片
		async createSharImgFn() {
			let that = this;
			let bgImgSrc = that.temPathArr.bg;

			// 创建画布对象
			let ctx = uni.createCanvasContext('sharImgCanvas');
			// 获取图片信息，要按照原图来绘制，否则图片会变形

			// 根据 图片的大小 绘制底图 的大小
			let imgW = that.canvasBgWidth,
				imgH = that.canvasBgHeight,
				imgPath = bgImgSrc;

			// 绘制底图 用原图的宽高比绘制
			ctx.drawImage(imgPath, 0, 0, imgW, imgH);
			(() => {
				// 根据 图片的大小 绘制底图 的大小
				let imgW = that.codeSize,
					imgH = that.codeSize,
					imgPath = that.temPathArr.code;

				ctx.drawImage(imgPath, that.codeX, that.codeY, imgW, imgH);

				ctx.beginPath();

				let { avatarSize, avatarX, avatarY } = that.getAvatarInfo();

				ctx.arc(avatarX, avatarY, avatarSize / 2, 0, 2 * Math.PI);
				ctx.setFillStyle('#ffffff');
				ctx.fill();

				ctx.drawImage(
					that.temPathArr.avatarCode,
					avatarX - avatarSize / 2,
					avatarY - avatarSize / 2,
					avatarSize,
					avatarSize
				);

				ctx.draw(true, () => {
					that.showShareImgFn();
				});
			})();
		},

		// 获取头像尺寸坐标信息
		getAvatarInfo() {
			let that = this;
			let avatarSize = parseInt((that.codeSize * 192) / 430), //头像尺寸
				avatarMargin = (that.codeSize - avatarSize) / 2, //头像距离二维码图片边框的边界距离
				avatarX = avatarMargin + that.codeX + avatarSize / 2, //头像在整个画布上的距离X
				avatarY = avatarMargin + that.codeY + avatarSize / 2; //头像在整个画布上的距离Y
			return {
				avatarSize,
				avatarX,
				avatarY
			};
		},

		// 获取分享二维码链接
		getShareCodeImgFn() {
			let that = this;
			return new Promise(async (resFn, rejFn) => {
				let result = await that.$request({
					url: '/api/Share/xcxImg'
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						resFn({
							type: 'success',
							msg: '获取分享二维码图片成功',
							result: result.data.data
						});
					} else {
						rejFn({
							type: 'error',
							msg: result.data.msg,
							result: result.data.msg
						});
					}
				} else {
					rejFn({
						type: 'error',
						msg: that.$errorMsg,
						result: that.$errorMsg
					});
				}
			});
		},

		failFn(failMsg) {
			let that = this;
			uni.showModal({
				showCancel: false, //不显示取消按钮
				title: failMsg.msg,
				success(e) {
					//确认后的回调
					console.log(e);
					that.toBackFn();
				}
			});
		},
		// 点击保存到本地
		saveShearImgFn() {
			let that = this;
			// 未绑定手机号不能操作以下功能
			if(!that.isRunBindMobileFunc){
				uni.showModal({
					title: bindMobileTips,
					success(e) {
						e.confirm && that.navigateToFn({url: `/packageA/tel-login/user-info`});
					},
				})
				return false;
			}
			// #ifdef MP-WEIXIN
			that.saveImgFn(that.shareImgPath);
			// #endif

			// #ifdef APP-PLUS
			that.saveImgAppFn(that.shareImgPath);
			// #endif
		},
		// 安卓app端保存图片
		saveImgAppFn(src) {
			
			uni.getImageInfo({
				src,
				success(res) {
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success() {
							uni.showToast({
								icon: 'success',
								title: '保存成功'
							});
						},
						fail() {
							uni.showToast({
								icon: 'none',
								title: '保存失败'
							});
						}
					});
				},
				fail(e) {
					console.log('获取图片信息错误', e);
				}
			});
		},
		// 保存图片函数
		async saveImgFn(src) {
			let that = this;
			// 获取权限列表的信息
			let settingInfo = await that.settingInfoFn('scope.writePhotosAlbum');
			console.log(settingInfo, '获取权限列表的信息', '\n');

			if (settingInfo.type == 'success') {
				// 如果用户 授权 了 并且 授权 状态是 禁止的 状态
				if (settingInfo.isOk == false && settingInfo.isFirst == false) {
					// 打开权限列表 让用户打开该状态
					// that.openSettingFn('scope.writePhotosAlbum');

					that.isShowOpenSetting = true;
					/*


					wx.openSetting({
						success(res) {
							console.log(res.authSetting);
						}
					});
					 */
				}
				// 如果是第一次使用该 权限 或者 该权限已通过 正常调用函数
				if (settingInfo.isFirst || settingInfo.isOk) {
					uni.getImageInfo({
						src: src,
						success(res) {
							uni.saveImageToPhotosAlbum({
								filePath: res.path,
								success() {
									uni.showToast({
										icon: 'success',
										title: '保存成功'
									});
								},
								fail() {
									uni.showToast({
										icon: 'none',
										title: '保存失败'
									});
								}
							});
						},
						fail(e) {
							console.log('获取图片信息错误', e);
						}
					});
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: settingInfo.msg
				});
			}
		},
		cloneSettingFn() {
			console.log('cloneSettingFn', '\n');
			this.isShowOpenSetting = false;
		},
		// canvas画完后 展示最后的分享图片
		showShareImgFn() {
			let that = this;
			// 拿到拼合好的图片
			uni.canvasToTempFilePath(
				{
					canvasId: 'sharImgCanvas',
					success(res) {
						let tempFilePath = res.tempFilePath;
						that.shareImgPath = tempFilePath;
						that.isShowLoading = false;
					},
					fail(res) {
						that.failFn({
							msg: '保存失败稍后重试'
						});
					}
				},
				that
			);
		}
	},
	computed: {
		...mapState({
			userInfoAvatar: store => store.userInfo.userInfoAvatar, // 头像地址
		})
	}

};
</script>

<style lang="scss" scoped>
.page,
page {
	background: $bg-grey-color;
	min-height: 100vh;
	width: 100%;
	display: inline-block;
}

.bottom-btn-block {
	margin: 20px 0;
	@include flex-center;
	width: 100%;
	height: 100rpx;
	.pay-btn {
		@include btn-green;
	}
}
</style>
