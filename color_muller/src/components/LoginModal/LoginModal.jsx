import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, handleClose }) {
  return (
    <ModalWithForm
      title="Login"
      buttonText="Submit"
      isOpen={isOpen}
      handleClose={handleClose}
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
      />
      <input
        type="password"
        className="modal__input"
        id="password-login"
        placeholder="Password"
        autoComplete="current-password"
      />
    </ModalWithForm>
  );
}

export default LoginModal;
