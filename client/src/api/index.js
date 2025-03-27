import axios from 'axios';
import { showFailToast, showToast, showSuccessToast } from 'vant';
// import router from '../router/index.js';

axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截
axios.interceptors.request.use((req) => {
    let jwtToken = localStorage.getItem('token');
    if (jwtToken) {
        req.headers.Authorization = jwtToken;
    }
    return req;
})
// 响应拦截
axios.interceptors.response.use(
    (res) => {//请求成功走这里
        // console.log(res.data);
        if (res.status !== 200) {//程序错误
            showFailToast('服务器异常');
            return Promise.reject(res);
        } else {
            if (res.data.code !== 800) {//逻辑错误
                showFailToast(res.data.msg);
                return Promise.reject(res);
            }
            showSuccessToast(res.data.msg);
            return res.data;
        }
    }
    // ,
    // (err) => {//请求错误走这里
    //     showFailToast(err.response.data.msg);
    //     setTimeout(() => {
    //         window.location.href = '/login';
    //     }, 1500);
    //     return Promise.reject(err);
    // }
)
export default axios;