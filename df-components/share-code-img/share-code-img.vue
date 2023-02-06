<template>
	<view class="share-code-wrap">
		<view class="hide-canvas-dom">
			<canvas
				class="sharImgCanvas"
				:style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
				canvas-id="sharImgCanvas"
			></canvas>
			<canvas
				class="avatarCanvas"
				:style="{ width: avatarSize + 'px', height: avatarSize + 'px' }"
				canvas-id="avatarCanvas"
			></canvas>
		</view>
		<view class="btn-default" @click="canvasCreateImgFn">
			<image class="share-icon_goods-info" :src="calcImageSrc('/global-image/share-icon_goods-info.png')"></image>
			<view class="text">分享</view>
		</view>
		<view v-show="isShowModule" :class="['bg-module']"></view>

		<view :class="['block-dom', isShowModule ? 'act' : '']">
			<view class="img-wrap" @click="cloneModuleFn()">
				<image
					v-if="shareImgPath"
					:src="shareImgPath"
					:style="{ width: showImgW + 'px', height: showImgH + 'px' }"
					@click.stop="catchTouchMove"
				></image>
				<view class="loading-wrap" v-else>
					<view class="animate-rotate-dom">
						<view class="box box1">
							<view class="dot dot1"></view>
							<view class="dot dot2"></view>
							<view class="dot dot3"></view>
							<view class="dot dot4"></view>
						</view>
						<view class="box box2">
							<view class="dot dot1"></view>
							<view class="dot dot2"></view>
							<view class="dot dot3"></view>
							<view class="dot dot4"></view>
						</view>
					</view>
					<view class="text">海报生成中</view>
				</view>
			</view>

			<view class="btn-group-block">
				<!-- #ifdef MP-WEIXIN -->

				<!-- iconfont icon-weixin -->
				<button class="icon-item clear-btn-style" open-type="share">
					<view class="icon-block- icon-weixin-">
						<uni-icons type="weixin" size="30" color="#ffffff"></uni-icons>
					</view>
					<view class="icon-txt">分享好友</view>
				</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<button class="icon-item clear-btn-style" @click="shareAppPageFn">
					<view class="icon-block- icon-weixin-">
						<uni-icons type="weixin" size="30" color="#ffffff"></uni-icons>
					</view>
					<view class="icon-txt">分享好友</view>
				</button>
				<!-- #endif -->

				<view class="icon-item" @click="saveShearImgFn()">
					<view class="icon-block- icon-load">
						<uni-icons type="upload-filled" size="26" color="#ffffff"></uni-icons>
					</view>
					<view class="icon-txt">保存海报</view>
				</view>
			</view>
		</view>
		<open-setting
			:is-show="isShowOpenSetting"
			@cloneFn="cloneSettingFn"
			title="打开允许保存到相册设置"
		></open-setting>
	</view>
</template>

<script>
import {
    mapState
} from 'vuex'

import { url2temPath, transNumFn } from '@/tools/tools';
import { bindMobileTips } from '@/tools/const.js';
import openSetting from '@/df-components/openSetting/openSetting';
let timer;

/* 
		防止商品名称太长 顶出去 以10个字 为一组 开始画
		传入商品名称 返回 数组
	*/
function getTextListFn(goodsNameStr, len = 10) {
	let arr = [];
	let size = len;
	let currentSize = len;
	let str = '';

	for (let i = 0; i < goodsNameStr.length; i++) {
		str += goodsNameStr[i];
		if (i == currentSize - 1) {
			arr.push(str);
			str = '';
			currentSize += size;
		}
	}
	if (str.length > 0) {
		arr.push(str);
	}
	return arr;
}

const canvasWidth = 750,
	canvasHeight = 1136,
	avatarSize = 90,
	// 二维码信息
	codeSize = 194, //二维码尺寸
	codeX = 490, //二维码x坐标
	codeY = 852, //二维码y坐标
	goodsImgX = 66,
	goodsImgY = 210,
	goodsSize = 620,
	showImgW = 576,
	showImgH = 876;

