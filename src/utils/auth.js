import { TOKEN_TIME, TOKEN_TIME_VALUE } from './constant'

// 设置登陆时间
export const setTokenTime = () => {
  localStorage.setItem(TOKEN_TIME, Date.now())
}

// 获取
export const getTokenTime = () => {
  return localStorage.getItem(TOKEN_TIME)
}

// 比较是否过期
export const diffTokenTime = () => {
  const currentTime = Date.now()
  const loginTime = getTokenTime()
  return currentTime - loginTime > TOKEN_TIME_VALUE
}
