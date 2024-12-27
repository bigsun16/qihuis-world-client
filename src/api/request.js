import requestInstance from '@/api/axios'; // 假设axios实例的文件路径是这里  

export const requestArticleList = async (pageReq) => {
    try {
        return await requestInstance.post('/article/list', pageReq);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const requestCategoryList = async () => {
    try {
        return await requestInstance.get('/category/list')
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const addOrUpdateArticle = async (article) => {
    try {
        return await requestInstance.post('/article/addOrUpdate', article)
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const deleteArticle = async (id) => {
    try {
        return await requestInstance.delete(`/article/${id}`)
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const doLogin = async (user) => {
    try {
        return await requestInstance.post('/user/login', user)
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const doLogout = async () => {
    try {
        return await requestInstance.get('/user/logout')
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const isLogin = async () => {
    try {
        const response = await requestInstance.get('/user/isLogin')
        if (response.code !== 200) {
            response.data = false
        }
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        return false
    }
}