export default {
	components: {
		openSetting
	},
	props: {
		goodsId: {
			type: [String, Number]
		},
		goodsName: {
			type: String,
			default: ''
		},
		goodsImgs: {
			type: Array
		},
		isRob: {
			type: Boolean,
			default: false
		},
		path: {
			type: String
		},
		// imgIndex 轮播图展示 当前图片的 索引
		imgIndex: {
			default: 1
		},

		/* 
			商品的类型  
				jifen  积分兑换
				pintuan  拼团商品
				default  默认的 普通商品 和 秒杀商品
		*/
		goodsType: {
			type: String,
			default: 'default'
		},
		goodsPrice: {
			type: [String, Number]
		}
	},
	data() {
		return {
			canvasWidth: 750,
			canvasHeight: 1136,

			avatarSize: 90,

			// 二维码信息
			codeSize: 194, //二维码尺寸
			codeX: 46, //二维码x坐标
			codeY: 730, //二维码y坐标

			goodsImgX: 30,
			goodsImgY: 24,
			goodsSize: 696,

			showImgW: 430,
			showImgH: 542,

			//存放临时路径的对象
			temPathArr: {
				avatar: '', //头像
				code: '', //初始二维码
				bg: '', //背景图片
				avatarCode: '', //头像二维码 (剪切圆形的头像本地地址)
				currentImg: '' // 当前轮播图显示的图片的临时路径
			},
			shareImgPath: '',

			isShowModule: false,
			isShowOpenSetting: false
		};
	},
	methods: {
		// #ifdef H5
		// 浏览器端复制当前商品地址
		h5GzhShareGoodsFn() {
			let that = this;
			const shareUrlStr = `${location.origin}${location.pathname}${location.hash}&shareFn=true&scene=${
				that.userInfoEncrypt
			}`;
			that.copyStrFn(shareUrlStr, () => {
				uni.showToast({
					icon: 'success',
					title: '复制商品链接成功'
				});
			});
		},
		// #endif
		// canvas生成图片_1
		async canvasCreateImgFn() {
			let that = this;
			if (!that.isLogin) {
				that.closeGlobalLoginFn(true);
				return false;
			}
			
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
			
			// #ifdef H5
			that.h5GzhShareGoodsFn();
			return false;
			// #endif

			let { canvasWidth, canvasHeight, goodsImgs: imgArr } = that;

			let avatarSrc = that.userInfoAvatar, //头像地址
				// gbImgSrc = that.calcImageSrc('/global-image/goods_shear_code_bg.jpg'); //背景图地址
				// gbImgSrc = `http://192.168.1.10:8080/bg.jpg`; //背景图地址
				gbImgSrc = that.addimgPathHostFn(that.configInfo.de_share_back_img); //背景图地址
			/* 
				 console.log(
				     '后台设置的背景图片',gbImgSrc
				 );
				 
				*/

			if (!gbImgSrc) {
				that.failFn({
					msg: '未设置海报背景图片'
				});
				return false;
			}

			that.isShowModule = true;

			if (that.shareImgPath) {
				return false;
			}
			console.log(that.isShowModule, 'that.isShowModule', '\n');
			// 获取分享二维码图片链接
			let shareCodeImgHttpSrc = await that.getShareCodeImgFn();

			if (shareCodeImgHttpSrc.type == 'success') {
				console.log('转换前的 尺寸', canvasWidth, canvasHeight);
				// 处理坐标
				that.canvasWidth = that.pc2pxFn(canvasWidth);
				that.canvasHeight = that.pc2pxFn(canvasHeight);

				that.canvasBgWidth = that.pc2pxFn(canvasWidth);
				that.canvasBgHeight = that.pc2pxFn(canvasHeight);

				that.avatarSize = that.pc2pxFn(avatarSize);

				that.codeSize = that.pc2pxFn(codeSize);
				that.codeX = that.pc2pxFn(codeX);
				that.codeY = that.pc2pxFn(codeY);

				that.goodsImgX = that.pc2pxFn(goodsImgX);
				that.goodsImgY = that.pc2pxFn(goodsImgY);
				that.goodsSize = that.pc2pxFn(goodsSize);

				that.showImgW = that.pc2pxFn(showImgW);
				that.showImgH = that.pc2pxFn(showImgH);

				let imgIndex = that.imgIndex;

				console.log(
					' 打印 canvas宽高 that.canvasBgWidth,that.canvasBgHeight',
					that.canvasBgWidth,
					that.canvasBgHeight
				);
				console.log(
					`
							
							
							二维码图片
							
							${shareCodeImgHttpSrc.result}
							
							-------------------
							
							
							头像
							
							${avatarSrc}
							
							-------------------
							
							
							背景图
							
							${gbImgSrc}
							
							-------------------
							
							
							商品图片
							
							${imgArr[imgIndex]}
							
							-------------------
							
							
							

						`
				);

				Promise.all([
					url2temPath(shareCodeImgHttpSrc.result),
					url2temPath(avatarSrc),
					url2temPath(gbImgSrc),
					url2temPath(imgArr[imgIndex - 1])
				])
					.then(temPathArr => {
						//初始二维码    //头像    //背景图片
						that.temPathArr.code = temPathArr[0].result;
						that.temPathArr.avatar = temPathArr[1].result;
						that.temPathArr.bg = temPathArr[2].result;
						that.temPathArr.currentImg = temPathArr[3].result;

						console.log(
							that.temPathArr,
							'拿到三个临时路径',
							'\n',
							that.temPathArr.code,
							that.temPathArr.avatar,
							that.temPathArr.bg,
							that.temPathArr.currentImg
						);

						that.clipArcAvatarFn();
					})
					.catch(e => {
						console.log(e, 'catch __err', '\n');
						that.failFn({
							msg: e.msg + 'catch'
						});
					});

				console.log(
					shareCodeImgHttpSrc.result,
					'--',
					avatarSrc,
					'--',
					gbImgSrc,
					'--',
					imgArr[imgIndex - 1],
					'--'
				);

				console.log();
			} else {
				that.failFn({
					msg: shareCodeImgHttpSrc.msg
				});
			}
		},
		// 设计稿750px 转 实际手机屏幕比例px
		pc2pxFn(px) {
			return (transNumFn(px) * this.windowWidth) / 750;
		},
		// 安卓app分享
		shareAppPageFn() {
			let that = this;
			let pageTypeObj = {};
			if (that.isRob) {
				pageTypeObj.pageTypeRob = true;
			}
			that.shareAppFn({
				path: that.path,
				query: {
					scene: true, // 如果登录就带着自己的加密字符串
					goods_id: that.goodsId,
					...pageTypeObj
				},
				options: {
					title: that.goodsName,
					imageUrl: that.goodsImgs[that.imgIndex]
				}
			});
		},
		// 关闭 是否打开设置 的提示模态框
		cloneSettingFn() {
			this.isShowOpenSetting = false;
		},
		// 关闭 带分享带二维码海报 的模态框
		cloneModuleFn() {
			this.isShowModule = false;
		},
		// 失败的函数 提示
		failFn(failMsg) {
			uni.hideLoading();
			uni.showToast({
				icon: 'none',
				title: failMsg.msg
			});
		},

		// 返回 获取二维码图片的 网络地址  二维码图片内容是 当前食品和分享人的信息
		getShareCodeImgFn() {
			let that = this;
			let id = that.goodsId;
			let { path, isRob } = that;
			console.log('id, path, isRob', id, path, isRob);

			return new Promise(async (resFn, rejFn) => {
				let result = await that.$request({
					url: '/api/Share/xcxImg_goods',
					method: 'post',
					data: {
						path,
						id,
						isRob
					}
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
		// 剪切头像 成圆形
		async clipArcAvatarFn() {
			let that = this;
			// 创建画布对象
			let ctx = uni.createCanvasContext('avatarCanvas', that);

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

			console.log('// 剪切头像 成圆形', '\n', ctx, ctx.draw);

			console.log(imgPath, 0, 0, imgW, imgH, '', '\n');

			ctx.draw(true, () => {
				console.log('//保存画布上的东西 画完后执行回调', '\n');
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
			let ctx = uni.createCanvasContext('sharImgCanvas', that);
			// 获取图片信息，要按照原图来绘制，否则图片会变形

			// 根据 图片的大小 绘制底图 的大小
			let imgW = that.canvasBgWidth,
				imgH = that.canvasBgHeight,
				imgPath = bgImgSrc;

			// 绘制底图 用原图的宽高比绘制(画背景)
			ctx.drawImage(imgPath, 0, 0, imgW, imgH);
			(() => {
				// 画二维码
				// 根据 图片的大小 绘制底图 的大小
				let imgW = that.codeSize,
					imgH = that.codeSize,
					imgPath = that.temPathArr.code;

				ctx.drawImage(imgPath, that.codeX, that.codeY, imgW, imgH);

				ctx.beginPath();
				// 画圆形头像

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

				(() => {
					// 画商品图
					let imgW = that.goodsSize,
						imgH = that.goodsSize,
						imgPath = that.temPathArr.currentImg;

					ctx.drawImage(imgPath, that.goodsImgX, that.goodsImgY, imgW, imgH);

					ctx.setFontSize(20);
					ctx.setFillStyle('#323232');

					let goodsNameArr = getTextListFn(that.goodsName);

					console.log('商品名字信息', that.goodsName, '\n', '切割处理的商品名字数组', goodsNameArr, '\n');

					if (goodsNameArr.length >= 3) {
						goodsNameArr[1] += '...';
					}
					let goodsNameTop = 940,
						goodsNameLineHeight = 44;

					goodsNameArr.forEach((item, index) => {
						if (index <= 1) {
							ctx.fillText(
								item,
								that.pc2pxFn(60),
								that.pc2pxFn(index * goodsNameLineHeight + goodsNameTop)
							);
							// ctx.fillText(item, 60, 60);
						}
					});

					let priceText = '';
					if (that.goodsType == 'pintuan') {
						priceText = `¥${that.goodsPrice}`;
					} else if (that.goodsType == 'jifen') {
						priceText = `${that.goodsPrice}积分`;
					} else {
						priceText = `¥${that.goodsPrice}`;
					}
					ctx.setFontSize(16);
					ctx.setFillStyle('#ea3a37');
					ctx.fillText(priceText, that.pc2pxFn(60), that.pc2pxFn(3 * goodsNameLineHeight + goodsNameTop));

					ctx.draw(true, () => {
						that.showShareImgFn();
					});
				})();
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

						console.log(that.shareImgPath, '最终的图片路径——', '\n');
					},
					fail(res) {
						that.failFn({
							msg: '保存失败稍后重试'
						});
					}
				},
				that
			);
		},
		// 点击保存图片按钮
		saveShearImgFn() {
			let that = this;
			console.log('打印生成的图片路径 that.shareImgPath', that.shareImgPath);
			if (!that.shareImgPath) {
				return false;
			}

			// #ifdef MP-WEIXIN
			that.saveImgFn(that.shareImgPath);
			// #endif

			// #ifdef APP-PLUS
			that.saveImgAppFn(that.shareImgPath);
			// #endif
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
		// 安卓app 下载图片
		async saveImgAppFn(src) {
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
	},
	computed: {
		...mapState({
			userInfoAvatar: store => store.userInfo.userInfoAvatar, // 头像地址
			userInfoEncrypt: store => store.userInfo.userInfoEncrypt, // 加密字符串
		})
	}

};
</script>

<style lang="scss" scoped>
.share-code-wrap {
	width: 60rpx;
	height: 60rpx;
}
.bg-module {
	position: fixed;
	z-index: 882;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	transition: 0.2s;
	background: rgba(0, 0, 0, 0.4);
}

.block-dom {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	position: fixed;
	z-index: 883;
	top: 0;
	left: 0;
	transition: 0.4s;
	transform: translate3d(0, 150%, 0) scale(0.4);
	opacity: 0;

	&.act {
		transform: translate3d(0, 4px, 0) scale(1);
		opacity: 1;
	}

	.img-wrap {
		flex: 1;
		@include flex-center;
	}

	.btn-group-block {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100vw;
		height: 256rpx;
		padding: 0 60rpx;
		background: #ffffff;
		border-radius: 20rpx 20rpx 0 0;

		.icon-item {
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			height: 130rpx;
			font-size: 22rpx;
			color: #272727;

			.icon-block- {
				@include flex-center;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			.icon-weixin- {
				background: #6ccc4e;
			}

			.icon-load {
				transform: rotate(180deg);
				background: #ffdb4f;
			}
		}
	}
}

@keyframes animate-rotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

.loading-wrap {
	position: relative;
	width: 74rpx;
	height: 74rpx;

	.animate-rotate-dom {
		width: 100%;
		height: 100%;
		animation: animate-rotate infinite 1.4s linear;

		.box {
			position: absolute;
			width: 100%;
			height: 100%;

			&.box1 {
				transform: rotate(45deg);
			}

			&.box2 {
				transform: rotate(0deg);
			}

			.dot {
				position: absolute;
				width: 16rpx;
				height: 16rpx;
				background: #ffffff;
				border-radius: 50%;
			}

			.dot1 {
				left: 0;
				top: 0;
			}

			.dot2 {
				right: 0;
				top: 0;
			}

			.dot3 {
				left: 0;
				bottom: 0;
			}

			.dot4 {
				right: 0;
				bottom: 0;
			}
		}
	}

	.text {
		position: absolute;
		left: 50%;
		bottom: 0;
		font-size: 22rpx;
		color: #ffffff;
		white-space: nowrap;
		transform: translate3d(-50%, 180%, 0);
	}
}

.btn-default {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 60rpx;
	overflow: hidden;
	.text {
		font-size: 20rpx;
		color: #656565;
	}
	.share-icon_goods-info {
		width: 30rpx;
		height: 30rpx;
	}
}
</style>
