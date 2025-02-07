import "./ModalWithForm.css";
import close from "../../assets/close.svg";

function ModalWithForm({
  activeModal,
  handleClose,
  title,
  buttonText,
  redirectButton,
  children,
}) {
  return (
    <div className={`modal ${activeModal === "signup" && "modal__opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={handleClose} type="button" className="modal__close">
          <img src={close} alt="close" className="modal__close-btn" />
        </button>
        <form className="modal__form">
          {children}
          <div className="modal__buttons-wrapper">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            <p className="modal__or">or</p>
            {redirectButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
