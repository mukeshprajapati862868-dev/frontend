import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://backend-di6s.onrender.com/api/books";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Book not found");
      const data = await res.json();
      setBook(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching book details");
    }
  };

  if (!book) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        ← Back
      </button>

      <img
        src={book.image}
        alt={book.name}
        className="w-full h-80 object-cover rounded mb-4"
      />

      <h1 className="text-2xl font-bold mb-2">{book.name}</h1>
      <p className="mb-2"><strong>Genre:</strong> {book.genre}</p>
      <p className="mb-2"><strong>Price:</strong> ₹{book.price}</p>
      <p className="mb-2"><strong>Rating:</strong> {book.rating} / 5</p>
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  );
};

export default BookDetail;
