import SignupForm from './SignupForm';
import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import "./SignUpForm.css"
function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button style={{
          backgroundColor: "#ff652d",
          color: "white",
          border:"none",
          height:"fit-content",
          padding:"10px 15px",
          borderRadius:"4px",
          alignSelf:"center",
          margin:"5px",
          zIndex:"10",
      }}onClick={() => setShowModal(true)}>Create account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <button id='close-modal' onClick={()=> setShowModal(false)}>X</button>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
