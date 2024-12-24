import requestInstance from '@/api/axios'; // 假设axios实例的文件路径是这里  

export function requestArticleList(categoryKey) {
    return requestInstance({
        url: `/article/list`,
        params: { 'categoryKey': categoryKey },
        method: 'get'
    })
}

// export function updateUser(userId, data) {
//     return requestInstance({
//         url: `/users/${userId}`,
//         method: 'put',
//         data
//     })
// }

export const requestCategoryList = async () => {
    const response = await requestInstance.get('/category/list')
    return response.data
}

export const addArticle = async (article) => {
    const response = await requestInstance.post('/article/add', article)
    return response.data
}

export const deleteArticle = async (id) => {
    const response = await requestInstance.delete(`/article/${id}`)
    return response.data
}

export const doLogin = async (user) => {
    const response = await requestInstance.post('/user/login', user)
    return response.data
}

export const doLogout = async () => {
    const response = await requestInstance.get('/user/logout')
    return response.data
}