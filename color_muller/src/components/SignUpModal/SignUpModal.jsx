import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SignUpModal({ activeModal, handleClose }) {
  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Submit"
      activeModal={activeModal}
      handleClose={handleClose}
      redirectButton={
        <button type="button" className="modal__redirect-btn">
          Sign Up
        </button>
      }
    >
      <input
        type="text"
        className="modal__input"
        id="username"
        placeholder="Username"
      />
      <input
        type="email"
        className="modal__input"
        id="email"
        placeholder="Email"
      />
      <input
        type="password"
        className="modal__input"
        id="password"
        placeholder="Password"
      />
      <input
        type="url"
        className="modal__input"
        id="avatar"
        placeholder="Avatar URL"
      />
    </ModalWithForm>
  );
}

export default SignUpModal;
