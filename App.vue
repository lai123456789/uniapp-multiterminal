<script>
export default {
	async onLaunch(options) {
		console.log('App.vue onLaunch run');
		// #ifdef APP-PLUS
		plus.screen.lockOrientation("portrait-primary");
		// #endif
		
		console.log('app的onLaunch执行 options参数', options);
		// #ifdef APP-PLUS
		plus.navigator.closeSplashscreen();
		console.log('App Launch');
		// app启动时打开启动广告页
		var w = plus.webview.open(
			'hybrid/html/advertise/advertise.html',
			'本地地址',
			{
				top: 0,
				bottom: 0,
				zindex: 999
			},
			'fade-in',
			5
		);
		//设置定时器，3s后关闭启动广告页
		setTimeout(() => {
			plus.webview.close(w);
		}, 3000);
		// #endif
		
		console.log('获取全局配置前');
		let config = await this.setConfigFn(); // 设置全局的config 数据

		// console.log('获取全局配置后 that.configInfo->', this.configInfo, 'config', config);
		this.launchFn(options);

		uni.onTabBarMidButtonTap(() => {
			plus.android.requestPermissions(
				['android.permission.ACCESS_FINE_LOCATION'],
				function(e) {
					if (e.deniedAlways.length > 0) {
						//权限被永久拒绝
						// 弹出提示框解释为何需要权限，引导用户打开设置页面开启
						console.log('权限被永久拒绝' + e.deniedAlways.toString());
					}
					if (e.deniedPresent.length > 0) {
						//权限被临时拒绝
						// 弹出提示框解释为何需要权限，可再次调用plus.android.requestPermissions申请权限
						console.log('权限被临时拒绝' + e.deniedPresent.toString());
					}
					if (e.granted.length > 0) {
						//权限被允许
						console.log('权限被允许' + e.granted.toString());
					}
				},
				function(e) {
					console.log('Request Permissions error:' + JSON.stringify(e));
				}
			);
		});
	},
	onShow() {
		console.log('App.vue onShow run');
		// #ifdef MP-WEIXIN
		this.getNewVersionFn();
		// #endif
	}
};
</script>

<style lang="scss">
.content-wrap {
	padding: 0 24rpx;
}

swiper,
swiper-item,
view,
text {
	box-sizing: border-box;
	font-family: '微软雅黑';
}


.red-price {
	color: #ea3a37;
}

.text-red-price {
	color: #ea3a37 !important;
}



.tag-block {
	display: inline-flex;
	align-items: center;
	padding: 0rpx 10rpx;
	border-radius: 8rpx;
	height: 32rpx;
	border: 1px solid #ff6128;
	color: #ff6128;
	font-size: 18rpx;
	&.defaultStyle {
		background: #efefef;
		border: 1px solid #afafaf;
		color: #afafaf;
	}
	&.blueStyle {
		background: #ebf8ff;
		border: 1px solid #5fc7ff;
		color: #5fc7ff;
	}
	&.pinkStyle {
		background: #ffebf7;
		border: 1px solid #ff60bf;
		color: #ff60bf;
	}
	&.greenStyle {
		background: #f4fff0;
		border: 1px solid #6bc74c;
		color: #6bc74c;
	}
	&.yellowStyle {
		background: #fff2e0;
		border: 1px solid #ffbe60;
		color: #ffbe60;
	}
	&.orangeStyle {
		background: #fff0eb;
		border: 1px solid #ff6027;
		color: #ff6027;
	}
	&.redStyle {
		background: #ffdfe9;
		border: 1px solid #ff1862;
		color: #ff1862;
	}
}



// 图片模糊样式 匿名用户
.filterStyle {
	filter: blur(12rpx);
}

.border-radius {
	border-radius: 10000rpx;
}
.border-radius20 {
	border-radius: 20rpx;
}

.filterGray {
	filter: grayscale(100%);
}

// 只留一屏页面 其他切掉 阻止 遮罩层 滚动页面
.stopScrollStyle {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}

// 清除 btn 默认样式
.clear-btn-style {
	position: relative;
	display: block;
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-size: inherit;
	text-align: left;
	text-decoration: none;
	line-height: inherit;
	border-radius: 0;
	-webkit-tap-highlight-color: transparent;
	overflow: hidden;
	cursor: pointer;
	color: inherit;
	background-color: transparent;
}

.text-wrap {
	background: #ffffff;
	text-align: right;
	.right-text-block {
		display: inline-block;
		font-size: 24rpx;
		color: #525a68;
		line-height: 60rpx;
	}
}



