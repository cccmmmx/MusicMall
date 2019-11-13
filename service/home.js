import request from './netword.js'
import { baseURL, baseURLMusic } from './config.js'
export function getMutiData(){
  return request({
    url: baseURL+'/home/multidata'
  })
}
export function getMusicList(name) {
  return request({
    url: baseURLMusic+'/searchMusic',
    data: {
      name
    }
  })
}