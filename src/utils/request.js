import axios from 'axios';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

// 创建axios实例
const service = axios.create({
  baseURL: "https://mock.mengxuegu.com/mock/63130e80ec1c7c261a3b7eee/example",
  timeout: 20000,
});

// 响应拦截器
service.interceptors.response.use(
  res => {
    return res.data
  },
  error => {
    console.log('err' + error);
    return Promise.reject(error);
  },
);

export default service;
