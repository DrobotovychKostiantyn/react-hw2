import axios from 'axios';

const URL = 'http://localhost:3001/';

const getAllList = value => {
  return axios.get(URL + value).then(response => response.data);
};

const deleteById = (value, id) => {
  return axios.delete(`${URL}${value}/${id}`);
};

const getById = (value, id) => {
  return axios.get(`${URL}${value}/${id}`);
};

const addItem = (value, item) => {
  return axios.post(URL + value, item);
};

export { getAllList, deleteById, getById, addItem };
