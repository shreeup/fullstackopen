import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'


var token = null
var config

const setToken = newToken => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = async () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
    }
  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}
const create = async newObject => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
    }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async objectToUpdate => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token);
    }
    debugger;
  const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, objectToUpdate, config)
  return response.data
}

const remove = async id => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
    }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken ,remove}