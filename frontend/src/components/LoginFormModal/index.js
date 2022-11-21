// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
      className="sign-in-btn"
      onClick={() =>{

        setShowModal(true)
      }
      }>Sign in</button>
      {showModal && (
        <Modal  onClose={() => setShowModal(false)}>
          <button id='close-modal' onClick={()=> setShowModal(false)}>X</button>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
