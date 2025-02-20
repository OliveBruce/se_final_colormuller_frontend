import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignUpModal({ isOpen, handleClose }) {
  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Submit"
      isOpen={isOpen}
      handleClose={handleClose}
      redirectButton={
        <button type="button" className="modal__redirect-btn">
          or Login
        </button>
      }
    >
      <input
        type="text"
        className="modal__input"
        id="username"
        placeholder="Username"
        required
      />
      <input
        type="email"
        className="modal__input"
        id="email"
        placeholder="Email"
        autoComplete="off"
        required
      />
      <input
        type="password"
        className="modal__input"
        id="password"
        placeholder="Password"
        autoComplete="new-password"
        required
      />
      <input
        type="url"
        className="modal__input"
        id="avatar"
        placeholder="Avatar URL"
        required
      />
    </ModalWithForm>
  );
}

export default SignUpModal;
