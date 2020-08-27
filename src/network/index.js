import axios from 'axios'

//全局网络基础配置
export  function request(config){
    const instance = axios.create({
        baseURL:"http://timemeetyou.com:8889/api/",
        timeout:2000
    })
    return instance(config)
}