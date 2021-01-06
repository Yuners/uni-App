import request from "@/utils/request.js";

/**
 * 获取风景列表
 * @param {Object} params
 */
export function getSceneryList( params ){
	return request.get('/scenery/getSceneryPageApp', { params })
}


/**
 * 获取美食列表
 * @param {Object} params
 */
export function getFoodList( params ){
	return request.get('/food/getFoodPageApp', { params })
}


/**
 * 获取民宿列表
 * @param {Object} params
 */
export function getBedList( params ){
	return request.get('/bed/getBedPageApp', { params })
}


/**
 * 获取特产列表
 * @param {Object} params
 */
export function getSpecialtyList( params ){
	return request.get('/specialty/getSpecialtyPageApp', { params })
}