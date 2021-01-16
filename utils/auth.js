export function setToken(token) {
	return uni.setStorageSync('token', token);
}

export function getToken() {
	return uni.getStorageSync('token')
}

export function removeToken() {
	uni.removeStorageSync('token')
}