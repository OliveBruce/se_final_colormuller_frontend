import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./SavePaletteModal.css";
import close from "../../assets/close.svg";
import UserButton from "../UserButton/UserButton";

function SavePaletteModal({
  isOpen,
  handleClose,
  isLoggedIn,
  onLoginClick,
  onSignUpClick,
}) {
  if (isLoggedIn === true) {
    return (
      <>
        <ModalWithForm
          title="Save Palette?"
          buttonText="Submit"
          isOpen={isOpen}
          handleClose={handleClose}
        >
          <input
            type="text"
            className="modal__input"
            id="palette-title"
            placeholder="Palette Title"
            autoComplete="off"
          />
        </ModalWithForm>
      </>
    );
  } else {
    return (
      <div className={`modal ${isOpen && "modal__opened"}`}>
        <div className="save-palette-modal__login-container">
          <h2 className="modal__title">Must Login to Save Palette</h2>
          <button onClick={handleClose} type="button" className="modal__close">
            <img src={close} alt="close" className="modal__close-btn" />
          </button>
          <UserButton onButtonClick={onLoginClick} buttonText="Log In" />
          <UserButton onButtonClick={onSignUpClick} buttonText="Sign Up" />
        </div>
      </div>
    );
  }
}

export default SavePaletteModal;
