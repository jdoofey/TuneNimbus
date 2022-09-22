import SignupForm from './SignupForm';
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import "./SignUpForm.css"
function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="submit-btn"onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
