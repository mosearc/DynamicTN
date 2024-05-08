import axios from "axios"

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
	'Cross-Origin-Resource-Policy':true
  }
})

export const axiosPrivateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
	'Cross-Origin-Resource-Policy':true
  }
})
