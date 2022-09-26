// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button style={{
          backgroundColor: "#383838",
          height:"fit-content",
          padding:"7px",
          border:"rgb(215, 215, 215) 1px solid",
          color:"rgb(215, 215, 215)",
          borderRadius:"3px",
          alignSelf:"center",
          margin:"5px",
          cursor:"pointer"
      }}
      onClick={() =>{

        setShowModal(true)
      }
      }>Sign in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <button id='close-modal' onClick={()=> setShowModal(false)}>X</button>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
