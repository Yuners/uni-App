import request from "@/utils/request.js";
import host from "./serve/jxy.js"


/**
 * 上传图片
 * @param file
 * @param name
 * @param output
 * @param quality
 * @returns {AxiosPromise<any>}
 */
let uploadImage = (file,compress) => {
	console.log(file)
    let formData=new FormData();
    formData.append('compress',compress||true);
    formData.append('file',file.file);
    return request.post(host.file + 'upload/image/binary',formData,{
        'Content-Type':'multipart/form-data',
        timeout:100000000,
    });
};