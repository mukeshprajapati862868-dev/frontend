import axios from "axios";
const BASE_URL = "https://backend-di6s.onrender.com/api/books";

export const getAllBooks = () => axios.get(BASE_URL);
export const getBookById = (id) => axios.get(`${BASE_URL}/${id}`);
export const addBook = (data) => axios.post(BASE_URL, data);
export const updateBook = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${BASE_URL}/${id}`);
export const addReview = (id, review) => axios.post(`${BASE_URL}/${id}/reviews`, review);
