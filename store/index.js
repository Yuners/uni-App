import Vue from "vue"
import Vuex from "vuex"
import { getAddress } from '@/api/address.js'
import user from './modules/user.js'

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
		profileList: []
    },

	getters:{
		// 获取网络状态
		networkStatus: state => {
			return state.networkState;
		},
		// 获取收货地址
		addressList: state => {
			console.log(state.profileList)
			return state.profileList
		},
		// 默认地址
		defAddress: state => {
			if (!state.profileList.length) return ''
			return state.profileList[0]
		},
		isLogin: state => state.user.isLogin,
		userInfo: state => state.user.userInfo,
	},

    mutations:{
		SET_PROFILE: (state, list) => {
			state.profileList = list
		}
    },

    actions:{
		getProfile({ commit }) {
			return new Promise( (resolve, reject) => {
				getAddress()
					.then( res => {
						commit('SET_PROFILE', res.data)
						resolve()
					})
					.catch( err => {
						console.log(err)
						reject(err)
					})
			})
		}
    },

	modules: {
		user
	}
})


export default store
