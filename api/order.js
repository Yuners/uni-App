import request from "@/utils/request.js";
import host from "./serve/jxy.js"



/**
 * 用户下单
 * @param {Object} params
 */
export function placeOrder(params){
	return request.post( host.order + '/order/addOrder', params)
}


/**
 * 支付
 * @param {Object} params
 */
export function payment(params){
	return request.post( host.order + '/order/payment', params)
}


/**
 * 支付成功回调
 * @param {Object} params
 */
export function confirmPay(params){
	return request.post( host.order + '/order/confirmPay', params)
}


/**
 * 订单列表
 * @param {Object} params
 */
export function getOrderList(status, params){
	return request.get( host.order + `/order/uList/${status}`, { params })
}