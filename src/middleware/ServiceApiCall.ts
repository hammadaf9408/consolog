import axios from 'axios';

export default {
  get: async (url: string, config?: any) => {
    try {
      let res = await axios.get(url, config)
      return res
    } catch (err) {
      console.log('err', err)
      let errResponse = err.response;
      return errResponse
    }
  },
  post: async (url: string, data: any, config?: any) => {
    try {
      let res = await axios.post(url, data, config)
      return res
    } catch (err) {
      console.log('err', err)
      let errResponse = err.response;
      return errResponse
    }
  },
  put: async (url: string, id: string, data: any, config?: any) => {
    try {
      let res = await axios.put(url + '/' + id, data, config)
      return res
    } catch (err) {
      console.log('err', err)
      let errResponse = err.response;
      return errResponse
    }
  },
  delete: async (url: string, id: string,  config?: any) => {
    try {
      let res = await axios.delete(url + '/' + id, config)
      return res
    } catch (err) {
      console.log('err', err)
      let errResponse = err.response;
      return errResponse
    }
  }
}