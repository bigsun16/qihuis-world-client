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

export const createUser = async (userData) => {
    const response = await requestInstance.post('/users', userData)
    return response.data
}