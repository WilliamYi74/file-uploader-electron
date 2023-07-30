export const BASE_URL = import.meta.env.DEV
  ? `/${import.meta.env.MODE}`
  : import.meta.env.RENDERER_VITE_BASE_URL
console.log(import.meta.env.DEV, import.meta.env.RENDERER_VITE_BASE_URL)
export const HttpStatus = {
  OK: 200, // 成功
  CREATE: 201, // 新增资源
  REDIRECT_PERMANENTLY: 301, // 永久重定向
  REDIRECT_TEMPORARY: 302, // 临时重定向
  NOT_MODIFIED: 304, // 资源未变化走本地缓存(配合If-Modified-Since头)
  BAD_REQUEST: 400, // 请求语法格式或参数错误
  UNAUTHORIZED: 401, // 请求方未授权,需要授权后才能请求资源
  FORBIDDEN: 403, // 请求方是未认证用户,服务器拒绝提供所请求的资源
  NOT_FOUND: 404, // 资源未找到
  METHOD_NOT_ALLOWED: 405, // 请求方法不允许
  FAILED_DEPENDENCY: 424, // 请求操作失败 请求的操作依赖另一个操作 本项目鉴权失败会报这个status
  INTERNAL_SERVER_ERROR: 500, // 服务器内部错误
  BAD_GATEWAY: 502, // 错误网关
  GATEWAY_TIMEOUT: 504 // 网关超时
}

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE'
}

export const HttpHeaders = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  ACCEPT: 'Accept',
  USER_AGENT: 'User-Agent',
  CONTENT_ENCODING: 'Content-Encoding',
  USER_SPACE: 'User-Space',
  TOKEN: 'token',
  TEMPPORARY_TOKEN: 'temp-token'
}

export const ResponseCode = {
  SUCCESS: 0,
  FAILURE: 1,
  UNAUTHORIZED: 401
}

export const UploadType = {
  OTHER: 'OTHER',
  DATA_BANK: 'INFORMATION_LIBRARY',
  BOOKS_BANK: 'BOOK_LIBRARY',
  SYSTEM: 'SYSTEM_FILE'
}
export const MAX_UPLOAD_LIMIT = 100
