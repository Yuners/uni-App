import request from "@/utils/request.js";
import host from "./serve/jxy.js"

/**
 * 获取商品详情
 * @param {Object} params
 */
export function getDetails(params){
	return request.get( host.jxy + '/specialty/getSpecialtyDetailApp', { params })
}
/**
 * 用户下单
 * @param {Object} params
 */
export function placeOrder(params){
	return request.post( host.order + '/order/addOrder', params)
}