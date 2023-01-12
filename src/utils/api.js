import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
  });

  export const apiInstance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    headers: {
      Authorization: `bearer ${localStorage.getItem("token")}`
    }
  });

