<template>
	<view>
		<block v-if="isOpenEatPage">
			<loading-css :is-show="isShowLoading"></loading-css>
			<view class="file-list-block">
				<view class="content-wrap">
					<view
						class="item show-image border-radius20"
						v-for="(item, index) in uploadImgList"
						:key="index"
						@click="lookImgListFn(index)"
					>
						<image :src="item.path" class="image" mode=""></image>
						<uni-icons
							@click.native.stop="delImgFn(index)"
							style="position: absolute; z-index: 10; top: 20rpx; right: 20rpx;"
							size="20"
							type="close"
							color="#ffffff"
						></uni-icons>
					</view>
					<view class="item upload-btn border-radius20" @click="chooseImageFn"></view>
				</view>
			</view>

			<view class="info-block">
				<view class="content-wrap">
					<view class="title-inp">
						<input class="input" type="text" placeholder="填写标题会有更多赞哦" v-model="titleTxt" />
					</view>
					<view class="content-block">
						<textarea
							maxlength="2000"
							class="textarea"
							placeholder="添加正文"
							v-model="contentTxt"
						></textarea>
					</view>
					<view class="line-block">
						<view class="text-block">{{ levelName }}</view>
						<view class="select-item">
							<view
								v-for="(item, index) in levelList"
								:key="index"
								:class="['tag-block', levelIndex == index ? item.tagStyle : 'defaultStyle']"
								@click="clickLevelFn(index)"
							>
								{{ item.name }}
							</view>
						</view>
					</view>
					<view class="line-block">
						<view class="text-block">{{ timeLengthName }}</view>
						<view class="select-item">
							<view
								v-for="(item, index) in timeLengthList"
								:key="index"
								:class="['tag-block', timeLengthIndex == index ? item.tagStyle : 'defaultStyle']"
								@click="clickTimeLengthFn(index)"
							>
								{{ item.name }}
							</view>
						</view>
					</view>

					<view class="line-block">
						<view class="text-block">{{ categoryName }}</view>
						<view class="select-item select-class">
							<picker
								mode="multiSelector"
								range-key="name"
								:range="calcRange"
								:value="pickerValue"
								@change="changeFn"
								@columnchange="columnchangeFn"
								@cancel="cancelFn"
							>
								<view class="multiSelector text-ellipsis border-radius20">
									{{ calcValue.category.name }}
								</view>
								<view class="multiSelector text-ellipsis border-radius20">
									{{ calcValue.second.name }}
								</view>
							</picker>
						</view>
					</view>
				</view>
			</view>

			<view class="add-food-block" v-if="foodsList.length > 0">
				<view class="content-wrap">
					<view class="title-block">{{ foodsName }}</view>
					<view class="add-food">
						<scroll-view scroll-x>
							<view class="show-goods-wrap">
								<block v-for="(item, index) in foodsList" :key="index">
									<show-goods-item
										:ind="index"
										:goodsImage="item.goodsImage"
										:goodsName="item.goodsName"
										:goodsTag="item.goodsTag"
										:goodsPrice="item.goodsPrice"
										:isSelect="item.isSelect"
										:linePrice="item.linePrice"
										@showGoodsItemClickFn="showGoodsItemClickFn"
									></show-goods-item>
								</block>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>

			<view style="height: 100rpx;"></view>
			<view class="bottom-btn-block">
				<button
					:loading="saveBtnLoading"
					class="clear-btn-style btn-green"
					@click="saveFn"
					:style="{ background: configInfo.web_site_color }"
					:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
				>
					发布
				</button>
			</view>
		</block>
		<null-block v-else min-height="100vh"></null-block>
	</view>
</template>

<script>
// 工具库 相关
import { checkTypeFn, assertObject, assertArray } from '@/tools/tools';
import { bindMobileTips } from '@/tools/const.js';
import { host } from '@/tools/siteinfo.js';
import showGoodsItem from './show-goods-item';


