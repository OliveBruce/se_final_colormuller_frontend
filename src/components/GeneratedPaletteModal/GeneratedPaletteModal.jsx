import "./GeneratedPaletteModal.css";
import close_light from "../../assets/close.svg";
import close_dark from "../../assets/close_dark.svg";
import PaletteColor from "../PaletteColor/PaletteColor";
import { useContext, useState, useEffect } from "react";
import { getRandomPalette, filterPalette } from "../../utils/ColorMindApi";
import Preloader from "../Preloader/Preloader";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";
import { savePalette } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";

function GeneratedPaletteModal({
  isOpen,
  handleClose,
  userName,
  palettes,
  isLoggedIn,
  navigate,
}) {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);
  const [palette, setPalette] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setIsSaving] = useState(false);
  const [paletteTitle, setPaletteTitle] = useState("");

  useEffect(() => {
    const fetchPalette = async () => {
      setLoading(true);
      try {
        const palette = await getRandomPalette();
        const filteredPalette = filterPalette(palette.result);
        setPalette(filteredPalette);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchPalette();
    }
  }, [isOpen]);

  const handleSavePaletteClick = async () => {
    return setIsSaving(true);
  };

  const handleInputChange = (e) => {
    setPaletteTitle(e.target.value);
  };

  const handleSavePalette = async () => {
    if (isLoggedIn) {
      const idNumb = palettes.length + 1;
      const newPalette = {
        _id: idNumb,
        title: paletteTitle,
        colors: palette.map((color) => ({ c_id: uuidv4(), color })),
        creator: userName,
      };
      await savePalette(newPalette);
      setIsSaving(false);
      setPaletteTitle("");
      navigate(`/profile`);
    } else {
      alert("You need to be logged in to like a palette.");
    }
    handleClose();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSavePalette();
  };

  const handleOnClose = () => {
    setIsSaving(false);
    setPaletteTitle("");
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
          ) : palette && palette.length > 0 ? (
            palette.map((color, index) => (
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
                  type="text"
                  className="modal__input"
                  id="palette-title"
                  placeholder="Palette Title"
                  autoComplete="off"
                  value={paletteTitle}
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
