<template>
	<view class="root-page" style="overflow:visible">
		<view class="search-block">
			<view class="content-wrap">
				<uni-icons class="icon-search" size="20" :color="configInfo.web_site_color" type="search"></uni-icons>
				<input
					@focus="inputFocusFn"
					class="inp border-radius"
					type="text"
					:placeholder="configInfo.search_default_text"
					v-model="searchKey"
					:style="{ border: `1px solid ${configInfo.web_site_color}` }"
				/>
				<view class="flex-center text" @click="searchFn" :style="{ background: configInfo.web_site_color }">
					搜索
				</view>
			</view>
		</view>
		<view class="history-wrap" v-if="historyFlag && searchKeyList.length">
			<view class="content-wrap">
				<view class="push-msg">
					<view class="title">
						<text>历史搜索</text>
						<uni-icons @click="delHistoryKeyFn" type="trash" size="15" color="#595557"></uni-icons>
					</view>

					<view class="tag-list">
						<view
							class="history-tag tag-box"
							v-for="(item, index) in searchKeyList"
							:key="index"
							@click="histTxtFn(item)"
						>
							{{ item }}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<null-block
			v-if="!historyFlag && menuWorksList.length<=0"
			min-height="100vh"
		></null-block>
		

		<view class="menu-works-list-wrap" v-show="!historyFlag">
			<view class="content-wrap">
				
				<view class="menu-works-view" v-for="(item, index) in menuWorksList" :key="item.id">
					<menu-works
						:ind="index"
						:menuWorksImage="item.menuWorksImage"
						:menuWorksTitle="item.menuWorksTitle"
						:menuWorksUserAvatar="item.menuWorksUserAvatar"
						:menuWorksUserName="item.menuWorksUserName"
						:menuWorksUserIsZan="item.menuWorksUserIsZan"
						:menuWorksZanNum="item.menuWorksZanNum"
						@menuWorksClickFn="menuWorksClickFn"
					></menu-works>
				</view>
				
				
				
			</view>
			<view class="uni-load-more" v-if="menuWorksList.length >= 6">
				<uni-load-more :status="loadMoreStatus"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
import { assertString, assertArray } from '@/tools/tools.js';
import menuWorks from './eat-package-components/menu-works';

