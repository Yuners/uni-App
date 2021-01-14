import request from "@/utils/request.js";
import host from "./serve/jxy.js"


/**
 * 获取收货地址列表
 * @param {Object} params
 */
export function getAddress(){
	return request.get( host.jxy + '/ress' )
}

/**
 * lng 经
 * lat 纬
 * @param {Object} params
 */
export function getAddressDetails( params ){
	return request.get( host.jxy + `/ress/info/${params.lng}/${params.lat}` )
}


/**
 * 添加收货地址
 * @param {Object} params
 */
export function addAddress(params){
	return request.post( host.jxy + '/ress', params )
}

/**
 * 添加收货地址
 * @param {Object} params
 */
export function editAddress(params){
	return request.put( host.jxy + '/ress', params )
}