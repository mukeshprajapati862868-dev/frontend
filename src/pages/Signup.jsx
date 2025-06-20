import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://backend-di6s.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      alert('Signup successful');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input type="text" name="name" placeholder="Name" className="w-full border px-3 py-2 rounded" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="w-full border px-3 py-2 rounded" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full border px-3 py-2 rounded" value={formData.password} onChange={handleChange} required />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
