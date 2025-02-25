import ModalWithForm from "../ModalWithForm/ModalWithForm";

function SavePaletteModal({ isOpen, handleClose }) {
  return (
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
  );
}

export default SavePaletteModal;
