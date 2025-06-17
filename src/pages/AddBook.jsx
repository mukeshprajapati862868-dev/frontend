import React from "react";
import { useNavigate } from "react-router-dom";
import BookForm from "../components/BookForm";

const AddBook = () => {
  const navigate = useNavigate();

  const handleBookAdded = () => {
    navigate("/"); // Redirect to Home after book is added
  };

  return <BookForm onSuccess={handleBookAdded} />;
};

export default AddBook;
