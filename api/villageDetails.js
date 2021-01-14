import request from "@/utils/request.js";
import host from "./serve/jxy.js"

/**
 * 获取乡村详情
 * @param {Object} params
 */
export function getVillageDetails( params ){
	return request.post( host.jxy + '/villageDescrible/getVillageByVillageId',  params )
}

/**
 * 获取乡村风景列表
 * @param {Object} params
 */
export function getVillageScenery( params ){
	return request.get( host.jxy + '/scenery/getAllSceneryPageApp', { params })
}

/**
 * 获取乡村民宿列表
 * @param {Object} params
 */
export function getVillageDed( params ){
	return request.get( host.jxy + '/bed/getAllBedPageApp', { params })
}

/**
 * 获取乡村美食列表
 * @param {Object} params
 */
export function getVillageFood( params ){
	return request.get( host.jxy + '/food/getAllFoodPageApp', { params })
}

/**
 * 获取乡村景区详情
 * @param {Object} params
 */
export function getSceneryDetail( params ){
	return request.get( host.jxy + '/scenery/getSceneryDetailApp', { params })
}


/**
 * 获取乡村景区详情
 * @param {Object} params
 */
export function getFoodDetail( params ){
	return request.get( host.jxy + '/food/getFoodDetailApp', { params })
}


/**
 * 获取民宿景区详情
 * @param {Object} params
 */
export function getBedDetail( params ){
	return request.get( host.jxy + '/bed/getBedDetailApp', { params })
}