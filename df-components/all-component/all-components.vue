<!-- 自定义动态组件 实现 -->
<template>
	<view class="all-components-wrap">
		<style1 v-if="styleId == 1" :style-id="1" :list="list"></style1>
		<style2 v-if="styleId == 2" :style-id="2" :list="list"></style2>
		<style3 v-if="styleId == 3" :style-id="3" :list="list"></style3>
		<style4 v-if="styleId == 4" :style-id="4" :list="list"></style4>
		<style5 v-if="styleId == 5" :style-id="5" :list="list"></style5>
		<style6 v-if="styleId == 6" :style-id="6" :list="list"></style6>
		<style7 v-if="styleId == 7" :style-id="7" :list="list"></style7>
		<style8 v-if="styleId == 8" :style-id="8" :list="list"></style8>
	</view>
</template>

<script>
import style1 from '@/df-components/all-component/template-components/home-banner-style1.vue';
import style2 from '@/df-components/all-component/template-components/home-banner-style2.vue';
import style3 from '@/df-components/all-component/template-components/home-banner-style3.vue';
import style4 from '@/df-components/all-component/template-components/home-banner-style4.vue';
import style5 from '@/df-components/all-component/template-components/home-banner-style5.vue';
import style6 from '@/df-components/all-component/template-components/home-banner-style6.vue';
import style7 from '@/df-components/all-component/template-components/home-banner-style7.vue';
import style8 from '@/df-components/all-component/template-components/home-banner-style8.vue';
export default {
	components: {
		style1,
		style2,
		style3,
		style4,
		style5,
		style6,
		style7,
		style8
	},
	props: ['styleId','list'],
};
</script>

<style lang="scss" scoped>
.all-components-wrap {
	background: $bg-grey-color;
	padding: 2rpx 0;
}
</style>
