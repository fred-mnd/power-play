import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Modal from "./modal"; 
import axios from "axios";
import { useUser } from "../contexts/user-context";

export default function Navbar() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCartClick = () => {
    if (user) {
      navigate('/cart');
    } else {
      setModalMessage("Please log in to access your cart.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = async () => {
    if (!user) {
      console.error('Logout error: User is not logged in');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/logout', {
        withCredentials: true,
      });
      if (response.status === 200) {
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        alert('You have been logged out!');
        updateUser(null); 
      } 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <div className="navbar bg-sky-200 flex justify-between items-center px-4 md:px-[10%] py-2 fixed top-0 w-full z-50">
        <Link className="mx-2 w-20 flex justify-center" to="/">
          <img srcSet="/src/assets/logo_shadow.png" alt="Logo" />
        </Link>
        <div className="navbar-links hidden md:flex gap-4">
          <Link className="navbar-link" to="/catalog">PRODUCTS</Link>
          <Link className="navbar-link" to="/about">ABOUT US</Link>
          <Link className="navbar-link" to="/support">SUPPORT</Link>
        </div>
        <div className="navbar-icons flex gap-4">
          <div className="relative cursor-pointer" onClick={handleCartClick}>
            <ShoppingCartIcon className="navbar-icon" fontSize="large" />
          </div>
          <div className="relative">
            <AccountCircleIcon className="navbar-icon cursor-pointer" fontSize="large" />
            <div className="dropdown-content">
              {user ? (
                <>
                  <Link className="block px-4 py-2 text-sky-900 hover:bg-sky-100" to="/profile">Profile</Link>
                  <Link className="block px-4 py-2 text-sky-900 hover:bg-sky-100" to="/orders">Orders</Link>
                  <Link className="block px-4 py-2 text-sky-900 hover:bg-sky-100" to="/" onClick={handleLogout}>Logout</Link>
                </>
              ) : (
                <>
                  <Link className="block px-4 py-2 text-sky-900 hover:bg-sky-100" to="/login">Login</Link>
                  <Link className="block px-4 py-2 text-sky-900 hover:bg-sky-100" to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} message={modalMessage} onClose={closeModal} />
    </div>
  );
}
