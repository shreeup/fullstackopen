import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getOne = (srch) => {
    const request = axios.get(`${baseUrl}/name/${srch}`)
    return request.then(response => response.data)
  }
  

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}



export default { getAll, create, update,deleter }