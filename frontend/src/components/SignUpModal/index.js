import SignupForm from './SignupForm';
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import "./SignUpForm.css"
function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button style={{
          backgroundColor: "#ff7f50",
          color: "white",
          border:"none",
          height:"fit-content",
          padding:"7px",
          borderRadius:"3px",
          alignSelf:"center",
          margin:"5px"
      }}onClick={() => setShowModal(true)}>Create account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
