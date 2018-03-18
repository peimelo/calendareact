import axios from 'axios';

const api = process.env.REACT_APP_CONTACTS_API_URL || '';
const headers = {
  'Accept': 'application/json',
};

export const getAll = () =>
  axios({
    method: 'GET',
    url: `${api}/appointments`,
    headers: {
      ...headers,
      ...JSON.parse(sessionStorage.getItem('user'))
    }
  })
    .then(res => res.data);

export const getById = (id) =>
  axios({
    method: 'GET',
    url: `${api}/appointments/${id}`,
    headers: {
      ...headers,
      ...JSON.parse(sessionStorage.getItem('user'))
    }
  })
    .then(res => res.data);

export const create = (body) =>
  axios({
    method: 'POST',
    url: `${api}/appointments`,
    responseType: 'json',
    data: JSON.stringify({
      appointment: body
    }),
    headers: {
      ...headers,
      ...JSON.parse(sessionStorage.getItem('user')),
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.data);

export const destroy = (id) =>
  axios({
    method: 'DELETE',
    url: `${api}/appointments/${id}`,
    headers: {
      ...headers,
      ...JSON.parse(sessionStorage.getItem('user'))
    }
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
      ...JSON.parse(sessionStorage.getItem('user')),
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.data);
