<template>
	<view class="page">
		<view class="line-group">
			<view class="line-item" @click="uploadImgFn">
				<view class="left-title-text">头像</view>
				<view class="right-content">
					<view class="content-block">
						<view class="img-block" @click.stop="lookBigImgFn([avatar])">
							<image :src="avatar"></image>
						</view>
					</view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</view>
			<view class="line-item" @click="setBindTelModalFlagFn(true)">
				<view class="left-title-text">手机号</view>
				<view class="right-content">
					<view class="content-block">{{ mobile ? mobile : '未绑定' }}</view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</view>
			<view class="line-item" @click="setNameModalFlagFn(true)">
				<view class="left-title-text">昵称</view>
				<view class="right-content">
					<view class="content-block">{{ nickname }}</view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</view>

			<view v-if="wechat" class="line-item" @click="bindWxFn" style="background: #ffffff;">
				<view class="left-title-text">绑定微信</view>
				<view class="right-content">
					<view class="content-block">{{ wechat ? '已绑定' : '未绑定' }}</view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</view>
			<button
				v-if="!wechat"
				open-type="getUserInfo"
				class="line-item"
				@click="bindWxFn"
				style="background: #ffffff; border-radius: 0;"
			>
				<view class="left-title-text">绑定微信</view>
				<view class="right-content">
					<view class="content-block">{{ wechat ? '已绑定' : '未绑定' }}</view>
					<view class="more-icon"><uni-icons type="arrowright"></uni-icons></view>
				</view>
			</button>
		</view>

		<view class="commit-block">
			<view
				class="commit-btn flex-center"
				:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				:style="{ background: configInfo.web_site_color }"
				@click="commitFn"
			>
				提交修改
			</view>
		</view>

		<view class="flex-center modal-class" v-if="bindTelModalFlag">
			<view class="modal-box">
				<view class="title">{{ mobile ? '修改手机号' : '绑定手机号' }}</view>

				<view class="input-group" v-if="calcIsOpenSMFlag">
					<view class="input-item border-radius">
						<input class="input-dom" type="text" placeholder="请输入手机号" v-model="bindTelStr" />
					</view>
					<view class="input-item border-radius">
						<input
							class="input-dom"
							style="padding-right: 2em;"
							type="text"
							placeholder="请输入验证码"
							v-model="codeStr"
						/>
						<view class="get-code-btn" @click="sendCodeFn">{{ calcText }}</view>
					</view>
				</view>
				<view class="btn-group">
					<view v-if="calcIsOpenSMFlag" class="sm-bind-btn border-radius flex-center" @click="bindTelFn">
						{{ mobile ? '修改手机号' : '绑定手机号' }}
					</view>

					<!-- #ifdef MP-WEIXIN -->
					<button
						open-type="getPhoneNumber"
						@getphonenumber="wxGetTelFn"
						class="clear-btn-style wx-bind-btn border-radius flex-center "
						style="display: flex;border-radius: 1000px;"
					>
						<view class="icon-block" style="margin: 0 .2em;">
							<uni-icons type="weixin" color="#ffffff" size="20"></uni-icons>
						</view>
						<view class="text">微信一键绑定</view>
					</button>
					<!-- #endif -->

					<!-- #ifdef APP-PLUS -->
					<button
						class="clear-btn-style wx-bind-btn border-radius flex-center "
						style="display: flex;border-radius: 1000px;"
						@click="getPhoneOneClick"
					>
						<view class="text">获取本机手机号</view>
					</button>
					<!-- #endif -->
				</view>

				<view class="clone-btn" @click="setBindTelModalFlagFn(false)">
					<uni-icons type="close" size="30" color="#ffffff"></uni-icons>
				</view>
			</view>
		</view>

		<view class="flex-center modal-class" v-if="changeNameModalFlag">
			<view class="modal-box">
				<view class="title">修改昵称</view>
				<view class="input-group">
					<view class="input-item border-radius">
						<input class="input-dom" type="text" placeholder="请输入新昵称" v-model="newNameStr" />
					</view>
				</view>
				<view class="clone-btn" @click="setNameModalFlagFn(false)">
					<uni-icons type="close" size="30" color="#ffffff"></uni-icons>
				</view>
			</view>
		</view>
		<loading-css :is-show="isShowLoading"></loading-css>
	</view>
