import axios from 'axios'

const http = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:5000/',
  withCredentials: true
})

http.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.clear()
      window.location.assign('/login')
    }

    return Promise.reject(error)
  }
)

// USER
export const login = ({ email, password }) => http.post('/login', { email, password }).then(res => res.data)
export const logout = () => http.post('/logout').then(res => res.data)
export const register = (data) => http.post('/register', data).then(res => res.data)
export const updateProfile = (data) => http.put('/myProfile', data).then(res => res.data)
export const rateUser = (id, data) => http.post(`users/${id}/rate`, data).then(res => res.data)
export const validateUser = (token) => http.put(`validate/${token}`).then(res => res.data)
export const switchAvailability = () => http.put('/switchAvailability').then(res => res.data)
export const switchUserState = () => http.put('/switchUserState').then(res => res.data)
export const updateCost = (data) => http.put('/updateCost', data).then(res => res.data)

// CHAT & CONVERSATION
export const getConversations = () => http.get('/conversations').then(res => res.data)
export const getChat = (id) => http.get(`/chats/${id}`).then(res => res.data)
export const sendMsg = (id, { msg }) => http.post(`/chat/${id}/sendMsg`, msg).then(res => res.data)

// MEETING
export const getMeetings = () => http.get('/meetings').then(res => res.data)
export const getPendingMeetings = () => http.get('/meetings/pending').then(res => res.data)
export const createMeeting = (data) => http.post('/meetings/create', data).then(res => res.data)
export const acceptMeeting = (id) => http.put(`/meetings/${id}/accept`).then(res => res.data)
export const declineMeeting = (id) => http.put(`/meetings/${id}/decline`).then(res => res.data)
export const rateMeeting = (id, data) => http.put(`/meetings/${id}/rate`, data).then(res => res.data)