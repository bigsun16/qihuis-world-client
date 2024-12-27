import axios from 'axios';
import { ElMessage } from 'element-plus';

const requestInstance = axios.create({
  baseURL: 'http://8.155.9.156/qihuis-world',
  // baseURL: 'http://www.sunqihui.com/qihuis-world',
  timeout: 5000 // 请求超时时间  
  // 这里可以添加其他全局配置  
});

// 请求拦截器  
requestInstance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，比如设置token  
    let loginInfo = localStorage.getItem('login_info')
    if (!loginInfo) {
      return config
    }
    loginInfo = JSON.parse(loginInfo)
    config.headers[loginInfo.tokenName] = loginInfo.tokenValue
    return config;
  },
  error => {
    // 对请求错误做些什么  
    console.error('请求发生错误', error); // for debug  
    Promise.reject(error);
  }
);

// // 响应拦截器  
requestInstance.interceptors.response.use(
  response => {
    /**  
     * 可以在这里对响应数据做点什么  
     * 例如，状态码为200的响应才认为是成功，其他都认为是错误  
     */
    const res = response.data;
    if (res.code !== 200) {
      ElMessage.error(res.msg);
    }
    return res;
  },
  error => {
    console.error('响应错误', error); // for debug  
    return Promise.reject(error);
  }
);

export default requestInstance;