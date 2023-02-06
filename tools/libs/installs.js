/* 
	installs.js // 自定义全局的组件
*/
let onoff = false;

// 处理多次点击方法
function onceClick(fn, ...arg) {
	let that = this;
	// console.log('$onceClick--Start', that.onoff);

	if (that.onoff) {
		console.log('稍等会再点, 正在处理其他东西');
	} else {
		that.onoff = true;
		console.log('$onceClick 的函数 运行');
		fn(...arg);
		setTimeout(function() {
			// console.log('$onceClick--setTimeout-before',that.onoff);
			that.onoff = false;
			// console.log('$onceClick--setTimeout-after',that.onoff);
		}, 750);
	}
	// console.log('$onceClick--End', that.onoff);
}





export {
	onceClick,
}