export default {
	components: {
		menuWorks
	},
	data() {
		return {
			historyFlag: true,
			loadMoreStatus: 'more',
			menuWorksList: [], // 菜谱作品列表数据
			page: 1, // 分页索引数
			searchKey: '', // 双向绑定的 input框
			searchKeyList: [] // 之前搜索过的关键字列表 记录
		};
	},
	onShow() {
		let that = this;
		let searchKeyList = uni.getStorageSync('searchKeyList');
		let tem;
		if (searchKeyList) {
			tem = JSON.parse(searchKeyList);
		} else {
			tem = [];
		}
		that.searchKeyList = tem;
	},
	methods: {
		// 根据搜索关键字和索引返回菜谱列表数据
		getMenuWorksFn(keyword, page = 1) {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					url: '/api/Delicious/serach',
					data: {
						key: keyword,
						page
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						let menuWorksList = assertArray(result.data.data).map(i => {
							return {
								id: i.id,
								menuWorksUserIsZan: false,
								menuWorksImage: i.cover_image,
								menuWorksUserAvatar: i.headimgurl,
								menuWorksUserName: i.nickname,
								menuWorksTitle: i.title,
								menuWorksZanNum: i.zan
							};
						});
						resFn({
							type: 'success',
							msg: '获取数据成功',
							result: menuWorksList
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
		// 点击搜索按钮 开始搜索
		async searchFn() {
			let that = this;
			that.historyFlag = false;
			that.hideAllFn();
			uni.showLoading({});
			let keyword = `${that.searchKey}` ? `${that.searchKey}` : that.configInfo.search_default_text;
			if (`${that.searchKey}`) {
				let searchKeyList = uni.getStorageSync('searchKeyList');
				let tem;
				if (searchKeyList) {
					tem = JSON.parse(searchKeyList);
				} else {
					tem = [];
				}

				if (!tem.includes(`${that.searchKey}`)) {
					tem.push(`${that.searchKey}`);
				}
				that.searchKeyList = tem;
				uni.setStorageSync('searchKeyList', JSON.stringify(tem));
				// uni.setStorageSync('searchKey', searchKeyStr);
			}

			let menuWorksResult = await that.getMenuWorksFn(keyword, 1);
			if (menuWorksResult.type == 'success') {
				that.page = 1;
				that.menuWorksList = menuWorksResult.result;
				that.hideAllFn();
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: menuWorksResult.msg
				});
			}
		},
		inputFocusFn() {
			this.historyFlag = true;
		},
		histTxtFn(txt) {
			this.searchKey = txt;
			this.searchFn();
		},
		menuWorksClickFn(index) {
			console.log('menuWorksClickFn index',index);
			let that = this;
			let { id } = that.menuWorksList[index];
			that.navigateToFn({ url: `/packageA/eat/food-detail/food-detail?id=${id}` });
		},
		delHistoryKeyFn() {
			let that = this;
			uni.showModal({
				title: '提示',
				content: '删除历史记录',
				success(e) {
					if (e.confirm) {
						uni.setStorageSync('searchKeyList', '');
						that.searchKeyList.splice(0, that.searchKeyList.length);
					}
				}
			});
		}
	},
	async onReachBottom() {
		let that = this;
		that.page++;
		that.loadMoreStatus = 'loading';

		let keyword = `${that.searchKey}` ? `${that.searchKey}` : that.configInfo.search_default_text;

		let menuWorksResult = await that.getMenuWorksFn(keyword, that.page);
		if (menuWorksResult.type == 'success') {
			if (menuWorksResult.result.length) {
				that.menuWorksList = that.menuWorksList.concat(menuWorksResult.result);
				that.loadMoreStatus = 'more';
			} else {
				that.loadMoreStatus = 'noMore';
				that.page--;
				if (that.page <= 1) {
					that.page = 1;
				}
			}
		} else {
			that.page--;
			if (that.page <= 1) {
				that.page = 1;
			}
			that.hideAllFn();
			uni.showToast({
				icon: 'none',
				title: menuWorksResult.msg
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.search-block {
	position: sticky;
	z-index: 10;
	left: 0;
	top: 0;
	background: #ffffff;
	.content-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		height: 88rpx;

		.icon-search {
			position: absolute;
			left: 42rpx;
		}

		.inp {
			flex: 1;
			box-sizing: border-box;
			padding: 0 1em 0 3em;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 26rpx;
			color: $grey2-color;
			background: #f7f7f7;
		}

		.text {
			margin-left: 14rpx;
			width: 100rpx;
			height: 60rpx;
			font-size: 30rpx;
			color: $grey1-color;
			color: #ffffff;
			border-radius: 10000px;
		}
	}
}

.history-wrap {
	padding-top: 28rpx;
	padding-bottom: 14rpx;
	background: #ffffff;
	.push-msg {
		.title {
			display: flex;
			color: $grey1-color;
			line-height: 48rpx;
			font-weight: 600;
			justify-content: space-between;
		}
	}
	.tag-list {
		font-size: 0;

		.tag-box {
			display: inline-block;
			font-size: 26rpx;
			color: $grey1-color;
			background: #f7f7f7;
			padding: 0.2em 0.6em;
			border-radius: 10rpx;
			margin: 10rpx;
		}

		.hot-tag {
			display: inline-flex;
			align-items: center;
			color: $red-color;

			image {
				width: 24rpx;
				height: 30rpx;
				margin-right: 0.2em;
			}
		}
	}
}
.menu-works-list-wrap {
	font-size: 0;
	.menu-works-view {
		display: inline-block;
		margin-top: 20rpx;
		margin-right: 18rpx;
		vertical-align: top;
		&:nth-child(2n) {
			margin-right: 0;
		}
	}
}
</style>
