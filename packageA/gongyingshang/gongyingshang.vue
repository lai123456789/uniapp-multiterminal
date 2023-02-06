<template>
	<view class="page">
		<loading-css :is-show="isShowLoading"></loading-css>

		<view class="gb-image">
			<!-- <image class="gb-image-dom" src="http://dev.sjwxsc.com/ueditor/php/upload/image/20210618/1623998559708442.png"></image> -->
			<rich-text :nodes="richText"></rich-text>
		</view>
		<view class="input-group">
			<input class="input-dom" type="text" placeholder="请输入供应商名称" v-model="gysSellerName" />
			<!-- <input class="input-dom" type="text" placeholder="请输入产品类目" v-model="gysType" /> -->
			<input class="input-dom" type="text" placeholder="请输入联系人姓名" v-model="gysName" />
			<input class="input-dom" type="text" placeholder="请输入联系人电话" v-model="gysTel" />
			<textarea class="textarea-dom" v-model="gysDescription" placeholder="请输入产品描述" />
			<view class="commit-btn" @click="commitFn">提交</view>
		</view>
	</view>
</template>

<script>
import { assertObject, goodsDetailWidthFn } from '@/tools/tools.js';

/*
	0 可以正常申请
	没有申请过可以申请  1：待审核 不可再次提交信息  2：已拒绝 可以重新提交    3：已拒绝  不可重新提交   4：已停用   9：已通过
*/
const optionsEnum = {
	'0': false,
	'1': '审核中,请勿重复提交',
	'2': '审核未通过,请重新提交审核',
	'3': '审核未通过',
	'4': '账号已停用',
	'9': '已通过,请勿重复提交'
};

export default {
	data() {
		return {
			isShowLoading: true, // 开屏动画
			richText: '', // 背景内容
			gysSellerName: '', // 供应商名称
			gysDescription: '', // 产品描述
			gysName: '', // 联系人姓名
			gysTel: '' // 联系人电话
		};
	},
	onLoad() {
		this.getShowPageBaseInfo();
	},
	methods: {
		// 获取展示在页面上的基本信息
		async getShowPageBaseInfo() {
			let that = this;
			let result = await that.$request({
				method: 'post',
				url: '/api/User/supplierAc'
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					let resultObject = assertObject(result.data.data);

					let title = optionsEnum[resultObject.status];
					that.richText = goodsDetailWidthFn(resultObject.con);
					if (title) {
						uni.showModal({
							showCancel: false, //不显示取消按钮
							title,
							success(e) {
								//确认后的回调
								console.log(e);
							}
						});
					}
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
		// 提交表单
		async commitFn() {
			let that = this;
			let obj = {
				'': true
			};
			if (
				obj[that.gysSellerName] ||
				obj[that.gysType] ||
				obj[that.gysDescription] ||
				obj[that.gysName] ||
				obj[that.gysTel]
			) {
				uni.showModal({
					showCancel: false, //不显示取消按钮
					title: '请完善表单信息',
					success(e) {
						//确认后的回调
						console.log(e);
					}
				});
				return false;
			}

			let result = await that.$request({
				method: 'post',
				url: '/api/User/supplierSub',
				data: {
					dp_name: that.gysSellerName,
					lxr_name: that.gysName,
					lxr_tel: that.gysTel,
					remark: that.gysDescription
				}
			});
			if (result.statusCode == 200) {
				if (result.data.code == 200) {
					that.gysSellerName = '';
					that.gysDescription = '';
					that.gysName = '';
					that.gysTel = '';
				} 
				uni.showToast({
					icon: 'none',
					title: result.data.msg
				});
			} else {
				uni.showToast({
					icon: 'none',
					title: that.$errorMsg
				});
			}
		}
	},
};
</script>

<style lang="scss" scoped>
.page {
	position: relative;
	width: 100%;
	height: 1864rpx;
	// background: #664bee;
	.gb-image,
	.gb-image-dom {
		width: 100%;
		height: 100%;
	}
	.input-group {
		position: absolute;
		left: 0;
		bottom: 60rpx;
		z-index: 5;
		padding: 0 50rpx;
		width: 100%;
		height: 568;
		.textarea-dom,
		.input-dom {
			box-sizing: border-box;
			margin-bottom: 20rpx;
			padding: 0 1em;
			width: 100%;
			height: 78rpx;
			background: #ffffff;
			font-size: 26rpx;
			border-radius: 16rpx;
		}
		.textarea-dom {
			padding-top: 16rpx;
			height: 156rpx;
		}
		.commit-btn {
			border-radius: 16rpx;
			height: 78rpx;
			line-height: 78rpx;
			text-align: center;
			color: #000000;
			background: #f5d822;
		}
	}
}
</style>
