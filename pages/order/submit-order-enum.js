// 提交订单页面枚举常量

/*
	三种地址显示方式
*/
const userAdrs = 'userAdrs', // 显示用户地址信息
	sellerAdrs = 'sellerAdrs', // 显示自提店信息
	zitiAdrs = 'zitiAdrs'; // 显示自提点信息

/*
预约
	yvyueType 预约配送方式
		'dspcnow' 立即配送
		'dspcyvyue' 预约配送
*/

const dspcnow = 'dspcnow',
	dspcyvyue = 'dspcyvyue';
const yvyueTypeEnum = {
	'1': dspcnow,
	'2': dspcyvyue
};

/*
	配送费
	type0 dispFeeHide 隐藏
	type1 dispFeeShow0 配送费是0
	type2 dispFeeShow 正常显示金额
*/
const dispFeeHide = 'dispFeeHide',
	dispFeeShow0 = 'dispFeeShow0',
	dispFeeShow = 'dispFeeShow';

const dispFeeTypeEnum = {
	'0': dispFeeHide,
	'1': dispFeeShow0,
	'2': dispFeeShow
};

const oneModel = 'oneModel', // 单店模式
	moreModel = 'moreModel'; // 多店模式
let storeType = {
	oneModel,
	moreModel
};

export {


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
}
