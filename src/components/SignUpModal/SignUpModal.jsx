import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignUpModal({ isOpen, handleClose, handleSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(email, password, name);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Submit"
      isOpen={isOpen}
      handleClose={handleClose}
      handleSubmit={handleFormSubmit}
    >
      <input
        type="email"
        className="modal__input"
        id="signup-email"
        placeholder="Email"
        autoComplete="off"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        className="modal__input"
        id="signup-password"
        placeholder="Password"
        autoComplete="off"
        value={password}
        onChange={handlePasswordChange}
      />
      <input
        type="text"
        className="modal__input"
        id="signup-name"
        placeholder="Name"
        autoComplete="off"
        value={name}
        onChange={handleNameChange}
      />
    </ModalWithForm>
  );
}

export default SignUpModal;
