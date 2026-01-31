import axios from "axios"

const API = "http://localhost:5000/api/auth"


export const registerUser = (formData) => {
    return axios.post(`${API}/register`, formData,{
        headers: { "Content-Type": "multipart/form-data" }
  })
}

export const loginUser = (data) =>{
    return axios.post(`${API}/login`, data)
}