</template>

<script>
import { assertObject, assertString, checkAvatarPath, en2ch } from '@/tools/tools.js';
import { host } from '@/tools/siteinfo';
let timer;
export default {
	data() {
		return {
			// 开屏动画
			isShowLoading: true,

			// 头像地址
			avatar: '',
			// 用户名
			nickname: '',
			// 手机号
			mobile: '',
			// 是否绑定过微信
			wechat: '',

			// 绑定手机号的模态框
			bindTelModalFlag: false,
			// 修改名字的模态框
			changeNameModalFlag: false,
			// 新修改的名字
			newNameStr: '',

			// 是否修改过头像
			changeAvatarFlag: false,
			// 给服务器的临时路径
			serverUrl: '',

			// 验证码倒计时 60秒 重新发送
			intervalTime: 60,
			// 是否在发送中
			sendIng: false,
			// 要绑定的手机号
			bindTelStr: '',
			// 显示在页面上的倒计时
			showTimeStr: 0,
			// 发送验证码的次数
			sendCodeCont: 0,
			// 双向绑定的验证码 字符串
			codeStr: ''
		};
	},
	onUnload() {
		clearInterval(timer);
	},
	onLoad() {
		let that = this;
		that.userinfoPageGetFn();
		uni.$off('wxBindTel');
		uni.$on('wxBindTel', result => {
			that.wxBindTelEndFn(result);
		});
	},
	computed: {
		/*
			展示在页面上的 倒计时文字
			如果第一次发验证码 显示 '获取验证码'
			点击后 显示 '重新发送(59)' 重新发送+倒计时  (倒计时期间不能再次发送)
			可以再次发送 显示 重新发送
		*/
		calcText() {
			let that = this;
			if (that.sendCodeCont == 0) {
				return '获取验证码';
			}
			if (that.sendIng) {
				return `重新发送(${that.showTimeStr})`;
			}
			return '重新发送';
		}
	},
	methods: {
		// #ifdef APP-PLUS
		getPhoneOneClick() {
			let that = this;
			if (plus.os.name == 'Android') {
				let mainActivity = plus.android.runtimeMainActivity();
				let Context = new plus.android.importClass('android.content.Context');
				let TelephonyManager = new plus.android.importClass('android.telephony.TelephonyManager');
				let tm = mainActivity.getSystemService(Context.TELEPHONY_SERVICE);
				let number = tm.getLine1Number();
				uni.showToast({
					icon: 'success',
					title: '请验证并绑定'
				});
				console.log('获取到的手机号', number);
				that.bindTelStr = number;
			}
		},
		// #endif
		// 绑定微信
		async bindWxFn() {
			let that = this;
			if (that.wechat) {
				uni.showToast({
					icon: 'none',
					title: '已绑定微信'
				});
				return false;
			}

			// #ifdef H5
			uni.showModal({
				showCancel: false,
				title: '请使用小程序或app绑定',
			});
			return false;
			// #endif

			let userProfileObject = await that.getUserProfileFn();

			let avatarUrl, nickName, province, city, gender;

			if (userProfileObject.type == 'success') {
				avatarUrl = userProfileObject.result.avatarUrl;
				nickName = userProfileObject.result.nickName;
				province = userProfileObject.result.province;
				city = userProfileObject.result.city;
				gender = userProfileObject.result.gender;
			} else {
				uni.showToast({
					icon: 'none',
					title: '获取个人信息失败'
				});
				return false;
			}

			uni.login({
				success(e) {
					console.log('先获取code那堆数据', e);

					uni.getUserInfo({
						//获取用户信息
						async success(userInfoRes) {
							console.log('uni.getUserInfo 成功的数据', userInfoRes, '\n');
							//第一次提示用户授权 成功后的回调 授权后再点直接成功 拿回来用户信息

							let code = e.code;
							let iv = encodeURIComponent(userInfoRes.iv);
							let encryptedData = encodeURIComponent(userInfoRes.encryptedData);

							let data = {
								platform: 'wechat_applet',
								code,
								iv,
								encryptedData,
								avatar: avatarUrl,
								nickname: nickName,
								area: `${en2ch(province)}-${en2ch(city)}`,
								sex: gender
							};
							console.log('用户登录时带的参数', data);


							let result = await that.$request({
								loading: true,
								method: 'post',
								url: '/api/User/wechatBin',
								data,
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								}
							});
							console.log('用户登录时带的参数', data, '\n', '返回的结果', result, '\n');

							if (result.statusCode == 200) {
								if (result.data.code == 200) {
									that.wechat = 1;
									uni.showToast({
										icon: 'success',
										title: result.data.msg
									});
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
						},
						fail(e) {
							console.log('登录失败 小程序 getUserInfo 接口fail ', e);
						}
					});
				}
			});
		},
		// 提交信息
		async commitFn() {
			let that = this;
			let path = '/api/User/subUserinfo';
			let url = `${host}${path}`;

			let commitObj = {
				// 发给服务器的 json数据
				nickname: that.nickname
			};

			if (that.changeAvatarFlag) {
				uni.uploadFile({
					url,
					filePath: that.serverUrl,
					name: 'file',
					header: {
						token: that.globalToken
					},
					formData: {
						...commitObj
					},
					success(e) {
						console.log(e, '成功', '\n');
						let res = JSON.parse(e.data);
						uni.showToast({
							icon: res.code == 200 ? 'success' : 'none',
							title: res.msg
						});

						setTimeout(() => {
							that.toBackFn();
						}, 800);
					},
					fail(e) {
						console.log(e, '失败', '\n');
					}
				});
			} else {
				let result = await that.$request({
					method: 'post',
					url: path,
					data: {
						nickname: that.nickname,
						file: ''
					}
				});
				//数据返回后 处理方式  处理数据
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						uni.showToast({
							icon: 'success',
							title: result.data.msg
						});
						setTimeout(() => {
							that.toBackFn();
						}, 800);
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
		},
		// 通过 微信提供的 授权 获取到手机号之后
		wxBindTelEndFn(result) {
			let that = this;
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					that.userinfoPageGetFn();
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
		},
		// 点击 绑定手机号
		async bindTelFn() {
			let that = this;
			if (!that.regTel(that.bindTelStr)) {
				uni.showToast({
					icon: 'none',
					title: '号码格式错误'
				});
				return false;
			}
			if (assertString(that.codeStr).length <= 0) {
				uni.showToast({
					icon: 'none',
					title: '请输入验证码'
				});
				return false;
			}
			let result = await that.$request({
				method: 'post',
				url: '/api/User/mobileBin',
				data: {
					mobile: that.bindTelStr,
					captcha: that.codeStr
				}
			});
			//数据返回后 处理方式  处理数据
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: result.data.msg
					});
					that.codeStr = '';
					that.bindTelStr = '';
					that.sendIng = false;
					clearInterval(timer);
					that.sendCodeCont = 0;
					that.userinfoPageGetFn();
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
		},
		// 倒计时开始
		countDownFn() {
			let that = this;
			that.showTimeStr = that.intervalTime;
			clearInterval(timer);
			timer = setInterval(() => {
				that.showTimeStr--;
				if (that.showTimeStr <= 0) {
					that.sendIng = false;
					clearInterval(timer);
				}
			}, 1000);
		},
		// 发送验证码函数
		async sendCodeFn() {
			let that = this;
			if (!that.regTel(that.bindTelStr)) {
				uni.showToast({
					icon: 'none',
					title: '号码格式错误'
				});
				return false;
			}
			if (that.sendIng) {
				return false;
			}
			let result = await that.$request({
				method: 'post',
				url: '/api/Sms/sendCaptcha',
				data: {
					mobile: that.bindTelStr,
					event: 'binmobile'
				}
			});
			//数据返回后 处理方式  处理数据
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					uni.showToast({
						icon: 'success',
						title: result.data.msg
					});
					that.sendIng = true;
					that.sendCodeCont++;
					that.countDownFn();
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
		},
		// 上传图片
		uploadImgFn() {
			let that = this;
			console.log('上传图片', '\n');
			uni.chooseImage({
				count: 1,
				async success(e) {
					that.changeAvatarFlag = true;
					that.avatar = e.tempFilePaths[0];
					that.serverUrl = e.tempFiles[0].path;
				},
				fail(e) {
					console.log(e, '选择图片失败', '\n');
				}
			});
		},
		// 设置绑定手机号的模态框 显示 隐藏
		setBindTelModalFlagFn(flag) {
			let that = this;
			if (!flag) {
				that.bindTelStr = '';
				that.codeStr = '';
			}
			if (flag && that.mobile.length > 0) {
				that.bindTelModalFlag = flag;

				return false;
			}
			that.bindTelModalFlag = flag;
		},
		// 设置 新昵称的的模态框 显示 隐藏
		setNameModalFlagFn(flag) {
			let that = this;
			if (flag) {
				that.newNameStr = '';
			} else {
				if (that.strTrimFn(that.newNameStr).length > 0) {
					that.nickname = that.newNameStr;
				}
				that.newNameStr = '';
			}
			that.changeNameModalFlag = flag;
		},
		// 获取 个人资料 页面 用户信息
		async userinfoPageGetFn() {
			let that = this;
			that.bindTelModalFlag = false;

			let dataObj = {};

			// #ifdef APP-PLUS
			dataObj.Platform = 'App';
			// #endif
			// #ifdef MP-WEIXIN
			dataObj.Platform = 'wxMiniProgram';
			// #endif

			// #ifdef H5
			if (that.globalBrowserIsWx) {
				dataObj.Platform = 'wxOfficialAccount';
			} else {
				dataObj.Platform = 'H5';
			}
			// #endif

			let result = await that.$request({
				method: 'post',
				url: `/api/User/getUserinfo`,
				data: dataObj
			});
			//数据返回后 处理方式  处理数据
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObj = assertObject(result.data.data);
					let userInfoObj = assertObject(resultObj.info);

					// 头像地址
					that.avatar = checkAvatarPath(userInfoObj.avatar);
					// 用户名
					that.nickname = userInfoObj.nickname;
					// 手机号
					that.mobile = userInfoObj.mobile;
					// 是否绑定过微信
					that.wechat = userInfoObj.wechat;
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
		// 关闭绑定手机号的 弹框
		closeGetTelModalFn() {
			let that = this;
			that.showGetTelModal = false;
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

	.modal-class {
		position: fixed;
		z-index: 20;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(148, 148, 148, 0.87);
		.modal-box {
			position: relative;
			margin: 0 38rpx;
			padding: 0 40rpx 20rpx;
			width: 100%;
			border-radius: 20rpx;
			background: #ffffff;
			.title {
				line-height: 134rpx;
				font-size: 32rpx;
				color: #000000;
			}
			.input-group {
				.input-item {
					display: flex;
					margin-bottom: 30rpx;
					padding: 0 30rpx;
					height: 90rpx;
					background: #eeeeee;
					.input-dom {
						flex: 1;
						height: 100%;
					}
					.get-code-btn {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						position: relative;
						width: 190rpx;
						font-size: 26rpx;
						&::after {
							content: '';
							display: block;
							position: absolute;
							left: 0;
							top: 50%;
							transform: translateY(-50%);
							width: 1px;
							height: 40rpx;
							background: #afafaf;
						}
					}
				}
			}
			.btn-group {
				padding: 0 6rpx;
				.sm-bind-btn,
				.wx-bind-btn {
					height: 88rpx;
					color: #ffffff;
					font-size: 28rpx;
					margin-bottom: 30rpx;
				}
				.sm-bind-btn {
					background: #dfdfdf;
				}
				.wx-bind-btn {
					background: #89d151;
				}
			}

			.clone-btn {
				position: absolute;
				bottom: -130rpx;
				left: 50%;
				transform: translateX(-50%);
				padding: 20rpx;
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
}
</style>
