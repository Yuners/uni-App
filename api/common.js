import request from "@/utils/request.js";
import host from "./serve/jxy.js"

/**
 * 获取城市联动
 * @param {Object} params
 */
export function getCityList(){
	return request.get( host.role + '/framework/app/select' )
}


/**
 * 获取地图标记
 * @param {Object} params
 */
export function getMarkers(){
	return request.get( host.jxy + '/map/selectAllCoordinate')
}
