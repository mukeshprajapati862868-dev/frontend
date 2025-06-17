// 📁 src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import BookDetails from "./pages/BookDetails";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"; // ✅ Import Profile
import { BookList } from "./assets/assets";

const App = () => {
  const [books, setBooks] = useState(BookList);

  const handleAddBook = (book) => {
    setBooks((prev) => [...prev, book]);
  };

  const handleUpdateBook = (id, updatedBook) => {
    setBooks((prev) =>
      prev.map((book) =>
        book._id === id ? { ...book, ...updatedBook, _id: id } : book
      )
    );
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home books={books} />} />
        <Route path="/add" element={<AddBook onAdd={handleAddBook} />} />
        <Route path="/edit/:id" element={<AddBook onUpdate={handleUpdateBook} />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} /> {/* ✅ Profile Route */}
      </Routes>
    </Router>
  );
};

export default App;
