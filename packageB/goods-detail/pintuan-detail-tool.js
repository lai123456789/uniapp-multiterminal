import {
	cloneFn
} from '@/tools/tools';


// 后台数据结构转前端使用方法
// 参数 data 是后台返回的数据
function handleDataFn(data) {
	let resultList = []; // 经过一系列循环 判断后返回的数组

	cloneFn(data).forEach(item => {
		if (resultList.length) { // 判断是否为空
			let endIsPushFlag; // 记录结束循环后是否要push一下
			resultList.forEach(it => {

				if (it.gdId == item.gb_id) { // resultList 里有当前团id信息
					endIsPushFlag = false;

					if (it.userInfo.length < 2) {
						it.userInfo.push({ // 把用户信息push到这个团里
							headimgurl: item.headimgurl,
							nickName: item.nickname,
						})
					}

				} else { // resultList 没有团信息记录一下
					endIsPushFlag = true;
				}
			})
			if (endIsPushFlag) { // 根据签名的记录 没有团信息 循环外 需要push一下
				resultList.push({
					gdId: item.gb_id, // 团id
					diffNum: item.diffNum,
					endTime: item.end_time,
					userInfo: [{
						headimgurl: item.headimgurl,
						nickName: item.nickname,
					}]
				})
			}
		} else { // resultList 里啥也没有 的情况下 直接push团
			resultList.push({
				gdId: item.gb_id, // 团id
				diffNum: item.diffNum,
				endTime: item.end_time,
				encrypt: item.encrypt,
				userInfo: [{
					headimgurl: item.headimgurl,
					nickName: item.nickname,
				}]
			})
		}
	})
	/* return [...resultList,...resultList,...resultList,...resultList,...resultList,...resultList,...resultList]; */ // 循环完把数据 return 出来
	return resultList;
}


export {
	handleDataFn
}
