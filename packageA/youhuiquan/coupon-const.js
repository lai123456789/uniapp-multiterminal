// 优惠券使用的常量和枚举


// 优惠券的几种状态
const weiling = 'weiling', // 未领
	yiling = 'yiling', // 已领
	yiyong = 'yiyong', // 已用
	guoqi = 'guoqi'; // 过期


const couponStatusEnum = {
	[weiling]: weiling,
	[yiling]: yiling,
	[yiyong]: yiyong,
	[guoqi]: guoqi,
}
export {
	weiling,
	yiling,
	yiyong,
	guoqi,
	couponStatusEnum
}
