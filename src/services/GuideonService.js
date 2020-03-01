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
export const login = ({ email, password }) => http.post('/login', { email, password })
export const logout = () => http.post('/logout')
export const register = (data) => http.post('/register', data)
export const updateProfile = (data) => http.put('/myProfile', data)
export const rateUser = (id, data) => http.post(`users/${id}/rate`, data)
export const validateUser = (token) => http.put(`validate/${token}`)
export const switchAvailability = () => http.put('/switchAvailability')
export const switchUserState = () => http.put('/switchUserState')
export const updateCost = (data) => http.put('/updateCost', data)
export const uploadImage = (data) => http.post('/uploadImage', data)
export const getUsers = () => http.get('/users')
export const getUserDetail = (id) => http.get(`/users/${id}`)

// CHAT & CONVERSATION
export const getConversations = () => http.get('/conversations')
export const getOneConversation = (id) => http.get(`/conversations/${id}`)
export const getChat = (id) => http.get(`/chats/${id}`)
export const sendMsg = (id, msg) => http.post(`/chat/${id}/sendMsg`, msg)
export const existConversation = (id) => http.get(`/existConversations/${id}`)


// MEETING
export const getMeetings = () => http.get('/meetings')
export const getPendingMeetings = () => http.get('/meetings/pending')
export const createMeeting = (data) => http.post('/meetings/create', data)
export const acceptMeeting = (id) => http.put(`/meetings/${id}/accept`)
export const declineMeeting = (id) => http.put(`/meetings/${id}/decline`)
export const rateMeeting = (id, data) => http.put(`/meetings/${id}/rate`, data)
export const getOneMeeting = (id) => http.get(`/meetings/${id}`)