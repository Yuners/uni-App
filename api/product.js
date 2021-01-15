import request from "@/utils/request.js";
import host from "./serve/jxy.js"

/**
 * 获取商品详情
 * @param {Object} params
 */
export function getDetails(params){
	return request.get( host.jxy + '/specialty/getSpecialtyDetailApp', { params })
}