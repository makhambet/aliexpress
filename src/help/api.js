import axios from 'axios'
import Cookies from 'js-cookie'
// import {getToken} from './auth'
// import store from '@/store'

const service = axios.create({
    baseURL: 'http://45.136.56.72/api',
    timeout: 100000
})



service.interceptors.request.use(
    config => {
      // do something before request is sent
  
    //   if (store.getters.token) {
        // let each request carry token
        // ['X-Token'] is a custom headers key
        // please modify it according to the actual situation
        config.headers['token'] = Cookies.get('aliexpress-token') || 'token'
    //   }
      return config
    },
    error => {
      // do something with request error
      alert(error) // for debug
      return Promise.reject(error)
    }
)


export default service;