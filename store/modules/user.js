import {
	getToken,
	setToken,
	removeToken
} from "@/utils/auth.js"
import {
	login,
	refreshLogin,
	logout
} from "@/api/user.js"

const userState = () => {
	return {
		token: getToken(),
		isLogin: false,
		userInfo: ''
	}
}

const state = userState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, userState())
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_ISLOGIN: (state, isLogin) => {
		state.isLogin = isLogin
	},
	SET_USERINFO: (state, userInfo) => {
		state.userInfo = userInfo
	}
}

const actions = {
	login({
		commit
	}, loginInfo) {
		return new Promise((resolve, reject) => {
			login(loginInfo)
				.then(res => {
					let data = res.data
					if (data.userFlag) {
						commit('SET_TOKEN', data.token)
						setToken(data.token)
						commit('SET_ISLOGIN', data.userFlag)
						commit('SET_USERINFO', data.user)
					}
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	refreshLogin({
		commit
	}) {
		return new Promise((resolve, reject) => {
			refreshLogin()
				.then(res => {
					const data = res.data
					if (data.userFlag) {
						commit('SET_TOKEN', data.token)
						setToken(data.token)
						commit('SET_ISLOGIN', data.userFlag)
						commit('SET_USERINFO', data.user)
					}
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
	logout({
		commit
	}) {
		return new Promise((resolve, reject) => {
			logout()
				.then(res => {
					const data = res.data
					if (data.userFlag) {
						removeToken()
						commit('RESET_STATE')
					}
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
