import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
    const request = axios.get(baseUrl)
    console.log(request);
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

const deleteItem = (id, name) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, update, deleteItem}