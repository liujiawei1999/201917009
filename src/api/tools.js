import request from './request'

export const uploadFile = (params) => {
    return request({
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        url: '/file/uploadFile',
        method: 'post',
        params
    })
}
