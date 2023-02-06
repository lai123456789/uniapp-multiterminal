// 项目中使用的常量




// 支付类型
const payTypeyve = 'payTypeyve', // 支付类型储值余额
	payTypeWxxcx = 'payTypeWxxcx', // 支付类型微信小程序支付
	payTypeWxapp = 'payTypeWxapp', // 支付类型微信app支付
	payTypeZfbapp = 'payTypeZfbapp', // 支付类型支付宝app支付
	payTypeWxgzh = 'payTypeWxgzh', // 支付类型公众号微信支付
	payTypeH5wx = 'payTypeH5wx', // 支付类型H5普通浏览器微信支付
	payTypeH5zfb = 'payTypeH5zfb'; // 支付类型H5普通浏览器支付宝支付

// 支付类型枚举对象
let payTypeEnumObj = {
	[payTypeyve]: 1, // 余额 1
	[payTypeWxxcx]: 0, // 微信小程序 0
	[payTypeWxapp]: 4, // 微信app 4
	[payTypeZfbapp]: 2, // 支付宝app 2
	[payTypeWxgzh]: 5, // 公众号微信支付
	[payTypeH5wx]: 6, // H5普通浏览器微信支付
	[payTypeH5zfb]: 7 // H5普通浏览器支付宝支付
}


// 配送方式
const peiTypeShangjia = 'peiTypeShangjia', // 商家配送
	peiTypeZiti = 'peiTypeZiti', // 自提
	peiTypeKuaidi = 'peiTypeKuaidi', // 快递
	peiTypeDada = 'peiTypeDada', // 达达
	peiTypeShansong = 'peiTypeShansong', // 闪送
	peiTypeDuozitidian = 'peiTypeDuozitidian'; // 多自提点

// 配送方式枚举对象
let peiTypeEnumObj = {
	[peiTypeShangjia]: 0, // 商家配送 0
	[peiTypeZiti]: 1, // 自提 1
	[peiTypeKuaidi]: 2, // 快递 2
	[peiTypeDada]: 3, // 达达 3
	[peiTypeShansong]: 4, // 闪送 4
	[peiTypeDuozitidian]: 5, // 多自提点 5
}
/* 
	
	0 peiTypeEnumObj[peiTypeShangjia]
	1 peiTypeEnumObj[peiTypeZiti]
	2 peiTypeEnumObj[peiTypeKuaidi]
	3 peiTypeEnumObj[peiTypeDada]
	4 peiTypeEnumObj[peiTypeShansong]
	5 peiTypeEnumObj[peiTypeDuozitidian]
*/





// 多门店版本枚举配送方式
const dispatchshangjia = 'dispatchshangjia', // 商家配送
	dispatchmendian = 'dispatchmendian', // 门店自提
	dispatchdaodian = 'dispatchdaodian', // 到点自提
	dispatchkuaidi = 'dispatchkuaidi'; // 快递
const dispatchTypeIdEnum = {
	'0': dispatchshangjia,
	'1': dispatchmendian,
	'5': dispatchdaodian,
	'2': dispatchkuaidi,
}



const errorMsg = '网络不给力 请稍后重试';
// const errorMsg = '活动太火爆 请稍后重试';


// 成功失败的常量字符串
const success = 'success',
	error = 'error';





/* 
	订单类型
	prom_type
	'common'    普通
	'rob'       抢购
	'group'     拼团
	'integral'  积分兑换
	'pre_sale'  预售订单
*/


const promTypeCommon = 'promTypeCommon', // 普通
	promTypeRob = 'promTypeRob', // 抢购
	promTypeGroup = 'promTypeGroup', // 拼团
	promTypeIntegral = 'promTypeIntegral', // 积分兑换
	promTypePreSale = 'promTypePreSale'; // 预售订单

let promTypeEnumObj = {
	[promTypeCommon]: 'common', // 普通
	[promTypeRob]: 'rob', // 抢购
	[promTypeGroup]: 'group', // 拼团
	[promTypeIntegral]: 'integral', // 积分兑换
	[promTypePreSale]: 'pre_sale' // 预售订单
}








