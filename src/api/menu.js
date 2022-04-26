import request from './request'

export const menuList = (data) => {
  return request({
    url: '/menu/getByUser',
    method: 'POST',
    data
  })
}
export const getAllList = () => {
  return request({
    url: '/menu/getAll',
    method: 'get'
  })
}

export const getListByUser = (data) => {
  return request({
    url: '/userPage/getListByUser',
    method: 'POST',
    data
  })
}
