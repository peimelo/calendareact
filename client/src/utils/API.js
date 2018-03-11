const api = process.env.REACT_APP_CONTACTS_API_URL || ''
// const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
  'Accept': 'application/json',
}

export const get = () =>
  fetch(`${api}/appointments`, { headers })
    .then(res => res.json())

export const create = (body) =>
  fetch(`${api}/appointments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      appointment: body
    })
  }).then(res => res.json())
