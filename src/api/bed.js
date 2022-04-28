import request from './request'

export const getAll = (params) => {
    return request({
        url: '/bed/getByPage',
        method: 'get',
        params
    })
}
