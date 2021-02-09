// 配置axios默认值
axios.defaults.baseURL = 'https://developer.duyiedu.com/vue/bz';

// axios拦截器
axios.interceptors.response.use(response => {
    if(response.status === 200) {
        return response.data;
    }
    return response;
})