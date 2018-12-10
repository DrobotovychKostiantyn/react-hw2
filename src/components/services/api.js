import axios from 'axios';

const URL = 'http://localhost:3000/menu';

const getAllList = () => {
  return axios.get(URL).then(response => response.data);
};

const deleteById = id => {
  return axios.delete(`${URL}/${id}`);
};

const getById = id => {
  return axios.get(`${URL}/${id}`);
};

const addItem = value => {
  return axios.post(URL, value);
};

export { getAllList, deleteById, getById, addItem };
