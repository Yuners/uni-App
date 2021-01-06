import request from "@/utils/request.js";


/**
 * 获取乡村详情
 * @param {Object} params
 */
export function getVillageDetails( params ){
	return request.post('/villageDescrible/getVillageByVillageId',  params )
}

/**
 * 获取乡村风景
 * @param {Object} params
 */
export function getVillageScenery( params ){
	return request.get('/scenery/getAllSceneryPageApp', { params })
}

/**
 * 获取乡村民宿
 * @param {Object} params
 */
export function getVillageDed( params ){
	return request.get('/bed/getAllBedPageApp', { params })
}

/**
 * 获取乡村美食
 * @param {Object} params
 */
export function getVillageFood( params ){
	return request.get('/food/getAllFoodPageApp', { params })
}