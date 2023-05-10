import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function PageModal({ closeModal, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modal>{children}</Modal>
    </Overlay>,
    modalRoot
  );
}
