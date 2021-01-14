import request from "@/utils/request.js";
import host from "./serve/jxy.js"

/**
 * 获取风景列表
 * @param {Object} params
 */
export function getSceneryList( params ){
	return request.get( host.jxy + '/scenery/getSceneryPageApp', { params })
}


/**
 * 获取美食列表
 * @param {Object} params
 */
export function getFoodList( params ){
	return request.get( host.jxy + '/food/getFoodPageApp', { params })
}


/**
 * 获取民宿列表
 * @param {Object} params
 */
export function getBedList( params ){
	return request.get( host.jxy + '/bed/getBedPageApp', { params })
}


/**
 * 获取特产列表
 * @param {Object} params
 */
export function getSpecialtyList( params ){
	return request.get( host.jxy + '/specialty/getSpecialtyPageApp', { params })
}