import {
	num2zeroStr,
	transNumFn
} from '@/tools/tools.js';


// 秒杀相关工具函数



/*
	@description 传入单位是分钟的数字转换为 xx:xx:xx （时:分:秒）
	@param { Number } allMinute 数字单位是分钟
	@return { String } xx:xx:xx （时:分:秒）
*/
function allMinute2Time(allMinute) {
	let newDate = new Date();
	let hour = Math.floor(allMinute / 60);
	let minute = allMinute % 60;
	let second = 60 - newDate.getSeconds();
	return {
		hour: num2zeroStr(hour),
		minute: num2zeroStr(minute),
		second: num2zeroStr(second),
	};
}



/*
	@description  根据后台设置的开始时间(12:00)和结束时间(13:00) 返回 tipTitle 提示文字  和 时分秒 (完成补零操作的字符串)
	@param { String } miaoshaStartTime 开始时间(12:00)
	@param { String } miaoshaEndTime 结束时间(13:00)
	@return { Object } 
		{
			tipTitle: '', // 距离结束   距离开始
			hour: '01', // 小时  
			minute: '02', // 分钟
			second: '03', // 秒
		}
*/
function getMiaoshaTimeOption(miaoshaStartTime, miaoshaEndTime) {
	let newDate = new Date(); // 当前时间对象
	let newTimeHour = newDate.getHours(); // 当前的时间小时 20
	let newTimeMinute = newDate.getMinutes(); // 当前的时间分钟 00
	let newTimeAllMinute = newTimeHour * 60 + newTimeMinute; // 把小时的单位换算成分钟表示

	let miaoshaStartTimeArr = miaoshaStartTime.split(':'); // 开始秒杀的时间 20:00
	let miaoshaStartTimeHour = transNumFn(miaoshaStartTimeArr[0]); // 开始秒杀的时间小时 20
	let miaoshaStartTimeMinute = transNumFn(miaoshaStartTimeArr[1]); // 开始秒杀的时间分钟 00
	let miaoshaStartTimeAllMinute = miaoshaStartTimeHour * 60 + miaoshaStartTimeMinute; // 把小时的单位换算成分钟表示

	let miaoshaEndTimeArr = miaoshaEndTime.split(':'); // 结束秒杀的时间 20:00
	let miaoshaEndTimeHour = transNumFn(miaoshaEndTimeArr[0]); // 结束秒杀的时间小时 20
	let miaoshaEndTimeMinute = transNumFn(miaoshaEndTimeArr[1]); // 结束秒杀的时间分钟 00
	let miaoshaEndTimeAllMinute = miaoshaEndTimeHour * 60 + miaoshaEndTimeMinute; // 把小时的单位换算成分钟表示

	let allMinute; // 分钟数
	let tipStr; // 时间前的提示文字  (距离结束/距离开始)
	if (miaoshaStartTimeAllMinute < newTimeAllMinute && miaoshaEndTimeAllMinute > newTimeAllMinute) {
		// 当前时间在秒杀范围内     还差xxx结束
		allMinute = miaoshaEndTimeAllMinute - newTimeAllMinute;
		tipStr = '距离结束';
	} else if (miaoshaStartTimeAllMinute > newTimeAllMinute) {
		// 当前时间没到秒杀范围内     还差xxx开始
		allMinute = miaoshaStartTimeAllMinute - newTimeAllMinute;
		tipStr = '距离开始';
	} else if (miaoshaEndTimeAllMinute < newTimeAllMinute) {
		// 当前时间超过秒杀范围     还差xxx开始
		allMinute = 24 * 60 - newTimeAllMinute + miaoshaStartTimeAllMinute;
		tipStr = '距离开始';
	}
	return {
		tipTitle: tipStr,
		...allMinute2Time(allMinute),
	}
}
export {
	getMiaoshaTimeOption
}
