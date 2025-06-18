import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://backend-five-delta-37.vercel.app/api/books";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Failed to load books.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
       
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-52 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{book.name}</h3>
            <p className="text-gray-600 mb-1">Genre: {book.genre}</p>
            <p className="text-blue-700 font-bold mb-1">₹{book.price}</p>
            <p className="text-sm text-gray-700 mb-3">
              {book.description?.length > 100
                ? book.description.substring(0, 100) + "..."
                : book.description}
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => navigate(`/book/${book._id}`)}
                className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800 text-sm"
              >
                View Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
