<!--
	多门店提交订单页面
-->

<!--
	多门店
		混合商品					多门店循环
		只有自营门店商品			单门店展示
	单门店						单门店展示
-->

<template>
	<view class="root-page">
		<loading-css :is-show="isShowLoading"></loading-css>
		<block v-if="gongyingshang">
			<!-- 展示用户地址组件 -->
			<user-address
				:is-show-address="moreStoreCalcIsShowAddress"
				:addressId="addressId"
				:address-is-set="addressIsSet"
				:address-user-name="addressUserName"
				:address-user-tel="addressUserTel"
				:address-text="addressText"
				:address-tag-name="addressTagName"
			></user-address>
			<!-- 门店列表 -->
			<view class="seller-list-wrap">
				<!-- 单个门店 -->
				<view
					class="seller-item-wrap"
					v-for="(storeItem, storeIndex) in moreStoreData.moreStoreList"
					:key="storeIndex"
				>
					<view class="show-seller-item">
						<!-- 门店信息 -->
						<view class="seller-info-block">
							<view class="seller-name-block">
								<view class="seller-logo-image-wrap">
									<image class="image-size" :src="storeItem.storeImage"></image>
								</view>
								<view class="seller-name-text text-ellipsis">{{ storeItem.storeName }}</view>
							</view>
							<view class="dispatch-title" v-if="!storeItem.storeIsZiying">
								<view class="dispatch-text">{{ storeItem.dispatchTypeList[0].name }}</view>
							</view>
						</view>

						<!-- 自营商家可选配送方式 -->
						<view class="select-dispatch-type-wrap" v-if="storeItem.storeIsZiying">
							<view class="show-select-dispatch-type">
								<view class="title-text">配送方式</view>
								<view class="dispatch-type-content">
									<picker
										:value="moreStoreDispatchTypeActive"
										:range="moreStoreDispatchTypePickerRange"
										range-key="name"
										@cancel="moreStoreDispatchTypeCancelFn"
										@change="moreStoreDispatchTypeChangeFn"
										@click="moreStoreDispatchTypeClickFn"
									>
										<view class="dispatch-type-text">
											<view class="dispatch-type-title">
												{{ moreStoreDispatchTypePickerRange[moreStoreDispatchTypeActive].name }}
											</view>
											<view class="dispatch-type-icon">
												<view class="iconfont icon-arrow-right-copy-copy"></view>
											</view>
										</view>
									</picker>
								</view>
							</view>
						</view>
						<!-- 送出时间 (预约配送) -->
						<block v-if="isShowMoreStoreYvyueComp(storeItem)">
							<view class="set-send-time dspcyvyue" v-if="storeItem.yvyueType == dspcyvyue">
								<view class="send-type">选择时间</view>
								<picker
									mode="multiSelector"
									:range="moreStoreYvyueRange(storeItem)"
									:value="[storeItem.yvyueDayKey, storeItem.yvyueTimeKey]"
									range-key="text"
									@change="moreStroePickerChangeFn($event, storeItem, storeIndex)"
									@click="moreStroePickerClickFn($event, storeItem, storeIndex)"
									@cancel="moreStroePickerCancelFn($event, storeItem, storeIndex)"
									@columnchange="moreStroePickerColumnChangeFn($event, storeItem, storeIndex)"
								>
									<view class="show-send-time">
										<view class="show-send-text">
											{{
												storeItem.yvyueRangeDataArr[storeItem.yvyueDayKey].timeList[
													storeItem.yvyueTimeKey
												].text
											}}
										</view>
										<view class="show-send-icon">
											<view class="iconfont icon-arrow-right-copy-copy"></view>
										</view>
									</view>
								</picker>
							</view>
							<!-- 送出时间 (立即送出) -->
							<view
								class="set-send-time dspcnow"
								v-if="storeItem.yvyueType == dspcnow && storeItem.yvyueText"
							>
								<view class="send-type">配送时间</view>
								<view class="dspcnow-text">{{ storeItem.yvyueText }}</view>
							</view>
						</block>

						<!-- 到店自提的店信息 -->
						<view class="store-ziti-wrap" v-if="moreStoreCalcIsShowShangjiazitidian(storeItem)">
							<view class="store-ziti-image-wrap">
								<img-bg-css :src="storeItem.sellerAdrs.sellerImage"></img-bg-css>
							</view>
							<view class="store-ziti-info-wrap">
								<view class="store-name text-ellipsis">{{ storeItem.sellerAdrs.sellerName }}</view>
								<view class="store-tel text-ellipsis">
									店长信息: {{ storeItem.sellerAdrs.sellerTel }}
								</view>
								<view class="store-open-time text-ellipsis">
									营业时间:{{ storeItem.sellerAdrs.sellerOpenTime }}
								</view>
								<view class="store-address-text text-ellipsis-rows">
									地址:{{ storeItem.sellerAdrs.sellerAddress }}
								</view>
							</view>
						</view>

						<!-- 到点自提的点信息 -->
						<view class="dot-ziti-wrap" v-if="moreStoreCalcIsShowDuodian(storeItem)">
							<block v-if="duozitidianList.length">
								<view class="dot-ziti-image-wrap">
									<img-bg-css :src="currentDuozitidianInfo.zitidianImage"></img-bg-css>
									<view
										v-if="!currentDuozitidianInfo.isRange"
										class="flex-center not-range"
										style="flex-direction: column;"
									>
										<view class="text">超出配</view>
										<view class="text">送范围</view>
									</view>
								</view>
								<view class="dot-ziti-info-wrap">
									<view class="dot-store-name text-ellipsis">
										{{ currentDuozitidianInfo.zitidianName }}
									</view>
									<view
										class="dot-store-tel text-ellipsis"
										v-if="currentDuozitidianInfo.zitidianDist"
									>
										距收货地: {{ currentDuozitidianInfo.zitidianDist }}
									</view>
									<view class="dot-store-open-time text-ellipsis">
										营业时间: {{ currentDuozitidianInfo.zitidianTime }}
									</view>
									<view class="dot-store-address-text text-ellipsis-rows">
										地址: {{ currentDuozitidianInfo.zitidianAddressText }}
									</view>
								</view>
								<view
									class="more-dot-ziti-btn flex-center border-radius"
									:style="{ background: configInfo.web_site_color }"
									@click="setDotZitiModalFlagFn(true)"
								>
									更多
								</view>
							</block>
							<view v-else class="tips"><view class="text-msg">!自提点列表为空</view></view>
						</view>

						<!-- 商品列表 -->
						<view class="goods-list-wrap">
							<view
								class="goods-item"
								v-for="(goodsItem, goodsIndex) in storeItem.goodsList"
								:key="goodsIndex"
							>
								<view class="goods-image-wrap">
									<img-bg-css :src="goodsItem.goodsImg"></img-bg-css>
								</view>

								<view class="goods-description-block">
									<view class="goods-description-info">
										<view class="goods-name text-ellipsis">{{ goodsItem.goodsName }}</view>
										<view class="goods-description text-ellipsis">{{ goodsItem.specName }}</view>
										<view class="goods-num text-ellipsis">×{{ goodsItem.cartNum }}</view>
									</view>
									<view class="right-price-block">
										<view class="price-text">
											<view class="goods-price-icon">¥</view>
											<view class="goods-price-num">
												{{ goodsItem.goodsPrice | filterTransNum }}
											</view>
										</view>
									</view>
								</view>
							</view>

							<!-- 失效商品 -->
							<block v-if="storeItem.loseGoodsList.length">
								<view
									class="invalid-goods-toggle-btn"
									@click="toggleMoreStoreInvalidGoodsListFn(storeItem)"
								>
									<view class="invalid-title-text">
										{{ storeItem.loseGoodsList.length }}件失效商品
									</view>
									<view
										class="invalid-title-icon iconfont icon-arrow-right-copy-copy"
										:class="[storeItem.invalidGoodsListIsShow ? 'show-invalid-list' : '']"
										style="color: #808080; font-size: 28rpx"
									></view>
								</view>
								<block v-if="storeItem.invalidGoodsListIsShow">
									<view
										class="goods-item invalid-state"
										v-for="(invalidGoodsItem, invalidGoodsIndex) in storeItem.loseGoodsList"
										:key="invalidGoodsIndex"
									>
										<view class="goods-image-wrap">
											<img-bg-css :src="invalidGoodsItem.goodsImg"></img-bg-css>
										</view>

										<view class="goods-description-block">
											<view class="goods-description-info">
												<view class="goods-name text-ellipsis">
													{{ invalidGoodsItem.goodsName }}
												</view>
												<view class="goods-description text-ellipsis">
													{{ invalidGoodsItem.specName }}
												</view>
												<view class="goods-num text-ellipsis">
													{{ invalidGoodsItem.loseMsg }}
												</view>
											</view>
											<view class="right-price-block">
												<view class="price-text">
													<view class="goods-price-icon">¥</view>
													<view class="goods-price-num">
														{{ invalidGoodsItem.goodsPrice | filterTransNum }}
													</view>
												</view>
											</view>
										</view>
									</view>
								</block>
							</block>
						</view>
						<!-- 商品金额 -->
						<view class="all-goods-price">
							<view class="show-price">
								<view class="title-text">商品金额</view>
								<view class="price-num">¥{{ storeItem.goodsPrice | filterTransNum }}</view>
							</view>
						</view>
						<!-- 商品优惠 -->
						<view class="discount-fee" v-if="storeItem.goodsDiscountsPrice > 0">
							<view class="show-price">
								<view class="title-text">商品优惠</view>
								<view class="price-num red-price">
									-¥{{ storeItem.goodsDiscountsPrice | filterTransNum }}
								</view>
							</view>
						</view>
						<block v-if="storeItem.storeIsZiying">
							<!-- 优惠券 -->
							<view class="youhuiquan-wrap" @click="discountCouponLineClickFn">
								<view class="show-youhuiquan">
									<view class="title-text">优惠券</view>
									<view class="youhuiquan-content">
										<!-- 暂无可用-->
										<view class="coupon-state-zanwukeyong" v-if="useDiscountCouponNum == 0">
											暂无可用
										</view>

										<!-- 未选可用 -->
										<view
											class="coupon-state-weixuankeyong border-radius"
											v-if="useDiscountCouponNum && discountCouponIndex < 0"
										>
											<view class="weixuankeyong-text">{{ useDiscountCouponNum }} 张可用</view>
											<view class="youhuiquan-icon">
												<view
													class="iconfont icon-arrow-right-copy-copy"
													style="color: #ffffff; font-size: 26rpx;"
												></view>
											</view>
										</view>

										<!-- 已减 -->
										<view
											class="coupon-state-yijian"
											v-if="useDiscountCouponNum && discountCouponIndex >= 0"
										>
											<view class="price-text red-price">
												-¥{{ useDiscountCouponPrice | filterTransNum }}
											</view>
											<view class="youhuiquan-icon">
												<view
													class="iconfont icon-arrow-right-copy-copy red-price"
													style="font-size: 28rpx"
												></view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 商品券 -->
							<view class="shangpinquan-wrap" @click="goodsCouponLineClickFn">
								<view class="show-shangpinquan">
									<view class="title-text">商品券</view>
									<view class="shangpinquan-content">
										<!-- 暂无可用 -->
										<view class="coupon-state-zanwukeyong" v-if="goodsCouponList.length <= 0">
											暂无可用
										</view>

										<!-- 未选可用 -->
										<view
											class="coupon-state-weixuankeyong border-radius"
											v-if="goodsCouponList.length && goodsCouponIndex < 0"
										>
											<view class="weixuankeyong-text">{{ goodsCouponList.length }} 张可用</view>
											<view class="shangpinquan-icon">
												<view
													class="iconfont icon-arrow-right-copy-copy"
													style="color: #ffffff; font-size: 26rpx;"
												></view>
											</view>
										</view>

										<!-- 已减 -->
										<view
											class="coupon-state-yijian"
											v-if="goodsCouponList.length && goodsCouponIndex >= 0"
										>
											<view class="price-text red-price">
												-¥{{ useGoodsCouponPrice | filterTransNum }}
											</view>
											<view class="shangpinquan-icon">
												<view
													class="iconfont icon-arrow-right-copy-copy red-price"
													style="font-size: 28rpx"
												></view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</block>

						<!-- 配送费 -->
						<view class="peisongfei" v-if="storeItem.dispFeeType != dispFeeHide">
							<view class="show-price" :class="[storeItem.dispFeeTip ? 'showDispFeeTip' : '']">
								<view class="title-text">
									<view class="title-text-box">配送费</view>
									<view class="title-tip-box" v-if="storeItem.dispFeeTip">
										{{ storeItem.dispFeeTip }}
									</view>
								</view>

								<view class="price-num" :class="[storeItem.dispFeeType]">
									{{ storeItem.dispFeePriceText }}
								</view>
							</view>
						</view>

						<!-- 自提需要的收货人 -->
						<block v-if="moreStoreCalcIsShowSubmitInput(storeItem)">
							<view class="ziti-username-wrap">
								<view class="show-username">
									<view class="title-text">收货人</view>
									<view class="username-content">
										<view class="username-input-wrap">
											<input
												class="username-input-dom"
												type="text"
												placeholder="收货人"
												placeholder-class="username-input-dom"
												v-model="storeItem.usernameText"
											/>
										</view>
									</view>
								</view>
							</view>

							<!-- 自提需要的手机号 -->
							<view class="ziti-usertel-wrap">
								<view class="show-usertel">
									<view class="title-text">手机号码</view>
									<view class="usertel-content">
										<view class="usertel-input-wrap">
											<input
												class="usertel-input-dom"
												type="text"
												placeholder="手机号码"
												placeholder-class="usertel-input-dom"
												v-model="storeItem.usertelText"
											/>
										</view>
									</view>
								</view>
							</view>
						</block>

						<!-- 备注信息 -->
						<view class="beizhu-wrap">
							<view class="show-beizhu">
								<view class="title-text">订单备注</view>
								<view class="beizhu-content">
									<view
										class="beizhu-input-wrap"
										:style="{ opacity: storeItem.beizhuInputOpacity ? 1 : 0 }"
									>
										<input
											class="beizhu-input-dom"
											type="text"
											v-model="storeItem.beizhuText"
											@focus="setMoreStoreBeizhuInputOpacityFn(true, storeItem, storeIndex)"
											@blur="setMoreStoreBeizhuInputOpacityFn(false, storeItem, storeIndex)"
										/>
									</view>
									<view
										class="show-beizhu-text text-ellipsis"
										:class="[storeItem.beizhuText.length ? '' : 'grey-style']"
										:style="{ opacity: storeItem.beizhuInputOpacity ? 0 : 1 }"
									>
										{{ storeItem.beizhuText ? storeItem.beizhuText : '填写备注' }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>

		<!-- ↓↓↓ 单门店 -->
		<block v-else>
			<!-- 配送方式 -->
			<dispatch-type
				:dispatchTypeList="dispatchTypeList"
				:dispatchTypeActive="dispatchTypeActive"
				@setDispatchTypeFn="setDispatchTypeFn"
			></dispatch-type>

			<!-- 展示用户地址组件 -->
			<user-address
				:is-show-address="oneStoreCalcIsShowAddress"
				:address-is-set="addressIsSet"
				:addressId="addressId"
				:address-user-name="addressUserName"
				:address-user-tel="addressUserTel"
				:address-text="addressText"
				:address-tag-name="addressTagName"
			></user-address>

			<!-- 自营商家自提点 -->
			<sellerzitidian-show
				:isShow="ziyingCalcIsShowShangjiazitidian"
				:sellerImage="sellerImage"
				:sellerName="sellerName"
				:sellerTel="sellerTel"
				:sellerOpenTime="sellerOpenTime"
				:sellerAddress="sellerAddress"
			></sellerzitidian-show>

			<!-- 多自提点 -->
			<duozitidian-show
				:isShow="ziyingCalcIsShowDuodian"
				:currentDuozitidianInfo="currentDuozitidianInfo"
				:duozitidianIsAllNotRange="duozitidianIsAllNotRange"
				@openListModalFn="setDotZitiModalFlagFn(true)"
			></duozitidian-show>

			<!-- 门店列表 -->
			<view class="seller-list-wrap">
				<!-- 单个门店 -->
				<view class="seller-item-wrap">
					<view class="show-seller-item">
						<!-- 送出时间 (预约配送) -->
						<block v-if="oneStoreCalcIsShowYvyueComp">
							<view class="set-send-time dspcyvyue" v-if="ziyingYvyueType == dspcyvyue">
								<view class="send-type">选择时间</view>
								<picker
									mode="multiSelector"
									:range="ziyingYvyueRange"
									:value="[ziyingYvyueDayKey, ziyingYvyueTimeKey]"
									range-key="text"
									@change="ziyingPickerChangeFn"
									@click="ziyingPickerClickFn"
									@cancel="ziyingPickerCancelFn"
									@columnchange="ziyingPickerColumnChangeFn"
								>
									<view class="show-send-time">
										<view class="show-send-text">
											{{
												ziyingYvyueRangeDataArr[ziyingYvyueDayKey].timeList[ziyingYvyueTimeKey]
													.text
											}}
										</view>
										<view class="show-send-icon">
											<view class="iconfont icon-arrow-right-copy-copy"></view>
										</view>
									</view>
								</picker>
							</view>
							<!-- 送出时间 (立即送出) -->
							<view class="set-send-time dspcnow" v-if="ziyingYvyueType == dspcnow && ziyingYvyueText">
								<view class="send-type">配送时间</view>
								<view class="dspcnow-text">{{ ziyingYvyueText }}</view>
							</view>
						</block>

						<!-- 商品列表 -->
						<view class="goods-list-wrap">
							<view class="goods-item" v-for="(goodsItem, goodsIndex) in goodsList" :key="goodsIndex">
								<view class="goods-image-wrap">
									<img-bg-css :src="goodsItem.goodsImg"></img-bg-css>
								</view>

								<view class="goods-description-block">
									<view class="goods-description-info">
										<view class="goods-name text-ellipsis">{{ goodsItem.goodsName }}</view>
										<view class="goods-description text-ellipsis">{{ goodsItem.specName }}</view>
										<view class="goods-num text-ellipsis">×{{ goodsItem.cartNum }}</view>
									</view>
									<view class="right-price-block">
										<view class="price-text">
											<view class="goods-price-icon">¥</view>
											<view class="goods-price-num">
												{{ goodsItem.goodsPrice | filterTransNum }}
											</view>
										</view>
									</view>
								</view>
							</view>

							<!-- 失效商品 -->
							<block v-if="loseGoodsList.length">
								<view class="invalid-goods-toggle-btn" @click="toggleOneStoreInvalidGoodsListFn">
									<view class="invalid-title-text">{{ loseGoodsList.length }}件失效商品</view>
									<view
										class="invalid-title-icon iconfont icon-arrow-right-copy-copy"
										:class="[invalidGoodsListIsShow ? 'show-invalid-list' : '']"
										style="color: #808080; font-size: 28rpx"
									></view>
								</view>
								<block v-if="invalidGoodsListIsShow">
									<view
										class="goods-item invalid-state"
										v-for="(invalidGoodsItem, invalidGoodsIndex) in loseGoodsList"
										:key="invalidGoodsIndex"
									>
										<view class="goods-image-wrap">
											<img-bg-css :src="invalidGoodsItem.goodsImg"></img-bg-css>
										</view>

										<view class="goods-description-block">
											<view class="goods-description-info">
												<view class="goods-name text-ellipsis">
													{{ invalidGoodsItem.goodsName }}
												</view>
												<view class="goods-description text-ellipsis">
													{{ invalidGoodsItem.specName }}
												</view>
												<view class="goods-num text-ellipsis">
													{{ invalidGoodsItem.loseMsg }}
												</view>
											</view>
											<view class="right-price-block">
												<view class="price-text">
													<view class="goods-price-icon">¥</view>
													<view class="goods-price-num">
														{{ invalidGoodsItem.goodsPrice | filterTransNum }}
													</view>
												</view>
											</view>
										</view>
									</view>
								</block>
							</block>
						</view>

						<!-- 商品金额 -->
						<view class="all-goods-price">
							<view class="show-price">
								<view class="title-text">商品金额</view>
								<view class="price-num">¥{{ ziyingGoodsAllPrice | filterTransNum }}</view>
							</view>
						</view>

						<!-- 商品优惠 -->
						<view class="discount-fee" v-if="ziyingGoodsDiscountsPrice > 0">
							<view class="show-price">
								<view class="title-text">商品优惠</view>
								<view class="price-num red-price">
									-¥{{ ziyingGoodsDiscountsPrice | filterTransNum }}
								</view>
							</view>
						</view>

						<!-- 优惠券 -->
						<view class="youhuiquan-wrap" @click="discountCouponLineClickFn">
							<view class="show-youhuiquan">
								<view class="title-text">优惠券</view>
								<view class="youhuiquan-content">
									<!-- 暂无可用-->
									<view class="coupon-state-zanwukeyong" v-if="useDiscountCouponNum == 0">
										暂无可用
									</view>

									<!-- 未选可用 -->
									<view
										class="coupon-state-weixuankeyong border-radius"
										v-if="useDiscountCouponNum && discountCouponIndex < 0"
									>
										<view class="weixuankeyong-text">{{ useDiscountCouponNum }} 张可用</view>
										<view class="youhuiquan-icon">
											<view
												class="iconfont icon-arrow-right-copy-copy"
												style="color: #ffffff; font-size: 26rpx;"
											></view>
										</view>
									</view>

									<!-- 已减 -->
									<view
										class="coupon-state-yijian"
										v-if="useDiscountCouponNum && discountCouponIndex >= 0"
									>
										<view class="price-text red-price">
											-¥{{ useDiscountCouponPrice | filterTransNum }}
										</view>
										<view class="youhuiquan-icon">
											<view
												class="iconfont icon-arrow-right-copy-copy red-price"
												style="font-size: 28rpx"
											></view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 商品券 -->
						<view class="shangpinquan-wrap" @click="goodsCouponLineClickFn">
							<view class="show-shangpinquan">
								<view class="title-text">商品券</view>
								<view class="shangpinquan-content">
									<!-- 暂无可用 -->
									<view class="coupon-state-zanwukeyong" v-if="goodsCouponList.length <= 0">
										暂无可用
									</view>

									<!-- 未选可用 -->
									<view
										class="coupon-state-weixuankeyong border-radius"
										v-if="goodsCouponList.length && goodsCouponIndex < 0"
									>
										<view class="weixuankeyong-text">{{ goodsCouponList.length }} 张可用</view>
										<view class="shangpinquan-icon">
											<view
												class="iconfont icon-arrow-right-copy-copy"
												style="color: #ffffff; font-size: 26rpx;"
											></view>
										</view>
									</view>

									<!-- 已减 -->
									<view
										class="coupon-state-yijian"
										v-if="goodsCouponList.length && goodsCouponIndex >= 0"
									>
										<view class="price-text red-price">
											-¥{{ useGoodsCouponPrice | filterTransNum }}
										</view>
										<view class="shangpinquan-icon">
											<view
												class="iconfont icon-arrow-right-copy-copy red-price"
												style="font-size: 28rpx"
											></view>
										</view>
									</view>
								</view>
							</view>
						</view>

						<!-- 配送费 -->
						<view class="peisongfei" v-if="dispFeeType != dispFeeHide">
							<view class="show-price" :class="[dispFeeTip ? 'showDispFeeTip' : '']">
								<view class="title-text">
									<view class="title-text-box">配送费</view>
									<view class="title-tip-box" v-if="dispFeeTip">{{ dispFeeTip }}</view>
								</view>

								<view class="price-num" :class="[dispFeeType]">{{ dispFeePriceText }}</view>
							</view>
						</view>

						<!-- 自提需要的收货人 -->
						<block v-if="ziyingCalcIsShowSubmitInput">
							<view class="ziti-username-wrap">
								<view class="show-username">
									<view class="title-text">收货人</view>
									<view class="username-content">
										<view class="username-input-wrap">
											<input
												class="username-input-dom"
												type="text"
												placeholder="收货人"
												placeholder-class="username-input-dom"
												v-model="usernameText"
											/>
										</view>
									</view>
								</view>
							</view>

							<!-- 自提需要的手机号 -->
							<view class="ziti-usertel-wrap">
								<view class="show-usertel">
									<view class="title-text">手机号码</view>
									<view class="usertel-content">
										<view class="usertel-input-wrap">
											<input
												class="usertel-input-dom"
												type="text"
												placeholder="手机号码"
												placeholder-class="usertel-input-dom"
												v-model="usertelText"
											/>
										</view>
									</view>
								</view>
							</view>
						</block>

						<!-- 备注信息 -->
						<view class="beizhu-wrap">
							<view class="show-beizhu">
								<view class="title-text">订单备注</view>
								<view class="beizhu-content">
									<view class="beizhu-input-wrap" :style="{ opacity: beizhuInputOpacity ? 1 : 0 }">
										<input
											class="beizhu-input-dom"
											type="text"
											v-model="beizhuText"
											@focus="setBeizhuInputOpacityFn(true)"
											@blur="setBeizhuInputOpacityFn(false)"
										/>
									</view>
									<view
										class="show-beizhu-text text-ellipsis"
										:class="[beizhuText.length ? '' : 'grey-style']"
										:style="{ opacity: beizhuInputOpacity ? 0 : 1 }"
									>
										{{ beizhuText ? beizhuText : '填写备注' }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 会员卡 -->
		<!--
		<vip-card
			@selectVipOptionCardFn="selectVipOptionCardFn"
			:vipOptionCardIsSelect="vipOptionCardIsSelect"
			:vipOptionCardIsOpen="vipOptionCardIsOpen"
			:vipOptionCardId="vipOptionCardId"
			:vipOptionCardName="vipOptionCardName"
			:vipOptionCardTagBgColor="vipOptionCardTagBgColor"
			:vipOptionCardTagIconImg="vipOptionCardTagIconImg"
			:vipOptionCardTagText="vipOptionCardTagText"
			:vipOptionCardTagTextColor="vipOptionCardTagTextColor"
			:vipOptionCardTipBgColor="vipOptionCardTipBgColor"
			:vipOptionCardTipText="vipOptionCardTipText"
			:vipOptionCardTipTextColor="vipOptionCardTipTextColor"
			:vipOptionCardTime="vipOptionCardTime"
			:vipOptionCardPrice="vipOptionCardPrice"
		></vip-card>
		-->

		<!-- 支付方式 -->
		<view class="pay-type-wrap">
			<view class="pay-type-block">
				<view class="pay-title">支付方式</view>
				<view class="pay-list-wrap">
					<!-- 余额 -->
					<view class="pay-item">
						<view class="icon-block flex-center">
							<view class="image-block"><yve-icon></yve-icon></view>
						</view>
						<view class="pay-type-text">
							储值余额
							<block v-if="yve > 0">({{ yve | filterTransNum }})</block>
						</view>
						<view class="control-block">
							<view v-if="yve <= 0" class="yve-number">0.00</view>
							<view v-else class="switch-wrap">
								<switch
									style="transform: translateX(20rpx) scale(0.7)"
									:checked="isUseYve"
									:color="configInfo.web_site_color"
									@change="toggleUseYveFn"
								></switch>
							</view>
						</view>
					</view>

					<view class="pay-item" v-if="showPaymentType.wx" @click="setPaymentType(payment_wx)">
						<view class="icon-block flex-center">
							<view class="iconfont icon-weixin" style="color: #6ccc4e; font-size: 60rpx;"></view>
						</view>
						<view class="pay-type-text">微信支付</view>
						<view class="control-block">
							<view
								class="iconfont icon-circle"
								:style="{ color: configInfo.web_site_color }"
								v-if="payment_wx == currentPaymentType"
							></view>
							<view class="iconfont icon-circle1" style="color: #c7c7c7" v-else></view>
						</view>
					</view>

					<!-- 支付宝 -->
					<view class="pay-item" v-if="showPaymentType.zfb" @click="setPaymentType(payment_zfb)">
						<view class="icon-block flex-center">
							<view class="iconfont icon-zhifubao" style="color: #5a9ef7; font-size: 60rpx;"></view>
						</view>
						<view class="pay-type-text">支付宝</view>
						<view class="control-block">
							<view
								class="iconfont icon-circle"
								:style="{ color: configInfo.web_site_color }"
								v-if="payment_zfb == currentPaymentType"
							></view>
							<view class="iconfont icon-circle1" style="color: #c7c7c7" v-else></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 多自提点列表模态框 -->
		<dot-ziti-modal
			:is-show="dotZitiModalFlag"
			:dotZitiList="duozitidianList"
			@closeFn="setDotZitiModalFlagFn(false)"
			@selectDotZitiFn="selectDotZitiFn"
		></dot-ziti-modal>

		<!-- 选优惠券模态框 -->
		<discount-coupon-modal
			:isShow="isShowDiscountCouponModalFlag"
			@close="setDiscountCouponModalFlagFn(false)"
			:discountCouponList="discountCouponList"
			:discountCouponIndex="discountCouponIndex"
			@discountCouponItemClickFn="discountCouponItemClickFn"
		></discount-coupon-modal>

		<!-- 选商品券模态框 -->
		<goods-coupon-modal
			:isShow="isShowGoodsCouponModalFlag"
			@close="setGoodsCouponModalFlagFn(false)"
			:goodsCouponList="goodsCouponList"
			:goodsCouponIndex="goodsCouponIndex"
			@goodsCouponItemClickFn="goodsCouponItemClickFn"
		></goods-coupon-modal>

		<!-- 提示商品失效模态框 -->
		<goods-invalid-modal
			:isShow="isShowGoodsInvalidModalFlag"
			:goodsInvalidInfo="goodsInvalidInfo"
		></goods-invalid-modal>

		<!-- 提示地址失效模态框 -->
		<address-invalid-modal :isShow="isShowAddressInvalidModalFlag"></address-invalid-modal>

		<view class="bottom-commit-wrap">
			<view class="fill-box"></view>
			<view class="commit-block">
				<view class="total-price-block">
					<view class="total-price-title">待支付:</view>
					<view class="total-price-num">
						<view class="price-icon red-price">¥</view>
						<view class="price-number red-price">{{ viewShowOrderShifu | filterTransNum }}</view>
					</view>
				</view>

				<view class="discounts-info" v-if="orderDiscountsPrice > 0">
					<view class="discounts-title">已优惠</view>
					<view class="discounts-price red-price">¥{{ orderDiscountsPrice | filterTransNum }}</view>
				</view>

				<button
					type="default"
					class="commit-btn clear-btn-style flex-center"
					:class="[isAllAngle ? 'border-radius-style-all-arg' : 'border-radius-style-half-arg']"
					:style="{ background: configInfo.web_site_color, opacity: commitBtnLoadingState ? 0.8 : 1 }"
					:loading="commitBtnLoadingState"
					@click="$onceClick(commitFn)"
				>
					提交订单
				</button>
			</view>
		</view>
	</view>
</template>

<script>
import { host } from '@/tools/siteinfo.js';

import {
	assertObject,
	assertArray,
	checkTypeFn,
	transNumFn,
	toDoubleNumFn,
	bigMinus,
	bigPlus,
	validateFn,
	cloneFn
} from '@/tools/tools.js';
import {
	dispatchshangjia,
	dispatchmendian,
	dispatchdaodian,
	dispatchkuaidi,
	dispatchTypeIdEnum,
	clientPlatformEnum,
	xcx_wx,
	xcx_tt,
	browser_third,
	browser_wx,
	app_android,
	app_ios,
	ENVANDROID,
	ENVIOS,
	paymentTypeEnum,
	payment_zfb,
	payment_wx
} from '@/tools/const.js';
import userAddress from '@/pages/order/order-components/user-address.vue'; // 展示用户地址组件
import dotZitiModal from '@/pages/order/submit-order-components/dot-ziti-modal.vue'; // 多自提点列表模态框
import discountCouponModal from '@/pages/order/submit-order-components/discount-coupon-modal.vue'; // 优惠券模态框
import goodsCouponModal from '@/pages/order/submit-order-components/goods-coupon-modal.vue'; // 商品券模态框
import goodsInvalidModal from '@/pages/order/submit-order-components/goods-invalid-modal.vue'; // 提示商品失效模态框
import addressInvalidModal from '@/pages/order/submit-order-components/address-invalid-modal.vue'; // 提示距离远失效模态框
import dispatchType from '@/pages/order/submit-order-components/dispatch-type.vue'; // 配送方式
import sellerzitidianShow from '@/pages/order/submit-order-components/sellerzitidian-show.vue'; // 自营商家自提点
import duozitidianShow from '@/pages/order/submit-order-components/duozitidian-show.vue'; // 多自提点

import vipCard from '@/pages/order/order-components/vip-card.vue'; // 开通会员卡组件

import { getOneStorePageData } from './submit-order-fun/getOneStorePageData.js'; // 单门店获取页面数据
import { getMoreStorePageData } from './submit-order-fun/getMoreStorePageData.js'; // 多门店获取页面数据
import { getOneStoreToggleDispatchTypeDataFn } from './submit-order-fun/getOneStoreToggleDispatchTypeDataFn.js'; // 单门店切换配送方式
import { getMoreStoreToggleDispatchTypeDataFn } from './submit-order-fun/getMoreStoreToggleDispatchTypeDataFn.js'; // 多门店切换配送方式
import { createOrderFn, getPayDataFn } from '@/pages/order/submit-order-fun/order.js'; // 订单相关方法
import {
	userAdrs,
	sellerAdrs,
	zitiAdrs,
	dspcnow,
	dspcyvyue,
	yvyueTypeEnum,
	dispFeeHide,
	dispFeeShow0,
	dispFeeShow,
	dispFeeTypeEnum,
	oneModel,
	moreModel,
	storeType
} from '@/pages/order/submit-order-enum.js';
/*
	多门店版本 结算订单的三种状态
		只有自营门店
		自营门店 和 入驻门店 混合
		只有入驻门店
*/

const oneZiying = 'oneZiying',
	ziyingruzhu = 'ziyingruzhu',
	ruzhu = 'ruzhu';

export default {
	components: {
		userAddress,
		dotZitiModal,
		discountCouponModal,
		goodsCouponModal,
		goodsInvalidModal,
		addressInvalidModal,
		dispatchType,
		sellerzitidianShow,
		duozitidianShow,
		vipCard
	},
	data() {
		return {
			// ↓↓↓ 通用数据 ========================================================================================
			isShowLoading: true,
			// isShowLoading: false,

			// 设备的坐标数据
			/*
			long: 116.634539,
			lati: 39.908149,
			*/
			long: 0,
			lati: 0,

			// 地址相关
			addressIsSet: false, // 地址信息是否为空
			addressId: null, // id
			addressUserName: '', // 用户名
			addressUserTel: '', // 手机号
			addressTagName: '', // 标签
			addressText: '', // 地址文字
			addressCoordinate: '', // 经纬度

			// ↓↓↓ 自营商家自提点信息
			sellerImage: '', // 门店图片
			sellerName: '', // 门店名称
			sellerTel: '', // 联系电话
			sellerOpenTime: '', // 营业时间
			sellerAddress: '', // 门店地址

			duozitidianActive: 0, // 多自提点下标
			duozitidianList: [], // 多自提点列表
			dotZitiModalFlag: false, // 多自提点列表模态框

			beizhuInputOpacity: false, // 备注的input框透明度
			beizhuText: '', // 备注文字

			usernameText: '', // 自提收货人名字
			usertelText: '', // 自提收货人手机号

			commitBtnLoadingState: false, // 提交订单按钮状态

			yve: 0, // 余额

			isShowDiscountCouponModalFlag: false, // 优惠券模态框显示隐藏状态
			discountCouponList: [], // 优惠券列表
			discountCouponIndex: -1, // 当前优惠券索引

			isShowGoodsCouponModalFlag: false, // 商品券模态框显示隐藏状态
			goodsCouponList: [], // 商品券列表
			goodsCouponIndex: -1, // 当前商品券索引

			isUseYve: false, // 是否使用余额

			// ↓↓↓ 单门店数据 ========================================================================================

			dispatchTypeList: [], // 配送方式列表

			dispatchTypeActive: 0, // 配送方式下标

			isRange: false, // 是否在配送范围内
			dispFeeHide,
			dispFeeShow0,
			dispFeeShow,
			dispFeeType: '', // 配送费展示类型
			dispFeeTip: '', // 提示文字
			dispFeePriceText: '', // 配送费内容
			dispFeePriceNum: 0, // 实际配送费钱数

			dspcnow,
			dspcyvyue,
			ziyingYvyueType: '', // 自营预约类型
			ziyingYvyueText: '', // 自营预约立即送出字符串
			ziyingYvyueRangeDataArr: [], // 自营预约数据

			ziyingYvyueDayKey: 0, // 自营预约天索引
			ziyingYvyueTimeKey: 0, // 自营预约小时索引
			ziyingYvyueDayBeifenKey: 0, // 自营预约天备份索引
			ziyingYvyueTimeBeifenKey: 0, // 自营预约小时备份索引

			goodsList: [], // 自营商品列表
			loseGoodsList: [], // 自营失效商品列表

			invalidGoodsListIsShow: false, // 是否显示失效商品列表

			ziyingGoodsAllPrice: 0, // 自营商品金额
			ziyingGoodsDiscountsPrice: 0, // 自营商品优惠

			// 实付金额 = 商品总价 - 商品优惠 - 配送费 (不包含优惠券 商品券 配送费)
			shifu: 0,

			// 总计优惠金额(不包含优惠券和商品券)
			allDiscountsPrice: 0,

			// 实际的配送费

			// 实付商品价格 (商品价格 - 商品优惠) [是商品满折 满减后的钱数 不包括优惠券商品券优惠的金额 切换配送方式时传到后台去判断是否免配送费]
			shifuGoodsPrice: 0,

			// ↓↓↓ 多门店数据 ========================================================================================
			moreStoreData: {
				storeType: '', // 门店类型 全部门店all;  单个门店是门店id
				moreStoreList: [], // 所有门店数据
				isHasZiying: false, // moreStoreList是否有自营门店
				ziyingStoreIndex: false // moreStoreList的自营门店索引
			},

			moreStoreDispatchTypePickerRange: [], // 多店自营商家的配送方式
			moreStoreDispatchTypeBeifenActive: 0, // 多店自营商家的配送方式备份
			moreStoreDispatchTypeActive: 0, // 多店自营商家的配送方式索引

			isShowGoodsInvalidModalFlag: !true, // 商品失效商品提示框
			goodsInvalidInfo: {
				// 失效商品数据
				goodsList: [],
				title: ''
			},

			isShowAddressInvalidModalFlag: !true, // 地址失效商品提示框

			// ↓↓↓ 支付相关 ========================================================================================
			paymentTypeEnum,
			payment_zfb,
			payment_wx,
			currentPaymentType: '' // 当前选中的支付方式

			/*
			// ↓↓↓ 未在使用的data ========================================================================================
			// ↓↓↓ 如遇缺货相关
			quehuoPickerIndex: 0, // 当前选中索引
			quehuoPickerRange: [
				{ id: 0, name: '请选择缺货处理方式' },
				{ id: 19, name: '直接取消订单' },
				{ id: 20, name: '取消缺货商品' }
			], // 可选项

			// 开通会员卡相关
			vipOptionCardIsSelect: !false,
			vipOptionCardIsOpen: true,
			vipOptionCardId: 13,
			vipOptionCardName: '超级会员卡',
			vipOptionCardTagBgColor: '#181313',
			vipOptionCardTagIconImg:
				'https://wanxiangyouxian.oss-cn-beijing.aliyuncs.com//uploads/images/20210507/13619a5f379e2af12a3057dd069508ab.png',
			vipOptionCardTagText: '超级会员卡',
			vipOptionCardTagTextColor: '#3f97fc',
			vipOptionCardTipBgColor: '#ff3e20',
			vipOptionCardTipText: '勾选享优惠',
			vipOptionCardTipTextColor: '#f9f4f4',
			vipOptionCardTime: '1年',
			vipOptionCardPrice: 99
			*/
		};
	},
	onShow() {
		let that = this;
		if (that.gongyingshang) {
			that.moreStoreShowFn();
		} else {
			that.oneStoreShowFn();
		}
	},
	onLoad(options) {
		let that = this;
		console.log('submit-order load options', options);
		that.loadFn();
		if (that.gongyingshang) {
			that.moreStoreLoadFn(options);
		} else {
			that.oneStoreLoadFn();
		}
	},
	methods: {
		/*
			@description 根据收货地址id验证是否在配送范围内
			@param addressId <Number> 地址id
			@return Promise
		*/
		addressIsRange(addressId) {
			let that = this;
			return new Promise(async resFn => {
				let result = await that.$request({
					method: 'post',
					url: '/api/Orderbranch/orderDmio',
					data: {
						id: addressId
					}
				});
				if (result.statusCode == 200) {
					if (result.data.code == 200) {
						resFn({
							type: 'success'
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
		// 页面load
		loadFn() {
			let that = this;
			let { latitude, longitude } = assertObject(uni.getStorageSync('cartAddress'));
			that.long = longitude;
			that.lati = latitude;
			that.setDefaultPaymentTypeFn();
		},
		// 单门店版本页面show
		async oneStoreShowFn() {
			let that = this;
			// 获取选择的地址
			let temSelectAd = assertObject(uni.getStorageSync('temSelectAd'));
			if (Object.keys(temSelectAd).length) {
				that.addressIsSet = true;
				that.addressId = temSelectAd.id;
				that.addressUserName = temSelectAd.name;
				that.addressUserTel = temSelectAd.mobile;
				that.addressTagName = temSelectAd.tag;
				that.addressText = temSelectAd.address;
				that.addressCoordinate = temSelectAd.coordinate;
				if (dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == dispatchshangjia) {
					let addressIsRangeResult = await that.addressIsRange(that.addressId);
					if (addressIsRangeResult.type == 'success') {
						that.isRange = true;
					} else {
						that.isRange = false;
						that.hideAllFn();
						uni.showModal({
							showCancel: false,
							title: addressIsRangeResult.msg,
							success(e) {}
						});
					}
				}
				uni.setStorageSync('temSelectAd', '');
			}
		},
		// 多门店版本页面show
		async moreStoreShowFn() {
			let that = this;
			// 获取选择的地址
			let temSelectAd = assertObject(uni.getStorageSync('temSelectAd'));
			if (Object.keys(temSelectAd).length) {
				that.addressIsSet = true;
				that.addressId = temSelectAd.id;
				that.addressUserName = temSelectAd.name;
				that.addressUserTel = temSelectAd.mobile;
				that.addressTagName = temSelectAd.tag;
				that.addressText = temSelectAd.address;
				that.addressCoordinate = temSelectAd.coordinate;

				/*
					需要判断条件
						自营店 和 入驻店混合订单
						纯入驻店订单
					不用需要判断条件
						只有自营店一个时 并且 配送方式是 (到店自提 || 到点自提 || 快递配送)
				*/
				let isCheckRange;

				if (that.moreStoreOrderState == ruzhu || that.moreStoreOrderState == ziyingruzhu) {
					isCheckRange = true;
				} else {
					let check = {
						[dispatchshangjia]: true,
						[dispatchmendian]: false,
						[dispatchdaodian]: false,
						[dispatchkuaidi]: false
					};
					if (check[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
						isCheckRange = true;
					} else {
						isCheckRange = false;
					}
				}
				if (isCheckRange) {
					let addressIsRangeResult = await that.addressIsRange(that.addressId);
					if (addressIsRangeResult.type == 'success') {
						that.moreStoreData.moreStoreList.forEach(i => {
							i.isRange = true;
						});
					} else {
						that.moreStoreData.moreStoreList.forEach(i => {
							i.isRange = false;
						});
						that.hideAllFn();
						uni.showModal({
							showCancel: false,
							title: addressIsRangeResult.msg,
							success(e) {}
						});
					}
				}
				uni.setStorageSync('temSelectAd', '');
			}
		},

		// 单店 页面load运行
		async oneStoreLoadFn() {
			let that = this;
			let submitOrderPageDataResult = await getOneStorePageData(that, that.long, that.lati);
			console.log('load submitOrderPageDataResult', submitOrderPageDataResult);

			if (submitOrderPageDataResult.type == 'success') {
				let {
					dispatchTypeList,
					addressTypeText,
					userAdrs: userAdrsObject,
					sellerAdrs: sellerAdrsObject,
					zitiAdrs: zitiAdrsList,
					goodsList,
					loseGoodsList,
					yve,
					yvyueType,
					yvyueData,

					ziyingGoodsAllPrice,
					ziyingGoodsDiscountsPrice,
					shifu,
					allDiscountsPrice,

					shifuGoodsPrice,

					dispFeeType,
					dispFeeTip,
					dispFeePriceText,
					dispFeePriceNum,

					discountCouponList,
					discountCouponIndex,
					goodsCouponList,

					isRange
				} = submitOrderPageDataResult.result;
				that.dispatchTypeList = dispatchTypeList;

				let handleAddrFn = {
					[userAdrs]() {
						that.addressIsSet = userAdrsObject.addressIsSet;
						if (userAdrsObject.addressIsSet) {
							that.addressId = userAdrsObject.addressId;
							that.addressUserName = userAdrsObject.addressUserName;
							that.addressUserTel = userAdrsObject.addressUserTel;
							that.addressTagName = userAdrsObject.addressTagName;
							that.addressText = userAdrsObject.addressText;
							that.addressCoordinate = userAdrsObject.addressCoordinate;
						}
					},
					[sellerAdrs]() {
						that.sellerImage = sellerAdrsObject.sellerImage;
						that.sellerName = sellerAdrsObject.sellerName;
						that.sellerTel = sellerAdrsObject.sellerTel;
						that.sellerOpenTime = sellerAdrsObject.sellerOpenTime;
						that.sellerAddress = sellerAdrsObject.sellerAddress;
					},
					[zitiAdrs]() {
						that.duozitidianList = zitiAdrsList;
						if (zitiAdrsList.every(i => !i.isRange)) {
							that.duozitidianActive = 0;
						} else {
							that.duozitidianActive = zitiAdrsList.findIndex(i => i.isRange);
						}
					}
				};
				handleAddrFn[addressTypeText]();
				that.goodsList = goodsList;
				that.loseGoodsList = loseGoodsList;

				that.yve = yve;

				that.ziyingYvyueType = yvyueType;
				if (yvyueType == dspcnow) {
					that.ziyingYvyueText = yvyueData;
				} else {
					that.ziyingYvyueRangeDataArr = yvyueData;
				}

				that.ziyingGoodsAllPrice = ziyingGoodsAllPrice;
				that.ziyingGoodsDiscountsPrice = ziyingGoodsDiscountsPrice;
				that.shifu = shifu;
				that.allDiscountsPrice = allDiscountsPrice;

				that.dispFeeType = dispFeeType;
				that.dispFeeTip = dispFeeTip;
				that.dispFeePriceText = dispFeePriceText;
				that.dispFeePriceNum = dispFeePriceNum;

				that.discountCouponList = discountCouponList;
				that.discountCouponIndex = discountCouponIndex;
				that.goodsCouponList = goodsCouponList;

				that.shifuGoodsPrice = shifuGoodsPrice;
				that.isRange = isRange;

				if (!isRange) {
					uni.showModal({
						showCancel: false,
						title: submitOrderPageDataResult.msg
					});
				}
			} else {
				uni.showModal({
					showCancel: false,
					title: submitOrderPageDataResult.msg,
					success(e) {
						that.toBackFn();
					}
				});
			}
			that.isShowLoading = false;
		},

		// 设置配送方式
		async setDispatchTypeFn(index) {
			let that = this;
			that.dispatchTypeActive = index;

			that.ziyingYvyueDayKey = 0; // 自营预约天索引
			that.ziyingYvyueTimeKey = 0; // 自营预约小时索引

			that.hideAllFn();
			uni.showLoading();
			let toggleDispatchTypeResult = await getOneStoreToggleDispatchTypeDataFn(
				that,
				that.calcOneStoreDispatchTypeId,
				that.long,
				that.lati,
				that.shifuGoodsPrice
			);
			console.log('切换配送方式返回数据 getOneStoreToggleDispatchTypeDataFn()', toggleDispatchTypeResult);

			if (toggleDispatchTypeResult.type == 'success') {
				let {
					addressTypeText,
					userAdrs: userAdrsObject,
					sellerAdrs: sellerAdrsObject,
					zitiAdrs: zitiAdrsList,

					yvyueType,
					yvyueData,

					dispFeeType,
					dispFeeTip,
					dispFeePriceText,
					dispFeePriceNum,
					isRange
				} = toggleDispatchTypeResult.result;

				let handleAddrFn = {
					[userAdrs]() {
						if (!that.addressIsSet) {
							that.isRange = isRange;
							that.addressIsSet = userAdrsObject.addressIsSet;
							if (userAdrsObject.addressIsSet) {
								that.addressId = userAdrsObject.addressId;
								that.addressUserName = userAdrsObject.addressUserName;
								that.addressUserTel = userAdrsObject.addressUserTel;
								that.addressTagName = userAdrsObject.addressTagName;
								that.addressText = userAdrsObject.addressText;
								that.addressCoordinate = userAdrsObject.addressCoordinate;
							}
						}
					},
					[sellerAdrs]() {
						that.sellerImage = sellerAdrsObject.sellerImage;
						that.sellerName = sellerAdrsObject.sellerName;
						that.sellerTel = sellerAdrsObject.sellerTel;
						that.sellerOpenTime = sellerAdrsObject.sellerOpenTime;
						that.sellerAddress = sellerAdrsObject.sellerAddress;
					},
					[zitiAdrs]() {
						that.duozitidianList = zitiAdrsList;
						if (zitiAdrsList.every(i => !i.isRange)) {
							that.duozitidianActive = 0;
						} else {
							that.duozitidianActive = zitiAdrsList.findIndex(i => i.isRange);
						}
					}
				};
				handleAddrFn[addressTypeText]();

				that.ziyingYvyueType = yvyueType;
				if (yvyueType == dspcnow) {
					that.ziyingYvyueText = yvyueData;
				} else {
					that.ziyingYvyueRangeDataArr = yvyueData;
				}

				that.dispFeeType = dispFeeType;
				that.dispFeeTip = dispFeeTip;
				that.dispFeePriceText = dispFeePriceText;
				that.dispFeePriceNum = dispFeePriceNum;

				that.hideAllFn();
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: toggleDispatchTypeResult.msg
				});
			}
		},

		// 点击自营商家选配送方式picker组件
		moreStoreDispatchTypeClickFn() {
			this.moreStoreDispatchTypeBeifenActive = this.moreStoreDispatchTypeActive;
		},
		// 自营商家选配送方式取消时选默认
		moreStoreDispatchTypeCancelFn() {
			this.moreStoreDispatchTypeActive = this.moreStoreDispatchTypeBeifenActive;
		},
		// 多门店的自营商家切换配送方式
		async moreStoreDispatchTypeChangeFn(e) {
			let that = this;
			let {
				detail: { value }
			} = e;
			that.moreStoreDispatchTypeActive = value;

			let storeIsZiyingIndex = that.moreStoreData.moreStoreList.findIndex(i => i.storeIsZiying);
			let moreStoreZiying = that.moreStoreData.moreStoreList[storeIsZiyingIndex];

			let moreStoreToggleDispatchTypeResult = await getMoreStoreToggleDispatchTypeDataFn(
				that,
				that.calcMoreStoreDispatchTypeId,
				that.long,
				that.lati,
				moreStoreZiying.shifuGoodsPrice
			);

			console.log(
				'多门店模式的 自营店切换配送方式返回数据 moreStoreDispatchTypeChangeFn()',
				moreStoreToggleDispatchTypeResult
			);

			if (moreStoreToggleDispatchTypeResult.type == 'success') {
				let {
					addressTypeText,
					userAdrs: userAdrsObject,
					sellerAdrs: sellerAdrsObject,
					zitiAdrs: zitiAdrsList,

					yvyueType,
					yvyueData,

					dispFeeType,
					dispFeeTip,
					dispFeePriceText,
					dispFeePriceNum,
					isRange
				} = moreStoreToggleDispatchTypeResult.result;

				that.$set(that.moreStoreData.moreStoreList[that.moreStoreData.ziyingStoreIndex], 'isRange', isRange);

				if (!isRange) {
					uni.showModal({
						showCancel: false,
						title: moreStoreToggleDispatchTypeResult.msg,
						success(e) {
							//确认后的回调
						}
					});
				}

				let handleAddrFn = {
					[userAdrs]() {
						if (!that.addressIsSet) {
							that.addressIsSet = userAdrsObject.addressIsSet;
							if (userAdrsObject.addressIsSet) {
								that.addressId = userAdrsObject.addressId;
								that.addressUserName = userAdrsObject.addressUserName;
								that.addressUserTel = userAdrsObject.addressUserTel;
								that.addressTagName = userAdrsObject.addressTagName;
								that.addressText = userAdrsObject.addressText;
								that.addressCoordinate = userAdrsObject.addressCoordinate;
							}
						}
					},
					[sellerAdrs]() {
						that.$set(moreStoreZiying.sellerAdrs, 'sellerImage', sellerAdrsObject.sellerImage);
						that.$set(moreStoreZiying.sellerAdrs, 'sellerName', sellerAdrsObject.sellerName);
						that.$set(moreStoreZiying.sellerAdrs, 'sellerTel', sellerAdrsObject.sellerTel);
						that.$set(moreStoreZiying.sellerAdrs, 'sellerOpenTime', sellerAdrsObject.sellerOpenTime);
						that.$set(moreStoreZiying.sellerAdrs, 'sellerAddress', sellerAdrsObject.sellerAddress);
					},
					[zitiAdrs]() {
						moreStoreZiying.zitiAdrs = zitiAdrsList;
						that.duozitidianList = zitiAdrsList;
						if (zitiAdrsList.every(i => !i.isRange)) {
							that.duozitidianActive = 0;
						} else {
							that.duozitidianActive = zitiAdrsList.findIndex(i => i.isRange);
						}
					}
				};
				handleAddrFn[addressTypeText]();

				that.$set(moreStoreZiying, 'yvyueType', yvyueType);
				if (yvyueType == dspcnow) {
					that.$set(moreStoreZiying, 'yvyueText', yvyueData);
				} else {
					that.$set(moreStoreZiying, 'yvyueData', yvyueData);
					that.$set(moreStoreZiying, 'yvyueRangeDataArr', yvyueData);
				}
				/*
				console.log(moreStoreZiying.yvyueType);
				console.log(moreStoreZiying.yvyueText);
				console.log(moreStoreZiying.yvyueData);
				*/

				let ziyingStore = that.moreStoreData.moreStoreList[that.moreStoreData.ziyingStoreIndex];
				that.$set(ziyingStore, 'dispFeeType', dispFeeType);
				that.$set(ziyingStore, 'dispFeeTip', dispFeeTip);
				that.$set(ziyingStore, 'dispFeePriceText', dispFeePriceText);
				that.$set(ziyingStore, 'dispFeePriceNum', dispFeePriceNum);
				that.$set(ziyingStore, 'yvyueDayKey', 0);
				that.$set(ziyingStore, 'yvyueTimeKey', 0);
				

				that.$set(ziyingStore, 'isRange', isRange);

				that.hideAllFn();
			} else {
				that.hideAllFn();
				uni.showToast({
					icon: 'none',
					title: moreStoreToggleDispatchTypeResult.msg
				});
			}
		},
		// focus blur 事件修改备注透明度
		setBeizhuInputOpacityFn(bool) {
			this.beizhuInputOpacity = bool;
		},

		// 单门店 切换失效商品列表是否展示状态
		toggleOneStoreInvalidGoodsListFn(bool) {
			this.invalidGoodsListIsShow = !this.invalidGoodsListIsShow;
		},
		// 设置多自提点列表的显示隐藏状态
		setDotZitiModalFlagFn(bool) {
			this.dotZitiModalFlag = bool;
		},
		// 选择列表自提点的
		selectDotZitiFn(index) {
			let that = this;
			that.setDotZitiModalFlagFn(false);
			that.duozitidianActive = index;
		},
		// 选优惠券栏点击
		discountCouponLineClickFn() {
			let that = this;
			if (that.useDiscountCouponNum <= 0 && that.discountCouponList.length <= 0) {
				return false;
			}
			that.setDiscountCouponModalFlagFn(true);
		},
		// 设置优惠券模态框显示隐藏状态
		setDiscountCouponModalFlagFn(bool) {
			this.isShowDiscountCouponModalFlag = bool;
		},
		// 设置优惠券
		discountCouponItemClickFn(arg) {
			this.discountCouponIndex = arg;
		},

		// 选商品券栏点击
		goodsCouponLineClickFn() {
			let that = this;
			if (that.goodsCouponList.length <= 0) {
				return false;
			}
			that.setGoodsCouponModalFlagFn(true);
		},
		// 设置商品券模态框显示隐藏状态
		setGoodsCouponModalFlagFn(bool) {
			this.isShowGoodsCouponModalFlag = bool;
		},
		// 设置商品券
		goodsCouponItemClickFn(arg) {
			this.goodsCouponIndex = arg;
		},

		// 自营选择器点击
		ziyingPickerClickFn() {
			let that = this;
			console.log('自营选择器点击');
			that.ziyingYvyueDayBeifenKey = that.ziyingYvyueDayKey;
			that.ziyingYvyueTimeBeifenKey = that.ziyingYvyueTimeKey;
			that.ziyingYvyueDayKey = 0;
			that.ziyingYvyueTimeKey = 0;
		},
		// 自营选择配送时间取消
		ziyingPickerCancelFn() {
			let that = this;
			console.log('自营选择配送时间取消');
			that.ziyingYvyueDayKey = that.ziyingYvyueDayBeifenKey;
			that.ziyingYvyueTimeKey = that.ziyingYvyueTimeBeifenKey;
		},
		// 自营选择配送时间单列改变
		ziyingPickerColumnChangeFn(e) {
			let that = this;
			console.log('自营选择配送时间单列改变', e);
			let pickerColumnEnum = {
				0: 'ziyingYvyueDayKey',
				1: 'ziyingYvyueTimeKey'
			};
			let { column, value } = e.detail;

			let key = pickerColumnEnum[column];
			that[key] = value;
			if (key == 'ziyingYvyueDayKey') {
				that.ziyingYvyueTimeKey = 0;
			}
		},
		// 自营选择配送时间确认
		ziyingPickerChangeFn(e) {
			let that = this;
			console.log('自营选择配送时间确认', e);
			let [column1, column2] = e.detail.value;
			that.$set(that, 'ziyingYvyueDayKey', column1);
			that.$set(that, 'ziyingYvyueTimeKey', column2);
		},

		/*
			@description 单门店版本 提交前校验页面数据
			@return <Boolean>
				true  校验通过
				false 校验失败
		*/
		oneStoreValidateFn() {
			let that = this;
			/*
				商家配送
					必须有收货地址 && 当前自提点在配送范围内
				到店
					必须有自提人名字 手机号
				快递配送
					必须有收货地址
				到点配送
					必须有自提人名字 手机号 && 当前自提点在配送范围内
			*/
			// 商家配送
			if (dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == dispatchshangjia) {
				if (!that.addressIsSet) {
					uni.showToast({
						icon: 'none',
						title: '请选收货地址'
					});
					return false;
				}
				if (!that.isRange) {
					uni.showToast({
						icon: 'none',
						title: '不在配送范围内'
					});
					return false;
				}
			}

			// 到店
			if (dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == dispatchmendian) {
				let usernameValidate = validateFn.name('收货人名字', that.usernameText);
				if (!usernameValidate.validate) {
					uni.showToast({
						icon: 'none',
						title: usernameValidate.msg
					});
					return false;
				}
				let usertelValidate = validateFn.tel(that.usertelText);
				if (!usertelValidate.validate) {
					uni.showToast({
						icon: 'none',
						title: usertelValidate.msg
					});
					return false;
				}
			}

			// 快递
			if (dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == dispatchkuaidi) {
				if (!that.addressIsSet) {
					uni.showToast({
						icon: 'none',
						title: '请选收货地址'
					});
					return false;
				}
			}

			// 到点
			if (dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == dispatchdaodian) {
				if (!that.currentDuozitidianInfo.isRange) {
					uni.showToast({
						icon: 'none',
						title: '不在配送范围内'
					});
					return false;
				}
				let usernameValidate = validateFn.name('收货人名字', that.usernameText);
				if (!usernameValidate.validate) {
					uni.showToast({
						icon: 'none',
						title: usernameValidate.msg
					});
					return false;
				}
				let usertelValidate = validateFn.tel(that.usertelText);
				if (!usertelValidate.validate) {
					uni.showToast({
						icon: 'none',
						title: usertelValidate.msg
					});
					return false;
				}
			}
			return true;
		},
		// 提交订单单门店所需要的数据
		oneStoreOrderDataFn() {
			let that = this;
			// 单门店版本
			let oneStoreParams = {
				dispatchTypeId: that.calcOneStoreDispatchTypeId,
				beizhuText: that.beizhuText,
				dmio: 0
			};

			// 处理 dmio
			// 商家配送
			if (dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == dispatchshangjia) {
				oneStoreParams.dmio = that.addressId;
			}
			// 快递
			if (dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == dispatchkuaidi) {
				oneStoreParams.dmio = that.addressId;
			}

			// 到点
			if (dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId] == dispatchdaodian) {
				oneStoreParams.dmio = that.currentDuozitidianInfo.id;
			}

			// 根据当前的配送方式判断是否传预约配送时间
			let isSendYvyueTime = {
				[dispatchshangjia]: true,
				[dispatchmendian]: true,
				[dispatchdaodian]: true,
				[dispatchkuaidi]: false
			};
			// 预约配送时间
			if (isSendYvyueTime[dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId]]) {
				if (that.ziyingYvyueType == dspcyvyue) {
					oneStoreParams.yvyueTimeId =
						that.ziyingYvyueRangeDataArr[that.ziyingYvyueDayKey].timeList[that.ziyingYvyueTimeKey].timeId;
				} else {
					oneStoreParams.yvyueTimeId = 0;
				}
			} else {
				oneStoreParams.yvyueTimeId = 0;
			}
			// 使用的优惠券商品券
			if (that.discountCouponIndex >= 0) {
				oneStoreParams.discountCouponId =
					that.discountCouponList[that.discountCouponIndex].discountCouponUserId;
			} else {
				oneStoreParams.discountCouponId = 0;
			}
			if (that.goodsCouponIndex >= 0) {
				oneStoreParams.goodsCouponId = that.goodsCouponList[that.goodsCouponIndex].goodsCouponId;
			} else {
				oneStoreParams.goodsCouponId = 0;
			}

			// 自提人名手机号信息
			// 根据当前的配送方式判断是否传自提人信息
			let isSendUserNameTel = {
				[dispatchshangjia]: false,
				[dispatchmendian]: true,
				[dispatchdaodian]: true,
				[dispatchkuaidi]: false
			};
			if (isSendUserNameTel[dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId]]) {
				oneStoreParams.usernameText = that.usernameText;
				oneStoreParams.usertelText = that.usertelText;
			} else {
				oneStoreParams.usernameText = '';
				oneStoreParams.usertelText = '';
			}

			return {
				remark: oneStoreParams.beizhuText,
				coupon_id: oneStoreParams.discountCouponId,
				dm: oneStoreParams.dispatchTypeId,
				dmio: oneStoreParams.dmio,
				gc: oneStoreParams.goodsCouponId,
				username: oneStoreParams.usernameText,
				phone: oneStoreParams.usertelText,
				pt: oneStoreParams.yvyueTimeId
			};
		},

		// 单门店提交订单按钮
		async oneStoreCommitFn() {
			let that = this;
			let oneStoreValidateFlag = that.oneStoreValidateFn();
			if (!oneStoreValidateFlag) {
				that.commitBtnLoadingState = false;
				return false;
			}
			let data = that.oneStoreOrderDataFn();
			// data.pt = "2021-10-18 10:00~2021-10-18 10:30"
			console.log('单门店版本提交订单data', data);
			console.log('单门店版本提交订单JSON.stringify(data)', JSON.stringify(data));

			let orderResult = await createOrderFn(that, storeType.oneModel, data);
			if (orderResult.type == 'success') {
				if (orderResult.code == 200) {
					that.toPayFn(storeType.oneModel, orderResult.result);
				} else if (orderResult.code == 353209) {
					// 有失效商品
					that.goodsInvalidInfo.title = orderResult.msg;
					that.goodsInvalidInfo.goodsList = orderResult.result;
					that.isShowGoodsInvalidModalFlag = true;
				} else if (orderResult.code == 30302) {
					// 预约时间过时
					uni.showModal({
						showCancel: false,
						title: orderResult.msg,
						success(e) {
							//确认后的回调
							that.toBackFn();
						}
					});
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: orderResult.msg
				});
			}
			that.commitBtnLoadingState = false;
		},

		/*
			@description 多门店版本 提交前校验页面数据
			@return <Boolean>
				true  校验通过
				false 校验失败
		*/
		moreStoreValidateFn() {
			let that = this;
			/*
				有自营店
						只有自营店
							配送方式
								快递配送
								商家配送
									判断有无设置收货地址
										有收货地址
											判断是否在配送范围内
												在范围内 继续执行
												不在范围内  提示并return
										无收货地址
											提示并返回


						有自营店 有入驻门店
							判断有无设置收货地址
								有收货地址
									判断是否在配送范围内
										在范围内 继续执行
										不在范围内  提示并return
								无收货地址
									提示并返回


					到店
					到点
						判断有无设置提货人信息
							有提货人 继续执行
							无提货人 提示并返回

				无自营店
					判断有无设置收货地址
						有收货地址
							判断是否在配送范围内
								在范围内 继续执行
								不在范围内  提示并return
						无收货地址
							提示并返回
			*/
			// 有自营店
			if (that.moreStoreData.isHasZiying) {
				// 多门店版本 只有自营店商品
				if (that.moreStoreData.moreStoreList.length == 1) {
					if (
						dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == dispatchdaodian &&
						!that.currentDuozitidianInfo.isRange
					) {
						uni.showToast({
							icon: 'none',
							title: '不在配送范围内'
						});
						return false;
					}

					// 根据配送方式判断是否要有收货地址
					let assertAddressEnum = {
						[dispatchshangjia]: true,
						[dispatchmendian]: false,
						[dispatchdaodian]: false,
						[dispatchkuaidi]: true
					};
					if (assertAddressEnum[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
						if (that.addressIsSet) {
							// 根据配送方式判断是否要判断配送范围
							let checkRangeEnum = {
								[dispatchshangjia]: true,
								[dispatchmendian]: false,
								[dispatchdaodian]: false,
								[dispatchkuaidi]: false
							};
							if (
								checkRangeEnum[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]] &&
								that.moreStoreData.moreStoreList.some(i => !i.isRange)
							) {
								uni.showToast({
									icon: 'none',
									title: '不在配送范围内'
								});
								return false;
							}
						} else {
							uni.showToast({
								icon: 'none',
								title: '请选收货地址'
							});
							return false;
						}
					}
				} else {
					// 多门店版本 有自营 有入驻
					if (that.addressIsSet) {
						// 根据不同配送方式判断 是否在配送范围内
						/*
							商家配送
								所有isRange
							到店自提
								除自营店外 剩余入驻门店判断isRange
							快递配送
								除自营店外 剩余入驻门店判断isRange
							到点自提
								自营店判断当前自提点是否在配送范围内
								剩余入驻门店判断isRange
						*/
						// 商家配送
						if (
							dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == dispatchshangjia &&
							that.moreStoreData.moreStoreList.some(i => !i.isRange)
						) {
							uni.showToast({
								icon: 'none',
								title: '不在配送范围内'
							});
							return false;
						}

						let storeList = cloneFn(that.moreStoreData.moreStoreList);
						storeList.splice(that.moreStoreData.moreStoreList.ziyingStoreIndex, 1);

						// 到店自提
						if (dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == dispatchmendian) {
							if (storeList.some(i => !i.isRange)) {
								uni.showToast({
									icon: 'none',
									title: '不在配送范围内'
								});
								return false;
							}
						}
						// 快递自提
						if (dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == dispatchkuaidi) {
							if (storeList.some(i => !i.isRange)) {
								uni.showToast({
									icon: 'none',
									title: '不在配送范围内'
								});
								return false;
							}
						}
						// 到点自提
						if (dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == dispatchdaodian) {
							if (!that.currentDuozitidianInfo.isRange) {
								uni.showToast({
									icon: 'none',
									title: '不在配送范围内'
								});
								return false;
							}
							if (storeList.some(i => !i.isRange)) {
								uni.showToast({
									icon: 'none',
									title: '不在配送范围内'
								});
								return false;
							}
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: '请选收货地址'
						});
						return false;
					}
				}

				// 根据配送方式判断是否要有自提人信息
				let assertZitiinfoEnum = {
					[dispatchshangjia]: false,
					[dispatchmendian]: true,
					[dispatchdaodian]: true,
					[dispatchkuaidi]: false
				};
				if (assertZitiinfoEnum[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
					let usernameValidate = validateFn.name(
						'收货人名字',
						that.moreStoreData.moreStoreList[that.moreStoreData.ziyingStoreIndex].usernameText
					);
					if (!usernameValidate.validate) {
						uni.showToast({
							icon: 'none',
							title: usernameValidate.msg
						});
						return false;
					}

					let usertelValidate = validateFn.tel(
						that.moreStoreData.moreStoreList[that.moreStoreData.ziyingStoreIndex].usertelText
					);
					if (!usertelValidate.validate) {
						uni.showToast({
							icon: 'none',
							title: usertelValidate.msg
						});
						return false;
					}
				}
			} else {
				// 无自营店
				if (that.addressIsSet) {
					if (that.moreStoreData.moreStoreList.some(i => !i.isRange)) {
						uni.showToast({
							icon: 'none',
							title: '不在配送范围内'
						});
						return false;
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '请选收货地址'
					});
					return false;
				}
			}

			return true;
		},
		// 提交订单多门店所需要的数据
		moreStoreOrderDataFn() {
			let that = this;
			// 多门店数据
			let paramList = that.moreStoreData.moreStoreList.map(storeItem => {
				let moreStoreParams = {
					storeIsZiying: storeItem.storeIsZiying,
					storeId: storeItem.storeId,
					beizhuText: storeItem.beizhuText,
					dmio: 0
				};

				// 配送方式
				if (storeItem.storeIsZiying) {
					moreStoreParams.dispatchTypeId = that.calcMoreStoreDispatchTypeId;
				} else {
					moreStoreParams.dispatchTypeId = storeItem.dispatchTypeList[0].id;
				}

				// dmio
				if (storeItem.storeIsZiying) {
					// 根据当前的配送方式判断是否传多自提点id
					if (dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == dispatchshangjia) {
						moreStoreParams.dmio = that.addressId;
					}
					if (dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == dispatchdaodian) {
						moreStoreParams.dmio = that.currentDuozitidianInfo.id;
					}
					if (dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId] == dispatchkuaidi) {
						moreStoreParams.dmio = that.addressId;
					}
				} else {
					moreStoreParams.dmio = that.addressId;
				}

				// 预约配送时间
				if (storeItem.storeIsZiying) {
					// 根据当前的配送方式判断是否传预约配送时间
					let isSendYvyueTime = {
						[dispatchshangjia]: true,
						[dispatchmendian]: true,
						[dispatchdaodian]: true,
						[dispatchkuaidi]: false
					};
					if (isSendYvyueTime[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
						if (storeItem.yvyueType == dspcyvyue) {
							moreStoreParams.yvyueTimeId =
								storeItem.yvyueRangeDataArr[storeItem.yvyueDayKey].timeList[
									storeItem.yvyueTimeKey
								].timeId;
						} else {
							moreStoreParams.yvyueTimeId = 0;
						}
					} else {
						moreStoreParams.yvyueTimeId = 0;
					}
				} else {
					if (storeItem.yvyueType == dspcyvyue) {
						moreStoreParams.yvyueTimeId =
							storeItem.yvyueRangeDataArr[storeItem.yvyueDayKey].timeList[storeItem.yvyueTimeKey].timeId;
					} else {
						moreStoreParams.yvyueTimeId = 0;
					}
				}

				// 使用的优惠券商品券
				if (that.moreStoreData.isHasZiying && storeItem.storeIsZiying) {
					if (that.discountCouponIndex >= 0) {
						moreStoreParams.discountCouponId =
							that.discountCouponList[that.discountCouponIndex].discountCouponUserId;
					} else {
						moreStoreParams.discountCouponId = 0;
					}

					if (that.goodsCouponIndex >= 0) {
						moreStoreParams.goodsCouponId = that.goodsCouponList[that.goodsCouponIndex].goodsCouponId;
					} else {
						moreStoreParams.goodsCouponId = 0;
					}
				}
				// 自提人名手机号信息
				if (that.moreStoreData.isHasZiying && storeItem.storeIsZiying) {
					// 根据当前的配送方式判断是否传自提人信息
					let isSendUserNameTel = {
						[dispatchshangjia]: false,
						[dispatchmendian]: true,
						[dispatchdaodian]: true,
						[dispatchkuaidi]: false
					};
					if (isSendUserNameTel[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
						moreStoreParams.usernameText = storeItem.usernameText;
						moreStoreParams.usertelText = storeItem.usertelText;
					} else {
						moreStoreParams.usernameText = '';
						moreStoreParams.usertelText = '';
					}
				}
				return moreStoreParams;
			});

			return paramList.map(i => {
				let paramsInfo = {
					supp_id: i.storeId,
					dm: i.dispatchTypeId,
					pt: i.yvyueTimeId,
					remark: i.beizhuText,
					dmio: i.dmio
				};
				if (i.storeIsZiying) {
					paramsInfo.coupon_id = i.discountCouponId;
					paramsInfo.gc = i.goodsCouponId;
					paramsInfo.username = i.usernameText;
					paramsInfo.phone = i.usertelText;
				}
				return paramsInfo;
			});
		},

		// 多门店提交订单按钮
		async moreStoreCommitFn() {
			let that = this;
			let moreStoreValidateFlag = that.moreStoreValidateFn();

			if (!moreStoreValidateFlag) {
				that.commitBtnLoadingState = false;
				return false;
			}

			let data = that.moreStoreOrderDataFn();

			// data[0].pt = '2021-10-26 12:30~2021-10-26 13:00';

			console.log('多门店版本提交订单data', data);
			console.log('多门店版本提交订单JSON.stringify(data)', JSON.stringify(data));
			/* 
			that.commitBtnLoadingState = false;
			return false;
			 */

			let orderResult = await createOrderFn(that, storeType.moreModel, data);
			console.log('createOrderFn 生成订单方法返回数据', orderResult);

			if (orderResult.type == 'success') {
				if (orderResult.code == 200) {
					// 正常
					that.toPayFn(storeType.moreModel, orderResult.result);
				} else if (orderResult.code == 353209) {
					// 有失效商品
					that.goodsInvalidInfo.title = orderResult.msg;
					that.goodsInvalidInfo.goodsList = orderResult.result;
					that.isShowGoodsInvalidModalFlag = true;
				} else if (orderResult.code == 30302) {
					// 预约时间过时
					uni.showModal({
						showCancel: false,
						title: orderResult.msg,
						success(e) {
							//确认后的回调
							that.toBackFn();
						}
					});
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: orderResult.msg
				});
			}
			that.commitBtnLoadingState = false;
			console.log('that.commitBtnLoadingState', that.commitBtnLoadingState);
		},
		// 校验当前平台是否开通对应的支付渠道
		validatePaymentTypeFn() {
			let that = this;
			if (!that.currentPaymentType) {
				if (that.yve >= that.orderShifu && that.isUseYve) {
					return true;
				} else {
					if (that.isUseYve) {
						uni.showToast({
							icon: 'none',
							title: '余额不足'
						});
						return false;
					} else {
						uni.showToast({
							icon: 'none',
							title: '平台未开通支付渠道'
						});
						return false;
					}
				}
			} else {
				return true;
			}
		},

		// 提交按钮点击
		commitFn() {
			let that = this;

			if (that.commitBtnLoadingState) {
				return false;
			}
			that.commitBtnLoadingState = true;

			if (!that.validatePaymentTypeFn()) {
				that.commitBtnLoadingState = false;
				return false;
			}
			if (that.gongyingshang) {
				that.moreStoreCommitFn();
			} else {
				that.oneStoreCommitFn();
			}
		},
		// 生成订单后(调用支付接口前)把项目里其他页面商品列表的加购数量归零
		setGoodsNumFn() {
			let that = this;
			let goodsIdList = [];
			if (that.gongyingshang) {
				that.moreStoreData.moreStoreList.forEach(i => {
					i.goodsList.forEach(j => {
						goodsIdList.push(j.goodsId);
					});
				});
			} else {
				that.goodsList.forEach(j => {
					goodsIdList.push(j.goodsId);
				});
			}
			goodsIdList.forEach(i => {
				uni.$emit('goodsAddCartEd', {
					goodsId: i,
					selectedNum: 0
				});
			});
		},
		// 支付操作
		async toPayFn(model, orderId) {
			let that = this;
			that.setGoodsNumFn();

			let platform;
			// #ifdef MP-WEIXIN
			platform = xcx_wx;
			// #endif
			// #ifdef H5
			if (that.globalBrowserIsWx) {
				platform = browser_wx;
			} else {
				platform = browser_third;
			}
			// #endif

			// #ifdef APP-PLUS
			if (that.appenv == ENVANDROID) {
				platform = app_android;
			} else if (that.appenv == ENVIOS) {
				platform = app_ios;
			}
			// #endif

			let payDataResult = await getPayDataFn(
				that,
				model,
				orderId,
				platform,
				that.currentPaymentType ? that.currentPaymentType : payment_wx,
				that.isUseYve
			);
			console.log('payDataResult ', payDataResult);

			if (payDataResult.type == 'success') {
				let handleFn = {
					[2099]() {
						// 2099 是余额支付成功 直接跳转订单页面
						that.navigateToFn({
							type: 'redirectTo',
							url: `/pages/my/dingdan/index?act=0`
						});
					},
					[200]() {
						// #ifdef MP-WEIXIN
						// 200 拉起客户端支付
						let payMentOptions = {
							...payDataResult.result,
							provider: 'wxpay',
							orderInfo: payDataResult.result,
							success(e) {
								console.log('uni.requestPayment 成功', e);
								that.navigateToFn({
									type: 'redirectTo',
									url: `/pages/my/dingdan/index?act=0`
								});
							},
							fail(e) {
								console.log('uni.requestPayment 失败', e);
								uni.showModal({
									title: '订单未支付,是否继续支付',
									success(e) {
										if (e.confirm) {
											that.requestPaymentFn(payMentOptions);
										} else {
											that.navigateToFn({
												type: 'redirectTo',
												url: `/pages/my/dingdan/index?act=0`
											});
										}
									}
								});
							}
						};
						that.requestPaymentFn(payMentOptions);
						// #endif

						// #ifdef APP-PLUS
						// 200 拉起客户端支付
						// 微信支付
						if (payment_wx == that.currentPaymentType) {
							let payMentOptions = {
								...payDataResult.result,
								provider: 'wxpay',
								orderInfo: payDataResult.result,
								success(e) {
									console.log('uni.requestPayment 成功', e);
									that.navigateToFn({
										type: 'redirectTo',
										url: `/pages/my/dingdan/index?act=0`
									});
								},
								fail(e) {
									console.log('uni.requestPayment 失败', e);
									uni.showModal({
										title: '订单未支付,是否继续支付',
										success(e) {
											if (e.confirm) {
												that.requestPaymentFn(payMentOptions);
											} else {
												that.navigateToFn({
													type: 'redirectTo',
													url: `/pages/my/dingdan/index?act=0`
												});
											}
										}
									});
								}
							};
							console.log('app微信支付 uni.requestPayment 参数', payMentOptions);
							that.requestPaymentFn(payMentOptions);
						} else if (payment_zfb == that.currentPaymentType) {
							// 支付宝支付
							let payMentOptions = {
								orderInfo: payDataResult.result,
								provider: 'alipay',
								success(e) {
									console.log('uni.requestPayment 成功', e);
									that.navigateToFn({
										type: 'redirectTo',
										url: `/pages/my/dingdan/index?act=0`
									});
								},
								fail(e) {
									console.log('uni.requestPayment 失败', e);
									uni.showModal({
										title: '订单未支付,是否继续支付',
										success(e) {
											if (e.confirm) {
												that.requestPaymentFn(payMentOptions);
											} else {
												that.navigateToFn({
													type: 'redirectTo',
													url: `/pages/my/dingdan/index?act=0`
												});
											}
										}
									});
								}
							};
							console.log('app支付宝支付 uni.requestPayment 参数', payMentOptions);
							that.requestPaymentFn(payMentOptions);
						}
						// #endif

						// #ifdef H5
						// 200 拉起客户端支付

						if (that.globalBrowserIsWx) {
							// 公众号支付
							function paymentFn(opt) {
								WeixinJSBridge.invoke('getBrandWCPayRequest', opt, function(res) {
									console.log('jweixinModule.invoke 结果', res);
									if (res.err_msg == 'get_brand_wcpay_request:ok') {
										that.navigateToFn({
											type: 'redirectTo',
											url: `/pages/my/dingdan/index?act=0`
										});
									} else {
										uni.showModal({
											title: '订单未支付,是否继续支付',
											success(e) {
												if (e.confirm) {
													paymentFn(opt);
												} else {
													that.navigateToFn({
														type: 'redirectTo',
														url: `/pages/my/dingdan/index?act=0`
													});
												}
											}
										});
									}
								});
							}
							console.log('公众号支付参数', payDataResult.result);
							paymentFn(payDataResult.result);
						} else {
							// 普通浏览器支付
							let redirectUrl = encodeURIComponent(`${host}/h5/#/pages/my/dingdan/index?act=0`);
							let url = `${payDataResult.result}&redirect_url=${redirectUrl}`;
							setTimeout(() => {
								location.href = url;
							});
							that.toBackFn();
						}

						// #endif
					}
				};
				handleFn[payDataResult.code]();
			} else {
				uni.showToast({
					icon: 'none',
					title: payDataResult.msg
				});
			}
		},
		// 拉起客户端支付
		requestPaymentFn(opt) {
			uni.requestPayment(opt);
		},
		// 进入页面后设置默认的支付方式
		setDefaultPaymentTypeFn() {
			let that = this;
			// #ifdef MP-WEIXIN
			if (that.showPaymentType.wx) {
				that.setPaymentType(payment_wx);
			}
			// #endif
			// #ifdef H5
			if (that.showPaymentType.wx) {
				that.setPaymentType(payment_wx);
			}
			// #endif
			// #ifdef APP-PLUS

			if (that.showPaymentType.wx) {
				that.setPaymentType(payment_wx);
			} else if (that.showPaymentType.zfb) {
				that.setPaymentType(payment_zfb);
			}
			// #endif
		},
		// 设置支付方式
		setPaymentType(type) {
			this.currentPaymentType = type;
		},
		// 切换抵扣余额
		toggleUseYveFn(e) {
			this.isUseYve = e.detail.value;
		},
		// ↓↓↓ 多门店相关方法=================================================================================
		// 多店 页面load运行
		async moreStoreLoadFn(options) {
			let that = this;
			let thatMoreStoreData = that.moreStoreData;
			thatMoreStoreData.storeType = options.storeType;

			let getMoreStorePageDataResult = await getMoreStorePageData(
				that,
				that.long,
				that.lati,
				thatMoreStoreData.storeType
			);

			console.log('getMoreStorePageDataResult', getMoreStorePageDataResult);

			if (getMoreStorePageDataResult.type == 'success') {
				let {
					yve,

					addressIsSet,
					addressId,
					addressUserName,
					addressUserTel,
					addressTagName,
					addressText,
					addressCoordinate,

					moreStoreList,

					isHasZiying,

					discountCouponList,
					discountCouponIndex,
					goodsCouponList,

					allDiscountsPrice,
					shifu
				} = getMoreStorePageDataResult.result;

				thatMoreStoreData.moreStoreList = moreStoreList;
				thatMoreStoreData.isHasZiying = isHasZiying;
				if (isHasZiying) {
					thatMoreStoreData.ziyingStoreIndex = moreStoreList.findIndex(i => i.storeIsZiying);
				} else {
					thatMoreStoreData.ziyingStoreIndex = -1;
				}

				if (moreStoreList.some(i => !i.isRange)) {
					uni.showModal({
						showCancel: false, //不显示取消按钮
						title: getMoreStorePageDataResult.msg,
						success(e) {
							//确认后的回调
						}
					});
				}

				// 配送方式
				if (isHasZiying) {
					let { dispatchTypeList } = moreStoreList[thatMoreStoreData.ziyingStoreIndex];
					that.moreStoreDispatchTypeBeifenActive = 0;
					that.moreStoreDispatchTypeActive = 0;
					that.moreStoreDispatchTypePickerRange = dispatchTypeList;
				}

				// 根据不同配送方式判断是否使用 门店数据里的 地址信息
				let isUseAdrs = {
					[dispatchshangjia]: true,
					[dispatchmendian]: false,
					[dispatchdaodian]: false,
					[dispatchkuaidi]: true
				};

				if (isHasZiying && isUseAdrs[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]]) {
					let addressObject = moreStoreList[thatMoreStoreData.ziyingStoreIndex].userAdrs;

					that.addressIsSet = addressObject.addressIsSet;
					that.addressId = addressObject.addressId;
					that.addressUserName = addressObject.addressUserName;
					that.addressUserTel = addressObject.addressUserTel;
					that.addressTagName = addressObject.addressTagName;
					that.addressText = addressObject.addressText;
					that.addressCoordinate = addressObject.addressCoordinate;
				} else {
					that.addressIsSet = addressIsSet;
					that.addressId = addressId;
					that.addressUserName = addressUserName;
					that.addressUserTel = addressUserTel;
					that.addressTagName = addressTagName;
					that.addressText = addressText;
					that.addressCoordinate = addressCoordinate;
				}

				that.yve = yve;
				that.shifu = shifu;
				that.allDiscountsPrice = allDiscountsPrice;

				// 优惠券商品券
				if (isHasZiying) {
					that.discountCouponList = discountCouponList;
					that.discountCouponIndex = discountCouponIndex;
					that.goodsCouponList = goodsCouponList;
				}

				// 多自提点
				if (isHasZiying) {
					if (moreStoreList[thatMoreStoreData.ziyingStoreIndex].addressTypeText == zitiAdrs) {
						that.duozitidianList = moreStoreList[thatMoreStoreData.ziyingStoreIndex].zitiAdrs; // 多自提点列表
						if (that.duozitidianList.every(i => !i.isRange)) {
							that.duozitidianActive = 0;
						} else {
							that.duozitidianActive = that.duozitidianList.findIndex(i => i.isRange); // 多自提点下标
						}
					}
				}
			} else {
				uni.showModal({
					showCancel: false,
					title: getMoreStorePageDataResult.msg,
					success(e) {
						that.toBackFn();
					}
				});
			}
			that.isShowLoading = false;
		},

		// 多门店 切换失效商品列表是否展示状态
		toggleMoreStoreInvalidGoodsListFn(storeItem) {
			storeItem.invalidGoodsListIsShow = !storeItem.invalidGoodsListIsShow;
		},

		// 多门店选择配送时间确认
		moreStroePickerChangeFn(e, ite, ind) {
			let that = this;
			console.log('多门店选择配送时间确认', e);
			let [column1, column2] = e.detail.value;
			that.$set(ite, 'yvyueDayKey', column1);
			that.$set(ite, 'yvyueTimeKey', column2);
		},

		// 多门店选择器点击
		moreStroePickerClickFn(e, ite, ind) {
			console.log('多门店选择器点击');
			ite.yvyueDayBeifenKey = ite.yvyueDayKey;
			ite.yvyueTimeBeifenKey = ite.yvyueTimeKey;
			ite.yvyueDayKey = 0;
			ite.yvyueTimeKey = 0;
		},

		// 多门店选择配送时间取消
		moreStroePickerCancelFn(e, ite, ind) {
			console.log('多门店选择配送时间取消');
			ite.yvyueDayKey = ite.yvyueDayBeifenKey;
			ite.yvyueTimeKey = ite.yvyueTimeBeifenKey;
		},

		// 多门店选择配送时间单列改变
		moreStroePickerColumnChangeFn(e, ite, ind) {
			let that = this;
			console.log('多门店选择配送时间单列改变', e);
			let pickerColumnEnum = {
				0: 'yvyueDayKey',
				1: 'yvyueTimeKey'
			};
			let { column, value } = e.detail;

			let key = pickerColumnEnum[column];

			ite[key] = value;
			if (key == 'yvyueDayKey') {
				ite.yvyueTimeKey = 0;
			}
			console.log(`
				pickerColumnEnum: ${JSON.stringify(pickerColumnEnum)}
				column: ${column}
				value: ${value}
				key: ${key}
			`);
		},
		// 多门店备注框 focus blur 事件修改透明度
		setMoreStoreBeizhuInputOpacityFn(bool, storeItem, storeIndex) {
			storeItem.beizhuInputOpacity = bool;
		}
		/*
		// 选择会员卡
		selectVipOptionCardFn(e) {
			let that = this;
			that.vipOptionCardIsSelect = e;
			// codeing .... 使用切换会员卡
		},
	   // 缺货的Picker组件取消
	   quehuoPickerCancelFn() {
	   	this.quehuoPickerIndex = 0;
	   },
	   // 缺货的Picker组件确认
	   quehuoPickerChangeFn(e) {
	   	let {
	   		detail: { value }
	   	} = e;
	   	this.quehuoPickerIndex = value;
	   },
	   */
		// ↑↑↑ methods结束
	},
	computed: {
		// 单店版本-当前的配送方式对应的id
		calcOneStoreDispatchTypeId() {
			let that = this;
			return assertObject(that.dispatchTypeList[that.dispatchTypeActive]).id;
		},
		// 单店版本-用户地址框是否显示
		oneStoreCalcIsShowAddress() {
			let isShowEnum = {
				[dispatchshangjia]: true,
				[dispatchmendian]: false,
				[dispatchdaodian]: false,
				[dispatchkuaidi]: true
			};
			return isShowEnum[dispatchTypeIdEnum[this.calcOneStoreDispatchTypeId]];
		},
		// 单店版本-根据当前配送方式 返回是否要展示预约配送组件
		oneStoreCalcIsShowYvyueComp() {
			let that = this;
			let dispatchTypeIdText = dispatchTypeIdEnum[that.calcOneStoreDispatchTypeId];

			// 不同配送方式对应的状态
			let isShowEnum = {
				dispatchshangjia: true, // 商家配送
				dispatchmendian: true, // 门店自提
				dispatchdaodian: true, // 到点自提
				dispatchkuaidi: false // 快递
			};
			return isShowEnum[dispatchTypeIdText];
		},
		// 当前选中的多自提点
		currentDuozitidianInfo() {
			return this.duozitidianList[this.duozitidianActive];
		},
		/*
			@description
				多自提点列表是否全部 不在范围内
			@return <Boolean>
				返回 false 表示 有可用的自提点在范围内
				返回 true 表示 没有可用的自提点在范围内
		*/
		duozitidianIsAllNotRange() {
			return this.duozitidianList.every(i => !i.isRange);
		},

		// 自营平台的商家自提点是否显示
		ziyingCalcIsShowShangjiazitidian() {
			let isShowEnum = {
				[dispatchshangjia]: false,
				[dispatchmendian]: true,
				[dispatchdaodian]: false,
				[dispatchkuaidi]: false
			};
			return isShowEnum[dispatchTypeIdEnum[this.calcOneStoreDispatchTypeId]];
		},
		// 自营平台的多点自提是否显示
		ziyingCalcIsShowDuodian() {
			let isShowEnum = {
				[dispatchshangjia]: false,
				[dispatchmendian]: false,
				[dispatchdaodian]: true,
				[dispatchkuaidi]: false
			};
			return isShowEnum[dispatchTypeIdEnum[this.calcOneStoreDispatchTypeId]];
		},
		// 自营平台的提交 提货人 信息的两个input框是否显示
		ziyingCalcIsShowSubmitInput() {
			let isShowEnum = {
				[dispatchshangjia]: false,
				[dispatchmendian]: true,
				[dispatchdaodian]: true,
				[dispatchkuaidi]: false
			};
			return isShowEnum[dispatchTypeIdEnum[this.calcOneStoreDispatchTypeId]];
		},

		// 自营预约Range数据
		ziyingYvyueRange() {
			let that = this;
			return [
				that.ziyingYvyueRangeDataArr,
				assertObject(that.ziyingYvyueRangeDataArr[that.ziyingYvyueDayKey]).timeList
			];
		},
		// 使用商品券減掉的金额
		useGoodsCouponPrice() {
			let that = this;
			if (that.goodsCouponList.length && that.goodsCouponIndex >= 0) {
				// 可以使用商品券抵扣的钱数 = 实付 - 优惠券优惠钱数
				let shifu;
				if (that.gongyingshang) {
					shifu = that.moreStoreData.moreStoreList[that.moreStoreData.ziyingStoreIndex].shifuGoodsPrice;
				} else {
					shifu = that.shifu;
				}
				let canUseGoodsCouponPrice = bigMinus(shifu, that.useDiscountCouponPrice);

				let goodsCouponPrice = assertObject(that.goodsCouponList[that.goodsCouponIndex]).goodsCouponPrice; // 商品券面值
				// 面值 >= 可抵扣的钱 ? 返回已抵扣的 : 面值
				if (goodsCouponPrice >= canUseGoodsCouponPrice) {
					return canUseGoodsCouponPrice;
				}
				return goodsCouponPrice;
			}
			return 0;
		},
		// 使用优惠券減掉的金额
		useDiscountCouponPrice() {
			let that = this;
			if (that.useDiscountCouponNum && that.discountCouponIndex >= 0) {
				return assertObject(that.discountCouponList[that.discountCouponIndex]).useCouponPrice;
			}
			return 0;
		},
		// 当前可用优惠券的数量
		useDiscountCouponNum() {
			return this.discountCouponList.filter(i => i.discountCouponIsUse).length;
		},
		// 订单实付金额 = 商品实付金额 - 商品券 - 优惠券 + 配送费
		orderShifu() {
			let that = this;
			// 商品券 和 优惠券 总优惠的金额
			let couponsPrice = toDoubleNumFn(
				bigPlus(transNumFn(that.useDiscountCouponPrice), transNumFn(that.useGoodsCouponPrice))
			);

			// console.log('orderShifu couponsPrice',couponsPrice);

			let shifu;
			if (couponsPrice >= that.shifu) {
				shifu = 0;
			} else {
				// 实付金额-俩券优惠的金额
				shifu = bigMinus(transNumFn(that.shifu), transNumFn(couponsPrice));
			}

			// 配送费
			let dispFeePriceNum = 0;
			if (that.gongyingshang && that.moreStoreData.isHasZiying) {
				let storeIsZiyingIndex = that.moreStoreData.moreStoreList.findIndex(i => i.storeIsZiying);
				dispFeePriceNum = that.moreStoreData.moreStoreList[storeIsZiyingIndex].dispFeePriceNum;
			} else {
				dispFeePriceNum = that.dispFeePriceNum;
			}

			// 实付金额 + 配送费
			shifu = bigPlus(transNumFn(shifu), transNumFn(dispFeePriceNum));

			return transNumFn(toDoubleNumFn(shifu));
		},
		// 视图上展示的实付金额 = orderShifu - 余额抵扣
		viewShowOrderShifu() {
			let that = this;
			if (that.isUseYve) {
				if (that.yve >= that.orderShifu) {
					return 0;
				} else {
					return bigMinus(that.orderShifu, that.yve);
				}
			}
			return that.orderShifu;
		},
		// 订单总计优惠金额 = 商品券 + 优惠券 + 商品优惠
		orderDiscountsPrice() {
			let that = this;
			// 商品券 和 优惠券 总优惠的金额
			let couponsPrice = toDoubleNumFn(
				bigPlus(transNumFn(that.useDiscountCouponPrice), transNumFn(that.useGoodsCouponPrice))
			);
			// 俩券 + 商品优惠

			return bigPlus(transNumFn(couponsPrice), transNumFn(that.allDiscountsPrice));
		},
		// ↓↓↓ 多门店相关计算属性============================================================================================================

		/*
			多店版本-结算订单的三种状态
				只有自营门店
				自营门店 和 入驻门店 混合
				只有入驻门店
		*/
		moreStoreOrderState() {
			let that = this;
			if (that.gongyingshang) {
				if (that.moreStoreData.isHasZiying) {
					if (that.moreStoreData.moreStoreList.length == 1) {
						return oneZiying;
					} else {
						return ziyingruzhu;
					}
				} else {
					return ruzhu;
				}
			} else {
				return '';
			}
		},
		// 多店版本-当前选的配送方式对应的id
		calcMoreStoreDispatchTypeId() {
			let that = this;
			return assertObject(that.moreStoreDispatchTypePickerRange[that.moreStoreDispatchTypeActive]).id;
		},
		// 多店版本-用户收货地址框是否显示
		moreStoreCalcIsShowAddress() {
			let that = this;
			let ziyingStoreNum = 0,
				ruzhuStoreNum = 0;
			that.moreStoreData.moreStoreList.forEach(i => {
				if (i.storeIsZiying) {
					ziyingStoreNum++;
				} else {
					ruzhuStoreNum++;
				}
			});

			if (ruzhuStoreNum > 0) {
				return true;
			} else {
				let isShowEnum = {
					[dispatchshangjia]: true,
					[dispatchmendian]: false,
					[dispatchdaodian]: false,
					[dispatchkuaidi]: true
				};
				return isShowEnum[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]];
			}
		},
		// 多店版本-各店是否显示预约组件
		isShowMoreStoreYvyueComp() {
			let that = this;
			return storeItem => {
				if (storeItem.storeIsZiying) {
					// 不同配送方式对应的状态
					let isShowEnum = {
						[dispatchshangjia]: true, // 商家配送
						[dispatchmendian]: true, // 门店自提
						[dispatchdaodian]: true, // 到点自提
						[dispatchkuaidi]: false // 快递
					};
					return isShowEnum[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]];
				} else {
					return true;
				}
			};
		},
		// 多店版本-各个门店预约组件Range数据
		moreStoreYvyueRange() {
			return storeItem => {
				return [
					storeItem.yvyueRangeDataArr,
					assertObject(storeItem.yvyueRangeDataArr[storeItem.yvyueDayKey]).timeList
				];
			};
		},
		// 多店版本-自营店的提交 提货人 信息的两个input框是否显示
		moreStoreCalcIsShowSubmitInput() {
			let that = this;
			return storeItem => {
				if (storeItem.storeIsZiying) {
					let isShowEnum = {
						[dispatchshangjia]: false,
						[dispatchmendian]: true,
						[dispatchdaodian]: true,
						[dispatchkuaidi]: false
					};
					return isShowEnum[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]];
				}
				return false;
			};
		},

		// 多店版本-自营店的商家自提点是否显示
		moreStoreCalcIsShowShangjiazitidian() {
			let that = this;
			return storeItem => {
				let isShowEnum = {
					[dispatchshangjia]: false,
					[dispatchmendian]: true,
					[dispatchdaodian]: false,
					[dispatchkuaidi]: false
				};
				return storeItem.storeIsZiying && isShowEnum[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]];
			};
		},
		// 多店版本-自营店的多点自提是否显示
		moreStoreCalcIsShowDuodian() {
			let that = this;
			return storeItem => {
				let isShowEnum = {
					[dispatchshangjia]: false,
					[dispatchmendian]: false,
					[dispatchdaodian]: true,
					[dispatchkuaidi]: false
				};
				return storeItem.storeIsZiying && isShowEnum[dispatchTypeIdEnum[that.calcMoreStoreDispatchTypeId]];
			};
		},
		/*
			@description 
				根据后台开通的支付选项和当前客户端平台类型 判断 页面是否显示 微信支付 和 支付宝支付 选项
			@return <Object>
				{
					wx: true, 
					zfb: false
				}
		*/
		showPaymentType() {
			let that = this;
			let isShow = {
				wx: false,
				zfb: false
			};

			// #ifdef MP-WEIXIN
			if (that.calcWeixinPayMiniprogram) {
				isShow.wx = true;
			}
			// #endif

			// #ifdef H5
			if (that.globalBrowserIsWx) {
				if (that.calcWeixinofficialaccount) {
					isShow.wx = true;
				}
			} else {
				if (that.calcWeixinPayH5) {
					isShow.wx = true;
				}
			}

			// #endif

			// #ifdef APP-PLUS
			if (that.calcWeixinPayAndroidApp) {
				isShow.wx = true;
			}
			if (that.calcZhifubaoPayAndroidApp) {
				isShow.zfb = true;
			}
			// #endif
			return isShow;
		}
	}
};
</script>
<style lang="scss" scoped>
.red-price {
	color: #fe5127 !important;
}
.root-page {
	padding-top: 10rpx;
	.seller-list-wrap {
		.seller-item-wrap {
			overflow: hidden;
			.show-seller-item {
				margin: 10rpx 24rpx;
				border-radius: 20rpx;
				overflow: hidden;
				background: #ffffff;
				.seller-info-block {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 0 22rpx;
					height: 98rpx;
					border-bottom: 1px solid #f5f5f5;
					.seller-name-block {
						width: 540rpx;
						.seller-logo-image-wrap {
							display: inline-block;
							margin-right: 8rpx;
							width: 30rpx;
							height: 30rpx;
							border-radius: 10rpx;
							overflow: hidden;
							font-size: 0;
							vertical-align: middle;
						}
						.seller-name-text {
							display: inline-block;
							width: 502rpx;
							font-size: 26rpx;
							color: #0e0e10;
							vertical-align: middle;
						}
					}
					.dispatch-title {
						width: 118rpx;
						background: #f1f1f1;
						border-radius: 8rpx;
						.dispatch-text {
							height: 34rpx;
							line-height: 34rpx;
							text-align: center;
							font-size: 26rpx;
							font-weight: bold;
							color: #424443;
						}
					}
				}
				.select-dispatch-type-wrap {
					margin: 0 22rpx;
					.show-select-dispatch-type {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 74rpx;
						.title-text {
							width: 210rpx;
							font-size: 26rpx;
							color: #0e0e10;
							font-weight: bold;
						}
						.dispatch-type-content {
							display: flex;
							justify-content: flex-end;
							width: 448rpx;

							.dispatch-type-text {
								display: flex;
								align-items: center;
								.dispatch-type-title {
									font-size: 26rpx;
									color: #0e0e10;
								}
								.dispatch-type-icon {
								}
							}
						}
					}
				}

				.set-send-time {
					margin: 0 22rpx;
					height: 98rpx;
					border-bottom: 1px solid #f5f5f5;
					font-size: 28rpx;

					display: flex;
					align-items: center;
					justify-content: space-between;
					.send-type {
						color: #808080;
					}
					.show-send-time {
						display: flex;
						align-items: center;
						color: #333333;
					}
				}
				.store-ziti-wrap {
					display: flex;
					margin: 0 22rpx;
					padding: 20rpx 0;
					.store-ziti-image-wrap {
						width: 188rpx;
						height: 188rpx;
						border-radius: 10rpx;
						overflow: hidden;
					}
					.store-ziti-info-wrap {
						padding-left: 20rpx;
						width: 470rpx;
						height: 188rpx;
						.store-name {
							width: 450rpx;
							height: 40rpx;
							font-size: 30rpx;
							color: #414141;
							font-weight: bold;
						}
						.store-tel,
						.store-open-time,
						.store-address-text {
							width: 450rpx;
							height: 40rpx;
							font-size: 26rpx;
							color: #555555;
						}
						.store-address-text {
							height: 68rpx;
						}
					}
				}

				.dot-ziti-wrap {
					display: flex;
					position: relative;
					margin: 0 22rpx;
					padding: 20rpx 0;

					.tips {
						display: flex;
						align-items: center;
						justify-content: space-between;
						padding: 0 20rpx;
						width: 706rpx;
						height: 80rpx;
						border-radius: 20rpx;
						font-size: 34rpx;
						color: #f48080;
						background: #fde1e1;
					}

					.dot-ziti-image-wrap {
						width: 188rpx;
						height: 188rpx;
						border-radius: 10rpx;
						overflow: hidden;
						.not-range {
							position: absolute;
							z-index: 10;
							top: 20rpx;
							width: 188rpx;
							height: 188rpx;
							background: rgba(0, 0, 0, 0.3);
							color: #ffffff;
							font-size: 30rpx;
							font-weight: 600;
							border-radius: 10rpx;
							letter-spacing: 4rpx;
							overflow: hidden;
						}
					}
					.dot-ziti-info-wrap {
						padding-left: 20rpx;
						width: 470rpx;
						height: 188rpx;
						.dot-store-name {
							width: 380rpx;
							height: 40rpx;
							font-size: 30rpx;
							color: #414141;
							font-weight: bold;
						}
						.dot-store-tel,
						.dot-store-open-time,
						.dot-store-address-text {
							width: 450rpx;
							height: 40rpx;
							font-size: 26rpx;
							color: #555555;
						}

						.dot-store-address-text {
							height: 68rpx;
						}
					}
					.more-dot-ziti-btn {
						position: absolute;
						top: 20rpx;
						right: 0;
						width: 76rpx;
						height: 46rpx;
						font-size: 26rpx;
						color: #ffffff;
					}
				}

				.goods-list-wrap {
					margin: 0 22rpx;
					padding: 14rpx 0;
					.goods-item {
						display: flex;
						padding: 20rpx 0;
						height: 136rpx;
						&.invalid-state {
							filter: grayscale(36%);
						}
						.goods-image-wrap {
							width: 96rpx;
							height: 96rpx;
							border-radius: 10rpx;
							overflow: hidden;
						}
						.goods-description-block {
							display: flex;
							width: 562rpx;
							.goods-description-info {
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								width: 392rpx;
								padding-left: 16rpx;
								.goods-name {
									width: 376rpx;
									height: 36rpx;
									font-size: 26rpx;
									font-weight: initial;
									letter-spacing: 2rpx;
									color: #333333;
								}
								.goods-description {
									width: 376rpx;
									height: 30rpx;
									font-size: 22rpx;
									font-weight: initial;
									color: #999999;
								}
								.goods-num {
									width: 376rpx;
									height: 30rpx;
									font-size: 22rpx;
									font-weight: initial;
									color: #999999;
								}
							}
							.right-price-block {
								text-align: right;
								width: 170rpx;
								.price-text {
									display: flex;
									align-items: baseline;
									justify-content: flex-end;
									.goods-price-icon {
										color: #333333;
										font-size: 22rpx;
									}
									.goods-price-num {
										font-size: 26rpx;
										font-weight: 600;
										color: #000000;
									}
								}
							}
						}
					}
					.invalid-goods-toggle-btn {
						display: flex;
						font-size: 24rpx;
						color: #808080;
						.invalid-title-icon {
							transform: rotate(90deg);
							&.show-invalid-list {
								transform: rotate(-90deg);
							}
						}
					}
				}
				.all-goods-price {
					margin: 0 22rpx;
					.show-price {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 74rpx;
						font-size: 28rpx;
						.title-text {
							color: #000000;
						}
						.price-num {
							color: #191919;
						}
					}
				}

				.discount-fee {
					margin: 0 22rpx;
					.show-price {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 74rpx;
						font-size: 28rpx;
						.title-text {
							color: #000000;
						}
						.price-num {
							color: #191919;
						}
					}
				}

				.youhuiquan-wrap {
					margin: 0 22rpx;
					.show-youhuiquan {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 74rpx;
						.title-text {
							width: 210rpx;
							font-size: 28rpx;
							color: #000000;
						}
						.youhuiquan-content {
							display: flex;
							justify-content: flex-end;
							width: 448rpx;

							.coupon-state-zanwukeyong {
								font-size: 28rpx;
								color: #808080;
							}

							.coupon-state-weixuankeyong {
								display: flex;
								align-items: center;
								padding-left: 12rpx;
								height: 36rpx;
								background: #ff4b34;
								.weixuankeyong-text {
									font-size: 24rpx;
									color: #ffffff;
								}

								.youhuiquan-icon {
									height: 24rpx;
								}
							}
							.coupon-state-yijian {
								display: flex;
								align-items: center;
								font-size: 28rpx;
								.youhuiquan-icon {
									height: 28rpx;
								}
							}
						}
					}
				}

				.shangpinquan-wrap {
					margin: 0 22rpx;
					.show-shangpinquan {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 74rpx;
						.title-text {
							width: 210rpx;
							font-size: 28rpx;
							color: #000000;
						}
						.shangpinquan-content {
							display: flex;
							justify-content: flex-end;
							width: 448rpx;

							.coupon-state-zanwukeyong {
								font-size: 28rpx;
								color: #808080;
							}

							.coupon-state-weixuankeyong {
								display: flex;
								align-items: center;
								padding-left: 12rpx;
								height: 36rpx;
								background: #ff4b34;
								.weixuankeyong-text {
									font-size: 24rpx;
									color: #ffffff;
								}
								.shangpinquan-icon {
									height: 24rpx;
								}
							}
							.coupon-state-yijian {
								display: flex;
								align-items: center;
								font-size: 28rpx;
								.shangpinquan-icon {
									height: 28rpx;
								}
							}
						}
					}
				}

				.peisongfei {
					margin: 0 22rpx;
					.show-price {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 74rpx;
						font-size: 28rpx;
						&.showDispFeeTip {
							height: 94rpx;
							border-bottom: 1px solid #f5f5f5;
						}
						.title-text {
							.title-text-box {
								color: #000000;
							}
							.title-tip-box {
								color: #969696;
								font-size: 22rpx;
								font-weight: initial;
							}
						}
						.price-num {
							&.dispFeeShow0,
							&.dispFeeShow {
								color: #191919;
							}
						}
					}
				}

				.ziti-username-wrap {
					margin: 0 22rpx;
					.show-username {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 74rpx;

						.title-text {
							width: 130rpx;
							font-size: 28rpx;
							color: #000000;
						}
						.username-content {
							flex: 1;
							background: #f7f7f7;
							.username-input-wrap {
								padding: 4rpx 12rpx;
								height: 60rpx;
								.username-input-dom {
									width: 100%;
									height: 52rpx;
									line-height: 52rpx;
									font-size: 26rpx;
									font-weight: bold;
									color: #374050;
								}
							}
						}
					}
				}
				.ziti-usertel-wrap {
					margin: 0 22rpx;
					.show-usertel {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 74rpx;

						.title-text {
							width: 130rpx;
							font-size: 28rpx;
							color: #000000;
						}
						.usertel-content {
							flex: 1;
							background: #f7f7f7;
							.usertel-input-wrap {
								padding: 4rpx 12rpx;
								height: 60rpx;
								.usertel-input-dom {
									width: 100%;
									height: 52rpx;
									line-height: 52rpx;
									font-size: 26rpx;
									font-weight: bold;
									color: #374050;
								}
							}
						}
					}
				}

				.beizhu-wrap {
					margin: 0 22rpx;
					.show-beizhu {
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 82rpx;
						.title-text {
							width: 210rpx;
							font-size: 28rpx;
							color: #000000;
						}

						.beizhu-content {
							position: relative;
							width: 448rpx;
							height: 34rpx;
							text-align: right;
							font-size: 28rpx;
							.beizhu-input-wrap {
								position: absolute;
								z-index: 3;
								top: 0;
								left: 0;
								width: 448rpx;
								height: 34rpx;
								.beizhu-input-dom {
									width: 448rpx;
									height: 34rpx;
								}
							}
							.show-beizhu-text {
								position: absolute;
								z-index: 2;
								top: 0;
								left: 0;
								width: 448rpx;
								height: 34rpx;
								color: #191919;
								&.grey-style {
									color: #808080;
								}
							}
						}
					}
				}
				/*
				.total-price-wrap {
					padding: 0 22rpx;
					height: 100rpx;
					// background: #fef6df;
					.show-total-price {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						height: 100%;
						width: 100%;
						border-top: 1px solid #f5f5f5;
						.discount-total-price-text {
							display: flex;
							align-items: baseline;
							margin-right: 20rpx;
							.price-text-red {
								font-weight: initial;
							}
						}
						.count-total-price-text {
							display: flex;
							align-items: baseline;

							.price-text-red {
								font-weight: bold;
							}
						}
						.price-text-default {
							font-size: 24rpx;
							color: #0e0e10;
						}
						.price-text-red {
							font-size: 26rpx;
							margin-left: 8rpx;
						}
					}
				}
				*/
			}
		}
	}
	.bottom-commit-wrap {
		.fill-box {
			height: 100rpx;
		}
		.commit-block {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			z-index: 300;
			bottom: 0;
			padding: 0 24rpx;
			width: 100%;
			height: 100rpx;
			background: #ffffff;
			box-shadow: 0px 0px 12rpx #d8d8d8;

			.total-price-block {
				display: flex;
				.total-price-title {
					margin-right: 8rpx;
					font-size: 24rpx;
					color: #0e0e10;
				}
				.total-price-num {
					display: flex;
					align-items: baseline;
					.price-icon {
						font-size: 18rpx;
						font-weight: bold;
					}
					.price-number {
						font-size: 28rpx;
						font-weight: bold;
					}
				}
			}
			.discounts-info {
				display: flex;

				.discounts-title {
					margin-right: 4rpx;
					font-size: 24rpx;
					color: #0e0e10;
				}
				.discounts-price {
					font-size: 24rpx;
				}
				.discounts-detail-icon-block {
				}
			}
			.commit-btn {
				width: 240rpx;
				height: 88rpx;
				border-radius: 10rpx;
				font-size: 32rpx;
				color: #ffffff;
			}
		}
	}
	.pay-type-wrap {
		padding: 10rpx 0 20rpx;

		.pay-type-block {
			margin: 0 24rpx;
			padding: 0 20rpx;
			background: #ffffff;
			border-radius: 20rpx;
			.pay-title {
				line-height: 88rpx;
				font-size: 36rpx;
				color: #374050;
				font-weight: bold;
			}
			.pay-list-wrap {
				.pay-item {
					display: flex;
					align-items: center;
					height: 90rpx;
					border-top: 1px solid #f8f8f8;
					&:first-child {
						border-top: none;
					}
					.icon-block {
						margin-right: 14rpx;
					}
					.pay-type-text {
						flex: 1;
						font-size: 26rpx;
						color: #374050;
					}
					.control-block {
						display: flex;
						align-items: center;
						justify-content: flex-end;
						width: 80rpx;
					}
				}
			}
		}
	}
}
/* 
如遇缺货 的结构和样式 备份
<!-- 缺货 -->
<!-- 
<view class="quehuo-wrap">
	<view class="show-quehuo">
		<view class="title-text">如遇缺货</view>
		<view class="quehuo-content">
			<view class="picker-wrap">
				<picker
					:value="quehuoPickerIndex"
					:range="quehuoPickerRange"
					range-key="name"
					@cancel="quehuoPickerCancelFn"
					@change="quehuoPickerChangeFn"
				>
					<view class="show-picker-text">
						<view class="picker-text">
							{{ quehuoPickerRange[quehuoPickerIndex].name }}
						</view>
						<view
							class="picker-icon iconfont icon-arrow-right-copy-copy"
							style="color: #898a8c"
						></view>
					</view>
				</picker>
			</view>
		</view>
	</view>
</view>
.quehuo-wrap {
	margin: 0 22rpx;
	.show-quehuo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 74rpx;
		.title-text {
			width: 210rpx;
			font-size: 26rpx;
			color: #0e0e10;
			font-weight: bold;
		}
		.quehuo-content {
			display: flex;
			align-items: center;
			flex-direction: row-reverse;
			width: 448rpx;
			.picker-wrap {
				.show-picker-text {
					display: flex;
					.picker-text {
						font-size: 26rpx;
						color: #0e0e10;
					}
				}
			}
		}
	}
}
-->
*/
</style>
