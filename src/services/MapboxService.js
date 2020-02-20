import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.mapbox.com'
})

const accsessToken = `access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`

http.interceptors.response.use(
  response => response.data,
  error => {
    return Promise.reject(error)
  }
)

// SEARCH
export const forwardGeocoding = (place, parameters = '') => http.get(`/geocoding/v5/mapbox.places/${place}.json?${accsessToken}`)
export const reverseGeocoding = (longitude, latitude) => http.get(`/geocoding/v5/mapbox.places/${longitude},${latitude}.json?${accsessToken}`)

