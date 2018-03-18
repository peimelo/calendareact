import axios from 'axios';

const api = process.env.REACT_APP_CONTACTS_API_URL || ''
const headers = {
  'Accept': 'application/json',
};

export const getAll = () =>
  axios({
    method: 'get',
    url: `${api}/appointments`,
    headers
  })
    .then(res => res.data);

export const getById = (id) =>
  axios({
    method: 'get',
    url: `${api}/appointments/${id}`,
    headers
  })
    .then(res => res.data);

export const create = (body) =>
  axios({
    method: 'post',
    url: `${api}/appointments`,
    responseType: 'json',
    data: JSON.stringify({
      appointment: body
    }),
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.data);

export const destroy = (id) =>
  axios({
    method: 'delete',
    url: `${api}/appointments/${id}`,
    headers
  })
    .then(res => res.data);

export const update = (id, body) =>
  axios({
    method: 'patch',
    url: `${api}/appointments/${id}`,
    responseType: 'json',
    data: JSON.stringify({
      appointment: body
    }),
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.data);
