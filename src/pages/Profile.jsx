import React, { useEffect, useState } from 'react';
import { getAllBooks, addReview } from '../api/bookApi';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [comments, setComments] = useState({}); // input state: { bookId: { rating, comment } }

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await getAllBooks();
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  const handleCommentChange = (bookId, field, value) => {
    setComments(prev => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [field]: value,
      },
    }));
  };

  const handleSubmitComment = async (bookId) => {
    const { rating, comment } = comments[bookId] || {};
    if (!user || !rating || !comment) {
      alert('Please fill all fields and login first.');
      return;
    }

    try {
      await addReview(bookId, {
        reviewer: user.name,
        comment,
        rating: Number(rating),
      });
      alert('Review submitted!');
      setComments(prev => ({
        ...prev,
        [bookId]: { rating: '', comment: '' },
      }));
      fetchBooks(); // Refresh list with updated reviews
    } catch (err) {
      console.error('Failed to submit review:', err);
      alert('Failed to submit review.');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>

      {user ? (
        <div className="mb-6">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p className="text-red-600">⚠️ User not logged in</p>
      )}

      <h2 className="text-xl font-semibold mb-3">📚 Available Books</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {books.map(book => (
          <div key={book._id} className="border p-4 rounded shadow">
            <img
              src={book.image}
              alt={book.name}
              className="h-48 w-full object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-bold">{book.name}</h3>
            <p><strong>Price:</strong> ₹{book.price}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Rating:</strong> {book.rating}/5</p>

            {/* Reviews */}
            <div className="mt-3">
              <h4 className="font-semibold">📝 Reviews</h4>
              {book.reviews && book.reviews.length > 0 ? (
                book.reviews.map((r, i) => (
                  <div key={i} className="bg-gray-100 p-2 my-1 rounded">
                    <p><strong>{r.reviewer}</strong>:</p>
                    <p>{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No reviews yet.</p>
              )}
            </div>

            {/* Review Form */}
            <div className="mt-3 space-y-2">
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Rating (1 to 5)"
                className="w-full border px-2 py-1 rounded"
                value={comments[book._id]?.rating || ''}
                onChange={(e) =>
                  handleCommentChange(book._id, 'rating', e.target.value)
                }
              />
              <textarea
                placeholder="Write a comment"
                className="w-full border px-2 py-1 rounded"
                value={comments[book._id]?.comment || ''}
                onChange={(e) =>
                  handleCommentChange(book._id, 'comment', e.target.value)
                }
              />
              <button
                onClick={() => handleSubmitComment(book._id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Submit Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
