import request from './request'

export const getUser = (params) => {
  return request({
    url: '/user/listByPage',
    params
  })
}

export const changeUserStatus = (id, status) => {
  return request({
    url: `/user/${id}/changeUserStatus/${status}`,
    method: 'PUT'
  })
}
export const addUser = (data) => {
  return request({
    url: 'user/add',
    method: 'post',
    data
  })
}
export const editUser = (data) => {
  return request({
    url: 'user/update',
    method: 'put',
    data
  })
}
export const delUser = (data) => {
  return request({
    url: 'user/deleted',
    method: 'DELETE',
    params: {
      id: data
    }
  })
}
