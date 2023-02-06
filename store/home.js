//  首页的全局数据



const store = {
	state: {
		miaoshaOptions: {}, // 秒杀模块的 样式配置
		caiChangOptions: {}, // 菜场模块 信息 和 样式配置
	},
	mutations: {
		
		// 设置全局的 秒杀模块的 样式配置
		setMiaoshaOptions(state, miaoshaOptions) {
			state.miaoshaOptions = miaoshaOptions;
			console.log('state.miaoshaOptions = miaoshaOptions',miaoshaOptions)
		},
		// 设置全局的 菜场模块 信息 和 样式配置
		setCaiChangOptions(state, caiChangOptions) {
			state.caiChangOptions = caiChangOptions;
		},
	},
	actions: {

	},
	getters: {

	}
};

export default store;
