import request from './request'

export const login = (data) => {
  return request({
    url: '/login',
    method: 'POST',
    data
  })
}

export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
  })
}

export const getCaptcha = (InUuid) => {
  return request({
    url: '/captcha?uuid=' + InUuid,
    method: 'GET',
    responseType: 'image/jpeg'
  })
}
