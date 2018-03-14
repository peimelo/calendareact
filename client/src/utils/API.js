import axios from 'axios';

const api = process.env.REACT_APP_CONTACTS_API_URL || ''
const headers = {
  'Accept': 'application/json',
};

export const get = () =>
  fetch(`${api}/appointments`, { headers })
    .then(res => res.json());

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
