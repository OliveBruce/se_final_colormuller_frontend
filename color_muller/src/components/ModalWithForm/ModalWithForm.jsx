import "./ModalWithForm.css";
import close from "../../assets/close.svg";

function ModalWithForm({
  isOpen,
  handleClose,
  title,
  buttonText,
  redirectButton,
  children,
}) {
  return (
    <div className={`modal ${isOpen && "modal__opened"}`}>
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
            {redirectButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