// 隐藏没有的canvas元素
.hide-canvas-dom {
	width: 0;
	height: 0;
	overflow: hidden;
	transform: translateY(-1000vh);
}

.box-sizing {
	box-sizing: border-box;
}

.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}


// 给图片添加的 类名 尺寸占 父级所有
.image-size {
	width: 100%;
	height: 100%;
}

.border-radius-style-all-arg {
	border-radius: 10000rpx !important;
}
.border-radius-style-half-arg {
	border-radius: 10rpx !important;
}



// 底部tab-bar 样式
.hans-tabbar {
	// 底部tab-bar 占位高
	.hans-tabbar-height {
		height: 112rpx;
		&.isiPhoneXClass{
			height: 142rpx;
		}
	}
	.hans-tabbar-fixde {
		position: fixed;
		bottom: 0;
		&.isiPhoneXClass{
			bottom: 30rpx;
		}
		z-index: 100;
		width: 100%;
		height: 56px;
	}
}



.root-page {
	width: 100vw;
	min-height: 100vh;
	overflow: hidden;
	background: $bg-grey-color;
	font-family: '微软雅黑';
}





button::after {
	content: '';
	border: none;
}


.text-ellipsis {
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.text-ellipsis-rows {
	text-overflow: ellipsis; /*设置溢出显示类型为...*/
	-webkit-line-clamp: 2; /*设置显示的行数*/
	overflow: hidden; /*隐藏多于行*/
	display: -webkit-box; /*将对象作为弹性伸缩盒子模型显示*/
	-webkit-box-orient: vertical; /*设置或检索伸缩盒对象的子元素的排列方式*/
}




.btn-green {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 704rpx;
	height: 84rpx;
	color: #ffffff;
	font-size: 30rpx;
	background-image: linear-gradient(90deg, #6ccc4f, #60c669);
}





// 全局的css ↓↓↓↓↓↓↓↓↓
@font-face {
	font-family: 'iconfont';
	src: url('@/static/iconfont.woff2') format('woff2');
}
.iconfont {
	font-family: 'iconfont' !important;
	font-size: 16px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}



.icon-daochu1024-30:before {
  content: "\e619";
}

.icon-chahao:before {
  content: "\e618";
}

.icon-icon_gantanhaozhong:before {
  content: "\e62e";
}

.icon-ziyuan:before {
  content: "\e622";
}

.icon-dizhitianchong-:before {
  content: "\e62a";
}

.icon-dizhipipei:before {
  content: "\ed98";
}

.icon-fangdajing:before {
  content: "\e617";
}

.icon-guanbi:before {
  content: "\e668";
}

.icon-dianhua:before {
  content: "\e66e";
}

.icon-sanjiao:before {
  content: "\e631";
}

.icon-yishoucang:before {
  content: "\e610";
}

.icon-jiarushoucang:before {
  content: "\e61c";
}

.icon-kefu1:before {
  content: "\e679";
}

.icon-gouwuche2:before {
  content: "\e62d";
}

.icon-fangzi:before {
  content: "\e63d";
}

.icon-icon_play:before {
  content: "\e60f";
}

.icon-jianshao:before {
  content: "\e644";
}

.icon-jia:before {
  content: "\e61b";
}

.icon-VIP1:before {
  content: "\e68e";
}

.icon-fanhuidingbu:before {
  content: "\e65b";
}

.icon-zhifubao:before {
  content: "\e60a";
}

.icon-solid-star:before {
  content: "\e60b";
}

.icon-weixin:before {
  content: "\e68a";
}

.icon-VIP:before {
  content: "\e67b";
}

.icon-arrow-right-copy-copy:before {
  content: "\e603";
}

.icon-circle:before {
  content: "\e611";
}

.icon-circle1:before {
  content: "\e633";
}






/* 
	万象优鲜生鲜系统(简称: 万象优鲜)
	软著证书号: 6907220
	软著登记号: 2021SR0182903
	手机: 18310199838
	电话: 4006697689
	邮箱: 3319653051@qq.com
	著作权人: 北京世间万象网络科技有限公司
	版权所有: 北京世间万象网络科技有限公司
	任何组织和个人未经本单位许可与授权, 不得擅自复制、更改内容本系统受版权法保护如未经授权而擅自复制或传播本系统(或其中部分), 将受到严厉的刑事及民事制裁，并将在法律许可范围内受到最大可能的起诉!
*/
</style>