export default {
	components: {
		showGoodsItem
	},
	data() {
		return {
			isShowLoading: true, // 开屏动画
			titleTxt: '', // 作品标题
			contentTxt: '', // 作品内容
			levelIndex: 0, // 简易程度标签索引
			levelName: '', // 简易程度标题
			levelList: [], // 简易程度标签列表
			timeLengthIndex: 0, // 时间长度标签索引
			timeLengthName: '', // 时间长度标题
			timeLengthList: [], // 时间长度标签列表
			foodsName: '',
			foodsList: [],
			categoryName: '',
			categoryList: [],
			pickerValue: [0, 0],
			uploadImgList: [],
			legal: 'yes',
			saveBtnLoading: false // 保存按钮的loading状态
		};
	},
	onShow() {
		let that = this;
		// 收银系统功能- 未绑定手机号不能操作以下功能
		if(!that.isRunBindMobileFunc){
			uni.showModal({
				title: bindMobileTips,
				success(e) {
					e.confirm && that.navigateToFn({url: `/packageA/tel-login/user-info`});
				},
			})
			return false;
		}
	},
	onLoad() {
		let that = this;
		let title = that.isOpenEatPage ? '发布作品' : '更多';
		uni.setNavigationBarTitle({
			title
		});
		that.loadFn();
	},
	methods: {
		// 获取发布作品页面展示信息
		getPageDetailFn() {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					url: '/api/Delicious/publish_detail'
				});

				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let resultObject = assertObject(result.data.data);

						// 简易程度
						let level = assertObject(resultObject.level);
						let levelName = level.name;
						let levelList = assertArray(level.value).map((i, k) => {
							return {
								id: i.id,
								name: i.name,
								tagStyle: that.tagStyle(k)
							};
						});

						// 时间长度
						let timeLength = assertObject(resultObject.timelength);
						let timeLengthName = timeLength.name;
						let timeLengthList = assertArray(timeLength.value).map((i, k) => {
							return {
								id: i.id,
								name: i.name,
								tagStyle: that.tagStyle(k)
							};
						});

						// 处理食材
						let foods = assertObject(resultObject.foods);
						let foodsName = foods.name;

						let foodsList = assertArray(foods.value).map(item => {
							return {
								isSelect: false, // 是否选中
								goodsId: item.goods_id, // 商品id
								goodsImage: item.original_img, // 商品图片
								goodsName: item.goods_name, // 商品名字
								goodsPrice: item.shop_price, // 商品价格
								linePrice: item.market_price, // 商品划线价
								goodsTag: item.tag_name // 商品标签
							};
						});

						// 处理分类
						let category = assertObject(resultObject.category);
						let categoryName = category.name;
						let categoryList = assertArray(category.value).map(i => {
							let second,
								flag = false;
							if (checkTypeFn(i.second) == 'Array' && i.second.length) {
								flag = true;
								second = i.second.map(j => {
									return {
										id: j.id,
										name: j.name
									};
								});
							}
							let result = {
								id: i.id,
								name: i.name
							};
							if (flag) {
								result.second = second;
							}
							return result;
						});
						resFn({
							type: 'success',
							msg: '获取信息成功',
							result: {
								levelName,
								levelList,
								timeLengthName,
								timeLengthList,
								foodsName,
								foodsList,
								categoryName,
								categoryList
							}
						});
					} else {
						resFn({
							type: 'error',
							msg: result.data.msg,
							result
						});
					}
				} else {
					resFn({
						type: 'error',
						msg: that.$errorMsg,
						result
					});
				}
			});
		},
		// 页面加载执行
		async loadFn() {
			let that = this;
			let pageDetailResult = await that.getPageDetailFn();

			if (pageDetailResult.type == 'success') {
				let {
					levelName,
					levelList,
					timeLengthName,
					timeLengthList,
					foodsName,
					foodsList,
					categoryName,
					categoryList
				} = pageDetailResult.result;

				that.levelName = levelName;
				that.levelList = levelList;
				that.timeLengthName = timeLengthName;
				that.timeLengthList = timeLengthList;
				that.foodsName = foodsName;
				that.foodsList = foodsList;
				that.categoryName = categoryName;
				that.categoryList = categoryList;
			} else {
				uni.showToast({
					icon: 'none',
					title: pageDetailResult.msg
				});
				console.log('获取发布作品页面展示数据接口报错 /api/Delicious/publish_detail', pageDetailResult);
			}

			that.isShowLoading = false;
		},
		// 点击时间长度标签
		clickTimeLengthFn(index) {
			this.timeLengthIndex = index;
		},
		// 点击简易程度标签
		clickLevelFn(index) {
			this.levelIndex = index;
		},
		// 点击挑选
		showGoodsItemClickFn(index) {
			let that = this;
			that.foodsList[index].isSelect = !that.foodsList[index].isSelect;
		},
		// 弹出的picker组件 取消事件
		cancelFn() {
			this.pickerValue.splice(0, 1, 0, 0);
		},
		// 弹出的picker组件 确认事件
		changeFn(e) {
			let [one, two] = e.detail.value;
			console.log('弹出的picker组件 确认事件 change', 'one, two', one, two);
			this.pickerValue.splice(0, 2, one, two);
		},
		// picker组件单个列滑动事件
		columnchangeFn(e) {
			let { column, value } = e.detail;
			console.log('picker组件单个列滑动事件 column, value', column, value);
			if (column == 0) {
				this.pickerValue.splice(0, 1, value, 0);
			}
		},
		// 上传单个文件到服务器
		uploadFileFn(tempFilePath) {
			return new Promise((res, rej) => {
				uni.uploadFile({
					url: `${host}/api/Upload/upload`,
					filePath: tempFilePath,
					name: 'file',
					success(e) {
						console.log('上传图片接口 /api/Upload/upload 成功返回数据', e);
						let result = JSON.parse(e.data);
						if (result.code == 200) {
							console.log('上传图片的path', result.data.path);
							res({
								path: result.data.path.replace(/\\/g, '/'),
								legal: result.data.legal
							});
						} else {
							rej({
								msg: result.msg,
								result: e
							});
						}
					},
					fail(e) {
						rej({
							msg: that.$errorMsg,
							result: e
						});
					}
				});
			});
		},
		// file对象数组上传到服务器
		uploadFilesFn(fileObject) {
			let that = this;
			return new Promise((res, rej) => {
				Promise.all(fileObject.map(item => that.uploadFileFn(item)))
					.then(arr => {
						res(arr);
					})
					.catch(e => {
						console.log('上传图片接口 /api/Upload/upload 失败返回数据', e);
						rej(e.msg);
					});
			});
		},
		// 选本地图片开始上传到服务器
		chooseImageFn() {
			let that = this;
			uni.chooseImage({
				async success(chooseImageRes) {
					let maxByte = 1.6 * 1024 * 1024; // 1.6兆

					let checkSizeYes = [];
					let checkSizeNo = [];

					chooseImageRes.tempFiles.map((item, index) => {
						if (item.size >= maxByte) {
							checkSizeNo.push(chooseImageRes.tempFilePaths[index]);
						} else {
							checkSizeYes.push(chooseImageRes.tempFilePaths[index]);
						}
					});

					if (checkSizeNo.length >= 1) {
						that.hideAllFn();
						uni.showToast({
							icon: 'none',
							title: '图片最大尺寸1.6MB'
						});
					}

					if (checkSizeYes.length > 0) {
						console.log('可以上传到服务器的数据', checkSizeYes);
						const tempFilePaths = checkSizeYes;
						that.hideAllFn();
						uni.showLoading({});
						try {
							let temSrc = await that.uploadFilesFn(tempFilePaths);
							that.uploadImgList.push(...temSrc);
							that.hideAllFn();
						} catch (e) {
							that.hideAllFn();
							uni.showToast({
								icon: 'none',
								title: e
							});
						}
					}
				}
			});
		},
		delImgFn(index) {
			this.uploadImgList.splice(index, 1);
		},
		lookImgListFn(current) {
			console.log('look', current);
			let urls = this.uploadImgList.map(image => {
				return image.path;
			});
			uni.previewImage({
				current,
				urls
			});
		},
		async saveFn() {
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
			if(that.saveBtnLoading){
				return false;
			}
			that.saveBtnLoading = true;
			if (that.uploadImgList.length <= 0) {
				that.hideAllFn();
				uni.showToast({
					title: '请上传图片',
					icon: 'none'
				});
				that.saveBtnLoading = false;
				return false;
			}

			let allImageIsok = that.uploadImgList.every(i => i.legal == 'yes');
			that.legal = allImageIsok ? 'yes' : 'no';

			let imageList = that.uploadImgList.map(i => i.path).join(',');

			if (that.titleTxt.length <= 0) {
				that.hideAllFn();
				uni.showToast({
					title: '作品标题不能为空',
					icon: 'none'
				});
				that.saveBtnLoading = false;
				return false;
			}

			if (that.contentTxt.length <= 0) {
				that.hideAllFn();
				uni.showToast({
					title: '作品内容不能为空',
					icon: 'none'
				});
				that.saveBtnLoading = false;
				return false;
			}
			let goodsList = that.foodsList
				.filter(item => {
					return item.isSelect == true;
				})
				.map(item => {
					return item.goodsId;
				})
				.join(',');

			let objs = {
				title: that.titleTxt,
				detail: that.contentTxt,
				image: imageList,
				category_id: that.calcValue.second.id,
				category_name: that.calcValue.second.name,
				level: that.levelList[that.levelIndex].id,
				time: that.timeLengthList[that.timeLengthIndex].id,
				goods_id: goodsList,
				legal: that.legal
			};
			/* 
			console.log(objs, 'objs');
			return false;
			*/

			let result = await that.$request({
				method: 'POST',
				url: '/api/Delicious/publish',
				data: objs
			});

			//数据返回后 处理方式  处理数据
			if (result.statusCode == 200) {
				if (result.data.code == 200 && result.data.data == 1) {
					uni.showToast({
						icon: 'success',
						title: result.data.msg
					});
					that.saveBtnLoading = false;
					setTimeout(() => {
						that.toBackFn();
					}, 400);
				} else {
					that.saveBtnLoading = false;
					uni.showToast({
						icon: 'none',
						title: result.data.msg
					});
				}
			} else {
				that.saveBtnLoading = false;
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		}
	},
	// ↑↑↑↑↑ methods 结束
	computed: {
		calcRange() {
			let categoryList = assertArray(this.categoryList);
			let secondList = assertArray(assertObject(categoryList[this.pickerValue[0]])['second']);
			return [categoryList, secondList];
		},
		calcValue() {
			let calcRange = assertArray(this.calcRange),
				categoryList = assertArray(calcRange[0]),
				secondList = assertArray(calcRange[1]),
				categoryIndex = this.pickerValue[0],
				secondIndex = this.pickerValue[1];
			return {
				category: categoryList[categoryIndex],
				second: secondList[secondIndex]
			};
		}
	}
};
</script>

