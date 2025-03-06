import "./GeneratedPaletteModal.css";
import close_light from "../../assets/close.svg";
import close_dark from "../../assets/close_dark.svg";
import PaletteColor from "../PaletteColor/PaletteColor";
import { useContext, useState } from "react";
import Preloader from "../Preloader/Preloader";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";

function GeneratedPaletteModal({
  isOpen,
  handleClose,
  handleSavePalette,
  currentPalette,
  loading,
  setPaletteTitle,
}) {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);
  const [saving, setIsSaving] = useState(false);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleOnSavePalette();
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
        <div className="generated-card-modal__palette">
          {loading ? (
            <Preloader currentBGTheme={currentBGTheme} />
          ) : currentPalette && currentPalette.length > 0 ? (
            currentPalette.map((color, index) => (
              <PaletteColor key={index} color={color} colorText={color} />
            ))
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

        <button
          onClick={handleOnClose}
          type="button"
          className="generated-card-modal__close-btn"
        >
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

export default GeneratedPaletteModal;
