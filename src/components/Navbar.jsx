import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional: install with `npm i lucide-react`

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📚 BookStore</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          <li><Link to="/" className="hover:text-yellow-300 transition">Home</Link></li>
          <li><Link to="/login" className="hover:text-yellow-300 transition">Login</Link></li>
          <li><Link to="/signup" className="hover:text-yellow-300 transition">Signup</Link></li>
          <li><Link to="/about" className="hover:text-yellow-300 transition">About</Link></li>
          <li><Link to="/add" className="hover:text-yellow-300 transition">Add</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden focus:outline-none">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <ul className="md:hidden px-4 pb-4 space-y-2 bg-blue-600">
          <li><Link to="/" onClick={toggleMenu} className="block hover:text-yellow-300">Home</Link></li>
          <li><Link to="/login" onClick={toggleMenu} className="block hover:text-yellow-300">Login</Link></li>
          <li><Link to="/signup" onClick={toggleMenu} className="block hover:text-yellow-300">Signup</Link></li>
          <li><Link to="/about" onClick={toggleMenu} className="block hover:text-yellow-300">About</Link></li>
          <li><Link to="/add" onClick={toggleMenu} className="block hover:text-yellow-300">Add</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