// 平台开通的支付方式
const openIngApp = 'openIngApp',
	openIngH5 = 'openIngH5',
	openIngWxminiprogram = 'openIngWxminiprogram',
	openIngWxofficialaccount = 'openIngWxofficialaccount';

const openIngEnumObj = {
	// 平台开通的支付方式
	[openIngApp]: 'app',
	[openIngH5]: 'h5',
	[openIngWxminiprogram]: 'wxminiprogram',
	[openIngWxofficialaccount]: 'wxofficialaccount'
}


// 当前运行环境 安卓 or 苹果
const ENVANDROID = 'ENVANDROID',
	ENVIOS = 'ENVIOS';


/*
	商品右下角的加入购物车按钮的样式
		anniushuzi
			一个加号按钮按钮右上是数字
		shuanganniushuzi
			一个减号按钮 数字 一个加号按钮按钮
*/
const anniushuzi = 'anniushuzi',
	shuanganniushuzi = 'shuanganniushuzi';



// 从购物车把商品删除的类型
const delCartGoodsTypeCartId = 'delCartGoodsTypeCartId', // 购物车id
	delCartGoodsTypeGoodsId = 'delCartGoodsTypeGoodsId'; // 商品id


// 提醒绑定手机号提示
const bindMobileTips = '请绑定手机号后操作';



// 各个客户端运行平台字符串
const xcx_wx = 'xcx_wx', // 微信小程序
	xcx_tt = 'xcx_tt', // 头条小程序
	browser_third = 'browser_third', // 非微信浏览器
	browser_wx = 'browser_wx', // 微信浏览器
	app_android = 'app_android', // 安卓
	app_ios = 'app_ios'; // 苹果

// 客户端运行平台枚举
const clientPlatformEnum = {
	xcx_wx,
	xcx_tt,
	browser_third,
	browser_wx,
	app_android,
	app_ios
};

// 支付类型字符串
const payment_zfb = 'payment_zfb',
	payment_wx = 'payment_wx';
// 支付类型枚举
const paymentTypeEnum = {
	payment_zfb,
	payment_wx
}


// 订单类型
/*
	common--普通
	rob--抢购
	group--拼团
	integral--积分兑换
	pre_sale--预售订单
*/
const common = 'common',
	rob = 'rob',
	group = 'group',
	integral = 'integral',
	preSale = 'preSale';

const orderTypeEnum = {
	common,
	rob,
	group,
	integral,
	['pre_sale']: preSale
}


export {
	payTypeyve,
	payTypeWxxcx,
	payTypeWxapp,
	payTypeZfbapp,
	payTypeWxgzh,
	payTypeH5wx,
	payTypeH5zfb,
	payTypeEnumObj,


	peiTypeShangjia,
	peiTypeZiti,
	peiTypeKuaidi,
	peiTypeDada,
	peiTypeShansong,
	peiTypeDuozitidian,
	peiTypeEnumObj,



	dispatchshangjia,
	dispatchmendian,
	dispatchdaodian,
	dispatchkuaidi,
	dispatchTypeIdEnum,




	errorMsg,
	success,
	error,

	promTypeEnumObj,
	promTypeCommon,
	promTypeRob,
	promTypeGroup,
	promTypeIntegral,
	promTypePreSale,


	// 平台开通的支付方式
	openIngApp,
	openIngH5,
	openIngWxminiprogram,
	openIngWxofficialaccount,
	openIngEnumObj,

	// 当前运行环境 安卓 or 苹果
	ENVANDROID,
	ENVIOS,
	anniushuzi,
	shuanganniushuzi,

	delCartGoodsTypeCartId,
	delCartGoodsTypeGoodsId,

	bindMobileTips,






	clientPlatformEnum,
	xcx_wx,
	xcx_tt,
	browser_third,
	browser_wx,
	app_android,
	app_ios,




	paymentTypeEnum,
	payment_zfb,
	payment_wx,
	

	
	common,
	rob,
	group,
	integral,
	preSale,
	orderTypeEnum
		


}
