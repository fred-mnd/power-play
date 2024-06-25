import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/user-context';
import Catalog from '../pages/catalog-page';
import MainLayout from '../layouts/layout';
import Home from '../pages/home-page';
import DetailsPage from '../pages/detail-page';
import { CartPage } from '../pages/cart-page';
import Modal from '../components/modal'; // Ensure this path is correct
import ProfilePage from '../pages/profile-page';

export default function MiddlewareRoutes() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Passing User Auth From (UserContext.tsx)
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      setModalMessage("Oops! It looks like you're not logged in. Please log in to access this page.");
      setShowModal(true);
    }
  }, []);

  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/catalog" element={<MainLayout><Catalog /></MainLayout>} />
        <Route path="/details/:id" element={<MainLayout><DetailsPage /></MainLayout>} />
        <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
        <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
      </Routes>
    </>
  );
}
