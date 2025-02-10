import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ProvideImageModal.css";

function ProvideImageModal({ isOpen, handleClose }) {
  return (
    <ModalWithForm
      title="Generate Palette from Image URL"
      buttonText="Submit"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="provide-image__description">
        Input an image URL below to generate a color palette.
      </p>
      <input
        type="url"
        className="modal__input"
        id="image_upload"
        placeholder="Image URL"
      />
    </ModalWithForm>
  );
}

export default ProvideImageModal;
