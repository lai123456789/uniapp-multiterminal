<!--
	底部商品分类导航条组件
-->

<template>
	<view class="nav-bar-list">
		<scroll-view scroll-x :scroll-left="navBarScrollLeft" :scroll-with-animation="true" class="scroll-view">
			<view
				v-for="(item, index) in homeBottomGoodsClassList"
				:key="index"
				@click="changeNavBarFn(index, item)"
				class="item-block"
				:class="[index == navBarListActive ? 'active' : '']"
			>
				<view class="title">{{ item.name }}</view>
				<view
					class="title-btn"
					:style="{
						color: index == navBarListActive ? '#ffffff' : '#9a9ba4',
						background: index == navBarListActive ? configInfo.web_site_color : ''
					}"
				>
					{{ item.content }}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
let scrollWidth = uni.getSystemInfoSync().screenWidth;

export default {
	props: {
		homeBottomGoodsClassList: {
			type: Array,
			default: []
		},
		navBarListActive: {
			type: Number,
			default: 0
		}
	},
	methods: {
		// 横向滑动 的 分类按钮列表点击执行的函数
		changeNavBarFn(index, item) {
			let that = this;

			/* uni.pageScrollTo({
				// scrollTop: 1230,
				scrollTop: 1180,
				duration: 80
			});
			 */

			that.$emit('changeNavBarFn', {
				index,
				item
			});
			return false;

			that.navBarListActive = index;
			that.pageIndex = 1;

			that.getShopListDateFn(() => {
				that.homePageBottomGoodsList = [];
			});
			that.loadMoreStatus = 'more';
			that.goodsLoading = true;
		}
	},
	computed: {
		navBarScrollLeft() {
			let itemWeight = (scrollWidth * 80) / 375;
			let res = this.navBarListActive * itemWeight - scrollWidth / 2 + itemWeight / 2;
			return res;
		}
	}
};
</script>

<style scoped lang="scss">
.nav-bar-list {
	position: relative;
	height: 128rpx;
	background: #ffffff;
	border-top: 10rpx solid $bg-grey-color;
	overflow: hidden;

	.scroll-view,
	scroll-view {
		width: 100%;
		height: 148rpx;
		white-space: nowrap;
	}
	.item-block {
		position: relative;
		top: 50%;
		transform: translateY(-55%);
		display: inline-block;
		width: 160rpx;
		text-align: center;
	}

	.item-block:first-child:after {
		display: none;
	}

	.item-block:after {
		content: '';
		display: block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 1px;
		height: 40rpx;
		background: #dbdbdb;
	}

	.title {
		font-size: 26rpx;
		font-weight: 600;
		line-height: 50rpx;
		text-align: center;
		max-width: 6em;
		@include text-ellipsis;
	}

	.item-block .title-btn {
		letter-spacing: 1rpx;
		border-radius: 1000rpx;
		color: #9a9ba4;
		background-image: linear-gradient(45deg, transparent, transparent);
		font-size: 22rpx;
		line-height: 38rpx;
		text-align: center;
		display: inline-block;
		padding-left: 13rpx;
		padding-right: 13rpx;
		max-width: 8em;
		@include text-ellipsis;
	}
	.item-block.active .title-btn {
		color: #ffffff;
		background-image: linear-gradient(90deg, #6ccc4f, #60c669);
	}

	&.nav-bar-list_Fixed {
		position: fixed;
		z-index: 20;
		top: 90rpx;
		height: 88rpx;
		width: 100vw;
		border-top: none;
		background: #fefefe;
		// display: none;

		.title {
			height: 88rpx;
			line-height: 88rpx;

			.after {
				display: none;
			}

			&.act {
				position: relative;
				color: #60c669;

				.after {
					display: block;
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 60rpx;
					height: 4px;
					background: #60c669;
				}
			}
		}
	}
}
</style>
