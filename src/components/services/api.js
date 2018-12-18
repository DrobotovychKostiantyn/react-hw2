import axios from 'axios';

const URL = 'http://localhost:3001/';

const getAllList = value =>
  axios.get(URL + value).then(response => response.data);

const deleteById = (value, id) => axios.delete(`${URL}${value}/${id}`);

const getById = (value, id) => axios.get(`${URL}${value}/${id}`);

const addItem = (value, item) => axios.post(URL + value, item);

export { getAllList, deleteById, getById, addItem };
