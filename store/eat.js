//  吃什么页面相关数据


const store = {
	state: {
		eatPageList: [], // 吃什么页面 作品列表数据
	},
	mutations: {
		// 赋值 给 吃什么页面 作品列表
		setEatPageList(state, eatPageList) {
			state.eatPageList = eatPageList;
			/* 
			console.log(
				'vuex 传过来新的 eatPageList 数据',
				eatPageList, '\n',
			);
			 */
		},
	},
	actions: {},
	getters: {},
};

export default store;
