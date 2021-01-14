import request from "@/utils/request.js";
import host from "./serve/jxy.js"

/**
 * 获取城市联动
 * @param {Object} params
 */
export function getCityList( params ){
	return request.post( host.role + '/framework/select',  params )
}


/**
 * 获取地图标记
 * @param {Object} params
 */
export function getMarkers(){
	return request.get( host.jxy + '/map/selectAllCoordinate')
}
