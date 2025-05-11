// src/api/api.js
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const login = (formData) =>
  axios.post(`${BASE_URL}/users/login`, formData);
export const register = (formData) =>
  axios.post(`${BASE_URL}/users/register`, formData);


export const getTasks = () =>
  axios.get(`${BASE_URL}/tasks`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
export const getTask = (id) =>
  axios.get(`${BASE_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
export const createTask = (task) =>
  axios.post(`${BASE_URL}/tasks`, task, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
export const updateTask = (id, task) =>
  axios.put(`${BASE_URL}/tasks/${id}`, task, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
export const deleteTask = (id) =>
  axios.delete(`${BASE_URL}/tasks/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
