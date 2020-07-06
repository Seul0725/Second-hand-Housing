
import axios from "axios";

axios.defaults.baseURL = '/api'; // 配置axios请求的地址

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // console.log(config,'__config');
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    response => { 
        if(response.status && response.status === 200){
            return response.data;
        }else {
            return response;
        }
    },
    error => {  
        return Promise.reject(error)
    }
);

export default axios;