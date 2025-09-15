import axios from "axios"
import { ref } from "vue"

const baseUrl = ref('http://trackstack.test/')

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export function useApi(newBaseUrl?: string) {

  if (newBaseUrl) {
    baseUrl.value = newBaseUrl
  }

  const getCsrfToken = async () => {
    axios.get(baseUrl.value + 'sanctum/csrf-cookie', {withCredentials: true}).then(r => {
      console.log('csrf', r)
    }).catch((error) => {
      console.log('error', error)
    })
  }

  const getFullUrl = (url: string) => {
    return baseUrl.value + 'api/' + url
  }

  const post = async (url: string, data: any) => {
    return axios.post(getFullUrl(url), data)
  }

  const patch = async (url: string, data: any) => {
    return axios.patch(getFullUrl(url), data)
  }

  const get = async (url: string) => {
    return axios.get(getFullUrl(url))
  }

  const put = async (url: string, data: any) => {
    return axios.put(getFullUrl(url), data)
  }

  const del = async (url: string) => {
    return axios.delete(getFullUrl(url))
  }

  return {
    post,
    get,
    patch,
    put,
    del,
    getCsrfToken
  }
  
}