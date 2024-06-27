import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/user-context';

type ContentLayout = {
  children: React.ReactElement;
};

export default function Protected({ children }: ContentLayout) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      setModalMessage("Please log in to access this page.");
      setShowModal(true);
    }
  }, []);

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">{modalMessage}</div>
            <div className="modal-buttons">
              <button
                className="modal-button"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
