import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://prod-booking-system.azurewebsites.net',
    timeout: 1000
  });

  export const apiInstance = axios.create({
    baseURL: 'https://prod-booking-system.azurewebsites.net',
    timeout: 1000,
    headers: {
      Authorization: `bearer ${localStorage.getItem("token")}`
    }
  });

