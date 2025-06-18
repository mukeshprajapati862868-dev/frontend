import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://backend-five-delta-37.vercel.app/api/books";

const BookForm = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [buttonName, setButtonName] = useState("submit");

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    genre: "",
    rating: "",
    description: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  useEffect(() => {
    if (editingBook) {
      setFormData({
        name: editingBook.name || "",
        image: editingBook.image || "",
        price: editingBook.price || "",
        genre: editingBook.genre || "",
        rating: editingBook.rating || "",
        description: editingBook.description || "",
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, price, genre, rating, description } = formData;

    if (!name || !image || !price || !genre || !rating || !description) {
      alert("Please fill all fields");
      return;
    }

    try {
      let response;

      if (buttonName === "submit") {
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else if (buttonName === "edit" && editingBook?._id) {
        response = await fetch(`${API_URL}/${editingBook._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) throw new Error("Failed action");

      await fetchBooks();
      alert(
        buttonName === "submit"
          ? "Book added!"
          : "Book updated!"
      );

      setFormData({
        name: "",
        image: "",
        price: "",
        genre: "",
        rating: "",
        description: "",
      });
      setEditingBook(null);
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this book?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchBooks();
      alert("Book deleted!");
    } catch (err) {
      console.error("Delete error", err);
      alert("Error deleting book");
    }
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
    setButtonName("edit");
  };

  const handlePageChange = (e) => {
    const value = e.target.value;
    if (value === "add") navigate("/add");
    else if (value === "list") navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          onChange={handlePageChange}
          className="border px-3 py-2 rounded mb-2"
        >
          <option value="add">Book Add</option>
          <option value="list">List Data</option>
        </select>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Book Title"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (out of 5)"
          min="1"
          max="5"
          step="0.1"
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex justify-between gap-3">
          <button
            type="submit"
            onClick={() => setButtonName("submit")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
          {editingBook && (
            <button
              type="submit"
              onClick={() => setButtonName("edit")}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Save Edit
            </button>
          )}
        </div>
      </form>

      <hr className="my-6" />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">📚 Book List</h2>
        {books.map((book) => (
          <div
            key={book._id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{book.name}</h3>
              <p>₹{book.price} | Genre: {book.genre} | ⭐ {book.rating}</p>
              <p className="text-sm text-gray-600">{book.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditClick(book)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookForm;
