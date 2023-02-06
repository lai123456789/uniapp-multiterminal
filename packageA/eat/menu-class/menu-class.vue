<template>
	<view>
		<!-- 菜谱分类↓↓↓ -->
		<view class="menu-class-list" v-for="(item,index) in menuClassList" :key="index">
			<view class="h3">{{ item.name }}</view>
			<view class="menu-list">
				<view class="item" v-for="(val,key) in item.second" :key="key" @click="selectMenuItemFn(val)">
					<image :src="val.image" mode=""></image>
					<text>{{ val.name }}</text>
				</view>
			</view>
		</view>
		<loading-css :is-show="isShowLoading"></loading-css>
	</view>
</template>

<script>
	import {
		assertArray
	} from '@/tools/tools.js'
	export default {
		data() {
			return {
				isShowLoading: true, // 开屏动画
				menuClassList: [], // 分类列表数据
			};
		},
		onLoad() {
			this.getMoreCategory();
		},
		methods: {
			// 获取分类列表数据
			async getMoreCategory() {
				let that = this;
				let result = await that.$request({
					url: '/api/Delicious/moreCategory',
				})
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let moreCategoryArr = assertArray(result.data.data);
						that.menuClassList = moreCategoryArr;
					} else {
						uni.showToast({
							icon: 'none',
							title: result.data.msg
						})
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: that.$errorMsg
					})
				}
				that.isShowLoading = false;
			},
			// 点击一个分类
			selectMenuItemFn(val) {
				let that = this;
				uni.setStorageSync('cid', val.id)
				that.navigateToFn({
					isTab: true,
					url: `/pages/eat/eat`
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.menu-class-list {
		.h3 {
			margin-left: 25rpx;
			font-size: 34rpx;
			line-height: 88rpx;
			color: $grey1-color;
			font-weight: 600;
		}

		.menu-list {
			display: flex;
			flex-wrap: wrap;

			.item {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding: 0 36rpx;
				height: 202rpx;

				image {
					width: 115rpx;
					height: 115rpx;
					border-radius: 50%;
				}

				text {
					font-size: 24rpx;
					line-height: 65rpx;
					color: $grey1-color;
					font-weight: 600;
				}
			}
		}

	}
</style>
