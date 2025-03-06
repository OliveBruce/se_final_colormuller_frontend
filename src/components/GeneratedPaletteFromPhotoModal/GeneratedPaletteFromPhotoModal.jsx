import close_light from "../../assets/close.svg";
import close_dark from "../../assets/close_dark.svg";
import PaletteColor from "../PaletteColor/PaletteColor";
import { useContext, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";

function GeneratedPaletteFromPhotoModal({
  isOpen,
  handleClose,
  photo,
  handleSavePalette,
  currentPalette,
  loading,
  setPaletteTitle,
}) {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);
  const [saving, setIsSaving] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleOnSavePalette();
  };

  const handleSavePaletteClick = async () => {
    return setIsSaving(true);
  };

  const handleInputChange = (e) => {
    setPaletteTitle(e.target.value);
  };

  const handleOnSavePalette = () => {
    setIsSaving(false);
    handleSavePalette();
  };

  const handleOnClose = () => {
    setIsSaving(false);
    handleClose();
  };

  return (
    <div className={`generated-card-modal ${isOpen && "modal__opened"}`}>
      <div
        className={
          "generated-card-modal__container" +
          (currentBGTheme === "light"
            ? " generated-card-modal__container--light"
            : " generated-card-modal__container--dark")
        }
      >
        <div className="generated-card-modal__palette-section">
          {loading ? (
            <Preloader currentBGTheme={currentBGTheme} />
          ) : currentPalette.length > 0 && photo ? (
            <>
              <div className="generated-card-modal__palette">
                {currentPalette.map((color, index) => (
                  <PaletteColor key={index} color={color} colorText={color} />
                ))}
              </div>
              <div>
                <a
                  href={photo.links.html}
                  className="header__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="generated-card-modal__image"
                    src={photo.urls.small}
                    alt={photo.alt_description}
                  />
                </a>
                <p className="generated-card-modal__image-description">
                  Photo Uploaded by{" "}
                  <a
                    href={photo.user.links.html}
                    className="generated-card-modal__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {photo.user.name}
                  </a>{" "}
                  on{" "}
                  <a
                    href="https://unsplash.com/"
                    className="generated-card-modal__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Unsplash
                  </a>{" "}
                </p>
              </div>
            </>
          ) : (
            <div>Nothing Found</div>
          )}
        </div>
        {!loading ? (
          <>
            {saving ? (
              <form onSubmit={handleFormSubmit}>
                <input
                  required
                  type="text"
                  className="modal__input"
                  id="palette-title"
                  placeholder="Palette Title"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
                <button type="submit" className="generated-card-modal__save">
                  Save
                </button>
              </form>
            ) : (
              <button
                onClick={handleSavePaletteClick}
                type="button"
                className="generated-card-modal__save"
              >
                Save Palette
              </button>
            )}
          </>
        ) : (
          ""
        )}
        <button onClick={handleOnClose} type="button" className="modal__close">
          {currentBGTheme === "light" ? (
            <img src={close_dark} alt="close" className="modal__close-btn" />
          ) : (
            <img src={close_light} alt="close" className="modal__close-btn" />
          )}
        </button>
      </div>
    </div>
  );
}

export default GeneratedPaletteFromPhotoModal;
