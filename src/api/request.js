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

export const initUploadFileInfo = async (fileEntity) => {
    try {
        return await requestInstance.post('/file/initUploadFileInfo', fileEntity)
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const chunkUpload = async (chunk_index, fileId, sha256, totalChunks) => {
    try {
        return await requestInstance('/file/chunkUpload', {
            method: 'put',
            params: { chunk_index, fileId, sha256, totalChunks },
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            body: file
        })
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export const mergeChunks = async (fileId, totalChunks) => {
    try {
        return await requestInstance.get('/file/mergeChunks', {
            params: {
                "fileId": fileId,
                "totalChunks": totalChunks
            }
        })
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// 定义上传文件的函数
export const uploadFile = async (sha256, alt, file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('sha256', sha256);
        formData.append('alt', alt);
        return await requestInstance.put('/file/upload', formData);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// 分片上传逻辑
export const uploadFileInChunks = async (file, chunkSize = 1 * 1024 * 1024) => {

    const totalChunks = Math.ceil(file.size / chunkSize);
    const fileName = file.name;
    const fileType = file.type;

    for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(file.size, start + chunkSize);
        const chunk = file.slice(start, end);

        try {
            const response = await requestInstance('/api/upload/chunk', {
                method: 'put',
                headers: {
                    'X-File-Name': fileName,
                    'X-File-Type': fileType,
                    'X-File-Index': i.toString(),
                    'X-Total-Chunks': totalChunks.toString(),
                    'Content-Type': 'application/octet-stream'
                },
                body: chunk
            });

            if (!response.ok) {
                throw new Error('Failed to upload chunk');
            }

            console.log(`Uploaded chunk ${i + 1} of ${totalChunks}`);
        } catch (error) {
            console.error('Error uploading chunk:', error);
            return;
        }
    }

    try {
        const mergeResponse = await requestInstance('/api/upload/merge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fileName,
                fileType,
                totalChunks
            })
        });

        if (!mergeResponse.ok) {
            throw new Error('Failed to merge chunks');
        }

        return mergeResponse.json();
    } catch (error) {
        console.error('Error merging chunks:', error);
    }
}