<style lang="scss" scoped>
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

.info-block {
	.title-inp {
		display: flex;
		align-items: center;
		height: 95rpx;
		border-bottom: 1px solid #f8f8f8;

		.input {
			font-size: 30rpx;
			width: 100%;
		}
	}

	.content-block {
		padding-top: 25rpx;
		height: 355rpx;

		.textarea {
			height: 100%;
			font-size: 25rpx;
		}
	}

	.line-block {
		display: flex;
		align-items: center;
		height: 90rpx;
		font-size: 0;
		border-top: 1px solid #f8f8f8;

		&.select-class {
			font-size: 16rpx;
		}

		.text-block {
			font-size: 26rpx;
			font-weight: 600;
			color: $grey1-color;
			margin-right: 50rpx;
		}

		.tag-block {
			margin-right: 20rpx;
		}

		.select-class {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 430rpx;
			height: 100%;

			.multiSelector {
				display: inline-block;
				width: 202rpx;
				height: 54rpx;
				line-height: 54rpx;
				padding: 0 1em;
				text-align: center;
				border: 1px solid #efefef;
				font-size: 20rpx;
				font-size: 26rpx;
				color: #91939c;
				&:first-child {
					margin-right: 20rpx;
				}
			}
		}
	}
}

.add-food-block {
	border-top: 20rpx solid $bg-grey-color;
	border-bottom: 20rpx solid $bg-grey-color;

	.title-block {
		font-size: 34rpx;
		font-weight: 600;
		color: $grey1-color;
		line-height: 90rpx;
		border-bottom: 1px solid #f8f8f8;
	}
	.add-food {
		height: 396rpx;
		overflow: hidden;
		.show-goods-wrap {
			white-space: nowrap;
			height: 416rpx;
		}
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
}
</style>
