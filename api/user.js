import request from "@/utils/request.js";
import host from "./serve/jxy.js"


/**
 * 登录
 * @param {Object} params
 */
export function login(params){
    return request.post( host.oauth + '/login/app/userLogin', params )
}

/**
 * 刷新token
 * @param {Object} params
 */
export function refreshLogin(){
    return request.post( host.oauth + '/login/app/userOauth' )
}

/**
 * 退出登录
 * @param {Object} params
 */
export function logout(){
    return request.post( host.oauth + '/login/userEnd' )
}

/**
 * 发送短信
 * phone:手机号
 * codeType:注册(4)修改密码(2)手机验证(1)密保问题(3)新手机号密保(5)
 * @param {Object} params
 */
export function sendCode(params){
    return request.post( host.base + '/sms/code', params )
}

/**
 * 发送短信
 * phone:手机号
 * password:密码
 * code:手机验证码
 * smsSecret:验证码密钥
 * userOwnershipSystemId:归属系统，晋乡游填3
 * @param {Object} params
 */
export function register(params){
    return request.post( host.user + '/user/registered', params )
}


/**
 * 获取用户信息
 * @param {Object} params
 */
export function getUserInfo(){
    return request.get( host.user + '/user' )
}
