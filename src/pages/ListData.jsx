import React, { useState } from "react";

const API_URL = "http://localhost:4000/api/books";

const ListData = ({ book, onDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...book });

  const handleDelete = async () => {
    if (!book?._id) return;
    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (!confirm) return;

    try {
      const res = await fetch(`${API_URL}/${book._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete book");

      alert("Book deleted successfully!");
      onDeleted(book._id); // Inform parent if needed
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete book");
    }
  };

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({ ...book }); // Reset form
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/${book._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update book");

      alert("Book updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update book");
    }
  };

  return (
    <div className="max-w-md mx-auto border p-4 rounded mb-4 shadow bg-white">
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium mb-1">Book Title</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly={!isEditing}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <img
            src={formData.image}
            alt={formData.name}
            className="w-32 h-32 object-cover mb-2"
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            readOnly={!isEditing}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            readOnly={!isEditing}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            readOnly={!isEditing}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            readOnly={!isEditing}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            readOnly={!isEditing}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows={2}
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleEditToggle}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ListData;
