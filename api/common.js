import request from "@/utils/request.js";


/**
 * 获取城市联动
 * @param {Object} params
 */
export function getCityList( params ){
	return request.post('http://192.168.31.252:10207/framework/select',  params )
}
