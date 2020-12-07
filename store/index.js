import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        tabBarList: [
            {
                iconPath: "/static/images/home_x.png",
                selectedIconPath: "/static/images/home.png",
                text: '首页',
                pagePath:"/pages/RuralDetails/RuralHome/index"
            },
            {
                iconPath: "/static/images/w_scenery.png",
                selectedIconPath: "/static/images/w_scenertyx.png",
                text: '风景',
                pagePath: "/pages/RuralDetails/Landscape/index"
            },
            {
                iconPath: "/static/images/roomandboard.png",
                selectedIconPath: "/static/images/roomandboardx.png",
                text: '食宿',
                pagePath: "/pages/RuralDetails/Accommodation/index"
            },
            {
                iconPath: "/static/images/localspecialty.png",
                selectedIconPath: "/static/images/localspecialtyx.png",
                text: '特产',
                pagePath: "/pages/RuralDetails/Specialty/index"
            },
        ],
		// 网络状态，用于下载提醒
		networkState: 'unknown',
    },

	getters:{
		
		// 获取网络状态
		networkStatus: state => {
			return state.networkState;
		},
	},

    mutations:{

    },

    actions:{

    }

})


export default store
