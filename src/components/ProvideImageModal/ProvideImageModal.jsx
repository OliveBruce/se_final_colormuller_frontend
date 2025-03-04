import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ProvideImageModal.css";

function ProvideImageModal({ isOpen, handleClose, handleSubmitPhoto }) {
  const [imageUrl, setImageUrl] = useState("");

  const handleInputChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitPhoto(String(imageUrl)); // Ensure the URL is a string
  };

  useEffect(() => {
    if (isOpen) {
      setImageUrl("");
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Generate Palette from Image URL"
      buttonText="Submit"
      isOpen={isOpen}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
    >
      <p className="provide-image__description">
        Copy an Image URL from Unsplash and paste it here to generate a palette
        from an Image of your choosing.
      </p>
      <input
        type="url"
        className="modal__input"
        id="image_upload"
        name="image_upload"
        placeholder="Image URL"
        value={imageUrl}
        onChange={handleInputChange}
      />
    </ModalWithForm>
  );
}

export default ProvideImageModal;
