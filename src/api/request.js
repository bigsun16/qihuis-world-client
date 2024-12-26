import requestInstance from '@/api/axios'; // 假设axios实例的文件路径是这里  

export const requestArticleList = async (categoryKey) => {
    try {
        const response = await requestInstance.get('/article/list', { params: { 'categoryKey': categoryKey } });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const requestCategoryList = async () => {
    try {
        const response = await requestInstance.get('/category/list')
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const addOrUpdateArticle = async (article) => {
    try {
        const response = await requestInstance.post('/article/addOrUpdate', article)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const deleteArticle = async (id) => {
    try {
        const response = await requestInstance.delete(`/article/${id}`)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const doLogin = async (user) => {
    try {
        const response = await requestInstance.post('/user/login', user)
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const doLogout = async () => {
    try {
        const response = await requestInstance.get('/user/logout')
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const isLogin = async () => {
    try {
        const response = await requestInstance.get('/user/isLogin')
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return false
    }
}