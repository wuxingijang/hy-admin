import {request} from '../index'
//用户认证请求
export function login(data){
    return request({
        url:"private/v1/",
        method:"post",
        data:data
    })
}