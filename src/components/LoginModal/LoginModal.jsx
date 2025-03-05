import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, handleClose, handleSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(email, password);
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Submit"
      isOpen={isOpen}
      handleClose={handleClose}
      handleSubmit={handleFormSubmit}
      redirectButton={
        <button type="button" className="modal__redirect-btn">
          or Sign Up
        </button>
      }
    >
      <input
        type="email"
        className="modal__input"
        id="email-login"
        placeholder="Email"
        autoComplete="off"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        className="modal__input"
        id="password-login"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
    </ModalWithForm>
  );
}

export default LoginModal;
