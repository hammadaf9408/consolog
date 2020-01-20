import axios from 'axios';

export default {
  get: async (url: string) => {
    try {
      let res = await axios.get(url)
      return res
    } catch (err) {
      console.log('err', err)
      let errResponse = err.response;
      return errResponse
    }
  },
  post: async (url: string, data: any) => {
    try {
      let res = await axios.post(url, data)
      return res
    } catch (err) {
      console.log('err', err)
      let errResponse = err.response;
      return errResponse
    }
  },
  put: async (url: string, id: string, data: any) => {
    try {
      let res = await axios.put(url + '/' + id, data)
      return res
    } catch (err) {
      console.log('err', err)
      let errResponse = err.response;
      return errResponse
    }
  },
  delete: async (url: string, id: string) => {
    try {
      let res = await axios.delete(url + '/' + id)
      return res
    } catch (err) {
      console.log('err', err)
      let errResponse = err.response;
      return errResponse
    }
  }
}