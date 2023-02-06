<template>
	<view class="toast-modal-msg flex-center"  @touchmove.stop="catchTouchMove">
		<view class="box">
			<view class="title flex-center">{{ msgStr }}</view>
			<view class="btn-group"><view class="btn-style" @click="confirmFn">确定</view></view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	methods: {
		// 确认按钮
		confirmFn() {
			let that = this;
			if (that.isUserCloneFlag) {
				uni.openSetting({
					async success() {
						let homeSetingFalgResult = await that.homeTempIdListIsConfirm(that.homeTemplateIdList);

						if (homeSetingFalgResult.type == 'success') {
							that.$store.commit('setHomeTemplateIdSettingFlag', true);
						} else {
							that.$store.commit('setHomeTemplateIdSettingFlag', false);
						}

						let isUserCloneMsgFlag = await that.isUserCloneMsg(that.homeTemplateIdList);

						if (isUserCloneMsgFlag.type == 'success') {
							that.$store.commit('setIsUserCloneFlag', true);
						} else {
							that.$store.commit('setIsUserCloneFlag', false);
						}
					}
				});
				return false;
			}
			let opt = {
				tmplIds: [...that.homeTemplateIdList],
				success(res) {
					console.log('success run ', res);
					// console.log(res, '允许发送模板id成功');
				},
				fail(res) {
					console.log('fail run ', res);
					// console.log(res, '允许发送模板id失败');
				},
				complete() {
					that.$emit('close');
				}
			};
			uni.requestSubscribeMessage(opt);
			console.log(opt, 'opt', '\n');
		}
	},
	computed: {
		msgStr() {
			return this.isUserCloneFlag
				? `检测到您没有打开推送权限,去设置打开`
				: `为了更好的购物体验请允许发送系统提醒并勾选 "总是保持以上选择, 不再询问"`;
		},
		...mapState({
			homeTemplateIdList: state => state.homeTemplateIdList,
			isUserCloneFlag: state => state.isUserCloneFlag
		})
	}
};
</script>

<style lang="scss" scoped>
.toast-modal-msg {
	position: fixed;
	z-index: 500;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	.box {
		display: flex;
		flex-direction: column;
		width: 80vw;
		height: 320rpx;
		background: #ffffff;
		font-size: 36rpx;
		border-radius: 20rpx;
		overflow: hidden;
		font-weight: bold;
		.title {
			flex: 1;
			padding: 40rpx 60rpx;
			color: #181818;
			text-align: center;
		}
		.btn-group {
			border-top: 1px solid #e6e6e6;
			&.hideCancelBtn {
				.btn-Cancel {
					color: #000000;
					border-left: 1px solid rgba(0, 0, 0, 0);
				}
			}
			display: flex;
			justify-content: space-between;
			.btn-style {
				flex: 1;
				text-align: center;
				line-height: 110rpx;
				color: #526692;
				border-left: 1px solid #e6e6e6;
			}
		}
	}
}
</style>
