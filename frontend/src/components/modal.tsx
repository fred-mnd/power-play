import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css'; 

interface ModalProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, message, onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    navigate('/login');
    onClose();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <div className="modal-content">
          <p>{message}</p>
          <div className="modal-buttons">
            <button className="modal-button" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
