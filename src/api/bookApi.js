import axios from "axios";
const BASE_URL = "http://localhost:4000/api/books";

export const getAllBooks = () => axios.get(BASE_URL);
export const getBookById = (id) => axios.get(`${BASE_URL}/${id}`);
export const addBook = (data) => axios.post(BASE_URL, data);
export const updateBook = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteBook = (id) => axios.delete(`${BASE_URL}/${id}`);
export const addReview = (id, review) => axios.post(`${BASE_URL}/${id}/reviews`, review);
